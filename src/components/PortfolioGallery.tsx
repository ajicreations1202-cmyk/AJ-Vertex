import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Eye, Filter, Calendar, ExternalLink, Sliders, ChevronRight, X, ArrowUpRight, Camera, Film, Layers, Monitor, Play } from 'lucide-react';
import { PortfolioItem, ProjectCategory } from '../types';
import { PORTFOLIO_ITEMS } from '../data';

interface PortfolioGalleryProps {
  accentColor: string;
  cardBg: string;
  isLight?: boolean;
}

const CATEGORY_MAP: { value: ProjectCategory; labelEn: string; labelMl: string; icon: any }[] = [
  { value: 'all', labelEn: 'All Works', labelMl: 'എല്ലാം', icon: Layers },
  { value: 'photography', labelEn: 'Photography', labelMl: 'ചിത്രങ്ങൾ', icon: Camera },
  { value: 'videography', labelEn: 'Videography', labelMl: 'വീഡിയോകൾ', icon: Film },
  { value: 'graphic-design', labelEn: 'Graphic Design', labelMl: 'ഡിസൈൻസ്', icon: Layers },
  { value: 'web-projects', labelEn: 'Web Projects', labelMl: 'വെബ്‌സൈറ്റ്', icon: Monitor },
  { value: 'labs', labelEn: 'Creative Labs', labelMl: 'പരീക്ഷണങ്ങൾ', icon: Sliders },
];

