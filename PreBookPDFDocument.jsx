import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Download, Check, ShieldCheck, FileText } from 'lucide-react';

export const PreBookPDFDocument = ({ bookingData, user }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!user && !bookingData) return null;

  const currentBooking = bookingData || {
    bookingId: 'NEX-ZERUS-' + Math.floor(100000 + Math.random() * 900000),
    userEmail: user?.email || 'user@gmail.com',
    userName: user?.name || 'Creative Member',
    software: 'Zerus Online Editing Suite',
    amountPaid: '₹99.00',
    status: 'REGISTERED MEMBER',
    txnId: 'TXN_' + Math.random().toString(36).toUpperCase().substring(2, 10),
    paymentMethod: 'Google Auth Verified',
    bookedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    perks: [
      'Priority Zerus Alpha & Beta Access',
      'Flat 50% Lifetime Discount on Pro Tier',
      '100 GB High-Speed Cloud Workspace',
      'VIP Nexure Studio Creator Badge'
    ]
  };

  const handleDownloadPDF = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const primaryColor = [37, 99, 235];
      const fontDark = [15, 23, 42];
      const fontGray = [100, 116, 139];

      // Outer Decorative Border Frame
      doc.setDrawColor(224, 231, 255);
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 190, 277);

      doc.setDrawColor(37, 99, 235);
      doc.setLineWidth(0.5);
      doc.rect(12, 12, 186, 273);

      // Header Brand
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(fontDark[0], fontDark[1], fontDark[2]);
      doc.text('Nexure Studios', 20, 28);

      doc.setFontSize(9);
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text('PVT LTD • OFFICIAL MEMBER PASS', 20, 34);

      // Badge Right
      doc.setFillColor(236, 253, 245);
      doc.roundedRect(140, 20, 50, 10, 3, 3, 'F');
      doc.setTextColor(5, 150, 105);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(bookingData ? 'VERIFIED PRE-BOOK' : 'VERIFIED MEMBER', 143, 26.5);

      doc.setFont('courier', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(currentBooking.bookingId, 140, 36);

      // Divider Line
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 42, 190, 42);

      // Certificate Banner Title
      doc.setFillColor(243, 244, 246);
      doc.roundedRect(20, 48, 170, 18, 4, 4, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(30, 27, 75);
      doc.text('ZERUS ONLINE EDITING SUITE', 105, 56, { align: 'center' });
      doc.setFontSize(9);
      doc.setTextColor(79, 70, 229);
      doc.text('EARLY ACCESS PASS & OFFICIAL RECEIPT', 105, 62, { align: 'center' });

      // Holder Details Box
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(20, 74, 170, 45, 4, 4, 'FD');

      doc.setFontSize(8);
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text('PASS HOLDER NAME', 28, 83);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(fontDark[0], fontDark[1], fontDark[2]);
      doc.text(user?.name || currentBooking.userName || 'Creative User', 28, 90);

      doc.setFontSize(8);
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text('REGISTERED GMAIL ADDRESS', 28, 100);
      doc.setFontSize(11);
      doc.setFont('courier', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(user?.email || currentBooking.userEmail, 28, 107);

      // Amount & Txn Right Column
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text('AMOUNT PAID', 115, 83);
      doc.setFontSize(16);
      doc.setTextColor(16, 185, 129);
      doc.text(currentBooking.amountPaid || '₹99.00', 115, 91);

      doc.setFontSize(8);
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text('TRANSACTION REFERENCE', 115, 100);
      doc.setFontSize(10);
      doc.setFont('courier', 'bold');
      doc.setTextColor(fontDark[0], fontDark[1], fontDark[2]);
      doc.text(currentBooking.txnId, 115, 107);

      // Grid Info Meta
      doc.line(20, 127, 190, 127);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text('Payment Method:', 20, 135);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(fontDark[0], fontDark[1], fontDark[2]);
      doc.text(currentBooking.paymentMethod, 52, 135);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text('Timestamp:', 115, 135);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(fontDark[0], fontDark[1], fontDark[2]);
      doc.text(currentBooking.bookedAt, 135, 135);

      doc.line(20, 142, 190, 142);

      // Included Privileges List
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(fontDark[0], fontDark[1], fontDark[2]);
      doc.text('INCLUDED EARLY ACCESS PRIVILEGES', 20, 153);

      currentBooking.perks.forEach((perk, i) => {
        const py = 163 + i * 10;
        doc.setFillColor(79, 70, 229);
        doc.circle(23, py - 1.5, 1.2, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(51, 65, 85);
        doc.text(perk, 28, py);
      });

      // Verification Watermark / Seal Bottom
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 225, 190, 225);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('✓ VERIFIED BY NEXURE STUDIOS PVT LTD', 20, 235);
      doc.setFontSize(7.5);
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text(`Document Reference: ${currentBooking.bookingId}-PDF-PASS`, 20, 240);

      // Signature
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(fontDark[0], fontDark[1], fontDark[2]);
      doc.text('Bhupathi Nexure', 150, 235);
      doc.setFontSize(7.5);
      doc.setTextColor(fontGray[0], fontGray[1], fontGray[2]);
      doc.text('Founder & Director • Nexure Pvt Ltd', 150, 240);

      // Save PDF file to browser downloads
      doc.save(`Nexure_Zerus_Pass_${currentBooking.bookingId}.pdf`);

      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="my-3">
      <button
        type="button"
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white font-bold text-xs shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer disabled:opacity-75 z-20 relative"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating Official PDF Pass...</span>
          </>
        ) : downloadSuccess ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Official PDF Pass Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
            <span>Download Official PDF Pass & Receipt</span>
          </>
        )}
      </button>
    </div>
  );
};
