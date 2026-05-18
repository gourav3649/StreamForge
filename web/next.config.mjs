/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow large video file uploads (default limit is 4MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "500mb",
    },
  },
  images: {
    domains: ["img.clerk.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
