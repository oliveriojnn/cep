var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var uglifyjs    = require('gulp-uglify');
var uglifycss   = require('gulp-uglifycss');
var rename      = require('gulp-rename');
var imagemin	= require('gulp-smushit');
var rm		= require('gulp-rm');
var htmlmin	= require('gulp-htmlmin');
var runSequence = require('run-sequence');

gulp.task('server', function() {

	browserSync.init({
		server: 'src/',
		notify: false
	});

	gulp.watch('src/assets/sass/**/*.scss', ['sass']);
	gulp.watch('src/assets/js/**/*.js', browserSync.reload);
	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('server2', function() {

        browserSync.init({
                server: 'dist/',
                notify: false
        });
});

gulp.task('clean', function(){
	return gulp.src('dist/**/*', { read:false })
	.pipe(rm())
});

gulp.task('copy', function() {
	return gulp.src('src/**/*')
	.pipe(gulp.dest('dist/'))
});

gulp.task('imagemin', function() {
	return gulp.src('dist/assets/images/**/*.{jpg,jpeg,png,svg}')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/assets/images/'))
});

gulp.task('htmlmin', function() {
	return gulp.src('dist/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist/'))
});

gulp.task('js', function() {
	return gulp.src('dist/assets/js/**/*.js')
	.pipe(uglifyjs())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('sass', function() {
	return gulp.src('src/assets/sass/style.scss')
	.pipe(sass())
	.pipe(uglifycss())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('src/assets/css/'))
	.pipe(browserSync.stream())
});

gulp.task('default', ['server'])
gulp.task('builder', ['imagemin','htmlmin','js'])

gulp.task('build', (callback) => {
	//['clean', 'copy', 'builder']
	runSequence('clean',
              'copy',
              'builder',
              callback);
})