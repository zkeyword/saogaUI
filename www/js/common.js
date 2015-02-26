requirejs.config({
    baseUrl: '/saogaUI/build/js/lib',
    paths: {
    	jquery: 'jquery-1.8.3.min',
		core: '../core',
        app:  '../app'
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
});


/*requirejs.onError = function(err){
    console.log(err);
};*/