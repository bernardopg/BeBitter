import { createContext, useContext, ReactNode } from 'react';
import { useGitHubProjects, useGitHubStats } from '@/hooks/useGitHubProjects';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  stars?: number;
  featured?: boolean;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  location: string;
  bio: string;
  avatarUrl: string;
}

interface ProjectsContextValue {
  // Projects data
  projects: Project[];
  techStack: string[];
  projectsLoading: boolean;
  projectsError: Error | null;

  // GitHub stats
  githubStats: GitHubStats | undefined;
  statsLoading: boolean;
  statsError: Error | null;

  // Computed values
  featuredProjects: Project[];
  totalStars: number;
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError
  } = useGitHubProjects();

  const {
    data: githubStats,
    isLoading: statsLoading,
    error: statsError
  } = useGitHubStats();

  const projects = projectsData?.projects || [];
  const techStack = projectsData?.techStack || [];

  const featuredProjects = projects.filter(project => project.featured);
  const totalStars = projects.reduce((sum, project) => sum + (project.stars || 0), 0);

  const value: ProjectsContextValue = {
    projects,
    techStack,
    projectsLoading,
    projectsError: projectsError as Error | null,

    githubStats,
    statsLoading,
    statsError: statsError as Error | null,

    featuredProjects,
    totalStars,
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
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};