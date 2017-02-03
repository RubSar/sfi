/**
 * Created by User on 1/30/2017.
 */
var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , less = require('gulp-less')
    , watchLess = require('gulp-watch-less');

var jsFiles = ['*.js', 'src/**/*.js'];
gulp.task('serve', function () {
    var options = {
        script: 'bin/www',
        delayTime: 1,
        env: {
            'PORT': 3001
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
});
gulp.task('default', function () {
    return gulp.src('public/stylesheet/style.less')
        .pipe(watchLess('public/stylesheet/style.less'))
        .pipe(less())
        .pipe(gulp.dest('public/stylesheet'));
});