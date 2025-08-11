# Images Directory Structure

This directory contains all static images used in the BeBitter application, organized for easy maintenance and scalability.

## Directory Structure

```text
public/images/
├── icons/           # Favicon and app icons
│   ├── android-chrome-192x192.png  # Android app icon (192x192)
│   ├── android-chrome-512x512.png  # Android app icon (512x512)
│   ├── apple-touch-icon.png        # iOS app icon (180x180)
│   ├── favicon-16x16.png           # Browser favicon (16x16)
│   └── favicon-32x32.png           # Browser favicon (32x32)
└── logos/           # Brand and logo images
    ├── bebitter-logo.png           # Main BeBitter logo
    └── bebitter-logo-alt.png       # Alternative BeBitter logo
```

## Image Usage

### Icons and Favicons

- **favicon.ico**: Located in `/public/favicon.ico` - Main browser favicon
- **favicon-16x16.png**: Small favicon for browser tabs
- **favicon-32x32.png**: Medium favicon for browser tabs
- **apple-touch-icon.png**: iOS Safari bookmark icon
- **android-chrome-*.png**: Progressive Web App icons

### Brand Assets

- **bebitter-logo.png**: Primary logo for the BeBitter brand
- **bebitter-logo-alt.png**: Alternative version of the logo

### External Images

- **GitHub Avatar**: Loaded from GitHub API (`https://avatars.githubusercontent.com/u/69475128?v=4`)

## Implementation

### Using the Image Constants

```typescript
import { IMAGES } from '@/constants/images';
import Image from '@/components/ui/image';

// Using the Image component with constants
<Image
  src={IMAGES.BEBITTER_LOGO}
  alt="BeBitter Logo"
  className="w-32 h-16"
/>

// Using with fallback
<Image
  imageKey="BEBITTER_LOGO"
  fallback="PLACEHOLDER"
  alt="BeBitter Logo"
/>
```

### Direct Path Usage

```typescript
// For direct HTML/CSS usage
<img src="/images/logos/bebitter-logo.png" alt="BeBitter Logo" />
```

## File Naming Conventions

- Use kebab-case for all filenames
- Include dimensions in the filename when relevant (e.g., `favicon-16x16.png`)
- Use descriptive names that indicate the purpose
- Group related images in appropriate subdirectories

## Optimization Guidelines

- All images should be optimized for web use
- Use appropriate formats (PNG for logos with transparency, JPG for photos)
- Consider WebP format for better compression when browser support allows
- Implement lazy loading for non-critical images

## Maintenance

1. When adding new images, place them in the appropriate subdirectory
2. Update the `IMAGES` constant in `/src/constants/images.ts`
3. Ensure proper alt text is provided for accessibility
4. Test images on different devices and screen densities

## References

- **site.webmanifest**: References icons for PWA functionality
- **index.html**: Contains favicon and meta tag references
- **Image Component**: `/src/components/ui/image.tsx` for reusable image handling
- **Image Constants**: `/src/constants/images.ts` for centralized path management
