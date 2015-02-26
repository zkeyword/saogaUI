module.exports = function (grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('config.json'),
		clean: {
			build: {
				src: [ '<%= pkg.dir %>/build/' ]
			},
		},
		copy: {
			main:{
				cwd: '<%= pkg.dir %>/www',
				src: ['./images/**'],
				dest: '<%= pkg.dir %>/build',
				expand: true
			}
		},
		less: {
			prod: {
				files: {
					'<%= pkg.dir %>/build/css/styles.css': '<%= pkg.dir %>/www/less/styles.less'
				},
				options: {
					cleancss: true
				}
			}
		},
		requirejs: {
			main: {
				options: {
					baseUrl: "www/js/lib",
					paths: {
						core: '../core',
						app:  '../app'
					},
					//include: 'requireLib',//如果需要把require也压进去（这样整个项目只需要一个js文件了），设置其path，并
					mainConfigFile: "www/js/common.js", //用已写好的main.js文件来处理模块依赖关系
					name: "app/main", // 模块的名称
					out: "build/js/app/main.js" //输出的文件名
					,optimize:'none',//注释掉此行即可同时把合并后的js文件压缩
				}
			}
		},
		livereload: {
			options: {
				base: '<%= pkg.root %>',
			},
			files: ['**']
		},
		watch: {
			requirejs:{
				files: ['<%= pkg.dir %>/www/js/*.js', '<%= pkg.dir %>/www/js/**/*.js'],
				tasks: ['js']
			},
			less: {
				files: ['<%= pkg.dir %>/www/less/*.less', '<%= pkg.dir %>/www/less/**/*.less'],
				tasks: ['requirejs']
			},
			copy:{
				files: [
					'<%= pkg.dir %>/www/images/*.*',
					'<%= pkg.dir %>/www/images/**/*.*',
					'<%= pkg.dir %>/www/js/*.*',
					'<%= pkg.dir %>/www/js/**/*.*'
				],
				tasks: ['copy']
			},

			livereload: {
				options: {livereload: true},
				files: ['<%= pkg.root %>/**']

			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-livereload');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('live', ['livereload', 'watch']);
	//grunt.registerTask('default', ['clean', 'copy', 'less', 'requirejs']);
};