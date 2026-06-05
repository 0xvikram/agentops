import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Building2, UsersRound } from 'lucide-react';

interface BrandCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  accent: string;
  metrics: {
    totalCustomers: number;
    dormantCustomers: number;
    repeatPurchaseRate: number;
  };
}

export default function BrandCard({ id, name, category, description, accent, metrics }: BrandCardProps) {
  return (
    <Link
      href={`/playground/${id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-premium transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-glow-indigo"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
            style={{ backgroundColor: `${accent}18`, borderColor: `${accent}30`, color: accent }}
          >
            <Building2 className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{category}</p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">{name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">{description}</p>
          </div>
        </div>
        <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <CardMetric icon={<UsersRound className="h-4 w-4 text-indigo-500" />} label="Customers" value={metrics.totalCustomers.toString()} />
        <CardMetric label="Dormant" value={metrics.dormantCustomers.toString()} />
        <CardMetric label="Repeat" value={`${metrics.repeatPurchaseRate}%`} />
      </div>
    </Link>
  );
}

function CardMetric({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      {icon}
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}
