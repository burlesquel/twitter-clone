/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pbs.twimg.com"],
  },
  async redirects() {
    return(
      [{
        source:"/",
        destination:"/home",
        permanent:true
      }]
    )
  }
}

module.exports = nextConfig
