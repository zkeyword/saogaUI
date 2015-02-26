// ���� gulp
var gulp = require('gulp'); 

// �������
var jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	jsdoc = require("gulp-jsdoc"),
	requirejs = require('requirejs'),
	rjs = require('gulp-requirejs')


// ���ű�
gulp.task('lint', function() {
    gulp.src('./www/js/core/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// �����ĵ�
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

// less����
gulp.task('less', function(){
	gulp.src('./www/less/styles.less')
		.pipe(less({
			compress: true
		}))
		.pipe(gulp.dest('./build/css/'));
});

// r.js���
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
			//���빫������
			{
				//ģ�������������baseURLʱ
				name: '../common',

				//�г�����Ƕ��������ϵ
				include: ['core/saogaUI', 'core/drag']
			},
			
			//����ʱ�ų���������
			{
				name: 'app/main',
				exclude: ['../common']
			}

		]
	})
});

//��һ�ļ�
gulp.task('rjs', function(){
	rjs({
		baseUrl: "./www/js/lib",
		paths: {
			core: '../core',
			app:  '../app'
		},
		//include: 'requireLib',//�����Ҫ��requireҲѹ��ȥ������������Ŀֻ��Ҫһ��js�ļ��ˣ���������path����
		mainConfigFile: "./www/js/common.js", //����д�õ�main.js�ļ�������ģ��������ϵ
		name: "app/main", // ģ�������
		out: "js/app/main.js" //������ļ���
	})
	.pipe(gulp.dest('./build'));
});

	
	
	
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// ����Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// �ϲ���ѹ���ļ�
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// Ĭ������
gulp.task('default', function(){
    gulp.run('jsdoc');
    // �����ļ��仯
    // gulp.watch('./js/*.js', function(){
        // gulp.run('lint', 'sass', 'scripts');
    // });
});