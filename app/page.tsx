'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  MessageSquareText,
  Radar,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import GlowCard from '@/components/ui/GlowCard';

const agents = [
  { name: 'Opportunity Agent', icon: Radar, copy: 'Finds growth moments hiding in customer data.' },
  { name: 'Segmentation Agent', icon: BarChart3, copy: 'Turns signals into revenue-ready audiences.' },
  { name: 'Strategy Agent', icon: BrainCircuit, copy: 'Chooses channel, offer, timing, and guardrails.' },
  { name: 'Content Agent', icon: MessageSquareText, copy: 'Writes campaign copy for each activation.' },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-slate-700 gradient-bg grid-bg">
      {/* Premium Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen px-6 pt-32 pb-20 flex flex-col justify-center">
        {/* Soft violet radial blur decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
        
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
              Agentic Marketing Platform
            </div>
            <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Create autonomous agents that make <span className="text-gradient">personalised</span> marketing decisions.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
              Delivers the right message, offer, and timing for every customer—automatically. Manage multiple AI agents that find opportunities, segment users, and write copy.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/playground" passHref>
                <Button size="lg" variant="primary" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                  Try Playground
                </Button>
              </Link>
              <a href="#workflow">
                <Button size="lg" variant="secondary">
                  See Workflow
                </Button>
              </a>
            </div>
          </div>

          {/* Interactive Live Demo Preview Box */}
          <div className="relative">
            {/* Ambient backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-2xl blur-xl -z-10" />
            
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-md">
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Simulation Run</p>
                  <h2 className="text-lg font-bold text-slate-800">SneakerHub Winback</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100 animate-pulse-slow">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Running
                </span>
              </div>
              
              <div className="space-y-4">
                {agents.map((agent, index) => {
                  const Icon = agent.icon;

                  return (
                    <div 
                      key={agent.name} 
                      className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-indigo-100 hover:bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50/50 text-indigo-600">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="font-semibold text-slate-800 text-sm">{agent.name}</h3>
                            <span className="text-xs font-mono font-bold text-slate-400">0{index + 1}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500 leading-normal">{agent.copy}</p>
                          <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" 
                              style={{ width: `${92 - index * 14}%` }} 
                            />
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

      {/* Agents Showcase Section */}
      <section id="agents" className="border-y border-slate-100 bg-white px-6 py-24 relative">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Autonomous Modules
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              An always-on team of AI agents that run while you sleep.
            </h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed md:text-lg">
              No static journeys. No manual loops. Just millions of micro-decisions, constantly improving your customer lifetime value.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {agents.map((agent) => {
              const Icon = agent.icon;

              return (
                <GlowCard key={agent.name} glowColor="indigo" className="flex flex-col h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/50 text-indigo-600 mb-5">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-800">{agent.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{agent.copy}</p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="px-6 py-24 bg-dark">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Workflow
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              From customer data to campaign content.
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Watch each agent work in sequence to generate measurable customer interactions at every stage of the loop.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
            {['Customer Data', 'Opportunity', 'Segments', 'Strategy', 'Content'].map((step, idx) => (
              <React.Fragment key={step}>
                <div className="rounded-xl border border-slate-200 bg-white py-4 px-5 text-center text-sm font-bold text-slate-800 shadow-sm w-full sm:w-auto min-w-[110px] hover:border-indigo-300 hover:shadow-glow-indigo transition-all duration-200">
                  {step}
                </div>
                {idx < 4 && (
                  <ArrowRight className="h-5 w-5 text-slate-400 rotate-90 sm:rotate-0 my-2 sm:my-0 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-100 bg-white py-12 px-6 text-center text-sm text-slate-400 font-medium">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold text-xs">A</span>
            <span className="font-bold text-slate-700">AgentOps</span>
          </div>
          <p>© {new Date().getFullYear()} AgentOps Marketing Playground. Built for retail scale.</p>
        </div>
      </footer>
    </main>
  );
}
