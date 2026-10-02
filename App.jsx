import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CleanBackgroundAnimation } from './components/CleanBackgroundAnimation';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { PreBookModal } from './components/PreBookModal';
import { AccountDrawer } from './components/AccountDrawer';
import { FirebaseSupabaseNotice } from './components/FirebaseSupabaseNotice';

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white relative overflow-hidden bg-slate-50">
        
        {/* Animated Clean Liquid Mesh Background */}
        <CleanBackgroundAnimation />

        {/* Top Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />
          <ServicesSection />
          <FAQSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals and Drawers */}
        <AuthModal />
        <PreBookModal />
        <AccountDrawer />
        <FirebaseSupabaseNotice />

      </div>
    </AuthProvider>
  );
}

export default App;
