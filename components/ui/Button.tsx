import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          "font-sans font-semibold rounded-xl px-6 py-3 transition-all duration-300 text-center focus:outline-none active:scale-[0.98]",
          {
            "bg-gold-gradient text-navy-dark hover:shadow-gold-glow-intense hover:brightness-110": variant === 'primary',
            "bg-[#1A2E42] text-white hover:bg-[#243B55] border border-[#C9A84C]/20": variant === 'secondary',
            "border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10": variant === 'outline',
            "w-full": fullWidth,
          }
        ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
