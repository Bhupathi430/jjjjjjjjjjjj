import React, { useEffect, useRef, useState } from 'react';

export const CleanBackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Floating Light Purple Translucent Glass Spheres
    const bubbles = Array.from({ length: 18 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 22 + 8,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.35 + 0.15,
      pulseOffset: Math.random() * Math.PI * 2
    }));

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Light Purple base
      ctx.fillStyle = '#faf5ff';
      ctx.fillRect(0, 0, width, height);

      // Swaying Pastel Purple Liquid Orbs
      const orbX1 = width * 0.35 + Math.sin(time * 0.7) * 90;
      const orbY1 = height * 0.3 + Math.cos(time * 0.5) * 70;
      const grad1 = ctx.createRadialGradient(orbX1, orbY1, 0, orbX1, orbY1, width * 0.55);
      grad1.addColorStop(0, 'rgba(233, 213, 255, 0.75)');
      grad1.addColorStop(0.5, 'rgba(243, 232, 255, 0.35)');
      grad1.addColorStop(1, 'rgba(250, 245, 255, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const orbX2 = width * 0.7 + Math.cos(time * 0.6) * 80;
      const orbY2 = height * 0.65 + Math.sin(time * 0.8) * 60;
      const grad2 = ctx.createRadialGradient(orbX2, orbY2, 0, orbX2, orbY2, width * 0.5);
      grad2.addColorStop(0, 'rgba(216, 180, 254, 0.6)');
      grad2.addColorStop(0.6, 'rgba(243, 232, 255, 0.2)');
      grad2.addColorStop(1, 'rgba(250, 245, 255, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render Floating Translucent Glass Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        b.x += Math.sin(time + b.pulseOffset) * 0.4 + b.speedX;

        if (b.y < -30) {
          b.y = height + 30;
          b.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.7})`;
        ctx.fill();

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(192, 132, 252, ${b.alpha * 0.85})`;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Light Purple Liquid Glass Ribbons */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-out" 
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
        }}
        viewBox="0 0 1440 900" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="purpleRibbonLeft" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="purpleRibbonRight" x1="100%" y1="0%" x2="40%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
            <stop offset="60%" stop-color="#e9d5ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path 
          d="M-100,950 C100,750 200,600 450,900 C600,1050 300,500 0,250 C-100,150 -150,50 -200,-50 Z" 
          fill="url(#purpleRibbonLeft)"
        />
        <path 
          d="M-50,900 C150,700 250,550 400,800 C480,920 180,450 -50,180 Z" 
          stroke="rgba(255, 255, 255, 0.9)" 
          strokeWidth="3.5" 
          fill="none" 
        />

        <path 
          d="M1000,-50 C1150,150 1350,100 1500,300 C1550,380 1400,250 1200,50 C1100,-50 1050,-100 1000,-50 Z" 
          fill="url(#purpleRibbonRight)"
        />
        <path 
          d="M1020,-30 C1170,170 1370,120 1520,320" 
          stroke="rgba(255, 255, 255, 0.95)" 
          strokeWidth="4" 
          fill="none" 
        />
      </svg>

      {/* Floating 3D Purple Translucent Glass Orbs */}
      <div 
        className="absolute top-[22%] left-[10%] w-16 h-16 sm:w-20 sm:h-20 animate-float-1 pointer-events-auto"
        style={{ transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0)` }}
      >
        <div className="w-full h-full rounded-2xl bg-white/40 backdrop-blur-md border border-white/90 shadow-xl shadow-purple-500/15 transform rotate-45 flex items-center justify-center overflow-hidden">
          <div class="absolute top-1 left-1 w-6 h-6 rounded-full bg-white/70 blur-xs"></div>
          <div class="w-full h-full bg-gradient-to-br from-white/80 via-purple-100/40 to-purple-300/40"></div>
        </div>
      </div>

      <div 
        className="absolute top-[65%] right-[12%] w-20 h-20 sm:w-24 sm:h-24 animate-float-3 pointer-events-auto"
        style={{ transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0)` }}
      >
        <div className="w-full h-full rounded-3xl bg-white/40 backdrop-blur-lg border border-white/90 shadow-2xl shadow-purple-500/20 transform -rotate-12 overflow-hidden">
          <div class="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/90 blur-xs"></div>
          <div class="w-full h-full bg-gradient-to-br from-white/80 via-purple-100/50 to-purple-300/50"></div>
        </div>
      </div>

    </div>
  );
};
