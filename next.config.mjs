/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add basePath if deploying to repo (not username.github.io)
  basePath: process.env.NODE_ENV === 'production' ? '/PRC' : '',
}

export default nextConfig
