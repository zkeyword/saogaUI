define(function(require){
	
	/**
	* 载入saogaUI
	*/
	var cncnERP             = require('core/cncnERP');
	
	cncnERP.template        = require('template');
	cncnERP.ui.validator    = require('core/validator');
	saogaUI.ui.drag         = require('core/drag');
	saogaUI.ui.dialog       = require('core/dialog');
	saogaUI.ui.pop          = require('core/pop');
	saogaUI.ui.tab          = require('core/tab');
	saogaUI.ui.upload       = require('core/upload');
	saogaUI.ui.grid         = require('core/grid');
	saogaUI.ui.gridFree     = require('core/gridFree');
	
	return cncnERP;
	
});