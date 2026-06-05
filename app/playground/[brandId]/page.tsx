'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Bot,
  FileSpreadsheet,
  Play,
  RefreshCcw,
  Sparkles,
  ChevronRight,
  Send,
  Mail,
  Smartphone,
  Info,
  Radar,
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

// Import Reusable UI Components
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import MetricCard from '@/components/ui/MetricCard';
import AgentNode from '@/components/ui/AgentNode';
import ModernTable from '@/components/ui/ModernTable';

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
  description: string;
  status: AgentStatus;
}

const agentDefinitions: Omit<AgentRun, 'status'>[] = [
  {
    id: 'opportunity',
    name: 'Opportunity Agent',
    description: 'Scans customer behavior for revenue opportunities and risk signals.',
  },
  {
    id: 'segmentation',
    name: 'Segmentation Agent',
    description: 'Builds actionable groups from purchase history and engagement.',
  },
  {
    id: 'strategy',
    name: 'Strategy Agent',
    description: 'Recommends offer, channel, impact estimate, and sending guardrails.',
  },
  {
    id: 'content',
    name: 'Content Agent',
    description: 'Generates campaign content with AI when model keys are configured.',
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function BrandPlayground({ params }: PageProps) {
  const brand = getBrand(params.brandId);
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState<AgentRun[]>(
    agentDefinitions.map((agent) => ({ ...agent, status: 'idle' }))
  );
  const [opportunities, setOpportunities] = useState<OpportunityInsight[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [strategy, setStrategy] = useState<CampaignStrategy | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [customers, setCustomers] = useState(() => brand?.customers ?? []);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  const metrics = useMemo(
    () => (customers.length > 0 ? getMetrics(customers) : null),
    [customers]
  );

  if (!brand || !metrics) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark px-6 text-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Brand not found</h1>
          <Link href="/playground" className="mt-6 inline-flex text-accent font-semibold hover:text-accent-hover">
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
      current.map((agent) => (agent.id === agentId ? { ...agent, status: 'running' } : agent))
    );
    await wait(850);
    await action();
    await wait(450);
    setAgents((current) =>
      current.map((agent) => (agent.id === agentId ? { ...agent, status: 'complete' } : agent))
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
    <main className="min-h-screen bg-dark text-slate-700 gradient-bg grid-bg pb-24">
      {/* Premium Navbar */}
      <Navbar showPlaygroundButton={false} />

      {/* Header Panel */}
      <header className="pt-28 pb-10 border-b border-slate-200/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <Link 
            href="/playground" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Brands
          </Link>
          
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-bold text-accent border border-amber-100">
                {brand.category}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                {brand.name} Workspace
              </h1>
              <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-500 leading-relaxed">
                {brand.description}
              </p>
            </div>
            
            <div className="flex gap-3 shrink-0">
              <Button 
                onClick={runAgents} 
                disabled={isRunning} 
                variant="primary"
                icon={<Play className="h-4 w-4" />}
              >
                {isRunning ? 'Running Agents...' : 'Run Pipeline'}
              </Button>
              <Button 
                onClick={resetRun} 
                variant="secondary"
                icon={<RefreshCcw className="h-4 w-4" />}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Section */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        
        {/* Upload Custom Data Section */}
        <section className="mb-10 rounded-xl border border-dashed border-slate-300 bg-white/50 p-6 transition-all hover:bg-white/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/50 text-accent">
                <FileSpreadsheet className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Upload Custom Customer Dataset</h2>
                <p className="mt-1 max-w-3xl text-xs md:text-sm text-slate-500 leading-relaxed">
                  Analyze your own customer list. Supports CSV and XLSX files. Provide columns like: Customer Name, Email, Lifetime Spend, Orders, Preferred Category, Location, Engagement Score.
                </p>
                
                {uploadedFileName && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs text-accent font-semibold font-mono">
                    Active File: {uploadedFileName}
                  </div>
                )}
                {uploadError && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 px-3 py-1 text-xs text-rose-700 font-semibold font-mono">
                    {uploadError}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-row gap-3 shrink-0">
              <label className="inline-flex cursor-pointer">
                <span className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 select-none active:scale-[0.98] px-5 py-2.5 text-sm bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-sm hover:shadow-amber-500/20">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Upload File
                </span>
                <input
                  type="file"
                  accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  className="hidden"
                  onChange={(event) => handleUpload(event.target.files?.[0])}
                />
              </label>
              <Button onClick={restoreSampleData} variant="secondary">
                Use Sample Data
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 mb-10">
          <MetricCard label="Total Customers" value={metrics.totalCustomers.toString()} glowColor="amber" />
          <MetricCard label="Total Revenue" value={`Rs ${metrics.revenue.toLocaleString('en-IN')}`} glowColor="amber" />
          <MetricCard label="Active Shoppers" value={metrics.activeCustomers.toString()} glowColor="cyan" />
          <MetricCard label="Dormant Shoppers" value={metrics.dormantCustomers.toString()} glowColor="orange" />
          <MetricCard label="Repeat rate" value={`${metrics.repeatPurchaseRate}%`} glowColor="emerald" />
        </div>

        {/* Two-Column Agent Panel Grid */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          
          {/* Agent Step Pipeline Block */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium h-fit">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Collaborating Pipeline</p>
                <h2 className="text-xl font-bold text-slate-800">Agent Flow</h2>
              </div>
              <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            </div>
            
            <div className="space-y-6">
              {agents.map((agent, index) => {
                const Icon = agent.id === 'opportunity' ? Radar : agent.id === 'segmentation' ? Sparkles : agent.id === 'strategy' ? Bot : Send;

                return (
                  <AgentNode
                    key={agent.id}
                    name={agent.name}
                    description={agent.description}
                    status={agent.status}
                    icon={Icon}
                    isLast={index === agents.length - 1}
                  />
                );
              })}
            </div>
          </section>

          {/* Outputs / Results Block */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Measurable Deliverables</p>
                <h2 className="text-xl font-bold text-slate-800">Campaign Results</h2>
              </div>
              <Bot className="h-5 w-5 text-accent" />
            </div>

            <div className="space-y-8">
              {/* Step 1: Opportunities */}
              <OutputBlock title="Opportunity Insights" isEmpty={opportunities.length === 0}>
                <div className="grid gap-3 sm:grid-cols-3">
                  {opportunities.map((insight) => (
                    <div 
                      key={insight.label} 
                      className="rounded-xl border border-slate-150 bg-slate-50/50 p-4 transition-all duration-200 hover:border-amber-250 hover:bg-white"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{insight.label}</span>
                      <p className="mt-2 text-2xl font-bold text-accent font-mono">{insight.value}</p>
                      <p className="mt-1 text-xs text-slate-500 leading-normal">{insight.detail}</p>
                    </div>
                  ))}
                </div>
              </OutputBlock>

              {/* Step 2: Segments */}
              <OutputBlock title="Target Segments" isEmpty={segments.length === 0}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {segments.map((segment) => (
                    <div 
                      key={segment.name} 
                      className="rounded-xl border border-slate-150 bg-slate-50/50 p-4 transition-all duration-200 hover:border-amber-250 hover:bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-sm font-bold text-slate-800">{segment.name}</h4>
                        <span className="rounded bg-amber-50 border border-amber-100 px-1.5 py-0.5 text-xs font-bold font-mono text-accent">
                          {segment.count}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">{segment.description}</p>
                      <p className="mt-3 text-xs font-bold text-slate-700">
                        Value Estimate: Rs {segment.potentialRevenue.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </OutputBlock>

              {/* Step 3: Strategy */}
              <OutputBlock title="Activation Strategy" isEmpty={!strategy}>
                {strategy && (
                  <div className="grid gap-3 sm:grid-cols-4">
                    <MiniStat label="Audience" value={strategy.segment} />
                    <MiniStat label="Offer" value={strategy.offer} />
                    <MiniStat label="Channel" value={strategy.channel} />
                    <MiniStat label="Impact" value={strategy.expectedImpact} />
                    <div className="rounded-xl border border-slate-150 bg-slate-50/50 p-4 sm:col-span-4">
                      <div className="flex items-center gap-1.5 text-accent">
                        <Info className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider">Operational Guardrail</span>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{strategy.guardrail}</p>
                    </div>
                  </div>
                )}
              </OutputBlock>

              {/* Step 4: Content */}
              <OutputBlock title="Generated Campaigns" isEmpty={!content}>
                {content && (
                  <div className="space-y-4">
                    {/* Source pill indicator */}
                    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs">
                      <span className="font-semibold text-slate-500">Creative Engine Source</span>
                      <span 
                        className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider
                          ${content.source === 'groq' ? 'bg-amber-50 border border-amber-100 text-accent' : 'bg-slate-100 border border-slate-200 text-slate-600'}
                        `}
                      >
                        {content.source}
                      </span>
                    </div>

                    {/* WhatsApp styled bubble mockup */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
                        WhatsApp Message
                      </span>
                      <div className="flex flex-col bg-[#E7F6E9] border border-[#d2edd6] rounded-2xl rounded-tr-none p-4 max-w-[90%] self-end shadow-sm">
                        <span className="text-[10px] font-bold text-[#128C7E] mb-1">WhatsApp Campaign</span>
                        <p className="text-xs md:text-sm text-[#2c3e50] leading-relaxed font-sans">{content.whatsapp}</p>
                        <span className="text-[9px] text-[#748c77] text-right mt-1.5 font-mono">11:35 AM</span>
                      </div>
                    </div>

                    {/* Push Notification styled banner mockup */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
                        Push Notification
                      </span>
                      <div className="bg-slate-900 text-white rounded-xl p-3.5 flex gap-3 shadow-md max-w-md border border-slate-800">
                        <Smartphone className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-100">{brand.name}</span>
                            <span className="text-[9px] text-slate-500 font-mono">now</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5 leading-normal">{content.push}</p>
                        </div>
                      </div>
                    </div>

                    {/* Email Browser Styled Mockup */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
                        Email Campaign
                      </span>
                      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                        <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 text-xs flex gap-2 items-center text-slate-400 font-sans">
                          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-700">Subject:</span>
                          <span className="text-slate-600 truncate font-medium">{content.emailSubject}</span>
                        </div>
                        <div className="p-5 text-xs md:text-sm text-slate-600 whitespace-pre-line leading-relaxed font-sans bg-white min-h-[120px]">
                          {content.emailBody}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </OutputBlock>
            </div>
          </section>
        </div>

        {/* Customer Database CRM Section */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-100 bg-amber-50/50 text-accent">
              <FileSpreadsheet className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Customer Records</h2>
              <p className="text-xs text-slate-400 mt-0.5">List of customers loaded into the system for agent analysis.</p>
            </div>
          </div>
          <ModernTable customers={customers} />
        </section>
      </section>
    </main>
  );
}

function OutputBlock({ title, isEmpty, children }: { title: string; isEmpty: boolean; children: React.ReactNode }) {
  return (
    <div className="transition-all duration-300">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
        <ChevronRight className="h-4 w-4 text-accent" />
        {title}
      </h3>
      {isEmpty ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-xs md:text-sm text-slate-400 font-medium">
          Waiting for agent output...
        </div>
      ) : (
        <div className="animate-fade-in">{children}</div>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-150 bg-slate-50/50 p-4">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      <p className="mt-1.5 text-xs md:text-sm font-bold text-slate-800">{value}</p>
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
    const nested =
      (value as { message?: unknown; text?: unknown; body?: unknown }).message ??
      (value as { text?: unknown }).text ??
      (value as { body?: unknown }).body;

    if (typeof nested === 'string') {
      return nested;
    }
  }

  return fallback;
}
