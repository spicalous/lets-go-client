const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = require('./webpack.config.js');

module.exports = merge(webpackConfig, {
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
});