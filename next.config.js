/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
			},
			{
				source: "/categories/:slug",
				destination: "/categories/:slug/1",
				permanent: true,
			},
			{
				source: "/collections/:slug",
				destination: "/collections/:slug/1",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
