import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export default function Card({
  children,
  className,
  interactive = true,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-[#1A2E42] border border-[#C9A84C]/20 rounded-xl p-6 transition-all duration-300",
          {
            "hover:border-[#C9A84C]/50 hover:shadow-gold-glow cursor-pointer": interactive,
          }
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
