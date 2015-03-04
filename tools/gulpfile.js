// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	jsdoc = require("gulp-jsdoc"),
	requirejs = require('requirejs'),
	rjs = require('gulp-requirejs')


// 检查脚本
gulp.task('lint', function() {
    gulp.src('./www/js/core/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 生成文档
gulp.task('jsdoc', function() {
    gulp.src('./www/js/core/*.js')
		.pipe(
			jsdoc(
				'./docu',
				{
				  path: './tools/docstrap/template',
					systemName      : "saogaUI",
					footer          : "saogaUI",
					copyright       : "saogaUI",
					navType         : "vertical",
					theme           : "journal",
					//linenums        : true,
					//collapseSymbols : false,
					//inverseNav      : false
				}	
			)
		);
});

// less解析
gulp.task('less', function(){
	gulp.src('./www/less/styles.less')
		.pipe(less({
			compress: true
		}))
		.pipe(gulp.dest('./build/css/'));
});

// r.js打包
gulp.task('requirejs',function(){
	requirejs.optimize({
		appDir: './www',
		baseUrl: 'js/lib',
		paths: {
			core: '../core',
			app:  '../app'
		},
		dir: './build',
		modules: [
			//编译公共部分
			{
				//模块名称是相对于baseURL时
				name: '../common',

				//列出顶层嵌套依赖关系
				include: ['core/saogaUI', 'core/drag']
			},
			
			//编译时排除公共部分
			{
				name: 'app/main',
				exclude: ['../common']
			}

		]
	})
});

//单一文件
gulp.task('rjs', function(){
	rjs({
		baseUrl: "./www/js/lib",
		paths: {
			core: '../core',
			app:  '../app'
		},
		//include: 'requireLib',//如果需要把require也压进去（这样整个项目只需要一个js文件了），设置其path，并
		mainConfigFile: "./www/js/common.js", //用已写好的main.js文件来处理模块依赖关系
		name: "app/main", // 模块的名称
		out: "js/app/main.js" //输出的文件名
	})
	.pipe(gulp.dest('./build'));
});

	
	
	
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('jsdoc');
    // 监听文件变化
    // gulp.watch('./js/*.js', function(){
        // gulp.run('lint', 'sass', 'scripts');
    // });
});