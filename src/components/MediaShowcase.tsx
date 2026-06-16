import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Volume2, Film, RotateCcw } from 'lucide-react';

interface MediaShowcaseProps {
  accentColor: string;
  cardBg: string;
  isLight?: boolean;
}

interface Track {
  id: string;
  title: string;
  genre: string;
  url: string;
}

const TUNES: Track[] = [
  {
    id: 'lofi-1',
    title: 'Silent Valley Atmosphere',
    genre: 'Cinematic Ambient',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // reliable sample stream for play test
  },
  {
    id: 'lofi-2',
    title: 'Neon Sunset Drive',
    genre: 'Retro Synthwave Lofi',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  }
];

export default function MediaShowcase({ accentColor, cardBg, isLight = false }: MediaShowcaseProps) {
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [volume, setVolume] = useState(30);
  const [progress, setProgress] = useState(0);

  // Video variables
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Connect audio player progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingSeq) {
      interval = setInterval(() => {
        if (audioRef.current) {
          const current = audioRef.current.currentTime;
          const duration = audioRef.current.duration || 1;
          setProgress((current / duration) * 100);
          if (audioRef.current.ended) {
            handleNextTrack();
          }
        } else {
          // Fallback timer if audio fails to load under restrictive sandbox
          setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingSeq, activeTrackIdx]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleTuneToggle = () => {
    if (!audioRef.current) return;
    if (isPlayingSeq) {
      audioRef.current.pause();
      setIsPlayingSeq(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingSeq(true);
      }).catch(() => {
        // Safe play handling
        setIsPlayingSeq(true);
      });
    }
  };

  const handleNextTrack = () => {
    setProgress(0);
    const nextIdx = (activeTrackIdx + 1) % TUNES.length;
    setActiveTrackIdx(nextIdx);
    setIsPlayingSeq(false);
    
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = TUNES[nextIdx].url;
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlayingSeq(true);
        }).catch(() => {
          setIsPlayingSeq(true); // simulated play if blocked
        });
      }
    }, 100);
  };

  const handleVideoPlayToggle = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setVideoPlaying(true);
        }).catch(() => {
          setVideoPlaying(true);
        });
      }
    }
  };

  const handleVideoRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setVideoPlaying(true);
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* VIDEO PLAYER REELS: Take 3 spans */}
      <div 
        id="video-player-frame"
        className="lg:col-span-3 rounded-3xl border border-white/10 overflow-hidden relative flex flex-col justify-between group h-[320px] bg-black"
        style={{ boxShadow: `0 8px 32px -10px rgba(0,0,0,0.5)` }}
      >
        <video 
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4"
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-10" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] text-white">
            <Film className="w-3.5 h-3.5 text-blue-400" />
            Cinematic Reel Demo
          </span>
          <span className="text-[10px] bg-red-500/80 backend-badge font-mono px-2 py-0.5 rounded-md text-white font-semibold">
            DaVinci Resolve Grade
          </span>
        </div>

        {/* Large Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button 
            id="video-big-btn"
            onClick={handleVideoPlayToggle}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white backdrop-blur-xl scale-95 hover:scale-105 active:scale-95 transition-all duration-300"
            style={{
              boxShadow: `0 5px 15px -5px ${accentColor}`
            }}
          >
            {videoPlaying ? (
              <Pause className="w-6 h-6 text-white" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            )}
          </button>
        </div>

        {/* Description and metadata footer inside video frame */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
          <div className="max-w-[70%]">
            <h4 className="text-sm font-semibold text-white drop-shadow-md leading-tight">Southern Woods Cinematic Draft</h4>
            <p className="text-[11px] text-white/70 drop-shadow-sm mt-1 truncate">
              ഒരു മിനിറ്റ് ദൈർഘ്യമുള്ള സീനറി വർക്ക് • Shot on high dynamic range Sony S-Log3
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              id="video-restart-btn"
              onClick={handleVideoRestart}
              className="p-2 rounded-xl bg-black/50 border border-white/10 text-white hover:bg-black/70 transition"
              title="Restart"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AMBIENT SOUND CONTROLLER DECK: Take 2 spans */}
      <div 
        id="ambient-deck-card"
        className={`lg:col-span-2 rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative border transition-colors duration-300 ${isLight ? 'border-zinc-200 shadow-xl shadow-amber-950/5' : 'border-white/10'}`}
        style={{ backgroundColor: cardBg }}
      >
        {/* Secret HTML5 audio player tag */}
        <audio ref={audioRef} className="hidden" src={TUNES[0].url} loop />

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 ${isLight ? 'text-zinc-500 font-bold' : 'text-white/50'}`}>
              <Music className="w-3.5 h-3.5" style={{ color: accentColor }} />
              Atmos. Player (പശ്ചാത്തല സംഗീതം)
            </span>
            <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Dynamic Match
            </span>
          </div>

          <h4 className={`text-sm font-bold mb-1 leading-snug ${isLight ? 'text-zinc-900 font-bold' : 'text-white'}`}>
            {TUNES[activeTrackIdx].title}
          </h4>
          <span 
            className={`text-[11px] font-mono border px-2 py-0.5 rounded-md inline-block uppercase ${isLight ? 'border-amber-200 bg-amber-50/55 font-bold' : 'border-white/10'}`}
            style={{ color: accentColor }}
          >
            {TUNES[activeTrackIdx].genre}
          </span>
          
          <p className={`text-xs leading-relaxed mt-4 ${isLight ? 'text-zinc-600 font-medium' : 'text-white/50'}`}>
            പോർട്ട്‌ഫോളിയോ കണ്ട് ആസ്വദിക്കുന്നതിനിടയിൽ കേൾക്കാൻ മനോഹരമായ പശ്ചാത്തല സംഗീത ട്രാക്ക് ഓൺ ചെയ്യാവുന്നതാണ്.
          </p>
        </div>

        {/* Audio Interface section */}
        <div className="space-y-4">
          {/* Timeline slider representation */}
          <div className="space-y-1.5">
            <div className={`h-1 rounded-full overflow-hidden ${isLight ? 'bg-zinc-200' : 'bg-white/5'}`}>
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: accentColor }}
              />
            </div>
            <div className={`flex justify-between items-center text-[10px] font-mono ${isLight ? 'text-zinc-500 font-bold' : 'text-white/35'}`}>
              <span>{isPlayingSeq ? 'STREAMING..' : 'PAUSED'}</span>
              <span>LIVE AMBIENT FEED</span>
            </div>
          </div>

          {/* Controls bar */}
          <div className="flex items-center justify-between gap-3">
            <button 
              id="audio-play-btn"
              onClick={handleTuneToggle}
              className="w-11 h-11 rounded-full flex items-center justify-center text-zinc-950 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: accentColor }}
            >
              {isPlayingSeq ? (
                <Pause className="w-4.5 h-4.5" fill="currentColor" />
              ) : (
                <Play className="w-4.5 h-4.5 ml-0.5" fill="currentColor" />
              )}
            </button>

            {/* Simulated Live Audio Equalizer Animation */}
            <div className={`flex items-center gap-[3px] h-6 px-1.5 border rounded-lg flex-1 justify-center ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/5'}`}>
              {[0.4, 0.9, 0.5, 0.7, 0.2, 0.8, 0.6, 0.3].map((val, idx) => (
                <div 
                  key={idx}
                  className="w-0.5 rounded-full"
                  style={{
                    height: isPlayingSeq ? '100%' : '20%',
                    transform: `scaleY(${val})`,
                    transformOrigin: 'bottom',
                    backgroundColor: isPlayingSeq ? accentColor : (isLight ? '#cbd5e1' : 'rgba(255,255,255,0.2)'),
                    animation: isPlayingSeq ? `equalizer-wave 1.2s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${idx * 0.15}s`
                  }}
                />
              ))}
            </div>

            <button 
              id="audio-next-btn"
              onClick={handleNextTrack}
              className={`px-3 py-2 text-xs font-semibold border rounded-xl transition-colors ${isLight ? 'text-zinc-700 bg-white border-zinc-250 shadow-xs hover:bg-zinc-100' : 'text-white/80 border-white/10 hover:bg-white/5 bg-transparent'}`}
            >
              Next
            </button>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-2 pt-2">
            <Volume2 className={`w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-white/40'}`} />
            <input 
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={`flex-1 h-1 rounded-lg ${isLight ? 'bg-zinc-200 accent-zinc-800' : 'bg-white/5 accent-white'}`}
            />
            <span className={`text-[10px] font-mono ${isLight ? 'text-zinc-500 font-bold' : 'text-white/40'}`}>{volume}%</span>
          </div>
        </div>
        
        {/* Style injection for the wave animation */}
        <style>{`
          @keyframes equalizer-wave {
            0% { transform: scaleY(0.25); }
            100% { transform: scaleY(1.1); }
          }
        `}</style>
      </div>
    </div>
  );
}
