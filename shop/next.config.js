/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@storefront-ui/react"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
    rewrites: async () => {
        return [
            {
                source: process.env.NEXT_PUBLIC_ASP_NET_PROXY_URL + "/:path*",
                destination: process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL + "/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
