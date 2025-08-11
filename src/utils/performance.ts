// Performance monitoring utility

// Type definitions for Web APIs
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface ResourceTimingEntry extends PerformanceEntry {
  responseEnd: number;
}

interface NetworkInformation {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }

  function gtag(...args: unknown[]): void;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Monitor Core Web Vitals
  initCoreWebVitals() {
    if (typeof window === "undefined") return;

    // First Contentful Paint (FCP)
    this.measureFCP();

    // Largest Contentful Paint (LCP)
    this.measureLCP();

    // Cumulative Layout Shift (CLS)
    this.measureCLS();

    // First Input Delay (FID)
    this.measureFID();
  }

  private measureFCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(
        (entry) => entry.name === "first-contentful-paint"
      );
      if (fcpEntry) {
        this.metrics.set("FCP", fcpEntry.startTime);
        console.log("FCP:", fcpEntry.startTime);
      }
    });
    observer.observe({ entryTypes: ["paint"] });
  }

  private measureLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set("LCP", lastEntry.startTime);
      console.log("LCP:", lastEntry.startTime);
    });
    observer.observe({ entryTypes: ["largest-contentful-paint"] });
  }

  private measureCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as LayoutShiftEntry;
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
      this.metrics.set("CLS", clsValue);
      console.log("CLS:", clsValue);
    });
    observer.observe({ entryTypes: ["layout-shift"] });
  }

  private measureFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const firstInput = entry as FirstInputEntry;
        this.metrics.set("FID", firstInput.processingStart - entry.startTime);
        console.log("FID:", firstInput.processingStart - entry.startTime);
      }
    });
    observer.observe({ entryTypes: ["first-input"] });
  }

  // Monitor resource loading times
  measureResourceTiming() {
    if (typeof window === "undefined") return;

    window.addEventListener("load", () => {
      const resources = performance.getEntriesByType("resource");

      resources.forEach((resource) => {
        const timing = resource as ResourceTimingEntry;
        const loadTime = timing.responseEnd - timing.startTime;
        console.log(`${resource.name}: ${loadTime}ms`);

        // Alert for slow resources (> 500ms)
        if (loadTime > 500) {
          console.warn(
            `Slow resource detected: ${resource.name} (${loadTime}ms)`
          );
        }
      });
    });
  }

  // Monitor network connection
  measureConnection() {
    if (typeof navigator !== "undefined" && navigator.connection) {
      const connection = navigator.connection;
      console.log("Connection type:", connection.effectiveType);
      console.log("Downlink speed:", connection.downlink);
      console.log("RTT:", connection.rtt);
    }
  }

  // Get all metrics
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  // Send metrics to analytics (optional)
  sendMetrics(endpoint?: string) {
    const metrics = this.getMetrics();

    if (endpoint) {
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metrics,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      }).catch(console.error);
    }

    // Send to Google Analytics if available
    if (typeof window !== "undefined" && "gtag" in window) {
      Object.entries(metrics).forEach(([metric, value]) => {
        gtag("event", "performance_metric", {
          custom_parameter_1: metric,
          value: Math.round(value as number),
        });
      });
    }
  }
}

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  const monitor = PerformanceMonitor.getInstance();
  monitor.initCoreWebVitals();
  monitor.measureResourceTiming();
  monitor.measureConnection();

  // Send metrics after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      monitor.sendMetrics();
    }, 2000);
  });
};
