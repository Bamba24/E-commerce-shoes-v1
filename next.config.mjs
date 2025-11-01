/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // turbo: {}, // désactive Turbopack (option supprimée car false n'est pas valide)
  },
}

export const config = {
  matcher: ["/profil", "/dashboard/:path*"],
   images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;