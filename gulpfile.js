const gulp = require('gulp')
const sass = require('gulp-sass')
const browserify = require('browserify')
const glob = require('glob').sync
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')
const server = require('gulp-webserver')

gulp.task('html', () => {
	gulp.src('src/html/**/*.html')
		.pipe(gulp.dest('build'))
})

gulp.task('sass', () => {
	gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build'))
})

gulp.task('js', () => {
	browserify(glob('src/js/**/*.jsx'))
		.transform('babelify', {
			presets: ['es2015', 'react'],
			plugins: ['transform-class-properties', 'babel-plugin-transform-object-rest-spread']
		})
		.bundle().on('error', (err) => console.log(err.stack))
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('build'))
})

gulp.task('img', () => {
	gulp.src('src/img/*')
		.pipe(gulp.dest('build/img'))
})

gulp.task('run', () => {
	gulp.watch('src/html/**/*.html', ['html'])
	gulp.watch('src/sass/**/*.scss', ['sass'])
	gulp.watch('src/js/**/*.jsx', ['js'])
	gulp.watch('src/img/*', ['img'])

	gulp.src('build')
		.pipe(server({
			fallback: 'index.html',
			proxies: [ { source: '/api', target: 'http://localhost:3001' } ]
		}))
})

gulp.task('default', ['html', 'sass', 'js', 'img'])