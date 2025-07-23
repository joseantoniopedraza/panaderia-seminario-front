import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    // Optimizaciones para Docker
    optimizePackageImports: ['lucide-react'],
  },
  // Configuración para producción
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
