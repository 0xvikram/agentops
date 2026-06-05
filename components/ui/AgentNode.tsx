import type { LucideIcon } from 'lucide-react';
import { CheckCircle2, Clock3 } from 'lucide-react';

interface AgentNodeProps {
  name: string;
  description: string;
  status: 'idle' | 'running' | 'complete';
  icon: LucideIcon;
  isLast?: boolean;
}

export default function AgentNode({ name, description, status, icon: Icon, isLast = false }: AgentNodeProps) {
  return (
    <div className="relative">
      {!isLast && <div className="absolute left-5 top-12 h-7 w-px bg-slate-200" />}
      <div className="flex items-start gap-4">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${statusClass(status)}`}>
          {status === 'complete' ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : status === 'running' ? (
            <Clock3 className="h-5 w-5 animate-pulse" />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </span>
        <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-800">{name}</h3>
            <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {status}
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

function statusClass(status: AgentNodeProps['status']) {
  if (status === 'complete') {
    return 'border-emerald-100 bg-emerald-50 text-emerald-600';
  }

  if (status === 'running') {
    return 'border-indigo-100 bg-indigo-50 text-indigo-600';
  }

  return 'border-slate-200 bg-white text-slate-400';
}
