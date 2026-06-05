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
      <section className="relative pt-36 pb-12 px-6 flex flex-col items-center justify-center text-center">
        {/* Soft amber radial blur decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none -z-10" />
        
        <div className="relative mx-auto max-w-5xl flex flex-col items-center">
          {/* Top Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/60 px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#d97706] shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d97706] animate-ping" />
            AgentOps Marketing Platform • Built for Retail
          </div>
          
          {/* Main Title Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl max-w-4xl leading-[1.1]">
            Every retail marketer should <br/> be a manager <span className="italic font-serif text-[#d97706] font-normal">of agents.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-slate-500 font-medium">
            Manage multiple AI Agents that find opportunities, create content, make <strong className="text-slate-800 font-bold">1:1 communication</strong> decisions & unlock insights by working for you <strong className="text-slate-800 font-bold">24 * 7 * 365</strong>.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <Link href="/playground" passHref>
              <button className="px-8 py-4 bg-[#d97706] hover:bg-[#b45309] text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-amber-500/10 active:scale-[0.98] select-none text-base">
                Activate Autonomous Growth
              </button>
            </Link>
            <span className="text-xs font-semibold text-slate-400">
              Early access for retail brands
            </span>
          </div>
        </div>
      </section>

      {/* Centered Browser Video Mockup */}
      <section className="relative px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          {/* Demo Subtitle / Action Text */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              See Live Demo
            </span>
          </div>
          
          {/* Browser Container */}
          <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden group">
            {/* Browser Header Bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              {/* Window controls */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="h-3 w-3 rounded-full bg-rose-450 bg-[#ef4444]" />
                <span className="h-3 w-3 rounded-full bg-amber-450 bg-[#f59e0b]" />
                <span className="h-3 w-3 rounded-full bg-emerald-450 bg-[#10b981]" />
              </div>
              
              {/* Mock Address Bar */}
              <div className="flex-1 max-w-md mx-auto bg-white border border-slate-250 border-slate-200 rounded-md py-1 px-3 text-center text-xs font-medium text-slate-400 select-none truncate">
                agentops.ai / playground / overview
              </div>
              
              {/* Right empty spacer for header balance */}
              <div className="w-12 shrink-0" />
            </div>
            
            {/* Screen Video Content */}
            <div className="relative bg-slate-950 aspect-video flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                src="/Screen-Now-20260605T223752.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
          </div>
        </div>
      </section>

      {/* Agents Showcase Section */}
      <section id="agents" className="border-y border-slate-100 bg-white px-6 py-24 relative">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
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
                <GlowCard key={agent.name} glowColor="amber" className="flex flex-col h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/50 text-accent mb-5">
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
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
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
                <div className="rounded-xl border border-slate-200 bg-white py-4 px-5 text-center text-sm font-bold text-slate-800 shadow-sm w-full sm:w-auto min-w-[110px] hover:border-amber-300 hover:shadow-glow-amber transition-all duration-200">
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
            <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-50 text-accent border border-amber-100 font-bold text-xs">A</span>
            <span className="font-bold text-slate-700">AgentOps</span>
          </div>
          <p>© {new Date().getFullYear()} AgentOps Marketing Playground. Built for retail scale.</p>
        </div>
      </footer>
    </main>
  );
}
