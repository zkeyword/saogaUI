define(function(require){
	var saogaUI  = require('core/saogaUI'),
		template = require('template'),
		drag     = require('core/drag'),
		dialog   = require('core/dialog');
	
	saogaUI.ui.drag   = drag;
	saogaUI.ui.dialog = dialog;
	saogaUI.template  = template;
	
	return saogaUI;
});
