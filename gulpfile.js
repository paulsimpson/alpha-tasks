var gulp = require('gulp'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  remapify = require('remapify'),
  source = require('vinyl-source-stream'),
  path = require('path'),
  buffer = require('vinyl-buffer'),
  _ = require('lodash');

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify('./src/main.js', _.extend({ debug: true }, watchify.args)));

    bundler.plugin(remapify, [
      {
        src: '**/*.js',
        expose: 'src',
        cwd: path.join(__dirname, 'src')
      }
    ]);
  }
  return bundler;
}

function bundle() {
  return getBundler().bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'));
}

gulp.task('scripts', function () {
  return bundle();
});

gulp.task('watch', function () {
  getBundler().on('update', function () {
    gulp.start('scripts');
  });
});

gulp.task('default', ['watch']);