import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only. Keeping the export setting here
  // makes that constraint explicit from the start of the prototype.
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
