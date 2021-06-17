'use strict';

const gulp = require("gulp");
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const del = require("del");

function styles() {
    return gulp.src('source/sass/style.scss')
        .pipe(sass())
        .pipe(prefix({
            cascade: false
        }))
        .pipe(gulp.dest('source/css'))
        .pipe(gulp.dest('build/css'))
}

function copy() {
    return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/*.html"
    ], {
        base: "source"
    })
        .pipe(gulp.dest("build"));
}

function clean() {
    return del("build")
}
const build = gulp.series(clean, copy, styles);

exports.build = build;
exports.clean = clean;