const styles = require('./styles').styles;
const scripts = require('./scripts').scripts;

const gulp = require('gulp');
const browserSync = require('browser-sync');
const server = browserSync.create();

const initServer = (done) => {
	server.init({
		notify:false,
		server: {
			baseDir:"website"
		}
	});
	done();
}

const reload = (done) => {
	server.reload();
	done()
};

const watchHtml = (done) => {
	gulp.watch('./website/*.html', gulp.series(reload));
	done();
}

const watchScripts = (done) => {
	gulp.watch('./website/assets/js/**/*.js', gulp.series(scripts, reload));
	done();
}

const watchDataFiles = (done) => {
	gulp.watch('./website/assets/data/*.json', gulp.series(scripts, reload));
	done();
}

const cssInject = () => {
	return gulp.src('./website/temp/styles/sitestyles.css')
		.pipe(server.stream());
};

const watchStyles = (done) => {
	gulp.watch('./website/assets/scss/**/*.scss', gulp.series(styles, cssInject));
	done();
}


//Watch task
// gulp.task('watch', gulp.series('fonts', function(){
	
// 	initServer();

// 	watch('./website/*.html', () => {
// 		console.log('refreshing html');
// 		reload();
// 	});

// 	watch('./website/assets/scss/**/*.scss',function(){
// 		gulp.series('cssInject');
// 	});
	
// 	gulp.watch('./website/assets/js/**/*.js', () => {
// 		console.log('watching js...');
// 		gulp.series('scripts', reload);
// 	});

// 	watch('./website/assets/php/**/*.php',function(){
// 		gulp.series('scriptsRefresh');
// 	});

// 	watch('./website/assets/data/*.json',function(){
// 		gulp.series('scriptsRefresh');
// 	});

// }));

// gulp.task('cssInject',gulp.series('styles', function(){
// 	return gulp.src('./website/temp/styles/sitestyles.css')
// 		.pipe(browserSync.stream());
// }));

// gulp.task('scriptsRefresh',gulp.series('scripts', function(){
// 	console.log('refreshing scripts...');
// 	browserSync.reload();
// }));

// gulp.task('phpRefresh',['phpscripts'], function(){
// 	browserSync.reload();
// });

// gulp.task('jsonRefresh',['JSONdatafiles'], function(){
// 	browserSync.reload();
// });

const watch = gulp.series(initServer, watchHtml, watchScripts, watchStyles, watchDataFiles);

gulp.task('watch', watch);