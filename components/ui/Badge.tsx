import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'blue' | 'purple' | 'success' | 'error';
  className?: string;
}

export default function Badge({
  children,
  variant = 'gold',
  className
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-block font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider",
          {
            "bg-[#C9A84C]/10 text-[#E8C97A] border border-[#C9A84C]/30": variant === 'gold',
            "bg-blue-500/10 text-blue-400 border border-blue-500/30": variant === 'blue',
            "bg-purple-500/10 text-purple-400 border border-purple-500/30": variant === 'purple',
            "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30": variant === 'success',
            "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30": variant === 'error',
          }
        ),
        className
      )}
    >
      {children}
    </span>
  );
}
