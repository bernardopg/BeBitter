import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Tipos para métricas Web Vitals
interface VitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
  delta: number;
}

// Função para determinar rating baseado nos thresholds do Google
const getMetricRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 }
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

// Função para enviar métricas para Analytics
const sendVitalToAnalytics = (metric: VitalMetric) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      custom_parameters: {
        metric_rating: metric.rating,
        metric_id: metric.id,
        metric_delta: metric.delta,
        page_path: window.location.pathname,
        connection_type: (navigator as Navigator & { connection?: { effectiveType?: string } })?.connection?.effectiveType || 'unknown'
      }
    });
  }

  // Log para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      page: window.location.pathname
    });
  }
};

// Componente Web Vitals
const WebVitals = () => {
  useEffect(() => {
    // Só executar no browser
    if (typeof window === 'undefined') return;

    // CLS - Cumulative Layout Shift
    onCLS((metric) => {
      const vital: VitalMetric = {
        name: 'CLS',
        value: metric.value,
        rating: getMetricRating('CLS', metric.value),
        id: metric.id,
        delta: metric.delta
      };
      sendVitalToAnalytics(vital);
    });

    // INP - Interaction to Next Paint (substitui FID)
    onINP((metric) => {
      const vital: VitalMetric = {
        name: 'INP',
        value: metric.value,
        rating: getMetricRating('FID', metric.value), // Usa FID thresholds
        id: metric.id,
        delta: metric.delta
      };
      sendVitalToAnalytics(vital);
    });

    // FCP - First Contentful Paint
    onFCP((metric) => {
      const vital: VitalMetric = {
        name: 'FCP',
        value: metric.value,
        rating: getMetricRating('FCP', metric.value),
        id: metric.id,
        delta: metric.delta
      };
      sendVitalToAnalytics(vital);
    });

    // LCP - Largest Contentful Paint
    onLCP((metric) => {
      const vital: VitalMetric = {
        name: 'LCP',
        value: metric.value,
        rating: getMetricRating('LCP', metric.value),
        id: metric.id,
        delta: metric.delta
      };
      sendVitalToAnalytics(vital);
    });

    // TTFB - Time to First Byte
    onTTFB((metric) => {
      const vital: VitalMetric = {
        name: 'TTFB',
        value: metric.value,
        rating: getMetricRating('TTFB', metric.value),
        id: metric.id,
        delta: metric.delta
      };
      sendVitalToAnalytics(vital);
    });

  }, []);

  return null;
};

// Hook personalizado para Web Vitals
export const useWebVitals = () => {
  useEffect(() => {
    // Performance Observer para métricas adicionais
    if ('PerformanceObserver' in window) {
      try {
        // Observer para Navigation Timing
        const navObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;

              // DNS Lookup Time
              const dnsTime = navEntry.domainLookupEnd - navEntry.domainLookupStart;
              if (dnsTime > 0 && typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'performance_metric', {
                  event_category: 'Performance',
                  event_label: 'DNS Lookup Time',
                  value: Math.round(dnsTime)
                });
              }

              // Connection Time
              const connectionTime = navEntry.connectEnd - navEntry.connectStart;
              if (connectionTime > 0 && typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'performance_metric', {
                  event_category: 'Performance',
                  event_label: 'Connection Time',
                  value: Math.round(connectionTime)
                });
              }

              // Server Response Time
              const responseTime = navEntry.responseEnd - navEntry.responseStart;
              if (responseTime > 0 && typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'performance_metric', {
                  event_category: 'Performance',
                  event_label: 'Server Response Time',
                  value: Math.round(responseTime)
                });
              }
            }
          });
        });

        navObserver.observe({ entryTypes: ['navigation'] });

        // Observer para Resource Timing (recursos lentos)
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const resourceEntry = entry as PerformanceResourceTiming;
            const duration = resourceEntry.duration;

            // Log recursos que demoram mais que 1 segundo
            if (duration > 1000 && typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'slow_resource', {
                event_category: 'Performance Issues',
                event_label: resourceEntry.name,
                value: Math.round(duration)
              });
            }
          });
        });

        resourceObserver.observe({ entryTypes: ['resource'] });

        // Cleanup observers
        return () => {
          navObserver.disconnect();
          resourceObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance Observer not supported or failed:', error);
      }
    }
  }, []);

  // Função para tracking manual de performance
  const trackCustomPerformance = (name: string, value: number, category: string = 'Custom Performance') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'custom_performance', {
        event_category: category,
        event_label: name,
        value: Math.round(value),
        custom_parameters: {
          page_path: window.location.pathname
        }
      });
    }
  };

  return { trackCustomPerformance };
};

export default WebVitals;
