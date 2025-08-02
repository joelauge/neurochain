/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for development
  // This will be added back for production builds
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix for GitHub Pages deployment
  // These will be handled by the GitHub Pages configuration
}

module.exports = nextConfig 