requirejs.config({
    baseUrl: '../js/lib',
    paths: {
    	jquery: 'jquery-2.1.1.min',
		core: '../core',
        app:  '../app',
        WdatePicker: 'My97DatePicker/WdatePicker'
    }
});

require(['less-1.5.0.min']);