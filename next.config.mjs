/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add basePath if deploying to repo (not username.github.io)
  basePath: process.env.NODE_ENV === 'production' ? '/PRC' : '',
}

module.exports = nextConfig
