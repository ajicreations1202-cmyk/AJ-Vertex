import React, { useEffect, useRef, useState } from 'react';
import { Eye, HelpCircle, RefreshCw, Star } from 'lucide-react';

interface CreativeLabProps {
  accentColor: string;
  cardBg: string;
  isLight?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

export default function CreativeLab({ accentColor, cardBg, isLight = false }: CreativeLabProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [particleCount, setParticleCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const particlesRef = useRef<Particle[]>([]);

  // Track coordinates for dragging / mouse interaction
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = Math.max(300, containerRef.current.clientHeight);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Seed initial nodes
    const seedInitialNodes = () => {
      particlesRef.current = [];
      const count = 40;
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2.5 + 1.5,
          alpha: Math.random() * 0.4 + 0.3,
          decay: 0
        });
      }
      setParticleCount(particlesRef.current.length);
    };

    seedInitialNodes();

    // Main animation loop
    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const accentRgb = hexToRgb(accentColor) || { r: 59, g: 130, b: 246 };

      // Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Apply velocities
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wall collisions
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        // Decaying temporary particles (created by mouse hover/click)
        if (p1.decay > 0) {
          p1.alpha -= p1.decay;
          if (p1.alpha <= 0) {
            particles.splice(i, 1);
            i--;
            continue;
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${p1.alpha})`;
        ctx.fill();

        // Check distance to other nodes and connect them
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          // Connection limit
          const connectLim = 100;
          if (dist < connectLim) {
            const lineAlpha = (1 - dist / connectLim) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect with Mouse
        const distToMouse = Math.hypot(p1.x - mouseRef.current.x, p1.y - mouseRef.current.y);
        const mouseLim = 140;
        if (distToMouse < mouseLim) {
          const lineAlpha = (1 - distToMouse / mouseLim) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${lineAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      setParticleCount(particles.length);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor]);

  // Utility to parse hex
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    // Add trail particle occasionally
    if (Math.random() < 0.2) {
      particlesRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 1.5 + 1,
        alpha: 0.6,
        decay: 0.015
      });
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setClickCount((prev) => prev + 1);

    // Burst 8 glowing particles
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 1.5 + 1;
      particlesRef.current.push({
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 2,
        alpha: 0.8,
        decay: 0.012
      });
    }
  };

  const handleClearAndReset = () => {
    particlesRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2.5 + 1.5,
          alpha: Math.random() * 0.4 + 0.3,
          decay: 0
        });
      }
    }
    setClickCount(0);
  };

  return (
    <div 
      id="creative-lab-card"
      ref={containerRef}
      className={`rounded-3xl border overflow-hidden relative flex flex-col justify-between group h-[320px] transition-colors duration-300 ${isLight ? 'border-zinc-200' : 'border-white/10'}`}
      style={{ 
        backgroundColor: cardBg,
        boxShadow: isLight ? `0 8px 30px rgba(0,0,0,0.02)` : `0 8px 32px -10px rgba(0,0,0,0.5)` 
      }}
    >
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
        <span className={`flex items-center gap-1.5 backdrop-blur-md border px-3 py-1 rounded-full text-[10px] transition-colors ${isLight ? 'bg-amber-50/90 border-amber-200 text-amber-950 font-bold' : 'bg-black/60 border-white/10 text-white'}`}>
          <Star className="w-3.5 h-3.5" style={{ color: accentColor }} />
          Vertex Sandbox (ക്രിയേറ്റീവ് പരീക്ഷണങ്ങൾ)
        </span>
        <button 
          id="lab-reset-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleClearAndReset();
          }}
          className={`p-1 px-2.5 rounded-lg border text-[9px] font-mono pointer-events-auto transition flex items-center gap-1 ${isLight ? 'bg-white border-zinc-250 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 shadow-xs' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'}`}
        >
          <RefreshCw className="w-2.5 h-2.5" />
          Reset
        </button>
      </div>

      {/* CANVAS ELEMENT */}
      <canvas
        id="generative-vertex-canvas"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full block cursor-crosshair z-10"
      />

      {/* Instructional text footer */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20 pointer-events-none">
        <div>
          <span className={`text-[10px] font-mono uppercase tracking-[0.1em] block mb-0.5 ${isLight ? 'text-zinc-450 font-bold' : 'text-white/30'}`}>GENERATIVE GRAPHICS</span>
          <p className={`text-xs font-medium ${isLight ? 'text-zinc-800' : 'text-white/80'}`}>ക്ലിക്ക് ചെയ്യുക • ടച്ച് ചെയ്യുക</p>
        </div>
        <div className={`text-right text-[10px] font-mono ${isLight ? 'text-zinc-550 font-bold' : 'text-white/30'}`}>
          <div>NODES: {particleCount}</div>
          <div>BURSTS: {clickCount}</div>
        </div>
      </div>
    </div>
  );
}
