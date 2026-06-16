import { useState, useRef, useEffect } from 'react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

interface BeforeAfterSliderProps {
  accentColor: string;
  isLight?: boolean;
}

export default function BeforeAfterSlider({ accentColor, isLight = false }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div id="before-after-card" className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 ${isLight ? 'text-zinc-500 font-bold' : 'text-white/50'}`}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
          Editing Craft (ബിഫോർ & ആഫ്റ്റർ)
        </span>
        <span className={`text-[11px] font-mono ${isLight ? 'text-zinc-400 font-bold' : 'text-white/40'}`}>Interactive Color Grade</span>
      </div>

      <div 
        id="slider-container"
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative aspect-video w-full rounded-2xl border border-white/10 overflow-hidden cursor-ew-resize select-none bg-zinc-900 group"
      >
        {/* AFTER IMAGE (Background) */}
        <img
          src="https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1200"
          alt="After Custom Color Grade Editing"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white font-mono border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
          After Editing (ആഫ്റ്റർ)
        </div>

        {/* BEFORE IMAGE (Foreground clip-path) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          {/* B&W/Muted RAW image */}
          <img
            src="https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1200"
            alt="Original RAW Capture Flat Profile"
            className="absolute inset-0 w-full h-full object-cover filter saturate-50 contrast-75 brightness-75 pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-4 bottom-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white font-mono border border-white/10 opacity-70 pointer-events-auto">
            Raw Capture (ബിഫോർ)
          </div>
        </div>

        {/* SWIPER SPLIT BAR */}
        <div 
          id="split-handle"
          className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
          style={{ left: `${sliderPosition}%`, backgroundColor: accentColor }}
        >
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border bg-zinc-950 border-white/20 flex items-center justify-center shadow-lg pointer-events-auto shadow-black/50"
            style={{ ringColor: accentColor }}
          >
            <ImageIcon className="w-3.5 h-3.5 text-white/80" />
          </div>
        </div>
      </div>
      <p className={`text-[11px] leading-normal ${isLight ? 'text-zinc-600' : 'text-white/50'}`}>
        വിൻഡോയിലെ ബാർ ഇടത്തോട്ടും വലത്തോട്ടും ഡ്രാഗ് ചെയ്ത് ഫോട്ടോഗ്രാഫി കളർ ഗ്രേഡിംഗ് മാജിക് കാണുക.
      </p>
    </div>
  );
}
