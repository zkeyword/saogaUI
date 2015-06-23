var gulp        = require('gulp'),
	less        = require('gulp-less'),
	rjs         = require('gulp-requirejs'),
	uglify      = require('gulp-uglify'),
	maps        = require('gulp-sourcemaps'),
	minifycss   = require('gulp-minify-css'),
	sprite      = require('gulp.spritesmith'),
	clean       = require('gulp-clean'),
	plumber     = require('gulp-plumber'),
	amdOptimize = require('amd-optimize'),
	concat      = require('gulp-concat'),
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

gulp.task('b', function (){
	gulp
		.src(path.dev+'js/config.js')
		.pipe(gulp.dest(path.dest+'js'));
		
	gulp
		.src(path.dev+'js/app/ZeroClipboard.swf')
		.pipe(gulp.dest(path.dest+'js/app/'));
		
    gulp
		.src(path.dev+'js/**.js')
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  js Syntax Error! --------------------------');
		}))
		.pipe(
			rjs({
				name: 'app/main',
				baseUrl: path.dev+'js/lib/',
				paths: {
					core: '../core',
					app:  '../app'
				},
				mainConfigFile:path.dev+'js/common.js',
				out: 'main.js',
				optimize:true
			})
			.pipe(maps.write('./'))
			.pipe(gulp.dest(path.dest+'js/app/'))
		)
});

//requirejs
gulp.task('r', function() {
	gulp
		.src(path.dev+'js/config.js')
		.pipe(gulp.dest(path.dest+'js'));
		
	gulp
		.src(path.dev+'js/app/ZeroClipboard.swf')
		.pipe(gulp.dest(path.dest+'js/app/'));
		
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

//清理图片
gulp.task('cleanDefaultImg', function() {
	gulp
		.src([
			path.dest+'img/default/*'
		], {read: false})
		.pipe(clean({force: true}));
});
gulp.task('cleanSpriteImg', function() {
	gulp
		.src([
			path.dest+'img/sprite/*'
		], {read: false})
		.pipe(clean({force: true}));
});

//复制文件
gulp.task('copy', function(){
	
	gulp
		.src(path.dev+'less/lib/font-awesome-ie7.min.css')
		.pipe(gulp.dest(path.dest+'css/'));
		
	gulp
		.src(path.dev+'less/fonts/*')
		.pipe(gulp.dest(path.dest+'css/fonts/'));	
		
	gulp
		.src(path.dev+'js/lib/*')
		.pipe(gulp.dest(path.dest+'js/lib/'));

	gulp
		.src(path.dev+'img/default/*')
		.pipe(gulp.dest(path.dest+'img/'));

});

//合并png
gulp.task('spritePNG', function () {	
	var spriteData = gulp
						.src(path.dev+'img/sprite/**.png')
						.pipe(sprite({
							imgName: 'sprite.png',
							cssName: 'spritePNG.css',
							imgPath: '../img/sprite.png'
						}));
		spriteData
			.img
			.pipe(gulp.dest(path.dest+'img/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/'));
});

//合并jpg
gulp.task('spriteJPG', function () {
	var spriteData = gulp
						.src(path.dev+'sprite/*.jpg')
						.pipe(sprite({
							imgName: 'sprite.jpg',
							cssName: 'spriteJPG.css',
							imgPath: '../img/sprite.jpg'
						}));
		spriteData
			.img
			.pipe(gulp.dest(path.dest+'img/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/'));
});

gulp.task('sprite', function(){
	gulp.run('spritePNG');
	gulp.run('spriteJPG');
});

gulp.task('default', function(){
	
	//监听js
    gulp.watch(path.dev+'js/**', function(){
        gulp.run('r');
    });
	
    //监听less
    gulp.watch(path.dev+'less/**', function(){
        gulp.run('less');
    });
	
	//监听不合并图片
	gulp.watch(path.dev+'img/default/**', function(){
		gulp.run('cleanDefaultImg');
		gulp.run('copy');
	});
	
	//监听sprite png
	gulp.watch(path.dev+'img/sprite/**.png', function(){
		gulp.run('cleanSpriteImg');
		gulp.run('spritePNG');
	});
	
	//监听sprite jpg
	gulp.watch(path.dev+'img/sprite/**.jpg', function(){
		gulp.run('spriteJPG');
	});
	
});