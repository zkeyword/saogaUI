define(['jquery'], function($){

	'use strict';
	
	(function() {
		/**
		 * 针对原型的方法添加应用支持
		 */
		
		/**
		 * 获取中文长度
		 */
		String.prototype.getLength = function(){
			return this.replace(/[^\x00-\xff]/g, "en").length; //若为中文替换成两个字母
		};
		
		/**
		 * 清空空格
		 */
		String.prototype.trim = function(){
			return this.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "");
		};
		
		/**
		 * 转为unicode编码
		 */
		String.prototype.toUnicode = function(){
			return escape( this.toLocaleLowerCase().replace(/%u/gi, '\\') );
		};
		
		/**
		 * 转为unicode编码
		 */
		String.prototype.unicodeTo = function(){
			return unescape( this.toLocaleLowerCase().replace(/%u/gi, '\\') );
		};
		
		/**
		 * saogaUI
		 * @namespace设定基本命名空间
		 * @author norion
		 * @blog http://zkeyword.com/
		 */
		var saogaUI = window.saogaUI || {};
	
		/*设定基本构架*/
		saogaUI = {
			_INSTALL: function(){
				window.saogaUI = saogaUI;
			},
			base: {}, //基础层,所有的基础函数库,如cookie等
			ui: {}    //前端显示层,用来重构和回流DOM,前端的特效显示处理
		};
		
		saogaUI._INSTALL();
	}(window));
	
	/**
	 * saogaUI.base基础层
	 * @class saogaUI.base 基础函数库
	 * @requires saogaUI.base
	 * @author norion
	 * @blog http://zkeyword.com/
	 */
	saogaUI.base = {
		
		/**
		 * 判断是否是数组
		 * @param {Object} 
		 * @return {Boolean}
		 */
		isArray: function(o){
			return o ? jQuery.isArray(o) : false;
		},
		
		/**
		 * 判断是否是对象
		 * @param {Object} 
		 * @return {Boolean}
		 */
		isObject: function(o){
			return o ? Object.prototype.toString.call(o) === "[object Object]" : false;
		},
		
		/**
		 * 判断是否是函数
		 * @param {Function} 
		 * @return {Boolean}
		 */
		isFunction: function(o){
			return o ? Object.prototype.toString.call(o) === "[object Function]" : false;
		}
	};
	
	/**
	 * saogaUI.ui前端显示层
	 * @class saogaUI.ui 前端显示层,用来重构和回流DOM,前端的特效显示处理
	 * @requires saogaUI.base
	 * @author norion
	 * @blog http://zkeyword.com/
	 */
	saogaUI.ui = {
		
		/**
		 * css中的z-index值
		 * @return {Number} z-index值
		 */
		zIndex: function(){
			return 9999 + $('.l-ui').length;
		},
		
		/**
		 * 需要ui元素需要绝对定位的容器
		 */
		wrap: function(){
			if( !$('#l-ui-wrap').length ){
				$('body').append('<div id="l-ui-wrap"><!--[if lte IE 6.5]><iframe src="javascript:false;" style="width:0;height:0;"></iframe><![endif]--></div>');
			}
		},
		
		/**
		 * 设置遮罩
		 */
		lock: function(){
			var body = $('body'),
				bodyW = body.width(),
				bodyH = $(document).height();
				
			if( !$('.l-ui-lock').length ){
				body.append('<div class="l-ui-lock"></div>')
					.find('.l-ui-lock').css({ width:bodyW, height:bodyH, filter:'Alpha(opacity=20)' });
			}else{
				$('.l-ui-lock').show();
			}
			
			//给.l-ui添加遮罩标识
			$('.l-ui').addClass('l-ui-mask');
		},
		
		/**
		 * 删除遮罩
		 */
		unlock: function(){
			$('.l-ui-lock').hide();
		},
		
		/**
		 * 获取鼠标位置
		 * @param {Object} event事件
		 * @return {Array} 返回鼠标的x、y轴：[positionX, positionY]
		 */
		mousePosition: function(e){
			var e = e || window.event,
				x = e.pageX || e.clientX + document.body.scrollLeft,
				y = e.pageY || e.clientY + document.body.scrollTop;
			return{
				positionX : x,
				positionY : y
			};
		},
		
		/**
		 * 判断是否宽屏
		 * @return {Boolean} 
		 */
		Widescreen: (function(){
			return (screen.width >= 1210);
		})()
	};	
	
	return saogaUI;
});