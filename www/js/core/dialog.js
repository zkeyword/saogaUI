define(['core/saogaUI', 'core/drag', 'i18n!core/nls/str'], function(saogaUI, drag, lang){
	var dialog = {
		init: function(options){
			var o             = options || {},
				title         = o.title || '',
				text          = o.text || '',
				btns          = o.btns || '',							          //按钮若为空，将默认
				type          = o.type || '',                                     //错误类型
				top           = o.top,
				left          = o.left,
				ok            = o.ok || '',
				no            = o.no || '',
				width         = o.width || 200,
				height        = o.height || 50,
				id            = o.id || 'l-dialog-' + (new Date()).valueOf(),      //随机id，多次调用可以用
				titleId       = 'l-dialog-title' + (new Date()).valueOf(),
				isMask        = o.isMask === undefined  || o.isMask,               //是否允许遮罩
				isMaskClose   = o.isMaskClose === undefined || o.isMaskClose,      //是否点击遮罩关闭
				allowClose    = o.allowClose === undefined || o.allowClose,        //允许关闭
				allowEscClose = o.allowEscClose === undefined || o.allowEscClose,  //允许esc关闭
				isDrag        = o.isDrag === undefined || o.isDrag;                //允许拖拽
			
			var h = '';
				h += '<div class="l-ui l-dialog-wrap" id="'+ id +'">';
				h += '	<table class="l-dialog-table">';
				h += '		<tr><td colspan="3" class="l-dialog-border l-dialog-border-top">&nbsp;</td></tr>';
				h += '		<tr>';
				h += '			<td class="l-dialog-border l-dialog-border-left">&nbsp;</td>';
				h += '			<td class="l-dialog-main"><div class="l-dialog-content" style="width:'+width+'px;height:'+height+'px">'+ text +'</div></td>';
				h += '			<td class="l-dialog-border l-dialog-border-right">&nbsp;</td>';
				h += '		</tr>';
				h += '		<tr><td colspan="3" class="l-dialog-border l-dialog-border-bottom">&nbsp;</td></tr>';
				h += '	</table>';
				h += '</div>';
			
			//载入容器
			saogaUI.ui.wrap();
			$('#l-ui-wrap').prepend(h);
			
			var zIndex        = saogaUI.ui.zIndex(),
				dialogWrap    = $('#'+id).css({'z-index':zIndex}),
				dialogMain    = dialogWrap.find('.l-dialog-main'),
				dialogContent = dialogWrap.find('.l-dialog-content');
			
			/*标题*/
			if( title ){
				dialogMain.prepend('<div class="l-dialog-title" id="'+titleId+'">'+ title +'</div>');
			}	
			
			/*类型标识*/
			if( type ){
				dialogMain.find('.l-dialog-content').addClass('l-dialog-'+type);
			}
			
			/*按钮*/
			var i             = 0,
				btnWrap       = dialogMain.append('<div class="ui-floatCenter l-dialog-btnWrap"><div class="ui-sl-floatCenter"></div></div>')
										  .find('.ui-floatCenter'),
				btnMain       = dialogMain.find('.ui-sl-floatCenter'),
				btnWrapHeight = btnWrap.height();	
			if( btns ){
				$.each(btns,function(i,item){
					btnMain.append('<a href="javascript:;" class="'+ (item.cls?'ui-btn ui-btnMain ui-floatCenter-item '+item.cls:'ui-btn ui-btnMain ui-floatCenter-item') +'"><span>'+item.text+'</span></a>');
					item.onclick && btnMain.find('a').eq(i).click(function(){
						item.onclick(i,item);
						saogaUI.ui.dialog.close(id);
					});
				});	
			}else{
				switch( type ){
					case 'alert':
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btnMain ui-floatCenter-item l-dialog-ok"><span>确定</span></a>');
						btnMain.find('.l-dialog-ok').click(function(){
							if( saogaUI.base.isFunction(ok) ){
								ok();
							}
							saogaUI.ui.dialog.close(id);
						});
						break;
					case 'confirm':
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btnMain ui-floatCenter-item l-dialog-ok"><span>确定</span></a><a href="javascript:;" class="ui-btn ui-btnMain ui-btnMain-cancel ui-floatCenter-item l-dialog-no"><span>取消</span></a>');
						btnMain.find('.l-dialog-ok').click(function(){
							if( saogaUI.base.isFunction(ok) ){
								ok();
							}
							saogaUI.ui.dialog.close(id);
						});
						btnMain.find('.l-dialog-no').click(function(){
							if( saogaUI.base.isFunction(no) ){
								no();
							}
							saogaUI.ui.dialog.close(id);
						});
						break;
					case 'error':
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btnMain ui-btnMain-cancel ui-floatCenter-item l-dialog-no"><span>取消</span></a>');
						btnMain.find('.l-dialog-no').click(function(){
							if( saogaUI.base.isFunction(no) ){
								no();
							}
							saogaUI.ui.dialog.close(id);
						});
						break;
				}//end switch
			}//end if
			
			
			/*位置*/
			var win  = $(window),
				top  = top || win.scrollTop() + win.height()/2 - dialogWrap.height()/2,
				left = left || ( win.width() - dialogWrap.width() )/2;
			dialogWrap.css({top:top,left:left});
			
			//saogaUI.base.log( dialogWrap.height() );
			
			/*遮罩*/
			if( isMask ){
				saogaUI.ui.lock();
			}
			
			/*拖拽*/
			if( isDrag ){
				drag({
					dragItem:'#'+titleId,
					dragWrap:'#'+id
				});
			}
			
			/*关闭*/
			if( allowClose ){
			
				/*添加关闭按钮*/
				var dialogClose = dialogMain.prepend('<div class="l-dialog-close">x</div>').find('.l-dialog-close');
				dialogClose.click(function(){
					saogaUI.ui.dialog.close(id);
				});
				
				/*点击遮罩关闭*/
				/* if( isMask && isMaskClose ){
					$('.l-ui-lock').click(function(){
						saogaUI.ui.dialog.close(id);
					});
				} */
			
				/*esc退出*/
				if( allowEscClose ){
					var _modalKey = function (e){
						e = e || event;
						var code = e.which || event.keyCode;
						if(code === 27){
							saogaUI.ui.dialog.close(id);
						}
					};
					
					if(document.attachEvent){
						document.attachEvent('onkeydown', _modalKey);
					}else{
						document.addEventListener('keydown', _modalKey, true);
					}
				}
			}// end if( allowClose )
		},
		
		/**
		* 关闭释放
		* @member saogaUI.ui.dialog
		*/
		close: function(id){
			if( id ){
				$('#'+id).remove();
			}else{
				$('.l-dialog-wrap').remove();
			}
			if( !$('.l-ui-mask').length ){
				saogaUI.ui.unlock();
			}
		},
		
		/**
		* alert
		* @member saogaUI.ui.dialog
		*/
		alert: function(options){
			var o     = options || {},
				title = o.title || lang.alert,
				text  = o.text || '',
				ok    = o.ok || '';
			this.init({
				title:title,
				text:text,
				type:'alert',
				ok:ok
			});
		},
		
		/**
		* confirm
		* @member saogaUI.ui.dialog
		*/
		confirm: function(options){
			var o     = options || {},
				title = o.title || lang.confirm,
				text  = o.text || '',
				ok    = o.ok || '',
				no    = o.no || '';
			this.init({
				title:title,
				text:text,
				type:'confirm',
				ok:ok,
				no:no
			});
		},
		
		/**
		* error
		* @member saogaUI.ui.dialog
		*/
		error: function(options){
			var o     = options || {},
				title = o.title || '',
				text  = o.text || lang.error,
				no    = o.no || '';
			this.init({
				title:title,
				text:text,
				type:'error',
				no:no
			});
		},
		
		/**
		* 小提示框
		* @member saogaUI.ui.dialog
		*/
		prompt: function(options){
			var o        = options || {},
				id       = o.id || 'l-dialog-' + (new Date()).valueOf(),
				top      = o.top,
				left     = o.left,
				cls      = o.cls || '',                          //自定义Class
				text     = o.text || '',                         //提示内容
				isMask   = o.isMask || true,                     //是否允许遮罩
				showTime = o.showTime || 2000,                   //显示时间，默认2秒
				endFn    = o.endFn || '',                        //关闭后需要执行的函数
				width    = o.width || '',
				height   = o.height || 'auto';
			
			//载入容器
			saogaUI.ui.wrap();
			var h = '';
			h += '<div class="l-ui l-dialog-wrap" id="'+ id +'">';
			h += '	<div class="l-dialog-prompt">'+ text +'</div>';
			h += '</div>';
			$('#l-ui-wrap').prepend(h);
			var zIndex     = saogaUI.ui.zIndex(),
				dialogWrap = $('#'+id).css({'width':width,'height':height,'z-index':zIndex});
			
			//位置
			var win  = $(window),
				top  = top || win.scrollTop() + win.height()/2 - dialogWrap.height()/2,
				left = left || ( win.width() - dialogWrap.width() )/2;
			dialogWrap.css({top:top,left:left});		
			
			//遮罩
			if( isMask ){
				saogaUI.ui.lock();
			}
			
			//关闭
			function show(){
				saogaUI.ui.dialog.close(id);
				if( endFn && typeof endFn === 'function' ){
					endFn();
				}
			};
			setTimeout(show,showTime);
			
		}
			
	};
	
	//saogaUI.ui.dialog = dialog;
	
	return dialog;
	
});