'use strict';

var watchify 	= require('watchify'),
	browserify 	= require('browserify'),
	gulp 		= require('gulp'),
	source 		= require('vinyl-source-stream'),
	buffer 		= require('vinyl-buffer'),
	gutil 		= require('gulp-util'),
	sourcemaps 	= require('gulp-sourcemaps'),
	assign 		= require('lodash.assign'),
	uglify 		= require('gulp-uglify'),
	globby 		= require('globby'),
	through 	= require('through2'),
	reactify 	= require('reactify'),
	runSequence = require('run-sequence'),
	sass 		= require('gulp-sass'),
	rename 		= require('gulp-rename'),
	inquirer 	= require('inquirer'),
	scsslint 	= require('gulp-scss-lint'),
	debowerify 	= require('debowerify');

// add custom browserify options here
var customOpts = {
	entries: ['./src/js/index.js'],
	debug: true
};
var opts = assign({}, watchify.args, customOpts),
	b = watchify(browserify(opts));


/* DEFAULT */
gulp.task('default', function(callback) {
	var questions = {
		type: 'rawlist',
		name: 'task',
		message: 'What task do you want me to run?',
		default: 0,
		choices: ['build', 'watch', 'vendor'],
	};
	inquirer.prompt(questions, function(res){
		if (res.task) {
			switch(res.task) {
				case 'build':
					runSequence('build', callback);
					break;
				case 'watch':
					runSequence('watch', callback);
					break;
				case 'vendor':
					runSequence('js:vendor', 'sass:vendor', callback);
					break;
			}
		}
    });
});

/* COMPILE */
gulp.task('build', function(callback) {
	opts.debug = false;
	b = browserify(opts);
	runSequence('js:vendor', 'js', 'sass:vendor', 'sass', function() {
		callback();
	});
});

/* WATCH */
gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['sass:custom']);
	runSequence('js');
});

/* SASS custom */
gulp.task('sass:custom', function(callback) {
	runSequence('sass:custom:lint', 'sass:custom:build', function() {
		callback();
	});
});

/* SASS custom lint*/
gulp.task('sass:custom:lint', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(scsslint({'config': '.scss-lint.yml', endless: false}))
    //.pipe(scsslint({endless: true}))
    .pipe(scsslint.failReporter());
});

/* SASS custom build*/
gulp.task('sass:custom:build', function () {

    var stream = gulp.src('./src/sass/style.scss'),
    	sourceMaps = opts.debug;

    if (sourceMaps) {
    	stream = stream.pipe(sourcemaps.init());
    }

   	stream = stream.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename("style.min.css"));

    if (sourceMaps) {
        stream = stream.pipe(sourcemaps.write('./'))
    }

    stream = stream.pipe(gulp.dest('./assets/css'));

    return stream;
});

/* SASS:VENDOR */
gulp.task('sass:vendor', function () {

    var stream = gulp.src('./src/sass/vendor.scss')
   		.pipe(sass({outputStyle: 'compressed', includePaths: ['./node_modules/','./bower_components/']}).on('error', sass.logError))
        .pipe(rename("vendor.min.css"))
		.pipe(gulp.dest('./assets/css'));

    return stream;
});


/* JS */
// add transformations here
// i.e. b.transform(coffeeify);
//
gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', function(log) {
	gutil.log(gutil.colors.cyan('js'),  'changed, building...');
	gutil.log(log);
}); // output build logs to terminal

function bundle() {
	var stream = b.bundle(),
		sourceMaps = opts.debug;

	stream = stream
		// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('scripts.min.js'))
		// optional, remove if you don't need to buffer file contents
		.pipe(buffer());

	if (sourceMaps) {
		// optional, remove if you dont want sourcemaps
		stream = stream.pipe(sourcemaps.init({loadMaps: sourceMaps})) // loads map from browserify file
	}

	// Add transformation tasks to the pipeline here.
    stream = stream.pipe(uglify({mangle: false}))
    	.on('error', gutil.log)

    if (sourceMaps) {
		stream = stream.pipe(sourcemaps.write('./')) // writes .map file
	}

	stream = stream.pipe(gulp.dest('./assets/js'));

	return stream;
}



/* JS:VENDOR*/

gulp.task('js:vendor', function() {
	// gulp expects tasks to return a stream, so we create one here.
  var bundledStream = through();


  bundledStream
    // turns the output bundle stream into a stream containing
    // the normal attributes gulp plugins expect.
    .pipe(source('vendor.min.js'))
    // the rest of the gulp task, as you would normally write it.
    // here we're copying from the Browserify + Uglify2 recipe.
    .pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true}))
      // Add gulp plugins to the pipeline here.
      .pipe(uglify({mangle: false}))
      .on('error', gutil.log)
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/js/'));

  // "globby" replaces the normal "gulp.src" as Browserify
  // creates it's own readable stream.
  globby(['./src/js/vendor.js'], function(err, entries) {
    // ensure any errors from globby are handled
    if (err) {
      bundledStream.emit('error', err);
      return;
    }

    // create the Browserify instance.
    var b = browserify({
      entries: entries,
      debug: true,
      transform: [reactify]
    })
    .transform(debowerify);

    b.on('log', gutil.log)

    // pipe the Browserify stream into the stream we created earlier
    // this starts our gulp pipeline.
    b.bundle().pipe(bundledStream);
  });

  // finally, we return the stream, so gulp knows when this task is done.
  return bundledStream;
});

