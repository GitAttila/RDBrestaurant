var gulp = require('gulp');
var	webpack = require('webpack');

function scripts(done) {
	webpack(require('../../webpack.config'), function(err, stats){
		if (err) {
			console.log(err.toString());
		}
		if (stats) {
			console.log(stats.toString());
		}
	});
	done();
};

const scriptsTask = gulp.series(scripts);

exports.scripts = scriptsTask;
