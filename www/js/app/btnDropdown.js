define(['core/saogaUI'], function(saogaUI){

	var btnDropdown = function(options){
		
		var isShow = false,
			win    = $(window),
			target = options.target,
			menu   = $(options.menu);

		$('body').on('click', target, function(e){
			e.stopPropagation();
			if( !isShow ){
				$(this).parent().next(options.menu).removeClass('fn-hide');
				isShow = true;
			}else{
				$(this).parent().next(options.menu).addClass('fn-hide');
				isShow = false;
			}
		});
		menu.find('li').on('click',function(e){
			menu.addClass('fn-hide');
		});
		win.on('click', function(){
			if( isShow ){
				menu.addClass('fn-hide');
				isShow = false;
			}
		});
		
	};

	return btnDropdown;

});