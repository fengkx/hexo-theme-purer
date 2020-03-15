const gulp = require('gulp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglifyES = require('gulp-uglify-es').default;
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');

gulp.task('css', () => gulp.src('src/**/*.css')
// eslint-disable-next-line global-require,import/no-unresolved
  .pipe(postcss([require('postcss-import'), require('tailwindcss'), require('postcss-nested'), require('autoprefixer')]))
  .pipe(purgecss({
    content: ['**/*.ejs'],
    // rejected: true,
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    whitelistPatterns: [/text-/, /icon-/],
  }))
  .pipe(cleanCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('source')));


gulp.task('dom-event', () => gulp.src('src/js/dom-event/*.js')
  .pipe(concat('dom-event.js'))
  .pipe(uglifyES())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('source/js')));

gulp.task('search.js', () => gulp.src('src/js/search/*.js')
  .pipe(concat('search.js'))
  .pipe(uglifyES())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('source/js')));

gulp.task('light-gallery.js', () => gulp.src('src/js/light-gallery/*.js')
  .pipe(concat('light-gallery.js'))
  .pipe(uglifyES())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('source/js')));

gulp.task('simple-js', () => gulp.src('src/js/*.js')
  .pipe(uglifyES())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('source/js')));

gulp.task('js', gulp.parallel('dom-event', 'search.js', 'light-gallery.js', 'simple-js'));

gulp.task('build', gulp.parallel('css', 'js'));
gulp.task('default', gulp.parallel('build'));

gulp.task('watch', () => {
  gulp.watch('src/**', gulp.parallel('build'));
});
