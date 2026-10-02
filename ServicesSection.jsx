import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Video, Mic, Sparkles, Cpu, Users, Subtitles, ArrowRight, CheckCircle2, Shield, Wand2 } from 'lucide-react';

export const ServicesSection = () => {
  const { triggerPreBookFlow } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');

  const services = [
    {
      id: 1,
      title: 'Zerus AI Video Editor',
      category: 'Editing',
      icon: Video,
      badge: 'Flagship Software',
      color: 'from-blue-500 to-indigo-600',
      description: 'Browser-native multi-track timeline editing with zero render latency, AI object removal, and LUT color grading.',
      features: ['Multi-track 4K 60FPS timeline', 'AI Smart Object Masking', 'One-click LUT color filters', 'Instant MP4 / ProRes Export']
    },
    {
      id: 2,
      title: 'Zerus Spatial Audio Studio',
      category: 'Audio',
      icon: Mic,
      badge: 'AI Powered',
      color: 'from-emerald-500 to-teal-600',
      description: 'Studio-grade spatial audio mixing, voice isolation, background noise reduction, and automated sound mastering.',
      features: ['AI Voice Isolation & Denoise', 'Spatial 3D Audio Panning', 'Auto EQ & Loudness Normalization', '100+ Free Royalty SFX Tracks']
    },
    {
      id: 3,
      title: 'Nexure Motion & VFX Engine',
      category: 'VFX',
      icon: Sparkles,
      badge: 'GPU Accelerated',
      color: 'from-purple-500 to-pink-600',
      description: 'WebGL accelerated particle dynamics, keyframe animation presets, lower-thirds, and liquid motion transitions.',
      features: ['500+ Motion Graphics Templates', 'WebGL 3D Object Rendering', 'Keyframe Curve Editor', 'Chroma Key Green Screen']
    },
    {
      id: 4,
      title: 'Nexure Cloud Render Farm',
      category: 'Cloud',
      icon: Cpu,
      badge: 'High Speed',
      color: 'from-amber-500 to-orange-600',
      description: 'Offload heavy 4K/8K rendering to Nexure high-speed distributed cloud nodes without slowing down your PC.',
      features: ['Background Cloud Export', 'Zero CPU/GPU Overheat', 'Instant Cloud File Sync', 'Secure 256-bit Storage']
    },
    {
      id: 5,
      title: 'Multiplayer Real-time Collab',
      category: 'Cloud',
      icon: Users,
      badge: 'Live Sync',
      color: 'from-cyan-500 to-blue-600',
      description: 'Work simultaneously with directors, clients, and co-editors on the same project with real-time cursor sync.',
      features: ['Live Co-editing Canvas', 'Timecode Comments & Notes', 'Version History Restore', 'Role-based Permissions']
    },
    {
      id: 6,
      title: 'AI Auto-Subtitles & Voiceover',
      category: 'AI Tools',
      icon: Subtitles,
      badge: '40+ Languages',
      color: 'from-rose-500 to-red-600',
      description: 'Auto-generate precise stylized closed captions and natural AI voiceover narration in over 40 global languages.',
      features: ['99% Accurate Auto Captioning', 'Dynamic Animated Text Presets', 'Studio AI Voice Generators', 'SRT / VTT File Export']
    }
  ];

  const categories = ['All', 'Editing', 'Audio', 'VFX', 'AI Tools', 'Cloud'];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-28 relative z-10 bg-slate-50/50">
      
      {/* Background glow */}
      <div className="bg-glow-orb-3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-bold text-indigo-600 border border-indigo-100 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nexure Studios Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Create<br className="hidden sm:inline" /> Blockbuster Content Online.
          </h2>
          <p className="text-slate-600 mt-4 text-base">
            Explore Nexure Studio's full ecosystem of cloud editing software, AI media enhancement, and high-speed workflow tools.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'glass-panel hover:bg-white text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card rounded-3xl p-6 border border-white/90 shadow-xl shadow-slate-900/5 glass-panel-hover flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.color} text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="mt-5 space-y-2 border-t border-slate-200/60 pt-4">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prebook Trigger Action */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">Included in Zerus Suite</span>
                  <button
                    onClick={triggerPreBookFlow}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>Pre-Book @ ₹99</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
