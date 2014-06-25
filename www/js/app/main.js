define(function(require){
	var saogaUI   = require('core/saogaUI'),
		template  = require('template'),
		drag      = require('core/drag'),
		dialog    = require('core/dialog'),
		validator = require('core/validator')
	
	saogaUI.ui.drag   = drag;
	saogaUI.ui.dialog = dialog;
	saogaUI.template  = template;
	saogaUI.ui.validator = validator;
	
	return saogaUI;
});
