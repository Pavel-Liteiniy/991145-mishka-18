"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");

var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("docs/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("docs"));
});

gulp.task("js", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(gulp.dest("docs/js"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"], {
    base: "source"
  })
    .pipe(gulp.dest("docs"));
});

gulp.task("clean", function () {
  return del("docs");
});

gulp.task("sass", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/css"));
});

gulp.task("css", function () {
  return gulp.src("source/css/vendor/*.css")
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(
			rename( {
				suffix: '.min',
			} )
		)
    .pipe(gulp.dest("docs/css"));
});

gulp.task("server", function () {
  server.init({
    server: "docs/"
  });
  gulp.watch("source/js/**/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("sass", "refresh"));
  gulp.watch("source/img/**/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("docs", gulp.series(
  "clean",
  "copy",
  "css",
  "sass",
  "sprite",
  "html"
));
gulp.task("start", gulp.series("docs", "server"));
