import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AboutSection } from "../AboutSection";

vi.mock("@/contexts/projects-context", () => ({
  useProjects: () => ({
    projects: [{ title: "Project 1" }, { title: "Project 2" }],
    featuredProjects: [],
    totalStars: 42,
    projectsLoading: false,
    projectsError: null,
    techStack: ["React", "TypeScript", "Python", "Go", "Rust"],
  }),
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "about.subtitle": "About Me",
        "about.title": "Who I Am",
        "about.description": "A passionate developer",
        "about.stats.projects": "Projects",
        "about.stats.stars": "Stars",
        "about.stats.experience": "Years Exp.",
        "about.skills.title": "Skills",
        "about.bio.paragraph1": "First paragraph",
        "about.bio.paragraph2": "Second paragraph",
        "about.bio.paragraph3": "Third paragraph",
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
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children?: React.ReactNode }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => <p {...props}>{children}</p>,
  },
  useReducedMotion: () => false,
}));

describe("AboutSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders section with id=about", () => {
    render(<AboutSection />);
    expect(document.querySelector("#about")).toBeInTheDocument();
  });

  it("renders about title and description", () => {
    render(<AboutSection />);
    expect(screen.getByText("Who I Am")).toBeInTheDocument();
    expect(screen.getByText("A passionate developer")).toBeInTheDocument();
  });

  it("renders projects count from context", () => {
    render(<AboutSection />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders techStack and totalStars from context", () => {
    render(<AboutSection />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
