import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, Sparkles, ArrowRight, ShieldCheck, Code2, Database } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, loginWithGoogle, loginWithEmail, setIsBackendGuideOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);

  if (!isAuthOpen) return null;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    loginWithEmail(email, password || 'password123');
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    const gEmail = customGoogleEmail || 'user.editor@gmail.com';
    const gName = gEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
    const formattedName = gName.charAt(0).toUpperCase() + gName.slice(1);
    loginWithGoogle(gEmail, formattedName || 'Nexure Creator');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-all animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-3xl p-8 glass-card border border-white/90 shadow-2xl shadow-indigo-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Liquid Ambient glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsAuthOpen(false);
            setShowGooglePrompt(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-200/50 mb-3 text-indigo-600 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome to Nexure Studio</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access Zerus Online Editing Software & Pre-Book Benefits
          </p>
        </div>

        {showGooglePrompt ? (
          /* Google Sign In Prompt UI */
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 text-center">
              <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <h3 className="font-semibold text-slate-800 text-sm">Sign in with Google</h3>
              <p className="text-xs text-slate-500 mt-0.5">Enter your Gmail address to simulate instant OAuth login</p>
            </div>

            <form onSubmit={handleGoogleSignIn} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Gmail Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="alex.creator@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl glass-button-primary font-semibold text-sm flex items-center justify-center gap-2"
              >
                <span>Continue as Google User</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowGooglePrompt(false)}
                className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                ← Back to standard login
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Google Sign In Button */}
            <button
              onClick={() => setShowGooglePrompt(true)}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-all flex items-center justify-center gap-3 group text-slate-700 font-semibold text-sm mb-5"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white/90 px-3 py-0.5 text-[11px] uppercase tracking-wider font-semibold text-slate-400 rounded-full border border-slate-200/60 shrink-0">
                Or with Email
              </span>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100/80 p-1 rounded-xl mb-4 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === 'login' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === 'signup' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-sm text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-sm text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl glass-button-primary font-semibold text-sm mt-2 flex items-center justify-center gap-2"
              >
                <span>{activeTab === 'login' ? 'Log In to Account' : 'Create Nexure Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}

        {/* Developer Integration Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted Session</span>
          </div>
          <button
            onClick={() => {
              setIsAuthOpen(false);
              setIsBackendGuideOpen(true);
            }}
            className="flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
          >
            <Database className="w-3 h-3" />
            <span>Connect Firebase/Supabase</span>
          </button>
        </div>
      </div>
    </div>
  );
};
