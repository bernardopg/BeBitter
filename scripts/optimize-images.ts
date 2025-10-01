/**
 * Image optimization script using Sharp
 * Generates optimized WebP and AVIF versions of profile.jpg
 */

import { existsSync, mkdirSync, statSync } from "fs";
import { dirname, join } from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");

// Configuration
const PROFILE_DIR = join(PROJECT_ROOT, "public/images/profile");
const SOURCE_IMAGE = join(PROFILE_DIR, "profile.jpg");

// Image sizes to generate (based on actual usage: 252x252 displayed)
const SIZES = [
  { name: "252", width: 252, height: 252 },
  { name: "512", width: 512, height: 512 },
  { name: "1024", width: 1024, height: 1024 },
];

// Quality settings
const QUALITY = {
  jpeg: 85,
  webp: 85,
  avif: 80,
};

async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function optimizeImage() {
  console.log("🖼️  Starting image optimization...\n");

  // Check if source image exists
  if (!existsSync(SOURCE_IMAGE)) {
    console.error(`❌ Source image not found: ${SOURCE_IMAGE}`);
    process.exit(1);
  }

  // Ensure output directory exists
  if (!existsSync(PROFILE_DIR)) {
    mkdirSync(PROFILE_DIR, { recursive: true });
  }

  const originalSize = await getFileSize(SOURCE_IMAGE);
  console.log(`📦 Original image: ${formatBytes(originalSize)}\n`);

  const results: Array<{
    format: string;
    size: string;
    path: string;
    savings: string;
  }> = [];

  // Generate optimized versions
  for (const size of SIZES) {
    console.log(`📐 Processing ${size.width}x${size.height}...`);

    try {
      const image = sharp(SOURCE_IMAGE);

      // Resize
      image.resize(size.width, size.height, {
        fit: "cover",
        position: "center",
      });

      // Generate JPEG
      const jpegPath = join(PROFILE_DIR, `profile-${size.name}.jpg`);
      await image
        .clone()
        .jpeg({ quality: QUALITY.jpeg, progressive: true })
        .toFile(jpegPath);

      const jpegSize = await getFileSize(jpegPath);
      const jpegSavings = ((1 - jpegSize / originalSize) * 100).toFixed(1);
      results.push({
        format: `JPEG ${size.name}`,
        size: formatBytes(jpegSize),
        path: jpegPath,
        savings: `${jpegSavings}%`,
      });

      // Generate WebP
      const webpPath = join(PROFILE_DIR, `profile-${size.name}.webp`);
      await image
        .clone()
        .webp({ quality: QUALITY.webp, effort: 6 })
        .toFile(webpPath);

      const webpSize = await getFileSize(webpPath);
      const webpSavings = ((1 - webpSize / originalSize) * 100).toFixed(1);
      results.push({
        format: `WebP ${size.name}`,
        size: formatBytes(webpSize),
        path: webpPath,
        savings: `${webpSavings}%`,
      });

      // Generate AVIF
      const avifPath = join(PROFILE_DIR, `profile-${size.name}.avif`);
      await image
        .clone()
        .avif({ quality: QUALITY.avif, effort: 4 })
        .toFile(avifPath);

      const avifSize = await getFileSize(avifPath);
      const avifSavings = ((1 - avifSize / originalSize) * 100).toFixed(1);
      results.push({
        format: `AVIF ${size.name}`,
        size: formatBytes(avifSize),
        path: avifPath,
        savings: `${avifSavings}%`,
      });

      console.log(`  ✓ JPEG: ${formatBytes(jpegSize)}`);
      console.log(`  ✓ WebP: ${formatBytes(webpSize)}`);
      console.log(`  ✓ AVIF: ${formatBytes(avifSize)}\n`);
    } catch (error) {
      console.error(`  ❌ Error processing ${size.name}:`, error);
    }
  }

  console.log("\n✅ Image optimization complete!\n");
  console.log("📊 Summary:");
  console.log("─".repeat(60));
  results.forEach((result) => {
    console.log(
      `${result.format.padEnd(15)} ${result.size.padEnd(12)} (${
        result.savings
      } smaller)`
    );
  });
  console.log("─".repeat(60));

  console.log("\n💡 Recommendation:");
  console.log(
    "   Use AVIF for best compression, WebP as fallback, JPEG for compatibility."
  );
}

// Run the optimization
optimizeImage().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
