"use client";

import { useState, useEffect } from 'react';
import LinkButton from './components/LinkButton';

export default function Home() {
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const savedClicks = localStorage.getItem("savedClicks");
    if (savedClicks) {
      setTotalClicks(parseInt(savedClicks));
    }
  }, []);

  const links = [
    { label: "My Portfolio", url: "https://yourportfolio.com" },
    { label: "Twitter / X", url: "https://x.com/yourhandle" },
    { label: "LinkedIn", url: "https://linkedin.com/in/username" },
    { label: "My GitHub", url: "https://github.com/yourname" },
    { label: "My Facebook", url: "https://facebook.com/yourname" },
  ];

  const handleLinkClick = () => {
    const newCount = totalClicks + 1;
    setTotalClicks(newCount);
    localStorage.setItem("savedClicks", newCount.toString());
  };

  return (
    // We changed 'bg-gray-50' to a subtle gradient 'bg-slate-50'
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-50 to-blue-100 px-6 py-12 md:py-24">
      
      {/* 1. FLOATING COUNTER: Fixed to the top so it doesn't move */}
      <div className="fixed top-6 right-6 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-xs font-black uppercase tracking-widest text-slate-600 shadow-sm z-50">
        🔥 {totalClicks} Clicks
      </div>

      {/* 2. PROFILE AREA */}
      <div className="flex flex-col items-center w-full max-w-[600px]">
        {/* Animated Avatar */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative w-28 h-28 bg-white rounded-full flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-white overflow-hidden">
             {/* Replace with an actual image link later! */}
             🚀
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Name
        </h1>
        
        <p className="mt-2 text-slate-500 font-medium text-center">
          Building in public • 2026 Batch 
        </p>

        {/* 3. THE LINKS CONTAINER */}
        {/* 'mt-10' adds space above, 'space-y-4' adds space between buttons */}
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

        {/* 4. FOOTER: Gives it a professional 'Startup' feel */}
        <footer className="mt-auto pt-12 text-slate-400 text-sm">
          Built with ⚡️ Next.js
        </footer>
      </div>
    </main>
  );
}