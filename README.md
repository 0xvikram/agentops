# Agentic Marketing Playground

Interactive Next.js demo showing how AI marketing agents analyze customer data, identify opportunities, build segments, recommend campaigns, and generate campaign copy.

## Features

- Landing page inspired by agentic marketing products
- Retail brand playground with sample datasets
- Sequential agent workflow:
  - Opportunity Agent
  - Segmentation Agent
  - Strategy Agent
  - Content Agent
- Groq-powered content generation with safe fallback copy
- CSV, XLS, and XLSX customer data upload
- Dashboard metrics, segment cards, campaign strategy, generated content, and customer table

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Lucide React
- Groq API
- xlsx for Excel uploads

## Getting Started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`GROQ_API_KEY` is optional for local demos. If it is missing or a Groq request fails, the app uses fallback campaign copy.

## Upload Format

The upload parser supports `.csv`, `.xls`, and `.xlsx` files. Recommended columns:

- Customer Name or Name
- Email
- Phone
- Last Purchase Date or Last Purchase Days
- Lifetime Spend
- Orders Count
- Preferred Category
- Location
- Engagement Score

Unknown or missing fields are filled with safe defaults so the agents can still run.

## Production Build

```bash
npm run build
npm start
```

## Deploy

Deploy on Vercel and set:

- `GROQ_API_KEY`
- `GROQ_MODEL`
- `NEXT_PUBLIC_APP_URL`
