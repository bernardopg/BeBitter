"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// Username real do GitHub
const GITHUB_USERNAME = "bernardopg";

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        setProjectsError(null);
        
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`GitHub API retornou status ${response.status}`);
        }
        
        const data = await response.json();

        // Mapear os repositórios para o formato do projeto
        const mappedProjects: Project[] = data
          .filter((repo: any) => !repo.fork) // Filtrar repositórios forked
          .map((repo: any) => ({
            title: repo.name,
            description: repo.description || `Repositório ${repo.name}`,
            technologies: repo.topics || [], // GitHub topics como tecnologias
            githubUrl: repo.html_url,
            featured: repo.topics?.includes('featured') || false,
            stars: repo.stargazers_count || 0,
          }));

        // Ordenar por estrelas (mais estrelas primeiro)
        const sortedProjects = mappedProjects.sort((a, b) => b.stars - a.stars);
        
        setProjects(sortedProjects);
        setProjectsError(null);
      } catch (error) {
        console.error("Erro ao buscar projetos do GitHub:", error);
        setProjectsError(
          error instanceof Error 
            ? error.message 
            : "Não foi possível carregar os projetos. Tente novamente mais tarde."
        );
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Projetos em destaque (com topic "featured" ou os 6 com mais estrelas)
  const featuredFromApi = projects.filter(p => p.featured);
  const featuredProjects = featuredFromApi.length > 0
    ? featuredFromApi
    : projects.slice(0, 6);

  // Total de estrelas
  const totalStars = projects.reduce((acc, project) => acc + project.stars, 0);

  // Stack de tecnologias (todas as topics únicas)
  const techStack = Array.from(
    new Set(projects.flatMap(p => p.technologies))
  ).sort();

  const value = {
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
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};