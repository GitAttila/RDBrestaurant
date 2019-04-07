var gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps= require("gulp-sourcemaps"),
	sass = require("gulp-sass"),
	cleanCSS = require("gulp-clean-css"),
	concat = require("gulp-concat");

gulp.task('styles',['css-styles'], function(){
	return gulp.src('./website/assets/scss/sitestyles.scss')
		.on('error',function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed'  //compressed
			}).on('error', sass.logError)
		)
        .pipe(autoprefixer({
            grid: true
        }))
        .pipe(sourcemaps.write())
		.pipe(gulp.dest('./website/temp/styles'));
});

gulp.task('css-styles', function(){
	return gulp.src('./website/assets/css/vendors/*.css')
		.on('error',function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(cleanCSS())
		.pipe(concat('vendors.css'))
		.pipe(gulp.dest('./website/temp/styles'));
});