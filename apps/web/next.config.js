/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['r2-us-west.photoai.com'], // Add this line for simpler configuration
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2-us-west.photoai.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
