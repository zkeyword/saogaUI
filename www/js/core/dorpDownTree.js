define(['core/saogaUI'], function(saogaUI){
	
	'use strict';
	
	var dorpDownTree = function(options){
		var o = options || {};
		if(!o.target){return false;}
		var data       = o.data,
			target     = $(o.target),
			height     = o.height ? o.height : 'auto',
			selectedID = o.selected,
			isMultiple = o.isMultiple || false;
		
		
		var init = function(fn){
				target.html( createTreeHtml(data) );
				target.find('.l-treeItem').on('click',function(){
					var that = $(this),
						name = that.text(),
						val  = that.attr('data-value');
					target.find('.l-tree').attr({
						'data-name': name,
						'data-value': val
					});
					if( fn && saogaUI.base.isFunction(fn) ){
						fn(name, val);
					}
				});
			},
			refresh = function(data){
				target.html( createTreeHtml(data) );
			},
			createTreeHtml = function(data){
				var line = '',
					tree  = function(data, line, isOrigin){
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
								html +=	(line ? line : '');
								html += '<div class="l-treeItem" data-value='+ data[i].val +'>'+ data[i].name + '</div>';
							
							html += '</div>';
									
							if( data[i].chlidren ){
								html += '<div class="l-treeChildrenWrap fn-clear">'+ tree(data[i].chlidren, line+'<div class="l-treeBox l-treeLine"></div>', false) +'</div>';
							}
						}
												
						return html;
					};
				
				return '<div class="l-tree">'+ tree(data, line, true) +'</div>';
			};
		
		
		return {
			init: init,
			refresh: refresh
		};
	};
	
	return dorpDownTree;
});