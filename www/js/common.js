requirejs.config({
    baseUrl: '/resources/saogaUI/www/js/lib',
    paths: {
    	jquery: 'jquery-1.8.3.min',
		core: '../core',
        app:  '../app'
    }
});

require(['less-1.5.0.min']);