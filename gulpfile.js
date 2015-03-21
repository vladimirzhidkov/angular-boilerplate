var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var livereload = require('gulp-livereload');

// tasks
gulp.task('lint', function() {
    gulp.src(['app/**/*.js', '!app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function(cb) {
    del(['dist/*', 'app/bundled.js'], cb);
});
gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['app/**/*.css', '!app/`bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('dist'));
});
gulp.task('minify-js', function() {
    gulp.src(['bundled.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});
gulp.task('browserify', function() {
    gulp.src(['app/main.js'])
        .pipe(browserify({ insertGlobals: true, debug: true }))
        .pipe(concat('bundled.js'))
        .pipe(gulp.dest('app'))
});
gulp.task('browserifyDist', function() {
    gulp.src(['app/main.js'])
        .pipe(browserify({ insertGlobals: true, debug: true }))
        .pipe(concat('bundled.js'))
        .pipe(gulp.dest('dist'))
});
gulp.task('copy-bower-components', function () {
    gulp.src('app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function () {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
});
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        port: 8888
    });
});

gulp.task('connectDist', function () {
    connect.server({
        root: 'dist',
        port: 9999
    });
});
gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['lint', 'browserify']);
    livereload.listen();
    gulp.watch(['app/bundled.js']).on('change', livereload.changed);
});


gulp.task('default', ['clean'], function() {
    gulp.start('lint', 'browserify', 'connect');
});
gulp.task('build', ['clean'], function() {
    gulp.start('lint', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-bower-components', 'connectDist');
});