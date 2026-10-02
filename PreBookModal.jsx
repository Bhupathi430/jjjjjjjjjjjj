import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { PreBookPDFDocument } from './PreBookPDFDocument';
import { X, Sparkles, CheckCircle2, ShieldCheck, Zap, Layers, Lock, CreditCard, QrCode, Smartphone, ArrowRight } from 'lucide-react';

export const PreBookModal = () => {
  const { isPreBookOpen, setIsPreBookOpen, user, confirmPreBook, setIsAccountOpen } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);

  if (!isPreBookOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#2563eb', '#10b981', '#f59e0b']
    });
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const booking = confirmPreBook({
        method: selectedMethod === 'upi' ? `UPI (${upiId || user.email})` : 'Credit/Debit Card'
      });
      setConfirmedData(booking);
      setPaymentSuccess(true);
      triggerConfetti();
    }, 1500);
  };

  const handleClose = () => {
    setIsPreBookOpen(false);
    setPaymentSuccess(false);
    setConfirmedData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-lg animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 glass-card border border-white/90 shadow-2xl shadow-indigo-500/10 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentSuccess ? (
          /* Payment Success State */
          <div className="text-center py-6 animate-fade-in space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 border-4 border-emerald-500/20 shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                Pre-Booking Confirmed
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome to Zerus!
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Payment of <strong className="text-slate-900 font-bold">₹99.00</strong> was successful. Your early pass has been registered to:
              </p>
              <div className="mt-3 inline-block px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold text-sm">
                {user?.email}
              </div>
            </div>

            {/* Ticket Card */}
            <div className="p-5 rounded-2xl glass-panel border border-indigo-100 text-left space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pass ID</p>
                  <p className="text-sm font-mono font-bold text-indigo-600">{confirmedData?.bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Transaction ID</p>
                  <p className="text-xs font-mono text-slate-600">{confirmedData?.txnId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Software:</span>
                  <p className="font-semibold text-slate-800">Zerus Suite</p>
                </div>
                <div>
                  <span className="text-slate-500">Amount Paid:</span>
                  <p className="font-semibold text-emerald-600">₹99.00 INR</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60">
                <p className="text-xs font-bold text-slate-700 mb-1.5">Unlocked Benefits:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  {confirmedData?.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Official PDF Download Trigger */}
            {confirmedData && (
              <PreBookPDFDocument bookingData={confirmedData} user={user} />
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  handleClose();
                  setIsAccountOpen(true);
                }}
                className="w-full py-3 px-6 rounded-2xl glass-button-primary font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <span>View Account Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form Flow */
          <div className="space-y-6">
            {/* Header Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Pre-Book Zerus</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 border border-indigo-200">
                    Nexure Studios
                  </span>
                </div>
                <p className="text-xs text-slate-500">Next-Gen Browser Native Online Video & Audio Editor</p>
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between shadow-xl">
              <div>
                <p className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Early Bird Pass</p>
                <p className="text-2xl font-black tracking-tight flex items-baseline gap-1">
                  ₹99 <span className="text-xs font-medium text-indigo-200">/ One-time Token</span>
                </p>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Save 50% on Launch
                </span>
                <p className="text-[10px] text-indigo-300 mt-1">Limited to first 5,000 creators</p>
              </div>
            </div>

            {/* Perks included */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/70 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="text-slate-700 font-medium">Priority Beta Access</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/70 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-slate-700 font-medium">100 GB Cloud Storage</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/70 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 font-medium">AI Tools Unlimited</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-slate-700 font-medium">VIP Discord Badge</span>
              </div>
            </div>

            {/* User confirmation account info */}
            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs">
              <span className="text-slate-600">Booking registered to:</span>
              <strong className="text-indigo-950 font-bold truncate max-w-[220px]">{user?.email}</strong>
            </div>

            {/* Payment Method Selector */}
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      selectedMethod === 'upi'
                        ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">UPI / GPay / PhonePe</p>
                      <p className="text-[10px] text-slate-500">Instant UPI Payment</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      selectedMethod === 'card'
                        ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Credit / Debit Card</p>
                      <p className="text-[10px] text-slate-500">Visa, Mastercard, RuPay</p>
                    </div>
                  </button>
                </div>
              </div>

              {selectedMethod === 'upi' && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">Enter UPI ID (Optional / Auto-filled)</label>
                  <div className="relative">
                    <QrCode className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder={`${user?.email.split('@')[0]}@okaxis / gpay`}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl glass-button-primary font-bold text-base shadow-xl flex items-center justify-center gap-2 group disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment of ₹99...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-indigo-200" />
                    <span>Pay ₹99 & Confirm Pre-Book</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Secure 256-Bit Encrypted Payment • Refundable anytime</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
