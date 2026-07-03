import { useCallback } from 'react';
import { IMAGES } from '@/constants/images';

// Hook para preload de imagens críticas
export const useProfileImagePreload = () => {
  const preloadProfileImage = useCallback(() => {
    const existingPreload = document.querySelector(
      `link[href="${IMAGES.PROFILE_IMAGE_AVIF_512}"][rel="preload"]`
    );
    if (existingPreload) return;

    // Preload responsivo em AVIF — o mesmo formato/tamanho que o <picture>
    // do ProfileImage vai selecionar, evitando download duplicado.
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = IMAGES.PROFILE_IMAGE_AVIF_512;
    link.setAttribute('type', 'image/avif');
    link.setAttribute(
      'imagesrcset',
      `${IMAGES.PROFILE_IMAGE_AVIF_252} 252w, ${IMAGES.PROFILE_IMAGE_AVIF_512} 512w, ${IMAGES.PROFILE_IMAGE_AVIF_1024} 1024w`
    );
    link.setAttribute(
      'imagesizes',
      '(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px'
    );
    document.head.appendChild(link);
  }, []);

  return { preloadProfileImage };
};
