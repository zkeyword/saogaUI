requirejs.config({
    baseUrl: 'resources/saogaUI/www/js/lib',
    paths: {
    	jquery: 'jquery-2.1.1.min',
		core: '../core',
        app:  '../app'
    }
});

require(['less-1.5.0.min']);