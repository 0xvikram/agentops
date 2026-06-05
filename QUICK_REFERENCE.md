# Quick Reference Guide

## 🚀 Getting Started

### Start Development Server
```bash
cd c:\Users\singh\Desktop\agentops
npm run dev
```

Then visit: http://localhost:3000

---

## 📍 Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/playground` | Brand selection |
| `/playground/fabstyle` | FabStyle Fashion dashboard |
| `/playground/sneakerhub` | SneakerHub dashboard |
| `/playground/urban-grocery` | Urban Grocery dashboard |
| `/playground/coffee-club` | Coffee Club dashboard |

---

## 🎯 Main Pages Explained

### 1. Landing Page (`app/page.tsx`)
- Headline: "Manage AI Marketing Agents Instead of Campaigns"
- Features section
- CTA: "Try Playground"

### 2. Brand Selection (`app/playground/page.tsx`)
- 4 clickable brand cards
- Shows customer count per brand
- Launch button to enter agent dashboard

### 3. Agent Dashboard (`app/playground/[brandId]/page.tsx`)
- **Left**: Agent orchestration with progress bars
- **Right**: Statistics panel
- **Bottom**: Customer data table
- **Controls**: Start/Pause/Reset buttons

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for linting errors
npm run lint

# Generate Supabase types (when DB set up)
npm run db:generate
```

---

## 📁 File Locations

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing page |
| `app/playground/page.tsx` | Brand selection |
| `app/playground/[brandId]/page.tsx` | Agent dashboard |
| `app/globals.css` | Global styles & theme |
| `tailwind.config.ts` | Tailwind theme config |
| `lib/mock-data.ts` | Mock customer generator |
| `package.json` | Dependencies |
| `.env.local.example` | Environment template |

---

## 🎨 Customization Points

### Colors
Edit `tailwind.config.ts` theme colors:
```typescript
colors: {
  'dark': '#0a0e27',
  'dark-secondary': '#1a1f3a',
  'accent': '#00d4ff',
}
```

### Mock Data
Edit `lib/mock-data.ts`:
- Modify `FIRST_NAMES`, `LAST_NAMES`, `CATEGORIES`, `LOCATIONS`
- Update `generateMockCustomers()` function
- Adjust customer count in `[brandId]/page.tsx`

### Agents
In `app/playground/[brandId]/page.tsx`:
- Add/remove agents in initial state
- Modify progress timing
- Change completion logic

---

## 🔌 API Routes (Ready for Implementation)

Create new files in `app/api/` for backend logic:

```
app/api/
├── customers/
│   ├── route.ts          # GET/POST customers
│   └── [id]/route.ts     # GET/PUT/DELETE specific customer
├── campaigns/
│   ├── route.ts          # GET/POST campaigns
│   └── [id]/route.ts     # Campaign details
└── agents/
    └── route.ts          # Agent execution endpoints
```

Example:
```typescript
// app/api/customers/route.ts
export async function GET() {
  // Fetch from Supabase
}

export async function POST(request: Request) {
  // Create new customer
}
```

---

## 🗄️ Database Schema (For Supabase Integration)

```sql
-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  status VARCHAR,
  created_by_agent VARCHAR,
  target_segment VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent Insights table
CREATE TABLE agent_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL,
  agent_type VARCHAR,
  insight_type VARCHAR,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 Environment Variables

Copy `.env.local.example` → `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🧪 Testing Quick Flows

### Test Brand Selection Flow
1. Go to `http://localhost:3000/playground`
2. Click each brand card
3. Click "Launch [Brand]"

### Test Agent Simulation
1. On agent dashboard
2. Click "Start Agents"
3. Watch progress bars
4. Click "Pause" to stop
5. Click "Reset" to restart

### Test Data Table
1. Scroll to bottom of agent dashboard
2. Check all 20 customers load
3. Verify engagement bars render

---

## 🚨 Troubleshooting

### Port 3000 already in use?
```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart
npm run dev
```

### TypeScript errors?
```bash
# Clear Next.js cache
rm -r .next
npm run dev
```

### Styles not loading?
```bash
# Reinstall Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 📊 Component Architecture

```
Landing Page
  ├── Hero Section
  ├── Features Grid
  └── CTA Button → Playground

Brand Selection
  ├── Brand Card (×4)
  │   ├── Brand Icon
  │   ├── Brand Name
  │   ├── Description
  │   └── Customer Count
  └── Launch Button

Agent Dashboard
  ├── Agent Panel (Left)
  │   ├── Control Buttons
  │   └── Agent Cards (×4)
  │       ├── Agent Name
  │       ├── Status Badge
  │       └── Progress Bar
  ├── Stats Panel (Right)
  │   ├── Total Customers
  │   ├── Engagement Score
  │   └── Avg Lifetime Value
  └── Customer Table (Bottom)
      ├── Table Headers
      └── Customer Rows (×20)
          ├── Name
          ├── Last Purchase
          ├── Lifetime Spend
          ├── Orders
          ├── Category
          └── Engagement Bar
```

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hooks](https://react.dev/reference/react/hooks)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase Documentation](https://supabase.com/docs) (for Phase 2)

---

## 📝 Notes

- **Mock Agents**: Currently simulate 2-second execution. Replace with real API calls in Phase 2.
- **Customer Data**: Generated randomly. Connect to Supabase for real persistence.
- **Styling**: Uses Tailwind utility classes. Avoid inline styles.
- **State Management**: Using React Hooks. Consider Redux/Zustand for complex state.

---

**Happy coding! 🎉**
