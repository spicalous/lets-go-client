const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
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
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
      }
    ]
  }
};