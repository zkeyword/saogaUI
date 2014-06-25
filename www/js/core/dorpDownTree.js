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
		
		
		var init = function(){
				target.html( createTreeHtml(data) );
				target.find('.l-treeItem').on('click',function(){
					var that = $(this);
					target.find('.l-tree').attr({
						'data-value': that.attr('data-value'),
						'data-name': that.text()
					});
				});
			},
			refresh = function(data){
				target.html( createTreeHtml(data) );
			},
			createTreeHtml = function(data){
				var depth = 0,
					tip = false,
					tree  = function(data, isChildren){
						var i        = 0,
							len      = data.length,
							html     = '',
							line = '',
							selected;
						
						for(var j = 0; j<depth; j++){
							line += '<div class="l-line">d</div>';
						}
						for(; i<len; i++){
						

							html += '<div class="l-treeItemWrap fn-clear'+ (selectedID == data[i].val ? ' l-treeSelected' : '') +'">'+
										//(isChlidren ? '<div class="l-treeExpandable"></div>' : '')+
										(isMultiple ? '<div class="l-treeCheckbox"></div>' : '')+
										(line ? line : '')+
										'<div class="l-treeItem" data-value='+ data[i].val +'>'+ data[i].name + '</div>'+ 
									'</div>';
									
							if( data[i].chlidren ){
								depth ++;
								console.log(depth,'chlidren')
								html += '<div class="l-treeChildrenWrap fn-clear">'+ tree(data[i].chlidren, line, true) +'</div>';
							}else{
								// if( depth  == 0 ){
									// depth ++;
								// }
								// depth --;
							}
							console.log(depth + data[i].name)
						}
						
						//console.log();
						
						return html;
					};
				
				return '<div class="l-tree">'+ tree(data) +'</div>';
			};
		
		
		return {
			init: init,
			refresh: refresh
		};
	};
	
	return dorpDownTree;
});