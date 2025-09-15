export const CONFIG = {
  // Analytics
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || 'G-YJHKLMHN8X',

  // API URLs
  GITHUB_API_BASE: 'https://api.github.com',
  GITHUB_USERNAME: 'bernardopg',

  // Timeouts (in milliseconds)
  SKILLS_DISPLAY_TIMEOUT: 10_000,
  API_TIMEOUT: 10_000,
  TYPING_SPEED: 150,

  // Contact Information
  EMAIL: 'bernardo.gomes@bebitterbebetter.com.br',
  PHONE: '5531984916431',
  WHATSAPP_URL: 'https://wa.me/5531984916431',
  CALENDLY_URL: 'https://calendly.com/bernardopg',

  // Social Links
  GITHUB_URL: 'https://github.com/bernardopg',
  LINKEDIN_URL: 'https://linkedin.com/in/bernardopg',
  INSTAGRAM_URL: 'https://instagram.com/be.pgomes',

  // Performance
  INTERSECTION_THRESHOLD: 0.1,
  LAZY_LOAD_ROOT_MARGIN: '50px',

  // Animation Settings
  ANIMATION_DURATION: 0.6,
  ANIMATION_DELAY_INCREMENT: 0.2,

  // Limits
  MAX_FEATURED_PROJECTS: 6,
  MAX_REPOS_FETCH: 100,
} as const;

export const FEATURED_REPOSITORIES = [
  'BeBitter',
  'dyad-core',
  'next-saas-starter',
  'react-components',
  'typescript-utils',
] as const;

export const SKILL_CATEGORIES = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  TOOLS: 'Tools & DevOps',
  DESIGN: 'Design & UX',
} as const;