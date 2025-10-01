#!/bin/bash

# Image Optimization Script
# Generates optimized versions of profile.jpg in multiple formats and sizes

set -e

SOURCE_DIR="public/images/profile"
SOURCE_FILE="$SOURCE_DIR/profile.jpg"

echo "🖼️  Optimizing profile images..."

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Check if cwebp is installed for WebP conversion
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp not found. Installing webp tools..."
    sudo apt-get install -y webp
fi

# Check if avif tools are available
if ! command -v avifenc &> /dev/null; then
    echo "⚠️  avifenc not found. AVIF conversion will be skipped."
    echo "   To install: sudo apt-get install libavif-bin"
    SKIP_AVIF=true
else
    SKIP_AVIF=false
fi

echo "📐 Generating optimized sizes..."

# Generate different sizes with high quality
convert "$SOURCE_FILE" -strip -quality 85 -resize 252x252 "$SOURCE_DIR/profile-252.jpg"
convert "$SOURCE_FILE" -strip -quality 85 -resize 512x512 "$SOURCE_DIR/profile-512.jpg"
convert "$SOURCE_FILE" -strip -quality 85 -resize 1024x1024 "$SOURCE_DIR/profile-1024.jpg"

echo "🌐 Converting to WebP format..."

# Convert to WebP with high quality
cwebp -q 85 -resize 252 252 "$SOURCE_FILE" -o "$SOURCE_DIR/profile-252.webp"
cwebp -q 85 -resize 512 512 "$SOURCE_FILE" -o "$SOURCE_DIR/profile-512.webp"
cwebp -q 85 -resize 1024 1024 "$SOURCE_FILE" -o "$SOURCE_DIR/profile-1024.webp"

if [ "$SKIP_AVIF" = false ]; then
    echo "🚀 Converting to AVIF format..."

    # Convert to AVIF with high quality (more efficient than WebP)
    convert "$SOURCE_FILE" -resize 252x252 - | avifenc --min 0 --max 63 -a end-usage=q -a cq-level=18 -a tune=ssim - "$SOURCE_DIR/profile-252.avif"
    convert "$SOURCE_FILE" -resize 512x512 - | avifenc --min 0 --max 63 -a end-usage=q -a cq-level=18 -a tune=ssim - "$SOURCE_DIR/profile-512.avif"
    convert "$SOURCE_FILE" -resize 1024x1024 - | avifenc --min 0 --max 63 -a end-usage=q -a cq-level=18 -a tune=ssim - "$SOURCE_DIR/profile-1024.avif"
fi

echo "📊 Image sizes:"
ls -lh "$SOURCE_DIR" | grep -E "profile-|profile\.jpg"

echo "✅ Image optimization complete!"
echo ""
echo "📦 Generated files:"
echo "  - JPG: 252x252, 512x512, 1024x1024"
echo "  - WebP: 252x252, 512x512, 1024x1024"
if [ "$SKIP_AVIF" = false ]; then
    echo "  - AVIF: 252x252, 512x512, 1024x1024"
fi
