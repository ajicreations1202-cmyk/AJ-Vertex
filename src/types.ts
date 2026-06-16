export type ProjectCategory =
  | 'all'
  | 'photography'
  | 'videography'
  | 'graphic-design'
  | 'web-projects'
  | 'labs';

export interface PortfolioItem {
  id: string;
  title: string;
  category: ProjectCategory;
  subCategory: string;
  description: string;
  imageUrl: string;
  videoUrl?: string; // or mockup clip
  externalUrl?: string;
  accentColor: string;
  date: string;
  metadata: { label: string; value: string }[];
  featured: boolean;
}

export interface ThemeConfig {
  bgColor: string;          // Hex code for background
  accentColor: string;      // Accent highlight color
  glowColor: string;        // Glow aura color
  cardBgOverride?: string;  // Custom card bg color offset
  isLight?: boolean;        // Optional flag for light base theme
}

export interface Testimony {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarUrl: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}
