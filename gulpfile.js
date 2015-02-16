var gulp = require('gulp'),
    less = require('gulp-less');
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber');

gulp.task('compile', function(){
  gulp.src('assets/less/*.less')
    .pipe(plumber())
    .pipe( less())
    .pipe( gulp.dest('assets/css'))
    .pipe(livereload());
});
 

//Watch Task
gulp.task('watch',function(){

  gulp.watch('assets/less/*.less',['compile']);
  livereload.listen();
});

  gulp.task('default',['watch']);