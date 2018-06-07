const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: ['whatwg-fetch', './src/index/index.js', './src/index/index.scss'],
    game: ['whatwg-fetch', './src/game/game.js', './src/game/game.scss']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index/index.html',
      title: 'Lets Go - Index',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'game/index.html',
      title: 'Lets Go - Game',
      chunks: ['game']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  }
};