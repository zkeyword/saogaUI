requirejs.config({
    baseUrl: '/static/asset/dest/js/lib/',
    paths: {
		core: '../core',
        app:  '../app',
    	jquery: '../app/jquery'
    },
    shims:{
    	'app/jquery.from' : ['jquery'],
    	'app/jquery.pagination' : ['jquery'],
    	/*'app/jquery.ztree.all-3.5.min' : {
    		deps: ['jquery'],
    		exports: '$.fn.zTree'
    	},*/
    	'app/kindeditor/kindeditor.js': {
    		exports: 'KindEditor'
    	}
    }
	//,urlArgs: "bust=" + (new Date()).getTime()
});


/*requirejs.onError = function(err){
    console.log(err);
};*/