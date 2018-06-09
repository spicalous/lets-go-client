const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const webpackConfig = require("./webpack.config.js");

module.exports = merge(webpackConfig, {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    host: "0.0.0.0",
    contentBase: "./dist",
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
});