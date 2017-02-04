// Packages
const gulp = require('gulp');
const merge = require('merge-stream');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');

// Configs
const tsconfig = require('./tsconfig.json');

// Tasks
gulp.task('default', ['copy'], () => {
  // Do nothing.
});

gulp.task('copy', ['compile'], () => {
  return merge([
    gulp.src('src/**').pipe(gulp.dest('target')),
    gulp.src([
        'node_modules/es6-promise/dist/*',
        'node_modules/jquery/dist/*',
        'node_modules/requirejs/require.js'
    ]).pipe(gulp.dest('target/js'))
  ]);
});

gulp.task('compile', () => {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tsconfig.compilerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src'));
});


// .pipe(uglify())
// .pipe(rename({suffix: '.min'}))
