var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minify = require('gulp-cssnano');
var maps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('watch', ['sass'], function() {

    browserSync.init({
        server: '.'
    });

    gulp.watch('./scss/**/*.scss', ['sass'], browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/*.js', browserSync.reload);

});

gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./css'))
    .pipe(minify({
        zindex: false
    }))
    .pipe(maps.write('./'))
    .pipe(rename(function(path) {
        if(path.extname === '.css') {
            path.basename += '.min';
        }
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['watch']);