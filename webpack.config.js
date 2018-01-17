const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'lets-go.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new ExtractTextPlugin("lets-go.css"),
    new HtmlWebpackPlugin({
      title: 'Lets Go'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  }
};