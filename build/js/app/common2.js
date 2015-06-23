requirejs.config({
    baseUrl: '../js/lib',
    paths: {
    	jquery: 'jquery-1.8.3.min',
		core: '../core',
        app:  '../app',
        WdatePicker: 'My97DatePicker/WdatePicker'
    }
});

require(['less-1.5.0.min']);