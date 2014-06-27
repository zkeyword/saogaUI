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
	saogaUI.ui.grid         = require('core/gird');
	
	$(function () {
		SetCopyrightWidth();
		$(window).resize(function () {
			SetCopyrightWidth();
		});
	});
	
	//版权中间块宽度
	function SetCopyrightWidth() {
		$("#copyright").css({ "width": $('#lt-footer').outerWidth() - $('#footer-left').outerWidth()-$('#footer-right').outerWidth()});
	}
	
	return saogaUI;
});
