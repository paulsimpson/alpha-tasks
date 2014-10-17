var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserify = require('browserify'),
  watchify = require('watchify'),
  remapify = require('remapify'),
  source = require('vinyl-source-stream'),
  path = require('path'),
  buffer = require('vinyl-buffer'),
  _ = require('lodash');

gulp.task('styles', function () {
  return gulp.src('./frontend/main.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./public/dist'));
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify('./frontend/main.js', _.extend({ debug: true }, watchify.args)));

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
    .pipe(gulp.dest('./public/dist'));
}

gulp.task('scripts', function () {
  return bundle();
});

gulp.task('build', [
  'styles'
]);

gulp.task('watch', ['build'], function () {
  getBundler().on('update', function () {
    gulp.start('scripts');
  });

  gulp.watch('./frontend/main.less', ['styles']);
});

gulp.task('default', ['watch']);