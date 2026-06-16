import { PortfolioItem, ThemeConfig, Testimony } from './types';

// Preset themes with backgrounds matching the AJ Vertex creative motif
export const THEME_PRESETS: { name: string; key: string; config: ThemeConfig }[] = [
  {
    name: 'Vibrant Light Orange',
    key: 'light-orange',
    config: {
      bgColor: '#fff5ec', // Warm premium light orange background
      accentColor: '#ea580c', // Bright premium orange high contrast accent
      glowColor: '#ea580c22',
      cardBgOverride: '#ffffff', // Crisp white offset card style
      isLight: true
    }
  },
  {
    name: 'Midnight Obsidian',
    key: 'dark-obsidian',
    config: {
      bgColor: '#08080c',
      accentColor: '#3b82f6', // Neon blue
      glowColor: '#1d4ed833',
      cardBgOverride: '#101016',
      isLight: false
    }
  },
  {
    name: 'Cosmic Violet',
    key: 'cosmic-violet',
    config: {
      bgColor: '#0c0714',
      accentColor: '#a855f7', // Electric Purple
      glowColor: '#7e22ce33',
      cardBgOverride: '#130c1f'
    }
  },
  {
    name: 'Emerald Velvet',
    key: 'emerald-velvet',
    config: {
      bgColor: '#040d0a',
      accentColor: '#10b981', // Jade Emerald
      glowColor: '#04785733',
      cardBgOverride: '#0a1612'
    }
  },
  {
    name: 'Crimson Ember',
    key: 'crimson-ember',
    config: {
      bgColor: '#0f0505',
      accentColor: '#ef4444', // Hot Red
      glowColor: '#b91c1c33',
      cardBgOverride: '#170b0b'
    }
  },
  {
    name: 'Titanium Slate',
    key: 'titanium-slate',
    config: {
      bgColor: '#0f1115',
      accentColor: '#f43f5e', // Rose Pink Neon
      glowColor: '#e11d4833',
      cardBgOverride: '#171a21'
    }
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // PHOTOGRAPHY
  {
    id: 'photo-1',
    title: 'Golden Hour Solitude',
    category: 'photography',
    subCategory: 'Cinematic Landscape',
    description: 'A study of warmth and shadow captured in the Western Ghats during the fleeting moments before twilight. Emphasizes atmospheric depth and natural scale.',
    imageUrl: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=800',
    accentColor: '#f59e0b',
    date: 'Jan 2026',
    metadata: [
      { label: 'Camera', value: 'Sony Alpha 7R V' },
      { label: 'Lens', value: '24-70mm f/2.8 GM ii' },
      { label: 'Settings', value: '1/160s, f/4.0, ISO 100' },
      { label: 'Location', value: 'Vagamon Hills, Kerala' }
    ],
    featured: true
  },
  {
    id: 'photo-2',
    title: 'Neon Whispers',
    category: 'photography',
    subCategory: 'Urban Night',
    description: 'A high-contrast street capture exploring the reflections of glowing neon lights in fresh puddles of rainwater, crafting a cyberpunk dreamscape.',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800',
    accentColor: '#a855f7',
    date: 'Dec 2025',
    metadata: [
      { label: 'Camera', value: 'Sony Alpha 7R V' },
      { label: 'Lens', value: '85mm f/1.4 GM' },
      { label: 'Settings', value: '1/80s, f/1.4, ISO 800' },
      { label: 'Style', value: 'Moody Cyberpunk' }
    ],
    featured: true
  },
  {
    id: 'photo-3',
    title: 'The Silent Sentinel',
    category: 'photography',
    subCategory: 'Fine Art Portrait',
    description: 'A stark, emotional monochrome portrait highlighting expression and high-contrast styling to bring forth raw inner character and story.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
    accentColor: '#6b7280',
    date: 'Mar 2026',
    metadata: [
      { label: 'Camera', value: 'Fujifilm X-T5' },
      { label: 'Lens', value: '56mm f/1.2 R WR' },
      { label: 'Settings', value: '1/250s, f/1.8, ISO 200' },
      { label: 'Lighting', value: 'Rembrandt side light' }
    ],
    featured: false
  },
  {
    id: 'photo-4',
    title: 'Emerald Canopy',
    category: 'photography',
    subCategory: 'Nature / Travel',
    description: 'An aerial viewpoint of the lush, winding canoe channels which form Kerala’s iconic backwaters, showcasing rich emerald greens and geographic patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800',
    accentColor: '#10b981',
    date: 'Feb 2026',
    metadata: [
      { label: 'Drone', value: 'DJI Mavic 3 Pro' },
      { label: 'Sensor', value: 'Hasselblad L2D-20c' },
      { label: 'Settings', value: '1/320s, f/4.5, ISO 100' },
      { label: 'Location', value: 'Alappuzha, India' }
    ],
    featured: false
  },

  // VIDEOGRAPHY
  {
    id: 'video-1',
    title: 'The Wandering Echoes',
    category: 'videography',
    subCategory: 'Cinematic Reel',
    description: 'A passion-fueled short cinematic montage capturing local daily life and heritage landscapes in South India, with seamless pacing and heavy color grading.',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    accentColor: '#3b82f6',
    date: 'Feb 2026',
    metadata: [
      { label: 'Software', value: 'Premiere Pro / DaVinci Resolve' },
      { label: 'Shot On', value: 'Sony FX3' },
      { label: 'Color Spec', value: 'S-Log3 to Rec.709 Custom Lut' },
      { label: 'Duration', value: '1:45 mins' }
    ],
    featured: true
  },
  {
    id: 'video-2',
    title: 'Rhythm of the Loom',
    category: 'videography',
    subCategory: 'Commercial / Docu-style',
    description: 'A moody, rhythmic documentary micro-short capturing the sound, sweat, and geometry of traditional village weavers, celebrating hands-on craftsmanship.',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-of-a-man-writing-on-a-typewriter-40157-large.mp4',
    accentColor: '#14b8a6',
    date: 'Nov 2025',
    metadata: [
      { label: 'Software', value: 'DaVinci Resolve Studio' },
      { label: 'Sound Design', value: 'Reconstructed Foley soundscapes' },
      { label: 'Aspect Ratio', value: '2.39:1 Cinemascope' }
    ],
    featured: false
  },

  // GRAPHIC DESIGN
  {
    id: 'graphic-1',
    title: 'Brutalist Vertices',
    category: 'graphic-design',
    subCategory: 'Poster Design',
    description: 'An experimental geometric typographic poster highlighting hard-angled, giant structures and bold, high-contrast typography, evoking industrial precision.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
    accentColor: '#ec4899',
    date: 'Apr 2026',
    metadata: [
      { label: 'Tool', value: 'Adobe Illustrator / Photoshop' },
      { label: 'Inspiration', value: 'Neo-Brutalism & Swiss design' },
      { label: 'Print Size', value: 'A1 Archival matte' }
    ],
    featured: true
  },
  {
    id: 'graphic-2',
    title: 'Aura Visual Identity',
    category: 'graphic-design',
    subCategory: 'Brand Identity',
    description: 'A complete brand ecosystem created for an artisanal coffee roastery, featuring minimalist logos, modern packaging patterns, and tactile paper choices.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800',
    accentColor: '#d97706',
    date: 'Mar 2026',
    metadata: [
      { label: 'Tool', value: 'Figma / Illustrator' },
      { label: 'Deliverables', value: 'Logo, Packaging, Style Guide' },
      { label: 'Creative Slate', value: 'Warm earthy textures' }
    ],
    featured: false
  },

  // WEB PROJECTS
  {
    id: 'web-1',
    title: 'Lumina Creative Hub',
    category: 'web-projects',
    subCategory: 'Creative Agency Page',
    description: 'A highly functional, bespoke showcase web experience with 3D scrolling layouts and seamless page transitions, developed using React and Tailwind.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800',
    externalUrl: 'https://example.com/lumina',
    accentColor: '#06b6d4',
    date: 'May 2026',
    metadata: [
      { label: 'Framework', value: 'React / Vite' },
      { label: 'Animation', value: 'Motion (Framer)' },
      { label: 'Styling', value: 'Tailwind CSS classes' }
    ],
    featured: true
  },
  {
    id: 'web-2',
    title: 'Prism Color Systems',
    category: 'web-projects',
    subCategory: 'Developer Utility Tool',
    description: 'An interactive web-based utility tool helping creatives build perfectly balancing background contrasts and gradient maps using mathematical color spacing.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800',
    externalUrl: 'https://example.com/prism',
    accentColor: '#f43f5e',
    date: 'Apr 2026',
    metadata: [
      { label: 'Language', value: 'TypeScript' },
      { label: 'Library', value: 'D3.js for visual coordinate charts' },
      { label: 'State', value: 'Zustand Local Store' }
    ],
    featured: false
  },

  // CREATIVE LABS (EXPERIMENTAL)
  {
    id: 'lab-1',
    title: 'Sympathetic Resonance',
    category: 'labs',
    subCategory: 'Generative Audio Sandbox',
    description: 'A creative micro-canvas where user gestures trigger glowing fluid ripples alongside soft, beautifully generated modular synthesizer chimes.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
    accentColor: '#4f46e5',
    date: 'May 2026',
    metadata: [
      { label: 'Engine', value: 'HTML5 Web Audio API' },
      { label: 'Render', value: 'Canvas 2D Context' },
      { label: 'Interaction', value: 'Touch & Pointer coordinate tracking' }
    ],
    featured: true
  }
];

export const SKILL_GROUPS = [
  {
    title: 'Photography & Imagery',
    skills: ['Cinematic Composition', 'RAW Image Processing', 'Studio Light Setup', 'Lightroom color grading', 'Street Journaling']
  },
  {
    title: 'Motion & Video Assets',
    skills: ['Video Editing (Premiere Pro)', 'Color Science (DaVinci Resolve)', 'Keyframe Animations (AE)', 'Sound design & Atmos', 'Cinematic Drone piloting']
  },
  {
    title: 'Graphic Arts & Brand',
    skills: ['Minimal Typographic Posters', 'Vector Logo Systems', 'Social Media Creatives', 'UX/UI Wireframes (Figma)', 'Neo-Brutalist Layouts']
  },
  {
    title: 'Web Engineering',
    skills: ['Modern React & Vite', 'TypeScript Architecture', 'Tailwind Fluid Layouts', 'Interactive SVG Assets', 'Animations (Motion)']
  }
];

export const MILESTONES = [
  {
    year: '2026',
    title: 'AJ Vertex Digital Launch',
    desc: 'Unifying creative arts, editing streams, and modern developmental designs into one central personal hub.'
  },
  {
    year: '2025',
    title: 'Freelance Director of Photography',
    desc: 'Led local storytelling campaigns and shot over 10 high-quality commercial reels for premium regional brands.'
  },
  {
    year: '2024',
    title: 'Branding & Design Focus',
    desc: 'Delivered robust visual guidelines and graphic templates to upwards of 25 startups and local content creators.'
  },
  {
    year: '2023',
    title: 'Web Dev Integration',
    desc: 'Blended visual design mastery with high-performance responsive frontend structures using React and modern CSS.'
  },
  {
    year: '2021',
    title: 'The Creative Spark',
    desc: 'Began exploring cameras, digital canvases, and visual software to transform daydreams into visual captures.'
  }
];

export const CLIENT_TESTIMONIALS: Testimony[] = [
  {
    id: 'test-1',
    name: 'Suhail Ibrahim',
    role: 'Creative Director',
    company: 'IndieWave Productions',
    text: 'Ajith represents a rare combination. He understands both the strict code mechanics of a great website and the artistic storytelling of cinematic lighting. AJ Vertex is the ultimate reflection of this rare vision.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'
  },
  {
    id: 'test-2',
    name: 'Meera Krishnan',
    role: 'Marketing Lead',
    company: 'Lotus Lifestyle',
    text: 'The poster designs and video reels Ajith crafted for our brand launch completely elevated our digital presence. He takes a simple brief and turns it into an immersive sensory story. Working with him is pure joy!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'
  }
];
