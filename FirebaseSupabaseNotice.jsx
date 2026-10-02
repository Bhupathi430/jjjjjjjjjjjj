import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Code2, Database, ShieldCheck, Check, Copy, Flame, Layers } from 'lucide-react';

export const FirebaseSupabaseNotice = () => {
  const { isBackendGuideOpen, setIsBackendGuideOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('firebase'); // 'firebase' or 'supabase'
  const [copied, setCopied] = useState(false);

  if (!isBackendGuideOpen) return null;

  const firebaseSnippet = `// firebase.js - Ready to paste in your project
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "nexure-studio.firebaseapp.com",
  projectId: "nexure-studio",
  storageBucket: "nexure-studio.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export className auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithFirebaseGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user; // User Gmail, name, photoURL
};`;

  const supabaseSnippet = `// supabase.js - Ready to paste in your project
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_SUPABASE_ID.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const loginWithSupabaseGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  });
  return { data, error };
};`;

  const currentCode = activeTab === 'firebase' ? firebaseSnippet : supabaseSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 glass-card border border-white/90 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setIsBackendGuideOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Firebase & Supabase Ready Architecture</h3>
            <p className="text-xs text-slate-500">Plug & Play authentication integration guide for Nexure Studio</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 mb-5 text-xs text-indigo-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Frontend State Pre-wired</p>
            <p className="mt-0.5 text-indigo-900/80">
              The entire AuthContext, Google Sign In button, and ₹99 Pre-Booking database store logic are already structured to accept live Firebase or Supabase user objects. Simply replace the mock handlers with your config!
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('firebase')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'firebase'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Firebase Auth Config</span>
          </button>
          <button
            onClick={() => setActiveTab('supabase')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'supabase'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Supabase Auth Config</span>
          </button>
        </div>

        {/* Code Block */}
        <div className="relative">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
          <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
            {currentCode}
          </pre>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsBackendGuideOpen(false)}
            className="py-2.5 px-5 rounded-xl glass-button-primary text-xs font-bold"
          >
            Got It, Back to Website
          </button>
        </div>
      </div>
    </div>
  );
};
