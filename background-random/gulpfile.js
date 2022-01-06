/**
 * Gulpfile setup
 * @Version: 1.0.0
 * @authors: icao
 **/

/* PLUGINS GULP */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
/* Gulp Stats */
require('gulp-stats')(gulp);

/*VARIABLES PROJECTO */
var projectName = 'BS_projectName';
/*-----------------------SCRIPTS TASK-------------------------- */
/* Browser Sync */
// Static Server + watching scss/html files
gulp.task('browser-sync', function() {
    var files = [
      'dist/*.html',
      //'dist/css/*.css',
      'dist/images/*',
      //'dist/js/*.js'
   ];
    browserSync.init({
        server: {
            baseDir: './dist' 
        },
        logPrefix: projectName,
        browser: 'opera' //Especificando abrirlo en Opera (navegador)
    });
    gulp.watch(files).on('change', browserSync.reload);
});

/*Sass */
gulp.task('sass', function() {
    //localiza los archivos con temrinacion .scss/.sass en el directorio src/css
    gulp.src('src/css/sass/*.{scss,sass}')
        //Cahnged anticipa los cambios en los archivos antes de proceder
        .pipe(changed('src/css', {extension: '.css'}))
        .pipe(sourcemaps.init())
        //Convierte sass en css con gulp-sass 
        .pipe(sass({
                //compressed = minificado , expanded = no minificado
                outputStyle: 'expanded'
            })
            .on('error', sass.logError))
        //Agrega prefijos a lo compilado
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        //salida de archivos en el folder:
        .pipe(gulp.dest('src/css'))
        .pipe(notify({
            message: "Compilación de SASS TERMINADA", 
            onLast: true
        }));
});

/*Minify of CSS */
gulp.task('minifyCss', function() {
    return gulp.src(['src/css/*.css', '!src/css/**/*.min.css'])
        // El siguiente Changed, depende del changed en el sass, para que solo filtre el archivo modificado
        .pipe(changed('dist/css', {extension: '.min.css'}))
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({
            message: "Minificación de CSS TERMINADA", 
            onLast: true
        }));
});

/* Uglify */
gulp.task('uglify', function() {
    gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
        .pipe(changed('dist/css', {extension: '.min.js'}))
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({
            message: "Minificación de JS TERMINADA", 
            onLast: true
        }));
});

/* imageCompress */
gulp.task('image-compress', function() {
    gulp.src('src/images/*')
        .pipe(changed('dist/css', {extension: '*.{png,jpg,gif,svg}'}))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({
            message: "Compresión de imagenes TERMINADA", 
            onLast: true
        }));
});

/* Copy Files*/
gulp.task('copyFiles', function() {
    gulp.src(['src/**/**/*', '!src/js/**/*', '!src/css/**/*'])
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/* Copy CSS*/
gulp.task('copyCss', function() {
    gulp.src(['src/css/*.min.css', 'src/css/vendor/*.min.css'])
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/* Copy JS*/
gulp.task('copyJs', function() {
    gulp.src(['src/js/*.min.js', 'src/js/vendor/*.min.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


/*Watch */
//gulp.task('watch', ['browser-sync'], function() {
gulp.task('watch', function() {
    gulp.watch('src/css/**/*.{scss,sass}', ['sass']);
    gulp.watch(['src/css/*.css', '!src/css/**/*.min.css'], ['minifyCss']);
    gulp.watch(['src/js/**/*.js', '!src/js/**/*.min.js'], ['uglify']);
    gulp.watch(['src/**/**/*', '!src/js/**/*', '!src/css/**/*'], ['copyFiles']);
    gulp.watch(['src/css/*.min.css', 'src/css/vendor/*.min.css'], ['copyCss']);
    gulp.watch(['src/js/*.min.js', 'src/js/vendor/*.min.js'], ['copyJs']);
    //gulp.watch("*.html").on('change', browserSync.reload);
    
});


//Gulp Default = Solo para desarrollo
gulp.task('default', ['browser-sync', 'watch', 'sass', 'minifyCss', 'uglify', 'copyFiles', 'copyCss', 'copyJs']);

//Gulp Build = Projecto optimizado para subir a servidor
gulp.task('build', ['image-compress']);
