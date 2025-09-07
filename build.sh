#!/bin/bash

# Build script for MemorizerGame
# Creates a dist directory and copies files needed for web deployment

set -e  # Exit on any error

echo "🚀 Starting build process for MemorizerGame..."

# Create dist directory (remove if exists)
if [ -d "dist" ]; then
  echo "📁 Removing existing dist directory..."
  rm -rf dist
fi

echo "📁 Creating dist directory..."
mkdir -p dist

# Copy essential files for web deployment
echo "📋 Copying files to dist directory..."

# Core web files
cp index.html dist/
cp game.js dist/
cp styles.css dist/

# Copy documentation files (optional but useful)
if [ -f "README.md" ]; then
  cp README.md dist/
fi

if [ -f "LICENSE" ]; then
  cp LICENSE dist/
fi

# Verify files were copied
echo "✅ Verifying copied files..."
ls -la dist/

echo "🎉 Build completed successfully!"
echo "📂 Distribution files are ready in the 'dist' directory"
echo "🌐 You can now deploy the contents of 'dist' to your web server"
