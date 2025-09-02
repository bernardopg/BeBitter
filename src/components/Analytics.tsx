/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Tipagens para eventos personalizados
interface AnalyticsEvent {
  event_name: string;
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean>;
}

// Função para enviar eventos para Google Analytics
const sendGTMEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.event_name, {
      event_category: event.event_category,
      event_label: event.event_label,
      value: event.value,
      ...event.custom_parameters
    });
  }
};

// Analytics de navegação
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-YJHKLMHN8X', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }

    // Track página específica
    const pageName = location.pathname === '/' ? 'Home' :
                     location.pathname === '/now' ? 'Now' : 'Other';

    sendGTMEvent({
      event_name: 'page_view',
      event_category: 'Navigation',
      event_label: pageName,
      custom_parameters: {
        page_path: location.pathname,
        page_title: document.title
      }
    });

  }, [location]);

  return null;
};

// Hook para eventos personalizados
export const useAnalytics = () => {
  const trackEvent = (event: AnalyticsEvent) => {
    sendGTMEvent(event);
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent({
      event_name: 'button_click',
      event_category: 'User Interaction',
      event_label: buttonName,
      custom_parameters: {
        button_location: location
      }
    });
  };

  const trackFormSubmit = (formName: string, success: boolean = true) => {
    trackEvent({
      event_name: success ? 'form_submit_success' : 'form_submit_error',
      event_category: 'Form Interaction',
      event_label: formName
    });
  };

  const trackDownload = (fileName: string, fileType: string) => {
    trackEvent({
      event_name: 'file_download',
      event_category: 'Downloads',
      event_label: fileName,
      custom_parameters: {
        file_type: fileType
      }
    });
  };

  const trackExternalLink = (url: string, linkText: string) => {
    trackEvent({
      event_name: 'external_link_click',
      event_category: 'Outbound Links',
      event_label: linkText,
      custom_parameters: {
        destination_url: url
      }
    });
  };

  const trackProjectView = (projectName: string, source: string) => {
    trackEvent({
      event_name: 'project_view',
      event_category: 'Portfolio Interaction',
      event_label: projectName,
      custom_parameters: {
        view_source: source
      }
    });
  };

  const trackContactAttempt = (contactMethod: string) => {
    trackEvent({
      event_name: 'contact_attempt',
      event_category: 'Lead Generation',
      event_label: contactMethod
    });
  };

  const trackScroll = (scrollDepth: number) => {
    trackEvent({
      event_name: 'scroll_depth',
      event_category: 'User Engagement',
      value: scrollDepth,
      custom_parameters: {
        page_path: window.location.pathname
      }
    });
  };

  const trackTimeOnSite = (timeInSeconds: number) => {
    trackEvent({
      event_name: 'time_on_site',
      event_category: 'User Engagement',
      value: timeInSeconds,
      custom_parameters: {
        page_path: window.location.pathname
      }
    });
  };

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackDownload,
    trackExternalLink,
    trackProjectView,
    trackContactAttempt,
    trackScroll,
    trackTimeOnSite
  };
};

export default Analytics;
