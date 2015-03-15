var gulp = require('gulp');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');

// tasks
gulp.task('lint', function() {
    gulp.src(['app/**/*.js', '!app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('dist/*')
        .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['app/**/*.css', '!app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('dist'));
});
gulp.task('concat-js', function(){
    gulp.src(['app/**/*.js', '!app/bower_components/**'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app'));
});
gulp.task('minify-js', function() {
    gulp.src(['app/**/*.js', '!app/bower_components/**'])
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
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

gulp.task('default', ['lint', 'concat-js', 'connect']);
gulp.task('build', ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist']);