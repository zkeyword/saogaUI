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
	saogaUI.ui.selectArea   = require('core/selectArea');
	//saogaUI.ui.grid         = require('core/grid');
	saogaUI.ui.grid         = require('core/grid_debug');
	saogaUI.ui.dorpDownTree = require('core/dorpDownTree');
	saogaUI.ui.select       = require('core/select');
	
	/*表格下拉按钮*/
	saogaUI.app.btnDropdown = require('app/btnDropdown');
	
	/*ajax分页插件*/
	require('jquery.pagination');
	
	/*表单验证*/
	require('jquery.validate.min');
	
	/*表单无刷提交*/
	require('jquery.form');
	
	/*日期控件*/
	require('WdatePicker');
	
	/*页面常用*/
	require('app/common');
	
	return saogaUI;
});
