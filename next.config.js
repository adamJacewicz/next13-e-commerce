/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [{ hostname: "media.graphassets.com" }, { hostname: "img.clerk.com" }],
		// domains: ["media.graphassets.com", "img.clerk.com"],
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/categories/:slug",
				destination: "/categories/:slug/1",
				permanent: false,
			},
			{
				source: "/collections/:slug",
				destination: "/collections/:slug/1",
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
