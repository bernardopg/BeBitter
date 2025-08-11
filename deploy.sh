#!/bin/bash

# Build the project
echo "Building the project..."
pnpm build

# Create a deployment package
echo "Creating deployment package..."
cd dist
tar -czf ../bebitter-deployment.tar.gz *
cd ..

echo "Deployment package created: bebitter-deployment.tar.gz"
echo ""
echo "To deploy to your Hostinger domain:"
echo "1. Download the bebitter-deployment.tar.gz file"
echo "2. Log into your Hostinger File Manager"
echo "3. Navigate to your domain's public folder"
echo "4. Upload and extract the tar.gz file"
echo ""
echo "Or use FTP to upload the contents of the 'dist' folder directly."
