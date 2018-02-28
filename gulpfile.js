const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmine = require('gulp-jasmine');
const zip = require('gulp-zip');
const Server = require('karma').Server;
const eslint = require('gulp-eslint');

gulp.task('watch', ()=>
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
);

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('zip', () =>
  gulp.src('app/**')
    .pipe(zip('map.zip'))
    .pipe(gulp.dest('dist'))
);
 
gulp.task('quality', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['app/js/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('build', ['test', 'zip'], function (){
});
