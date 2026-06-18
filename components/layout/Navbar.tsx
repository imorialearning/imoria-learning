"use client";
import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0D1B2A] border-b border-[#C9A84C]/10 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
            <BookOpen className="w-5 h-5 text-navy-dark" />
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-wide text-[#C9A84C] group-hover:text-[#E8C97A] transition-colors">
              IMORIA LEARNING
            </span>
            <p className="text-[10px] text-white-muted font-sans tracking-widest uppercase">
              BS English III
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/subjects" className="text-white-muted hover:text-[#E8C97A] transition-colors font-medium text-sm hidden sm:block">
            Subjects
          </Link>
          <Link href="/login">
            <Button variant="secondary" className="px-4 py-2 text-sm">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" className="px-4 py-2 text-sm">
              Register Free
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
