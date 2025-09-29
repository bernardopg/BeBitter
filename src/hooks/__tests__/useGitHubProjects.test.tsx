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

  it('should return fallback projects when no GitHub token is available', async () => {
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

    // Check the results - should return fallback projects
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.projects).toHaveLength(6); // All fallback projects
    expect(result.current.data?.techStack).toBeDefined();
    expect(result.current.data?.techStack.length).toBeGreaterThan(0);

    // Check that BeBitter is featured
    const featuredProject = result.current.data?.projects.find(p => p.featured);
    expect(featuredProject).toBeDefined();
    expect(featuredProject?.title).toBe('BeBitter Portfolio');
  });

  it('should handle API errors gracefully', async () => {
    // Mock a 403 error (rate limit without token)
    mockFetch.mockRejectedValueOnce(new Error('GitHub API error: 403'));

    const { result } = renderHook(() => useGitHubProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );

    // Should fallback to hardcoded projects when API fails
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.projects).toBeDefined();
    expect(result.current.error).toBeNull();
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

    // When API returns empty, should fallback to hardcoded projects
    expect(result.current.data?.projects).toBeDefined();
    expect(result.current.data?.projects.length).toBeGreaterThan(0);
    expect(result.current.data?.techStack).toBeDefined();
  });

  it('should not call API when no token is available', async () => {
    const { result } = renderHook(() => useGitHubProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should not call fetch when no token is available
    expect(mockFetch).not.toHaveBeenCalled();

    // Should return fallback projects
    expect(result.current.data?.projects).toHaveLength(6);
  });
});
