var gulp        = require('gulp'),
	less        = require('gulp-less'),
	rjs         = require('gulp-requirejs'),
	uglify      = require('gulp-uglify'),
	jshint      = require('gulp-jshint'),
	maps        = require('gulp-sourcemaps'),
	minifycss   = require('gulp-minify-css'),
	sprite      = require('gulp.spritesmith'),
	imagemin    = require('gulp-imagemin'),
	clean       = require('gulp-clean'),
	plumber     = require('gulp-plumber'),
	concat      = require('gulp-concat'),
	tmodjs      = require('gulp-tmod'),
	cache       = require('gulp-cache'),
	path        = {
					dev: 'www/',
					dest: 'build/'
				};

//less
gulp.task('less', function () {
    gulp
		.src(path.dev+'less/styles.less')
        .pipe(maps.init())
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  less Syntax Error! --------------------------');
		}))
		.pipe(less())
		.pipe(minifycss({compatibility: 'ie7'}))
		.pipe(maps.write('./'))
        .pipe(gulp.dest(path.dest+'css'));
});

//jshint
gulp.task('jshint', function() {
	gulp
		.src(path.dev+'js/core/drag.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));	
})

//requirejs
gulp.task('r', function() {
	gulp
		.src(path.dev+'js/config.js')
		.pipe(gulp.dest(path.dest+'js'));

    rjs({
        name: 'app/main',
        baseUrl: path.dev+'js/lib/',
		paths: {
			core: '../core',
			app:  '../app'
		},
		mainConfigFile:path.dev+'js/common.js',
        out: 'main.js',
		optimize:false
    })
	//.pipe(uglify())
	.pipe(maps.write('./'))
    .pipe(gulp.dest(path.dest+'js/app/'));

});

//tmod.js
gulp.task('tmod', function() {
	gulp.src(path.dev + '/tpl/**/*.html')
		.pipe(tmodjs({
			base:  path.dev + 'tpl',
			combo: true,
			output: path.dev + 'js/app/'
		}));
});

//����ͼƬ
gulp.task('cleanDefaultImg', function() {
	gulp
		.src([
			path.dest+'img/default/*.{png,jpg,jpeg,gif}'
		], {read: false})
		.pipe(clean({force: true}));
});
gulp.task('cleanSpriteImg', function() {
	gulp
		.src([
			path.dest+'img/sprite/*.{png,jpg}'
		], {read: false})
		.pipe(clean({force: true}));
});

//�����ļ�
gulp.task('copy', function(){
	
	/*
	gulp
		.src(path.dev+'less/lib/font-awesome-ie7.min.css')
		.pipe(gulp.dest(path.dest+'css/'));
	*/
	
	gulp
		.src(path.dev+'js/app/ZeroClipboard.swf')
		.pipe(gulp.dest(path.dest+'js/app/'));
		
	gulp
		.src(path.dev+'less/fonts/*')
		.pipe(gulp.dest(path.dest+'css/fonts/'));	
		
	gulp
		.src(path.dev+'js/lib/*')
		.pipe(gulp.dest(path.dest+'js/lib/'));

	
	gulp
		.src(path.dev+'img/default/**/*.{png,jpg,jpeg,gif}')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  Copy Error! --------------------------');
		}))
		.pipe(gulp.dest(path.dest+'img/'));

});

//sprite
gulp.task('sprite', ['spritePNG', 'spriteJPG']);

//�ϲ�png
gulp.task('spritePNG', ['cleanSpriteImg'], function () {	
	var spriteData = gulp
						.src(path.dev+'img/sprite/**.png')
						.pipe(sprite({
							imgName: 'sprite.png',
							cssName: 'sprite-png.css',
							imgPath: '../img/sprite.png'
						}));
		spriteData
			.img
			.pipe(gulp.dest(path.dest+'img/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});

//�ϲ�jpg
gulp.task('spriteJPG', ['cleanSpriteImg'], function () {
	var spriteData = gulp
						.src(path.dev+'sprite/*.jpg')
						.pipe(sprite({
							imgName: 'sprite.jpg',
							cssName: 'sprite-jpg.css',
							imgPath: '../img/sprite.jpg'
						}));
		spriteData
			.img
			.pipe(gulp.dest(path.dest+'img/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});


gulp.task('default', ['cleanDefaultImg', 'copy', 'sprite',  'r'], function(){
	
	//�������ϲ�ͼƬ
	gulp.watch(path.dev+'img/default/**', ['copy']);
	
	//����sprite png
	gulp.watch(path.dev+'img/sprite/**.png', ['spritePNG']);
	
	//����sprite jpg
	gulp.watch(path.dev+'img/sprite/**.jpg', ['spriteJPG']);
	
	//����tpl
	gulp.watch(path.dev+'tpl/**', ['tmod']);
		
	//����js
    gulp.watch(path.dev+'js/**', ['r']);
	
    //����less
    gulp.watch(path.dev+'less/**', ['less']);
	
});