var rootPath = __dirname + '/'

module.exports = function (config) {
  config.set({
    basePath: '',
    port: 9876,
    frameworks: ['wiredep', 'jasmine'],
    colors: true,
    logLevel: config.LOG_INFO,
    files: ['../public/app.js',
      '../public/routes.js',
      './**/*spec.js'],
    browsers: ['PhantomJS'],
    reporters: ['spec'],
    autoWatch: true,
    singleRun: false,
    wiredep: {
      dependencies: true,
      cwd: '..'
    },
    plugins: ['karma-wiredep', 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter']
  })
}
