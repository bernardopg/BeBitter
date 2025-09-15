import { useQuery } from '@tanstack/react-query';
import { CONFIG, FEATURED_REPOSITORIES } from '@/constants/config';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

interface GitHubLanguageResponse {
  [language: string]: number;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  stars?: number;
  featured?: boolean;
}

// Projetos de exemplo para fallback
const FALLBACK_PROJECTS: Project[] = [
  {
    title: "BeBitter Portfolio",
    description: "Portfolio pessoal moderno construído com React, TypeScript e Tailwind CSS. Apresenta animações fluidas, design responsivo e integração com APIs.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    githubUrl: "https://github.com/bernardopg/BeBitter",
    stars: 15,
    featured: true,
  },
  {
    title: "E-commerce Platform",
    description: "Plataforma completa de e-commerce com painel administrativo, sistema de pagamentos e gestão de estoque. Construída com Next.js e Node.js.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    githubUrl: "https://github.com/bernardopg/ecommerce-platform",
    stars: 32,
    featured: true,
  },
  {
    title: "Task Management App",
    description: "Aplicativo de gerenciamento de tarefas com colaboração em tempo real, notificações push e sincronização offline.",
    technologies: ["React", "Socket.io", "MongoDB", "Express", "PWA"],
    githubUrl: "https://github.com/bernardopg/task-manager",
    stars: 28,
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description: "Dashboard meteorológico com previsões detalhadas, mapas interativos e alertas personalizados. Integração com múltiplas APIs.",
    technologies: ["Vue.js", "D3.js", "OpenWeather API", "Mapbox", "Chart.js"],
    githubUrl: "https://github.com/bernardopg/weather-dashboard",
    stars: 19,
    featured: false,
  },
  {
    title: "Blog CMS",
    description: "Sistema de gerenciamento de conteúdo para blogs com editor rich text, SEO otimizado e sistema de comentários.",
    technologies: ["Gatsby", "GraphQL", "Contentful", "Netlify", "React"],
    githubUrl: "https://github.com/bernardopg/blog-cms",
    stars: 12,
    featured: false,
  },
  {
    title: "Finance Tracker",
    description: "Aplicativo de controle financeiro pessoal com categorização automática, relatórios e metas de economia.",
    technologies: ["React Native", "Firebase", "Chart.js", "AsyncStorage"],
    githubUrl: "https://github.com/bernardopg/finance-tracker",
    stars: 24,
    featured: false,
  },
];

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

const waitForIdle = () =>
  new Promise<void>((resolve) => {
    if (typeof window === 'undefined') return resolve();
    const ric = (window as Window & { requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout?: number }) => number }).requestIdleCallback;
    if (typeof ric === 'function') {
      ric(() => resolve(), { timeout: 2000 });
    } else {
      setTimeout(() => resolve(), 1000);
    }
  });

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  await waitForIdle();
  const response = await fetch(
    `${CONFIG.GITHUB_API_BASE}/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=${CONFIG.MAX_REPOS_FETCH}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
    }
  );

  if (!response.ok) {
    // Avoid spamming unauthenticated 403s
    if (response.status === 403) {
      throw new Error('GitHub API error: 403');
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
};

const fetchRepoLanguages = async (repoName: string): Promise<GitHubLanguageResponse> => {
  const response = await fetch(
    `${CONFIG.GITHUB_API_BASE}/repos/${CONFIG.GITHUB_USERNAME}/${repoName}/languages`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
    }
  );

  if (!response.ok) {
    throw new Error(`Languages API error: ${response.status}`);
  }

  return response.json();
};

const processRepoData = async (repos: GitHubRepo[]): Promise<{
  projects: Project[];
  techStack: string[];
}> => {
  const allTechnologies = new Set<string>();

  const projectsPromises = repos
    .filter(repo => repo.name !== CONFIG.GITHUB_USERNAME)
    .slice(0, 20) // Process only top 20 repos
    .map(async (repo) => {
      try {
        const languages = await fetchRepoLanguages(repo.name);
        const repoTechnologies = Object.keys(languages);

        repoTechnologies.forEach(tech => allTechnologies.add(tech));

        return {
          title: repo.name,
          description: repo.description || `${repo.name} repository`,
          technologies: repoTechnologies,
          githubUrl: repo.html_url,
          stars: repo.stargazers_count,
          featured: FEATURED_REPOSITORIES.includes(repo.name as typeof FEATURED_REPOSITORIES[number]),
        };
      } catch (error) {
        console.warn(`Failed to fetch languages for ${repo.name}:`, error);

        // Fallback to basic repo data
        const fallbackTech = repo.language ? [repo.language] : [];
        fallbackTech.forEach(tech => allTechnologies.add(tech));

        return {
          title: repo.name,
          description: repo.description || `${repo.name} repository`,
          technologies: fallbackTech,
          githubUrl: repo.html_url,
          stars: repo.stargazers_count,
          featured: FEATURED_REPOSITORIES.includes(repo.name as typeof FEATURED_REPOSITORIES[number]),
        };
      }
    });

  const projects = await Promise.all(projectsPromises);

  // Sort projects: featured first, then by stars
  const sortedProjects = projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (b.stars || 0) - (a.stars || 0);
  });

  return {
    projects: sortedProjects.slice(0, CONFIG.MAX_FEATURED_PROJECTS),
    techStack: Array.from(allTechnologies).sort(),
  };
};

export const useGitHubProjects = () => {
  return useQuery({
    queryKey: ['github-projects', CONFIG.GITHUB_USERNAME],
    queryFn: async () => {
      if (!GITHUB_TOKEN) {
        // Sem token, ir direto ao fallback para evitar 403 e custo de rede
        const allTechnologies = new Set<string>();
        FALLBACK_PROJECTS.forEach(project => {
          project.technologies.forEach(tech => allTechnologies.add(tech));
        });
        return {
          projects: FALLBACK_PROJECTS,
          techStack: Array.from(allTechnologies).sort(),
        };
      }
      try {
        const repos = await fetchGitHubRepos();
        return processRepoData(repos);
      } catch (error) {
        // Silencia erros 403 comuns de rate-limit quando sem token
        if (import.meta.env.DEV) {
          console.warn('GitHub API failed, using fallback projects:', error);
        }
        
        // Usar projetos de fallback quando a API falha
        const allTechnologies = new Set<string>();
        FALLBACK_PROJECTS.forEach(project => {
          project.technologies.forEach(tech => allTechnologies.add(tech));
        });

        return {
          projects: FALLBACK_PROJECTS,
          techStack: Array.from(allTechnologies).sort(),
        };
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    retry: 0, // Evita múltiplas tentativas quando rate-limited
  });
};

export const useGitHubStats = () => {
  return useQuery({
    queryKey: ['github-stats', CONFIG.GITHUB_USERNAME],
    queryFn: async () => {
      if (!GITHUB_TOKEN) {
        // Evita chamada sem token e retorna dados mínimos
        return {
          publicRepos: undefined,
          followers: undefined,
          following: undefined,
          location: undefined,
          bio: undefined,
          avatarUrl: undefined,
        };
      }
      await waitForIdle();
      const response = await fetch(
        `${CONFIG.GITHUB_API_BASE}/users/${CONFIG.GITHUB_USERNAME}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
          },
          signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub User API error: ${response.status}`);
      }

      const user = await response.json();

      return {
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        location: user.location,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 0,
  });
};
