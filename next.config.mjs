/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://placehold.co/600x400")],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
