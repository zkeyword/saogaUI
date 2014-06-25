define(['core/saogaUI'], function(saogaUI){
	
	'use strict';
	
	var dorpDownTree = function(options){
		var o = options || {};
		if(!o.target){return false;}
		var data       = o.data,
			target     = $(o.target),
			height     = o.height ? o.height : 'auto',
			isMultiple = o.isMultiple || false;
		
		
		var init = function(){
				target.html( createHtml(data) );
			},
			refresh = function(){
				
			},
			createHtml = function(data){
				var tree = function(data, isChlidren){
						var i    = 0,
							len  = data.length,
							html = '';
						for(; i<len; i++){
							html += '<div class="l-treeItem">'+
										(isChlidren ? '<div class="l-treeExpandable"></div>' : '')+
										(isMultiple ? '<div class="l-treeCheckbox"></div>' : '')+
										'<div data-value='+ data[i].val +'>'+ data[i].name + '</div>'+ 
									'</div>';
							if( data[i].chlidren ){
								html += '<div class="l-treeChildWrap">'+ tree(data[i].chlidren, true) +'</div>';
							}
							
						}
						return html;
					};
				
				return '<div class="l-tree">'+ tree(data) +'</div>';
			};
		
		
		return {
			init: init
		};
	};
	
	return dorpDownTree;
});