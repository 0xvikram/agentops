'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  MessageSquareText,
  Play,
  Radar,
  RefreshCcw,
  Sparkles,
  Target,
  UsersRound,
} from 'lucide-react';
import {
  createFallbackContent,
  getBrand,
  getMetrics,
  runOpportunityAgent,
  runSegmentationAgent,
  runStrategyAgent,
  type CampaignStrategy,
  type GeneratedContent,
  type OpportunityInsight,
  type Segment,
} from '@/lib/mock-data';
import { parseCustomerFile } from '@/lib/upload-parser';

interface PageProps {
  params: {
    brandId: string;
  };
}

type AgentId = 'opportunity' | 'segmentation' | 'strategy' | 'content';
type AgentStatus = 'idle' | 'running' | 'complete';

interface AgentRun {
  id: AgentId;
  name: string;
  icon: typeof Radar;
  description: string;
  status: AgentStatus;
}

const agentDefinitions: Omit<AgentRun, 'status'>[] = [
  {
    id: 'opportunity',
    name: 'Opportunity Agent',
    icon: Radar,
    description: 'Scans customer behavior for revenue opportunities and risk signals.',
  },
  {
    id: 'segmentation',
    name: 'Segmentation Agent',
    icon: UsersRound,
    description: 'Builds actionable groups from purchase history and engagement.',
  },
  {
    id: 'strategy',
    name: 'Strategy Agent',
    icon: Target,
    description: 'Recommends offer, channel, impact estimate, and sending guardrails.',
  },
  {
    id: 'content',
    name: 'Content Agent',
    icon: MessageSquareText,
    description: 'Generates campaign content with Groq when an API key is configured.',
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function BrandPlayground({ params }: PageProps) {
  const brand = getBrand(params.brandId);
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState<AgentRun[]>(agentDefinitions.map((agent) => ({ ...agent, status: 'idle' })));
  const [opportunities, setOpportunities] = useState<OpportunityInsight[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [strategy, setStrategy] = useState<CampaignStrategy | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [customers, setCustomers] = useState(() => brand?.customers ?? []);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  const metrics = useMemo(() => (customers.length > 0 ? getMetrics(customers) : null), [customers]);

  if (!brand || !metrics) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Brand not found</h1>
          <Link href="/playground" className="mt-6 inline-flex text-accent hover:text-accent-hover">
            Back to playground
          </Link>
        </div>
      </main>
    );
  }

  async function runAgents() {
    if (!brand) return;

    setIsRunning(true);
    setAgents(agentDefinitions.map((agent) => ({ ...agent, status: 'idle' })));
    setOpportunities([]);
    setSegments([]);
    setStrategy(null);
    setContent(null);

    await runStep('opportunity', async () => {
      setOpportunities(runOpportunityAgent(customers));
    });

    let nextSegments: Segment[] = [];
    await runStep('segmentation', async () => {
      nextSegments = runSegmentationAgent(customers);
      setSegments(nextSegments);
    });

    let nextStrategy: CampaignStrategy | null = null;
    await runStep('strategy', async () => {
      nextStrategy = runStrategyAgent(nextSegments);
      setStrategy(nextStrategy);
    });

    await runStep('content', async () => {
      const finalStrategy = nextStrategy ?? runStrategyAgent(nextSegments);

      try {
        const response = await fetch('/api/generate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brandName: brand.name,
            audience: brand.audience,
            strategy: finalStrategy,
          }),
        });
        setContent(normalizeGeneratedContent(await response.json(), brand.name, finalStrategy));
      } catch {
        setContent(createFallbackContent(brand.name, finalStrategy));
      }
    });

    setIsRunning(false);
  }

  async function runStep(agentId: AgentId, action: () => void | Promise<void>) {
    setAgents((current) =>
      current.map((agent) => (agent.id === agentId ? { ...agent, status: 'running' } : agent)),
    );
    await wait(850);
    await action();
    await wait(450);
    setAgents((current) =>
      current.map((agent) => (agent.id === agentId ? { ...agent, status: 'complete' } : agent)),
    );
  }

  function resetRun() {
    setIsRunning(false);
    setAgents(agentDefinitions.map((agent) => ({ ...agent, status: 'idle' })));
    setOpportunities([]);
    setSegments([]);
    setStrategy(null);
    setContent(null);
  }

  async function handleUpload(file: File | undefined) {
    if (!file) return;

    setUploadError('');
    resetRun();

    try {
      const parsedCustomers = await parseCustomerFile(file);
      setCustomers(parsedCustomers);
      setUploadedFileName(file.name);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Could not parse this file.');
    }
  }

  function restoreSampleData() {
    if (!brand) return;

    resetRun();
    setCustomers(brand.customers);
    setUploadedFileName('');
    setUploadError('');
  }

  return (
    <main className="min-h-screen bg-dark text-white">
      <header className="border-b border-white/10 bg-dark/95">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Link href="/playground" className="mb-5 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to brands
          </Link>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{brand.category}</p>
              <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{brand.name} Agent Run</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">{brand.description}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={runAgents} disabled={isRunning} className="btn-primary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60">
                <Play className="h-5 w-5" />
                {isRunning ? 'Running Agents' : 'Run Agents'}
              </button>
              <button onClick={resetRun} className="btn-secondary inline-flex items-center gap-2">
                <RefreshCcw className="h-5 w-5" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8 rounded-xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FileSpreadsheet className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold">Upload Custom Customer Data</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  Supports CSV, XLS, and XLSX files. Best columns: Customer Name, Email, Phone, Last Purchase Date,
                  Lifetime Spend, Orders Count, Preferred Category, Location, Engagement Score.
                </p>
                {uploadedFileName && (
                  <p className="mt-3 text-sm text-accent">
                    Analyzing uploaded file: {uploadedFileName}
                  </p>
                )}
                {uploadError && (
                  <p className="mt-3 text-sm text-rose-300">
                    {uploadError}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Upload File
                <input
                  type="file"
                  accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  className="hidden"
                  onChange={(event) => handleUpload(event.target.files?.[0])}
                />
              </label>
              <button onClick={restoreSampleData} className="btn-secondary inline-flex items-center justify-center">
                Use Sample Data
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-5">
          <MetricCard label="Total Customers" value={metrics.totalCustomers.toString()} />
          <MetricCard label="Revenue" value={`Rs ${metrics.revenue.toLocaleString('en-IN')}`} />
          <MetricCard label="Active" value={metrics.activeCustomers.toString()} />
          <MetricCard label="Dormant" value={metrics.dormantCustomers.toString()} />
          <MetricCard label="Repeat Rate" value={`${metrics.repeatPurchaseRate}%`} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Sequential workflow</p>
                <h2 className="text-2xl font-semibold">Agent Workflow</h2>
              </div>
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div className="space-y-4">
              {agents.map((agent, index) => {
                const Icon = agent.icon;

                return (
                  <div key={agent.id} className="relative rounded-lg border border-white/10 bg-dark-secondary p-4">
                    {index < agents.length - 1 && <div className="absolute left-9 top-16 h-6 w-px bg-accent/30" />}
                    <div className="flex items-start gap-4">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${agent.status === 'complete' ? 'bg-emerald-400/15 text-emerald-300' : agent.status === 'running' ? 'bg-accent/15 text-accent' : 'bg-slate-700 text-slate-300'}`}>
                        {agent.status === 'complete' ? <CheckCircle2 className="h-5 w-5" /> : agent.status === 'running' ? <Clock3 className="h-5 w-5 animate-pulse" /> : <Icon className="h-5 w-5" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-semibold">{agent.name}</h3>
                          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs capitalize text-slate-300">{agent.status}</span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{agent.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Agent outputs</p>
                <h2 className="text-2xl font-semibold">Campaign Results</h2>
              </div>
              <Bot className="h-6 w-6 text-accent" />
            </div>

            <div className="space-y-6">
              <OutputBlock title="Opportunity Insights" isEmpty={opportunities.length === 0}>
                <div className="grid gap-3 sm:grid-cols-3">
                  {opportunities.map((insight) => (
                    <div key={insight.label} className="rounded-lg bg-dark-secondary p-4">
                      <p className="text-sm text-slate-400">{insight.label}</p>
                      <p className="mt-2 text-3xl font-semibold text-accent">{insight.value}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{insight.detail}</p>
                    </div>
                  ))}
                </div>
              </OutputBlock>

              <OutputBlock title="Segments" isEmpty={segments.length === 0}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {segments.map((segment) => (
                    <div key={segment.name} className="rounded-lg bg-dark-secondary p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold">{segment.name}</h3>
                        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-sm text-accent">{segment.count}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{segment.description}</p>
                      <p className="mt-3 text-sm text-slate-300">Potential revenue: Rs {segment.potentialRevenue.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </OutputBlock>

              <OutputBlock title="Strategy" isEmpty={!strategy}>
                {strategy && (
                  <div className="grid gap-3 sm:grid-cols-4">
                    <MiniStat label="Segment" value={strategy.segment} />
                    <MiniStat label="Offer" value={strategy.offer} />
                    <MiniStat label="Channel" value={strategy.channel} />
                    <MiniStat label="Impact" value={strategy.expectedImpact} />
                    <div className="rounded-lg bg-dark-secondary p-4 sm:col-span-4">
                      <p className="text-sm text-slate-400">Guardrail</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{strategy.guardrail}</p>
                    </div>
                  </div>
                )}
              </OutputBlock>

              <OutputBlock title="Generated Content" isEmpty={!content}>
                {content && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-dark-secondary p-4">
                      <p className="text-sm text-slate-400">Source</p>
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-sm uppercase text-accent">{content.source}</span>
                    </div>
                    <ContentCard label="WhatsApp Message" value={content.whatsapp} />
                    <ContentCard label="Email Subject" value={content.emailSubject} />
                    <ContentCard label="Email Body" value={content.emailBody} preserveLines />
                    <ContentCard label="Push Notification" value={content.push} />
                  </div>
                )}
              </OutputBlock>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-semibold">Customer Data</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-slate-400">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Last Purchase</th>
                  <th className="px-4 py-3 font-medium">Lifetime Spend</th>
                  <th className="px-4 py-3 font-medium">Orders</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-white/5 text-slate-200 hover:bg-white/[0.03]">
                    <td className="px-4 py-3 font-medium text-white">{customer.name}</td>
                    <td className="px-4 py-3">{customer.lastPurchaseDays} days ago</td>
                    <td className="px-4 py-3">Rs {customer.lifetimeSpend.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">{customer.ordersCount}</td>
                    <td className="px-4 py-3 text-accent">{customer.preferredCategory}</td>
                    <td className="px-4 py-3">{customer.location}</td>
                    <td className="px-4 py-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${customer.engagementScore}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function OutputBlock({ title, isEmpty, children }: { title: string; isEmpty: boolean; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {isEmpty ? (
        <div className="rounded-lg border border-dashed border-white/15 bg-dark-secondary/60 p-5 text-sm text-slate-500">
          Waiting for agent output.
        </div>
      ) : (
        children
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-dark-secondary p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  );
}

function ContentCard({ label, value, preserveLines = false }: { label: string; value: string; preserveLines?: boolean }) {
  return (
    <div className="rounded-lg bg-dark-secondary p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-sm leading-6 text-slate-100 ${preserveLines ? 'whitespace-pre-line' : ''}`}>{value}</p>
    </div>
  );
}

function normalizeGeneratedContent(value: unknown, brandName: string, strategy: CampaignStrategy): GeneratedContent {
  const fallback = createFallbackContent(brandName, strategy);

  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const content = value as Partial<Record<keyof GeneratedContent, unknown>>;

  return {
    whatsapp: textOrFallback(content.whatsapp, fallback.whatsapp),
    emailSubject: textOrFallback(content.emailSubject, fallback.emailSubject),
    emailBody: textOrFallback(content.emailBody, fallback.emailBody),
    push: textOrFallback(content.push, fallback.push),
    source: content.source === 'groq' ? 'groq' : 'fallback',
  };
}

function textOrFallback(value: unknown, fallback: string) {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object') {
    const nested = (value as { message?: unknown; text?: unknown; body?: unknown }).message
      ?? (value as { text?: unknown }).text
      ?? (value as { body?: unknown }).body;

    if (typeof nested === 'string') {
      return nested;
    }
  }

  return fallback;
}
