import { IMAGES } from "@/constants/images";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/**
 * Sizes padrão do avatar do hero (containers w-56/64/80/96).
 * Precisa bater com o `sizes` passado pelo HeroSection para o browser
 * selecionar o mesmo candidato do srcset que o preload/imagem real.
 */
export const PROFILE_IMAGE_SIZES =
  "(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px";

interface ProfileImageProps {
  alt: string;
  className?: string;
  /** Above-the-fold: renderiza visível sem depender de JS (LCP/correto sem hidratação). */
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// useLayoutEffect evita flash do placeholder em imagem vinda de cache,
// mas não existe no servidor (prerender).
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const ProfileImage = ({
  alt,
  className = "",
  priority = false,
  sizes = PROFILE_IMAGE_SIZES,
  onLoad,
  onError,
}: ProfileImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
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

  // Imagem já completa no mount (cache HTTP/SW, bfcache, restauração):
  // o evento `load` não re-dispara — sem isto, a foto ficaria invisível
  // para sempre (opacity-0) em visitas repetidas.
  useIsoLayoutEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  // Nota: nenhum <link rel="preload"> aqui. A imagem prioritária já está
  // no HTML pré-renderizado com fetchpriority="high" — o melhor ponto de
  // descoberta. Preload duplicado via React causava download triplo
  // (252.avif + 252.webp + arquivo real) e era descartado pelo cache.

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* AVIF — melhor compressão */}
      <picture>
        <source
          type="image/avif"
          srcSet={`
            ${IMAGES.PROFILE_IMAGE_AVIF_252} 252w,
            ${IMAGES.PROFILE_IMAGE_AVIF_512} 512w,
            ${IMAGES.PROFILE_IMAGE_AVIF_1024} 1024w
          `}
          sizes={sizes}
        />

        {/* WebP — compressão boa, suporte amplo */}
        <source
          type="image/webp"
          srcSet={`
            ${IMAGES.PROFILE_IMAGE_WEBP_252} 252w,
            ${IMAGES.PROFILE_IMAGE_WEBP_512} 512w,
            ${IMAGES.PROFILE_IMAGE_WEBP_1024} 1024w
          `}
          sizes={sizes}
        />

        {/* JPEG — compatibilidade */}
        <source
          type="image/jpeg"
          srcSet={`
            ${IMAGES.PROFILE_IMAGE_JPEG_252} 252w,
            ${IMAGES.PROFILE_IMAGE_JPEG_512} 512w,
            ${IMAGES.PROFILE_IMAGE_JPEG_1024} 1024w
          `}
          sizes={sizes}
        />

        {/* Fallback para browsers sem <picture>/<source> */}
        <img
          ref={imgRef}
          src={IMAGES.PROFILE_IMAGE_JPEG_252}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            // Prioridade (above-the-fold): visível desde o primeiro paint —
            // nunca escondida por opacity-0, com ou sem JS.
            // Demais: fade-in quando carregar (com resgate p/ cache via ref).
            priority || isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          itemProp="image"
          width={252}
          height={252}
          {...(priority && { fetchPriority: "high" as const })}
        />
      </picture>

      {/* Placeholder de carregamento — só para imagens below-the-fold */}
      {!priority && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Estado de erro */}
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
                aria-hidden="true"
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
