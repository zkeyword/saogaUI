define(['core/saogaUI'], function(saogaUI){
	
	'use strict';
	
	var dorpDownTree = function(options){
		var o = options || {};
		if(!o.target){return false;}
		var g           = this,
			data        = o.data,
			target      = $(o.target),
			height      = o.height ? o.height : 'auto',
			selectedID  = o.selected,
			isMultiple  = o.isMultiple || false,
			onclickItem = o.onclickItem;
		
		var _core = {
				
			/**
			* 创建树对象
			*/
			createHtml: function(data){
				var line = '',
					node = '<div class="l-treeNode"></div>',
					tree = function(data, line, isOrigin){
						var i        = 0,
							len      = data.length,
							html     = '',
							selected;
	
						for(; i<len; i++){
							html += '<div class="l-treeItemWrap fn-clear'+ (selectedID == data[i].val ? ' l-treeSelected' : '') +'">';
								if( isOrigin ){
									html += '<div class="l-treeBox l-treeExpandable-open"></div>';
								}else{
									html += '<div class="l-treeBox l-treeLine"></div>';
								}
								html += (isMultiple ? '<div class="l-treeCheckbox"></div>' : '');
								
								//替换字符串，考虑修改
								html +=	(line ? line + node : '');
								html = html.replace('"></div><div class="l-treeNode"></div>', ' l-treeNode"></div>');
								
								html += '<div class="l-treeItem" data-value='+ data[i].val +'>'+ data[i].name +'</div>';
							
							html += '</div>';
									
							if( data[i].chlidren ){
								html += '<div class="l-treeChildrenWrap fn-clear">'+ tree(data[i].chlidren, line+'<div class="l-treeBox l-treeLine"></div>', false) +'</div>';
							}
						}
											
						return html;
					};
				
				target.html( '<div class="l-tree">'+ tree(data, line, true) +'</div>' );
			},
			
			onItem: function(){
				target.find('.l-treeItem').on('click',function(){
					var that = $(this),
						name = that.text(),
						val  = that.attr('data-value');
					target.find('.l-tree').attr({
						'data-name': name,
						'data-value': val
					});
					if( onclickItem && saogaUI.base.isFunction(onclickItem) ){
						onclickItem(name, val);
					}
				});
			},
			
			/**
			* 创建树对象
			*/
			run: function(){
				_core.createHtml(data);
				_core.onItem();
			}
		};
		
		g.init = function(){
			_core.run(data);
			return g;
		};
		
		g.refresh = function(){
			return g;
		};
		

	};
	
	return function(options){
		var tree = new dorpDownTree(options);
		return tree.init();
	};
});