define(function(require){
	
	/**
	* 载入saogaUI
	*/
	var saogaUI             = require('core/saogaUI');
	saogaUI.template        = require('template');
	saogaUI.ui.drag         = require('core/drag');
	saogaUI.ui.dialog       = require('core/dialog');
	saogaUI.ui.pop          = require('core/pop');
	saogaUI.ui.tip          = require('core/tip');
	saogaUI.ui.tab          = require('core/tab');
	saogaUI.ui.calendar     = require('core/calendar');
	saogaUI.ui.validator    = require('core/validator');
	saogaUI.ui.selectArea   = require('core/selectArea');
	saogaUI.ui.grid         = require('core/grid');
	saogaUI.ui.calendar     = require('core/calendar');
	saogaUI.ui.tree         = require('core/tree');
	saogaUI.ui.select2      = require('core/select');
	saogaUI.ui.check        = require('core/check');
	saogaUI.ui.btnDropdown  = require('core/btnDropdown');
	saogaUI.ui.btnSwitch    = require('core/btnSwitch');
	
	return saogaUI;
});