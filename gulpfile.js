const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');

let tsProject = ts.createProject({
  declaration: true,
  noImplicitAny: true,
  target:"ES3",
  //module: 'system',
  //outFile: 'main.js'
});

gulp.task('scripts', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['scripts'], function() {
  gulp.watch('src/**/*.ts', ['scripts']);
});
