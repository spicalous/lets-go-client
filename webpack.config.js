const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "index": ["whatwg-fetch", "./pages/index/index.js", "./pages/index/index.scss"],
    "game/game": ["whatwg-fetch", "./pages/game/game.js", "./pages/game/game.scss"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "pages/index/index.html",
      title: "Lets Go",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "game/index.html",
      title: "Lets Go - Game",
      chunks: ["game/game"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
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