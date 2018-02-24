const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmine = require('gulp-jasmine');
const zip = require('gulp-zip');
const Server = require('karma').Server;

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

gulp.task('build', ['test', 'zip'], function (){
});
