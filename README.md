# Zerus — Next-Generation Video Editing Suite
**by Nexure Studio**

Official landing page and pre-booking suite for **Zerus**, built with React, Vite, Tailwind CSS, and Apple San Francisco glassmorphic typography.

## 🚀 Features
- **Light Purple Glassmorphism Design**: Ambient purple glow with glassmorphic cards and buttons.
- **Middle-Aligned Handwritten Logo**: Crisp transparent branding.
- **Interactive Pre-Book Modal**: Embedded Google Form popup with free pre-booking.
- **Live Motion Canvas Background**: Dynamic animated particles and interactive 3D translucent glass elements.
- **Mobile Responsive**: Viewport-optimized for desktop, tablets, and phones.
- **Standalone Single File**: Standalone `index.html` file included for instant double-click viewing without node server.

## 📦 Project Structure
```
Zerus/
├── public/                     # Static assets (zerus-logo-transparent.png)
├── src/                        # React source components
│   ├── components/
│   │   ├── Navbar.jsx          # Top Navigation Bar with Nexure Studio branding
│   │   ├── HeroSection.jsx     # Main Hero Section & Pre-Book Modal
│   │   └── CleanBackgroundAnimation.jsx # Canvas & 3D background animation
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Global Tailwind & typography styles
├── index.html                  # Main Vite entry point
├── standalone.html             # Standalone single-file HTML version
├── vercel.json                 # Vercel deployment configuration
├── package.json
└── vite.config.js
```

## 🛠️ Local Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deploying to Vercel via GitHub
1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.
