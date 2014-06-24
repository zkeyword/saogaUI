define(['core/saogaUI'], function(saogaUI){
	
	var tab = function(options){

		var o = options || {};
		if( !o.tabItem ) return false;
		var tabItem   = o.tabItem,                          //tab选卡对象
			tabWrap   = o.tabWrap || null,                  //tab切换内容对象
			tabEvent  = o.tabEvent || 'click',              //切换事件
			tabIndex  = o.tabIndex || 0,                    //初始位置
			isAuto    = o.isAuto || false,                  //是否自动播放
			autoTime  = o.autoTime || 2000,                 //自动播放时间
			autoSpeed = o.autoSpeed || 0,                   //自动播放速度
			onclick   = o.onclick ? o.onclick : null;       //切换后执行的函数
		
		/*切换动作*/
		var tabFn = {
			/*初始化*/
			init: function(){
				$(tabWrap).eq(tabIndex).show().siblings(tabWrap).hide();
				if( tabWrap != null ){
					var index = tabIndex;
					$(tabItem).bind(tabEvent,function(){
						index = $(tabItem).index(this);
						tabFn.cutoverFn(index);
					});
					if( isAuto ){
						tabFn.autoFn(index);
					}
				}
			},
			
			/*切换函数*/
			cutoverFn: function(i){
				//tab切换内容的html不为空才做下面动作
				if( $(tabWrap).eq(i).html() !== '' ){
					if( autoSpeed ){
						$(tabWrap).eq(i).stop(true,true).fadeIn(autoSpeed).siblings(tabWrap).fadeOut(autoSpeed);
					}else{
						$(tabWrap).eq(i).stop(true,true).show().siblings(tabWrap).hide();
					}
					$(tabItem).eq(i).addClass('on').siblings(tabItem).removeClass('on');
				}else{
					$(tabWrap).hide();
				}
				//点击tabItem执行函数
				if( saogaUI.base.isFunction(onclick) ){
					onclick(i);
				}
			},
			
			/*自动播放函数*/
			autoFn: function(i){
				var _mun    = $(tabWrap).size(),
					_MyTime = setInterval(function(){
						tabFn.cutoverFn(i);
						i++;
						if( i === _mun ){
							i = 0;
						};
					},autoTime);
				$(tabItem).parent().hover(function(){
					clearInterval(_MyTime);
				},function(){
					_MyTime = setInterval(function(){
						tabFn.cutoverFn(i);
						i ++;
						if( i === _mun ){
							i = 0;
						};
					},autoTime);
				});
			}
		};//end tabfn
		tabFn.init();
	};
	
	return tab;
});