const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

const options = {
    pug: {
        all: "./app/views/**/*.pug",
        src: [
            "app/views/*.pug",
            "app/views/!blocks/**",
            "app/views/!layout/**",
        ],
        dest: "./public",
    },
    styles: {
        src: "./app/styles/**/*.scss",
        dest: "./public/css",
    },
    scripts: {
        src: "./app/scripts/*.js",
        dest: "./public/scripts",
    },
};
function styles() {
    return gulp
        .src(options.styles.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(options.styles.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

function views() {
    return gulp
        .src(options.pug.src)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(options.pug.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

function scripts() {
    return gulp
        .src(options.scripts.src)
        .pipe(gulp.dest(options.scripts.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./public",
        },
    });
    gulp.watch(options.styles.src, styles);
    gulp.watch(options.pug.all, views);
    gulp.watch(options.scripts.src, scripts);
}

exports.styles = styles;
exports.views = views;
exports.scripts = scripts;
exports.watch = watch;
