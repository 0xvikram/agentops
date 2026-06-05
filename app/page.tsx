'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  MessageSquareText,
  Radar,
  Sparkles,
} from 'lucide-react';

const agents = [
  { name: 'Opportunity Agent', icon: Radar, copy: 'Finds growth moments hiding in customer data.' },
  { name: 'Segmentation Agent', icon: BarChart3, copy: 'Turns signals into revenue-ready audiences.' },
  { name: 'Strategy Agent', icon: BrainCircuit, copy: 'Chooses channel, offer, timing, and guardrails.' },
  { name: 'Content Agent', icon: MessageSquareText, copy: 'Writes campaign copy for each activation.' },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
              <Bot className="h-5 w-5 text-accent" />
            </span>
            <span className="text-lg font-semibold">AgentOps Marketing</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#agents" className="hover:text-white">Agents</a>
            <a href="#workflow" className="hover:text-white">Workflow</a>
            <Link href="/playground" className="rounded-lg border border-accent/40 px-4 py-2 text-accent hover:bg-accent hover:text-dark">
              Try Playground
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen px-6 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,212,255,0.18),transparent_32%),linear-gradient(135deg,#0A0E27_0%,#101936_54%,#07111d_100%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm text-accent">
              <Sparkles className="h-4 w-4" />
              Agentic Marketing Playground
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal md:text-7xl">
              Manage AI Marketing Agents Instead of Marketing Campaigns
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Watch multiple AI agents collaborate to identify opportunities, create campaigns,
              and generate customer engagement strategies.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/playground" className="btn-primary inline-flex items-center justify-center gap-2 text-base">
                Try Playground
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#workflow" className="btn-secondary inline-flex items-center justify-center text-base">
                See Workflow
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="glass-effect rounded-xl p-5 shadow-2xl shadow-cyan-950/30">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">Live demo run</p>
                  <h2 className="text-xl font-semibold">SneakerHub Winback</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">Running</span>
              </div>
              <div className="space-y-4">
                {agents.map((agent, index) => {
                  const Icon = agent.icon;

                  return (
                    <div key={agent.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="font-semibold">{agent.name}</h3>
                            <span className="text-xs text-slate-400">0{index + 1}</span>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-slate-400">{agent.copy}</p>
                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                            <div className="h-full rounded-full bg-accent" style={{ width: `${92 - index * 14}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="agents" className="border-y border-white/10 bg-[#090f1f] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">What is built</p>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">An always-on team of AI agents for retail growth</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {agents.map((agent) => {
              const Icon = agent.icon;

              return (
                <article key={agent.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <Icon className="mb-5 h-6 w-6 text-accent" />
                  <h3 className="text-lg font-semibold">{agent.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{agent.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Workflow</p>
            <h2 className="mt-4 text-4xl font-semibold">From customer data to campaign content</h2>
            <p className="mt-5 leading-7 text-slate-400">
              The playground shows each agent working in sequence, with measurable outputs at every step.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            {['Customer Data', 'Opportunity', 'Segments', 'Strategy', 'Content'].map((step) => (
              <div key={step} className="rounded-lg border border-white/10 bg-dark-secondary p-4 text-center text-sm font-medium">
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
