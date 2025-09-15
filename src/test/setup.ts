import '@testing-library/jest-dom';

// Mock do requestIdleCallback para testes
global.requestIdleCallback = (callback: IdleRequestCallback) => {
  return setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 0 }), 0);
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
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
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
delete (window as unknown as { location: unknown }).location;
window.location = { ...window.location, href: 'http://localhost:3000' } as Location;