/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "192.168.1.137",
//         port: "",
//       },
//     ],
//   },
//   experimental: {
//     serverActions: {
//       allowedOrigins: ["192.168.1.137"],
//     },
//   },
// };

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "modern-hostels.imaginative-accumulation.com",
        port: "",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["modern-hostels.imaginative-accumulation.com"],
    },
  },
};

export default nextConfig;
