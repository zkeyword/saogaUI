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
	saogaUI.ui.grid         = require('core/grid');
	saogaUI.ui.dorpDownTree = require('core/dorpDownTree');
	saogaUI.ui.select      = require('core/select');
	saogaUI.app.btnDropdown = require('app/btnDropdown');
	
	
	$(function () {
		if( $('#lt-rightMain').length ){
			var win             = $(window),
				winHeight       = win.height(),
				footerHeight    = $('#lt-footer').outerHeight(),
				rightMain       = $('#lt-rightMain'),
				rightMainOffset = rightMain.offset(),
				rightMainTop    = rightMainOffset.top;
				/*rightMainHeight = function(){
					
					var winHeight = win.height(),
						height    = 760;
					if( winHeight > height ){
						rightMain.height(winHeight - rightMainTop - footerHeight - 36 - 20 );
					}else{
						rightMain.height(height);
				}*/
			
			/*rightMainHeight();
			win.resize(function(){
				rightMainHeight();
			});*/
			
			rightMain.attr({'style':'min-height:'+(winHeight - rightMainTop - footerHeight - 36 - 20)+'px'});
		}
	});
	//点击显示下拉框
	var isShow = false;
	$(".dropdown-toggle").on("click",function(event){
		event.stopPropagation();
		if( !isShow ){
			$(".ui-dropdown").hide();
       		$(this).siblings(".ui-dropdown").show();
			isShow = true;
		}else{
			$(this).siblings(".ui-dropdown").hide();
			isShow = false;
		}
		console.log(isShow)
    });
	$('.ui-dropdown').click(function(event){
		event.stopPropagation();
	})
	$(document).on('click',function(){
		if( isShow ){
       		$(".dropdown-toggle").siblings(".ui-dropdown").hide();
			isShow = false;
		}
	})
	
	return saogaUI;
});
