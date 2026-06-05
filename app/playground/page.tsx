'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { brands, getMetrics } from '@/lib/mock-data';
import Navbar from '@/components/ui/Navbar';
import BrandCard from '@/components/ui/BrandCard';

export default function Playground() {
  return (
    <main className="min-h-screen bg-dark text-slate-700 gradient-bg grid-bg pb-20">
      {/* Reusable Navbar */}
      <Navbar showPlaygroundButton={false} />

      <header className="pt-28 pb-10 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-accent border border-amber-100 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Developer Playground
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Choose a retail dataset to analyze
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed">
              Select one of our sample retail datasets containing real customer purchase histories, preferred categories, locations, and engagement profiles for testing the agent pipeline.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {brands.map((brand) => {
            const metrics = getMetrics(brand.customers);

            return (
              <BrandCard
                key={brand.id}
                id={brand.id}
                name={brand.name}
                category={brand.category}
                description={brand.description}
                accent={brand.accent}
                metrics={{
                  totalCustomers: metrics.totalCustomers,
                  dormantCustomers: metrics.dormantCustomers,
                  repeatPurchaseRate: metrics.repeatPurchaseRate,
                }}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
