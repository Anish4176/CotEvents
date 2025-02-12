/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Other config options
  images:{
    remotePatterns:[
      {
        hostname:'utfs.io'
      }
    ]
  }
};

module.exports = nextConfig;

