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
  return gulp.src('./frontend/main.scss')
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.autoprefixer())
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('icons', function () { 
  return gulp.src('./bower_components/components-font-awesome/fonts/**.*') 
    .pipe(gulp.dest('./public/fonts')); 
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify('./frontend/main.js', _.extend({ debug: true }, watchify.args)))

    .plugin(remapify, [
      {
        src: '**/*.js',
        expose: 'src',
        cwd: path.join(__dirname, 'src')
      }
    ])
    .transform('jstify', { engine: 'lodash' });
  }
  return bundler;
}


function bundle() {
  return getBundler()
    .bundle()
    .on('error', $.util.log)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/dist'));
}

gulp.task('scripts', bundle);

gulp.task('build', [
  'icons',
  'styles',
  'scripts'
]);

gulp.task('watch', ['build'], function () {

  getBundler().on('update', function () {
    gulp.start('scripts');
  });

  gulp.watch('./frontend/**/*.scss', ['styles']);
  gulp.watch('./frontend/**/*.html', ['scripts']);
});

gulp.task('default', ['watch']);
