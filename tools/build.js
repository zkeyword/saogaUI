{
    appDir: '../www',
    baseUrl: 'js/lib',
    paths: {
        core: '../core',
        app:  '../app'
    },
    dir: '../build',
    modules: [
        //编译公共部分
        {
            //模块名称是相对于baseURL时
            name: '../common',

			//列出顶层嵌套依赖关系
			include: ['jquery',
			          'core/saogaUI',
			          'core/drag'
			         ]
        },
		
		//编译时排除公共部分
        {
            name: 'app/main',
            exclude: ['../common']
        }

    ]
}
