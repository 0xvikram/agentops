interface MetricCardProps {
  label: string;
  value: string;
  glowColor?: 'indigo' | 'cyan' | 'violet' | 'emerald' | 'amber' | 'orange';
}

const accents = {
  indigo: 'text-amber-600',
  cyan: 'text-cyan-600',
  violet: 'text-orange-600',
  emerald: 'text-emerald-600',
  amber: 'text-amber-600',
  orange: 'text-orange-600',
};

export default function MetricCard({ label, value, glowColor = 'amber' }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-premium">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-3 text-2xl font-extrabold ${accents[glowColor]}`}>{value}</p>
    </div>
  );
}
