var gulp = require('gulp'),
	webpack = require('webpack');

//Scripts
gulp.task('scripts', function(callback){  // ['phpscripts','JSONdatafiles']
	webpack(require('../../webpack.config'), function(err, stats){
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();
	});
});

//PHP scripts
// gulp.task('phpscripts', function() {
//     return gulp.src('./website/assets/php/**/*.*')
//     	.pipe(gulp.dest('./website/temp/php'));
// });

// JSON data files
// gulp.task("JSONdatafiles", function(){
// 	return gulp.src('./website/assets/data/*.json')
// 		.pipe(gulp.dest('./website/temp/data'));
// });
