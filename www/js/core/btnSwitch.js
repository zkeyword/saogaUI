define(['core/saogaUI'], function(saogaUI){
	
	'use strict';
		
	/**
	* TODO
	* saogaUI.ui.validator
	* @class saogaUI.ui.validator
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 
    * @param {String} o.id 
	* @return {Object} select对象
	*/
	
	var BtnSwitch = function(o){
		
		var 
			/**
			* 默认配置
			*/
			p = {
				target: null,
				open: null,
				close: null
			},
			
			/**
			* 代码逻辑
			*/
			c = {
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
							p[key] = o[key];
						}
					}

					var isFunction    = saogaUI.base.isFunction,
						onselectstart = saogaUI.ui.onselectstart;
						
					$('body')
						.off('click', p.target)
						.on('click', p.target, function(e){
							var that   = onselectstart( $(e.currentTarget) ),
								isOpen = that.hasClass('ui-btn-switch-open');

							if(isOpen){
								if( p.close ){
									if( p.close.ajax ){
										$.ajax({
											type: 'POST',
											url: p.close.ajax.url,
											data: p.close.ajax.data,
											async: false,
											success: function(html){
												if( isFunction(p.open.run) ){
													p.close.run();
												}
											}
										});
									}else{
										if( isFunction(p.open.run) ){
											p.close.run();
										}
									}
								}
								that.removeClass('ui-btn-switch-open')
									.addClass('ui-btn-switch-close')
									.find('em')
									.html('已关闭');
							}else{
								if( p.open ){
									if( p.open.ajax ){
										$.ajax({
											type: 'POST',
											url: p.open.ajax.url,
											data: p.open.ajax.data,
											async: false,
											success: function(html){
												if( isFunction(p.open.run) ){
													p.open.run();
												}
											}
										});
									}else{
										if( isFunction(p.open.run) ){
											p.open.run();
										}
									}
								}
								that.removeClass('ui-btn-switch-close')
									.addClass('ui-btn-switch-open')
									.find('em')
									.html('已开启');
							}
						});
				}
			};

		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new BtnSwitch(o);
	};
});