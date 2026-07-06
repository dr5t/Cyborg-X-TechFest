import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Three.js module transpilation
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
  
  // Turbopack config (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
