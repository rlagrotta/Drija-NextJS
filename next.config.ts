import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/servicio-tecnico",
        destination: "/soporte/servicio-tecnico",
        permanent: true,
      },
      {
        source: "/en/servicio-tecnico",
        destination: "/en/soporte/servicio-tecnico",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
