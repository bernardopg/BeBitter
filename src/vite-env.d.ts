/// <reference types="vite/client" />

// Global gtag types for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        [key: string]: string | number | boolean | Record<string, string | number | boolean>;
        page_title?: string;
        page_location?: string;
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        custom_parameters?: Record<string, string | number | boolean>;
      }
    ) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}

export {};
