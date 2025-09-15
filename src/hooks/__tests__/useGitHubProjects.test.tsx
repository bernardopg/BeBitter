import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { useGitHubProjects } from '../useGitHubProjects';
import { CONFIG } from '@/constants/config';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

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

describe('useGitHubProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and process GitHub projects successfully', async () => {
    // Mock successful API responses
    const mockRepos = [
      {
        name: 'BeBitter',
        description: 'Personal portfolio website',
        html_url: 'https://github.com/bernardopg/BeBitter',
        stargazers_count: 5,
        language: 'TypeScript',
        updated_at: '2023-01-01',
        topics: ['react', 'typescript'],
      },
      {
        name: 'other-repo',
        description: 'Another repository',
        html_url: 'https://github.com/bernardopg/other-repo',
        stargazers_count: 2,
        language: 'JavaScript',
        updated_at: '2023-01-02',
        topics: [],
      },
    ];

    const mockLanguages = {
      TypeScript: 1000,
      JavaScript: 500,
      CSS: 200,
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRepos),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockLanguages),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockLanguages),
      });

    const { result } = renderHook(() => useGitHubProjects(), {
      wrapper: createWrapper(),
    });

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    // Wait for data to load
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );

    // Check the results
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.projects).toHaveLength(2);
    expect(result.current.data?.techStack).toEqual(['CSS', 'JavaScript', 'TypeScript']);

    // Check featured project
    const featuredProject = result.current.data?.projects.find(p => p.featured);
    expect(featuredProject).toBeDefined();
    expect(featuredProject?.title).toBe('BeBitter');
  });

  it('should handle API errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useGitHubProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.error).toBeTruthy();
      },
      { timeout: 5000 }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle empty repositories', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const { result } = renderHook(() => useGitHubProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.projects).toEqual([]);
    expect(result.current.data?.techStack).toEqual([]);
  });

  it('should call the correct API endpoint', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    renderHook(() => useGitHubProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        `${CONFIG.GITHUB_API_BASE}/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=${CONFIG.MAX_REPOS_FETCH}`,
        expect.objectContaining({
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        })
      );
    });
  });
});