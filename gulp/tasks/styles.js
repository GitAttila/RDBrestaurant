var gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps= require("gulp-sourcemaps"),
	sass = require("gulp-sass");

gulp.task('styles', function(){
	return gulp.src('./website/assets/scss/sitestyles.scss')
		.on('error',function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'normal'  //compressed
			}).on('error', sass.logError)
		)
        .pipe(autoprefixer({
            grid: true
        }))
        .pipe(sourcemaps.write())
		.pipe(gulp.dest('./website/temp/styles'));
});

