import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isPreBookOpen, setIsPreBookOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isBackendGuideOpen, setIsBackendGuideOpen] = useState(false);
  const [preBookData, setPreBookData] = useState(null);

  useEffect(() => {
    // Load persisted user & pre-booking status from localStorage
    const savedUser = localStorage.getItem('nexure_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        
        const savedBooking = localStorage.getItem(`nexure_prebook_${parsed.email}`);
        if (savedBooking) {
          setPreBookData(JSON.parse(savedBooking));
        }
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }, []);

  const loginWithGoogle = (email = 'user@gmail.com', name = 'Creative Editor') => {
    const userData = {
      email,
      name,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      provider: 'Google OAuth',
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem('nexure_user', JSON.stringify(userData));
    setIsAuthOpen(false);

    // Check if user already has a prebook
    const savedBooking = localStorage.getItem(`nexure_prebook_${userData.email}`);
    if (savedBooking) {
      setPreBookData(JSON.parse(savedBooking));
    }
    return userData;
  };

  const loginWithEmail = (email, password) => {
    const name = email.split('@')[0].replace('.', ' ');
    const userData = {
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      provider: 'Email & Password',
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem('nexure_user', JSON.stringify(userData));
    setIsAuthOpen(false);

    const savedBooking = localStorage.getItem(`nexure_prebook_${userData.email}`);
    if (savedBooking) {
      setPreBookData(JSON.parse(savedBooking));
    }
    return userData;
  };

  const logout = () => {
    setUser(null);
    setPreBookData(null);
    localStorage.removeItem('nexure_user');
    setIsAccountOpen(false);
  };

  const confirmPreBook = (paymentDetails) => {
    if (!user) return false;
    
    const bookingRecord = {
      bookingId: 'NEX-ZERUS-' + Math.floor(100000 + Math.random() * 900000),
      userEmail: user.email,
      userName: user.name,
      software: 'Zerus Online Editing Suite',
      amountPaid: '₹99.00',
      currency: 'INR',
      status: 'CONFIRMED',
      txnId: 'TXN_' + Math.random().toString(36).toUpperCase().substring(2, 12),
      paymentMethod: paymentDetails?.method || 'UPI (Google Pay)',
      bookedAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      perks: [
        'Priority Zerus Alpha & Beta Access',
        'Flat 50% Lifetime Discount on Pro Tier',
        '100 GB High-Speed Cloud Workspace',
        'VIP Nexure Studio Creator Badge'
      ]
    };

    setPreBookData(bookingRecord);
    localStorage.setItem(`nexure_prebook_${user.email}`, JSON.stringify(bookingRecord));
    return bookingRecord;
  };

  const triggerPreBookFlow = () => {
    if (!user) {
      setIsAuthOpen(true);
    } else {
      setIsPreBookOpen(true);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthOpen,
      setIsAuthOpen,
      authMode,
      setAuthMode,
      loginWithGoogle,
      loginWithEmail,
      logout,
      isPreBookOpen,
      setIsPreBookOpen,
      preBookData,
      confirmPreBook,
      triggerPreBookFlow,
      isAccountOpen,
      setIsAccountOpen,
      isBackendGuideOpen,
      setIsBackendGuideOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
