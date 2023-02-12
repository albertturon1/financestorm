/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  //async redirects() {
  //  return [
  //    {
  //      source: '/',
  //      destination: '/user/:id*', // Matched parameters can be used in the destination
  //      permanent: true,
  //    },
  //  ];
  //},
};

module.exports = nextConfig;
