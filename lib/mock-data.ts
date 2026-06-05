export type BrandId = 'fabstyle' | 'sneakerhub' | 'urban-grocery' | 'coffee-club';

export interface Brand {
  id: BrandId;
  name: string;
  category: string;
  description: string;
  audience: string;
  accent: string;
  customers: Customer[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastPurchaseDays: number;
  lifetimeSpend: number;
  ordersCount: number;
  preferredCategory: string;
  location: string;
  engagementScore: number;
}

export interface DashboardMetrics {
  totalCustomers: number;
  revenue: number;
  activeCustomers: number;
  dormantCustomers: number;
  repeatPurchaseRate: number;
}

export interface OpportunityInsight {
  label: string;
  value: string;
  detail: string;
}

export interface Segment {
  name: string;
  count: number;
  potentialRevenue: number;
  description: string;
}

export interface CampaignStrategy {
  segment: string;
  offer: string;
  channel: string;
  expectedImpact: string;
  guardrail: string;
}

export interface GeneratedContent {
  whatsapp: string;
  emailSubject: string;
  emailBody: string;
  push: string;
  source: 'groq' | 'fallback';
}

const brandSeeds = {
  fabstyle: {
    name: 'FabStyle Fashion',
    category: 'Premium Fashion',
    description: 'A modern apparel label with seasonal drops and loyal city shoppers.',
    audience: 'style-conscious repeat buyers',
    accent: '#f472b6',
    categories: ['Dresses', 'Jackets', 'Denim', 'Accessories', 'Workwear'],
  },
  sneakerhub: {
    name: 'SneakerHub',
    category: 'Sneakers & Streetwear',
    description: 'A fast-moving sneaker store with launch drops, VIP buyers, and dormant collectors.',
    audience: 'sneaker collectors and streetwear fans',
    accent: '#22d3ee',
    categories: ['Sneakers', 'Hoodies', 'Caps', 'Limited Drops', 'Socks'],
  },
  'urban-grocery': {
    name: 'Urban Grocery',
    category: 'Fresh Grocery',
    description: 'A neighborhood grocery brand selling organic produce and weekly essentials.',
    audience: 'busy families and health-led shoppers',
    accent: '#84cc16',
    categories: ['Organic Produce', 'Dairy', 'Snacks', 'Beverages', 'Pantry'],
  },
  'coffee-club': {
    name: 'Coffee Club',
    category: 'Coffee & Beverages',
    description: 'A premium coffee membership brand with beans, brewers, and cafe rewards.',
    audience: 'daily coffee drinkers and subscription members',
    accent: '#f59e0b',
    categories: ['Coffee Beans', 'Cold Brew', 'Brewers', 'Merchandise', 'Tea'],
  },
} satisfies Record<BrandId, {
  name: string;
  category: string;
  description: string;
  audience: string;
  accent: string;
  categories: string[];
}>;

const names = [
  'Aarav Mehta',
  'Maya Kapoor',
  'Rohan Iyer',
  'Anika Rao',
  'Kabir Sharma',
  'Nisha Menon',
  'Vihaan Reddy',
  'Ira Singh',
  'Dev Patel',
  'Tara Joshi',
  'Arjun Nair',
  'Meera Shah',
  'Reyansh Bose',
  'Saanvi Jain',
  'Aditya Malhotra',
  'Kiara Verma',
  'Neil Khanna',
  'Zoya Ahmed',
  'Yash Gupta',
  'Riya Chawla',
];

const locations = ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai'];

function customerFor(brandId: BrandId, index: number): Customer {
  const seed = brandSeeds[brandId];
  const spendBand = [3200, 6800, 11500, 18400, 27600, 42100, 58900, 76200];
  const lastPurchase = [8, 14, 22, 31, 45, 63, 78, 95, 121, 148, 183, 220];
  const spend = spendBand[(index + brandId.length) % spendBand.length] + index * 725;
  const orders = ((index * 3 + brandId.length) % 18) + 1;
  const days = lastPurchase[(index * 2 + brandId.length) % lastPurchase.length];
  const first = names[index % names.length].split(' ')[0].toLowerCase();
  const last = names[index % names.length].split(' ')[1].toLowerCase();

  return {
    id: `${brandId}-${index + 1}`,
    name: names[index % names.length],
    email: `${first}.${last}@example.com`,
    phone: `+91 98${(70000000 + index * 37921).toString().slice(0, 8)}`,
    lastPurchaseDays: days,
    lifetimeSpend: spend,
    ordersCount: orders,
    preferredCategory: seed.categories[index % seed.categories.length],
    location: locations[(index + brandId.length) % locations.length],
    engagementScore: Math.max(18, 94 - days / 3 + (orders % 5) * 4),
  };
}

export const brands = (Object.keys(brandSeeds) as BrandId[]).map((id) => ({
  id,
  name: brandSeeds[id].name,
  category: brandSeeds[id].category,
  description: brandSeeds[id].description,
  audience: brandSeeds[id].audience,
  accent: brandSeeds[id].accent,
  customers: Array.from({ length: 20 }, (_, index) => customerFor(id, index)),
}));

export function getBrand(brandId: string): Brand | undefined {
  return brands.find((brand) => brand.id === brandId);
}

export function getMetrics(customers: Customer[]): DashboardMetrics {
  const revenue = customers.reduce((sum, customer) => sum + customer.lifetimeSpend, 0);
  const activeCustomers = customers.filter((customer) => customer.lastPurchaseDays <= 60).length;
  const dormantCustomers = customers.length - activeCustomers;
  const repeatCustomers = customers.filter((customer) => customer.ordersCount > 1).length;

  return {
    totalCustomers: customers.length,
    revenue,
    activeCustomers,
    dormantCustomers,
    repeatPurchaseRate: Math.round((repeatCustomers / customers.length) * 100),
  };
}

export function runOpportunityAgent(customers: Customer[]): OpportunityInsight[] {
  const dormant = customers.filter((customer) => customer.lastPurchaseDays >= 60);
  const vipDormant = dormant.filter((customer) => customer.lifetimeSpend >= 40000);
  const lowEngagement = customers.filter((customer) => customer.engagementScore < 45);

  return [
    {
      label: 'Dormant customers',
      value: `${dormant.length}`,
      detail: `${dormant.length} customers have not purchased in 60+ days.`,
    },
    {
      label: 'VIP risk',
      value: `${vipDormant.length}`,
      detail: `${vipDormant.length} high spenders are slipping and need a concierge-style winback.`,
    },
    {
      label: 'Engagement dip',
      value: `${lowEngagement.length}`,
      detail: `${lowEngagement.length} customers show weak engagement and need a stronger reason to return.`,
    },
  ];
}

export function runSegmentationAgent(customers: Customer[]): Segment[] {
  const vip = customers.filter((customer) => customer.lifetimeSpend >= 40000);
  const dormant = customers.filter((customer) => customer.lastPurchaseDays >= 60);
  const highIntent = customers.filter((customer) => customer.lastPurchaseDays < 45 && customer.engagementScore >= 70);
  const discountSeekers = customers.filter((customer) => customer.ordersCount >= 8 && customer.lifetimeSpend / customer.ordersCount < 6500);
  const newCustomers = customers.filter((customer) => customer.ordersCount <= 2);

  return [
    segmentFrom('VIP Customers', vip, 'High spenders who respond best to exclusivity.'),
    segmentFrom('Dormant Customers', dormant, 'Previously active shoppers who need a timely nudge.'),
    segmentFrom('High Intent Customers', highIntent, 'Engaged customers likely to convert with the right prompt.'),
    segmentFrom('Discount Seekers', discountSeekers, 'Repeat buyers who react strongly to value-led offers.'),
    segmentFrom('New Customers', newCustomers, 'First-time shoppers ready for a second purchase journey.'),
  ];
}

export function runStrategyAgent(segments: Segment[]): CampaignStrategy {
  const dormant = segments.find((segment) => segment.name === 'Dormant Customers') ?? segments[0];

  return {
    segment: dormant.name,
    offer: '15% discount',
    channel: 'WhatsApp',
    expectedImpact: '+12% reactivation',
    guardrail: 'Send once, exclude customers with purchases in the last 14 days.',
  };
}

export function createFallbackContent(brandName: string, strategy: CampaignStrategy): GeneratedContent {
  return {
    whatsapp: `Hi {{first_name}}, it has been a while. ${brandName} saved a ${strategy.offer} for you on styles picked for your next order. Want us to show you the best picks?`,
    emailSubject: `Your ${brandName} comeback offer is ready`,
    emailBody: `Hi {{first_name}},\n\nWe noticed you have not shopped with ${brandName} recently, so we created a simple way back in. Use your ${strategy.offer} on recommendations matched to your past favorites.\n\nCome back today and find something worth adding to your cart.`,
    push: `${strategy.offer} unlocked at ${brandName}. Come back before it expires.`,
    source: 'fallback',
  };
}

function segmentFrom(name: string, customers: Customer[], description: string): Segment {
  return {
    name,
    count: customers.length,
    potentialRevenue: customers.reduce((sum, customer) => sum + Math.round(customer.lifetimeSpend * 0.12), 0),
    description,
  };
}
