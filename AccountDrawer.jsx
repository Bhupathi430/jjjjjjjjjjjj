import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PreBookPDFDocument } from './PreBookPDFDocument';
import { X, User, Mail, ShieldCheck, Sparkles, LogOut, CheckCircle2, Copy, Download, Calendar, CreditCard } from 'lucide-react';

export const AccountDrawer = () => {
  const { isAccountOpen, setIsAccountOpen, user, logout, preBookData, triggerPreBookFlow } = useAuth();
  const [copied, setCopied] = React.useState(false);

  if (!isAccountOpen || !user) return null;

  const copyPassId = () => {
    if (preBookData?.bookingId) {
      navigator.clipboard.writeText(preBookData.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm transition-all animate-fade-in">
      <div 
        className="w-full max-w-md h-full bg-white/90 backdrop-blur-2xl border-l border-white/80 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/70 pb-5 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Nexure Account Portal</h2>
            </div>
            <button
              onClick={() => setIsAccountOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Card */}
          <div className="p-5 rounded-2xl glass-card border border-white/90 mb-4 flex items-center gap-4 shadow-sm">
            <img 
              src={user.photoURL} 
              alt={user.name} 
              className="w-14 h-14 rounded-2xl border-2 border-indigo-200 shadow-md"
            />
            <div className="overflow-hidden">
              <h3 className="font-bold text-slate-900 text-base truncate">{user.name}</h3>
              <p className="text-xs text-indigo-600 font-semibold truncate flex items-center gap-1 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user.email}</span>
              </p>
              <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mt-2">
                {user.provider || 'Google Account'}
              </span>
            </div>
          </div>

          {/* Direct Downloads Actions */}
          <div className="space-y-2 mb-6">
            {/* PDF Pass Download Button */}
            <PreBookPDFDocument user={user} bookingData={preBookData} />
          </div>

          {/* Zerus Pre-Book Status Box */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Software Access & Bookings</h4>
              <span className="text-[10px] font-semibold text-indigo-600">Zerus Suite</span>
            </div>

            {preBookData ? (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white shadow-xl relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>

                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Pre-Book Active</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-300">₹99 PAID</span>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">Zerus Early Pass ID</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-lg font-mono font-black tracking-wide text-white">
                      {preBookData.bookingId}
                    </span>
                    <button
                      onClick={copyPassId}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-indigo-200 transition-all text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                  <div>
                    <span className="text-indigo-300">Booked Date:</span>
                    <p className="font-semibold text-slate-200">{preBookData.bookedAt}</p>
                  </div>
                  <div>
                    <span className="text-indigo-300">Payment:</span>
                    <p className="font-semibold text-slate-200">{preBookData.paymentMethod}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <p className="font-semibold text-indigo-200 mb-1">Your Pass Includes:</p>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {preBookData.perks.slice(0, 3).map((p, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl glass-panel border border-slate-200 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">No Active Pre-Bookings</h5>
                  <p className="text-xs text-slate-500 mt-0.5">Pre-book Zerus software today for just ₹99 to lock in 50% discount and priority beta access.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    triggerPreBookFlow();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl glass-button-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pre-Book Zerus @ ₹99 Now</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200/80 space-y-3">
          <button
            onClick={logout}
            className="w-full py-3 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-red-100 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Account</span>
          </button>
          
          <p className="text-[10px] text-slate-400 text-center">
            Nexure Studios Account System • Connected via Gmail ({user.email})
          </p>
        </div>
      </div>
    </div>
  );
};
