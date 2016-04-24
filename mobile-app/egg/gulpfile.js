var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var watch = require('gulp-watch');

var paths = {
  sass: ['./scss/**/*.scss', './www/scss/*.scss']
};

gulp.task('default', ['injector', 'sass']);

gulp.task('injector', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(inject(gulp.src('./www/scss/*.scss', {read: false}), {relative: true, starttag: '/*inject:scss*/', endtag: '/*endinject*/'}))
    .pipe(gulp.dest('./scss/'));
});

gulp.task('imgcache', function (done) {
  gulp.src('./www/index.html')
    .pipe(inject(gulp.src('./www/img/**/*.*', {read: false}), {relative: true, starttag: '<!-- inject:img -->', endtag: '<!-- endinject -->'}))
    .pipe(gulp.dest('./www/'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['injector', 'sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
