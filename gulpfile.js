var
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnext = require('gulp-cssnext'),
  cssnano = require('gulp-cssnano'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat')
;

gulp.task('css-main', function () {
  return gulp.src('css/main.css')
    .pipe(cssnext())
    .pipe(autoprefixer({ cascade: false, browsers: 'last 3 versions' }))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('_includes'))
  ;
});

gulp.task('build-css', ['css-main'], function () {
  return gulp.src('_includes/main.min.css')
    .pipe(cssnano())
    .pipe(gulp.dest('_includes'))
  ;
});

gulp.task('build', ['build-css']);

gulp.task('watch', function() {
  gulp.watch('css/*.css', ['css-main']);
});

gulp.task('default', ['css-main']);
