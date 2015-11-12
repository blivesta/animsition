'use strict';

var browserSync = require('browser-sync');
var browserReload = browserSync.reload;
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
var del = require('del');
var gulp = require('gulp');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var pkg = require('./package.json');
var postcss = require('gulp-postcss');
var cssImport = require('postcss-import');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');

var banner = [
'/*!',
' * <%= pkg.name %> v<%= pkg.version %>',
' * <%= pkg.description %>',
' * <%= pkg.homepage %>',
' * License : <%= pkg.license %>',
' * Author : <%= pkg.author.name %> (<%= pkg.author.url %>)',
' */',
''].join('\n');

var dirs = {
  src:'./src',
  dist:'./dist',
  sandbox:'./sandbox'
};

gulp.task('css', function () {
  var processors = [
    cssImport(),
    autoprefixer({browsers: ['> 1%', 'last 2 versions']}),
  ];
  return gulp
    .src(dirs.src + '/css/' + pkg.name + '.css')
    .pipe(header(banner, {pkg:pkg}))
    .pipe(postcss(processors))
    .pipe(gulp.dest(dirs.dist + '/css'))
    .pipe(cssnano({
      autoprefixer: false,
      reduceIdents: false,
      mergeIdents: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dirs.dist + '/css'));
});


gulp.task('js', function(){
  return gulp
    .src(dirs.src + '/js/' + pkg.name + '.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(header(banner, { pkg:pkg }))
    .pipe(gulp.dest(dirs.dist + '/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(header(banner, { pkg:pkg }))
    .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: '.',
      directory: true
    }
  });
  gulp.watch([dirs.src + '/css/**/*.css'], ['css']);
  gulp.watch([dirs.src + '/js/*.js'], ['js']);
  gulp.watch([
    dirs.dist + '/**/*.min.{css,js}',
    dirs.sandbox + '/*.{css,html}'
  ]).on('change', browserReload);
});

gulp.task('cleanup', function(cb){
  return del([ dirs.dist ],cb);
});

gulp.task('default', ['build'], function(cb) {
  runSequence('serve', cb);
});

gulp.task('build', ['cleanup'], function(cb){
  runSequence('js', 'css', cb);
});
