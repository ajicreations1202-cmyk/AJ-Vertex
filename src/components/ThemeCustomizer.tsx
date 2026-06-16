import React from 'react';
import { motion } from 'motion/react';
import { Palette, Flame, Sliders, Check, HelpCircle } from 'lucide-react';
import { ThemeConfig } from '../types';
import { THEME_PRESETS } from '../data';

interface ThemeCustomizerProps {
  currentTheme: ThemeConfig;
  onThemeChange: (newTheme: ThemeConfig) => void;
}

export default function ThemeCustomizer({ currentTheme, onThemeChange }: ThemeCustomizerProps) {
  // Update state for direct custom colors
  const handleCustomBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onThemeChange({
      ...currentTheme,
      bgColor: value,
      glowColor: `${value}44` // generate soft translucent glow
    });
  };

  const handleCustomAccentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onThemeChange({
      ...currentTheme,
      accentColor: value
    });
  };

  const isLight = !!currentTheme.isLight;

  return (
    <div
      id="theme-customizer-panel"
      className={`rounded-3xl border p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${isLight ? 'border-zinc-205/85 shadow-md shadow-amber-950/5' : 'border-white/10'}`}
      style={{
        backgroundColor: isLight ? 'rgba(255, 255, 255, 0.85)' : (currentTheme.cardBgOverride ? `${currentTheme.cardBgOverride}b3` : 'rgba(20,20,30,0.7)'),
        boxShadow: isLight ? `0 10px 30px -10px ${currentTheme.accentColor}15` : `0 10px 30px -10px ${currentTheme.glowColor}`
      }}
    >
      {/* Decorative Glow */}
      <div 
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-40 transition-colors duration-500"
        style={{ backgroundColor: currentTheme.accentColor }}
      />

      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2 rounded-xl border ${isLight ? 'bg-amber-100/30 border-amber-250/50' : 'bg-white/5 border-white/10'}`} style={{ color: currentTheme.accentColor }}>
          <Palette className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className={`font-sans font-bold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>Vertex Customizer</h3>
          <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>തീം ക്രമീകരണങ്ങൾ • Dynamic Visual Engine</p>
        </div>
      </div>

      {/* Guide Note for custom logo color */}
      <div className={`mb-5 p-3 rounded-xl border text-xs leading-relaxed transition-all ${isLight ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-white/5 border-white/5 text-white/70'}`}>
        <p className={`font-semibold flex items-center gap-1 ${isLight ? 'text-amber-900' : 'text-white'}`}>
          <HelpCircle className="w-3.5 h-3.5" style={{ color: currentTheme.accentColor }} />
          ലോഗോ കളർ വെബ്‌സൈറ്റിന് നൽകാൻ:
        </p>
        <p className={isLight ? 'text-zinc-700' : 'text-white/60'}>
          നിങ്ങളുടെ പക്കലുള്ള ലോഗോയുടെ കളർ താഴെയുള്ള <strong className={isLight ? 'text-zinc-900' : 'text-white'}>Custom BG</strong> കളർ പിക്കർ ക്ലിക്ക് ചെയ്ത് സെലക്ട് ചെയ്യുക. തത്സമയം വെബ്‌സൈറ്റ് അതിന്റെ കളറിലേക്ക് മാറുന്നതാണ്!
        </p>
      </div>

      {/* Preset section */}
      <div className="mb-6">
        <span className={`text-xs font-semibold tracking-wider uppercase block mb-3 ${isLight ? 'text-zinc-500 font-bold' : 'text-white/50'}`}>
          Preset Shading (പ്രീസെറ്റ് തീമുകൾ)
        </span>
        <div className="grid grid-cols-2 gap-2">
          {THEME_PRESETS.map((preset) => {
            const isSelected = currentTheme.bgColor === preset.config.bgColor;
            return (
              <button
                id={`preset-btn-${preset.key}`}
                key={preset.key}
                onClick={() => onThemeChange(preset.config)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs text-left font-medium ${
                  isSelected 
                    ? (isLight ? 'border-amber-500 bg-amber-100/20 text-amber-950 font-bold' : 'border-white/40 bg-white/10 cursor-default text-white') 
                    : (isLight ? 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700' : 'border-white/5 bg-white/5 hover:bg-white/15 hover:border-white/10 text-white')
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span 
                    className="w-3.5 h-3.5 rounded-full shrink-0 border border-zinc-200/50"
                    style={{ backgroundColor: preset.config.bgColor }}
                  />
                  <span className="truncate">{preset.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0 animate-scale-in" style={{ color: preset.config.accentColor }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom pickers */}
      <div>
        <span className={`text-xs font-semibold tracking-wider uppercase block mb-3 ${isLight ? 'text-zinc-500 font-bold' : 'text-white/50'}`}>
          Fine-Tune Palette (തനിമയുള്ള കളറുകൾ)
        </span>
        <div className="space-y-4">
          {/* Custom BG Color */}
          <div className={`p-3 rounded-2xl border transition-colors ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/5'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium font-sans ${isLight ? 'text-zinc-700' : 'text-white/80'}`}>Custom Background (ബാക്ക്ഗ്രൗണ്ട് കളർ)</span>
              <span className={`text-xs font-mono ${isLight ? 'text-zinc-400' : 'text-white/50'}`}>{currentTheme.bgColor.toUpperCase()}</span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                id="custom-bg-picker"
                type="color"
                value={currentTheme.bgColor}
                onChange={handleCustomBgChange}
                className="w-12 h-9 rounded-lg border-0 cursor-pointer bg-transparent outline-none"
              />
              <input
                id="custom-bg-text-input"
                type="text"
                value={currentTheme.bgColor}
                onChange={handleCustomBgChange}
                placeholder="#fff5ec"
                className={`flex-1 border rounded-lg px-3 py-1 text-xs font-mono focus:outline-none transition-colors ${isLight ? 'bg-white border-zinc-250 text-zinc-800 focus:border-amber-400' : 'bg-white/5 border-white/10 text-white focus:border-white/30'}`}
              />
            </div>
          </div>

          {/* Custom Accent Color */}
          <div className={`p-3 rounded-2xl border transition-colors ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/5'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium font-sans ${isLight ? 'text-zinc-700' : 'text-white/80'}`}>Accent Highlights (ആക്സന്റ് അടയാളം)</span>
              <span className={`text-xs font-mono ${isLight ? 'text-zinc-400' : 'text-white/50'}`}>{currentTheme.accentColor.toUpperCase()}</span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                id="custom-accent-picker"
                type="color"
                value={currentTheme.accentColor}
                onChange={handleCustomAccentChange}
                className="w-12 h-9 rounded-lg border-0 cursor-pointer bg-transparent outline-none"
              />
              <input
                id="custom-accent-text-input"
                type="text"
                value={currentTheme.accentColor}
                onChange={handleCustomAccentChange}
                placeholder="#ea580c"
                className={`flex-1 border rounded-lg px-3 py-1 text-xs font-mono focus:outline-none transition-colors ${isLight ? 'bg-white border-zinc-250 text-zinc-800 focus:border-amber-400' : 'bg-white/5 border-white/10 text-white focus:border-white/30'}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-5 pt-4 border-t flex justify-between items-center text-[10px] transition-colors ${isLight ? 'border-zinc-200 text-zinc-400' : 'border-white/5 text-white/30'}`}>
        <div className="flex items-center gap-1">
          <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
          <span>Real-time CSS Injection Active</span>
        </div>
        <div className="font-mono">AJ-V v1.0</div>
      </div>
    </div>
  );
}
