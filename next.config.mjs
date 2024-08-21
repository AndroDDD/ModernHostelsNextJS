/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "192.168.1.137",
        port: "",
      },
    ],
  },
};

// const nextConfig = {
//   experimental: {
//     serverActions: {
//       allowedOrigins: ['modern-hostels.imaginative-accumulation.com'],
//     },
//   },
// }

export default nextConfig;
