const path = require('path');
module.exports = {
  entry: {
    bundle: './src/bundle.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ]
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  }
}
