/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pbs.twimg.com", "cdn.pixabay.com", "i.picsum.photos", "picsum.photos", "res.cloudinary.com", "res.cloudinary"],
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
