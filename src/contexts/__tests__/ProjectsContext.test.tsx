import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ProjectsProvider, useProjects } from '../ProjectsContext';

const mockReposResponse = [
  {
    fork: false,
    name: 'BeBitter',
    description: 'Portfolio website',
    topics: ['React', 'TypeScript', 'featured'],
    html_url: 'https://github.com/bernardopg/BeBitter',
    stargazers_count: 5,
  },
  {
    fork: false,
    name: 'other-project',
    description: 'Another project',
    topics: ['JavaScript'],
    html_url: 'https://github.com/bernardopg/other-project',
    stargazers_count: 2,
  },
];

const TestComponent = () => {
  const {
    projects,
    featuredProjects,
    totalStars,
    projectsLoading,
    projectsError,
  } = useProjects();

  return (
    <div>
      <div data-testid="projects-count">{projects.length}</div>
      <div data-testid="featured-count">{featuredProjects.length}</div>
      <div data-testid="total-stars">{totalStars}</div>
      <div data-testid="loading">{projectsLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="error">{projectsError || 'no-error'}</div>
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
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockReposResponse,
      } as Response),
    );
  });

  it('should provide project data correctly', async () => {
    render(<TestComponent />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(screen.getByTestId('projects-count')).toHaveTextContent('2');
      expect(screen.getByTestId('featured-count')).toHaveTextContent('1');
      expect(screen.getByTestId('total-stars')).toHaveTextContent('7'); // 5 + 2
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      expect(screen.getByTestId('error')).toHaveTextContent('no-error');
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
