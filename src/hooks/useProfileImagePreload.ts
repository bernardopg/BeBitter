import { useCallback } from 'react';
import { IMAGES } from '@/constants/images';

// Hook para preload de imagens críticas
export const useProfileImagePreload = () => {
  const preloadProfileImage = useCallback(() => {
    const existingPreload = document.querySelector(
      `link[href="${IMAGES.PROFILE_IMAGE}"][rel="preload"]`
    );
    if (existingPreload) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = IMAGES.PROFILE_IMAGE;
    link.setAttribute(
      'imageSizes',
      '(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px'
    );
    document.head.appendChild(link);
  }, []);

  return { preloadProfileImage };
};
