interface MetricCardProps {
  label: string;
  value: string;
  glowColor?: 'indigo' | 'cyan' | 'violet' | 'emerald';
}

const accents = {
  indigo: 'text-indigo-600',
  cyan: 'text-cyan-600',
  violet: 'text-violet-600',
  emerald: 'text-emerald-600',
};

export default function MetricCard({ label, value, glowColor = 'indigo' }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-premium">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-3 text-2xl font-extrabold ${accents[glowColor]}`}>{value}</p>
    </div>
  );
}
