import { NextResponse } from 'next/server';
import { createFallbackContent, type CampaignStrategy } from '@/lib/mock-data';

interface GenerateContentRequest {
  brandName: string;
  audience: string;
  strategy: CampaignStrategy;
}

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateContentRequest;
  const fallback = createFallbackContent(body.brandName, body.strategy);

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(fallback);
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant',
        temperature: 0.7,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You are an expert retail marketer. Return only valid JSON with whatsapp, emailSubject, emailBody, and push string fields.',
          },
          {
            role: 'user',
            content: [
              `Brand: ${body.brandName}`,
              `Audience: ${body.audience}`,
              `Customer Segment: ${body.strategy.segment}`,
              `Offer: ${body.strategy.offer}`,
              `Channel: ${body.strategy.channel}`,
              'Tone: Friendly, premium, concise',
              'Generate a WhatsApp message, email subject, email body, and push notification.',
            ].join('\n'),
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(fallback);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices?.[0]?.message?.content ?? '{}');

    return NextResponse.json({
      whatsapp: asText(content.whatsapp, fallback.whatsapp),
      emailSubject: asText(content.emailSubject, fallback.emailSubject),
      emailBody: asText(content.emailBody, fallback.emailBody),
      push: asText(content.push, fallback.push),
      source: 'groq',
    });
  } catch {
    return NextResponse.json(fallback);
  }
}

function asText(value: unknown, fallback: string) {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object') {
    const maybeMessage = (value as { message?: unknown; text?: unknown; body?: unknown }).message
      ?? (value as { text?: unknown }).text
      ?? (value as { body?: unknown }).body;

    if (typeof maybeMessage === 'string') {
      return maybeMessage;
    }
  }

  return fallback;
}
