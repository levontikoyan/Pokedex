var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sassfiles = './src/**/*.scss';

gulp.task('sass', function () {
  gulp.src([sassfiles, './style/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-scss', function () {
  gulp.watch(['./style/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'watch-scss']);
