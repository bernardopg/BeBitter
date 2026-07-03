export const CONFIG = {
  // Analytics
  // import.meta.env não existe fora do Vite (ex.: scripts tsx) — optional chaining
  GA_TRACKING_ID: import.meta.env?.VITE_GA_TRACKING_ID || "",

  // API URLs
  GITHUB_API_BASE: "https://api.github.com",
  GITHUB_USERNAME: "bernardopg",

  // Timeouts (in milliseconds)
  SKILLS_DISPLAY_TIMEOUT: 10_000,
  API_TIMEOUT: 10_000,
  TYPING_SPEED: 150,

  // Contact Information
  EMAIL: "bernardo.gomes@bebitterbebetter.com.br",
  PHONE: "5531984916431",
  WHATSAPP_URL: "https://wa.me/5531984916431",
  // Scheduling (prefer self-hosted Cal.com; can be overridden via env)
  CAL_URL: import.meta.env?.VITE_CAL_URL || "https://cal.com/bernardopg",

  // Social Links
  GITHUB_URL: "https://github.com/bernardopg",
  GITLAB_URL: "https://gitlab.com/bernardopg",
  LINKEDIN_URL: "https://www.linkedin.com/in/bernardopg/",
  INSTAGRAM_URL: "https://instagram.com/be.pgomes",
  X_URL: "https://x.com/cooldeflecha",
  TIKTOK_URL: "https://vm.tiktok.com/ZMjE479hG",
  WORDPRESS_URL: "https://bznkng9.wordpress.com",
  SPONSOR_URL: "https://github.com/sponsors/bernardopg",

  // Performance
  INTERSECTION_THRESHOLD: 0.1,
  LAZY_LOAD_ROOT_MARGIN: "50px",

  // Animation Settings
  ANIMATION_DURATION: 0.6,
  ANIMATION_DELAY_INCREMENT: 0.2,

  // Limits
  MAX_FEATURED_PROJECTS: 6,
  MAX_REPOS_FETCH: 100,
} as const;

// Curadoria: ordenado por relevância (estrelas, completude, atratividade).
// Os 4 primeiros aparecem na homepage.
export const FEATURED_REPOSITORIES = [
  "AiOverviewControl", // top stars (6★), plugin QML ativo — vitrine técnica
  "LASCMMG", // produto full-stack completo (Node/React/Socket.io)
  "ioruba", // hardware + Tauri/React/Rust — único e atrativo
  "dms-adguard-vpn-plugin", // 4★, tooling Linux/QML
  "cmmg-calendar", // produto de integração de calendário (TypeScript)
  "mvp-estetoscopio", // educação/saúde com SM-2 — diferenciado
  "AutoJoin-for-SteamGifts", // automação browser popular
  "steam-idler-python", // automação Python ativa
] as const;

export const SKILL_CATEGORIES = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  TOOLS: "Tools & DevOps",
  DESIGN: "Design & UX",
} as const;
