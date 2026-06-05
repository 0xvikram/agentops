import type { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'indigo' | 'violet' | 'cyan' | 'emerald';
}

const glowClasses = {
  indigo: 'hover:shadow-glow-indigo',
  violet: 'hover:shadow-glow-violet',
  cyan: 'hover:shadow-glow-cyan',
  emerald: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.14)]',
};

export default function GlowCard({ children, className = '', glowColor = 'indigo' }: GlowCardProps) {
  return (
    <article className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-premium transition-all duration-200 hover:-translate-y-1 ${glowClasses[glowColor]} ${className}`}>
      {children}
    </article>
  );
}
