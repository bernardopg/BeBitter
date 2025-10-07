import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock do requestIdleCallback para testes
global.requestIdleCallback = (callback: IdleRequestCallback): number => {
  const timeoutId = setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 0 }), 0);
  return timeoutId as unknown as number;
};

global.cancelIdleCallback = (id: number) => {
  clearTimeout(id);
};

// Mock do IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  constructor() {
    // Mock constructor
  }
} as unknown as typeof IntersectionObserver;

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock do clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

// Mock para window.location
delete (window as { location?: unknown }).location;
(window as { location: Location }).location = { 
  ...window.location, 
  href: 'http://localhost:3000' 
} as Location;