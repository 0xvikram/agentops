import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  className = '',
  icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const sizeClass = size === 'lg' ? 'px-6 py-3 text-base' : size === 'sm' ? 'px-3 py-2 text-xs' : 'px-5 py-2.5 text-sm';
  const variantClass =
    variant === 'primary'
      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-sm hover:shadow-amber-500/20'
      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm';

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' ? icon : null}
      {children}
      {icon && iconPosition === 'right' ? icon : null}
    </button>
  );
}
