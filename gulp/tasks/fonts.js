var gulp = require("gulp");

gulp.task('fonts', function(){
    return gulp.src("./node_modules/@fortawesome/fontawesome-free/webfonts/**/*")
        .on('error',function(errorInfo){
            console.log(errorInfo.toString());
            this.emit('end');
        })
		.pipe(gulp.dest('./website/temp/webfonts'));
});