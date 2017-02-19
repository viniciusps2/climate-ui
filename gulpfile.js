'use strict'
const path = require('path')
const gulp = require('gulp')
const connect = require('gulp-connect')
const compression = require('compression')

const jshint = require('gulp-jshint')
const inject = require('gulp-inject')
const wiredep = require('wiredep').stream
const preprocess = require('gulp-preprocess')

const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const minifycss = require('gulp-minify-css')
const sourcemaps = require('gulp-sourcemaps')
// const clean = require('gulp-clean')

const getFullPath = (file) => path.join(__dirname, file)

const GULP_FILE = 'gulpfile.js'

const SOURCES_JS = [
  getFullPath('public/**/*.js'),
  '!' + getFullPath('public/bower_components/**/*.js'),
  '!' + getFullPath('public/_dist/*.js')
]

const SOURCES_JS_DIST = [
  getFullPath('public/_dist/**/*.min.js'),
  '!' + getFullPath('public/bower_components/**/*.js')
]

const SOURCES_HTML = [
  getFullPath('public/**/*.html')
]

const SOURCES_CSS = [
  getFullPath('public/**/*.css'),
  '!' + getFullPath('public/bower_components/**/*.css'),
  '!' + getFullPath('public/_dist/*.css')
]

const SOURCES_CSS_DIST = [
  getFullPath('public/_dist/**/*.min.css'),
  '!' + getFullPath('public/bower_components/**/*.css')
]

const SOURCES_SPEC = [
  getFullPath('tests/**/*.js')
]

const DIST_JS = getFullPath('public/_dist')
const DIST_CSS = getFullPath('public/_dist')
let IS_DIST = false

const KARMA_CONF_FILE = getFullPath('tests/karma.conf.js')
const SPEC_DIRECTORY = getFullPath('tests/')
const SPEC_FILES = "'./**/*spec.js'"

gulp.task('serve', ['jshint', 'inject'], () => {
  const browserSync = require('browser-sync').create()
  browserSync.init({
    open: false,
    notify: false,
    port: process.env.PORT || 3000,
    server: {
      baseDir: './public'
    }
  })
  gulp.watch(SOURCES_CSS).on('change', () => {
    gulp.start('inject')
    browserSync.reload()
  })
  gulp.watch(SOURCES_JS).on('change', () => {
    gulp.start('jshint', 'inject')
    browserSync.reload()
  })
  gulp.watch(SOURCES_HTML).on('change', browserSync.reload)
})

gulp.task('serve-prod', ['build'], () => {
  connect.server({
    root: 'dist',
    port: process.env.PORT || 3000,
    livereload: false,
    middleware: function () {
      return [
        compression()
      ]
    }
  })
})

gulp.task('serveMin', ['isDist', 'serve'])

// jshint
gulp.task('jshint', () => {
  const JSHINT_JS = SOURCES_JS.concat(SOURCES_SPEC)

  return gulp.src(JSHINT_JS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

// Inject
gulp.task('inject', ['minify'], () => {
  let options = {
    read: false,
    ignorePath: ['public'],
    addRootSlash: false
  }

  let wiredepOptions = {
    directory: getFullPath('public/bower_components'),
    exclude: getFullPath('public/bower_components/angular-mocks/angular-mocks.js')
  }

  let sourceJs = SOURCES_JS
  let sourceCss = SOURCES_CSS

  if (IS_DIST) {
    sourceJs = SOURCES_JS_DIST
    sourceCss = SOURCES_CSS_DIST
  }

  return gulp.src(getFullPath('public/index.html'))
    .pipe(inject(gulp.src(sourceJs), options))
    .pipe(inject(gulp.src(sourceCss), options))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(getFullPath('public')))
})

// Karma
gulp.task('inject-karma', () => {
  // Inject all SOURCEJS files
  function injectAppJsFiles (filepath, i, length) {
    return "'.." + filepath + "'" + (i + 1 < length ? ',\n            ' : '')
  }

  // Inject SPEC files
  function injectSpecFiles (i, length, extracted) {
    if (i + 1 === length) {
      extracted = extracted + ',\n            ' + SPEC_FILES
    }
    return extracted
  }

  gulp.src(KARMA_CONF_FILE)
    .pipe(inject(gulp.src(SOURCES_JS, {read: false}), {
      starttag: 'files: [',
      endtag: ']',
      transform: function (filepath, file, i, length) {
        const extracted = injectAppJsFiles(filepath, i, length)
        return injectSpecFiles(i, length, extracted)
      }
    })).pipe(gulp.dest(SPEC_DIRECTORY))
})

gulp.task('test', ['inject-karma'], function (done) {
  // Tests
  const argv = require('yargs').argv
  const Server = require('karma').Server
  let singleRun = true
  let browsers = ['PhantomJS']

  if (argv.d) { // argument to debug
    singleRun = false
    browsers = ['Chrome']
  } else if (argv.w) { // watch
    singleRun = false
  }

  new Server({
    browsers: browsers,
    configFile: KARMA_CONF_FILE,
    singleRun: singleRun
  }, function (karmaExitStatus) {
    if (karmaExitStatus) process.exit(1)
    done()
  }).start()
})

// Minify
gulp.task('minify', ['minify-js', 'minify-css'])

gulp.task('minify-js', () => {
  return gulp.src(SOURCES_JS)
    .pipe(concat('all.js'))
    .pipe(preprocess())
    .pipe(gulp.dest(DIST_JS))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DIST_JS))
})

gulp.task('minify-css', () => {
  return gulp.src(SOURCES_CSS)
    .pipe(concat('all.css'))
    .pipe(gulp.dest(DIST_CSS))
    .pipe(rename('all.min.css'))
    .pipe(sourcemaps.init())
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_CSS))
})

gulp.task('build', ['isDist', 'jshint', 'minify', 'inject'], () => {
  const source = ['public/**/*.*']
  return gulp.src(source)
    .pipe(gulp.dest('dist'))
})

gulp.task('isDist', () => {
  IS_DIST = true
})
