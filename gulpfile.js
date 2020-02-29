const gulp = require('gulp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');

gulp.task('css', () => {
  return gulp.src('src/**/*.css')
    // .pipe(postcss([
    //   postcssImport,
    //   tailWind,
    //   autoprefixer(),
    // ]))
    // eslint-disable-next-line global-require,import/no-unresolved
    .pipe(postcss([require('postcss-import'), require('tailwindcss'), require('postcss-nested'), require('autoprefixer')]))
    // .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('source'));
});

gulp.task('dom-event', () => {
  return gulp.src('src/js/dom-event/*.js')
    .pipe(concat('dom-event.js'))
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('source/js'));
});

gulp.task('build', gulp.parallel('css', 'dom-event'));
gulp.task('default', gulp.parallel('build'));

gulp.task('watch', () => {
  gulp.watch('src/**', gulp.parallel('build'));
});
