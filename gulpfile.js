const
  del = require('del'),
  gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  cssnano = require('cssnano'),
  babel = require('gulp-babel'),
  uglify = require('gulp-terser'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  prefixer = require('autoprefixer'),
  srcmap = require('gulp-sourcemaps'),
  sassUnicode = require('gulp-sass-unicode'),
  cssDeclarationSorter = require('css-declaration-sorter'),
  browserSync = require('browser-sync').create();
sass.compiler = require('node-sass');


// Task clean
gulp.task('clean', function () {
  return del(['./dist']);
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

// Task CSS
gulp.task('css', function () {
  return gulp.src([
      './src/components/**/*.sass',
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
      './src/views/*.pug',
      '!./src/views/\_*.pug'
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
        './src/views/**/*.pug',
      ],
      gulp.series('html')
    ),
    gulp.watch([
        './src/components/**/*.sass',
      ],
      gulp.series('css')
    ),
    gulp.watch([
        './src/scripts/**/*.js',
      ],
      gulp.series('js')
    ),
    gulp.watch('./dist/*').on('change', browserSync.reload)
})

// Gulp task defaul
gulp.task('default', gulp.series(
  'clean',
  'html',
  'css',
  'js',
  'serve'
))