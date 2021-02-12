
const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const concat = require('gulp-concat');


function generate_CSS(cb){
    src('./public/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('all.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./public/css'))
        .pipe(sync.stream());
    cb();
}

function browsersync(cb){
    sync.init({
        server: './'
    });
    watch('./public/sass/**.scss', generate_CSS).on('change', sync.reload);
    watch('./public/dev-js/**.js', generate_JS).on('change', sync.reload);
    watch('./**.html').on('change', sync.reload);
    watch('./views/**.pug').on('change', sync.reload);
}

function generate_JS(cb){
    src('./public/dev-js/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./public/js'))
        .pipe(sync.stream());
    cb();
}

function defaultTask(cb){
    watch('./public/sass/**.scss', generate_CSS);
    watch('./public/dev-js/**.js', generate_JS);
    cb();
}

exports.js = generate_JS;
exports.css = generate_CSS;
exports.sync = browsersync;
exports.default = defaultTask;