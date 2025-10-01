import { IMAGES } from "@/constants/images";
import { useCallback, useState } from "react";

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
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 252px, (max-width: 1024px) 512px, 252px",
  onLoad,
  onError,
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
            href={IMAGES.PROFILE_IMAGE_AVIF_252}
            type="image/avif"
            imageSizes={sizes}
          />
          <link
            rel="preload"
            as="image"
            href={IMAGES.PROFILE_IMAGE_WEBP_252}
            type="image/webp"
            imageSizes={sizes}
          />
        </>
      )}

      {/* Optimized picture element with modern formats and responsive images */}
      <picture>
        {/* AVIF format - best compression */}
        <source
          type="image/avif"
          srcSet={`
            ${IMAGES.PROFILE_IMAGE_AVIF_252} 252w,
            ${IMAGES.PROFILE_IMAGE_AVIF_512} 512w,
            ${IMAGES.PROFILE_IMAGE_AVIF_1024} 1024w
          `}
          sizes={sizes}
        />

        {/* WebP format - good compression with wide support */}
        <source
          type="image/webp"
          srcSet={`
            ${IMAGES.PROFILE_IMAGE_WEBP_252} 252w,
            ${IMAGES.PROFILE_IMAGE_WEBP_512} 512w,
            ${IMAGES.PROFILE_IMAGE_WEBP_1024} 1024w
          `}
          sizes={sizes}
        />

        {/* JPEG format - fallback for compatibility */}
        <source
          type="image/jpeg"
          srcSet={`
            ${IMAGES.PROFILE_IMAGE_JPEG_252} 252w,
            ${IMAGES.PROFILE_IMAGE_JPEG_512} 512w,
            ${IMAGES.PROFILE_IMAGE_JPEG_1024} 1024w
          `}
          sizes={sizes}
        />

        {/* Fallback img element */}
        <img
          src={hasError ? fallbackSrc : IMAGES.PROFILE_IMAGE_JPEG_252}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          itemProp="image"
          width={252}
          height={252}
          // Structured data hints
          data-schema-image="person"
          // Performance hints
          data-optimized="true"
          {...(priority && { fetchpriority: "high" })}
        />
      </picture>

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
