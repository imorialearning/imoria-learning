'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Direct initialization to ensure clean variables reading on Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Subject {
  id: string;
  name: string;
  code: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        setErrorMsg(null);
        // Clean query without filters to fetch all rows safely
        const { data, error } = await supabase
          .from('subjects')
          .select('*');
        
        if (error) {
          setErrorMsg(error.message);
          console.error("Supabase Error:", error);
        } else if (data) {
          setSubjects(data);
        }
      } catch (err: any) {
        setErrorMsg(err?.message || "An unexpected error occurred");
        console.error("Catch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (supabaseUrl && supabaseAnonKey) {
      fetchSubjects();
    } else {
      setErrorMsg("Vercel Environment Variables are missing or incorrect.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white font-sans antialiased selection:bg-[#C9A84C] selection:text-[#0D1B2A]">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl text-[#C9A84C] font-bold tracking-wide">
          IMORIA LEARNING
        </h1>
        <p className="text-[#CBD5E1] text-xl md:text-2xl tracking-wider max-w-2xl mx-auto font-light">
          Learn Smart. Rise Beyond.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#1A2E42] border border-[#C9A84C]/20 px-5 py-2.5 rounded-full text-sm font-medium text-[#E8C97A] shadow-lg">
          <span>📍</span> BS English Semester-III • BZU Multan
        </div>
      </header>

      {/* Main Subjects Section */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-center justify-between border-b border-[#243B55] pb-4 mb-10">
          <h2 className="text-2xl font-bold tracking-wide text-white">Course Subjects</h2>
          <span className="text-xs bg-[#243B55] uppercase tracking-widest text-[#CBD5E1] px-3 py-1 rounded-md">
            {loading ? 'Loading...' : `${subjects.length} Active`}
          </span>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="bg-red-900/30 border border-red-500/40 text-red-200 p-4 rounded-xl mb-8 text-sm max-w-xl mx-auto text-center">
            <strong>Database Alert:</strong> {errorMsg}
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-44 bg-[#1A2E42] rounded-xl border border-[#243B55] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-[#1A2E42]/50 rounded-xl border border-[#243B55]">
                <p className="text-[#CBD5E1] text-base mb-2">No active course cards fetched.</p>
                <p className="text-xs text-[#8892B0]">Please check if the 'subjects' table has rows inserted in Supabase.</p>
              </div>
            ) : (
              subjects.map((subject) => (
                <div 
                  key={subject.id} 
                  className="bg-[#1A2E42] border border-[#C9A84C]/10 rounded-xl p-6 transition-all duration-300 hover:border-[#C9A84C]/40 shadow-sm hover:shadow-md hover:-translate-y-1 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl bg-[#0D1B2A] p-3 rounded-xl border border-[#243B55] group-hover:border-[#C9A84C]/20 transition-all">
                      {subject.icon || '📖'}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white bg-[#243B55] border border-white/5 font-mono">
                      {subject.code}
                    </span>
                  </div>
                  <h3 className="text-xl text-[#C9A84C] font-semibold mb-2 line-clamp-1 group-hover:text-[#E8C97A] transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-[#CBD5E1] text-sm leading-relaxed line-clamp-2">
                    {subject.description}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
