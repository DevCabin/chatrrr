/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-ready configuration
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true
  },
  experimental: {
    // Enable strict mode for metadata
    strictNextHead: true
  },
  // Increase memory limit for API routes
  serverRuntimeConfig: {
    api: {
      bodyParser: {
        sizeLimit: '1mb'
      }
    }
  }
};

module.exports = nextConfig; 