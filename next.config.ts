import type { NextConfig } from 'next'

const NextConfig = {
	output: 'export',
	basePath: '/love',
	assetPrefix: '/love',
	images: {
		unoptimized: true,
	},
}

export default NextConfig
