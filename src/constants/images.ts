/**
 * Image constants for the application
 * Centralized location for all image paths and references
 */

export const IMAGES = {
  // Logos
  BEBITTER_LOGO: "/images/logos/BeBitter.svg",
  BEBITTER_LOGO_ALT: "/images/logos/BeBitter_Alt.svg",

  // Icons and Favicons
  FAVICON: "/favicon.ico",
  FAVICON_16: "/images/icons/favicon-16x16.png",
  FAVICON_32: "/images/icons/favicon-32x32.png",
  APPLE_TOUCH_ICON: "/images/icons/apple-touch-icon.png",
  ANDROID_CHROME_192: "/images/icons/android-chrome-192x192.png",
  ANDROID_CHROME_512: "/images/icons/android-chrome-512x512.png",

  // Profile images
  PROFILE_IMAGE: "/images/profile/profile.jpg",
  PROFILE_IMAGE_WEBP: "/images/profile/profile.webp",
  PROFILE_IMAGE_AVIF: "/images/profile/profile.avif",
  PROFILE_IMAGE_SMALL: "/images/profile/profile-small.jpg",
  PROFILE_IMAGE_MEDIUM: "/images/profile/profile-medium.jpg",
  PROFILE_IMAGE_LARGE: "/images/profile/profile-large.jpg",

  // Other assets
  PLACEHOLDER: "/placeholder.svg",

  // Legacy external images (deprecated)
  GITHUB_AVATAR: "https://avatars.githubusercontent.com/u/69475128?v=4",
} as const;

export type ImageKey = keyof typeof IMAGES;

/**
 * Helper function to get image path by key
 * @param key - The image key
 * @returns The image path
 */
export const getImagePath = (key: ImageKey): string => {
  return IMAGES[key];
};

/**
 * Helper function to get image with fallback
 * @param key - The image key
 * @param fallback - Fallback image path
 * @returns The image path or fallback
 */
export const getImageWithFallback = (
  key: ImageKey,
  fallback: string = IMAGES.PLACEHOLDER
): string => {
  return IMAGES[key] || fallback;
};
