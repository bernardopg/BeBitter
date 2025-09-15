import { useState, useCallback } from 'react';
import { IMAGES } from '@/constants/images';

interface ProfileImageProps {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ProfileImage = ({
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px',
  onLoad,
  onError
}: ProfileImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Fallback para caso a imagem principal falhe
  const fallbackSrc = IMAGES.ANDROID_CHROME_512;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Preload hint for critical images */}
      {priority && !hasError && (
        <>
          <link
            rel="preload"
            as="image"
            href={IMAGES.PROFILE_IMAGE}
            imageSizes={sizes}
          />
        </>
      )}

      {/* Optimized image with fallback */}
      <img
        src={hasError ? fallbackSrc : IMAGES.PROFILE_IMAGE}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        itemProp="image"
        sizes={sizes}
        // Structured data hints
        data-schema-image="person"
        // Performance hints
        data-optimized="true"
        ref={(el) => {
          if (el) el.setAttribute('fetchpriority', priority ? 'high' : 'low');
        }}
      />

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-muted-foreground/10 flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <p className="text-sm">Imagem não disponível</p>
          </div>
        </div>
      )}
    </div>
  );
};