export default function PortfolioGallery({ accentColor, cardBg, isLight = false }: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Filter logic
  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesKeyword = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesKeyword;
  });

  return (
    <div className="space-y-8">
      {/* Search and Navigation Bar */}
      <div className={`flex flex-col md:flex-row gap-4 justify-between items-center p-4 rounded-2xl border backdrop-blur-md transition-colors duration-300 ${isLight ? 'bg-white/85 border-zinc-200/90 shadow-sm shadow-amber-950/2' : 'bg-white/5 border-white/10'}`}>
        
        {/* Tab Filters */}
        <div id="filter-tabs" className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORY_MAP.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                id={`tab-btn-${cat.value}`}
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium shrink-0 transition-all duration-350 ${
                  isSelected 
                    ? 'text-zinc-950 font-black shadow-xs' 
                    : (isLight ? 'text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/60 hover:text-white hover:bg-white/5')
                }`}
                style={isSelected ? { backgroundColor: accentColor } : {}}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{cat.labelEn}</span>
                <span className="sm:hidden">{cat.labelMl}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Search Input */}
        <div className="relative w-full md:w-64">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-zinc-400' : 'text-white/30'}`} />
          <input
            id="artwork-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="തിരയുക (Search creations...)"
            className={`w-full border rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:outline-none transition-all ${isLight ? 'bg-white border-zinc-250 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 shadow-inner' : 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/20'}`}
            style={{ ringColor: accentColor }}
          />
          {searchQuery && (
            <button 
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors ${isLight ? 'text-zinc-400 hover:text-zinc-800' : 'text-white/30 hover:text-white'}`}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid listing */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="portfolio-bento-grid">
          {filteredItems.map((item, idx) => {
            return (
              <div
                id={`portfolio-card-${item.id}`}
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group rounded-3xl border overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 ${isLight ? 'bg-white border-zinc-200 shadow-sm shadow-amber-950/2' : 'border-white/10 bg-gradient-to-b from-white/5 to-white/[0.01]'}`}
                style={{
                  boxShadow: isLight ? `0 4px 15px rgba(0,0,0,0.02)` : `0 4px 20px -10px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Product Thumbnail Frame */}
                <div className="relative aspect-4/3 overflow-hidden bg-zinc-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Fog on Frame Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span 
                      className="text-[9px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-white border border-white/10"
                    >
                      {item.subCategory}
                    </span>
                  </div>

                  {/* Centered eye hover action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="p-3.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl shadow-black/40">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Info Deck */}
                <div className="p-5 flex-1 flex flex-col justify-between" style={{ backgroundColor: cardBg }}>
                  <div>
                    <h3 className={`font-sans font-bold text-base leading-tight tracking-tight transition-colors duration-300 ${isLight ? 'text-zinc-900 group-hover:text-amber-800' : 'text-white group-hover:text-white/90'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 mt-2 leading-relaxed transition-colors duration-300 ${isLight ? 'text-zinc-600' : 'text-white/50'}`}>
                      {item.description}
                    </p>
                  </div>

                  <div className={`flex items-center justify-between pt-4 mt-4 border-t text-[11px] font-mono transition-colors duration-300 ${isLight ? 'border-zinc-150 text-zinc-500' : 'border-white/5 text-white/40'}`}>
                    <span className="flex items-center gap-1 font-semibold">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span 
                      className="text-[10px] font-bold group-hover:underline flex items-center gap-0.5" 
                      style={{ color: accentColor }}
                    >
                      View Details
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div id="no-items-state" className={`text-center py-16 border border-dashed rounded-3xl transition-colors duration-300 ${isLight ? 'bg-zinc-50/50 border-zinc-250 text-zinc-600' : 'bg-white/5 border-white/10 text-white/50'}`}>
          <p className={`text-sm font-bold ${isLight ? 'text-zinc-700' : 'text-white/50'}`}>പൊരുത്തപ്പെടുന്ന സൃഷ്ടികൾ കണ്ടെത്താനായില്ല.</p>
          <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-white/30'}`}>Try resetting the selection filters or searching for something else!</p>
        </div>
      )}

      {/* DETAILED LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div 
            id="lightbox-backdrop"
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              layoutId={`modal-card-${selectedItem.id}`}
              id="lightbox-card"
              className="w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden relative grid grid-cols-1 md:grid-cols-5"
              style={{
                boxShadow: `0 25px 50px -12px ${accentColor}22`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame (col span 3) */}
              <div className="relative md:col-span-3 bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 aspect-video md:aspect-auto md:h-[480px]">
                {selectedItem.videoUrl ? (
                  <video 
                    src={selectedItem.videoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Large visual tags inside frame */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] bg-black/70 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-md font-mono uppercase tracking-wider">
                    {selectedItem.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Data & Metadata Panel (col span 2) */}
              <div className="p-6 md:col-span-2 flex flex-col justify-between h-auto md:h-[480px] overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span 
                      className="text-[10px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {selectedItem.subCategory}
                    </span>
                    <button 
                      id="lightbox-close-btn"
                      onClick={() => setSelectedItem(null)}
                      className="p-1 px-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white/70 hover:text-white transition"
                    >
                      Close (X)
                    </button>
                  </div>

                  <h2 className="font-sans font-black text-2xl text-white tracking-tight leading-snug">
                    {selectedItem.title}
                  </h2>
                  <p className="text-xs text-white/40 font-mono mt-1 mb-4 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Published: {selectedItem.date}
                  </p>

                  <p className="text-xs text-white/70 leading-relaxed font-sans mb-6">
                    {selectedItem.description}
                  </p>

                  {/* Spec Metadata Sheet */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-white/30 block">
                      CREATIVE METADATA (വിവരങ്ങൾ)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedItem.metadata.map((meta, mIdx) => (
                        <div key={mIdx} className="bg-white/5 border border-white/5 rounded-xl p-2.5">
                          <span className="text-[10px] text-white/40 block mb-0.5 font-sans leading-none">{meta.label}</span>
                          <span className="text-xs text-white font-medium break-words leading-tight">{meta.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Redirection link / collaboration trigger */}
                <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                  {selectedItem.externalUrl ? (
                    <a
                      id="external-project-btn"
                      href={selectedItem.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 hover:opacity-95 transition"
                      style={{ backgroundColor: accentColor }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Preview
                    </a>
                  ) : (
                    <button
                      id="collab-modal-btn"
                      onClick={() => {
                        setSelectedItem(null);
                        const contactEl = document.getElementById('contact');
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 hover:opacity-95 transition"
                      style={{ backgroundColor: accentColor }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      Inquire About This Work
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
