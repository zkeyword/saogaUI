define(['core/saogaUI'],function(saogaUI){
	
	'use strict';
	
	/**
	* saogaUI.ui.drag 拖拽控件
	* @class saogaUI.ui.drag
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options drag参数
    * @param {String} options.dragItem 拖拽触发对象选择器
    * @param {String} options.dragWrap 拖拽移动对象选择器
	*/
	var drag = function(options){         //IE下 iframe内的的拖动还是有问题
	
		var o = options || {};
		if( !o.dragItem ){return false;}
		var	dragItem = $('body').find(o.dragItem),
			dragWrap = $('body').find(o.dragWrap),
			win      = parent.document || document,
			mouse    = {x:0,y:0};
			
		function _moveDialog(e){
	        e = window.event || e;
	        
	        var top  = dragWrap.css('top') === 'auto' ? 0 : dragWrap.css('top'),
				left = dragWrap.css('left') === 'auto' ? 0 : dragWrap.css('left');
				
	        dragWrap.css({
				top  : parseInt(top) + (e.clientY - mouse.y),
				left : parseInt(left) + (e.clientX - mouse.x)
			});
	        
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	    }
		
	    dragItem.mousedown(function(e){
	        e = window.event || e;
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	        $(win).bind('mousemove', _moveDialog);
	        
	        if(e.preventDefault){
	        	e.preventDefault();
        	}else{
        		e.returnValue = false;
        	}
	    });
	    
	    $(win).mouseup(function(event){
	        $(win).unbind('mousemove', _moveDialog);
	    });
	};
	
	saogaUI.drag = drag;
	
	return drag;
});