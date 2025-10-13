/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static HTML export
  trailingSlash: true, // Forces /admin -> admin/index.html
  images: {
    unoptimized: true, // Needed since Next.js Image Optimization doesn't work in static export
  },
};

export default nextConfig;
