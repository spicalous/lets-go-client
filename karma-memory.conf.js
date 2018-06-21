const webpackConfig = require("./webpack.config.js");

module.exports = function(config) {
  config.set({
    browsers: ["ChromePerformance"],
    customLaunchers: {
      ChromePerformance: {
        base: "ChromeHeadless",
        flags: ["--enable-precise-memory-info", "--js-flags=\"expose-gc\""]
      }
    },
    frameworks: ["mocha", "chai"],
    files: ["test/memory/**/*-test.js"],
    reporters: ["progress"],
    preprocessors: {
      "test/memory/**/*-test.js": ["webpack"]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    concurrency: Infinity,
    browserNoActivityTimeout: 60000
  })
}