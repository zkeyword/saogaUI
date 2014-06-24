define(function(){

	var tip = function(options){
		var o = options || {};
		var id                = o.id || 'l-tip-'+(new Date()).valueOf(),
			tipItem           = $(o.tipItem),
			tipItemWidth      = tipItem[0].offsetWidth,
			tipItemHeight     = tipItem[0].offsetHeight,
			tipItemTop        = tipItem.offset().top,
			tipItemLeft       = tipItem.offset().left,
			attrTitle         = tipItem.attr('title'),
			tipItemWrap       = $(o.tipItemWrap||'body'),        //tipItem的最外层，默认网页的最外层为body，因为有可能在其他元素中定位
			tipItemWrapWidth  = tipItemWrap[0].offsetWidth,
			tipItemWrapHeight = tipItemWrap[0].offsetHeight,
			text              = o.text || attrTitle,             //tip的内容
			width             = o.width || 150,
			tipHeader         = o.tipHeader,                     //tip是否有标题
			isTrack           = o.isTrack || false,              //是否鼠标跟随
			isArrow           = o.isArrow || false,              //是否需要箭头
			arrowDirection    = o.arrowDirection || 'topBottom', //设箭头位置，默认是向上向下，可选是向左向右
			isInitShow        = o.isInitShow || false,           //初始化显示tip
			event             = o.event || 'mouseover';          //触发显示tip
		
		if( !text ){return;}
		
		var tipFn = {
			init: function(){
				if( $('#'+id).length ){ return; }
				if( tipItem ){ tipItem.removeAttr('title'); }
				var h = '';
					h += '<div id="'+ id +'" class="l-ui l-tip">';
					h += '<div class="l-tipMain">';
					if( tipHeader ){
						h += '<h5>'+ tipHeader +'</h5>';
					}
					h += '<div class="l-tipMain-text">'+ text +'</div>';
					h += '</div></div>';
			
				/*载入容器*/
				saogaUI.ui.wrap();
				$('#l-ui-wrap').prepend(h);
				var zIndex  = saogaUI.ui.zIndex(),
					tipWrap = $('#'+id).css({'width':width,'z-index':zIndex});
			},
			
			/*默认位置*/
			defaultPositon: function(){
				this.init();
				var tipWrap = $('#'+id).addClass('l-tip-default'),
					top     = 0,
					left    = 0;
				left = tipItemLeft;
				top = tipItemTop + tipItemHeight + 5;
				tipWrap.css({top:top,left:left});
			},
			
			/*鼠标跟随*/
			track: function(){
				this.init();
				var tipWrap       = $('#'+id).addClass('l-tip-track'),
					mousePosition = saogaUI.ui.mousePosition();
				tipWrap.css({top:mousePosition.positionY + 5,left:mousePosition.positionX  + 5});
			},
			
			/*带箭头*/
			arrow:function(){
				this.init();
				var tipWrap       = $('#'+id).addClass('l-tip-Arrow'),
					tipArrow      = tipWrap.prepend('<span class="l-tipArrow"></span>').find('.l-tipArrow'),
					tipWrapHeight = tipWrap[0].offsetHeight,
					tipWrapWidth  = tipWrap[0].offsetWidth,
					top           = 0,
					left          = 0;
				if( arrowDirection === 'topBottom' ){
					tipArrow.addClass('l-tipArrow-topBottom');
					var tipArrowH = tipArrow.height(),
						tipArrowW = tipArrow.width();
					/*判断obj在左还是在右*/
					if( tipItemLeft < tipItemWrapWidth/2 - tipItemWidth/2 ){
						left = tipItemLeft;
						/*判断obj在上还是在下*/
						if( tipItemTop < tipItemWrapHeight/2 - tipItemHeight/2 ){
							top = tipItemTop + tipItemHeight + tipArrowH;
							tipArrow.addClass('l-tipArrow-topLeft');
						}else{
							top = tipItemTop - tipWrapHeight - tipArrowH;
							tipArrow.addClass('l-tipArrow-bottomLeft');
						}
					}else{
						left = tipItemLeft + tipItemWidth - tipWrapWidth;
						/*判断obj在上还是在下*/
						if( tipItemTop < tipItemWrapHeight/2 - tipItemHeight/2 ){
							top = tipItemTop + tipItemHeight + tipArrowH;
							tipArrow.addClass('l-tipArrow-topRight');
						}else{
							top = tipItemTop - tipWrapHeight - tipArrowH;
							tipArrow.addClass('l-tipArrow-bottomRight');
						}
					}
				}else{
					var tipArrowH = tipArrow.height(),
						tipArrowW = tipArrow.width();
					tipArrow.addClass('l-tipArrow-leftRight');
					/*判断obj在左还是在右*/
					if( tipItemLeft < tipItemWrapWidth/2 - tipItemWidth/2 ){
						left = tipItemLeft + tipItemWidth + tipArrowW;
						/*判断obj在上还是在下*/
						if( tipItemTop < tipItemWrapHeight/2 - tipItemHeight/2 ){
							top = tipItemTop;
							tipArrow.addClass('l-tipArrow-leftTop');
						}else{
							top = tipItemTop + tipItemHeight - tipWrapHeight;
							tipArrow.addClass('l-tipArrow-leftBottom');
						}
					}else{
						left = tipItemLeft - tipItemWidth -tipArrowW;
						/*判断obj在上还是在下*/
						if( tipItemTop < tipItemWrapHeight/2 - tipItemHeight/2 ){
							top = tipItemTop;
							tipArrow.addClass('l-tipArrow-rightTop');
						}else{
							top = tipItemTop + tipItemHeight - tipWrapHeight;
							tipArrow.addClass('l-tipArrow-rightBottom');
						}
					}
				}
				tipWrap.css({top:top,left:left});
			},
			
			/*删除*/
			remove: function(){
				$('#'+id).remove();
				tipItem.attr('title',attrTitle);
			}
		};//end tipFn
		
		/*判断显示方式*/
		if( isInitShow ){
			tipFn.position();
		}else{
			tipItem.live(event,function(){
				if( isArrow ){
					tipFn.arrow();
				}else if( isTrack ){
					tipFn.track();
				}else{
					tipFn.defaultPositon();
				}
			}).live('mousemove',function(){
				if( isTrack ){
					tipFn.track();
				}
			}).live('mouseout',function(){
				tipFn.remove();
			});
			
		}//end if
		
	};
	
	return tip;
});