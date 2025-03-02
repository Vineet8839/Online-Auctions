module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          http: false,
          https: false,
          util: false,
          zlib: false,
          stream: false,
          url: false,
          crypto: false,
          assert: false,
        },
      },
    },
  },
}; 