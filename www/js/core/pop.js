define(['core/saogaUI'], function(){

	var pop = {
	
		/**
		* 初始化弹出框
		* @member saogaUI.ui.pop
		*/
		open: function(options){
			var o = options || {};
			var id            = o.id || 'l-pop-'+(new Date()).valueOf(),
				titleid       = 'l-pop-title-'+(new Date()).valueOf(),
				title         = o.title || '',                                     //弹出框的标题
				width         = o.width || 500,                                    //弹出框内部的宽，不包括边框的宽度
				height        = o.height || 300,                                   //弹出框内部的高，不包括边框的高度
				top           = o.top,                                             //弹出框的top
				left          = o.left,                                            //弹出框的left
				cls           = o.cls || '',                                       //定义class
				url           = o.url || '',                                       //用iframe方式加载
				ajax          = o.ajax || '',                                      //用ajax方式加载
				html          = o.html || '',                                      //用html方式加载
				onloadFn      = o.onloadFn,                                        //载入时要触发的事件
				closeFn       = o.closeFn,                                         //关闭时要触发的事件
				btns          = o.btns || '',                                      //弹出框的按钮集合
				isMask        = o.isMask === undefined  || o.isMask,               //是否允许遮罩,默认true
				isMaskClose   = o.isMaskClose === undefined || o.isMaskClose,      //是否点击遮罩关闭,默认true
				allowClose    = o.allowClose === undefined || o.allowClose,        //允许关闭,默认true
				allowEscClose = o.allowEscClose === undefined || o.allowEscClose,  //允许esc关闭,默认true
				isDrag        = o.isDrag === undefined || o.isDrag;                //允许拖拽,默认true
										
			var h = '';
				h += '<div class="l-ui l-pop-wrap" id="'+ id +'">';
				h += '	<table class="l-pop-table">';
				h += '		<tr><td colspan="3" class="l-pop-border l-pop-border-top"></th></tr>';
				h += '		<tr>';
				h += '			<td class="l-pop-border l-pop-border-left"></td>';
				h += '			<td class="l-pop-main"><div class="l-pop-content"></div></td>';
				h += '			<td class="l-pop-border l-pop-border-right"></td>';
				h += '		</tr>';
				h += '		<tr><td colspan="3" class="l-pop-border l-pop-border-bottom"></td></tr>';
				h += '	</table>';
				h += '</div>';
				
			/*载入容器*/
			saogaUI.ui.wrap();
			$('#l-ui-wrap').prepend(h);
			
			var zIndex     = saogaUI.ui.zIndex(),
				popWrap    = $('#'+id).css({'z-index':zIndex}),
				popMain    = popWrap.find('.l-pop-main'),
				popContent = popWrap.find('.l-pop-content');
				
			/*标题*/
			if( title ){
				popMain.prepend('<div class="l-pop-title" id="'+ titleid +'">'+ title +'</div>');
				var popTitle       = popMain.find('.l-pop-title'),
					popTitleHeight = popTitle.height();
			}
	
			/*按钮集*/
			if( btns ){
				var i       = 0,
				    btnWrap = popMain.append('<div class="ui-floatCenter l-pop-btnWrap"><div class="ui-sl-floatCenter"></div></div>')
				    				 .find('.ui-floatCenter'),
				    btnMain = btnWrap.find('.ui-sl-floatCenter');			
				$.each(btns,function(i,item){
					btnMain.append('<a href="javascript:;" class="'+ (item.cls?'ui-btn ui-btnMain ui-floatCenter-item '+item.cls:'ui-btn ui-btnMain ui-floatCenter-item') +'"><span>'+item.text+'</span></a>');
					item.onclick && btnMain.find('a').eq(i).click(function(){
						item.onclick(i,item,id);
						saogaUI.ui.pop.close(id);
					});
				});		
				var popBtnsHeight = btnWrap.height();
			}
			
			/*内容*/
			var popHeight = height - ( popTitleHeight || 0 ) - ( popBtnsHeight || 0 );
			popContent.css({width:width,height:popHeight});
			if( url ){
				popContent.append('<iframe src="'+ url +'" id="l-pop-iframe" frameborder="no" border="0" style="width:'+ width +'px;height:'+ popHeight +'px"></iframe>').addClass('l-pop-contentIframe');
			}else if( ajax ){
				$.ajax({
					url     : ajax,
					cache   : false,
					success : function(data){
						popContent.append(data);
					}
				}); 
			}else if( html ){
				popContent.append(html);
			};
			
			/*位置*/
			var win  = $(window),
				top  = top || win.scrollTop() + win.height()/2 - popWrap.height()/2,
				left = left || ( win.width() - popWrap.width() )/2;
			popWrap.css({top:top, left:left});
			
			/*遮罩*/
			if( isMask ){
				saogaUI.ui.lock();
			}
	
			/*拖拽*/
			if( isDrag ){
				saogaUI.ui.drag({
					dragItem:'#'+titleid,
					dragWrap:'#'+id
				});
			}
			
			/*载入时要触发的事件*/
			if( saogaUI.base.isFunction(onloadFn) ){
				onloadFn(id);
			}
			
			/*关闭*/
			if( allowClose ){
			
				/*添加关闭按钮*/
				popMain.prepend('<div class="l-pop-close">x</div>');
				$('.l-pop-close').click(function(){
				
					/*关闭时要触发的事件*/
					if( saogaUI.base.isFunction(closeFn) ){
						closeFn(id);
					}
					
					saogaUI.ui.pop.close(id);
				});
				
				/*点击遮罩关闭*/
				if( isMask && isMaskClose ){
					$('.l-ui-lock').click(function(){
						
						/*关闭时要触发的事件*/
						if( saogaUI.base.isFunction(closeFn) ){
							closeFn(id);
						}
						
						saogaUI.ui.pop.close(id);
					});
				}
			
				/*esc退出*/
				if( allowEscClose ){
					var _modalKey = function(e){
						e = e || event;
						var code = e.which || event.keyCode;
						if(code == 27){
						
							/*关闭时要触发的事件*/
							if( saogaUI.base.isFunction(closeFn) ){
								closeFn(id);
							}
							
							saogaUI.ui.pop.close(id);
						}
					};
					
					if(document.attachEvent){
						document.attachEvent('onkeydown', _modalKey);
					}else{
						document.addEventListener('keydown', _modalKey, true);
					}
					
				}
			}//end if ( allowClose )
		},
		
		/**
		* 修改弹出框大小
		* @member saogaUI.ui.pop
		*/
		modifyWrap: function(id,height,type){
			if( type === 'iframe' ){
				var pop = $('#'+id,window.parent.document).find('.l-pop-contentIframe').height(height)
														  .find('#l-pop-iframe').height(height);
			}else{
				var pop = $('#'+id).find('.l-pop-content').height(height);
			}
		},
		
		/**
		* 关闭释放
		* @member saogaUI.ui.pop
		*/
		close: function(id){
			if(id){
				$('#'+id).remove();
			}else{
				$('.l-pop-wrap').remove();
			}
			if( !$('.l-ui-mask').length ){
				saogaUI.ui.unlock();
			}
		}
	};
	
	return pop;
});