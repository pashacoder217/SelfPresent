// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        // port: '',
        // pathname: '/account123/**'
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // port: '',
        // pathname: '/**'
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
  },
};

module.exports = nextConfig;
