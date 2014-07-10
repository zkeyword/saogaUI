define(['core/saogaUI'], function(saogaUI){
	
	/*页面高度*/
	$(function () {
		if( $('#lt-rightMain').length ){
			var win             = $(window),
				winHeight       = win.height(),
				footerHeight    = $('#lt-footer').outerHeight(),
				rightMain       = $('#lt-right'),
				rightMainTop    = rightMain[0].scrollTop;
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
			
			console.log(winHeight,rightMainTop,footerHeight,rightMain)
			
			rightMain.attr({'style':'min-height:'+(winHeight - rightMainTop - footerHeight -36 - 60)+'px'});
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
		console.log(isShow);
	});
	$('.ui-dropdown').click(function(event){
		event.stopPropagation();
	});
	$(document).on('click',function(){
		if( isShow ){
	   		$(".dropdown-toggle").siblings(".ui-dropdown").hide();
			isShow = false;
		}
	});
	
	//点击显示隐藏导航
	$("#rightMain-smallRight dt").on('click',function(){
		 if (! $(this).parent().find("dd").hasClass("fn-show")) {
	            $(".fn-show").hide("slow");
	            $(".fn-show").removeClass("fn-show");
	            $(".active").removeClass("active");
	            $(this).parent().find("dd").slideToggle('slow');
	            $(this).parent().find("dd").addClass("fn-show");
	            $(this).toggleClass("active");
	        }else{
	            $(this).parent().find("dd").slideToggle('slow');
	            $(this).removeClass("active");
	            $(".fn-show").removeClass("fn-show");
	        }
	});
});