/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mp3/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
            publicPath: '/_next/static',
            outputPath: 'static',
            emitFile: !options.isServer,
          },
        },
      ],
    })

    return config
  },
}

module.exports = nextConfig
