import React, { useState } from 'react';
import { ExternalLink, X, ShieldCheck, Calendar } from 'lucide-react';

export const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeC-1cOvlSJ78x5aH5BfEy41Q4fa77frBHinFGt8AtwxwMFGg/viewform?usp=publish-editor";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      
      <div className="w-full max-w-4xl mx-auto text-center relative z-10 space-y-6 sm:space-y-8">
        
        {/* Top Specular Badge - Nexure Studio, Launch Date Oct 20th & Free Pre-Booking */}
        <div className="inline-flex items-center justify-center">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-purple-100/90 backdrop-blur-md border border-purple-200/90 shadow-xs text-purple-900 text-xs sm:text-sm font-bold tracking-tight">
            <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="font-extrabold text-purple-950">Nexure Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span>Launch Date: Oct 20th</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span className="text-purple-700 font-black">Pre Booking is Free</span>
          </div>
        </div>

        {/* MIDDLE ALIGNED LARGER TRANSPARENT ZERUS LOGO */}
        <div className="flex flex-col items-center justify-center space-y-4 pt-1 sm:pt-3">
          
          <div className="relative group cursor-pointer w-full" onClick={() => setIsFormOpen(true)}>
            
            {/* Larger Zerus Logo Image Box */}
            <div className="p-2 sm:p-4 w-full max-w-sm sm:max-w-xl md:max-w-2xl mx-auto group-hover:scale-105 transition-transform duration-500">
              <img 
                src="/zerus-logo-transparent.png" 
                alt="Zerus Logo Text V.1.1" 
                className="w-full h-auto object-contain max-h-64 sm:max-h-80 md:max-h-[22rem] mx-auto filter drop-shadow-xl"
              />
            </div>

            {/* Glowing Accent Ring Behind Logo */}
            <div className="absolute -inset-6 bg-purple-400/30 rounded-full blur-3xl opacity-50 group-hover:opacity-85 transition-opacity -z-10"></div>
          </div>

          {/* Sub-Headline */}
          <p className="text-lg sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-900 bg-clip-text text-transparent tracking-tight px-2">
            Next-Generation Video Editing Suite
          </p>

        </div>

        {/* Subtitle Paragraph */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto font-normal leading-relaxed px-2">
          Create stunning videos with powerful tools, AI features, and a seamless browser-native editing experience.
        </p>

        {/* DOWN: GLASS UI BUTTON "PRE BOOK" (TOUCH FRIENDLY MOBILE TARGET) */}
        <div className="pt-2 flex flex-col items-center justify-center space-y-3 sm:space-y-4">
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="glass-purple-button w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-extrabold flex items-center justify-center shadow-2xl cursor-pointer active:scale-95 transition-all min-h-[52px]"
          >
            <span>Pre Book</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 text-xs sm:text-sm">
            <span className="text-purple-900 font-extrabold flex items-center gap-1.5 bg-purple-100/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-200/90 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Pre Booking is Free</span>
            </span>
            <span className="text-purple-900 font-extrabold bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-200 shadow-2xs">
              From Oct 20th Onwards: <span className="text-purple-700 font-black">₹149 / Month</span>
            </span>
          </div>

        </div>

      </div>

      {/* GOOGLE FORM EMBEDDED GLASS MODAL (MOBILE RESPONSIVE) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/70 backdrop-blur-xl">
          
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl w-full max-w-4xl h-[94vh] sm:h-[90vh] shadow-2xl border border-purple-200/80 flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-300">
            
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-purple-50/90 border-b border-purple-100">
              <div className="flex items-center gap-2 sm:gap-3 truncate">
                <img src="/zerus-logo-transparent.png" alt="Zerus" className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0" />
                <div className="truncate">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">Zerus Free Pre-Book Form</h3>
                  <p className="text-[10px] sm:text-[11px] text-purple-600 font-semibold truncate">Launch Date: Oct 20th • ₹149/Month From Oct 20 Onwards</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a 
                  href={googleFormUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1 shadow-2xs"
                >
                  <span className="hidden xs:inline">Open in Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Google Form Iframe */}
            <div className="flex-1 w-full h-full bg-slate-50 relative overflow-hidden">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSeC-1cOvlSJ78x5aH5BfEy41Q4fa77frBHinFGt8AtwxwMFGg/viewform?embedded=true"
                className="w-full h-full border-0"
                title="Zerus Pre-Book Google Form"
              >
                Loading Google Form...
              </iframe>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};
