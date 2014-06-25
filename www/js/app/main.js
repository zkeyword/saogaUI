define(function(require){
	var saogaUI      = require('core/saogaUI');

	saogaUI.template        = require('template');
	saogaUI.ui.drag         = require('core/drag');
	saogaUI.ui.dialog       = require('core/dialog');
	saogaUI.ui.validator    = require('core/validator');
	saogaUI.ui.dorpDownTree = require('core/dorpDownTree');
	
	return saogaUI;
});
