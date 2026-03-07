import { FEATURED_REPOSITORIES } from "@/constants/config";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, type ReactNode } from "react";

interface Project {
  title: string;
  description: string | null;
  technologies: string[];
  githubUrl: string;
  featured: boolean;
  stars: number;
}

interface ProjectsContextType {
  projects: Project[];
  featuredProjects: Project[];
  totalStars: number;
  projectsLoading: boolean;
  projectsError: string | null;
  techStack: string[];
}

interface GitHubRepository {
  fork: boolean;
  name: string;
  description: string | null;
  topics?: string[];
  html_url: string;
  stargazers_count: number;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

const GITHUB_USERNAME = "bernardopg";
const FEATURED_ORDER = new Map(
  FEATURED_REPOSITORIES.map((repo, index) => [repo, index])
);

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

const fetchRepos = async (): Promise<Project[]> => {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(10_000),
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API retornou status ${response.status}`);
  }

  const data: GitHubRepository[] = await response.json();

  const mapped: Project[] = data
    .filter((repo) => !repo.fork)
    .filter((repo) => repo.name !== GITHUB_USERNAME)
    .map((repo) => ({
      title: repo.name,
      description: repo.description,
      technologies: repo.topics ?? [],
      githubUrl: repo.html_url,
      featured:
        (repo.topics?.includes("featured") ?? false) ||
        FEATURED_REPOSITORIES.includes(
          repo.name as (typeof FEATURED_REPOSITORIES)[number]
        ),
      stars: repo.stargazers_count,
    }));

  return mapped.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    const aOrder = FEATURED_ORDER.get(
      a.title as (typeof FEATURED_REPOSITORIES)[number]
    );
    const bOrder = FEATURED_ORDER.get(
      b.title as (typeof FEATURED_REPOSITORIES)[number]
    );

    if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
    if (aOrder !== undefined) return -1;
    if (bOrder !== undefined) return 1;

    return b.stars - a.stars;
  });
};

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: projects = [],
    isPending: projectsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["github-projects", GITHUB_USERNAME],
    queryFn: fetchRepos,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 0,
  });

  const projectsError = isError
    ? error instanceof Error
      ? error.message
      : "Não foi possível carregar os projetos."
    : null;

  const featuredFromApi = projects.filter((p) => p.featured);
  const featuredProjects =
    featuredFromApi.length > 0 ? featuredFromApi : projects.slice(0, 6);

  const totalStars = projects.reduce((acc, p) => acc + p.stars, 0);

  const techStack = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).sort();

  const value: ProjectsContextType = {
    projects,
    featuredProjects,
    totalStars,
    projectsLoading,
    projectsError,
    techStack,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
