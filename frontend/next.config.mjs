/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backend_url: "http://localhost:8000"
    },
    transpilePackages: ['lucide-react']
};

export default nextConfig;
