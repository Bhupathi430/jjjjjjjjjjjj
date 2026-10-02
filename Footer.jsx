import React from 'react';
import { Sparkles, Heart, ShieldCheck, Mail, Globe, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer = () => {
  const { setIsBackendGuideOpen } = useAuth();

  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white/60 backdrop-blur-xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/nexure-logo.png" alt="Nexure Studios Logo" className="h-9 w-auto" />
              <span className="text-xl font-bold tracking-tight text-slate-900">Nexure Studios</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Nexure Studios is pioneering browser-native creative applications with Zerus Online Video & Audio Editing Suite. Designed with Apple San Francisco typography & iOS 27 glass aesthetics.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                SSL Encrypted
              </span>
              <span>•</span>
              <button 
                onClick={() => setIsBackendGuideOpen(true)}
                className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <Database className="w-3.5 h-3.5" />
                Firebase & Supabase Ready
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Products & Services</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#zerus-editing" className="hover:text-indigo-600 transition-colors">Zerus Video Editor</a></li>
              <li><a href="#services" className="hover:text-indigo-600 transition-colors">Spatial Audio Studio</a></li>
              <li><a href="#services" className="hover:text-indigo-600 transition-colors">Nexure Motion & VFX</a></li>
              <li><a href="#services" className="hover:text-indigo-600 transition-colors">Cloud Render Farm</a></li>
              <li><a href="#prebook" className="hover:text-indigo-600 transition-colors">Pre-Book Pass (₹99)</a></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Nexure Pvt Ltd</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-slate-400" /><span>www.nexurestudios.com</span></li>
              <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /><span>support@nexurestudios.com</span></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Nexure Studios Pvt Ltd. All rights reserved. Zerus™ is a registered trademark.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for creators worldwide.
          </p>
        </div>

      </div>
    </footer>
  );
};
