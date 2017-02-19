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
            '../public/components/environment.js',
            '../public/app/home/home-controller.js',
            '../public/app/locales/directive.js',
            '../public/app/locales/search-controller.js',
            '../public/app/locales/service.js',
            '../public/app/weather/controller.js',
            '../public/app/weather/directive.js',
            '../public/app/weather/service.js',
            '../public/components/navbar/directive.js',
            './**/*spec.js'],
    preprocessors: {
      '../public/!(bower_components|assets)/**/!(*.mock|*.spec).js': 'coverage'
    },
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage', 'spec'],
    autoWatch: true,
    singleRun: false,
    wiredep: {
      devDependencies: true,
      dependencies: true,
      cwd: '..'
    },
    plugins: [
      'karma-wiredep',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter'
    ],
    coverageReporter: {
      type: 'html',
      dir: '../coverage/',
      subdir: '.'
    }
  })
}
