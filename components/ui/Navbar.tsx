'use client';

import Link from 'next/link';
import { Bot, ArrowRight } from 'lucide-react';

interface NavbarProps {
  showPlaygroundButton?: boolean;
}

export default function Navbar({ showPlaygroundButton = true }: NavbarProps) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600">
            <Bot className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">AgentOps</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-500 md:flex">
          <a href="/#agents" className="hover:text-indigo-600">Agents</a>
          <a href="/#workflow" className="hover:text-indigo-600">Workflow</a>
          {showPlaygroundButton && (
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-indigo-700"
            >
              Try Playground
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
