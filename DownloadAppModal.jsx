import React from 'react';
import { X, Monitor, Laptop, Globe, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DownloadAppModal = ({ isOpen, onClose }) => {
  const { triggerPreBookFlow } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 glass-card border border-white/90 shadow-2xl shadow-indigo-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Badge */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Live & Ready
            </span>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Present Web Version Available!</h3>
          </div>
        </div>

        {/* Notice Message */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2 mb-6">
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            You can use the full GPU-accelerated <strong className="text-indigo-900 font-bold">Zerus Web Version</strong> directly inside your browser right now!
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Native Desktop Edition apps for <strong className="text-slate-800 font-semibold">Windows (.exe)</strong> and <strong className="text-slate-800 font-semibold">macOS (.dmg)</strong> are in final compilation. Pre-booking for ₹99 grants you instant desktop installer links upon release!
          </p>
        </div>

        {/* Platform Status */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">Windows app</span>
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Pre-Order</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-slate-800">macOS app</span>
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Pre-Order</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href="#zerus-editing"
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-2xl glass-button-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Globe className="w-4 h-4 text-indigo-200" />
            <span>Launch Present Web Version Studio</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              onClose();
              triggerPreBookFlow();
            }}
            className="w-full py-3 px-6 rounded-2xl glass-button-secondary font-bold text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Pre-Book Desktop Pass (₹99)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
