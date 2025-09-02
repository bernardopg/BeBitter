import {
  IMAGES,
  ImageKey,
  getImagePath,
  getImageWithFallback,
} from "@/constants/images";
import { cn } from "@/lib/utils";
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image key from the IMAGES constant */
  imageKey?: ImageKey;
  /** Fallback image key or path */
  fallback?: ImageKey | string;
  /** Whether to use lazy loading */
  lazy?: boolean;
  /** Image width for proper sizing */
  width?: number;
  /** Image height for proper sizing */
  height?: number;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
}

/**
 * Reusable Image component with built-in fallback and lazy loading
 */
const Image: React.FC<ImageProps> = ({
  imageKey,
  fallback = "PLACEHOLDER",
  lazy = true,
  className,
  alt = "",
  src,
  width,
  height,
  priority = false,
  ...props
}) => {
  // If imageKey is provided, use it; otherwise use the src prop
  const imageSrc = imageKey
    ? fallback && typeof fallback === "string" && fallback in IMAGES
      ? getImageWithFallback(imageKey, getImagePath(fallback as ImageKey))
      : getImageWithFallback(
          imageKey,
          typeof fallback === "string" ? fallback : IMAGES.PLACEHOLDER
        )
    : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={cn("object-cover", className)}
      loading={priority ? "eager" : lazy ? "lazy" : "eager"}
      width={width}
      height={height}
      decoding="async"
      {...props}
    />
  );
};

export default Image;
