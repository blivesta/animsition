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
  dist:'./dist'
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

gulp.task('cleanup', function(cb){
  return del([ './dist' ],cb);
});

gulp.task('default',['build'], function(){
  gulp.watch(['./src/css/**/*.css'], ['css']);
  gulp.watch(['./src/js/*.js'], ['js']);
});

gulp.task('build', ['cleanup'], function(cb){
  runSequence(
    [
      'js',
      'css'
    ],
    cb
  );
});
