import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, Sparkles, Film, Compass, 
  MapPin, Send, Instagram, Mail, 
  Layers, Github, Monitor, Sliders, ArrowUpRight, HelpCircle, Laptop, Cpu
} from 'lucide-react';

import { ThemeConfig } from './types';
import { THEME_PRESETS } from './data';

// Import Custom Modular Components
import ThemeCustomizer from './components/ThemeCustomizer';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import MediaShowcase from './components/MediaShowcase';
import CreativeLab from './components/CreativeLab';
import PortfolioGallery from './components/PortfolioGallery';
import AboutContact from './components/AboutContact';

export default function App() {
  // Real-time custom background state - defaults to Midnight Obsidian
  const [theme, setTheme] = useState<ThemeConfig>(THEME_PRESETS[0].config);

  // Set the DOM style variables or style the container element instantly!
  useEffect(() => {
    // Keep standard dark scrollbars but match background
    document.body.style.backgroundColor = theme.bgColor;
  }, [theme]);

  // Social Links mapping
  const SOCIAL_ICONS = [
    { icon: Instagram, url: 'https://instagram.com/ajith_vertex', label: 'Instagram' },
    { icon: Mail, url: 'mailto:ajicreations1202@gmail.com', label: 'Mail' },
    { icon: Github, url: 'https://github.com/ajith-vertex', label: 'GitHub' }
  ];

  const isLight = !!theme.isLight;
  const textColorClass = isLight ? 'text-zinc-900' : 'text-white';
  const subtextColorClass = isLight ? 'text-zinc-700' : 'text-white/85';
  const mutedColorClass = isLight ? 'text-zinc-500' : 'text-white/45';
  const borderClass = isLight ? 'border-zinc-200' : 'border-white/5';
  const cardBgClass = isLight ? 'bg-white shadow-[0_8px_30px_rgb(234,88,12,0.05)]' : 'bg-white/[0.01]';

  return (
    <div 
      className={`min-h-screen ${textColorClass} font-sans transition-colors duration-500 relative pb-16 overflow-x-hidden`}
      style={{ 
        backgroundColor: theme.bgColor,
        backgroundImage: `radial-gradient(circle at 50% 0%, ${theme.glowColor} 0%, transparent 60%)` 
      }}
    >
      {/* Decorative Grid Mesh Overlay */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 ${isLight ? 'opacity-20' : ''}`} />

      {/* HEADER SECTION */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${isLight ? 'bg-white/75 border-zinc-200' : 'bg-zinc-950/80 border-white/5'}`}>
        <div id="main-navbar" className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          
          {/* GORGEOUS VECTOR SVG BRANDMARK */}
          <a href="#" className="flex items-center gap-3 group">
            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-all border ${isLight ? 'bg-zinc-50 border-zinc-200 group-hover:border-zinc-300' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
              {/* Abstract glowing Vertex shard SVG */}
              <svg 
                className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 3L2 19H7L12 9.5L17 19H22L12 3Z" 
                  fill={`url(#logo-grad-${theme.accentColor.replace('#', '')})`} 
                  fillOpacity="0.85" 
                />
                <circle cx="12" cy="9.5" r="1.5" fill={isLight ? theme.accentColor : '#ffffff'} />
                <defs>
                  <radialGradient id={`logo-grad-${theme.accentColor.replace('#', '')}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 3) rotate(90) scale(16 9.5)">
                    <stop stopColor={theme.accentColor} />
                    <stop offset="1" stopColor={isLight ? '#000000' : '#ffffff'} stopOpacity="0.2" />
                  </radialGradient>
                </defs>
              </svg>
              <div 
                className="absolute inset-0 opacity-20 blur-sm rounded-xl transition" 
                style={{ backgroundColor: theme.accentColor }} 
              />
            </div>
            <div>
              <span className={`font-display font-black text-sm tracking-[0.15em] ${isLight ? 'text-zinc-900' : 'text-white'}`}>AJ VERTEX</span>
              <span className={`text-[10px] font-mono block leading-none ${isLight ? 'text-zinc-500 font-bold' : 'text-white/40'}`}>CREATIVE PORTFOLIO</span>
            </div>
          </a>

          {/* Quick Nav Anchors */}
          <nav className={`hidden md:flex items-center gap-6 text-[11px] font-mono tracking-wider uppercase ${isLight ? 'text-zinc-600 hover:text-zinc-900' : 'text-white/50 hover:text-white'}`}>
            <a href="#customizer" className={`transition ${isLight ? 'hover:text-zinc-900 text-zinc-650' : 'hover:text-white'}`}>Theme</a>
            <a href="#showcase" className={`transition ${isLight ? 'hover:text-zinc-900 text-zinc-650' : 'hover:text-white'}`}>Reels</a>
            <a href="#portfolio" className={`transition ${isLight ? 'hover:text-zinc-900 text-zinc-650' : 'hover:text-white'}`}>Portfolios</a>
            <a href="#about" className={`transition ${isLight ? 'hover:text-zinc-900 text-zinc-650' : 'hover:text-white'}`}>About</a>
            <a href="#contact" className={`transition ${isLight ? 'hover:text-zinc-900 text-zinc-650' : 'hover:text-white'}`}>Collaborate</a>
          </nav>

          {/* Contact Direct action */}
          <div className="flex items-center gap-3">
            {SOCIAL_ICONS.map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <a 
                  key={idx}
                  href={soc.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-2 rounded-lg border transition-colors ${isLight ? 'bg-zinc-100 border-zinc-250 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900' : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/60 hover:text-white'}`}
                  title={soc.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
            <a 
              id="header-cta-btn"
              href="#contact" 
              className="hidden sm:inline-flex items-center gap-1 py-1.5 px-3.5 rounded-xl text-[11px] font-mono tracking-wider uppercase font-extrabold text-zinc-950 transition hover:opacity-95"
              style={{ backgroundColor: theme.accentColor }}
            >
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* CORE WRAPPER container */}
      <main className="max-w-7xl mx-auto px-6 mt-12 space-y-16 relative z-10" id="main-content">
        
        {/* HERO/INTRO SECTION */}
        <section className={`relative rounded-3xl border p-8 md:p-12 overflow-hidden transition-colors duration-300 ${cardBgClass} ${borderClass}`} id="hero">
          {/* Ambient Glow Shards */}
          <div 
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: theme.accentColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Headline and introduction details (Take 3 spans) */}
            <div className="lg:col-span-3 space-y-5 flex flex-col justify-center h-full z-10">
              <div 
                className={`inline-flex self-start items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.15em] border transition-colors ${isLight ? 'bg-amber-50 border-amber-200/60 text-amber-800' : 'bg-white/5 border-white/10 text-white/70'}`}
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" style={{ color: theme.accentColor }} />
                സൃഷ്ടിയും കാഴ്ചപ്പാടും ഒന്നിക്കുന്ന ഇടം
              </div>

              <h1 className={`font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                AJ VERTEX
              </h1>
              
              <p className={`font-sans font-bold text-lg sm:text-xl leading-snug transition-colors ${subtextColorClass}`}>
                Where Creativity Meets Vision. Creative Works. Visual Stories. Digital Experiences.
              </p>

              <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${mutedColorClass}`}>
                AJ Vertex represents a central digital showcase founded by **Ajith**, dedicated to capturing unique ideas, writing aesthetic narratives, and transforming visual concepts into tactile experiences. Exploring high-end photography, cinematic video sequences, minimal typography, and coding development.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  id="hero-portfolio-btn"
                  href="#portfolio" 
                  className="flex items-center gap-1.5 px-5 py-3 rounded-2xl text-xs font-semibold text-zinc-950 hover:opacity-95 transition"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  Explore Showcase (സൃഷ്ടികൾ)
                </a>
                <a 
                  id="hero-contact-btn"
                  href="#contact" 
                  className={`flex items-center gap-1.5 px-5 py-3 rounded-2xl text-xs font-semibold border transition-all ${isLight ? 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  Collaborate Now
                </a>
              </div>
            </div>

            {/* Micro bento highlights mockup on right (Take 2 spans) */}
            <div className="lg:col-span-2 relative grid grid-cols-2 gap-3 z-10">
              <div className={`p-4 rounded-2xl border flex flex-col justify-between aspect-square transition-colors ${isLight ? 'bg-white border-zinc-200/80 shadow-xs' : 'border-white/5 bg-white/[0.02]'}`}>
                <Camera className="w-6 h-6 text-yellow-500" />
                <div>
                  <span className={`text-xs font-bold block ${isLight ? 'text-zinc-800' : 'text-white'}`}>Cinematic Focus</span>
                  <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>Memorable natural captures</span>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col justify-between aspect-square transition-colors ${isLight ? 'bg-white border-zinc-200/80 shadow-xs' : 'border-white/5 bg-white/[0.02]'}`}>
                <Film className="w-6 h-6 text-cyan-600" />
                <div>
                  <span className={`text-xs font-bold block ${isLight ? 'text-zinc-800' : 'text-white'}`}>Reel Production</span>
                  <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>Sound Foley & color sciences</span>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col justify-between aspect-square transition-colors ${isLight ? 'bg-white border-zinc-200/80 shadow-xs' : 'border-white/5 bg-white/[0.02]'}`}>
                <Layers className="w-6 h-6 text-pink-500" />
                <div>
                  <span className={`text-xs font-bold block ${isLight ? 'text-zinc-800' : 'text-white'}`}>Brutal Posters</span>
                  <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>High contrast Swiss graphic art</span>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col justify-between aspect-square transition-colors ${isLight ? 'bg-white border-zinc-200/80 shadow-xs' : 'border-white/5 bg-white/[0.02]'}`}>
                <Monitor className="w-6 h-6 text-violet-600" />
                <div>
                  <span className={`text-xs font-bold block ${isLight ? 'text-zinc-800' : 'text-white'}`}>Aesthetic Code</span>
                  <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>High performance SPAs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEMOS: COLOR PICKING, IMAGE editing, AND GEOMETRIC SATELLITES */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6" id="customizer">
          {/* Customizer (Take 2 spans) */}
          <div className="lg:col-span-2">
            <ThemeCustomizer 
              currentTheme={theme} 
              onThemeChange={(newTh) => setTheme(newTh)} 
            />
          </div>

          {/* Editing Slider & Sandbox (Take 3 spans) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className={`flex-1 border rounded-3xl p-6 transition-colors duration-300 ${cardBgClass} ${borderClass}`}>
              <BeforeAfterSlider accentColor={theme.accentColor} isLight={isLight} />
            </div>
            
            <div className="flex-1">
              <CreativeLab accentColor={theme.accentColor} cardBg={theme.cardBgOverride || (isLight ? '#ffffff' : 'rgba(10,10,15,0.7)')} isLight={isLight} />
            </div>
          </div>
        </section>

        {/* VIDEOGRAPHY + SOUND ATMO. */}
        <section className="space-y-4" id="showcase">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className={`text-[10px] uppercase font-mono tracking-widest ${mutedColorClass}`}>AUDIOWORKS & TIMELINE MOODS</span>
              <h2 className={`font-sans font-black text-2xl transition-colors duration-300 ${textColorClass}`}>Cinematics & Ambient Streams</h2>
            </div>
            <p className={`text-xs max-w-sm transition-colors duration-300 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
              Experience color grading drafts, dynamic pacing edits, and immerse yourself in real soundscapes.
            </p>
          </div>
          
          <MediaShowcase 
            accentColor={theme.accentColor} 
            cardBg={theme.cardBgOverride || (isLight ? '#ffffff' : 'rgba(10,10,15,0.7)')}
            isLight={isLight} 
          />
        </section>

        {/* MAIN PORTFOLIO WORKS WITH LIGHTBOX */}
        <section className="space-y-4" id="portfolio">
          <div>
            <span className={`text-[10px] uppercase font-mono tracking-widest ${mutedColorClass}`}>CREATIVE WORKS CATALOGUE</span>
            <h2 className={`font-sans font-black text-3xl transition-colors duration-300 ${textColorClass} tracking-tight`}>The AJ Vertex Portfolio</h2>
          </div>

          <PortfolioGallery 
            accentColor={theme.accentColor} 
            cardBg={theme.cardBgOverride || (isLight ? '#ffffff' : 'rgba(10,10,15,0.7)')}
            isLight={isLight} 
          />
        </section>

        {/* BIOGRAPHY, TIMELINES, & OUTCOMES PROPOSALS */}
        <section className="space-y-4" id="about">
          <div>
            <span className={`text-[10px] uppercase font-mono tracking-widest ${mutedColorClass}`}>BEHIND THE CANVASES</span>
            <h2 className={`font-sans font-black text-3xl transition-colors duration-300 ${textColorClass} tracking-tight`}>Journey & Collaborations</h2>
          </div>

          <AboutContact 
            accentColor={theme.accentColor} 
            cardBg={theme.cardBgOverride || (isLight ? '#ffffff' : 'rgba(10,10,15,0.7)')}
            isLight={isLight} 
          />
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className={`mt-20 border-t transition-colors duration-300 pt-12 ${borderClass}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          
          {/* Logo and brief */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isLight ? 'border-amber-200 bg-amber-100/40' : 'border-white/10'}`}
                style={{ backgroundColor: `${theme.accentColor}10` }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2500/svg">
                  <path d="M12 3L2 19H7L12 9.5L17 19H22L12 3Z" fill={theme.accentColor} />
                </svg>
              </div>
              <span className={`font-display font-black text-sm tracking-[0.15em] ${isLight ? 'text-zinc-900' : 'text-white'}`}>AJ VERTEX</span>
            </div>
            
            <p className={`text-xs leading-relaxed font-sans ${isLight ? 'text-zinc-600' : 'text-white/50'}`}>
              AJ Vertex is your creative journey showcased. High contrast design systems, cinematic captures, video edits, and developmental web portfolios combined into one unified canvas.
            </p>
          </div>

          {/* Quick Malayalam summary */}
          <div className={`space-y-4 p-5 rounded-2xl border transition-colors duration-300 ${isLight ? 'bg-amber-100/30 border-amber-200/60' : 'bg-white/5 border-white/5'}`}>
            <span className={`text-[10px] font-mono tracking-wider uppercase block ${isLight ? 'text-amber-800 font-bold' : 'text-white/40'}`}>
              വിഷൻ സ്റ്റേറ്റ്‌മെന്റ് (Mission Statement)
            </span>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-800 font-medium' : 'text-white/70'}`}>
              "ഉയർന്ന നിലവാരമുള്ള വിഷ്വൽ അനുഭവങ്ങൾ സമ്മാനിക്കുകയും, സർഗ്ഗാത്മകതയും നവീനതയും പ്രതിഫലിപ്പിക്കുന്ന ഒരു മികച്ച ഡിജിറ്റൽ വ്യക്തിത്വം കെട്ടിപ്പടുക്കുകയും ചെയ്യുക എന്നതാണ് ഞങ്ങളുടെ ലക്ഷ്യം."
            </p>
          </div>

          {/* Socials & Meta */}
          <div className="space-y-4 md:text-right md:flex md:flex-col md:items-end">
            <div>
              <span className={`text-[10px] font-mono tracking-wider uppercase block mb-2 ${isLight ? 'text-zinc-500 font-bold' : 'text-white/40'}`}>Connect Digitally</span>
              <div className="flex gap-2 justify-start md:justify-end">
                {SOCIAL_ICONS.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl border transition-colors ${isLight ? 'bg-zinc-100 border-zinc-250 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900' : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/70 hover:text-white'}`}
                  >
                    <soc.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className={`pt-4 border-t w-full md:text-right ${borderClass}`}>
              <span className={`text-[10px] font-mono block ${isLight ? 'text-zinc-500' : 'text-white/30'}`}>
                © {new Date().getFullYear()} AJ Vertex • Crafted for Ajith.
              </span>
              <span className={`text-[9px] font-mono block mt-0.5 ${isLight ? 'text-zinc-400' : 'text-white/20'}`}>
                All Rights Preserved • Kerala, India.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
