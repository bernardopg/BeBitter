import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProjectsSection } from "../ProjectsSection";

vi.mock("@/components/Analytics", () => ({
  useAnalytics: () => ({
    trackButtonClick: vi.fn(),
    trackProjectView: vi.fn(),
  }),
}));

vi.mock("@/components/ProjectCard", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="project-card">{title}</div>
  ),
}));

vi.mock("@/contexts/projects-context", () => ({
  useProjects: () => ({
    projects: [
      { title: "Project A", description: "Desc A", technologies: ["React"], githubUrl: "https://github.com/a", featured: true, stars: 10 },
      { title: "Project B", description: "Desc B", technologies: ["TS"], githubUrl: "https://github.com/b", featured: true, stars: 5 },
    ],
    featuredProjects: [
      { title: "Project A", description: "Desc A", technologies: ["React"], githubUrl: "https://github.com/a", featured: true, stars: 10 },
    ],
    totalStars: 15,
    projectsLoading: false,
    projectsError: null,
    techStack: ["React", "TypeScript"],
  }),
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "projects.subtitle": "My Work",
        "projects.title": "Projects",
        "projects.description": "Here are my projects",
        "projects.stats.total": "Total",
        "projects.stats.stars": "Stars",
        "projects.stats.featured": "Featured",
        "projects.viewAll": "View All",
        "projects.showLess": "Show Less",
        "projects.viewOnGitHub": "View on GitHub",
        "projects.error": "Failed to load",
      };
      return translations[key] || key;
    },
    language: "en",
  }),
}));

vi.mock("@/hooks/useScrollAnimation", () => ({
  useScrollAnimation: () => ({
    registerElement: vi.fn(),
    isVisible: () => true,
    getAnimationProps: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 },
    },
    getStaggeredAnimationProps: () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    }),
  }),
}));

vi.mock("framer-motion", () => ({
  m: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children?: React.ReactNode }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => <button {...props}>{children}</button>,
  },
  useReducedMotion: () => false,
}));

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("ProjectsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders section with id=projects", () => {
    renderWithRouter(<ProjectsSection />);
    expect(document.querySelector("#projects")).toBeInTheDocument();
  });

  it("renders projects title", () => {
    renderWithRouter(<ProjectsSection />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders project cards from context", () => {
    renderWithRouter(<ProjectsSection />);
    const cards = screen.getAllByTestId("project-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders total stars stat", () => {
    renderWithRouter(<ProjectsSection />);
    expect(screen.getByText("15")).toBeInTheDocument();
  });
});
