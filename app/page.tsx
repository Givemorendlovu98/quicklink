"use client";

import { useState, useEffect } from 'react';
import LinkButton from './components/LinkButton';
import { supabase } from './components/supabaseClient'; // 1. Import our bridge

export default function Home() {
  const [totalClicks, setTotalClicks] = useState(0);

  // 2. THE GLOBAL LOADER: Fetches the number from the cloud database
  useEffect(() => {
    async function fetchClicks() {
      const { data, error } = await supabase
        .from('analytics')
        .select('click_count')
        .single(); // We only want that one row we created!

      if (data) {
        setTotalClicks(data.click_count);
      }
      if (error) console.error("Error fetching clicks:", error);
    }

    fetchClicks();
  }, []);

  const links = [
    { label: "My Portfolio", url: "https://yourportfolio.com" },
    { label: "Twitter / X", url: "https://x.com/yourhandle" },
    { label: "LinkedIn", url: "https://linkedin.com/in/username" },
    { label: "My GitHub", url: "https://github.com/yourname" },
  ];

  // 3. THE GLOBAL SAVER: Updates the count in the cloud
  const handleLinkClick = async () => {
    // Optimistic Update: Change it on the screen immediately for speed
    const newCount = totalClicks + 1;
    setTotalClicks(newCount);
    
    // Update the cloud!
    const { error } = await supabase
      .from('analytics')
      .update({ click_count: newCount })
      .eq('id', 1); // This targets the row where id is 1

    if (error) console.error("Error updating database:", error);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 px-6 py-12 md:py-24">
      
      {/* 4. GLOBAL BADGE: Now showing stats from everyone! */}
      <div className="fixed top-6 right-6 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-xs font-black uppercase tracking-widest text-slate-600 shadow-sm z-50">
        🌎 {totalClicks} Total Clicks
      </div>

      <div className="flex flex-col items-center w-full max-w-[600px]">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative w-28 h-28 bg-white rounded-full flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-white overflow-hidden">
             🚀
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Name
        </h1>
        
        <p className="mt-2 text-slate-500 font-medium text-center">
          Building in public • 2026 Batch 
        </p>

        <div className="mt-10 w-full space-y-4">
          {links.map((link, index) => (
            <LinkButton 
              key={index}
              label={link.label}
              url={link.url}
              onItemClick={handleLinkClick}
            />
          ))}
        </div>

        <footer className="mt-auto pt-12 text-slate-400 text-sm text-center">
          Data powered by Supabase ⚡️
        </footer>
      </div>
    </main>
  );
}