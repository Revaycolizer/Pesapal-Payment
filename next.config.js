/** @type {import('next').NextConfig} */
const nextConfig = { images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mtonnsxvkvxzdhnzfxwb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/files/**',
      },
    ],
  },}

module.exports = nextConfig
