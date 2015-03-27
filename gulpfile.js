var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');

gulp.task('less', function() {
	return gulp.src('css/adm-in-2.less')
		.pipe(less({compress: true}))
		.pipe(concat('adm-in-2.min.css'))
		.pipe(gulp.dest('css/'));
});

gulp.task('js', function() {
	return gulp.src(['js/adm-in-2.js', 'js/adm-in-2_*.js'])
		.pipe(concat('adm-in-2.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/'));
});

gulp.task('watch', function() {
	gulp.watch('css/*.less', ['less']);
	gulp.watch(['js/adm-in-2.js', 'js/adm-in-2_*.js'], ['js']);
});

gulp.task('default', ['watch']);