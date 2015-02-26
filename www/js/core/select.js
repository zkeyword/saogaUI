define(['core/saogaUI','core/dorpDownTree'], function(saogaUI, dorpDownTree){
	var select = function(options){
		var o           = options,
			id          = o.id || 'l-select-'+(new Date()).valueOf(),
			cls         = o.cls === undefined ? '' : o.cls,
			target      = $(o.target).wrap('<div class="ui-select '+ cls +'" id="'+ id +'"></div>'),
			wrap        = $('#'+id),
			initWrap    = wrap.append('<div class="arrow"></div><div class="ui-select-init"></div>').find('.ui-select-init'),
			itemWrap    = null,
			arrow       = wrap.find('.arrow'),
			top         = wrap.offset().top,
			left        = wrap.offset().left,
			height      = wrap.outerHeight(),
			downHeight  = o.downHeight === undefined ? 300 : o.downHeight,
			downWidth   = o.downWidth === undefined ? 300 : o.downWidth,
			disable     = o.disable === undefined ? false : o.disable,
			isTree      = o.isTree === undefined ? false : o.isTree,
			initVal     = o.initVal,
			data        = o.data,
			selectedID  = o.selectedID,
			onclickItem = o.onclickItem,
			onloadFn    = o.onloadFn,
			onParent    = o.onParent === undefined ? false : o.onParent,
			onChildren  = o.onChildren === undefined ? false : o.onChildren,
			isShow      = false,
			zIndex      = saogaUI.ui.zIndex();
		
		/*载入容器*/
		saogaUI.ui.wrap();
		
		itemWrap = $('#l-ui-wrap').prepend('<div class="l-select-wrap ui-select-itemWrap fn-hide" id="'+ id +'-wrap"></div>').find('#'+ id +'-wrap');

		itemWrap.css({
			'z-index':200000,
			position:'absolute',
			width: wrap.width(),
			top: top + height,
			left:left
		});
				
		wrap.click(function(e){
			e.stopPropagation();
			$('.ui-select-itemWrap').addClass('fn-hide');
			if( !isShow ){
				itemWrap.removeClass('fn-hide');
				isShow = true;
			}else{
				itemWrap.addClass('fn-hide');
				isShow = false;
			}
		});
		/*wrap.on('mouseover', function(){
			isShow = false;
		}).on('mouseout',function(){
			isShow = true;
		});*/
		
		
		$(window).on('click', function(){
			if( isShow && !disable ){
				itemWrap.addClass('fn-hide');
				isShow = false;
			}
		});
		
		if( !isTree ){
			$.each(data, function(i, item){
			
				if( initVal === item.value ){
					initWrap.attr('data-value', item.value)
							.html( item.name );
				}
				
				itemWrap.height(downHeight)
						.append('<div class="ui-select-item" data-value="'+ item.value +'">'+ item.name +'</div>')
						.find('.ui-select-item')
						.eq(i)
						.click(function(){
							var val  = $(this).attr('data-value'),
								name = $(this).html();
								
							target.val( val );
							initWrap.attr('data-value', val)
									.html( name );
							
							itemWrap.addClass('fn-hide');
						})
						.hover(function(){
							$(this).addClass('selected');
						},
						function(){
							$(this).removeClass('selected');
						});
			});

		}else{
			dorpDownTree({
				data: data,
				target: itemWrap,
				selectedID: selectedID,
				onclickItem: function(name, id, pid, that, isCategory){
					if( onParent && isCategory !== '0' ){
						target.val( id );
						initWrap.attr('data-value', id)
								.html( name );
						itemWrap.addClass('fn-hide');
					}
					
					if( !onChildren && isCategory === '0' ){
						target.val( id );
						initWrap.attr('data-value', id)
								.html( name );
						itemWrap.addClass('fn-hide');
						isShow = false;
					}
					
					if(onParent&&onChildren){
						target.val( id )
							  .attr('data-name', obj.name);
						initWrap.attr('data-value', id)
								.html( name );
						itemWrap.addClass('fn-hide');
						isShow = false;
					}
										
					if( onclickItem && saogaUI.base.isFunction(onclickItem)  ){
						onclickItem(name, id, pid, that, isCategory);
					}
					
				},
				onloadFn: function(obj){
					itemWrap.height(downHeight)
							.width(downWidth);
					
					if( obj ){
						target.val( obj.id )
							  .attr('data-name', obj.name);
						initWrap.attr('data-value', obj.val)
								.html( obj.name );
						if( onloadFn && saogaUI.base.isFunction(onloadFn)  ){
							onloadFn(obj);
						}
					}
					

					if( disable ){ 
						
						wrap.addClass('ui-select-disable');
						itemWrap.remove();
						
					}
				}
			});
		}
		
	};
	
	return function(options){
		select(options);
	};
});