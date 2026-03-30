import { createContext, useContext } from "react";

export interface Project {
  title: string;
  description: string | null;
  technologies: string[];
  githubUrl: string;
  featured: boolean;
  stars: number;
}

export interface ProjectsContextType {
  projects: Project[];
  featuredProjects: Project[];
  totalStars: number;
  projectsLoading: boolean;
  projectsError: string | null;
  techStack: string[];
}

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

export function useProjects() {
  const context = useContext(ProjectsContext);

  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }

  return context;
}
