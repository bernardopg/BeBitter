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

// IMPORTANT: Replace with your GitHub username
const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME_HERE";

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (GITHUB_USERNAME === "YOUR_GITHUB_USERNAME_HERE") {
        setProjectsError("Please set your GitHub username in src/contexts/ProjectsContext.tsx");
        setProjectsLoading(false);
        return;
      }

      try {
        setProjectsLoading(true);
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from GitHub: ${response.statusText}`);
        }
        const data = await response.json();

        const mappedProjects: Project[] = data
          .filter((repo: any) => !repo.fork) // We'll filter out forked repositories
          .map((repo: any) => ({
            title: repo.name,
            description: repo.description,
            technologies: repo.topics || [],
            githubUrl: repo.html_url,
            // To feature a project, just add the "featured" topic to your repository on GitHub!
            featured: repo.topics?.includes('featured'),
            stars: repo.stargazers_count,
          }));

        // Sort all projects by stars by default
        setProjects(mappedProjects.sort((a, b) => b.stars - a.stars));
        setProjectsError(null);
      } catch (error) {
        console.error("Failed to fetch GitHub projects:", error);
        setProjectsError(error instanceof Error ? error.message : "An unknown error occurred.");
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Use projects with the "featured" topic as featured projects
  const featuredFromApi = projects.filter(p => p.featured);
  
  // If no projects are marked as "featured", we'll fall back to your 6 most-starred projects.
  const featuredProjects = featuredFromApi.length > 0
    ? featuredFromApi
    : projects.slice(0, 6);

  const totalStars = projects.reduce((acc, project) => acc + project.stars, 0);

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