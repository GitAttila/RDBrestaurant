
const styles = require('./styles').styles;
const scripts = require('./scripts').scripts;
const fonts = require('./fonts').fonts;

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const server = browserSync.create();

gulp.task('preview', function(done){
	server.init({
		notify: false,
		server: {
			baseDir: "dist"
		}
	});
	done();
});

const deleteDistFolder = () => {
	return del('./dist');
}

const deleteDistFolderQuick = (done) => {
	del.sync([
		'./dist/**/*',
		'!./dist/assets',
		'!./dist/assets/images',
		'!./dist/assets/images/**/*'
	]);
	done();
};

const copyGeneralFiles = () => {
	var pathsToCopy = [
		'./website/assets/**/*',
		'!./website/assets/images',
		'!./website/assets/images/**',
		'!./website/assets/js',
		'!./website/assets/js/**',
		'!./website/assets/css',
		'!./website/assets/css/**',
		'!./website/assets/scss',
		'!./website/assets/scss/**',
		'./website/temp/**/*',
		'!./website/temp/js',
		'!./website/temp/js/**',
		'!./website/temp/styles',
		'!./website/temp/styles/**'
	];
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./dist/assets'));
};

const transformImages = () => {
	return gulp.src(["./website/assets/images/**/*"])
		.pipe(imagemin(
			[
				imagemin.gifsicle(),
				imagemin.mozjpeg(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngQuant(),
				imageminJpegRecompress()
			],
			{
				progressive: true,
				interlaced: true,
				multipass:true,
				verbose: true
			}
		))
		.pipe(gulp.dest("./dist/assets/images"));
};

const minify = () => {
	return gulp.src("./website/index.html")
		.pipe(usemin({
			js: [  () => {return rev();}  /*, function(){ return uglify();}*/ ],
			css: [ () => {return rev();}, function() {return cssnano();} ]
		}))
		.on('error',function(errorInfo){
				console.log(errorInfo.toString());
				this.emit('end');
			})
		.pipe(gulp.dest('./dist'));
};

gulp.task('minify', gulp.series( deleteDistFolder, styles, scripts, minify));

gulp.task('images', gulp.series( deleteDistFolder, transformImages));

gulp.task('build', gulp.series( deleteDistFolder, styles, scripts, minify, transformImages, fonts, copyGeneralFiles));

gulp.task('quickbuild', gulp.series( deleteDistFolderQuick, styles, scripts, minify, fonts, copyGeneralFiles));

gulp.task('default', gulp.series('build'));
