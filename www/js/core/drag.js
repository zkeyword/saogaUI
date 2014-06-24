define(['core/saogaUI'],function(saogaUI){
	var drag = function(options){         //IE下 iframe内的的拖动还是有问题
	
		var o = options || {};
		if( !o.dragItem ) return false;
		var	dragItem = $('body').find(o.dragItem),
			dragWrap = $('body').find(o.dragWrap),
			win      = parent.document || document,
			mouse    = {x:0,y:0};
			
		function _moveDialog(e){
	        var e    = window.event || e,
				top  = dragWrap.css('top') == 'auto' ? 0 : dragWrap.css('top'),
				left = dragWrap.css('left') == 'auto' ? 0 : dragWrap.css('left');
				
	        dragWrap.css({
				top  : parseInt(top) + (e.clientY - mouse.y),
				left : parseInt(left) + (e.clientX - mouse.x)
			});
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	    };
	    dragItem.mousedown(function(e){
	        var e = window.event || e;
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	        $(win).bind('mousemove', _moveDialog);
			e.preventDefault(); //阻止默认动作
	    });
	    $(win).mouseup(function(event){
	        $(win).unbind('mousemove', _moveDialog);
	    });
	};
	
	saogaUI.drag = drag;
	
	return drag;
});