import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { HeroSection } from '../HeroSection';

// Mock all the hooks and components
vi.mock('@/components/Analytics', () => ({
  useAnalytics: () => ({
    trackButtonClick: vi.fn(),
    trackExternalLink: vi.fn(),
  }),
}));

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'hero.greeting': 'Hello!',
        'hero.title': 'I\'m',
        'hero.subtitle1': 'Full-Stack Developer',
        'hero.description': 'Building amazing web applications',
        'hero.cta.primary': 'Let\'s Talk',
        'hero.cta.secondary': 'View Projects',
        'hero.profileAlt': 'Profile picture',
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    registerElement: vi.fn(),
    isVisible: () => true,
    getAnimationProps: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    },
  }),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children: React.ReactNode }) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) => <a {...props}>{children}</a>,
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render hero section content', () => {
    render(<HeroSection />, { wrapper: createWrapper() });

    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText("I'm")).toBeInTheDocument();
    // Note: "Bernardo" is not directly rendered - it's part of the typing animation
    expect(screen.getByText('Building amazing web applications')).toBeInTheDocument();
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
    expect(screen.getByText('View Projects')).toBeInTheDocument();
  });

  it('should render profile image with correct alt text', () => {
    render(<HeroSection />, { wrapper: createWrapper() });

    const profileImage = screen.getByAltText('Profile picture');
    expect(profileImage).toBeInTheDocument();
  });

  it('should render social media links', () => {
    render(<HeroSection />, { wrapper: createWrapper() });

    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const instagramLink = screen.getByRole('link', { name: /instagram/i });

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
  });

  it('should have hero section id for navigation', () => {
    render(<HeroSection />, { wrapper: createWrapper() });

    const heroSection = document.querySelector('#hero');
    expect(heroSection).toBeInTheDocument();
  });
});
