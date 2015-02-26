define(function(require){

	
	
	/**
	* 载入saogaUI
	*/
	var saogaUI             = require('core/saogaUI');
	saogaUI.template        = require('app/template');
	saogaUI.ui.drag         = require('core/drag');
	saogaUI.ui.dialog       = require('core/dialog');
	saogaUI.ui.pop          = require('core/pop');
	saogaUI.ui.tip          = require('core/tip');
	saogaUI.ui.tab          = require('core/tab');
	//saogaUI.ui.calendar     = require('core/calendar');
	saogaUI.ui.selectArea   = require('core/selectArea');
	saogaUI.ui.grid         = require('core/grid');
	saogaUI.ui.dorpDownTree = require('core/dorpDownTree');
	saogaUI.ui.tree         = require('core/tree_debug');
	saogaUI.ui.select       = require('core/select');
	saogaUI.ui.calendar     = require('core/calendar');
	
	saogaUI.ui.select2       = require('core/select_debug');
	
	/*表格下拉按钮*/
	saogaUI.app.btnDropdown = require('app/btnDropdown');
	
	saogaUI.ui.validator    = require('core/validator');

	/*页面常用*/
	require('app/common');
		
	return saogaUI;
});
