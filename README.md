# Agentic Marketing Playground

An interactive sandbox demonstrating how multiple AI agents collaborate to create and execute marketing campaigns for retail brands.

## Project Overview

This is a simplified demonstration of Xeno's "Agentic Marketing" vision, showing how a team of AI agents can:
- Analyze customer data autonomously
- Identify marketing opportunities
- Create personalized campaigns
- Generate marketing content at scale

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript and React
- **Styling**: Tailwind CSS with dark theme
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
agentops/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   ├── page.tsx                # Landing page
│   └── playground/
│       ├── page.tsx            # Brand selection
│       └── [brandId]/
│           └── page.tsx        # Agent orchestration dashboard
├── lib/
│   └── mock-data.ts            # Mock customer data & agents
├── components/                 # Reusable components (to be added)
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── .env.local.example
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Supabase credentials.

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Current (MVP Phase)
- [x] Landing page with hero section
- [x] Brand selection interface
- [x] Agent orchestration dashboard
- [x] Mock customer data (20 sample customers)
- [x] Agent simulation with progress tracking
- [x] Customer data visualization

### In Progress
- [ ] Supabase integration for data persistence
- [ ] Real-time agent status updates
- [ ] Campaign insights and recommendations
- [ ] Customer segmentation analysis
- [ ] Content generation preview

### Planned
- [ ] Real AI agent integration (OpenAI/Claude)
- [ ] Advanced analytics dashboard
- [ ] Campaign performance metrics
- [ ] Multi-tenant support
- [ ] Export functionality

## Sample Data

The playground includes 4 sample retail brands:
1. **FabStyle Fashion** - Premium fashion retail
2. **SneakerHub** - Streetwear and sneaker store
3. **Urban Grocery** - Organic and fresh produce
4. **Coffee Club** - Premium coffee and beverages

Each brand has 20 simulated customers with:
- Name, email, phone
- Last purchase date
- Lifetime spend
- Order count
- Preferred product category
- Location
- Engagement score

## Database Schema (Planned)

```sql
-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY,
  brand_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  last_purchase_date TIMESTAMP,
  lifetime_spend DECIMAL,
  orders_count INT,
  preferred_category VARCHAR,
  location VARCHAR,
  engagement_score INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY,
  brand_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  status VARCHAR,
  created_by_agent VARCHAR,
  target_segment VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent Insights table
CREATE TABLE agent_insights (
  id UUID PRIMARY KEY,
  campaign_id UUID NOT NULL,
  agent_type VARCHAR,
  insight_type VARCHAR,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## UI Design Philosophy

The design is inspired by the Xeno website with:
- **Dark theme** (#0a0e27) for modern, tech-forward aesthetic
- **Cyan accent** (#00d4ff) for key interactions
- **Glass morphism** effects for depth
- **Smooth animations** for engaging interactions
- **Clear information hierarchy** for complex agent data

## Development Roadmap

### Phase 1: Core MVP ✅ (Current)
- Landing page
- Brand selection
- Agent simulation dashboard

### Phase 2: Data Integration 🔄
- Supabase setup
- Customer data persistence
- Campaign creation interface

### Phase 3: Agent Capabilities
- Agent logic implementation
- Insight generation
- Campaign recommendations

### Phase 4: Polish & Deployment
- Performance optimization
- UI/UX refinements
- Vercel deployment

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Environment Variables on Vercel
Set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Contributing

This is a demo/playground project. Feel free to extend and customize based on your needs.

## License

MIT

## Support

For questions about the architecture or implementation, refer to the code comments or create an issue.

---

**Built with inspiration from Xeno's Agentic Marketing vision** 🚀
