define(['core/saogaUI','core/dorpDownTree'], function(saogaUI, dorpDownTree){
	var select = function(options){
		var o           = options,
			cls         = o.cls === undefined ? '' : o.cls,
			target      = $(o.target).wrap('<div class="ui-select '+ cls +'"></div>'),
			wrap        = target.parent(),
			initWrap    = wrap.append('<div class="arrow"></div><div class="ui-select-init"></div>').find('.ui-select-init'),
			itemWrap    = wrap.append('<div class="ui-select-itemWrap fn-hide"></div>').find('.ui-select-itemWrap'),
			arrow       = wrap.find('.arrow'),
			downHeight  = o.downHeight === undefined ? null :300,
			downWidth   = o.downWidth || 300,
			isTree      = o.isTree === undefined ? false : o.isTree,
			initVal     = o.initVal,
			data        = o.data,
			selectedID  = o.selectedID,
			onclickItem = o.onclickItem,
			onloadFn    = o.onloadFn,
			isShow      = false;
		
		initWrap.click(function(e){
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
		arrow.click(function(e){
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
		/*$(window).on('click', function(){
			if( isShow ){
				itemWrap.addClass('fn-hide');
				isShow = false;
			}
		});*/
		
		
		if( !isTree ){
			$.each(data, function(i, item){
			
				if( initVal == item.value ){
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
				onclickItem: function(name, id, pid){
					
					target.val( id );
					initWrap.attr('data-value', id)
							.html( name );
					
					itemWrap.addClass('fn-hide');
					
					if( onclickItem && saogaUI.base.isFunction(onclickItem)  ){
						onclickItem(name, id, pid);
					}
				},
				onloadFn: function(obj){
					itemWrap.height(downHeight)
							.width(downWidth);
					initWrap.attr('data-value', obj.val)
							.html( obj.name );
					if( onloadFn && saogaUI.base.isFunction(onloadFn)  ){
						onloadFn(selected);
					}
				}
			});
		}
		
	};
	
	return function(options){
		select(options);
	};
});