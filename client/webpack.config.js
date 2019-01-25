const path = require('path');
const webpack = require('webpack');
module.exports = (env) => {
  return {
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
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(env.API_URL) })
    ]
  }
}
