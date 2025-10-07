import { useState, useEffect, useCallback } from 'react';
import { IMAGES } from '@/constants/images';

interface ImageLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

interface UseImageOptimizationOptions {
  preload?: boolean;
  lazy?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export const useImageOptimization = (
  src: string,
  options: UseImageOptimizationOptions = {}
) => {
  const { preload = false, lazy = true, placeholder, onLoad, onError } = options;
  
  const [state, setState] = useState<ImageLoadState>({
    isLoading: true,
    isLoaded: false,
    error: null,
  });

  // Preload da imagem
  const preloadImage = useCallback((imageSrc: string) => {
    const img = new Image();
    
    img.onload = () => {
      setState(prev => ({ ...prev, isLoading: false, isLoaded: true }));
      onLoad?.();
    };
    
    img.onerror = () => {
      const errorMsg = `Falha ao carregar imagem: ${imageSrc}`;
      setState(prev => ({ ...prev, isLoading: false, error: errorMsg }));
      onError?.(errorMsg);
    };
    
    img.src = imageSrc;
  }, [onLoad, onError]);

  // Intersection Observer para lazy loading
  const createIntersectionObserver = useCallback(() => {
    if (!lazy || !('IntersectionObserver' in window)) {
      preloadImage(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadImage(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    return observer;
  }, [lazy, src, preloadImage]);

  useEffect(() => {
    if (preload && !lazy) {
      preloadImage(src);
    }
  }, [preload, lazy, src, preloadImage]);

  // Detecta suporte a formatos modernos
  const getOptimizedImageSrc = useCallback((originalSrc: string): string => {
    // Se não é a imagem de perfil principal, retorna a original
    if (originalSrc !== IMAGES.PROFILE_IMAGE) {
      return originalSrc;
    }

    // Detecta suporte a AVIF
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = 1;
      canvas.height = 1;
      
      try {
        // Tenta detectar suporte a AVIF
        const avifDataUrl = canvas.toDataURL('image/avif');
        if (avifDataUrl.indexOf('data:image/avif') === 0) {
          return IMAGES.PROFILE_IMAGE_AVIF_252;
        }
      } catch (e) {
        // AVIF não suportado
      }

      try {
        // Tenta detectar suporte a WebP
        const webpDataUrl = canvas.toDataURL('image/webp');
        if (webpDataUrl.indexOf('data:image/webp') === 0) {
          return IMAGES.PROFILE_IMAGE_WEBP_252;
        }
      } catch (e) {
        // WebP não suportado
      }
    }

    return originalSrc;
  }, []);

  // Gera srcSet responsivo
  const generateSrcSet = useCallback((imageSrc: string): string => {
    if (imageSrc !== IMAGES.PROFILE_IMAGE) {
      return imageSrc;
    }

    return `
      ${IMAGES.PROFILE_IMAGE_JPEG_252} 252w,
      ${IMAGES.PROFILE_IMAGE_JPEG_512} 512w,
      ${IMAGES.PROFILE_IMAGE_JPEG_1024} 1024w,
      ${IMAGES.PROFILE_IMAGE} 500w
    `.trim().replace(/\s+/g, ' ');
  }, []);

  return {
    ...state,
    optimizedSrc: getOptimizedImageSrc(src),
    srcSet: generateSrcSet(src),
    createIntersectionObserver,
    preloadImage,
  };
};

// Hook para cache de imagens críticas
export const useImageCache = () => {
  const [cacheStatus, setCacheStatus] = useState<Record<string, boolean>>({});

  const cacheImage = useCallback(async (src: string) => {
    if (cacheStatus[src]) return;

    try {
      // Tenta usar Cache API se disponível
      if ('caches' in window) {
        const cache = await caches.open('image-cache-v1');
        const response = await fetch(src);
        
        if (response.ok) {
          await cache.put(src, response);
          setCacheStatus(prev => ({ ...prev, [src]: true }));
        }
      } else {
        // Fallback: preload da imagem
        const img = new Image();
        img.onload = () => {
          setCacheStatus(prev => ({ ...prev, [src]: true }));
        };
        img.src = src;
      }
    } catch (error) {
      console.warn(`Falha ao cachear imagem: ${src}`, error);
    }
  }, [cacheStatus]);

  const cacheProfileImages = useCallback(async () => {
    const profileImages = [
      IMAGES.PROFILE_IMAGE,
      IMAGES.PROFILE_IMAGE_WEBP_252,
      IMAGES.PROFILE_IMAGE_AVIF_252,
      IMAGES.PROFILE_IMAGE_JPEG_252,
      IMAGES.PROFILE_IMAGE_JPEG_512,
      IMAGES.PROFILE_IMAGE_JPEG_1024,
    ];

    await Promise.all(profileImages.map(img => cacheImage(img)));
  }, [cacheImage]);

  const clearImageCache = useCallback(async () => {
    if ('caches' in window) {
      await caches.delete('image-cache-v1');
      setCacheStatus({});
    }
  }, []);

  return {
    cacheStatus,
    cacheImage,
    cacheProfileImages,
    clearImageCache,
  };
};

// Hook para monitoramento de performance de imagens
export const useImagePerformance = () => {
  const [metrics, setMetrics] = useState({
    totalImages: 0,
    loadedImages: 0,
    failedImages: 0,
    averageLoadTime: 0,
  });

  const recordImageLoad = useCallback((loadTime: number, success: boolean) => {
    setMetrics(prev => ({
      totalImages: prev.totalImages + 1,
      loadedImages: success ? prev.loadedImages + 1 : prev.loadedImages,
      failedImages: success ? prev.failedImages : prev.failedImages + 1,
      averageLoadTime: success 
        ? (prev.averageLoadTime * prev.loadedImages + loadTime) / (prev.loadedImages + 1)
        : prev.averageLoadTime,
    }));
  }, []);

  const resetMetrics = useCallback(() => {
    setMetrics({
      totalImages: 0,
      loadedImages: 0,
      failedImages: 0,
      averageLoadTime: 0,
    });
  }, []);

  return {
    metrics,
    recordImageLoad,
    resetMetrics,
  };
};

// Utility para detectar conexão lenta
export const useConnectionAware = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    // @ts-expect-error - navigator.connection é experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      const updateConnection = () => {
        const effectiveType = connection.effectiveType;
        setConnectionType(effectiveType);
        setIsSlowConnection(effectiveType === 'slow-2g' || effectiveType === '2g');
      };

      updateConnection();
      connection.addEventListener('change', updateConnection);

      return () => {
        connection.removeEventListener('change', updateConnection);
      };
    }
  }, []);

  return {
    isSlowConnection,
    connectionType,
  };
};