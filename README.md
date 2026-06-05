# 🤖 AgentOps: Autonomous Retail Marketing Playground

AgentOps is a state-of-the-art agentic marketing sandbox built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It simulates an always-on team of autonomous marketing agents cooperating in a sequential pipeline to scan customer behavior, group segments, choose promotional channels/offers, and generate personalized campaign copies.

Inspired by premium product marketing platforms, it features a clean light-mode grid interface, responsive dashboards, dynamic interactive glows, and semantic visual previews of WhatsApp, Push, and Email notifications.

---

## 🚀 Key Features

### 1. Sequential AI Agent Pipeline
*   **Opportunity Agent**: Scans loaded customer behavior profiles, identifying risk points (dormancy rates, slipping high-value shoppers) and growth opportunities.
*   **Segmentation Agent**: Auto-partitions customer lists into actionable segments based on order counts, spend bands, activity thresholds, and category choices.
*   **Strategy Agent**: Selects the optimal campaign channel, decides the incentive (e.g. 15% discount), sets operational guardrails, and predicts response impact.
*   **Content Agent**: Leverages LLMs (via Groq API) to generate personalized campaign variations instantly mapped to the selected channels. Falls back on high-quality templates if no API key is configured.

### 2. Premium Light-Mode UI & Interactive Elements
*   **Dotted Canvas Background**: High-tech dotted canvas layout mapping the aesthetics of modern developer workspaces.
*   **Browser-Mockup Video Player**: Fully styled browser frame rendering the product walkthrough video on the homepage.
*   **WhatsApp / Push / Email Previews**: Outputs render inside semantic mockup controls rather than plain text blocks.
*   **Dynamic Glow Borders (`GlowCard`)**: Custom card containers featuring interactive hover elevations and soft colored shadows.

### 3. Smart Dataset Upload Engine
*   Supports `.csv`, `.xls`, and `.xlsx` customer lists.
*   **Fuzzy Column Mapping**: Normalizes and maps column headers automatically using alternative naming keys (e.g. LTV, Lifetime Spend, Revenue, totalspend).
*   **Built-in Row Fallbacks**: Fills in missing parameters dynamically with default settings (e.g. preferred category defaults to `General`) so any mixed dataset compiles and runs.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Excel Parsing**: xlsx (SheetJS)
*   **Creative Generation**: Groq SDK (Llama 3.1 8B)

---

## 📁 Repository Directory Structure

```text
├── app/
│   ├── api/
│   │   └── generate-content/     # POST endpoint calling Groq API
│   ├── playground/
│   │   ├── [brandId]/            # Brand workspace dashboard & uploader
│   │   └── page.tsx              # Sample Brand datasets directory
│   ├── globals.css               # Google Fonts, dotted grid & scrollbars
│   ├── layout.tsx                # Base HTML & Next font configs
│   └── page.tsx                  # Clean landing page & video showcase
├── components/
│   └── ui/                       # Reusable custom UI components
│       ├── AgentNode.tsx         # Workflow step rendering
│       ├── BrandCard.tsx         # Brand selector card
│       ├── Button.tsx            # Theme-compliant buttons
│       ├── GlowCard.tsx          # Gradient outline hover card
│       ├── MetricCard.tsx        # High-impact dashboard panels
│       ├── ModernTable.tsx       # Responsive customer list table
│       └── Navbar.tsx            # Glassmorphic header
├── lib/
│   ├── mock-data.ts              # Core type schemas & sample datasets
│   └── upload-parser.ts          # CSV/XLSX parsing & column normalizer
├── public/                       # Statics (video walkthrough)
├── tailwind.config.ts            # Custom colors, glows, animations
└── tsconfig.json                 # TypeScript compiler setup
```

---

## ⚡ Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: `GROQ_API_KEY` is optional. If left blank, the platform automatically serves localized marketing templates to ensure full functionality without an active key.)*

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
To optimize compilation and run static generation checks:
```bash
npm run build
npm run start
```

---

## 📊 Customer Dataset Schema

The uploader normalizes file column headers. For best results, include columns matching these terms:

| Column Name | Parser Alias Mappings | Default Fallback (if missing) |
| :--- | :--- | :--- |
| **Customer Name** | `customername`, `name`, `fullname`, `customer` | `Customer {Index}` |
| **Email** | `email`, `emailaddress` | `customer{Index}@example.com` |
| **Phone** | `phone`, `phonenumber`, `mobile`, `mobilephone` | `'-'` |
| **Lifetime Spend** | `lifetimespend`, `ltv`, `revenue`, `totalspend`, `spend` | `0` |
| **Orders Count** | `orderscount`, `orders`, `ordercount`, `totalorders` | `1` |
| **Preferred Category** | `preferredcategory`, `category`, `favoritecategory` | `'General'` |
| **Location** | `location`, `city`, `region` | `'Unknown'` |
| **Engagement Score** | `engagementscore`, `engagement`, `score` | `50` |
| **Last Purchase Date** | `lastpurchase`, `lastpurchasedate`, `lastorderdate` | `90` days ago |
