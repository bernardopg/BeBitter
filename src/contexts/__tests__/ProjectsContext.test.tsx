import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ProjectsProvider, useProjects } from '../ProjectsContext';

// Mock the useGitHubProjects hook
vi.mock('@/hooks/useGitHubProjects', () => ({
  useGitHubProjects: () => ({
    data: {
      projects: [
        {
          title: 'BeBitter',
          description: 'Portfolio website',
          technologies: ['React', 'TypeScript'],
          githubUrl: 'https://github.com/bernardopg/BeBitter',
          stars: 5,
          featured: true,
        },
        {
          title: 'other-project',
          description: 'Another project',
          technologies: ['JavaScript'],
          githubUrl: 'https://github.com/bernardopg/other-project',
          stars: 2,
          featured: false,
        },
      ],
      techStack: ['React', 'TypeScript', 'JavaScript'],
    },
    isLoading: false,
    error: null,
  }),
  useGitHubStats: () => ({
    data: {
      publicRepos: 25,
      followers: 50,
      following: 30,
      location: 'Belo Horizonte, MG',
      bio: 'Full-stack developer',
      avatarUrl: 'https://avatars.githubusercontent.com/u/69475128',
    },
    isLoading: false,
    error: null,
  }),
}));

const TestComponent = () => {
  const {
    projects,
    techStack,
    featuredProjects,
    totalStars,
    projectsLoading,
    githubStats,
  } = useProjects();

  return (
    <div>
      <div data-testid="projects-count">{projects.length}</div>
      <div data-testid="tech-stack-count">{techStack.length}</div>
      <div data-testid="featured-count">{featuredProjects.length}</div>
      <div data-testid="total-stars">{totalStars}</div>
      <div data-testid="loading">{projectsLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="public-repos">{githubStats?.publicRepos}</div>
    </div>
  );
};

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
    <QueryClientProvider client={queryClient}>
      <ProjectsProvider>{children}</ProjectsProvider>
    </QueryClientProvider>
  );
};

describe('ProjectsContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide project data correctly', async () => {
    render(<TestComponent />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(screen.getByTestId('projects-count')).toHaveTextContent('2');
      expect(screen.getByTestId('tech-stack-count')).toHaveTextContent('3');
      expect(screen.getByTestId('featured-count')).toHaveTextContent('1');
      expect(screen.getByTestId('total-stars')).toHaveTextContent('7'); // 5 + 2
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      expect(screen.getByTestId('public-repos')).toHaveTextContent('25');
    });
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useProjects must be used within a ProjectsProvider');

    consoleSpy.mockRestore();
  });

  it('should calculate featured projects correctly', async () => {
    render(<TestComponent />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      // Only BeBitter is featured
      expect(screen.getByTestId('featured-count')).toHaveTextContent('1');
    });
  });

  it('should calculate total stars correctly', async () => {
    render(<TestComponent />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      // 5 (BeBitter) + 2 (other-project) = 7
      expect(screen.getByTestId('total-stars')).toHaveTextContent('7');
    });
  });
});