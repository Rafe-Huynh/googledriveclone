import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  }
};

export default nextConfig;
