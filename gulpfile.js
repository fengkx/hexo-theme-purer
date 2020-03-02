const gulp = require('gulp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserify = require('browserify');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const globby = require('globby');
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

function singleFileProcess(fullPath, filename) {
  return (cb) => {
    browserify(`src/js/${fullPath}`)
      .transform('babelify', {
        presets: [
          ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
        ],
        plugins: ['@babel/plugin-transform-runtime'],
      })
      .bundle()
      .pipe(source(filename))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('source/js'));
    cb();
  };
}

gulp.task('dom-event', () => gulp.src('src/js/dom-event/*.js')
  .pipe(concat('dom-event.js'))
  .pipe(babel({
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
    ],
  }))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('source/js')));


gulp.task('local-search.js', async () => singleFileProcess('search/local-search.js', 'local-search.js'));

gulp.task('simple-js', async (cb) => {
  const entries = await globby('src/js/*.js');
  const fnames = entries.map((e) => e.substring(7));
  fnames.forEach((name) => {
    singleFileProcess(name, name)(cb);
  });
});

gulp.task('js', gulp.parallel('dom-event', 'local-search.js', 'simple-js'));

gulp.task('build', gulp.parallel('css', 'js'));
gulp.task('default', gulp.parallel('build'));

gulp.task('watch', () => {
  gulp.watch('src/**', gulp.parallel('build'));
});
