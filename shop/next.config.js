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
                source: "/asp-net/api/:path*",
                destination: process.env.ASP_NET_SERVER_URL + "/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
