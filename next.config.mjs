/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "unsplash.com",
			},
		],
	},
	// Ajuste do Webpack para Pino funcionar no App Router
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.externals = [...(config.externals || []), "pino-pretty", "thread-stream"];
		}
		return config;
	},

	experimental: {
		serverComponentsExternalPackages: ["pino", "pino-pretty"],
	},
};

export default nextConfig;
