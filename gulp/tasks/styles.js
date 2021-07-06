var gulp = require("gulp");
var	autoprefixer = require("gulp-autoprefixer");
var	sourcemaps= require("gulp-sourcemaps");
var	sass = require("gulp-dart-sass");
var	cleanCSS = require("gulp-clean-css");
var	concat = require("gulp-concat");

function cssStyles() {
	return gulp.src('./website/assets/css/vendors/*.css')
		.on('error',function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(cleanCSS())
		.pipe(concat('vendors.css'))
		.pipe(gulp.dest('./website/temp/styles'));
};

function sassStyles () {
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
};

const styles = gulp.series(cssStyles, sassStyles);

exports.styles = styles;

