const path = require('path');

module.exports = {
  // Other webpack config
  resolve: {
    fallback: {
      "http": false,
      "https": false,
      "util": false,
      "zlib": false,
      "stream": false,
      "url": false,
      "crypto": false,
      "assert": false,
    },
  },
}; 