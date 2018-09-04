var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	imageminPngQuant = require('imagemin-pngquant'),
	imageminJpegRecompress = require('imagemin-jpeg-recompress'),
	del = require('del'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "dist"
		}
	});
});

gulp.task('deleteDistFolder', function(){
	return del("./dist");
});

gulp.task('copyGeneralFiles',['deleteDistFolder'], function(){
	var pathsToCopy = [
		'./website/*.html',
		'./website/assets/**/*',
		'!./website/assets/images',
		'!./website/assets/images/**',
		'!./website/assets/js',
		'!./website/assets/js/**',
		'!./website/assets/styles',
		'!./website/assets/styles/**',
		'!./website/assets/scss',
		'!./website/assets/scss/**',
		'./website/temp/**/*',
		'!./website/temp/js',
		'!./website/temp/js/**',
		'!./website/temp/styles',
		'!./website/temp/styles/**'
	];

	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./dist'));
});

gulp.task('images',['deleteDistFolder'], function(){
	return gulp.src(["./website/assets/images/**/*"])
		.pipe(imagemin(
			[
				imagemin.gifsicle(),
				imagemin.jpegtran(),
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
});

gulp.task('usemin',['deleteDistFolder','styles','scripts'],function(){
	return gulp.src("./website/index.html")
		.pipe(usemin({
			js: [ function(){ return rev();} /*, function(){ return uglify();}*/ ],
			css: [ function() {return rev();}, function() {return cssnano();} ]
		}))
		.on('error',function(errorInfo){
				console.log(errorInfo.toString());
				this.emit('end');
			})
		.pipe(gulp.dest('./dist'));
});

gulp.task('build',['deleteDistFolder','usemin','images', 'copyGeneralFiles']);

gulp.task('quickbuild',['deleteDistFolder','usemin','copyGeneralFiles']);

gulp.task('default',['build']);
