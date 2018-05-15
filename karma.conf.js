const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*-test.js'],
    reporters: ['progress'],
    preprocessors: {
      'test/**/*-test.js': ['webpack']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    concurrency: Infinity
  })
}