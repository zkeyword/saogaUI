define(['core/saogaUI'], function(saogaUI){

	var btnDropdown = function(options){
		
		var isShow = false,
			target = $(options.target),
			menu   = $(options.menu);
		
		target.on('click',function(e){
			e.stopPropagation();
			if( !isShow ){
				$(this).find(options.menu).removeClass('fn-hide');
				isShow = true;
			}else{
				$(this).find(options.menu).addClass('fn-hide');
				isShow = false;
			}
		});
		menu.find('li').on('click',function(e){
			menu.addClass('fn-hide');
		});
		$(window).on('click', function(){
			if( isShow ){
				menu.addClass('fn-hide');
				isShow = false;
			}
		});
		
	};

	return btnDropdown;

});