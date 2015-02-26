define(['app/saogaUI'], function(saogaUI){
	
	/* 页面高度 */
	if( $('#lt-sl-right').length ){
		var headerHeight  = $('#lt-header').outerHeight(),
			footerHeight  = $('#lt-footer').outerHeight(),
			rightMain     = $('#lt-sl-right'),
			rightHeightFn = function(){
				var win         = $(window);
					winHeight   = win.height(),
					rightHeight = winHeight - headerHeight - footerHeight;
					
				rightMain.css({'minHeight':rightHeight});
				win.resize(function(){
					win         = $(window);
					winHeight   = win.height();
					rightHeight = winHeight - headerHeight - footerHeight;
					if( rightHeight > 500 ){
						rightMain.css({'minHeight':rightHeight});
					}
					
				});
			}
			
		rightHeightFn();
	}
	
	/*菜单*/
	$('#menuList .itemTitle').click(function(){
		var that            = $(this),
			parent          = that.parent(),
			arrow           = that.find('.lastIcon'),
			submenu         = that.next('.submenu'),
			siblings        = parent.siblings(),
			siblingsArrow   = siblings.find('.lastIcon'),
			siblingsSubmenu = siblings.find('.submenu');
			
		if( parent.hasClass('on') ){
			parent.removeClass('on');
			arrow
				.addClass('icon-angle-down')
				.removeClass('icon-angle-up');
			submenu.slideUp(300);
		}else{
			parent.addClass('on');
			arrow
				.addClass('icon-angle-up')
				.removeClass('icon-angle-down')
			submenu.slideDown(300);
		}
		siblings.removeClass('on');
		siblingsSubmenu.slideUp(300);
		siblingsArrow
			.addClass('icon-angle-down')
			.removeClass('icon-angle-up');
		saogaUI.ui.onselectstart(parent);
	});

		
	/* 底部 */
	setTimeout(function(){
		if( $('#footer-left').length && $('#footer-advisor').length ){
			$('#footer-left').html(saogaUI.template('footer-advisor', null));
		}
	}, 1000);
		
	/*点击显示下拉框*/
	var isShow = false;
	$('#user').on('click', ' .text',function(e){
		e.stopPropagation();
		var userOption = $("#userOption"),
			lastIcon   = $("#user .lastIcon");
			
		if( !isShow ){
			userOption.fadeIn(200);
			lastIcon
				.addClass('icon-angle-up')
				.removeClass('icon-angle-down');
			isShow = true;
		}else{
			userOption.fadeOut(200);
			lastIcon
				.addClass('icon-angle-down')
				.removeClass('icon-angle-up');
			isShow = false;
		}
	});
	$('#userOption').click(function(e){
		e.stopPropagation();
	});
	$(document).on('click',function(){
		if( isShow ){
	   		$("#userOption").fadeOut(200);
			$("#user .lastIcon")
				.addClass('icon-angle-down')
				.removeClass('icon-angle-up');
			isShow = false;
		}
	});
	
	saogaUI.ui.btnDropdown({
		target:'.ui-btn-dropdown-icon',
		menu:'.ui-btn-dropdown-menu'
	 });
	 
	 saogaUI.ui.btnDropdown({
		target:'.ui-btn',
		menu:'.ui-btn-dropdown-menu'
	 });
	
	
});