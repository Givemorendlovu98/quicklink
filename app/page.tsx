"use client";

import { useState, useEffect } from 'react';
import LinkButton from './components/LinkButton';
import { supabase } from './components/supabaseClient';

export default function Home() {
  // Now we store an array of link data from the database
  const [stats, setStats] = useState<any[]>([]);

  // 1. Fetch all link stats on load
  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('link_stats')
        .select('*')
        .order('id', { ascending: true });

      if (data) setStats(data);
      if (error) console.error(error);
    }
    fetchStats();
  }, []);

  // 2. Update the specific link in the database
  const handleLinkClick = async (label: string) => {
    // Find the current click count for this label
    const linkData = stats.find(item => item.label === label);
    if (!linkData) return;

    const newCount = linkData.clicks + 1;

    // UI Update (Immediate)
    setStats(prev => prev.map(item => 
      item.label === label ? { ...item, clicks: newCount } : item
    ));

    // Database Update
    await supabase
      .from('link_stats')
      .update({ clicks: newCount })
      .eq('label', label);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 px-6 py-12">
      <div className="flex flex-col items-center w-full max-w-[600px]">
        {/* Profile Header */}
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-3xl shadow-xl border-4 border-white">
          🚀
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Your Name</h1>
        <p className="mt-2 text-slate-500">Global Link Analytics Live ⚡️</p>

        {/* 3. Render Buttons with their specific counts */}
        <div className="mt-10 w-full space-y-4">
          {stats.map((link) => (
            <div key={link.id} className="relative group">
              <LinkButton 
                label={link.label}
                url={link.url || "#"} 
                onItemClick={() => handleLinkClick(link.label)}
              />
              {/* This is the badge showing the individual clicks */}
              {/* The badge: Always visible on mobile, hover-only on desktop */}
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg 
                    opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                {link.clicks} clicks
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}