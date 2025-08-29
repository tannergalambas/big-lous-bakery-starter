/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'items-images-sandbox.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  // ❌ remove experimental.tsconfigPaths
};

module.exports = nextConfig;