'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, UsersRound } from 'lucide-react';
import { brands, getMetrics } from '@/lib/mock-data';

export default function Playground() {
  return (
    <main className="min-h-screen bg-dark text-white">
      <header className="border-b border-white/10 bg-dark/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent">
            Playground
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Select a brand</p>
          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Choose a retail dataset for the agents to analyze</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Each sample brand includes customer data, purchase behavior, category preferences, and engagement scores.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {brands.map((brand) => {
            const metrics = getMetrics(brand.customers);

            return (
              <Link
                key={brand.id}
                href={`/playground/${brand.id}`}
                className="group rounded-xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/[0.06]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${brand.accent}22`, color: brand.accent }}
                    >
                      <Building2 className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm text-slate-400">{brand.category}</p>
                      <h2 className="mt-1 text-2xl font-semibold">{brand.name}</h2>
                      <p className="mt-3 leading-7 text-slate-400">{brand.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-accent" />
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-dark-secondary p-3">
                    <UsersRound className="mb-2 h-4 w-4 text-accent" />
                    <p className="text-xl font-semibold">{metrics.totalCustomers}</p>
                    <p className="text-xs text-slate-500">Customers</p>
                  </div>
                  <div className="rounded-lg bg-dark-secondary p-3">
                    <p className="text-xl font-semibold">{metrics.dormantCustomers}</p>
                    <p className="text-xs text-slate-500">Dormant</p>
                  </div>
                  <div className="rounded-lg bg-dark-secondary p-3">
                    <p className="text-xl font-semibold">{metrics.repeatPurchaseRate}%</p>
                    <p className="text-xs text-slate-500">Repeat rate</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
