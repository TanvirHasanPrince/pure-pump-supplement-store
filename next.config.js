/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*pure-pump.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "*i.ibb.co",
      },
    ],
  },
};

module.exports = nextConfig;
