define(function(require){
	var saogaUI      = require('core/saogaUI');

	saogaUI.template        = require('template');
	saogaUI.ui.drag         = require('core/drag');
	saogaUI.ui.dialog       = require('core/dialog');
	saogaUI.ui.pop          = require('core/pop');
	saogaUI.ui.tip          = require('core/tip');
	saogaUI.ui.tab          = require('core/tab');
	saogaUI.ui.calendar     = require('core/calendar');
	saogaUI.ui.validator    = require('core/validator');
	saogaUI.ui.dorpDownTree = require('core/dorpDownTree');
	saogaUI.ui.selectArea   = require('core/selectArea');
	saogaUI.ui.grid         = require('core/grid');
	saogaUI.app.btnDropdwon = require('app/btnDropdown');
	
	return saogaUI;
});
