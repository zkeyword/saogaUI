define(['core/saogaUI'], function(saogaUI){
	
	'use strict';
	
	var dorpDownTree = function(options){
		var o = options || {};
		if(!o.target){return false;}
		var g           = this,
			data        = o.data,
			target      = $(o.target),
			height      = o.height ? o.height : 'auto',
			selectedID  = o.selectedID,
			isOpen      = o.isOpen === undefined ? true : o.isOpen,
			isMultiple  = o.isMultiple || false,
			onclickItem = o.onclickItem,
			onloadFn    = o.onloadFn;
		
		
		var _core = {
				
			/**
			* 创建树对象
			*/
			createHtml: function(data){
				var line        = '',
					node        = '<div class="l-treeNode"></div>',
					isLastGroup,
					isChlidren,
					selected,
					tree        = function(data, line, isOrigin){
						var i    = 0,
							len  = data.length,
							html = '';
	
						for(; i<len; i++){

							var chlidrenObj      = data[i].chlidren,
								isLastNode       = ( i === len-1 ),
								isYoungerBrother = (data[i+1] !== undefined ? false : true);
							
							if( selectedID == data[i].id ){
								selected = data[i];
							}else{
								selected = data[0];
							}
							
							html += '<div class="l-treeItemWrap fn-clear'+ ( chlidrenObj ? ' l-treeParent' : ' l-treeLast' ) + (selectedID == data[i].id ? ' l-treeSelected' : '') +'">';
								if( isOrigin ){
									if( isLastNode ){
										html += '<div class="l-treeBox l-treeExpandableLast-open"></div><div class="l-treeBox l-treeIco"></div>';
										isLastGroup = true;
									}else{
										html += '<div class="l-treeBox l-treeExpandable-open"></div><div class="l-treeBox l-treeIco"></div>';
									}
								}else{
									html += '<div class="l-treeBox'+ (isLastGroup ? '' : ' l-treeLine') +'"></div>';
								}
								
								//html += (isMultiple ? '<div class="l-treeCheckbox"></div>' : '');
								
								//替换字符串，考虑修改
								html +=	(line ? line + node + '<div class="l-treeBox l-treeIco"></div>' : '');
								html = html.replace('l-treeLine"></div><div class="l-treeNode"></div>',(isLastNode ? 'l-treeLastNode' : 'l-treeNode') +'"></div>');
								if( isYoungerBrother && chlidrenObj  ){
									line = line.replace(' l-treeLine', '');
								}
								
								if( chlidrenObj && !isOrigin ){
									html = html.replace(/l-treeNode/g, 'l-treeExpandable-open');
									html = html.replace('l-treeLastNode', 'l-treeExpandableLast-open');
									html = html.replace(/<div class="l-treeBox l-treeExpandable-open"><\/div><div class="l-treeBox l-treeIcoLast"><\/div>/g,'<div class="l-treeBox l-treeNode"></div><div class="l-treeBox l-treeIcoLast"></div>');
								}else if( !chlidrenObj && !isOrigin ){
									html += '<div class="l-treeBox l-treeIcoLast"></div>';
									html = html.replace('<div class="l-treeBox l-treeIco"></div><div class="l-treeBox l-treeIcoLast"></div>', '<div class="l-treeBox l-treeIcoLast"></div>');
								}
								html += '<div class="l-treeItem" data-id='+ data[i].id +'>'+ data[i].name +'</div>';
							
							html += '</div>';
									
							if( chlidrenObj ){
								html += '<div class="l-treeChildrenWrap fn-clear" data-pid='+ data[i].id +'>'+ tree(chlidrenObj, line+'<div class="l-treeBox l-treeLine"></div>', false) +'</div>';
							}
						}
											
						return html;
					};
				
				target.html( '<div class="l-tree">'+ tree(data, line, true) +'</div>' );
				
				return selected;
			},
			
			onItem: function(){
				target.find('.l-treeItem').on('click',function(){
					var that = $(this),
						name = that.text(),
						id   = that.attr('data-id'),
						pid  = that.parents('.l-treeChildrenWrap').attr('data-pid');
					
					if( pid === undefined ){
						pid = '';
					}

					if( onclickItem && saogaUI.base.isFunction(onclickItem) ){
						onclickItem(name, id, pid);
					}
				});
			},
			
			/**
			* 创建树对象
			*/
			run: function(){
				var selected = _core.createHtml(data);
				
				/*初始化选中*/
				if( onloadFn && saogaUI.base.isFunction(onloadFn)  ){
					onloadFn(selected);
				}
				
				if( !isOpen ){
					target.find('.l-treeChildrenWrap').hide();
					target.find('.l-treeExpandable-open').addClass('l-treeExpandable-close');
					target.find('.l-treeExpandableLast-open').addClass('l-treeExpandableLast-close');
				}
				target.find('.l-treeExpandable-open').on('click',function(){
					var that = $(this);
					if( that.hasClass('l-treeExpandable-close') ){
						that.removeClass('l-treeExpandable-close');
						that.parent().next('.l-treeChildrenWrap').show();
					}else{
						that.addClass('l-treeExpandable-close');
						that.parent().next('.l-treeChildrenWrap').hide();
					}
				});
				target.find('.l-treeExpandableLast-open').on('click',function(){
					var that = $(this);
					if( that.hasClass('l-treeExpandableLast-close') ){
						that.removeClass('l-treeExpandableLast-close');
						that.parent().next('.l-treeChildrenWrap').show();
					}else{
						that.addClass('l-treeExpandableLast-close');
						that.parent().next('.l-treeChildrenWrap').hide();
					}
				});
				//target.find('.l-treeChildrenWrap .l-treeLast:last').addClass('l-treeLastNode')
				_core.onItem();
			}
		};
		
		g.init = function(){
			_core.run(data);
			return g;
		};

	};
	
	return function(options){
		var tree = new dorpDownTree(options);
		return tree.init();
	};
});