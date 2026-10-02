import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const FAQSection = () => {
  const { triggerPreBookFlow } = useAuth();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is Zerus by Nexure Studios?',
      a: 'Zerus is a next-generation online video and photo editing software built by Nexure Studios. It runs directly inside your web browser with GPU-accelerated performance, offering multi-track timeline editing, AI object isolation, spatial audio mastering, and cloud rendering.'
    },
    {
      q: 'Why should I Pre-Book Zerus for ₹99 Rupees?',
      a: 'Pre-booking Zerus for ₹99 locks in an exclusive 50% lifetime discount when Zerus officially launches, grants immediate priority access to the Alpha & Beta test builds, includes 100 GB of free cloud workspace storage, and grants a VIP creator badge on the Nexure Discord.'
    },
    {
      q: 'Is the ₹99 Pre-Book fee refundable?',
      a: 'Yes, 100%! If you decide not to use Zerus before launch, you can request a 100% full refund of your ₹99 token straight back to your original payment method or UPI ID.'
    },
    {
      q: 'How does the Log In & Account Pre-Book saving work?',
      a: 'When you sign in using Google OAuth or Email, your unique Gmail address is securely associated with your Zerus Early Access Pass ID. Once you complete the ₹99 payment, your account drawer automatically reflects your confirmed status and receipt.'
    },
    {
      q: 'Can I connect my own Firebase or Supabase backend?',
      a: 'Absolutely! Click "Backend Ready" in the top navigation bar to view copy-paste Firebase Auth and Supabase Auth configuration snippets ready to plug into the AuthContext state.'
    }
  ];

  return (
    <section id="prebook" className="py-20 md:py-28 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-bold text-indigo-600 border border-indigo-100 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions About Zerus Pre-Booking?
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Everything you need to know about the ₹99 Early Access Pass & Nexure Studio platform.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl border border-white/90 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 text-indigo-600' : ''
                }`} />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60 mt-1">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white shadow-2xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-2xl sm:text-3xl font-black">Ready to elevate your editing workflow?</h3>
          <p className="text-indigo-100 text-xs sm:text-sm max-w-xl mx-auto">
            Join thousands of video creators pre-booking Zerus software today for ₹99.
          </p>

          <button
            onClick={triggerPreBookFlow}
            className="py-3.5 px-8 rounded-full bg-white hover:bg-slate-50 text-indigo-950 font-black text-sm shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Pre-Book Zerus Now @ ₹99</span>
          </button>
        </div>

      </div>
    </section>
  );
};
