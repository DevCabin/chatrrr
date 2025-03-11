/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-ready configuration
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true
  },
  experimental: {
    strictNextHead: true
  }
};

module.exports = nextConfig; 