requirejs.config({
    baseUrl: '../www/js/lib',
    //baseUrl: 'js/lib',
    paths: {
		core: '../core',
        app:  '../app'
    }
});

require(['less-1.5.0.min']);