import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images:{
    remotePatterns:[{
      protocol: 'https',
      hostname:'img.freepik.com'
    },{
      protocol: 'https',
      hostname:'cloud.appwrite.io'
    },
    
      {
        protocol: 'https',
        hostname:'www.google.com'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100MB'
    }
  }
};

export default nextConfig;
