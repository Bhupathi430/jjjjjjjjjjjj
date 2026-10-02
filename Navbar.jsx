import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Navbar = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeC-1cOvlSJ78x5aH5BfEy41Q4fa77frBHinFGt8AtwxwMFGg/viewform?usp=publish-editor";

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/85 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border border-purple-100 shadow-lg shadow-purple-950/5">
          
          {/* Left: Brand Logo & Nexure Studio Text */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img src="/zerus-logo-transparent.png" alt="Zerus Logo" className="h-7 sm:h-9 w-auto object-contain" />
            <div className="flex items-center gap-2 border-l border-purple-200/80 pl-2 sm:pl-3">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight flex items-center gap-1">
                <span className="text-purple-500 text-[10px] sm:text-xs font-medium">by</span>
                <span className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 bg-clip-text text-transparent font-black">Nexure Studio</span>
              </span>
            </div>
            <span className="hidden md:inline-block text-[11px] sm:text-xs font-extrabold text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200 ml-1">
              Launch Oct 20th
            </span>
          </a>

          {/* Right: Glass Pre-Book Action */}
          <a 
            href={googleFormUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all flex items-center gap-1.5 shadow-md shrink-0"
          >
            <span>Pre Book Free</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

        </div>
      </div>
    </header>
  );
};
