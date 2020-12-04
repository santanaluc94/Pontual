const gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    cleanCSS = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat-css'),
    concatJs = require('gulp-concat'),
    htmlMin = require('gulp-htmlmin'),
    htmlReplace = require('gulp-html-replace'),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");

/* CSS */
// Clear css, js and html files
gulp.task('cleanFolders', function () {

    gulp.src('./dist/public/css/**/*.css')
        .pipe(clean());

    gulp.src('./src/public/js/**/*.js')
        .pipe(clean());

    return gulp.src('./src/public/*.html')
        .pipe(clean());
});

// Proccess less files to css
gulp.task('less', function () {

    return gulp.src('./dist/public/less/index/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/public/css/index'));
});

// Minify css and concat to pub
gulp.task('concatCss', function () {

    return gulp.src([
            './dist/public/css/index/reset.css',
            './dist/public/css/index/styles.css',
            './dist/public/css/index/header.css',
            './dist/public/css/index/footer.css',
            './dist/public/css/index/modal_entrar.css'
        ])
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/public/css/index'));
});

/* JS */
// compile ts in js
gulp.task("compileTs", function () {

    return tsProject
        .src('./dist/public/ts/**/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest("./dist/public/js/"));
});

// Minify js and concat to pub
gulp.task('concatJs', function () {

    gulp.src('./dist/public/js/index/*.js')
        .pipe(concatJs('script.js'))
        .pipe(minify())
        .pipe(gulp.dest('./src/public/js/index'));

    return gulp.src('./dist/public/js/routes/*.js')
        .pipe(concatJs('route.js'))
        .pipe(minify())
        .pipe(gulp.dest('./src/public/js/routes'));
});

/* HTML */
// Minify html to pub
gulp.task('buildHtml', function () {

    return gulp.src('./dist/public/html/pages/*.html')
        .pipe(htmlReplace({
            css: '/src/public/css/index/styles.css',
            js: '/src/public/js/index/script-min.js'
        }))
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./src/public/'));
});

gulp.task('default', gulp.series('cleanFolders', 'less', 'concatCss', 'compileTs', 'concatJs', 'buildHtml'));