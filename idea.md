# Project: Agentic Marketing Playground

## Goal

Build an interactive sandbox that demonstrates how multiple AI agents collaborate to create and execute marketing campaigns for retail brands.

The product should feel like a simplified version of Xeno's vision of "Agentic Marketing".

The objective is not to build a real CRM.

The objective is to help users understand how AI agents can analyze customer data, identify opportunities, create campaigns, and generate marketing content autonomously.

---

# Problem Statement

Current marketing platforms require users to:

* Analyze customer data manually
* Create customer segments
* Design campaigns
* Write marketing content
* Measure performance

This project demonstrates how a team of AI agents can automate these tasks.

---

# User Journey

## Landing Page

Headline:

"Manage AI Marketing Agents Instead of Marketing Campaigns"

Subheading:

"Watch multiple AI agents collaborate to identify opportunities, create campaigns, and generate customer engagement strategies."

CTA:

Try Playground

---

# Demo Scenario

User selects a sample retail brand.

Examples:

* FabStyle Fashion
* SneakerHub
* Urban Grocery
* Coffee Club

---

# Sample Dataset

Each brand contains:

Customer Name

Email

Phone

Last Purchase Date

Lifetime Spend

Orders Count

Preferred Category

Location

Engagement Score

---

Example:

John Doe

Last Purchase:
90 days ago

Lifetime Spend:
₹18,000

Orders:
12

Preferred Category:
Sneakers

---

# Main Dashboard

Display:

Total Customers

Revenue

Active Customers

Dormant Customers

Repeat Purchase Rate

---

# Agents Architecture

The system contains four agents.

---

## Agent 1: Opportunity Agent

Responsibility:

Find business opportunities.

Input:

Customer dataset

Output:

Insights

Example:

* 2,341 customers inactive for 60+ days
* 821 VIP customers haven't purchased recently
* Repeat purchase rate dropped 8%

---

## Agent 2: Segmentation Agent

Responsibility:

Create customer groups.

Example segments:

VIP Customers

Dormant Customers

High Intent Customers

Discount Seekers

New Customers

Output:

Segment cards

Customer counts

Potential revenue

---

## Agent 3: Strategy Agent

Responsibility:

Recommend actions.

Input:

Segments

Output:

Campaign suggestions

Example:

Dormant Customers:

Offer:
15% discount

Channel:
WhatsApp

Expected Impact:
+12% reactivation

---

## Agent 4: Content Agent

Responsibility:

Generate campaign content.

Uses LLM.

Generates:

WhatsApp Message

Email Copy

Push Notification

Example:

"Hi John, it's been a while. Here's an exclusive 15% discount waiting for you."

---

# Agent Workflow Visualization

Display workflow:

Customer Data
↓
Opportunity Agent
↓
Segmentation Agent
↓
Strategy Agent
↓
Content Agent

Show agents running sequentially.

Use loading animations.

This is a major visual wow factor.

---

# AI Usage

Use Groq API.

Only Content Agent must use Groq.

Everything else can use business rules.

This reduces complexity.

---

# Example Agent Prompts

Content Agent Prompt:

You are an expert retail marketer.

Create a WhatsApp campaign message.

Customer Segment:
Dormant Customers

Offer:
15% Discount

Brand:
SneakerHub

Tone:
Friendly

Generate:

1. WhatsApp Message
2. Email Subject
3. Email Body

---

# Tech Stack

Frontend:

Next.js 15

TypeScript

Tailwind

shadcn/ui

Framer Motion

Backend:

Next.js API Routes

Database:

Static JSON

No database needed for MVP

AI:

 Groq API

Deployment:

Vercel

---

# Pages

Landing Page

Playground

Agent Workflow

Campaign Results

About Project

---

# UI Components

Metric Cards

Customer Table

Agent Cards

Campaign Generator

Generated Content Viewer

Execution Timeline

Insights Panel

---

# Features To Finish First

Priority 1

Landing Page

Mock Dataset

Agent Workflow

Generated Campaign

Priority 2

Campaign History

Analytics

Charts

Priority 3

Multiple Brands

User Upload CSV

Export Campaign

---

# Resume Description

Built an Agentic Marketing Playground that demonstrates how multiple AI agents collaborate to identify customer opportunities, create marketing strategies, and generate personalized campaign content for retail brands.

Tech Stack:
Next.js, TypeScript, TailwindCSS, Groq API, Framer Motion

---

# What Makes This Interesting

The project demonstrates:

* Product thinking
* AI-assisted workflows
* Agent orchestration
* Marketing automation
* Frontend engineering
* Backend engineering
* User experience design

Rather than building a generic chatbot, the project solves a realistic business problem and showcases how AI agents can create measurable customer engagement outcomes.
