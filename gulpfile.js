const
  del = require('del'),
  gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  cssnano = require('cssnano'),
  babel = require('gulp-babel'),
  uglify = require('gulp-terser'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  prefixer = require('autoprefixer'),
  srcmap = require('gulp-sourcemaps'),
  sassUnicode = require('gulp-sass-unicode'),
  cssDeclarationSorter = require('css-declaration-sorter'),
  browserSync = require('browser-sync').create();
sass.compiler = require('node-sass');

const _librariesUI = require('./src/partials/_libraries-ui');

// Task clean
gulp.task('clean', function () {
  return del(['./dist']);
})

// Public Something
gulp.task('public', function (done) {
  // Font icons
  gulp.src(_librariesUI.fonts).pipe(gulp.dest('./dist/fonts'))
  gulp.src('bower_components/metro/build/mif/*').pipe(gulp.dest('./dist/mif'))
  gulp.src('bower_components/flag-icon-css/flags/**/*').pipe(gulp.dest('./dist/flags'))

  // ChartJS
  gulp.src('bower_components/chart.js/dist/Chart.min.css').pipe(gulp.dest('./dist/css'));
  gulp.src('bower_components/chart.js/dist/Chart.min.js').pipe(gulp.dest('./dist/js'));

  done();
})

// Task JS
gulp.task('js', function () {
  return gulp.src('./src/scripts/**/*.js', {
      allowEmpty: true
    })
    .pipe(srcmap.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify()) // Disable minify
    .pipe(srcmap.write('.'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Task Libraries UI JS
gulp.task('library:js', function () {
  return gulp.src(_librariesUI.scripts, {
      allowEmpty: true
    })
    .pipe(concat('libraries-ui.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// Task Libraries UI CSS
gulp.task('library:css', function () {
  return gulp.src(_librariesUI.styles, {
      allowEmpty: true,
    })
    .pipe(concat('libraries-ui.min.css'))
    .pipe(postcss([
      prefixer({
        cascade: false,
      }),
      cssnano(),
      cssDeclarationSorter({
        order: 'smacss'
      })
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Task CSS
gulp.task('css', function () {
  return gulp.src([
      './src/partials/**/*.sass',
      '!./src/partials/**/\_*.sass',
    ], {
      allowEmpty: true
    })
    .pipe(srcmap.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sassUnicode())
    .pipe(postcss([
      prefixer({
        cascade: false,
      }),
      cssnano(), // Disable minify
      cssDeclarationSorter({
        order: 'smacss'
      })
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(srcmap.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Task compile HTML
gulp.task('html', function () {
  return gulp.src([
      './src/pages/*.pug',
      '!./src/pages/\_*.pug'
    ])
    .pipe(pug({
      pretty: '\t',
    }))
    .pipe(plumber())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Task watch
gulp.task('serve', function () {
  browserSync.init({
      notify: false,
      server: {
        baseDir: './dist',
      },
      port: 8000
    }),
    gulp.watch([
        './src/pages/**/*.pug',
        './src/partials/**/*.pug',
      ],
      gulp.series('html')
    ),
    gulp.watch([
        './src/partials/**/*.sass',
      ],
      gulp.series('css')
    ),
    gulp.watch([
        './src/scripts/**/*.js',
      ],
      gulp.series('js')
    ).on('change', browserSync.reload)
})

// Gulp task defaul
gulp.task('default', gulp.series(
  'clean',
  'public',
  'library:css',
  'library:js',
  'html',
  'css',
  'js',
  'serve'
))