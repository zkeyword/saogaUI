
define('core/saogaUI',[],function(){

	
	
	(function() {
		/**
		 * 针对原型的方法添加应用支持
		 */
		
		/**
		 * 获取中文长度
		 * @method getLength
		 */
		String.prototype.getLength = function(){
			return this.replace(/[^\x00-\xff]/g, "en").length; //若为中文替换成两个字母
		};
		
		/**
		 * 清空空格
		 * @method trims
		 * @return {String}
		 */
		String.prototype.trims = function(){
			return this.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "");
		};
		
		/**
		 * 转为unicode编码
		 * @method toUnicode
		 * @return {String}
		 */
		String.prototype.toUnicode = function(){
			return escape( this.toLocaleLowerCase() ).replace(/\%/gi, '\\') ;
		};
		
		/**
		 * 转为unicode编码
		 * @method unicodeTo
		 * @return {String}
		 */
		String.prototype.unicodeTo = function(){
			return unescape( this.toLocaleLowerCase().replace(/%u/gi, '\\') );
		};
		
		// 对Date的扩展，将 Date 转化为指定格式的String
		// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
		// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
		// 例子： 
		// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
		// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
		Date.prototype.format = function(fmt) { //author: meizz 
			var o = {
				"M+": this.getMonth() + 1, //月份 
				"d+": this.getDate(), //日 
				"h+": this.getHours(), //小时 
				"m+": this.getMinutes(), //分 
				"s+": this.getSeconds(), //秒 
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
				"S": this.getMilliseconds() //毫秒 
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		
		/**
		 * 重写console
		 */
		if(!window.console){
			window.console = {};
		}
		if(!console.log){
			console.log = function(){};
		}
		
		/**
		 * 设定基本命名空间
		 * @namespace saogaUI
		 * @author norion
		 * @blog http://zkeyword.com/
		 */
		var saogaUI = window.saogaUI || {};
	
		/*设定基本构架*/
		saogaUI = {
			_INSTALL: function(){
				window.saogaUI = saogaUI;
			},
			base: {}, //基础层，所有的基础函数库，如cookie等
			ui: {},   //前端显示层，用来重构和回流DOM，前端的特效显示处理
			app:{}    //应用层，挂载一些应用的通用类。
		};
		
		saogaUI._INSTALL();
	}(window));
	
	/*鼠标滚轮监听*/
	/*(function($){
	    $.fn.preventScroll = function(){
	        var that = this[0];
	        if($.browser.mozilla){
	        	that.addEventListener('DOMMouseScroll',function(e){
	        		that.scrollTop += e.detail > 0 ? 60 : -60;   
	                e.preventDefault();
	            },false); 
	        }else{
	        	that.onmousewheel = function(e){   
	                e = e || window.event;   
	                that.scrollTop += e.wheelDelta > 0 ? -60 : 60;   
	                e.returnValue = false;  
	            };
	        }
	        return this;
	    };
	})(jQuery);*/
	
	/**
	 * 基础函数库
	 * @class saogaUI.base 基础函数库
	 * @author norion
	 * @blog http://zkeyword.com/
	 */
	saogaUI.base = {
		
		/**
		 * 判断是否是数组
		 * @method saogaUI.base.isArray
		 * @param {Object} 数组对象
		 * @return {Boolean}
		 */
		isArray: function(o){
			return o ? jQuery.isArray(o) : false;
		},
		
		/**
		 * 判断是否是对象
		 * @method saogaUI.base.isObject
		 * @param {Object} 字符串对象
		 * @return {Boolean}
		 */
		isObject: function(o){
			return o ? Object.prototype.toString.call(o) === "[object Object]" : false;
		},
		
		/**
		 * 判断是否是函数
		 * @method saogaUI.base.isFunction
		 * @param {Function} Function对象
		 * @return {Boolean}
		 */
		isFunction: function(o){
			return o ? Object.prototype.toString.call(o) === "[object Function]" : false;
		},
		
		/**
		 * 获取浏览器 userAgent
		 * @method saogaUI.base.browser
		 * @return {Object}
		 */
		browser: (function(){
			var na            = window.navigator,
				browserTester = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos)[ \/os]*([\d_.]+)/ig,
				ua            = na.userAgent.toLowerCase(),
				browser       = {
									platform: na.platform
								};
			ua.replace(browserTester, function(a, b, c) {
				var bLower = b.toLowerCase();
				if (!browser[bLower]) {
					browser[bLower] = c; 
				}
			});
			if( browser.msie ){
				browser.ie = browser.msie;
				var v = parseInt(browser.msie, 10);
				browser['ie' + v] = true;
			}	
			return browser;
		}()),
		
		/**
		 * cookie
		 * @method zUI.base.cookie
		 */
		cookie: {

			/**
			 * 设置cookie
			 * @param {String} cookie的名称
			 * @param {String} cookie的值
			 * @param {String} cookie的有效期
			 * @param {String} cookie的域名
			 * @param {String} cookie存放的路径
			 * @return {Boolean}
			 */
			set: function(name, value, hour, domain, path){
				if( hour ){
					var today  = new Date(),
						expire = new Date();
					expire.setTime(today.getTime() + 36E5 * hour);
				}
				document.cookie = name + "=" + encodeURI(value) + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "");
				return true;
			},
			
			/**
			 * 获取cookie
			 * @param {String} cookie的名称
			 * @return {String} cookie的值
			 */
			get: function( name ){
				var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
					m = document.cookie.match(r);
					
				return unescape(decodeURI(!m ? "" : m[1]));
			},
			
			/**
			 * 删除cookie
			 * @param {String} cookie的名称
			 * @param {String} cookie的域名
			 * @param {String} cookie存放的路径
			 */
			del: function(name, domain, path){
				document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "");
			}
		}
	};
	
	
	
	/**
	 * 前端显示层，用来重构和回流DOM，前端的特效显示处理
	 * @class saogaUI.ui 前端显示层
	 * @author norion
	 * @blog http://zkeyword.com/
	 */
	saogaUI.ui = {
		
		/**
		 * 设置z-index
		 * @method saogaUI.ui.zIndex
		 * @return {Number} z-index值
		 */
		zIndex: function(){
			return 99999 + $('.l-ui').length;
		},
		
		/**
		 * 设置tabindex
		 * @method saogaUI.ui.tabindex
		 * @param {object} 表单元素jquery对象
		 * @return {Number} tabindex值
		 */
		tabindex: function(obj){
			var form = obj.parents('form'),
				all  = form.find('select, input, textarea')
		},
		
		/**
		 * 需要ui元素需要绝对定位的容器
		 * @method saogaUI.ui.wrap
		 * @return {Object} ui元素jquery对象
		 */
		wrap: function(){
			if( !$('#l-ui-wrap').length ){
				$('body').append('<div id="l-ui-wrap"><!--[if lte IE 6.5]><iframe src="javascript:false;" style="width:0;height:0;"></iframe><![endif]--></div>');
			}
			return $('#l-ui-wrap');
		},
		
		/**
		 * 去除滚动条
		 * @method saogaUI.ui.noScroll
		 */
		noScroll: function(){
			var html = $('html');
			
			/*监听滚轮*/
			if( document.onmousewheel === undefined ){
				html[0].addEventListener('DOMMouseScroll',function(e){
					html.scrollTop += e.detail > 0 ? 60 : -60;   
	            },false);
			}else{
				html.onmousewheel = function(e){   
	                e = e || window.event;   
	                html.scrollTop += e.wheelDelta > 0 ? -60 : 60;   
	                e.returnValue = false;  
	            };
			}
			
			html.addClass('html-noScroll');
		},
		
		/**
		 * 设置遮罩
		 * @method saogaUI.ui.lock
		 * @return {Object} 遮罩元素jquery对象
		 */
		lock: function(){
			var win      = $(window),
				body     = $('body'),
				lock     = $('.l-ui-lock'),
				_setSize = function(){
					if( !lock.length ){
						lock = body
								.append('<div class="l-ui-lock fn-hide"></div>')
								.find('.l-ui-lock')
					}
					lock.css({
						filter:'Alpha(opacity=20)',
						width:'100%',
						height: body[0].scrollHeight
					});
				};
				
			this.noScroll();
			_setSize();	
			win.resize(_setSize);
			lock.fadeIn();

			return lock;
		},
		
		/**
		 * 删除遮罩
		 * @method saogaUI.ui.unlock
		 */
		unlock: function(){
			$('html').removeClass('html-noScroll');
			$('.l-ui-lock').fadeOut();
		},
		
		/**
		 * 获取鼠标位置
		 * @method saogaUI.ui.mousePosition
		 * @param {Object} event事件
		 * @return {Array} 返回鼠标的x、y轴：[positionX, positionY]
		 */
		mousePosition: function(e){
			e = e || window.event;
			
			var x = e.pageX || e.clientX + document.body.scrollLeft,
				y = e.pageY || e.clientY + document.body.scrollTop;
				
			return{
				positionX : x,
				positionY : y
			};
		},
		
		/**
		 * 判断是否宽屏
		 * @method saogaUI.ui.widescreen
		 * @return {Boolean} 
		 */
		widescreen: (function(){
			return (screen.width >= 1210);
		})(),
		
		/**
		 * onselectstart 选中处理
		 * @method saogaUI.ui.onselectstart
		 * @param {Object} jquery 对象
		 */
		onselectstart: function(obj){
			if( !obj || !obj.length ){ return false; }
			if( document.onselectstart !== undefined ){
				obj[0].onselectstart = function(){return false;};
			}else{
				obj.css({'-moz-user-select':'none'});
			}
			return obj;
		}
	};	
	
	return saogaUI;
});
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(/^$|,+/)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/[\n\r\t\s]+/g," ").replace(/<!--.*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g;e.openTag="{{",e.closeTag="}}";var y=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a,b){a=a.replace(/^\s/,"");var c=a.split(" "),e=c.shift(),f=c.join(" ");switch(e){case"if":a="if("+f+"){";break;case"else":c="if"===c.shift()?" if("+c.join(" ")+")":"",a="}else"+c+"{";break;case"/if":a="}";break;case"each":var g=c[0]||"$data",h=c[1]||"as",i=c[2]||"$value",j=c[3]||"$index",k=i+","+j;"as"!==h&&(g="[]"),a="$each("+g+",function("+k+"){";break;case"/each":a="});";break;case"echo":a="print("+f+");";break;case"print":case"include":a=e+"("+c.join(",")+");";break;default:if(-1!==f.indexOf("|")){var l=b.escape;0===a.indexOf("#")&&(a=a.substr(1),l=!1);for(var m=0,n=a.split("|"),o=n.length,p=l?"$escape":"$string",q=p+"("+n[m++]+")";o>m;m++)q=y(q,n[m]);a="=#"+q}else a=d.helpers[e]?"=#"+e+"("+c.join(",")+");":"="+a}return a},"function"==typeof define?define('template',[],function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
define('core/drag',[],function(){
	
	
	
	/**
	* saogaUI.ui.drag 拖拽控件
	* @class saogaUI.ui.drag
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options drag参数
    * @param {String} options.dragItem 拖拽触发对象选择器
    * @param {String} options.dragWrap 拖拽移动对象选择器
	*/
	var Drag = function(options){         //IE下 iframe内的的拖动还是有问题
	
		var o = options || {};
		if( !o.dragItem ){return false;}
		var	dragItem = $('body').find(o.dragItem),
			dragWrap = $('body').find(o.dragWrap),
			win      = parent.document || document,
			mouse    = {x:0,y:0};
			
		function _moveDialog(e){
	        
	        var top  = dragWrap.css('top') === 'auto' ? 0 : dragWrap.css('top'),
				left = dragWrap.css('left') === 'auto' ? 0 : dragWrap.css('left');
				
	        dragWrap
				.css({
					top  : parseInt(top) + (e.clientY - mouse.y),
					left : parseInt(left) + (e.clientX - mouse.x)
				});
	        
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	    }
		
	    dragItem
			.on('mousedown', function(e){
				mouse.x = e.clientX;
				mouse.y = e.clientY;
				$(win).on('mousemove', _moveDialog);
				
				if(e.preventDefault){
					e.preventDefault();
				}else{
					e.returnValue = false;
				}
			});
	    
	    $(win)
			.on('mouseup', function(){
				$(win).off('mousemove', _moveDialog);
			});
	};
	
	return Drag;
});
/**
 * @license RequireJS i18n 2.0.4 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/i18n for details
 */
/*jslint regexp: true */
/*global require: false, navigator: false, define: false */

/**
 * This plugin handles i18n! prefixed modules. It does the following:
 *
 * 1) A regular module can have a dependency on an i18n bundle, but the regular
 * module does not want to specify what locale to load. So it just specifies
 * the top-level bundle, like "i18n!nls/colors".
 *
 * This plugin will load the i18n bundle at nls/colors, see that it is a root/master
 * bundle since it does not have a locale in its name. It will then try to find
 * the best match locale available in that master bundle, then request all the
 * locale pieces for that best match locale. For instance, if the locale is "en-us",
 * then the plugin will ask for the "en-us", "en" and "root" bundles to be loaded
 * (but only if they are specified on the master bundle).
 *
 * Once all the bundles for the locale pieces load, then it mixes in all those
 * locale pieces into each other, then finally sets the context.defined value
 * for the nls/colors bundle to be that mixed in locale.
 *
 * 2) A regular module specifies a specific locale to load. For instance,
 * i18n!nls/fr-fr/colors. In this case, the plugin needs to load the master bundle
 * first, at nls/colors, then figure out what the best match locale is for fr-fr,
 * since maybe only fr or just root is defined for that locale. Once that best
 * fit is found, all of its locale pieces need to have their bundles loaded.
 *
 * Once all the bundles for the locale pieces load, then it mixes in all those
 * locale pieces into each other, then finally sets the context.defined value
 * for the nls/fr-fr/colors bundle to be that mixed in locale.
 */
(function () {
    

    //regexp for reconstructing the master bundle name from parts of the regexp match
    //nlsRegExp.exec("foo/bar/baz/nls/en-ca/foo") gives:
    //["foo/bar/baz/nls/en-ca/foo", "foo/bar/baz/nls/", "/", "/", "en-ca", "foo"]
    //nlsRegExp.exec("foo/bar/baz/nls/foo") gives:
    //["foo/bar/baz/nls/foo", "foo/bar/baz/nls/", "/", "/", "foo", ""]
    //so, if match[5] is blank, it means this is the top bundle definition.
    var nlsRegExp = /(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;

    //Helper function to avoid repeating code. Lots of arguments in the
    //desire to stay functional and support RequireJS contexts without having
    //to know about the RequireJS contexts.
    function addPart(locale, master, needed, toLoad, prefix, suffix) {
        if (master[locale]) {
            needed.push(locale);
            if (master[locale] === true || master[locale] === 1) {
                toLoad.push(prefix + locale + '/' + suffix);
            }
        }
    }

    function addIfExists(req, locale, toLoad, prefix, suffix) {
        var fullName = prefix + locale + '/' + suffix;
        if (require._fileExists(req.toUrl(fullName + '.js'))) {
            toLoad.push(fullName);
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     * This is not robust in IE for transferring methods that match
     * Object.prototype names, but the uses of mixin here seem unlikely to
     * trigger a problem related to that.
     */
    function mixin(target, source, force) {
        var prop;
        for (prop in source) {
            if (source.hasOwnProperty(prop) && (!target.hasOwnProperty(prop) || force)) {
                target[prop] = source[prop];
            } else if (typeof source[prop] === 'object') {
                if (!target[prop] && source[prop]) {
                    target[prop] = {};
                }
                mixin(target[prop], source[prop], force);
            }
        }
    }

    define('i18n',['module'], function (module) {
        var masterConfig = module.config ? module.config() : {};

        return {
            version: '2.0.4',
            /**
             * Called when a dependency needs to be loaded.
             */
            load: function (name, req, onLoad, config) {
                config = config || {};

                if (config.locale) {
                    masterConfig.locale = config.locale;
                }

                var masterName,
                    match = nlsRegExp.exec(name),
                    prefix = match[1],
                    locale = match[4],
                    suffix = match[5],
                    parts = locale.split("-"),
                    toLoad = [],
                    value = {},
                    i, part, current = "";

                //If match[5] is blank, it means this is the top bundle definition,
                //so it does not have to be handled. Locale-specific requests
                //will have a match[4] value but no match[5]
                if (match[5]) {
                    //locale-specific bundle
                    prefix = match[1];
                    masterName = prefix + suffix;
                } else {
                    //Top-level bundle.
                    masterName = name;
                    suffix = match[4];
                    locale = masterConfig.locale;
                    if (!locale) {
                        locale = masterConfig.locale =
                            typeof navigator === "undefined" ? "root" :
                            (navigator.language ||
                             navigator.userLanguage || "root").toLowerCase();
                    }
                    parts = locale.split("-");
                }

                if (config.isBuild) {
                    //Check for existence of all locale possible files and
                    //require them if exist.
                    toLoad.push(masterName);
                    addIfExists(req, "root", toLoad, prefix, suffix);
                    for (i = 0; i < parts.length; i++) {
                        part = parts[i];
                        current += (current ? "-" : "") + part;
                        addIfExists(req, current, toLoad, prefix, suffix);
                    }

                    req(toLoad, function () {
                        onLoad();
                    });
                } else {
                    //First, fetch the master bundle, it knows what locales are available.
                    req([masterName], function (master) {
                        //Figure out the best fit
                        var needed = [],
                            part;

                        //Always allow for root, then do the rest of the locale parts.
                        addPart("root", master, needed, toLoad, prefix, suffix);
                        for (i = 0; i < parts.length; i++) {
                            part = parts[i];
                            current += (current ? "-" : "") + part;
                            addPart(current, master, needed, toLoad, prefix, suffix);
                        }

                        //Load all the parts missing.
                        req(toLoad, function () {
                            var i, partBundle, part;
                            for (i = needed.length - 1; i > -1 && needed[i]; i--) {
                                part = needed[i];
                                partBundle = master[part];
                                if (partBundle === true || partBundle === 1) {
                                    partBundle = req(prefix + part + '/' + suffix);
                                }
                                mixin(value, partBundle);
                            }

                            //All done, notify the loader.
                            onLoad(value);
                        });
                    });
                }
            }
        };
    });
}());

define('core/nls/str',{
  'root': {
    close: '关闭',
    /*dialog*/
    alert: '提示？',
    confirm: '确认？',
    error: '错误',
    /*grid*/
    nextPage: '&gt;',
    prevPage: '&lt;',
    //countFont: '每页显示：{{size}}条，当前显示从{{start}}到{{end}}，总{{count}}条 。',
    countFont:'',
    nullText: '暂无数据，请确认！',
    requestText: '数据请求中，请稍后...'
  },
  'en': true
});
define('core/dialog',['core/saogaUI', 'core/drag', 'i18n!core/nls/str'], function(saogaUI, drag, lang){
	
	/**
	* saogaUI.ui.dialog 拖拽控件
	* @class saogaUI.ui.dialog
	* @author norion.z
    * @blog http://zkeyword.com/
	*/
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
				h += '<div class="l-ui l-dialog-wrap l-ui-current l-ui-mask" id="'+ id +'">';
				h += '	<table class="l-dialog-table">';
				h += '		<tr><td colspan="3" class="l-dialog-border l-dialog-border-top">&nbsp;</td></tr>';
				h += '		<tr>';
				h += '			<td class="l-dialog-border l-dialog-border-left">&nbsp;</td>';
				h += '			<td class="l-dialog-main"><div class="l-dialog-content" style="width:'+width+'px;height:'+height+'px"><div class="l-dialog-text">'+ text +'</div></div></td>';
				h += '			<td class="l-dialog-border l-dialog-border-right">&nbsp;</td>';
				h += '		</tr>';
				h += '		<tr><td colspan="3" class="l-dialog-border l-dialog-border-bottom">&nbsp;</td></tr>';
				h += '	</table>';
				h += '</div>';
			
			//载入容器
			saogaUI.ui.wrap();
			$('#l-ui-wrap').prepend(h);
			
			var dialogWrap    = $('#'+id),
				dialogMain    = dialogWrap.find('.l-dialog-main'),
				dialogContent = dialogWrap.find('.l-dialog-content');
			
			saogaUI.ui.dialog.setZIndex(id);
			
			dialogWrap.attr('tabindex', '1');
			dialogWrap.focus();
			
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
					if( item.onclick ){
						btnMain.find('a').eq(i).click(function(){
							item.onclick(i,item);
							saogaUI.ui.dialog.close(id);
						});
					}
					
					/*item.onclick && btnMain.find('a').eq(i).click(function(){
						item.onclick(i,item);
						saogaUI.ui.dialog.close(id);
					});*/
				});	
			}else{
				switch( type ){
					case 'alert':
						dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-check-square-o"></i></div>');
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-floatCenter-item l-dialog-ok"><span>确定</span></a>');
						btnMain.find('.l-dialog-ok').click(function(){
							if( saogaUI.base.isFunction(ok) ){
								ok();
							}
							saogaUI.ui.dialog.close(id);
						});
						break;
					case 'confirm':
						dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-question-circle"></i></div>');
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-floatCenter-item l-dialog-ok"><span>确定</span></a><a href="javascript:;" class="ui-btn ui-btnMain ui-btnMain-cancel ui-floatCenter-item l-dialog-no"><span>取消</span></a>');
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
						dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-frown-o"></i></div>');
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-btnMain-cancel ui-floatCenter-item l-dialog-no"><span>取消</span></a>');
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
			var win        = $(window),
				dialogIcon = dialogWrap.find('.l-dialog-icon'),
				dialogText = dialogWrap.find('.l-dialog-text'),
				_setSize   = function(){
					dialogWrap.css({
						top: top || /*win.scrollTop() +*/ ( win.height() - dialogWrap.height() )/2,
						left: left || ( win.width() - dialogWrap.width() )/2
					});
				}
			
			_setSize();	
			win.resize(_setSize);

			dialogIcon.css({top: (height - dialogIcon.height())/2 + 15 });
			dialogText.css({'padding-top': (height - dialogText.height())/2 });
			
			dialogContent
				.css({opacity:0.1})
				.animate({ 
					opacity: 1
				}, 500);
		

			
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
				dialogMain
					.prepend('<div class="l-dialog-close"><i class="icon icon-close" title="关闭"></i></div>')
					.find('.l-dialog-close')
					.click(function(){
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
		* 设置层级
		* @param {Object} options drag参数
		*/
		setZIndex: function(id){
			var obj        = $('.l-ui'),
				i          = 0,
				len        = obj.length,
				zIndex     = saogaUI.ui.zIndex(),
				mask       = $('.l-ui-lock'),
				maskZindex = Number( mask.css('z-index') ),
				dialog	   = $('#'+id);
			if( dialog.hasClass('l-ui-current') ){
								
				for(; i<len; i++){
					obj.eq(i).css({'z-index':maskZindex - i});
				}
				
				obj.removeClass('l-ui-current');
				dialog.css({'z-index':zIndex});
			}else{
				for(; i<len; i++){
					obj.eq(i).css({'z-index':maskZindex + len - i});
				}
				
			}
		},
		
		/**
		* 关闭释放
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
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
			saogaUI.ui.dialog.setZIndex(id);
		},
		
		/**
		* alert
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
		*/
		alert: function(options){
			var o      = options || {},
				title  = o.title || lang.alert,
				text   = o.text || '',
				width  = o.width,
				height = o.height,
				ok     = o.ok || '';
			this.init({
				title:title,
				text:text,
				width:width,
				height:height,
				type:'alert',
				ok:ok
			});
		},
		
		/**
		* confirm
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
		*/
		confirm: function(options){
			var o      = options || {},
				title  = o.title || lang.confirm,
				text   = o.text || '',
				width  = o.width,
				height = o.height,
				ok     = o.ok || '',
				no     = o.no || '';
			this.init({
				title:title,
				text:text,
				width:width,
				height:height,
				type:'confirm',
				ok:ok,
				no:no
			});
		},
		
		/**
		* error
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
		*/
		error: function(options){
			var o      = options || {},
				title  = o.title || '',
				text   = o.text || lang.error,
				width  = o.width,
				height = o.height,
				no     = o.no || '';
			this.init({
				title:title,
				text:text,
				width:width,
				height:height,
				type:'error',
				no:no
			});
		},
		
		/**
		* 小提示框
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
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
			var win      = $(window),
				_setSize = function(){
					dialogWrap.css({
						top: top || /*win.scrollTop() +*/ ( win.height() - dialogWrap.height() )/2,
						left: left || ( win.width() - dialogWrap.width() )/2
					});
				}
			
			_setSize();	
			win.resize(_setSize);
			
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
			}
			setTimeout(show,showTime);
			
		}
			
	};
	
	//saogaUI.ui.dialog = dialog;
	
	return dialog;
	
});
define('core/pop',['core/saogaUI'], function(saogaUI){
	
	
	
	/**
	* saogaUI.ui.pop 弹出窗控件
	* @class saogaUI.ui.pop
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 弹出窗参数
    * @param {String} o.id 弹出窗ID
    * @param {String} o.titleId 标题ID
    * @param {String} o.title 弹出框的标题
    * @param {Number} o.width 弹出框内部的宽，不包括边框的宽度
    * @param {Number} o.height 弹出框内部的高，不包括边框的高度
    * @param {Number} o.top 弹出框的top
    * @param {Number} o.left 弹出框的left
    * @param {String} o.cls 定义class
    * @param {String} o.url 用iframe方式加载
    * @param {String} o.ajax 用ajax方式加载
    * @param {String} o.ajaxType ajax请求类型
    * @param {String|Object} o.ajaxData ajax请求条件
    * @param {String} o.async ajax同步方式
    * @param {String} o.html 用html方式加载
    * @param {Function} o.onloadFn 载入时要触发的事件
    * @param {Function} o.closeFn 关闭时要触发的事件
    * @param {Object} o.btns 弹出框的按钮集合
    * @param {Function} o.btns.onclick 点击按钮要执行的动作，如果要执行一些异步的动作，closePop必须是false
    * @param {Function} o.btns.closePop 点击按钮之后是否直接关闭弹出框，默认直接关闭
    * @param {Function} o.btns.cls 按钮自定义class
    * @param {Function} o.btns.text 按钮文本
    * @param {Boolean} o.isMask 是否允许遮罩,默认true
    * @param {Boolean} o.isMaskClose 是否点击遮罩关闭,默认false
    * @param {Boolean} o.allowClose 允许关闭,默认true
    * @param {Boolean} o.allowEscClose 允许esc关闭,默认true
    * @param {Boolean} o.isDrag 允许拖拽,默认true
	* @return {Object} pop对象
	*/
	var Pop = function(o){
		var g      = this,
			
			/**
			* 默认配置
			* @private
			*/
			p      = {
				id            : 'l-pop-'+(new Date()).valueOf(),
				titleId       : 'l-pop-title-'+(new Date()).valueOf(),
				title         : '',                                     //弹出框的标题
				width         : 500,                                    //弹出框内部的宽，不包括边框的宽度
				height        : 300,                                    //弹出框内部的高，不包括边框的高度
				top           : null,                                   //弹出框的top
				left          : null,                                   //弹出框的left
				cls           : '',                                     //定义class
				url           : '',                                     //用iframe方式加载
				ajax          : '',                                     //用ajax方式加载
				ajaxType      : 'POST',
				ajaxData      : '',
				ajaxSuccess   : null,
				async         : false,
				html          : '',                                      //用html方式加载
				onloadFn      : null,                                    //载入时要触发的事件
				closeFn       : null,                                    //关闭时要触发的事件
				btns          : '',                                      //弹出框的按钮集合
				isMask        : true,                                    //是否允许遮罩,默认true
				isMaskClose   : false,                                   //是否点击遮罩关闭,默认true
				allowClose    : true,                                    //允许关闭,默认true
				allowEscClose : true,                                    //允许esc关闭,默认true
				isDrag        : true                                     //允许拖拽,默认true
			},
			
			/**
			* 临时对象
			* @private
			*/
			_cache = {
				popTitle: $(),
				popContent: $(),
				btnWrap: $(),
				mask: $()
			},
			
			/**
			* 内部处理
			* @private
			*/
			_core  = {
				
				/**
				* 创建遮罩
				*/
				createMask: function(){
					var isMask      = p.isMask,
						isMaskClose = p.isMaskClose;
					
					if( isMask ){
						var mask = saogaUI.ui.lock();
						
						if( isMaskClose && allowClose ){
							lock.click(function(){
								g.close();
							});
						}
						
						_cache.mask = mask;
						
						p.popWrap.addClass('l-ui-mask');
					}
				},
				
				/**
				* 创建标题
				*/
				createTitle: function(){
					var id         = p.id,
						title      = p.title,
						titleId    = p.titleId,
						popMain    = p.popMain,
						isDrag     = p.isDrag,
						allowClose = p.allowClose;
					
					if( title ){
						
						var popTitle = popMain.append('<div class="l-pop-title" id="'+ titleId +'"></div>')
											  .find('.l-pop-title')
											  .html(title);
						
						if( isDrag ){
							saogaUI.ui.drag({
								dragItem:'#'+titleId,
								dragWrap:'#'+id
							});
						}
						
						if( allowClose ){
							/*添加关闭按钮*/
							if( !popMain.find('.l-pop-close').length ){
								popMain.prepend('<div class="l-pop-close"><i class="icon icon-close" title="关闭"></i></div>');
							}
							
							popMain.find('.l-pop-close')
								   .click(function(){
										g.close();
									});
						}
						
						_cache.popTitle = popTitle;
					}
				},
				
				/**
				* 创建内容
				*/
				createContent: function(){
					var popMain     = p.popMain.append('<div class="l-pop-content"></div>'),
						url         = p.url,
						ajax        = p.ajax,
						ajaxType    = p.ajaxType,
						ajaxData    = p.ajaxData,
						async       = p.async,
                        ajaxSuccess = p.ajaxSuccess,
						html        = p.html,
						popContent  = popMain.find('.l-pop-content');
					
					if( url ){
						popContent.append('<iframe src="'+ url +'" frameborder="no" border="0"></iframe>').addClass('l-pop-contentIframe');
					}else if( ajax ){
						$.ajax({
							url     : ajax,
							type    : ajaxType,
							data    : ajaxData,
							cache   : false,
							async   : async,
							success : function(data){
                                if( saogaUI.base.isFunction(ajaxSuccess) ){
                                    ajaxSuccess(data);
                                }
								popContent.append(data);
							}
						}); 
					}else if( html ){
						popContent.append(html);
					}
					
					_cache.popContent = popContent;
				},
				
				/**
				* 创建按钮
				*/
				createBtn: function(){
					var id      = p.id,
						btns    = p.btns,
						popMain = p.popMain;
						
					if( btns ){
						if( !popMain.find('.l-pop-btnWrap').length ){
							popMain.append('<div class="ui-floatCenter l-pop-btnWrap"><div class="ui-sl-floatCenter"></div></div>');
						}
						
						var i       = 0,
							len     = btns.length,
							html    = '',
						    btnWrap = popMain.find('.ui-floatCenter'),
						    btnMain = popMain.find('.ui-sl-floatCenter').html('');
							
						for(; i<len; i++){
							var item = btns[i],
								cls  = 'ui-btn ui-floatCenter-item ui-btn-primary'+ (item.cls ? item.cls :'');
							html += '<a href="javascript:;" data-index="'+ i +'" class="'+ cls +'"><span>'+item.text+'</span></a>';
						}
						
						btnMain
							.append(html)
							.on('click', 'a', function(){
								var that    = $(this),
									i       = Number( this.getAttribute('data-index') ),
									item    = btns[i],
									isClose = item.closePop === undefined || item.closePop === false;
									
								saogaUI.base.isFunction(item.onclick) && item.onclick.apply(this, [id, i, item, that]);
								isClose && g.close(id);
							});
						
						_cache.btnWrap = btnWrap;
					}
				},
				
				/**
				* esc关闭函数
				*/
				escCloseFn: function(){
					var allowClose    = p.allowClose,
						allowEscClose = p.allowEscClose,
						popMain       = p.popMain;

					if( allowClose && allowEscClose ){

						var _modalKey = function(e){
							e = e || event;
							var code = e.which || event.keyCode;
							if(code === 27){
								g.close();
							}
						};
						
						if(document.attachEvent){
							document.attachEvent('onkeydown', _modalKey);
						}else{
							document.addEventListener('keydown', _modalKey, true);
						}
					}
				},
				
				/**
				* 设置显示
				*/
				setShowFn:function(){
					var win         = $(window),
						popWrap     = p.popWrap,
						popContent  = _cache.popContent,
						titleHeight = _cache.popTitle.outerHeight(),
						btnHeight   = _cache.btnWrap.outerHeight(),
						otherHeight = titleHeight + btnHeight + 30 + 40, //30是popContent的padding的和，40是top、bottom的和
						_setSize    = function(){
							var winHeight = win.height(),
								winWidth  = win.width(),
								height    = p.height,
								width     = p.width;

							if( winHeight - otherHeight < height ){
								height = winHeight - otherHeight;
								if( p.url ){
									popContent
										.find('iframe')
										.height(height)
										.width(width);
								}
							}

							popContent.css({height:height,width:width});
								
							popWrap.css({
								top: p.top || ( winHeight - popWrap.height() )/2,
								left: p.left || ( winWidth - popWrap.width() )/2
							});
						};

					_setSize();
					win.resize(_setSize);
					
					popContent
						.css({opacity:0.1})
						.animate({ 
							opacity: 1
						}, 800);


					/*popContent.css({width:300,height:300,opacity:0.5});

					var popWrap = p.popWrap,
						top     = win.height()/2 - popWrap.height()/2,
						left    = ( win.width() - popWrap.width() )/2;
					
					popWrap.css({top:top, left:left});
					
					
					popContent.animate({ 
						width: width,
						height: height,
						opacity: 1,
					}, 500, function(){
						
						top  = p.top || win.height()/2 - popWrap.height()/2,
						left = p.left || ( win.width() - popWrap.width() )/2;
						
						popWrap.animate({ 
								top: top,
								left: left, 
							}, 500);
					});*/
   
				},
				
				/**
				* 设置层级
				*/
				setZIndex: function(){
					if( p.isMask ){
						var obj        = $('.l-ui'),
							i          = 0,
							len        = obj.length,
							zIndex     = saogaUI.ui.zIndex(),
							mask       = _cache.mask,
							maskZindex = Number( mask.css('z-index') ),
							popWrap	   = p.popWrap;
						
						if( popWrap.hasClass('l-ui-current') ){
											
							for(; i<len; i++){
								obj.eq(i).css({'z-index':maskZindex - i});
							}
							
							obj.removeClass('l-ui-current');
							popWrap.css({'z-index':zIndex});
						}else{
							for(; i<len; i++){
								obj.eq(i).css({'z-index':maskZindex + len - i});
							}
						}
					}
				},
				
				/**
				* 载入时要触发的事件
				*/
				loadFn: function(){
					if( saogaUI.base.isFunction(p.onloadFn) ){
						p.onloadFn(p.id, p.popMain);
					}
				},
				
				/**
				* 运行 pop
				*/
				run: function(){
					this.createMask();
					this.createTitle();
					this.createContent();
					this.createBtn();
					this.escCloseFn();
					this.setShowFn();
					this.setZIndex();
					this.loadFn();
				},
				
				/**
				* 初始化
				*/
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined ){
							p[key] = o[key];
						}
					}
					
					var h = '';
						h += '<div class="l-ui l-pop-wrap l-ui-current" id="'+ p.id +'">';
						h += '	<table class="l-pop-table">';
						h += '		<tr><td colspan="3" class="l-pop-border l-pop-border-top"></th></tr>';
						h += '		<tr>';
						h += '			<td class="l-pop-border l-pop-border-left"></td>';
						h += '			<td class="l-pop-main"></td>';
						h += '			<td class="l-pop-border l-pop-border-right"></td>';
						h += '		</tr>';
						h += '		<tr><td colspan="3" class="l-pop-border l-pop-border-bottom"></td></tr>';
						h += '	</table>';
						h += '</div>';
						
					/*载入容器*/
					var wrap = saogaUI.ui.wrap();
					wrap.prepend(h);
					
					
					/*给默认配置项添加popWrap和popMain成员*/
					p.popWrap = $('#'+p.id);
					p.popMain = p.popWrap.find('.l-pop-main');
					
					p.popWrap.attr('tabindex', '1');
					p.popWrap.focus();
					
					this.run();
					
					return g;					
				}
			};
		
		/**
		* 关闭弹窗
		* @method saogaUI.ui.pop.close
		* @param {String} [id] - pop的id
		*/
		g.close = function(id){
			
			var closeFn = p.closeFn;
			
			p.popWrap.remove();
			
			_core.setZIndex();
					
			p.popWrap.find('.l-select-wrap').addClass('fn-hide');
			
			/*如果没有其他需要遮罩的的ui*/
			if( !$('.l-ui-mask').length ){
				saogaUI.ui.unlock();
			}
			
			/*关闭时要触发的事件*/
			if( saogaUI.base.isFunction(closeFn) ){
				id = id !== undefined ? id : p.id;
				p.closeFn(id);
			}
			
		};
		
		/**
		* 修改标题
		* @method saogaUI.ui.pop.modifyTitle
		* @param {String} title 标题
		*/
		g.modifyTitle = function(title){
			_cache.popTitle.html(title);
			return g;
		};
		
		/**
		* 修改按钮
		* @method saogaUI.ui.pop.modifyBtns 
	    * @param {Object} btns 弹出框的按钮集合
	    * @param {Function} btns.onclick 点击按钮要执行的动作，如果要执行一些异步的动作，closePop必须是false
	    * @param {Function} btns.closePop 点击按钮之后是否直接关闭弹出框，默认直接关闭
	    * @param {Function} btns.cls 按钮自定义class
	    * @param {Function} btns.text 按钮文本
		*/
		g.modifyBtns = function(btns){
			p.btns = btns;
			_core.createBtn();
			return g;
		};
		
		/**
		* 修改窗体大小
		* @method saogaUI.ui.pop.modifyWrap 
		* @param {Number} width 
		* @param {Number} height
		*/
		g.modifyWrap = function(width, height){
			p.width  = width;
			p.height = height;
			_core.setShowFn();
			
			return g;
		};
		
		return _core.init(o);
	};
	
	return function(o){
		return new Pop(o);
	};
});
define('core/tip',[],function(){
	
	
	/**
	* saogaUI.ui.pop 弹出窗控件
	* @class saogaUI.ui.tip
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options 弹出窗参数
    * @param {String} options.id tip的id
    * @param {String} options.target tip的触发对象
    * @param {String} options.targetWrap target的最外层，默认网页的最外层为body，因为有可能在其他元素中定位
    * @param {String} options.header tip标题
    * @param {String} options.html tip的html内容
    * @param {String} options.render render事件，动态内容
    * @param {String} options.width 宽度
    * @param {String} options.isTrack 是否鼠标跟随
    * @param {String} options.isArrow 是否需要箭头
    * @param {String} options.arrowDirection 设箭头位置，默认是向上向下，可选是向左向右
    * @param {String} options.event 触发显示tip
	* @return {Object} tip对象
	*/
	var Tip = function(o){
		var 
			/**
			* 全局对象
			* @public
			*/
			g = this,
			
			/**
			* 默认配置
			* @private
			*/
			p = {
				id             : 'l-tip-'+(new Date()).valueOf(),
				target         : '',
				targetWrap     : 'body',          //target的最外层，默认网页的最外层为body，因为有可能在其他元素中定位
				header         : '',              //tip是否有标题
				html           : '',              //tip的内容
				render         : null,            //tip的内容事件，与data-tip、html互斥
				width          : 150,
				isTrack        : false,           //是否鼠标跟随
				isArrow        : true,           //是否需要箭头
				arrowDirection : 'topBottom',     //设箭头位置，默认是向上向下，可选是向左向右
				//isInitShow     : false,           //初始化显示tip
				event          : 'mouseover'      //触发显示tip
			},
			
			/**
			* 内部对象
			* @private
			*/
			c = {
				createHeader: function(){
					var tipHeader = p.tipHeader;
					if( tipHeader ){
						p.tipMain.append('<h5>'+ tipHeader +'</h5>');
					}
				},
				
				createContent: function(){
					var h = '';
					
					if( p.render && saogaUI.base.isFunction(p.render) ){
						h = p.render(p.target);
					}else if(p.html){
						h = p.html;
					}else{
						h = p.target.attr('data-tip');
					}
					
					if( !p.tipMain.find('.l-tipMain-text').length ){
						p.tipMain.append('<div class="l-tipMain-text">'+ h +'</div>');
					}
				},
				
				arrow: function(){
					if( p.isArrow ){
						var tipWrap          = p.tipWrap.addClass('l-tip-Arrow'),
							tipArrow         = tipWrap.prepend('<span class="l-tipArrow"></span>').find('.l-tipArrow'),
							tipWrapHeight    = tipWrap[0].offsetHeight,
							tipWrapWidth     = tipWrap[0].offsetWidth,
							target           = p.target,
							targetWidth      = target[0].offsetWidth,
							targetHeight     = target[0].offsetHeight,
							targetTop        = target.offset().top,
							targetLeft       = target.offset().left,
							targetWrap       = p.targetWrap,      
							targetWrapWidth  = targetWrap[0].offsetWidth,
							targetWrapHeight = targetWrap[0].offsetHeight,
							arrowDirection   = p.arrowDirection,
							top              = 0,
							left             = 0;
						
						if( arrowDirection === 'topBottom' ){
							tipArrow.addClass('l-tipArrow-topBottom');
							var tipArrowH = tipArrow.height(),
								tipArrowW = tipArrow.width();
							/*判断obj在左还是在右*/
							if( targetLeft < targetWrapWidth/2 - targetWidth/2 ){
								left = targetLeft;
								/*判断obj在上还是在下*/
								if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
									top = targetTop + targetHeight + tipArrowH;
									tipArrow.addClass('l-tipArrow-topLeft');
								}else{
									top = targetTop - tipWrapHeight - tipArrowH;
									tipArrow.addClass('l-tipArrow-bottomLeft');
								}
							}else{
								left = targetLeft + targetWidth - tipWrapWidth;
								/*判断obj在上还是在下*/
								if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
									top = targetTop + targetHeight + tipArrowH;
									tipArrow.addClass('l-tipArrow-topRight');
								}else{
									top = targetTop - tipWrapHeight - tipArrowH;
									tipArrow.addClass('l-tipArrow-bottomRight');
								}
							}
						}else{
							var tipArrowH = tipArrow.height(),
								tipArrowW = tipArrow.width();
							tipArrow.addClass('l-tipArrow-leftRight');
							/*判断obj在左还是在右*/
							if( targetLeft < targetWrapWidth/2 - targetWidth/2 ){
								left = targetLeft + targetWidth + tipArrowW;
								/*判断obj在上还是在下*/
								if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
									top = targetTop;
									tipArrow.addClass('l-tipArrow-leftTop');
								}else{
									top = targetTop + targetHeight - tipWrapHeight;
									tipArrow.addClass('l-tipArrow-leftBottom');
								}
							}else{
								left = targetLeft - targetWidth -tipArrowW;
								/*判断obj在上还是在下*/
								if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
									top = targetTop;
									tipArrow.addClass('l-tipArrow-rightTop');
								}else{
									top = targetTop + targetHeight - tipWrapHeight;
									tipArrow.addClass('l-tipArrow-rightBottom');
								}
							}
						}
						/*var tipArrowTop    = tipArrow.css('top') !='auto' ? parseInt(tipArrow.css('top')) : 0,
						    tipArrowLeft   = tipArrow.css('left') !='auto' ? parseInt(tipArrow.css('left')) : 0,
						    tipArrowBottom = tipArrow.css('bottom') !='auto' ? parseInt(tipArrow.css('bottom')) : 0,
							tipArrowRight  = tipArrow.css('right') !='auto' ? parseInt(tipArrow.css('right')) : 0;
							
						tipWrap.css({top:top,left:left + tipArrowLeft + tipArrowRight});*/
						tipWrap.css({top:top,left:left});
						
						//console.log(tipArrow.position().left)
					}
				},
				
				defaultPositon: function(){
					var tipWrap      = p.tipWrap.addClass('l-tip-default'),
						top          = 0,
						left         = 0,
						target       = p.target,
						targetWidth  = target[0].offsetWidth,
						targetHeight = target[0].offsetHeight,
						targetOffset = target.offset(),
						targetTop    = targetOffset.top,
						targetLeft   = targetOffset.left,
					
					left = targetLeft;
					top = targetTop + targetHeight + 5;
					tipWrap.css({top:top, left:left});
				},
				
				trackMouse: function(){
					if( p.isTrack ){
						var tipWrap       = p.tipWrap.addClass('l-tip-track'),
							mousePosition = saogaUI.ui.mousePosition();
						tipWrap.css({top:mousePosition.positionY + 5, left:mousePosition.positionX  + 5});
					}
				},
				
				remove: function(){
					p.tipWrap.remove();
					//p = null;
					//c = null;
					//g = null;
				},
				
				run:function(){
					this.createHeader();
					this.createContent();
					this.defaultPositon();
					this.trackMouse();
					this.arrow();
				},
				
				/**
				* 初始化
				*/
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined ){
							p[key] = o[key];
						}
					}
					
					var target = p.target,
						event  = p.event,
						isShow = false;
					

					$('body').off(event, target).on(event, target, function(e){
						
						/*载入容器*/
						var wrap   = saogaUI.ui.wrap(),
							h	   = '',
							id     = p.id,
							width  = p.width;
						
						h += '<div id="'+ id +'" class="l-ui l-tip">';
						h += '	<div class="l-tipHeader"></div>';
						h += '	<div class="l-tipMain"></div>';
						h += '</div>';
						
						/*给p添加两个新成员*/
						p.tipWrap = wrap.prepend(h)
										.find('#'+id)
										.css({'width':width, 'z-index':saogaUI.ui.zIndex()});
						
						p.tipMain = p.tipWrap.find('.l-tipMain');
						
						/*给p修改两个成员*/
						p.target = $(e.currentTarget);
						p.targetWrap = $(p.targetWrap);
						
						c.run();
						
						/*事件是点击时*/
						if( p.event === 'click' ){
							if( $('.l-tip').length ){
								p.tipWrap.siblings('.l-tip').remove();
							}
							
							$(target).on('mouseout', function(){
								isShow = true;
							}).on('mouseover', function(){
								isShow = false;
							});
							
							p.tipWrap.on('mouseout', function(){
								isShow = true;
							}).on('mouseover', function(){
								isShow = false;
							});
							
							$(window).off('click').on('click',function(){
								if( isShow ){
									c.remove();
								}
							});
							
						}
					}).on('mousemove', target, function(){
						c.trackMouse();
					}).on('mouseout', target, function(){
						if( p.event === 'mouseover' ){
							c.remove();
						}
					});
					
					return g;
				}
			};
		
		/**
		* 关闭tip
		* @method saogaUI.ui.tip.close
		*/
		g.close = function(){
			c.remove();
		};
		
		return c.init(o);
	};
	
	return function(o){
		return new Tip(o);
	};
});
define('core/tab',['core/saogaUI'], function(saogaUI){
	
	
	
	/**
	* saogaUI.ui.pop 弹出窗控件
	* @class saogaUI.ui.tab
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options 弹出窗参数
    * @param {String} options.tabItem tab选卡对象
    * @param {String} options.tabWrap tab切换内容对象
    * @param {String} options.tabEvent 切换事件，默认click
    * @param {Number} options.tabIndex tab选卡起始位置，从0开始，默认0
    * @param {Boolean} options.isAuto 是否自动播放，默认false
    * @param {Number} options.autoTime 自动播放时间
    * @param {Number} options.autoSpeed 自动播放速度
    * @param {Function} options.onclick 切换后执行的函数
	* @return {Object} tab对象
	*/	
	var tab = function(options){

		var o = options || {};
		
		if( !o.tabItem ){return false;}
		
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
				if( !tabWrap ){ return; }
				var oTabWrap    = $(tabWrap),
					index       = tabIndex,
					oTabItem    = oTabWrap.eq(index),
					oTabAllItem = $(tabItem);
					
				oTabItem
					.show()
					.siblings(tabWrap)
					.hide();
					
				oTabAllItem
					.on(tabEvent, function(){
						index = oTabAllItem.index(this);
						tabFn.cutoverFn(index, this);
					});
					
				isAuto && tabFn.autoFn(index);
			},
			
			/*切换函数*/
			cutoverFn: function(i, that){
				var oTabWrap = $(tabWrap),
					oTabItem = oTabWrap.eq(i);
				
				//tab切换内容的html不为空才做下面动作
				if( oTabItem.html() ){
					if( autoSpeed ){
						oTabItem
							.stop(true,true)
							.fadeIn(autoSpeed)
							.siblings(tabWrap)
							.fadeOut(autoSpeed);
					}else{
						oTabItem
							.stop(true,true)
							.show()
							.siblings(tabWrap)
							.hide();
					}
					oTabItem
						.addClass('on')
						.siblings(tabItem)
						.removeClass('on');
				}else{
					oTabWrap.hide();
				}
				
				saogaUI.base.isFunction(onclick) && onclick.apply(that, [i, oTabWrap]);
			},
			
			/*自动播放函数*/
			autoFn: function(i){
				var mun   = $(tabWrap).size(),
					fAuto = function(){
									tabFn.cutoverFn(i);
									i++;
									if( i === mun ){
										i = 0;
									}
								},
					oTime = setInterval(fAuto, autoTime);
					
				$(tabItem)
					.parent()
					.hover(function(){
						clearInterval(oTime);
					},function(){
						oTime = setInterval(fAuto, autoTime);
					});
			}
		};//end tabfn
		
		tabFn.init();
	};
	
	return tab;
});
define('core/calendar',['core/saogaUI'], function(saogaUI){
	
	var calendar = function(options){
		var o = options || {};
		if(!o.trigger){return;}
		var trigger    = $(o.trigger).wrap('<div class="l-ui-calendarWrap"></div>'),
			wrap       = trigger.parent(),
			top        = o.top || trigger.outerHeight(),
			left       = o.left || 0,
			main       = wrap.append('<div class="l-ui-calendarMain" style="top:'+ top +'px;left:'+ left +'px"></div>')
							 .find('.l-ui-calendarMain'),
			callback   = o.callback,
			beginYear  = Number(o.beginYear) || 1980,
			endYear    = Number(o.endYear) ||  2050,
			language   = o.language || {
											next: '上个月',
											prev: '下个月',
											submit: '提交',
											year: '年',
											month: '月',
											time: '时间',
											weeks: ['日', '一', '二', '三', '四', '五', '六']
										},
			days       = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			weeks      = language.weeks,
			months     = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			dateFormat = o.dateFormat || 'yyyy-MM-dd hh:mm:ss',
			date       = o.date || new Date(),
			globalDate = date,
			isShowTime = /(h+)/.test(dateFormat),
			_core      = {
							/*格式化日期*/
							format: function(year, month, day, hour, minute, second, week, quarter, millisecond){
								var o = {
										// "M+" : month + 1 || date.getMonth() + 1,                                       //month
										// "d+" : day || date.getDate(),                                                  //day
										// "h+" : hour || date.getHours(),                                                //hour
										// "m+" : minute || date.getMinutes(),                                            //minute
										// "s+" : second || date.getSeconds(),                                            //second
										// "w+" : weeks[week] || weeks[date.getDay()],                                    //week
										// "q+" : Math.floor((quarter + 3) / 3) || Math.floor((date.getMonth() + 3) / 3), //quarter
										// "S"  : millisecond || date.getMilliseconds()                                   //millisecond
										'M+': month + 1,
										'd+': day,
										'h+': hour,
										'm+': minute,
										's+': second,
										'w+': weeks[week],
										'q+': Math.floor((quarter + 3) / 3),
										'S' : millisecond
									},
									str  = dateFormat;
								
								year = year.toString();
								
								if( /(y+)/.test(str) ){
									str = str.replace(/(y+)/, year.substr(4 - Math.min(4, RegExp.$1.length)));
								}
								for( var k in o ){
									if(	new RegExp("("+ k +")").test(str) ){
										if(	o[k] !== undefined && !isNaN(o[k]) ){
											str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
										}else{
											str = str.replace(/\s[^\d](.)*/, '');
										}
									}
								}
								return str;
							},
						
							/*判断闰年*/
							isLeapYear: function(y){
								if((y % 400 === 0) || (y % 100 !== 0) && (y % 4 === 0)){
									return true;
								}
								return false;
							},
							
							/*获取月份天数*/
							getDayCount: function(y, m){
								if( _core.isLeapYear(y, m) ){
									days[1] = 29;
								}else{
									days[1] = 28;
								}
								return days[m];
							},
							
							/*获取新date*/
							getNewDate: function(y, m, d) {
								var newDate = new Date();
								newDate.setFullYear(y, m, d);
								// !isNaN(y) && newDate.setFullYear(y);
								// !isNaN(m) && newDate.setMonth(m);
								// !isNaN(d) && newDate.setDate(d);
								return newDate;
							},
							
							/*获取上下月*/
							getPrevNextMonth: function(poor){
								var y = globalDate.getFullYear(),
									m = globalDate.getMonth() + poor;
								if(m < 0){
									y -= 1;
									m = 11;
								}else if(m > 11){
									y += 1;
									m = 0;
								}
								return _core.getNewDate(y, m, 1);
							},
							getPrevDate: function(){
								return _core.getPrevNextMonth(-1);
							},
							getNextDate: function(){
								return _core.getPrevNextMonth(1);
							},
							
							/*创建头部*/
							createHeader: function(){
								var html     = '',
									yearLen  = endYear - beginYear,
									i        = 0,
									monthLen = 12,
									n        = 0;
									
								html += '<a class="l-ui-calendarHeader-btn l-ui-calendarHeader-prev" href="javascript:;" title="'+ language.prev +'"></a>';
								html += '<div class="l-ui-calendarHeader-text">';
								html += '<select class="l-ui-calendarHeader-year">';
								for(; i < yearLen; i++){
									var year = beginYear + i;
									if( year === globalDate.getFullYear() ){
										html += '<option value="'+ year +'" selected>'+ year +'</option>';
									}else{
										html += '<option value="'+ year +'">'+ year +'</option>';
									}
								}
								html += '</select>' + language.year;
								html += '<select class="l-ui-calendarHeader-month">';
								for(; n < monthLen; n++){
									var month = months[n];
									if( n === globalDate.getMonth() ){
										html += '<option value="'+ n +'" selected>'+ month +'</option>';
									}else{
										html += '<option value="'+ n +'">'+ month +'</option>';
									}
								}
								html += '</select>' + language.month;
								html += '</div>';
								html += '<a class="l-ui-calendarHeader-btn l-ui-calendarHeader-next" href="javascript:;" title="'+ language.next +'"></a>';
								
								return '<div class="l-ui-calendarHeader fn-clear">'+ html +'</div>';
							},
							
							/*创建周*/
							createWeeks: function(){
								var html = '',
									i    = 0;
								html += '<div class="l-ui-calendarWeeks fn-clear">';
								for(; i < 7; i++){
									if( i === 0 ){
										html += '<span class="l-ui-calendarWeek l-ui-calendarWeek-sunday">'+ weeks[i] +'</span>';
									}else if( i === 6 ){
										html += '<span class="l-ui-calendarWeek l-ui-calendarWeek-saturday">'+ weeks[i] +'</span>';
									}else{
										html += '<span class="l-ui-calendarWeek">'+ weeks[i] +'</span>';
									}
								}
								html += '</div>';
								return html;
							},
							
							/*创建天*/
							createDays: function(){
								var //year       = date.getFullYear(),
									//month      = date.getMonth(),
									day        = date.getDate(),
									curYear    = globalDate.getFullYear(),              //当前全局date对象
									curMonth   = globalDate.getMonth(),
									curDay     = globalDate.getDate(),
									curDayNum  = _core.getDayCount(curYear, curMonth),
									prevDate   = _core.getPrevDate(),                    //获取上月的date
									prevYear   = prevDate.getFullYear(),
									prevMonth  = prevDate.getMonth(),
									prevDayNum = _core.getDayCount(prevYear, prevMonth),
									nextDate   = _core.getNextDate(),                    //获取下月的date
									nextYear   = nextDate.getFullYear(),
									nextMonth  = nextDate.getMonth(),
									lastWeek   = new Date(curYear, curMonth, 1).getDay(), //获取本月1号的星期数
									html       = '',
									p          = prevDayNum - lastWeek +1,               //上月剩余天数(礼拜从礼拜日算起)
									nextDayNuM = 42 - lastWeek - curDayNum,              //下月剩余天数
									i          = 1,
									n          = 1;

								for(; p <= prevDayNum; p++) {
									var prevDayStr =  _core.format(prevYear, prevMonth, p);
									html += '<a href="javascript:;" class="l-ui-calendarDay l-ui-calendarDay-prev l-ui-calendarDay-disable" title="'+ prevDayStr +'" year="'+ prevYear +'" month="'+ prevMonth +'">'+ p +'</a>';
								}
								
								for(; i <= curDayNum; i++){
									var cls       = '',
										curDayStr = _core.format(curYear, curMonth, i);
									if( day === i ){
										cls = ' l-ui-calendarDay-current';
									}
									html += '<a href="javascript:;" class="l-ui-calendarDay'+ cls +'" title="'+ curDayStr +'" year="'+ curYear +'" month="'+ curMonth +'">'+ i+'</a>';
								}
								
								for(; n <= nextDayNuM; n++) {
									var nextDayStr =  _core.format(nextYear, nextMonth, n);
									html += '<a href="javascript:;" class="l-ui-calendarDay l-ui-calendarDay-next l-ui-calendarDay-disable" title="'+ nextDayStr +'" year="'+ nextYear +'" month="'+ nextMonth +'">'+ n +'</a>';
								}
												
								return '<div class="l-ui-calendarDays fn-clear">'+ html +'</div>';
							},
							
							/*创建时分秒*/
							createTime: function(){
								var hour       = date.getHours(),
									minute     = date.getMinutes(),
									second     = date.getSeconds(),
									hourHtml   = '',
									minuteHtml = '',
									secondHtml = '',
									h          = 0,
									m          = 0,
									s          = 0;
									
								hour   = hour < 10 ? '0' + hour  : hour;
								minute = minute < 10 ? '0' + minute  : minute;
								second = second < 10 ? '0' + second  : second;
								
								for(; h < 24; h++){
									hourHtml += '<a href="javascript:;">'+ (h < 10 ? '0' + h  : h) +'</a>';
								}
								
								for(; m < 60; m++){
									minuteHtml += '<a href="javascript:;">'+ (m < 10 ? '0' + m  : m) +'</a>';
								}
								
								for(; s < 60; s++){
									secondHtml += '<a href="javascript:;">'+ (s < 10 ? '0' + s  : s) +'</a>';
								}
									
								return  '<div class="l-ui-calendarTime fn-clear">' +
											'<div class="l-ui-calendarTimeTitle">'+ language.time +':</div>' + 
											'<div class="l-ui-calendarTimeWrap fn-clear">' +
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-hourWrap">' +
													'<input type="text" class="l-ui-calendarTime-hourInput" value="'+ hour +'" /><span>:</span>' +
													'<div class="l-ui-calendarTime-hour">'+ hourHtml +'</div>' +
												'</div>' + 
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-minuteWrap">' + 
													'<input type="text" class="l-ui-calendarTime-minuteInput" value="'+ minute +'" /><span>:</span>' + 
													'<div class="l-ui-calendarTime-minute">'+ minuteHtml +'</div>' + 
												'</div>' + 
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-secondWrap">'  +
													'<input type="text" class="l-ui-calendarTime-secondInput" value="'+ second +'" />' + 
													'<div class="l-ui-calendarTime-second">'+ secondHtml +'</div>' + 
												'</div>'  +
											'</div>' + 
											'<a href="javascript:;" class="l-ui-calendarTimeBtn">'+ language.submit +'</a>' +
										'</div>';
							},
							
							/*点击下个月*/
							clickNext: function(){
								globalDate = _core.getPrevNextMonth(1);
								_core.init();
							},
							
							/*点击上个月*/
							clickPrev: function(){
								globalDate = _core.getPrevNextMonth(-1);
								_core.init();
							},
							
							/*年月选择*/
							clickYearMonth: function(year, month){
								globalDate = new Date(year, month, 1);
								_core.init();
							},
							
							/*关闭日历*/
							close: function(val){
								trigger.val(val);
								main.hide();
								if( saogaUI.base.isFunction(callback) ){
									callback(val);
								}
							},
				 
							/*初始化函数*/
							init: function(){
								main.html(_core.createHeader() + _core.createWeeks() + _core.createDays());
								
								main.find('.l-ui-calendarHeader-prev').click(function(){
									_core.clickPrev();
								});
								main.find('.l-ui-calendarHeader-next').click(function(){
									_core.clickNext();
								});

								main.find('.l-ui-calendarHeader-month').change(function(){
									var year  = main.find('.l-ui-calendarHeader-year').val(),
										month = $(this).val();
									_core.clickYearMonth(year, month);
								});
								main.find('.l-ui-calendarHeader-year').change(function(){
									var year  = $(this).val(),
										month = main.find('.l-ui-calendarHeader-month').val();
									_core.clickYearMonth(year, month);
								});
								
								main.find('.l-ui-calendarDay').each(function(i){
									var saturday = i%7 === 6 ? ' l-ui-calendarDay-saturday' : '',
										sunday   = i%7 === 0 ? ' l-ui-calendarDay-sunday' : '';
									$(this).addClass(saturday+sunday);
								}).click(function(){
									var self = $(this),
										val  = self.attr('title');
										
									self.addClass('l-ui-calendarDay-current')
										.siblings()
										.removeClass('l-ui-calendarDay-current');
										
									if( !isShowTime ){
										_core.close(val);
									}else{
										var curYear  = self.attr('year'),
											curMonth = self.attr('month'),
											curDay   = self.text();
										
										globalDate = _core.getNewDate(curYear, curMonth, curDay);
									}
								}).dblclick(function(){
									if( isShowTime ){
										var hour     = hourInput.val(),
											minute   = minuteInput.val(),
											second   = secondInput.val(),
											curYear  = globalDate.getFullYear(),  //当前全局date对象
											curMonth = globalDate.getMonth(),
											curDay   = globalDate.getDate(),
											val      = _core.format(curYear, curMonth, curDay, hour, minute, second);
										
										_core.close(val);
									}
								}).mouseover(function(){
									var self = $(this);
									if( !self.hasClass('l-ui-calendarDay-current') ){
										self.addClass('l-ui-calendarDay-on')
									}
								}).mouseout(function(){
									var self = $(this);
									self.remove('l-ui-calendarDay-on')
								});
								
								if( isShowTime ){
									if( !main.find('.l-ui-calendarTime').length ){
										main.append(_core.createTime());
									}
				 
									var hourInput   = main.find('.l-ui-calendarTime-hourInput'),
										minuteInput = main.find('.l-ui-calendarTime-minuteInput'),
										secondInput = main.find('.l-ui-calendarTime-secondInput'),
										inputTime   = function( o ){
														o.siblings('div')
														 .show()
														 .find('a')
														 .click(function(){
															o.val( $(this).text() )
															 .siblings('div')
															 .hide();
														 });
														o.parent().siblings().find('div').hide();
													};
									
									hourInput.click(function(){
										inputTime( $(this) );
									});
									minuteInput.click(function(){
										inputTime( $(this) );
									});
									secondInput.click(function(){
										inputTime( $(this) );
									});
									main.find('.l-ui-calendarTimeBtn').click(function(){
										var hour     = hourInput.val(),
											minute   = minuteInput.val(),
											second   = secondInput.val(),
											curYear  = globalDate.getFullYear(),  //当前全局date对象
											curMonth = globalDate.getMonth(),
											curDay   = globalDate.getDate(),
											val      = _core.format(curYear, curMonth, curDay, hour, minute, second);
										
										_core.close(val);
									});
								}
							}
						};//end code
		
		_core.init();
		trigger.click(function(){
			main.show();
		});
	};
	
	return calendar;
});
define('core/validator',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* TODO
	* saogaUI.ui.validator
	* @class saogaUI.ui.validator
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 
    * @param {String} o.id 
	* @return {Object} select对象
	*/
	
	var Validator = function(o){
		
		var 
			/**
			* 当前对象
			*/
			g = this,
			
			/**
			* 默认配置
			*/
			p = {
				target: null,
				label: null,
                text: {
                    check: '必须勾选！',
                    required: '不能为空！',
					select: '请选择！',
                    length: '输入字符长度等于{{param}}个字符',
                    minLength: '输入字符长度不小于{{param}}个字符',
                    maxLength: '输入字符长度大小于{{param}}个字符',
                    integer: '请输入一个正确的整数值',
                    digits: '请输入一个正确的正整数',
                    floatNumber: '请输入一个精确到{{param}}位小数的数值',
                    number: '请输入一个正确的数字',
                    email: '邮箱格式不正确，请检查！',
                    mobile: '手机号码不正确，请检查！如：13412345678',
                    phone: '电话号码不正确，请检查！如：0592-1234567或13412345678',
                    url: '请输入正确的网址，比如:http://www.example.com',
                    date: '',
                    format: '',
                    ajax: ''
                },
                rules:null,
                ajax:null
			},
				
			/**
			* 缓存池
			*/
			t = {
				//submit: false
			},
			
			/**
			* XXX
			* 代码逻辑
			*/
			c = {
                
                rule: {

                    /* 强制勾选 */
                    check: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
						
						// XXX
                        
                        if( oItem[0].type === 'checkbox' && !$("input:checkbox[name='"+ oItem[0].name +"']:checked").length ){
                            return c.handleText(oItem, 'check');
                        }

                        if(  oItem[0].type === 'radio' && !$("input:radio[name='"+ oItem[0].name +"']:checked").length ){
                            return c.handleText(oItem, 'check');
                        }
                    },
					
					/* 强制选择 */
					select: function(sVal, oItem, sParam){
                        if(sVal === sParam){
                            return c.handleText(oItem, 'select', sParam);
                        }
					},
                    
                    /* 非空 */
					//TODO
                    required: function(sVal, oItem){
                        if( !sVal.trims() ){
							return c.handleText(oItem, 'required');
                        }
                    },
                    
                    /* 固定长度 */
                    length: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( sVal.length !== Number(sParam) ){
                            return c.handleText(oItem, 'length', sParam);
                        }
                    },
                    
                    /* 最小长度 */
                    minLength: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if(sVal.length < sParam){
                            return c.handleText(oItem, 'minLength', sParam);
                        }
                    },
                    
                    /* 最大长度 */
                    maxLength: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if(sVal.length > sParam){
                            return c.handleText(oItem, 'maxLength', sParam);
                        }
                    },
                    
                    /* 整数 */
                    integer: function(sVal, oItem){
                        var f = parseFloat(sVal);
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if(!(!isNaN(f) && f.toString() === sVal && Math.round(f) === f)){
                            return c.handleText(oItem, 'integer');
                        }
                    },
                    
                    /* 正整数 */
                    digits: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( Number(sVal) === 0 ){
                            return c.handleText(oItem, 'digits');
                        }
                        
                        if( !/^\d+$/.test(sVal) ){
                            return c.handleText(oItem, 'digits');
                        }
                    },
                    
                    /* 浮点数 */
                    floatNumber: function(sVal, oItem, sParam){
                        var reg = new RegExp('^[0-9]+[\.][0-9]{'+ sParam +'}$');
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !reg.test(sVal) ){
                            return c.handleText(oItem, 'floatNumber', sParam);
                        }
                    },
                    
                    /* 数字 */
                    number: function(sVal, oItem){
                        sVal = sVal.trims();
                        if( isNaN(Number(sVal)) ){
                            return c.handleText(oItem, 'number');
                        }
                    },
                    
                    /* 邮箱 */
                    email: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(sVal) ){
                            return c.handleText(oItem, 'email');
                        }
                    },
                    
                    /* 手机 */
                    mobile: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !/1[34578]{1}\d{9}$/.test(sVal) ){
                            return c.handleText(oItem, 'mobile');
                        }
                    },
                    
                    /* 电话 */
                    phone: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !/(1[34578]{1}\d{9}$)|(0\d{2,3}-\d{7,8}(-\d{2,3})?$)/.test(sVal) ){
                            return c.handleText(oItem, 'phone');
                        }
                    },
                    
                    /* 网址 */
                    url: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(sVal) ){
                            return c.handleText(oItem, 'url');
                        }
                    },
                    
                    //FIXME 
                    /* 日期 */
                    date: function(sVal, oItem, sParam){
                        var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
                        if (!regex.test(sVal)) return false;
                        var d = new Date(sVal.replace(regex, '$2/$1/$3'));
                        return ( parseInt(RegExp.$2, 10) === (1 + d.getMonth()) ) && (parseInt(RegExp.$1, 10) === d.getDate()) && (parseInt(RegExp.$3, 10) === d.getFullYear() );
                    },
                    
                    format: function(sVal, oItem, sParam){
                        var reg = new RegExp(sParam);
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !reg.test(sVal) ){
                            return c.handleText(oItem, 'format');
                        }
                    },
                    
                    ajax: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        oItem.addClass('l-form-error');
                        
                        $.ajax({
                            type: 'POST',
                            url: sParam,
                            cache: false,
                            dataType: "json",
                            beforeSend: function(){
                                
                            },
                            success: function(data){
                                if( !data ){
                                    oItem.addClass('l-form-error');
									c.handleMessage(oItem, c.handleText(oItem, 'ajax'));
                                }else{
                                    oItem.removeClass('l-form-error');
                                }
                            },
                            error: function(data){
                                console.log(data);
                            }
                        });
                    }
                
                },
				
				route: function(oItem){
					
					if( !oItem.length ){ return; }
					
					var oThat      = this,
						sVal       = oItem.val(),
						aRule      = oItem.attr('data-validate').split(';'),
						len        = aRule.length,
						i          = 0,
						rCode      = /\=/,
						rFormat    = /format\=|ajax\=/,
						isFunction = saogaUI.base.isFunction;
						
					for(; i<len; i++){
						var fRule    = null,
							sText    = '',
							sType    = '',
							sTypeVal = '';
						
						if( rCode.test(aRule[i]) ){
							var aChild = aRule[i].split('=');
							
							if( rFormat.test(aRule[i]) ){
								if( aChild[0] === 'format' ){
									aChild = ['format', aRule[i].replace(rFormat,'')];
								}else{
									var tmpVal = '';
									tmpVal = aRule[i].replace(rFormat,'');
									tmpVal = tmpVal.replace(/{{value}}/, sVal);
									aChild = ['ajax', tmpVal];
								}
							}
							
							fRule    = oThat.rule[aChild[0]];
							sType    = aChild[0];
							sTypeVal = aChild[1];
							
							if( fRule && isFunction(fRule) ){
								sText = fRule(sVal, oItem, aChild[1]);
							}
							
						}else{
							
							fRule = oThat.rule[aRule[i]];
							sType = aRule[i];
							
							if( fRule && isFunction(fRule) ){
								sText = fRule(sVal, oItem);
							}
						}

						if( sText ){
							return {
								html: sText,
								type: sType,
								typeVal: sTypeVal
							};
						}
					}
					
					return null;
				},
				
                handleText: function(oItem, sMark, sParam){
                    var arrtText    = oItem.attr('data-validate-'+ sMark +'Text'),
                        defaultText = p.text[sMark],
                        text        = arrtText ? arrtText : defaultText,
                        reg         = /{{param}}/;
					oItem.attr('data-validate-'+ sMark +'Text', text);
                    return text.replace(reg, sParam);
                },
				
				handleMessage: function(oSelf, sContents, sType, sTypeVal){
					var oThat    = this,
						parents  = oSelf.parents('.ui-form'),
						message  = parents.find('.ui-form-message'),
						error    = parents.find('.l-form-error'),
						oItems   = parents.find('[data-validate]'),
						oTarget  = p.target,
						html     = sContents;

					if( !message.length ){
						if( oSelf.next('.ui-form-message').length ){
							message = oSelf.next('.ui-form-message');
						}else if( message.length === 0 ){
							message = oTarget.find('.ui-form-message');
							message.length === 1 && message.html( html );
							if(!g.getStatus()){
								return;
							}
						}
					}

					if( !html ){
						message.empty();
						return false;
					}
					if( oItems.length !== 1 && error.length && sType ){
						html = '<span class="error"><i></i>'+ oThat.handleText(error.eq(0), sType, sTypeVal) +'</span>';
					}
					
					message.html( html );
				},
				
				handleError: function(oSelf, type, html, typeVal){
					var oThat      = this,
						sHideError = oSelf.attr('data-ishideValidte'),
						errorCls   = (sHideError === "true" && sHideError) ? 'l-form-error l-form-hideError' :'l-form-error';

					if( html ){
						oSelf
							.addClass(errorCls)
							.attr('data-validate-result', 'false')
							.parents('.l-select-wrap')
							.find('.l-select-single-init')
							.addClass(errorCls);
						oThat.handleMessage(oSelf, '<span class="error"><i></i>'+html+'</span>', type, typeVal);
					}else{
						oSelf
							.removeClass(errorCls)
							.attr('data-validate-result', 'true')
							.parents('.l-select-wrap')
							.find('.l-select-single-init')
							.removeClass(errorCls);
						oThat.handleMessage(oSelf);
					}
					
					return html;
				},
				
				run: function(){
					var oThat      = this,
						oTarget    = p.target,
                        fRules     = p.rules,
                        fAjax      = p.ajax,
						fAction    = function(oSelf){
										var sVal     = oSelf.val(),
											sRule    = oSelf.attr('data-validate'),
											name     = oSelf.attr('data-validate-name'),
											allName  = oTarget.find('[data-validate-name="'+ name +'"]'),
											errorLen = oSelf.parents('.ui-form').find('.l-form-error').length,
											oRoute   = null;

                                        if( saogaUI.base.isFunction(fRules) && sRule === 'process' ){
                                            return processHandle(sRule, fRules(oSelf), true );
                                        }
                                        
                                        if( saogaUI.base.isFunction(fAjax) && sRule === 'ajax' ){
                                            processHandle(sRule);
                                            fAjax(oSelf, function(status, isShow){
                                                processHandle(sRule, status, isShow);
                                            });
                                            return true;
                                        }

										oRoute = oThat.route(oSelf);
										
										if( name ){
											
											if( oRoute ){
												if( oRoute.type !== 'required' ){
													return sVal && oThat.handleError(oSelf, oRoute.type, oRoute.html, oRoute.typeVal);
												}
												
												return allNameHandle();
											}
											
											return oThat.handleError(allName);
										}
										
										return oRoute ? 
													oThat.handleError(oSelf, oRoute.type, oRoute.html, oRoute.typeVal) : 
													oThat.handleError(oSelf);
										
										function allNameHandle(){
											
											var obj     = allName.filter(function(){
																return this.value;
															}),
												nullObj = allName.filter(function(){
																return !this.value;
															}),
												okObj   = allName.filter(function(){
																return this.getAttribute('data-validate-result') === 'true';
															}),
												noObj   = allName.filter(function(){
																return this.getAttribute('data-validate-result') === 'false';
															})
											/*				
											console.log(
												errorLen, 
												nullObj.length, 
												okObj.length, 
												!sVal, 
												oSelf, 
												noObj, 
												oSelf.hasClass('l-form-error')
											)*/			
											
											if( errorLen ){
												
												//全部不通过
												if( errorLen === allName.length ){
													return ;
												}
												
												//当前无值且当前不通过、不是全部空值
												if( !sVal && oSelf.hasClass('l-form-error') && nullObj.length !== allName.length ){
													return oThat.handleError(oSelf);
												}
												
												//当前无值且有不通过
												if( !sVal && noObj.length ){
													return ;
												}
												
												//当前无值且有通过
												if( !sVal && okObj.length ){
													return ;
												}

												return oThat.handleError(oSelf, oRoute.type, oRoute.html, oRoute.typeVal);
											}
											
											//全部空值
											if( nullObj.length === allName.length ){
												return oThat.handleError(allName, oRoute.type, oRoute.html, oRoute.typeVal);
											}
											
											//无错且无空值
											if( !nullObj.length ){
												return ;
											}
											
											//无错且当前是空值
											if( !sVal ){
												return ;
											}
											
											return oThat.handleError(allName, oRoute.type, oRoute.html, oRoute.typeVal);
										}

                                        function processHandle(type, status, isShow){
											return !status ?
														oThat.handleError(
															oSelf, 
															type, 
															isShow ? oSelf.attr('data-validate-'+ type +'Text') : ''
														):
														oThat.handleError(oSelf);
                                        }
									},
						fUnAction  = function(oSelf){
										var sHideError   = oSelf.attr('data-ishideValidte'),
											hideErrorCls = sHideError === "true" && sHideError ?
																'l-form-error l-form-hideError' :
																'l-form-error',
											name         = oSelf.attr('data-validate-name'),
											allName      = oTarget.find('[data-validate-name="'+ name +'"]'),
											errorLen     = allName.parents('.ui-form').find('.l-form-error').length;

                                        if( oSelf[0].type === 'checkbox' || oSelf[0].type === 'radio' ){
                                            $("input[name='"+ oSelf[0].name +"']").removeClass(hideErrorCls);
                                        }
										
										if( allName.length && errorLen ){
											return ;
										}
										
										if( allName.length ){
											oThat.handleError(allName);
										}else{
											oThat.handleError(oSelf);
										}
									},
						fActionAll = function(){
										var oItem = oTarget.find('[data-validate]'),
											len   = oItem.length,
											i     = 0;
											
										for(; i<len; i++){
											if( !fAction( oItem.eq(i) ) ){
												fUnAction( oItem.eq(i) );
											}
										}
										
										return g.getStatus();
									};
					
					oTarget
						.on('blur', '[data-validate]', function(e){
							fAction( $(e.currentTarget) );
						})
						.on('focus', '[data-validate]', function(e){
							fUnAction( $(e.currentTarget) );
						})
						.on('change', 'select[data-validate]', function(e){
							fAction( $(e.currentTarget) );
						})
						.on('submit', function(){
							return fActionAll();
						})
						.on('all', function(){
							return fActionAll();
						});
						
					/*oTarget.on('blur', '.l-select-single-init', function(e){
						var obj = $(this).parents('.l-select-wrap').find('[data-validate]');
						if( obj.length ){
							fAction( obj );
						}
					});
					
					oTarget.on('focus', '.l-select-single-init', function(e){
						var obj = $(this).parents('.l-select-wrap').find('[data-validate]');
						if( obj.length ){
							fUnAction( $(e.currentTarget) );
						}
					});*/
				},
				
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
							p[key] = o[key];
						}
					}
					
					p.target = $(p.target);
					
					if( !p.target.length ){
						console.log('target not find');
					}
					
					c.run();
				}
			};
			
		g.reset = function(){
			var oTarget  = p.target,
                oItem    = oTarget.find('[data-validate]'),
                oMessage = oTarget.find('.ui-form-message'),
                len      = oItem.length,
                i        = 0;
            
            for(; i<len; i++){
                oItem
                    .eq(i)
                    .val('')
                    .removeClass('l-form-error')
                    .next('.l-select-single')
                    .find('.l-select-single-init')
                    .removeClass('l-form-error');
                oMessage.eq(i).empty();
            }
		};
		
		g.getStatus = function(){
			var oTarget         = p.target,
				oError          = oTarget.find('.l-form-error'),
				oVisibleError   = oError.filter(function(){
										var that = $(this);
										return that.filter(':visible').length && ( that.filter(':enabled').length || that.hasClass('l-select-single-init') );
									}),
				oHideError      = oError.filter('.l-form-hideError'),
				len             = oVisibleError.length + oHideError.length,
				nErrorOffsetTop = oVisibleError.length ? oVisibleError.offset().top : 0;
			
			if( oVisibleError.length && $(window).height() < nErrorOffsetTop ){
				$('html, body').animate({scrollTop:nErrorOffsetTop}, 500);
				//oVisibleError.focus();
			}
			
			return !len;
		};
		
		g.validatorAll = function(){
            return p.target.triggerHandler('all');
		};
		
		g.reload = function(){
			console.log('target overloaded');
			c.init(o);
		};

		return c.init(o);
	};
	
	return function(o){
		return o ? new Validator(o) : {};
	};
});
define('core/selectArea',['core/saogaUI'], function(saogaUI){
	
	
	
	/**
	* saogaUI.ui.selectArea 地区控件
	* @class saogaUI.ui.selectArea
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options selectArea参数
    * @param {Object} options.data 数据源
    * @param {Object} options.initValue 初始值
    * @param {String} options.initValue.province 省级初始值
    * @param {String} options.initValue.city 市级初始值
    * @param {String} options.initValue.county 区、县级初始值
    * @param {String} options.province 省级对象选择器
    * @param {String} options.city 市级对象选择器
    * @param {String} options.county 区、县级对象选择器
	*/
	var selectArea = function(options){
		var data         = options.data ? options.data : [],
			initValue    = options.initValue ? options.initValue : {province:'',city:'',county:''},
			provinceWrap = $(options.province),
			cityWrap     = $(options.city),
			countyWrap   = $(options.county),
			html         = '<option value="">不限</option>',
			g            = this,
			_core        = {
				getProvince: function(){
					var i = 0,
						l = data.length,
						s = '',
						o = this;
					
					s += html;
					
					for(; i < l; i++){
						if( data[i].Province === initValue.province ){
							s += '<option selected value="'+ data[i].Province +'" data-index="'+ i +'">'+ data[i].ProvinceName +'</option>';
							o.getCity(i);
						}else{
							s += '<option value="'+ data[i].Province +'" data-index="'+ i +'">'+ data[i].ProvinceName +'</option>';
						}
					}
					provinceWrap.html(s);
					provinceWrap.on('change', function(e){
						var that     = $(this),
							val      = that.val(),
							selected = that.find('option:selected'),
							text     = selected.text(),
							index    = selected.attr('data-index');

						o.getCity(Number(index));
						o.getcounty();
					});
				},
				
				getCity: function(index){
					if( data[index] !== undefined ){
						var s        = '',
							cityData = data[index],
							o        = this,
							i        = 0, 
							c 		 = cityData.CityArray ? cityData.CityArray.length : 0;

						s += html;
						for(; i < c; i++){
							if( cityData.CityArray[i].City === initValue.city ){
								s += '<option selected value="'+cityData.CityArray[i].City+'" data-index="'+ i +'">'+ cityData.CityArray[i].CityName +'</option>';
								o.getcounty(cityData.CityArray[i]);
							}else{
								s += '<option value="'+cityData.CityArray[i].City+'" data-index="'+ i +'">'+ cityData.CityArray[i].CityName +'</option>';
							}
						}
						cityWrap.html(s);
						cityWrap.on('change', function(e){
							var that     = $(this),
								val      = that.val(),
								selected = that.find('option:selected'),
								text     = selected.text(),
								index    = selected.attr('data-index');
							o.getcounty(cityData.CityArray[Number(index)]);
						});
					}else{
						cityWrap.html(html);
					}
				},
				
				getcounty: function(data){
					if( data !== undefined ){
						var s = '',
							o = this,
							i = 0,
							c = data.CountyArray ? data.CountyArray.length : 0;
						
						s += html;
					    for(; i < c; i++){
					    	if( data.CountyArray[i].County === initValue.county ){
							    s += '<option selected value="'+data.CountyArray[i].County+'" data-index="'+ i +'">'+ data.CountyArray[i].CountyName +'</option>';
					    	}else{
							    s += '<option value="'+data.CountyArray[i].County+'" data-index="'+ i +'">'+ data.CountyArray[i].CountyName +'</option>';
					    	}
					    }
					    countyWrap.html(s);
					}else{
						countyWrap.html(html);
					}
				},
				
				init: function(){
					provinceWrap.html(html);
					cityWrap.html(html);
					countyWrap.html(html);
				},
				
				run: function(){
					this.init();
					this.getProvince();
					return g;
				}
			};
		
		_core.run();
		
		/**
		* selectArea 重置
		* @method saogaUI.ui.selectArea.reset
		* @return {Object} 
		*/
		g.reset = function(){
			cityWrap.html(html);
			countyWrap.html(html);
			provinceWrap.find('option').eq(0).attr('selected', true);
			cityWrap.find('option').eq(0).attr('selected', true);
			countyWrap.find('option').eq(0).attr('selected', true);
			
			return g;
		};
		
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new selectArea(o);
	};

});
define('core/select',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* saogaUI.ui.select 下拉框控件
	* @class saogaUI.ui.select
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 下拉框参数
    * @param {String} o.id 下拉框id
	* @return {Object} select对象
	*/
	
	var Select = function(o){
		
		var 
			/**
			* 当前对象
			*/
			g = this,
			
			/**
			* 默认配置
			*/
			p = {
					id           : 'l-select-'+(new Date()).valueOf(),
					data         : null,
					selectedData : null,
					ajax         : null,
					//isSimple     : true,   //是否是简单的数据格式
					target       : null,
					wrap         : null,   //target外框，一般不设置
					width        : 200,
					height       : 'auto',
					type         : 'single', //multiple、single、tree
					checkbox     : false,  //multiple时设置有效，与radio互斥
					radio        : false,  //multiple时设置有效，与checkbox互斥
					isArrow      : true,
					name         : '',
					onClick      : null,
					onRightClick : null,
					onMouseOver  : null,
					onMouseOut   : null,
					onLoad       : null,
					onDel        : null,
					isAllowEnter : true,
                    check        : null
				},
				
			/**
			* 缓存池
			*/
			t = {
				data:[], //临时数据
				selectedData:[]  //选中的数据
			},
			
			/**
			* 代码逻辑
			*/
			c = {
					//TODO
					move:function(obj, item, index){
						var objOrigin      = obj[0],
							scrollHeight   = objOrigin.scrollHeight,
							//offsetHeight  = objOrigin.offsetHeight,
							clientHeight   = objOrigin.clientHeight,
							offsetTop      = objOrigin.offsetTop,
							itemOffsetTop  = item[0].offsetTop,
							itemHeight     = item.outerHeight(),
							itemOffsetTop2 = item.offset().top - obj.offset().top;           
							
						//console.log(itemOffsetTop,clientHeight,offsetTop, item.offset().top - obj.offset().top );
						console.log( itemOffsetTop,itemOffsetTop2,clientHeight, Math.ceil(scrollHeight / clientHeight) );
						
						if( item.offset().top - obj.offset().top > clientHeight ){
							//scrollTop = ;
							//obj.scrollTop(obj.scrollTop() + itemHeight);
						}
						if( item.offset().top - obj.offset().top > itemOffsetTop - clientHeight ){
							//scrollTop = obj.scrollTop() + itemHeight;
						}
						
						if( itemOffsetTop + itemHeight > clientHeight ){
							obj.scrollTop(obj.scrollTop() + itemHeight);
						}
						if( itemOffsetTop2 < itemHeight ){
							console.log(obj.scrollTop(),itemHeight);
							obj.scrollTop(obj.scrollTop() - itemHeight);
						}
						
					},
					
					show:function(obj){
						var allDownWrap = $('.l-select-down'),
							downWrap    = obj.find('.l-select-down'),
							wrap        = $('.l-select-wrap');

						allDownWrap.addClass('fn-hide');
						downWrap.removeClass('fn-hide');
						wrap.css({'z-index':''});
						obj.css({'z-index':'10'});
					},
					
					close:function(){
						var downWrap = $('.l-select-down'),
							wrap     = $('.l-select-wrap');
						
						downWrap.addClass('fn-hide');
						wrap.css({'z-index':''});
					},
					
					/**
					* 创建single html
					*/
					createSingleHtml: function(){
						var target  = p.target,
							isArrow = p.isArrow,
							len     = p.target.length,
							i       = 0;
						
						/*遍历多个target*/						
						for(; i<len; i++){
                            var selectItem      = target.eq(i);
                            
                            if( selectItem.parent().hasClass('l-select-wrap') ){
                                continue;
                            }
                            
							var selectItemWidth = selectItem.outerWidth(),
								selectItemClass = selectItem[0].className,
								selectItemVal   = selectItem.wrap('<div class="l-select-wrap"></div>')
															.after('<div class="l-select-single"><div class="l-select-single-init '+ selectItemClass +'"></div><div class="l-select-down fn-hide"><ul class="l-select-single-ul"></ul></div></div>')
															.val(),
								selectedItem    = selectItem.find('option:selected'),
								option          = selectItem.find('option'),
								optionLen       = option.length,
								h               = 0,
								single          = selectItem.next('.l-select-single'),
								singleInit      = single.find('.l-select-single-init'),
								singleInitHtml  = selectedItem.html(),
								singleUl        = single.find('.l-select-single-ul'),
								singleUlHtml    = '';
								
							if( isArrow ){
								single.append('<div class="l-select-single-arrow"></div>');
								singleInit.addClass('l-select-single-init-arrow');
							}
							
							/*遍历select中的option*/
							for(; h<optionLen; h++){
								var optionItem     = option.eq(h),
									optionItemVal  = optionItem.val(),
									optionItemHtml = optionItem.html();
									
								if( optionItemVal === selectItemVal && optionItemVal !== '' ){
									singleUlHtml += '<li class="l-select-single-li on" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}else{
									singleUlHtml += '<li class="l-select-single-li" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}
							}
							
							//selectItem.hide();
							singleInit
								.html(singleInitHtml)
								.width(selectItemWidth);
								
							singleUl
								.html(singleUlHtml)
								.width(singleInit.outerWidth()-2);
								
							p.wrap = p.target.parent();
						}
					},
					
					/**
					* 刷新single html
					*/
					refreshSingleHtml:function(){
						var target  = p.target,
							len     = p.target.length,
							i       = 0;
						
						/*遍历多个target*/						
						for(; i<len; i++){
							var selectItem      = target.eq(i),
                                selectItemWidth = selectItem.outerWidth(),
								selectItemVal   = selectItem.val(),
								selectedItem    = selectItem.find('option:selected'),
								option          = selectItem.find('option'),
								optionLen       = option.length,
								h               = 0,
								single          = selectItem.next('.l-select-single'),
								singleInit      = single.find('.l-select-single-init'),
								singleInitHtml  = selectedItem.html(),
								singleUl        = single.find('.l-select-single-ul'),
								singleUlHtml    = '';
							
							/*遍历select中的option*/
							for(; h<optionLen; h++){
								var optionItem     = option.eq(h),
									optionItemVal  = optionItem.val(),
									optionItemHtml = optionItem.html();
									
								if( optionItemVal === selectItemVal && optionItemVal !== '' ){
									singleUlHtml += '<li class="l-select-single-li on" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}else{
									singleUlHtml += '<li class="l-select-single-li" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}
							}
							
							singleInit
								.html(singleInitHtml)
								.width(selectItemWidth);
								
							singleUl
								.html(singleUlHtml);
								//.width(singleInit.outerWidth()-2);
								//console.log(singleInit.outerWidth()-2,selectItemWidth)
								
							p.wrap = p.target.parent();
						}
					},
					
					/**
					* single事件处理
					*/
					singleFn: function(){
						var that   = this,
							wrap   = p.wrap,
							item   = null,
							win    = $('body'),
							isShow = false;
							
						saogaUI.ui.onselectstart(wrap);
						
						wrap
							.on('click', '.l-select-single-li', function(e){
								var self          = $(e.currentTarget),
									index         = self.attr('data-index'),
									html          = self.html(),
									select        = self.parents('.l-select-wrap').find('select'),
									option        = select.find('option'),
									optionCurrent = option.eq(index),
									singleInit    = self.parent().prev();
								
								isShow = false;
								singleInit.html(html);
								option.attr('selected', false);
								optionCurrent.attr('selected', true);
								that.close();
								select.trigger('change');
							})
							.on('mouseover', '.l-select-single-li', function(e){
								var self     = $(e.currentTarget),
									siblings = self.siblings();
									
								self.addClass('on');
								siblings.removeClass('on');
							})
							.on('click','.l-select-single-init',function(e){
								var self    = $(e.currentTarget),
									parents = self.parents('.l-select-wrap'),
									width   = self.outerWidth(),
									singleUl= parents.find('.l-select-single-ul');
									
								singleUl.width(width-2); //修复refreshSingleHtml时获取宽度有误
									
								isShow = true;
								item   = self;  //点击后获取对象
								that.show(parents);
								e.stopPropagation();
								return false;
							})
							.on('change','select',function(){
								that.refreshSingleHtml();
							})
                            .on('click','.l-select-single-arrow',function(e){
                                var self       = $(e.currentTarget),
                                    singleInit = self.siblings('.l-select-single-init');
									
                                singleInit.trigger('click');
                                e.stopPropagation();
                            });

						win
							.on('click',function(){
								if( isShow ){
									that.close();
									isShow = false;
								}
							})
							.on('keydown',function(e){
								if(isShow && item){
									var down   = item.next().find('.l-select-single-ul'),
										li     = down.find('.l-select-single-li'),
										len    = li.length,
										index  = down.find('.on').attr('data-index');

									e.stopPropagation();
									switch(e.keyCode){
										case 13:
											item.html(li.eq(index).html());
											that.close();
											isShow = false;
										break;
										case 38:
											if(index > 0){
												index --;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down, down.find('.on'), index);
											}
											e.preventDefault();
										break;
										case 40:
											if(index < len-1){
												index++;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down, down.find('.on'), index);
											}
											e.preventDefault();
										break;
									}
								}
							});
					},
					
					/**
					* 创建multiple html
					*/
					createMultipleHtml: function(){
						var target = p.target,
							wrap   = target.parent(),
							width  = p.width,
							name   = p.name,
							html   = '<div class="l-select-multiple-selected fn-clear" style="width:'+ width +'px">'+
										'<ul>'+
											'<li class="l-select-multiple-selected-input">'+
												'<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="l-select-multiple-input" />'+
											'</li>'+
										'</ul>'+
									'</div>'+
									'<div class="l-select-down fn-hide"><ul class="l-select-multiple-down" style="width:'+ (width-2) +'px"></ul></div>';
								
						$.each(target, function(i, item){
							var oItem = $(item),
								oWrap = oItem.parent();
							if( !oWrap.hasClass('l-select-wrap') ){
								oWrap = oItem.wrap('<div class="l-select-wrap" data-index="'+ i +'"></div>').parent();
							}
							if( !oWrap.find('.l-select-multiple').length ){
								if( name ){
									oWrap.append('<input type="hidden" name="'+ name +'">');
								}
								oWrap.append('<div class="l-select-multiple" data-index="'+ i +'">'+ html +'</div>');
							}else{
								oWrap.find('.l-select-multiple').html(html);
							}
						});

						p.wrap = target.parent(); 
					},
					
					/**
					* 刷新multiple 选项html
					*/
					refreshMultipleHtml: function(index){
						var wrap        = p.wrap.eq(index),
							down        = wrap.find('.l-select-multiple-down'),
							nameObj     = wrap.find('input[name="'+ p.name +'"]'),
							checkbox    = p.checkbox,
							radio       = p.radio,
							input       = wrap.find('.l-select-multiple-input'),
							val         = input.val(),
							isHasVal    = val === '' || val === undefined,
							data        = ( checkbox || radio ) ? ( isHasVal ? p.data : t.data[index] ) : t.data[index],
							dataLen     = data ? data.length : 0,
							i           = 0,
							str         = '',
							textWidth   = p.width - 48;
							
						//console.log('aa', t.data)
							
						if( checkbox ){
							str += '<li class="fn-clear"><span class="l-checkbox l-checkbox-all fn-left"></span><span class="fn-left">全选</span></li>';
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li'+ (i === 0 ? ' on' : '') +' fn-clear" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'" data-index="'+ i +'">'+ 
											'<span class="l-checkbox fn-left l-checkbox-'+ i +'"></span>' +
											'<span class="fn-left" style="width:'+ textWidth +'px">' +
												data[i].name +
											'</span>' +
										'</li>';
							}
						}else if( radio ){
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li'+ (i === 0 ? ' on' : '') +' fn-clear" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'" data-index="'+ i +'">'+ 
											'<span class="l-radio fn-left l-radio-'+ i +'"></span>' +
											'<span class="fn-left" style="width:'+ textWidth +'px">' +
												data[i].name +
											'</span>' +
										'</li>';
							}
						}else{
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li l-select-multiple-down-li-'+ i + (i === 0 ? ' on' : '') +'" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'">'+ data[i].name +'</li>';
							}
						}
						down.html( dataLen ? str : '' );
						nameObj.val( !dataLen ? val : '' );
					},
					
					/**
					* multiple修改已选数据
					*/
					modifyMultipleSelectedData: function(index, input){
						var inputVal     = input.val(),
							checkbox     = p.checkbox,
							radio        = p.radio;
							
						if( ( checkbox || radio ) && inputVal === '' ){ return; }
						
						t.data[index] = dataHandle(t.selectedData[index], input);
						
						return;
						
						function dataHandle(selectedData, input){
							
							var data         = p.data,
								dataLen      = data ? data.length :0,
								y            = 0,
								isSelected   = false,
								tmp          = [],
								len          = selectedData ? selectedData.length : 0,
								inputVal     = input.val(),
								reg          = new RegExp((inputVal?inputVal:'').toLowerCase()),
								name         = null;
								
							for(; y<dataLen; y++){
						
								//val        = reg.test( (data[y].val ? data[y].val + '' : '').toLowerCase() );
								name       = reg.test( (data[y].name ? data[y].name + '' : '').toLowerCase() );
								isSelected = false;
								
								//过滤已选数据
								for(var h = 0; h<len; h++){
									if( selectedData[h] && selectedData[h].name === data[y].name ){
										isSelected = true;
									}
								}
								
								if( /*val || */ name && ( !isSelected || ( checkbox || radio ) ) ){
									tmp.push(data[y]);
								}
							}
							
							return tmp;
						}
					},

					/**
					* multiple事件处理
					*/
					multipleFn: function(){
						var that      = this,
							target    = p.target,
							wrap      = p.wrap,
							checkbox  = p.checkbox,
							radio     = p.radio,
							selected  = wrap.find('.l-select-multiple-selected'),
							input     = wrap.find('.l-select-multiple-input'),
							down      = wrap.find('.l-select-multiple-down'),
							data      = p.data,
							dataLen   = data ? data.length :0,
							win       = $('body'),
							isShow    = false,
							coreFn    = {
							
								/*修改input*/
								setInputSize: function(index, selected, input, down){
									var last           = selected.find('.l-select-multiple-selected-li:last'),
										lastWidth      = last.outerWidth(),
										lastOffset     = last.offset(),
										lastLeft       = lastOffset ? lastOffset.left : 0,
										selectedOffset = selected.offset(),
										selectedLeft   = selectedOffset ? selectedOffset.left : 0,
										width          = p.width,
										isHidden       = selected.is(':hidden');
									
									if( input.width() <= width || width < 10 ){
										width = width - (lastLeft + lastWidth - selectedLeft + 5);
									}
									
									if( !last.length ){
										width = p.width;
									}
									
									input
										.focus()
										.width(width);
									down.css({
										top: function(){
											if( isHidden ){
												var parents = selected
																.parents(':hidden')
																.filter(function(){
																	var oStyle = this.currentStyle ? this.currentStyle : window.getComputedStyle(this, false);
																	return oStyle.display === 'none';
																})
																.show(),
													height  = selected.outerHeight();
												parents.hide();
												return height;
											}
											return selected.outerHeight();
										}
									});
									
								},
								
								/*设置已选id，并已字符串返回*/
								setSelectedInput: function(index, selected, input, down){
									var item     = selected.find('.l-select-multiple-selected-li'),
										len      = item.length,
										h        = 0,
										idArr    = [],
										nameArr  = [],
										valArr   = [];
										
									for(; h<len; h++){
										var oItem = item.eq(h);
										idArr.push(oItem.attr('data-id'));
										nameArr.push(oItem.attr('data-name'));
										valArr.push(oItem.attr('data-val'));
									}
									
									target
										.eq(index)
										.val(idArr.join())
										.attr({
											'data-name' : nameArr.join(),
											'data-val' : valArr.join()
										});
								},
								
								/*添加已选*/
								addSelectItem: function(obj, isAll){
									var id        = obj.attr('data-id'),
										parents   = obj.parents('.l-select-wrap'),
										index     = parents.attr('data-index'),
										i         = 0,
										inputVal  = input.eq(index).val(),
										checkbox  = p.checkbox,
										isRefresh = true;
									
									if( !t.selectedData[index] ){
										t.selectedData[index] = [];
									}
									
									if( isAll ){
										t.selectedData[index] = t.selectedData[index].concat(data); //浅拷贝
									}else{
										for(; i<dataLen; i++){
											if( Number(data[i].id) === Number(id) ){
												if( radio ){
													t.selectedData[index] = [];
												}
												t.selectedData[index].push(data[i]);
											}
										}
									}
									
									if( checkbox || radio ){
										isRefresh = false;
									}
									
									coreFn.initSelected(inputVal, isRefresh, index);
								},
								
								/*删除已选*/
								removeSelectItem: function(obj, isAll){
									var id           = obj.attr('data-id'),
										parents      = obj.parents('.l-select-wrap'),
										index        = parents.attr('data-index'),
										selectedData = t.selectedData[index],
										len          = selectedData.length,
										i	         = 0,
										inputVal     = input.val(),
										isRefresh    = true;
										
									//删除已选
									if( checkbox && isAll ){
										t.selectedData[index] = [];
									}else{
										for(; i<=len; i++){
											if(selectedData[i] && Number(selectedData[i].id) === Number(id)){
												t.selectedData[index].splice(i, 1);
											}
										}
									}
									
									if( checkbox ){
										isRefresh = false;
									}

									coreFn.initSelected(inputVal, isRefresh, index);
								},
								
								/*选中处理*/
								initSelected: function(inputVal, isRefresh, index){

									var data          = p.data,
										dataLen       = data.length,
										selectedData  = t.selectedData[index],
										len           = selectedData ? selectedData.length : 0,
										i             = 0,
										selectedClass = '',
										selectedIndex = '',
										str           = '',
										checkbox      = p.checkbox,
										itemMaxWidth  = p.width - 34, //XXX 暂时写死
										itemStyleStr  = 'style="max-width:'+ itemMaxWidth +'px"',
										selectedObj   = selected.eq(index),
										inputIObj     = input.eq(index),
										downObj       = down.eq(index);

									isRefresh = isRefresh === undefined ? true : isRefresh;

									//重获数据
									if( isRefresh ){
										that.modifyMultipleSelectedData(index, inputIObj);
									}
									that.refreshMultipleHtml(index);
									
									for(; i<len; i++){

										if( checkbox || radio ){
											var downAllItem = downObj.find('.l-select-multiple-down-li'),
												downItemLen = downAllItem.length;
											
											for(var j = 0; j<dataLen; j++){
												var downItem = downAllItem.eq(j);
	
												if( Number(downItem.attr('data-id')) === Number(selectedData[i].id) ){
													downItem
														.find('.l-checkbox')
														.addClass('l-checkbox-selected')
														.end()
														.find('.l-radio')
														.addClass('l-radio-selected');
													selectedClass = ' l-select-multiple-selected-li-'+j;
													selectedIndex = ' data-index="'+ j +'"';
												}
											}
											
											if( len === dataLen || (downAllItem && downAllItem.find('.l-checkbox-selected').length === downItemLen) ){
												downObj.find('.l-checkbox-all').addClass('l-checkbox-selected');
											}
										}
										
										str += '<li class="l-select-multiple-selected-li'+ 
														selectedClass +'" data-id="'+ 
														selectedData[i].id +'" data-val="'+ 
														selectedData[i].val +'" data-name="'+ 
														selectedData[i].name +'"'+ 
														itemStyleStr +
														selectedIndex +
												'>'+ 
													selectedData[i].name +
													'<span class="l-select-multiple-selected-del">x</span>'+
												'</li>';
												
									}//end for
									

									
									selectedObj
										.find('.l-select-multiple-selected-li')
										.remove()
										.end()
										.find('.l-select-multiple-selected-input').before(str); 
									inputIObj
										.eq(index)
										.val(inputVal);

									coreFn.setInputSize(index, selectedObj, inputIObj, downObj);
									coreFn.setSelectedInput(index, selectedObj, inputIObj,  downObj);
									
								}//end initSelected
								
							};//end coreFn
						
						/* 初始化 */
						if( p.data ){
							if( p.selectedData ){
								t.selectedData[0] = p.selectedData;
							}
							$.each(wrap, function(i){
								coreFn.initSelected('', true, i);
							});
							
	
							saogaUI.ui.onselectstart(wrap);
						}
						
						/*给 wrap容器对象 绑定相关事件*/
						wrap
							.on('click','.l-select-multiple-selected',function(e){
								var parents = $(e.currentTarget).parents('.l-select-wrap'),
									index   = parents.attr('data-index');
								e.stopPropagation();
								input.eq(index).focus();
								isShow = true;
								that.show(parents);
							})
							.off('click', '.l-select-multiple-down-li')
							.on('click', '.l-select-multiple-down-li', function(e){
								e.stopPropagation();
								isShow = true;
								
								var self = $(e.currentTarget);
								
								if( checkbox ){
									self.find('.l-checkbox').trigger('click');
								}else{
									if(radio){
										down.find('.l-radio')
											.removeClass('l-radio-selected');
										self.find('.l-radio').addClass('l-radio-selected');
									}
									coreFn.addSelectItem(self);
								}
								if( saogaUI.base.isFunction( o.onClick ) ){
									o.onClick.apply(self, [self]);
								}
							})
							.on('mouseover', '.l-select-multiple-down-li', function(e){
								var self     = $(e.currentTarget),
									siblings = self.siblings();
								self.addClass('on');
								siblings.removeClass('on');
							})
							.off('click', '.l-checkbox')
							.on('click', '.l-checkbox', function(e){
								e.stopPropagation();
								var self        = $(e.currentTarget),
									index       = self.parents('.l-select-multiple').attr('data-index'),
									downItem    = down.find('.l-select-multiple-down-li'),
									allCheckbox = down.find('.l-checkbox');
									
								if( self.hasClass('l-checkbox-selected') ){
									if( self.hasClass('l-checkbox-all') ){
										allCheckbox.removeClass('l-checkbox-selected');
										coreFn.removeSelectItem(downItem, true);
									}else{
										allCheckbox
											.eq(0)
											.removeClass('l-checkbox-selected');
										self.removeClass('l-checkbox-selected');
										coreFn.removeSelectItem(self.parent());
									}
								}else{
									if( self.hasClass('l-checkbox-all') ){
										t.selectedData[index] = [];
										coreFn.addSelectItem(downItem, true);
									}else{
										self.addClass('l-checkbox-selected');
										coreFn.addSelectItem(self.parent());
									}
								}
								
							})
							.on('click', '.l-select-multiple-selected-li', function(e){
								$(e.currentTarget).find('.l-select-multiple-selected-del').trigger('click');
							})
							.on('click','.l-select-multiple-selected-del', function(e){
								var selectedItem  = $(e.currentTarget).parent(),
									selectedIndex = selectedItem.attr('data-index'),
									checkbox      = down.find('.l-checkbox-'+selectedIndex),
									allCheckbox   = down.find('.l-checkbox-all');
								
								checkbox.removeClass('l-checkbox-selected');
								allCheckbox.removeClass('l-checkbox-selected');
								coreFn.removeSelectItem(selectedItem);
								
								if( saogaUI.base.isFunction( o.onDel ) ){
									o.onDel.apply(selectedItem, [selectedItem]);
								}
							})
							.on('click', '.l-select-multiple-input', function(e){
								var parents = $(e.currentTarget).parents('.l-select-wrap');
									
								e.stopPropagation();
								isShow = true;
								that.show(parents);
							})
							.off('keyup', '.l-select-multiple-input')
							.on('keyup', '.l-select-multiple-input', function(e){
								var self            = $(e.currentTarget),
									parents         = self.parents('.l-select-wrap'),
									index           = parents.attr('data-index'),
									code            = e.keyCode,
									val             = self.val(),
									//i               = 0,
									//selectedData    = t.selectedData,
									//selectedDataLen = selectedData.length,
									valReg          = /\\|\[|\]|\*|\(|\)|\+|\?/,
									itemLast        = selected.eq(index).find('.l-select-multiple-selected-li:last');

								if( code !== 38 || code !== 40 || code !== 13 ){
									t.data[index] = [];
									isShow = true;
									that.show(parents);
									
									//过滤特殊符号
									if( valReg.test(val) ){
										val = val.replace(valReg, '');
									}
									
									if( code === 8 && val === '' && itemLast.length ){
										return false;
									}
									coreFn.initSelected(val, true, index);
								}
							})
							.off('keydown', '.l-select-multiple-input')
							.on('keydown', '.l-select-multiple-input', function(e){
								if( !p.isAllowEnter ){return false;}
								var self     = $(e.currentTarget),
									parents  = self.parents('.l-select-wrap'),
									index    = parents.attr('data-index'),
									code     = e.keyCode,
									val      = self.val(),
									itemLast = selected.eq(index).find('.l-select-multiple-selected-li:last');
								
								if( code === 8 ){
									if( val === '' ){
										if( itemLast.hasClass('on') ){
											coreFn.removeSelectItem(itemLast);
										}else{
											itemLast.addClass('on');
										}
										return false;
									}else{
										/*val只有一个字符时，删除并刷新*/
										if( val && val.length ){
											self.val('');
											coreFn.initSelected(val, true, index);
										}
									}
								}else if(code === 38 || code === 40){
									self.blur();
									isShow = true;
									that.show(parents);
								}else if(code === 13 && val === ''){
									return false;
								}
							});//end wrap
							
						//TODO: 键盘上下键功能未实现
						/*给 window对象 绑定相关事件*/
						win
							.on('click', function(){
								if( isShow ){
									isShow = false;
									that.close();
								}
							});
							/*.on('keydown', function(e){
								if(isShow){
									var li    = down.find('.l-select-multiple-down-li'),
										len   = li.length,
										index = down.find('.on').attr('data-index');

									e.stopPropagation();
									switch(e.keyCode){
										case 13:
											input.focus();
											coreFn.addSelectItem(li.eq(index));
											isShow = false;
											that.close();
											return false;
										break;
										case 38:
											if(index > 0){
												index --;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down,li,index);
											}
											e.preventDefault();
										break;
										case 40:
											if(index < len-1){
												index++;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down,li,index);
											}
											e.preventDefault();
										break;
									}
							});}//end win*/
					},
					
					/**
					* 创建树形Html
					*/
					createTreeHtml: function(){
                        var target = p.target,
							wrap   = target.parent(),
                            name   = target.attr('name'),
							width  = p.width,
							html   = '';
							
						if( !wrap.hasClass('l-select-wrap') ){
							wrap = target.wrap('<div class="l-select-wrap"></div>').parent();
						}
                        
						html += '<div class="l-select-tree-selected fn-clear">';
						html += '		<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="l-select-tree-input" name="'+ name +'-name"  />';
						html += '</div>';
						html += '<div class="l-select-down fn-hide"><div class="l-select-tree-down" style="width:'+ width +'px"></div></div>';
						
						if( !wrap.find('.l-select-tree').length ){
							wrap.append('<div class="l-select-tree" style="width:'+ width +'px">'+ html +'</duv>');
						}else{
							wrap.find('.l-select-tree').html(html);
						}
						p.wrap = wrap; 
					},
					
					/**
					* 树形相关事件
					*/
					treeFn: function(){

						var that     = this,
							wrap     = p.wrap,
							target   = p.target,
							win      = $('body'),
							isShow   = false,
							input    = wrap.find('.l-select-tree-input'),
							selected = null,
                            isArray  = saogaUI.base.isArray,
							tree     = saogaUI.ui.tree({
										target: wrap.find('.l-select-tree-down'),
										data: p.data,
										selected: p.selectedData,
                                        check: p.check,
										onClick: function(obj, data){

											if( saogaUI.base.isFunction(p.onClick) ){
												var isFalse = p.onClick(obj, data);
												if( !( isFalse === undefined ? true : isFalse ) ){
													return false;
												}
											}
											if( isArray(data) ){
                                                var dataLen = data.length,
                                                    i       = 0,
                                                    idArr   = [],
                                                    nameArr = [];
                                                for(; i<dataLen; i++){
                                                    idArr[i]   = data[i].id;
                                                    nameArr[i] = data[i].name;
                                                }
                                                input.val(nameArr.join());
                                                target.val(idArr.join());
                                            }else{
                                                input.val(data.name);
                                                target.val(data.id);
                                            }
											
											isShow = false;
											that.close();
                                            
										},
										onLoad: p.onLoad
									});
								
						selected = tree.getSelected();
						
						var tmpNameArr = [],
							tmpIdArr   = [];
						for(var i = 0; i<selected.length; i++){
							tmpNameArr[i] = selected[i].name;
							tmpIdArr[i]   = selected[i].id;
						}
						
						input.val(tmpNameArr.join(','));
						target.val(tmpIdArr.join(','));
                        
						wrap
							.off('click', input)
							.on('click', input, function(e){
								e.stopPropagation();
								isShow = true;
								that.show(wrap);
							})
                            .on('keyup', input, function(){
                                target.val('');
								tree.refresh({
                                    selected:[]
                                });
							});
									
						/*给 window对象 绑定相关事件*/
						win.on('click', function(){
								if( isShow ){
									isShow = false;
									that.close();
								}
							});
					},
					
					/**
					* ajax方式获取数据
					*/
					ajaxGetData: function(callback){
						var ajax = p.ajax;
						
						$.ajax({
							type: ajax.type === undefined ? 'POST' : ajax.type,
							url: ajax.url,
							cache: false,
							//async: false,
							dataType: "json",
							data: ajax.data,
							beforeSend: function(){
								if( saogaUI.base.isFunction(ajax.beforeSend) ){
									ajax.beforeSend();
								}
							},
							success: function(data){
								if( saogaUI.base.isFunction(ajax.success) ){
									ajax.success(data);
								}
								if( saogaUI.base.isFunction(callback) ){
									callback(data);
								}
							},
							error: function(data){
								if( saogaUI.base.isFunction(ajax.error) ){
									ajax.error(data);
								}
							}
						});
					},
					
					/**
					* 运行select
					*/
					run: function(){
						var that = this,
							type = p.type;
							
						switch (type){
							case 'single':
								that.createSingleHtml();
								if( !p.wrap ){ break; }
								that.singleFn();
								break;
							case 'multiple':
								that.createMultipleHtml();
								if( !p.wrap ){ break; }
								that.multipleFn();
								break;
							case 'tree':
								if( saogaUI.base.isFunction(saogaUI.ui.tree) ){
									that.createTreeHtml();
									if( !p.wrap ){ break; }
									that.treeFn();
								}
								break;
						}
					},
					
					/**
					* 初始化
					*/
					init: function(o){
			
						for(var key in o){
							if( o.hasOwnProperty(key) && o[key] !== undefined ){
								p[key] = o[key];
							}
						}

						p.target = $(p.target);
						
						if( !p.data  && !p.ajax ){
							p.data = [];
						}
					
						if( p.ajax ){
							c.ajaxGetData(function(data){
								p.data = data;
								c.run();
								if( saogaUI.base.isFunction(p.onLoad) ){
									p.onLoad();
								}
							});
							return g;
						}
						
						c.run();
						if( p.data && saogaUI.base.isFunction(p.onLoad) ){
							p.onLoad();
						}
						return g;
					}//end init
				};
		
		/**
		* 刷新下拉框
		*/
		g.refresh = function(o){
			for(var key in o){
				if( o.hasOwnProperty(key) && o[key] !== undefined && !o.target){
					p[key] = o[key];
				}
			}

			c.init();
			return g;
		};
		
		/**
		* 代码重载
		*/
		g.reload = function(){
			t.selectedData = [];
			c.init(o);
		};
		
		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new Select(o);
	};
});
/**
 **┏┓　　　┏┓ 
 *┏┛┻━━━┛┻┓ 
 *┃　　　　　　　┃ 　 
 *┃　　　━　　　┃ 
 *┃　┳┛　┗┳　┃ 
 *┃　　　　　　　┃ 
 *┃　　　┻　　　┃ 
 *┃　　　　　　　┃ 
 *┗━┓　　　┏━┛ 
 ****┃　　　┃　　　　 
 ****┃　　　┃ 神兽保护，代码无bug
 ****┃　　　┗━━━┓ 
 ****┃　　　　　　　┣┓ 
 ****┃　　　　　　　┏┛ 
 ****┗┓┓┏━┳┓┏┛ 
 ******┃┫┫　┃┫┫ 
 ******┗┻┛　┗┻┛  
*/
define('core/grid',['core/saogaUI', 'i18n!core/nls/str', 'core/select'], function(saogaUI, lang, select){
	
	
	
	/**
	* saogaUI.ui.grid 表格控件
	* @class saogaUI.ui.grid
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 表格参数
    * @param {String} o.wrap 表格容器
    * @param {String} o.id 表格id
    * @param {Object} o.pageAjax ajax数据
    * @param {String} o.pageAjax.url ajax请求的url
    * @param {String} o.pageAjax.type ajax请求类型，默认是GET
    * @param {String} o.pageAjax.data ajax请求的条件
    * @param {Object} o.data 静态数据
    * @param {String|Number} o.width 表格宽度
    * @param {Boolean} o.isFixedWidth 表宽度是否为固定宽度，默认为false，会去对比grid外框的宽度和o.columns.width，而达到自适应列的目的
    * @param {Object} o.columns 列结构
    * @param {String} o.columns.display 表头名称
    * @param {String} o.columns.name 数据字段名
    * @param {Number} o.columns.width 列宽度，这里是占比
    * @param {Function} o.columns.render 列自定义显示函数
    * @param {Function} o.columns.statisRender 统计列自定义显示函数
    * @param {String} o.columns.statisType 统计类型
    * @param {String} o.columns.statisWrap 统计容器
    * @param {Object} o.statis 统计
    * @param {Object} o.detail 表格详细
    * @param {Object} o.bottomBtns 底部按钮
    * @param {Boolean} o.isPage 是否显示分页
    * @param {Boolean} o.isHead 是否显示头部
    * @param {Boolean} o.showAllRow 显示所有数据，默认false，以分页和显示条数互斥 ，isPage=false、pageSize = total
    * @param {String} o.pageIndex 分页起始页
    * @param {String} o.pageSize 每页显示的条数
    * @param {Array} o.pageSizeOptions 可选择设定的每页结果数，默认[10, 20, 50, 100, 200]，不显示时可设置null
    * @param {Function} o.onPageFn 翻页事件
    * @param {Boolean} o.isPageCache 翻页时是否缓存当页数据
    * @param {Boolean} o.isMemory 翻页是否记住选择记录，默认false
    * @param {Boolean} o.checkbox 是否有checkbox
    * @param {Function} o.onCheckFn 点击checkbox事件
    * @param {Function} o.onRowFn 点击行事件
    * @param {Boolean} o.isSelectSingleRow 点击是否选中单行,onRowFn有设置时才生效
    * @param {Boolean} o.isOnRowCheckbox 点击行选中checkbox
    * @param {Function} o.initSelected 初始化选中事件
    * @param {String}  o.nullText 空文本
    * @param {String}  o.requestText 请求文本
    * @param {Boolean} o.isSort 是否排序，默认false
    * @param {Boolean} o.isSortCurrent 排序当前页中数据，默认false，使用时isSort必须是true，isPageCache必须是true
    * @param {Boolean} o.isShowLoading 是否显示loading效果，默认true
    * @param {String} o.countFont 统计文字
    * @param {String} o.refreshIndex 刷新当前页索引pageIndex,默认false
    * @param {String} o.isHideColumns 是否要隐藏列Columns, 隐藏列是请设置ID
	* @return {Object} grid对象
	*/
	var Grid = function(o){
		
		var 
			/**
			* 全局对象
			* @public
			*/
			g       = this,
		
			/**
			* 默认配置
			* @private
			*/
			p = {
				wrap:            $(o.wrap),
				id:              o.id || 'l-grid-' + (new Date()).valueOf(),	
				pageAjax:        o.pageAjax || null,
				data:            o.data || {},                                           //静态数据
				width:           o.width || 'auto',
				isFixedWidth:    o.isFixedWidth  === undefined ? false : o.isFixedWidth, //表宽度是否为固定宽度，默认为false，为true时会去对比width和grid外框的宽度
				columns:         o.columns || {},
				statis:          o.statis || [],                                         //统计
				statisToFixed:   o.statisToFixed === undefined ? 2 : o.statisToFixed,    //统计精确的位数
				detail:          o.detail || null,
				bottomBtns:      o.bottomBtns === undefined ? null : o.bottomBtns,       //底部按钮
				isPage:          o.isPage === undefined ? true : o.isPage,               //是否显示分页
				isHead:          o.isHead === undefined ? true : o.isHead,               //是否显示头部
				showAllRow:      o.showAllRow ? true : false,                            //显示所有数据，默认false，以分页和显示条数互斥 ，isPage=false、pageSize = total
				pageIndex:       o.pageIndex || 1,                                       //分页起始页
				pageSize:        o.pageSize || 10,                                       //每页显示的条数
				pageSizeOptions: o.pageSizeOptions === undefined ? [10, 20, 50, 100, 200] : o.pageSizeOptions, //可选择设定的每页结果数
				onPageFn:        o.onPageFn,                                             //翻页事件
				isPageCache:     o.isPageCache === undefined ? true : o.isPageCache,     //翻页时是否缓存当页数据
				isMemory:        o.isMemory ? true : false,                              //翻页是否记住选择记录，默认false
				checkbox:        o.checkbox === undefined ? true : o.checkbox,           //是否有checkbox
				isHeadCheckbox:  o.isHeadCheckbox === undefined ? true : o.isHeadCheckbox, //是否有表头checkbox
				onCheckFn:       o.onCheckFn || null,                                    //点击checkbox事件
				onRowFn:         o.onRowFn || null,                                      //点击行事件
				isSelectSingleRow: o.isSelectSingleRow === undefined ? false : o.isSelectSingleRow, //点击是否选中单行
				isOnRowCheckbox: o.isOnRowCheckbox ? true : false,                       //点击行选中checkbox
				initSelected:    o.initSelected || null,                                 //初始化选中事件
				nullText:        o.nullText ? o.nullText : lang.nullText,                //空文本
				requestText:     o.requestText ? o.requestText : lang.requestText,       //请求文本
				isSort:          o.isSort ? true : false,                                //是否排序，默认false
				isSortCurrent:   o.isSortCurrent ? true : false,                         //排序当前页缓存中数据，默认false，使用时isSort必须是true，isPageCache必须是true
				isShowLoading:   o.isShowLoading === undefined ? true : o.isShowLoading, //是否显示loading效果
				countFont:       o.countFont ? o.countFont : lang.countFont,             //统计文字
				refreshIndex:    o.refreshIndex === undefined ? false : o.refreshIndex,  //刷新当前页索引pageIndex,默认false
			    isHideColumns:   o.isHideColumns === undefined ? false : o.isHideColumns //是否要隐藏列Columns
			},
		
			/**
			* 缓存池
			* @private
			*/
			_cache = {
				data: [],
				tmpData: [],
				columns: [],
				rowSelected: [],
				detailSelected: [],
				width: 0,
				browser: saogaUI.base.browser
			},
			
			/**
			* 内部对象
			* @private
			*/
			_core   = {
				/**
				* 表格表头内容
				*/
				tHeadCreateHtml: function(){
					var isHideColumns  = p.isHideColumns,
						columns        = p.columns,
						detail         = p.detail,   //表格明细
						checkbox       = p.checkbox, //复选框
						isHeadCheckbox = p.isHeadCheckbox,
						popup          = g.popup,
						grid1          = g.grid1,
						grid2          = g.grid2,
						isInit         = g.isInit,
						i              = 0,
						s1             = '',
						s2             = '',
						s3             = '';
						
					/*grid1*/
					s1 += '<table>';
					s1 += '<tr class="l-grid-hd-row">';
					
					if( detail ){
						s1 += '<th class="l-grid-hd-cell l-grid-hd-detail"><div class="l-grid-row-cell-inner"><span class="l-grid-row-detailbtn"></span></div></th>';
					}
					
					if( checkbox ){
						s1 += '<th class="l-grid-hd-cell l-grid-hd-checkbox"><div class="l-grid-hd-cell-inner">';
						if( isHeadCheckbox ){
							s1 += '<span class="l-checkbox l-grid-hd-checkbox"></span>';
						}
						s1 += '</div></th>';
					}
					
					s1 += '</tr>';
					s1 += '</table>';
					
					/*grid2*/
					if( isInit && !saogaUI.base.cookie.get(encodeURIComponent(location.pathname)) ){
						_cache.columns = columns;
					}
					
					if( isHideColumns ){
						
						columns = _cache.columns;
						
						for(var h = 0; h < p.columns.length; h++){
							var popupSelected = '';
							for(var j = 0; j<columns.length; j++){
								if( p.columns[h].display === columns[j].display ){
									popupSelected = ' l-checkbox-selected';
								}
							}
							s3 += '<div class="l-grid-popup-item fn-clear"><span class="l-checkbox'+ popupSelected +'"></span><span class="l-grid-popup-text">'+ p.columns[h].display +'</span></div>';
						}
						
						popup.html(s3)
					}
					
					s2 += '<table>';
					s2 += '<tr class="l-grid-hd-row">';
					
					for(; i < columns.length; i++){
						
						var column     = columns[i],
							columnName = p.isSort ? ( (column.isSort !== false && column.name) ? ' data-columnName="'+ column.name +'"' : '' ) : '',
							lastCls    = i === columns.length - 1 ? ' l-grid-hd-cell-last' : '';
							
						s2 += '<th class="l-grid-hd-cell'+ lastCls +'"><div class="l-grid-hd-cell-inner"><span class="l-grid-hd-cell-span"'+ columnName +'><span class="l-grid-hd-cell-text">'+ column.display +'</span></span></div></th>';
						
					}
					
					s2 += '</tr>';
					s2 += '</table>';

					if( isInit ){
						grid1.append('<div class="l-grid-header">'+ s1 + '</div>');
						grid2.append('<div class="l-grid-header">'+ s2 +'</div>');
					}else{
						grid1.find('.l-grid-header').html(s1);
						grid2.find('.l-grid-header').html(s2);
					}
				},
				
				/**
				* 表格主体内容
				* @param {Number} index 页面索引
				*/
				tBodyCreateHtml: function(index){
					var columns    = _cache.columns.length ? _cache.columns : p.columns,
						len        = columns.length,
						statis     = p.statis,
						statisData = [],
						detail     = p.detail,   //表格明细
						checkbox   = p.checkbox, //复选框
						nullText   = g.loding.is(':visible') ? p.requestText : p.nullText,
						pageSize   = p.pageSize,
						popup      = g.popup,
						grid       = g.grid,
						grid1      = g.grid1,
						grid2      = g.grid2,
						i          = 0,
						s1         = '',
						s2         = '',
						tmpData    = _cache.tmpData,
						total      = p.data.total,
						rows       = p.data.rows,
						isInit     = g.isInit,
						that       = this;
					
					/*修改索引值，从1开始，所以减1*/
					index = index !== undefined ? index - 1 : 0;

					/*grid1*/
					if( checkbox || detail ){
						s1 += '<table>';
						if( total && rows.length ){
							for(var i = 0; i<pageSize; i++){
								if( tmpData[index][i] ){
									s1 += '<tr class="l-grid-row'+ 
											  (i%2 === 0 ? '' : ' l-grid-row-even') +
											  (that.initSelected( tmpData[index][i] ) ? ' l-grid-row-selected' : '') +
											  '" data-row="'+ i +'">';

									if( detail ){
										s1 += '<td><div class="l-grid-row-cell-inner"><span class="l-grid-row-detailbtn l-grid-row-detailbtn-close"></span></div></td>';
									}
									if( checkbox ){
										s1 += '<td><div class="l-grid-row-cell-inner"><span class="l-checkbox l-grid-row-checkbox"></span></div></td>';
									}
									s1 += '</tr>';
								}
							}
							/*判断是否统计*/
							if( statis ){
								var sLen = statis.length,
									n    = 0;
								for(; n<sLen; n++){
									s1 += '<tr class="l-grid-row l-grid-row-statis l-grid-row-'+ statis[n].type +'">';
									if( checkbox && detail ){
										s1 += '<td style="width:13px"><div class="l-grid-row-cell-inner"></div></td><td style="width:13px"><div class="l-grid-row-cell-inner"></div></td>';
									}else{
										s1 += '<td style="width:13px"><div class="l-grid-row-cell-inner"></div></td>';
									}
									s1 += '</tr>';
								}
							}
						}else{
							s1 += '<tr class="l-grid-row"><td></td></tr>';
						}
						s1 += '</table>';
					}

					/*grid2*/
					s2 += '<table>';
					
					if( total && rows.length ){
						
						for(var k = 0; k<len; k++){
							statisData[k] = [];
						}
						
						for(var i = 0; i<pageSize; i++){
							
							var tmpDataObj = tmpData[index][i],
								selectCls  = that.initSelected(tmpDataObj, i) ? ' l-grid-row-selected' : '',
								evenCls    = i%2 === 0 ? '' : ' l-grid-row-even';

							if( tmpDataObj ){
								
								s2 += '<tr class="l-grid-row'+ evenCls + selectCls +'" data-row="'+ i +'">';
								
								var rowStatis = 0; //行统计和
								
								for(var h = 0; h < len; h++){
									
									var columnsObj    = columns[h],
										lastCls       = h === len - 1 ? ' l-grid-row-cell-last' : '',
										columnAlign   = columnsObj.align ? ' l-grid-align-' + columnsObj.align : '',
										columnsStatis = saogaUI.base.isFunction(columnsObj.statis),
										columnsRender = columnsObj.render;
										
									/*统计数据*/
									if( columnsObj.statisType ){
										var statisRow = parseFloat( tmpDataObj[columnsObj.name] );
										statisData[h][i] = !isNaN(statisRow) ? statisRow : 0;
										rowStatis += statisData[h][i];
										if( columnsStatis ){
											statisData[h][i] = rowStatis;
										}
									}
									
									s2 += '<td class="l-grid-row-cell'+ lastCls +'" data-cell="'+ h +'"><div class="l-grid-row-cell-inner'+ columnAlign +'">';

									if( columnsStatis ){
										if( columnsObj.statisRender !== undefined ){
											s2 += columnsObj.statisRender(rowStatis);
										}else{
											s2 += rowStatis;
										}
									}
									
									if( saogaUI.base.isFunction(columnsRender) ){
										s2 += columnsRender(tmpDataObj, i, tmpDataObj[columnsObj.name], h);
									}else{
										s2 += tmpDataObj[columnsObj.name];
									}
									
									s2 += '</div></td>';
								}
								
								s2 += '</tr>';
								
								if( detail ){
									var chlidren = tmpDataObj.chlidren ? tmpDataObj.chlidren : [],
										colLen   = columns.length + (checkbox ? 1 : 0) + 1;
									
									if( saogaUI.base.isFunction(detail.render) ){
										s2 += '<tr class="l-grid-row-detail l-grid-row-detail'+ i + evenCls + selectCls +'" data-row="'+ i +'">';
										s2 += '<td colspan="'+ colLen +'">'+ 
												detail.render(chlidren) +
											  '</td>';
										s2 += '</tr>';
									}else{
										for(var m = 0; m<chlidren.length; m++){
											s2 += '<tr class="l-grid-row-detail l-grid-row-detail'+ i + evenCls + selectCls +'" data-row="'+ i +'">';
											for(var h = 0; h < len; h++){
												var columnsObj = columns[h];
												s2 += '<td class="l-grid-row-cell" data-cell="'+ h +'"><div class="l-grid-row-cell-inner l-grid-align-'+ (columnsObj.align ? columnsObj.align : 'left') +'">';
												if( saogaUI.base.isFunction(columnsObj.detailRender) ){
													s2 += columnsObj.detailRender(chlidren[m], h, chlidren[m][columnsObj.name], m);
												}else{
													s2 += (chlidren[m][columnsObj.name] ? chlidren[m][columnsObj.name] : '');
												}
												s2 += '</div></td>';
											}
											s2 += '</tr>';
										}
									}
								}
								
							}
						}

						/*判断是否统计*/
						if( statis ){
							
							var sLen = statis.length,
								n    = 0;
								
							for(; n<sLen; n++){
								
								s2 += '<tr class="l-grid-row l-grid-row-statis l-grid-row-'+ statis[n].type +'">';
								
								for(var m = 0; m < len; m++){
									
									var statisColumns = columns[m],
										statisAlign   = statisColumns.align ? statisColumns.align : 'left',
										statisWrap    = statisColumns.statisWrap,
										statisType    = statisColumns.statisType,
										statisRender  = statisColumns.statisRender,
										statisLastCls = m === len - 1 ? ' l-grid-row-cell-last' : '';
									
									s2 += '<td class="l-grid-row-cell'+ statisLastCls +'"><div class="l-grid-row-cell-inner l-grid-align-'+ statisAlign +'">';
									
									if( statisWrap ){
										s2 += statis[n].display;
									}else{
										var sData = statisData[m],
											ssLen = sData.length,
											ssVal = 0,
											x     = 0,
											sum   = 0,
											avg   = 0,
											min   = 0,
											max   = 0;
										
										for(; x<ssLen; x++){
											ssVal += sData[x];
										}
										
										if( statisType ){
											
											var str  = statisType,
												arr  = str.split(','),
												d    = 0,
												dlen = arr.length,
												dStr = '';
											
											for(; d<dlen; d++){
												if( statis[n].type === arr[d] ){
													switch(arr[d]){
														case 'sum':
															dStr = ssVal;
															break;
														case 'avg':
															dStr = (ssVal*1.0)/x;
															break;
														case 'min':
															dStr = Math.min.apply(Math, sData);
															break;
														case 'max':
															dStr = Math.max.apply(Math, sData);
															break;
													};
													
													//if( parseInt(dStr, 10) !== dStr ){
														dStr = dStr.toFixed(p.statisToFixed);
													//}
													
													s2 += saogaUI.base.isFunction(statisRender) ? statisRender(dStr) : dStr;
												}
											}// end for
											
										} // end if
										
									}
									s2 += '</div></td>';
								}
								s2 += '</tr>';
							}
						}// end if statis
						
					}else{
						s2 += '<tr class="l-grid-row"><td><div class="l-grid-row-cell-inner l-grid-align-center l-grid-nullText">'+ nullText +'</div></td></tr>';
					}
					s2 += '</table>';
					
					
					/*init*/
					if( isInit ){
						grid1.append('<div class="l-grid-body">' + s1 +'</div>');
						grid2.append('<div class="l-grid-body">' + s2 +'</div>');
					}else{
						grid1.find('.l-grid-body').html(s1);
						grid2.find('.l-grid-body').html(s2);
					}
					
					/*hover*/
					grid
						.off('mouseover', '.l-grid-row, .l-grid-row-detail')
						.on('mouseover', '.l-grid-row, .l-grid-row-detail', function(){
							var index = this.getAttribute('data-row');
								
							grid
								.find('.l-grid-row')
								.eq(index)
								.addClass('l-grid-row-hover');
								
							grid2
								.find('.l-grid-row')
								.eq(index)
								.addClass('l-grid-row-hover');
								
							grid2
								.find('.l-grid-row-detail'+index)
								.addClass('l-grid-row-hover');
						})
						.off('mouseout', '.l-grid-row, .l-grid-row-detail')
						.on('mouseout', '.l-grid-row, .l-grid-row-detail', function(){
							var index = this.getAttribute('data-row');
							
							grid1
								.find('.l-grid-row')
								.eq(index)
								.removeClass('l-grid-row-hover');
								
							grid2
								.find('.l-grid-row')
								.eq(index)
								.removeClass('l-grid-row-hover');
								
							grid2
								.find('.l-grid-row-detail'+index)
								.removeClass('l-grid-row-hover');
						})
					
					/*set size*/
					if( checkbox || detail ){
						if( checkbox && detail ){
							grid1.width(68)
						}else{
							grid1.width(34);
						}
					}
					
					that.setCellWidth();
					(checkbox || detail) && that.setRowsHeight();

					$(window).resize(function(){
						that.setCellWidth();
						(checkbox || detail) && that.setRowsHeight();
					});
					
					/* 设置ajax模式缓存 */
					if( !p.isPageCache && !p.isSortCurrent ){
						_cache.tmpData[p.pageIndex - 1] = [];
					}
				},
				
				/**
				* 分页内容
				*/
				pageCreateHtml: function(){
					var that            = this,
						s               = '',
						total           = p.data.total,
						pageIndex       = p.pageIndex,
						pageSize        = p.pageSize,
						countFont       = p.countFont,
						pageSizeOptions = p.pageSizeOptions,
						pageCore        = {
							/**
							* 获取数字连接
							* @private
							* @param {Number} index 链接索引
							* @param {String} txt 上下翻页的文本
							*/
							getLink: function(index, txt){
								return '<a href="javascript:;" data-page="'+ index +'"'+ (p.pageIndex === index ? ' class="current"' : '') + '>'+ (txt || index) +'</a>';
							},
							
							/**
							* 获取显示的数据
							* @private
							* @param {Number} pageSize 每页显示条数
							* @param {Number} count 数据长度
							* @param {Number} index 当前位置
							*/
							getCount: function(pageSize, count, index){
								var start   = (index-1)*pageSize + 1,
									end     = index*pageSize,
									str     = p.countFont+'',
									pageNum = Math.ceil(count / pageSize),
									diff    = pageNum*pageSize - count;

								str = str.replace('{{start}}', start);     //当前开始位置
								str = str.replace('{{end}}', (pageNum*pageSize === end ? end - diff : end)); //当前结束位置
								str = str.replace('{{count}}', count);     //总条数
								str = str.replace('{{size}}', pageSize);   //每页显示条数
								str = str.replace('{{pageNum}}', pageNum); //总页数
								str = str.replace('{{current}}', index);   //当前位置
								
								return str;
							},
							
							/**
							* 获取分页按钮
							* @private
							* @param {Number} pageSize 每页显示条数
							* @param {Number} count 数据长度
							* @param {Number} index 当前位置
							*/
							getBtn: function(pageSize, count, index){
								var s       = '',
									begin   = 1,
									end     = 1,
									i       = 0,
									itemNum = 2,
									pageNum = Math.ceil(count / pageSize);
									
								if(index > 1){
									s += this.getLink(index - 1, lang.prevPage);
								}else{
									s += '<span class="prev">'+ lang.prevPage +'</span>';
								}
								if(index - itemNum > 1){
									s += this.getLink(1) + '<span>...</span>';
									begin = index - itemNum;
								}
								end = Math.min(pageNum, begin + itemNum * 2);
								if(end === pageNum - 1){
									end = pageNum;
								}
								for(i = begin; i <= end; i++) {
									s += this.getLink(i);
								}
								if(end < pageNum){
									s += '<span>...</span>' + this.getLink(pageNum);
								}
								if(index < pageNum){
									s += this.getLink(index + 1, lang.nextPage);
								}else{
									s += '<span class="next">'+ lang.nextPage +'</span> ';
								}
								
								return s;
							},
							
							/**
							* 获取分页选项
							* @private
							*/
							getPageSelect: function(pageSizeOptions){
								
								if( !saogaUI.base.isArray( pageSizeOptions ) ){ return false; }
								
								var pageSize = p.pageSize,
									len      = pageSizeOptions.length,
									i        = 0,
									s        = '';
									
								s += '<select class="ui-select">';
								for(; i<len; i++){
									s += '<option value="'+ pageSizeOptions[i] +'"'+ (pageSize === pageSizeOptions[i] ? ' selected="selected"' : '') +'>'+ pageSizeOptions[i] +'</option>';
								}
								s += '</select>';
								
								return s;
							}
						};
					
					/*分页统计*/
					if( total && countFont ){
						s += '<div class="l-grid-footer-page-msg">'+ pageCore.getCount(pageSize, total, pageIndex) +'</div>';
					}
					
					/*分页选项*/
					if( total && pageSizeOptions ){
						s += '<div class="l-grid-footer-page-select">'+ pageCore.getPageSelect(pageSizeOptions) +'</div>';
					}

					/*分页按钮*/
					if( total ){
						s += '<div class="l-grid-footer-page-btn ui-pagination">'+ pageCore.getBtn(pageSize, total, pageIndex) +'</div>';	
					}
										
					/*生成分页*/
					g.page.html(s);
					
					that.initCheckbox();
					
					/*if( p.pageSizeOptions ){
						select({
							target:'.l-grid-footer-page-select select',
							type:'single'
						})
					}*/
				},
				
				bottomBtnsCreateHtml: function(){
					var btns    = p.bottomBtns,
						btnWrap = g.btnWrap;
						
					if( !btns ){ return; }

					btnWrap
						.html(function(){
							var len      = btns.length,
								html     = '',
								i        = 0,
								checkbox = p.checkbox,
								detail   = p.detail;
								
							if( !len || !checkbox ){ return html; }
								
							if( detail ){
								html += '<span class="l-checkbox l-grid-footer-checkbox l-grid-footer-checkbox-detail"></span>';
							}else{
								html += '<span class="l-checkbox l-grid-footer-checkbox"></span>';
							}
							
							for(; i<len; i++){
								var btn = btns[i],
									cls = btn.cls ? ' '+ btn.cls : '';
								html += '<a href="javascript:;" class="ui-btn'+ cls +'" data-index="'+ i +'"><span>'+btn.text+'</span></a>';
							}
							
							return html;
						})
						.off('click', '.ui-btn')
						.on('click',' .ui-btn', function(){
							var index = this.getAttribute('data-index'),
								obj   = btns[index];
							saogaUI.base.isFunction(obj.click) && obj.click.call(this);
						});
				},
				
				bottomBtnsFn: function(){
					var btnWrap  = g.btnWrap,
						checkbox = g.grid1.find('.l-checkbox');

					btnWrap
						.off('click','.l-checkbox')
						.on('click','.l-checkbox',function(){
							var self = $(this);
							
							saogaUI.ui.onselectstart(self);
							checkbox.trigger('click');
							
							if( checkbox.hasClass('l-checkbox-selected') ){
								self.addClass('l-checkbox-selected')
							}else{
								self.removeClass('l-checkbox-selected')
							}
							
						});
				},
				
				/**
				* 设置列宽
				*/
				setCellWidth: function(){
					var columns      = _cache.columns.length ? _cache.columns : p.columns,
						len          = columns.length,
						wrapWidth    = p.wrap.width(),
						grid         = g.grid,
						slGrid       = grid.find('.l-sl-grid2'),
						grid1        = g.grid1,
						checkbox     = p.checkbox,
						detail       = p.detail,
						grid1Width   = checkbox || detail ? grid1.outerWidth() : 0,
						grid2        = g.grid2,
						i            = 0,
						total        = 0,
						isFixedWidth = p.isFixedWidth,
						_fixedWidth  = function(width){
										var j = 0;
										
										width = width === undefined ? p.width : width;

										for(; j<len; j++){
											grid2.find('.l-grid-hd-cell').eq(j).width(columns[j].width);
											grid2.find('.l-grid-row-cell').eq(j).width(columns[j].width);
										}
										
										grid.width(width);
										slGrid.css({
											width: width - grid1Width,
											overflowX:'auto',
											marginRight:0
										});
										grid2.css({
											width: total,
											marginLeft:0
										});
									},
						_autoWidth   = function(){
										var j        = 0,
											colWidth = 0;
										for(; j<len; j++){
											colWidth = columns[j].width/total*100 + '%';
											grid2.find('.l-grid-hd-cell').eq(j).width(colWidth);
											grid2.find('.l-grid-row-cell').eq(j).width(colWidth);
										}
										grid.width('100%');
										slGrid.css({
											position:'relative',
											width: grid.width() - grid1Width - 1, //XXX:宽度有问题先 -1 console.log( grid1Width, grid.width(),slGrid.width(), grid )
											overflowX:'inherit',
											float:'left'
										});
										grid2.css({
											width: 'auto'
										});
									};

					for(; i<len; i++){
						total += columns[i].width;
					}
					
					if( p.width === 'auto' ){
						_autoWidth();
					}else{
						if( isFixedWidth ){
							_fixedWidth();
						}else{
							if( wrapWidth > total || wrapWidth < p.width ){
								_autoWidth();
							}else{
								_fixedWidth( wrapWidth );
							}
						}
					}
				},
				
				/**
				* 设置行高
				*/
				setRowsHeight: function(){
					var grid1    = g.grid1,
						grid2    = g.grid2,
						pageSize = p.statis ? p.pageSize + p.statis.length : p.pageSize,
						i        = 0;
					
					grid1.find('.l-grid-hd-row').height( grid2.find('.l-grid-hd-row').outerHeight() );
					
					if( pageSize ){
						for(; i<pageSize; i++){
							var grid1_row       = grid1.find('.l-grid-row').eq(i),
								grid2_row       = grid2.find('.l-grid-row').eq(i),
								grid2_rowDetail = grid2.find('.l-grid-row-detail'+i),
								height          = grid2_row.outerHeight(),
								detailHeight    = 0;

							if(!height){return;}
							
							for(var j = 0; j<grid2_rowDetail.length; j++){
								detailHeight += grid2_rowDetail[j].offsetHeight;
							}

							if( _cache.browser.ie <= 7 ){
								grid1_row.height(height + detailHeight - 1); //变态ie7多算1px
							}else{
								grid1_row.height(height + detailHeight);
							}
						}
					}else{
						var grid1_row = grid1.find('.l-grid-row').eq(0),
							grid2_row = grid2.find('.l-grid-row').eq(0),
							height    = grid2_row.outerHeight();
						grid1_row.height(height);
					}
					
				},
				
				/**
				* 初始化行选中事件
				* @param {Object} rowData 行数据
				* @param {Number} i 行的索引
				*/
				initSelected: function(rowData, i){
					var that         = this,
						isMemory     = p.isMemory,
						initSelected = p.initSelected,
						pageIndex    = p.pageIndex,
						arr          = _cache.rowSelected[pageIndex-1];
					
					if( rowData && saogaUI.base.isFunction( initSelected ) ){
						if( initSelected( rowData ) ){
							if( isMemory && i !== undefined ){
								arr[i] = that.getRowData(i); //选中数据
								that.initCheckbox();
							}
							return true;
						}
					}
					
					return false;
				},
				
				/**
				* 分页函数
				*/
				pageFn: function(){
					var that          = this,
						page          = g.page,
						grid1         = g.grid1,
						gridHeader    = grid1.find('.l-gird-header'),
						gridBody      = grid1.find('.l-gird-body'),
						pageSize      = p.pageSize,
						onPageFn      = p.onPageFn,
						isShowOptions = p.pageSizeOptions;
					
					/*分页事件*/
					page.off('click', 'a')
						.on('click', 'a', function(){
					
							var index = Number( $(this).attr('data-page') );
							
							/*修改页面位置*/
							p.pageIndex = index;
							
							/*返回接口，可能修改全局g.o对象，所以前置*/
							if( saogaUI.base.isFunction(onPageFn) ){
								onPageFn(index, pageSize);
							}
							
							if( !_cache.tmpData[index-1] || !_cache.tmpData[index-1].length || !_cache.tmpData.length ){
								/*获取数据并重载 Html*/
								that.getData();
							}else{
								/*重载 html*/
								that.tBodyCreateHtml(index);
								that.pageCreateHtml();
							}
	
							/*全部选上时给表头全选*/
							if( gridBody.find('.l-checkbox-selected').length === pageSize ){
								gridHeader.find('.l-checkbox').addClass('l-checkbox-selected');
							}else{
								gridHeader.find('.l-checkbox').removeClass('l-checkbox-selected');
							}
							
							/*初始化checkbox*/
							that.initCheckbox();
						});
					
					/*下拉框事件*/
					if( isShowOptions ){
						page.off('change', 'select')
							.on('change','select', function(){
								_cache.tmpData = [];
								p.pageSize = Number( this.value );
								p.pageIndex = 1;
								g.refresh();
							});
					}
				},

				/**
				* 初始化checkbox
				*/
				initCheckbox: function(){
					var that           = this,
						pageSize       = p.pageSize,                        //每页显示多少个
						pageIndex      = p.pageIndex,                       //起始位置
						grid1          = g.grid1,
						gridHeader     = grid1.find('.l-grid-header'),        //表格头
						gridBody       = grid1.find('.l-grid-body'),          //表格主体
						checkbox       = gridBody.find('.l-checkbox'),        //复选框
						headerCheckbox = gridHeader.find('.l-checkbox'),
						footerCheckbox = g.btnWrap.find('.l-checkbox'),
						isMemory       = p.isMemory;
					
					if( !isMemory ){
						/*
						var len = _cache.rowSelected.length,
							i   = 0;
							
						for(; i<len; i++){
							_cache.rowSelected[i] = []; //修改选中的数组值
						}
						*/
						
						_cache.rowSelected = [];
						
						headerCheckbox.removeClass('l-checkbox-selected');
						footerCheckbox.removeClass('l-checkbox-selected');
					}else{
						var selected = Math.min(pageSize, checkbox.length), //已选数量
							arr      = _cache.rowSelected[pageIndex-1],
							len      = arr ? arr.length : 0,
							i        = 0,
							j        = 0;
						
						for(; i < len; i++, j++){
							if( arr[i] ){
								checkbox.eq(j).addClass('l-checkbox-selected');
							}
						}
						
						/*全部选上时给表头全选*/
						if( gridBody.find('.l-checkbox-selected').length === selected ){
							headerCheckbox.addClass('l-checkbox-selected');
							footerCheckbox.addClass('l-checkbox-selected');
						}else{
							headerCheckbox.removeClass('l-checkbox-selected');
							footerCheckbox.removeClass('l-checkbox-selected');
						}
					}
				},
				
				/**
				* 选择框事件
				*/
				checkboxFn: function(){
					var that        = this,
						grid1       = g.grid1,
						grid2       = g.grid2,
						grid1Header = grid1.find('.l-grid-header'), //表格头
						grid1Body   = grid1.find('.l-grid-body'),   //表格主体
						grid2Body   = grid2.find('.l-grid-body'),   //表格主体
						onCheckFn   = p.onCheckFn,
						pageSize    = p.pageSize,
						btnWrap     = g.btnWrap;
					
					/*多选*/
					grid1Body
						.off('click', '.l-checkbox')
						.on('click', '.l-checkbox', function(){
							var self        = $(this),
								pageIndex   = p.pageIndex,
								checkbox    = grid1Body.find('.l-checkbox'),
								i           = checkbox.index(self),
								selected    = Math.min(pageSize, checkbox.length), //已选数量
								currentArr  = _cache.rowSelected[pageIndex-1],
								grid1Row    = grid1Body.find('.l-grid-row').eq(i),
								grid2Row    = grid2Body.find('.l-grid-row').eq(i),
								grid2Detail = grid2Row.next('.l-grid-row-detail'),
								tmpData     = _cache.tmpData[p.pageIndex - 1];
							
							/*返回选择数据*/
							if( saogaUI.base.isFunction(onCheckFn) ){
								if( !onCheckFn.apply(this, [tmpData[i], grid1Row, grid2Row]) ){
									return false;
								}
							}
							
							if( !self.hasClass('l-checkbox-selected') ){
								self.addClass('l-checkbox-selected');
								grid1Row.addClass('l-grid-row-selected');
								grid2Row.addClass('l-grid-row-selected');
								grid2Detail.addClass('l-grid-row-selected');
								currentArr[i] = that.getRowData(i); //选中数据
								
								/*全部选上时给表头全选*/
								if( grid1Body.find('.l-checkbox-selected').length === selected ){
									grid1Header.find('.l-checkbox').addClass('l-checkbox-selected');
									btnWrap.find('.l-checkbox').addClass('l-checkbox-selected');
								}
							}else{
								currentArr[i] = null;
								self.removeClass('l-checkbox-selected');
								grid1Row.removeClass('l-grid-row-selected');
								grid2Row.removeClass('l-grid-row-selected');
								grid2Detail.removeClass('l-grid-row-selected');
								grid1Header.find('.l-checkbox').removeClass('l-checkbox-selected');
								btnWrap.find('.l-checkbox').removeClass('l-checkbox-selected');
							}
							
						});
					
					/*全选*/
					grid1Header
						.off('click', '.l-checkbox')
						.on('click', '.l-checkbox', function(e){
							e.stopPropagation();
							var self        = $(this),
								pageIndex   = p.pageIndex,
								arr         = _cache.rowSelected[pageIndex-1],
								checkbox    = grid1Body.find('.l-checkbox'),
								grid1Rows   = grid1Body.find('.l-grid-row'),
								grid2Rows   = grid2Body.find('.l-grid-row'),
								grid2Detail = grid2Rows.next('.l-grid-row-detail'),
								len         = checkbox.length,
								i           = 0,
								j           = len - 1,
								tmpData     = _cache.tmpData[p.pageIndex - 1];
							
							/*返回选择数据*/
							if( saogaUI.base.isFunction(onCheckFn) ){
								if( !onCheckFn(tmpData, grid1Rows, grid2Rows) ){
									return false;
								}
							}
							
							if( !self.hasClass('l-checkbox-selected') ){
								self.addClass('l-checkbox-selected');
								grid1Rows.addClass('l-grid-row-selected');
								grid2Rows.addClass('l-grid-row-selected');
								grid2Detail.addClass('l-grid-row-selected');
								checkbox.addClass('l-checkbox-selected');
								btnWrap.find('.l-checkbox').addClass('l-checkbox-selected');
								for(; i < len; i++){
									arr[i] = that.getRowData(i);
								}
							}else{
								self.removeClass('l-checkbox-selected');
								checkbox.removeClass('l-checkbox-selected');
								grid1Rows.removeClass('l-grid-row-selected');
								grid2Rows.removeClass('l-grid-row-selected');
								grid2Detail.removeClass('l-grid-row-selected');
								btnWrap.find('.l-checkbox').removeClass('l-checkbox-selected');
								for(; j > -1; j--){
									arr[j] = null;
								}
							}
							
						});
				},
				
				/**
				* 获取行数据
				* @param {Number} index 记录的索引值
				*/
				getRowData: function(index){
					var	pageIndex = p.pageIndex,
						data      = _cache.tmpData[pageIndex - 1]; //表格数据
	
					if( index === -1 ){
						return false;
					}
					
					return data[index];
				},
				
				/**
				* 明细按钮事件
				* @param {object} init 和 refresh共享的对象
				*/
				detailBtnFn: function(options){
					var that        = this,
						grid1       = g.grid1,
						grid2       = g.grid2,
						grid1Body   = grid1.find('.l-grid-body'),   //表格主体
						grid2Body   = grid2.find('.l-grid-body'),   //表格主体
						pageSize    = p.pageSize;
						
					grid1Body
						.off('click','.l-grid-row-detailbtn')
						.on('click','.l-grid-row-detailbtn',function(){
							var self         = $(this),
								parents      = self.parents('.l-grid-row'),
								index        = parents.attr('data-row'),
								grid2_row    = grid2Body.find('.l-grid-row').eq(index),
								detail       = grid2Body.find('.l-grid-row-detail'+index),
								detailHeight = 0;

							if( self.hasClass('l-grid-row-detailbtn-close') ){
								detail.show();
								self.removeClass('l-grid-row-detailbtn-close')
									.addClass('l-grid-row-detailbtn-open');
								
								for(var i = 0; i<detail.length; i++){
									detailHeight += detail[i].offsetHeight;
								}
								parents.height(grid2_row[0].offsetHeight + detailHeight);
							}else{
								detail.hide();
								self.removeClass('l-grid-row-detailbtn-open')
									.addClass('l-grid-row-detailbtn-close');
									
								parents.height(grid2_row[0].offsetHeight);
							}
						});
				},
				
				/**
				* ajax获取数据
				* @param {Function} callback ajax回调函数
				*/
				setAjaxCookieData: function(){
					
				},
				
				
				/**
				* ajax获取数据
				* @param {Function} callback ajax回调函数
				*/
				ajaxGetData: function(callback){
					var pageAjax      = p.pageAjax,
						type          = pageAjax.type === undefined ? 'GET' : pageAjax.type,
						showAllRow    = p.showAllRow,
						pageIndex     = p.pageIndex,
						pageSize      = p.pageSize,
						data          = '',
						isShowLoading = p.isShowLoading,
						args          = [],
						str           = '',
						pathname      = encodeURIComponent(location.pathname + 'getGridPrev'),
						strToData     = function(str){
											var args = {},
												data,
												param,
												name,
												value;
											
											data = str.split('&');
											
											for (var i = 0; i < data.length; i++) {
												param = data[i].split('=');
												name  = param[0];
												value = param[1];
												if(name === ""){
													name = "unkown";
												}
												if(typeof(args[name]) === "undefined"){ //参数尚不存在
													args[name] = value;
												}else if(typeof(args[name]) === "string"){ //参数已经存在则保存为数组
													args[name] = [args[name]];
													args[name].push(value);
												}else{ //已经是数组的
													args[name].push(value);
												}
											}
											
											return args;
										}
					
					if( typeof pageAjax.data ==='string' ){
						data = pageAjax.data;
						data += '&pageIndex=' + pageIndex;
						data += '&pageSize=' + pageSize;
						
						args = data.replace(/{{|}}/g,'');

					}else if( typeof pageAjax.data === 'object' || !pageAjax.data ){
						data = $.extend({}, pageAjax.data);
						data.pageSize  = p.pageSize;
						data.pageIndex = p.pageIndex;
						
						for( i in data){
							args.push(i + '=' + data[i])
						}
						
						args = args.join('&');
					}
					
					if( !g.isInit ){
						saogaUI.base.cookie.set(pathname, args, 200000);
					}
					if( /getGridPrev/.test(location.search) ){
						args = saogaUI.base.cookie.get(pathname) ? saogaUI.base.cookie.get(pathname) : args;
						p.pageIndex = Number( strToData(args).pageIndex );
					}

					$.ajax({
						type: type,
						url: pageAjax.url,
						cache: false,
						dataType: "json",
						data: args,
						beforeSend: function(){
							if( saogaUI.base.isFunction(pageAjax.beforeSend) ){
								pageAjax.beforeSend();
							}
							if( isShowLoading ){
								g.loding.fadeIn().removeClass('fn-hide');
							}
							g.onLoaded = false;
						},
						success: function(data){
							if( saogaUI.base.isFunction(pageAjax.success) ){
								pageAjax.success(data);
							}
							if( saogaUI.base.isFunction(callback) ){
								setTimeout(function(){
									callback(data);
									if( isShowLoading ){
										g.loding.fadeOut();
									}
								}, 500);
							}
							if( showAllRow ){
								p.pageSize = data ? data.total : 0;
								p.isPage   = false;
							}

							g.onLoaded = true;
						},
						error: function(data){
							callback();
							g.loding.fadeOut();
							g.jump(data);
						}
					});
				},
				
				/**
				* 获取数据
				*/
				getData: function(){
					var that = this;
						
					if( p.pageAjax ){
						p.data = {rows:[],total:0};
						that.ajaxGetData(function(data){
							p.data = data = !data ? p.data : ((!data.rows || !data.total) ? p.data : data);
							that.handleData(false);
							that.tBodyCreateHtml(p.pageIndex);
							that.pageCreateHtml();
							if( data.total !== undefined ){
								g.grid2.find('.l-grid-nullText').html(p.nullText);
							}
						});
					}
				},
				
				/**
				* 设置在cookie中的columns数据
				*/
				setCacheColumns: function(){
					var columns   = p.columns,
						len       = columns.length,
						i         = 0,
						h         = 0,
						cookieStr = saogaUI.base.cookie.get( encodeURIComponent(location.pathname) ),
						cookieArr = cookieStr.split(','),
						cookieLen = cookieArr.length;
						
					if( cookieStr ){
						_cache.columns = [];
					}
					
					for(; i<len; i++){
						for(var j = 0; j<cookieLen; j++){
							if( columns[i].display === cookieArr[j] ){
								_cache.columns[h] = columns[i];
								h++;
							}
						}
					}
				},

				/**
				* 数据处理
				* XXX: 待优化
				*@param {boolean} isGetData 防止ajax请求数据时死循环
				*/
				handleData: function(isGetData){
					var that      = this,
					    data      = p.data = !p.data ? {rows:[],total:0} : ((!p.data.rows || !p.data.total) ? {rows:[],total:0} : p.data),
						pageAjax  = p.pageAjax,
						pageSize  = p.pageSize,
						pageIndex = p.pageIndex,
						len       = Math.ceil(data.total / pageSize),
						i         = 0,
						arr       = []; //临时数组
					
					/*初始化*/
					isGetData = isGetData == undefined ? true : isGetData;
					if( isGetData ){
						that.getData(); //获取数据并重载 Html
					}

					/*分割数据*/
					for(; i<len; i++){
						
						if( !_cache.rowSelected[i] ){
							_cache.rowSelected[i] = []; //已选行数据
						}
						
						/*分割静态数据给arr*/
						if( !pageAjax ){
							var h = 0;	
							
							arr[i] = [];
							
							for(; h< pageSize; h++){
								var rowData = data.rows[pageSize*i + h];
								if( rowData ){
									arr[i][h] = rowData;
								}
							}
						}
					}
					
					if( pageAjax ){
						_cache.tmpData[pageIndex - 1] = p.data.rows;
					}else{
						_cache.tmpData = arr;
					}
					
					/*设置列的cookie*/
					if( p.isHideColumns ){
						that.setCacheColumns();
					}
				},
				
				/**
				* 对比现有数据
				* @param {String} name 要比较的的字段
				* @param {String} sortType 排序裂隙
				*/
				compareData: function(name, sortType){
					var index = p.pageIndex - 1,
						arr   = _cache.tmpData[index],
						len   = arr.length;
					
					arr.sort( getJsPercentDataComparator(name) );
					
					if( sortType === 'desc' ){
						arr.reverse();
					}
					
					_cache.tmpData[index] = arr;
					
					return arr;

					/*序顺序(a、b都是数字时按大小，a、b长度都一样是按字母，a、b长度不一时按长度)*/
					function getJsPercentDataComparator(name){
						return function(a, b){
							var result = 0;
							
							if( a[name] !== null && b[name] !== null ){
								var aStr   = a[name],
									bStr   = b[name],
									afloat = parseFloat(aStr),
									bfloat = parseFloat(bStr);
								
								if( !isNaN(bfloat) && !isNaN(afloat) ){
									result = (afloat>bfloat) ? 1 : -1;
								}else{
									if( aStr.length === bStr.length ){
										result = aStr.localeCompare(bStr);
									}else{
										result = (aStr.length>bStr.length) ? 1 : -1;
									}
									
								}
							}
							
							return result;
						}
					}
					
				},
				
				/**
				* 表头事件
				*/
				tHeadFn: function(){
					var that           = this,
						pageSize       = p.pageSize,                  //每页显示多少个
						pageIndex      = p.pageIndex,                 //起始位置
						grid1          = g.grid1,
						grid2          = g.grid2,
						grid1Header    = grid1.find('.l-grid-header'),        //表格头
						grid1Body      = grid1.find('.l-grid-body'),          //表格主体
						grid2Header    = grid2.find('.l-grid-header'),        //表格头
						grid2Body      = grid2.find('.l-grid-body'),          //表格主体
						isSort         = p.isSort,
						isSortCurrent  = p.isSortCurrent,
						popup          = g.popup,
						isHideColumns  = p.isHideColumns,
						isShow         = true;
										
					//排序
					if( isSort ){
						grid2Header
							.find('.l-grid-hd-cell-span')
							.addClass(function(){
								var that    = $(this),
									parents = that.parents('.l-grid-hd-cell');
								if( that.attr('data-columnName') ){
									that.addClass('l-grid-hd-cell-sortWrap')
										.append('<span class="l-grid-hd-cell-sort"><b class="icon icon-angle-up"></b></span>');
									parents.addClass('l-grid-hd-cell-sort');
								}
							});
							
						grid2Header
							.off('click', '.l-grid-hd-cell-sortWrap')
							.on('click', '.l-grid-hd-cell-sortWrap', function(){
								var self     = $(this),
									name     = self.attr('data-columnName'),
									sortType = '',
									sort     = self.find('.l-grid-hd-cell-sort');
									
								saogaUI.ui.onselectstart(self);
								
								if( isSortCurrent ){
									
									if( sort.hasClass('desc') ){
										sort.html('<b class="icon icon-angle-up"></b');
										sort.removeClass('desc');
										sortType = 'desc';
									}else{
										sort.html('<b class="icon icon-angle-down"></b');
										sort.addClass('desc');
										sortType = 'asc';
									}
									
									that.compareData(name, sortType);
									that.tBodyCreateHtml();
									
								}else{
									
									if( g.onLoaded ){
										
										if( sort.hasClass('desc') ){
											sort.html('<b class="icon icon-angle-up"></b');
											sort.removeClass('desc');
											sortType = 'desc';
										}else{
											sort.html('<b class="icon icon-angle-down"></b');
											sort.addClass('desc');
											sortType = 'asc';
										}
										
										if( typeof p.pageAjax.data === 'string' ){
											if( /&sort=/.test(p.pageAjax.data) ){
												p.pageAjax.data = (p.pageAjax.data).replace(/&sort={{\w*}}/, '&sort={{'+ name+ '}}');
												p.pageAjax.data = (p.pageAjax.data).replace(/&sortType={{\w*}}/, '&sortType={{'+ sortType +'}}');
											}else{
												p.pageAjax.data = (p.pageAjax.data) + '&sort={{'+ name+ '}}&sortType={{'+ sortType +'}}';
											}
										}else if( typeof p.pageAjax.data === 'object' ){
											p.pageAjax.data.name = name;
											p.pageAjax.data.name = sortType;
										}
								
										that.handleData();
										that.tBodyCreateHtml();
										
									}// end if g.onLoaded
									
								}
							});
						
					}//end if isSort
					
					if( isHideColumns ){
						grid2Header
							.off('contextmenu', '.l-grid-hd-cell')
							.on('contextmenu', '.l-grid-hd-cell', function(e){
								var self           = $(e.currentTarget),
									popup          = g.popup,
									popupWidth     = popup.outerWidth(),
									grid           = g.grid,
									gridWidth      = grid.outerWidth(),
									gridOffsetLeft = g.grid.offset().left,
									mousePosition  = saogaUI.ui.mousePosition(e),
									x              = mousePosition.positionX - gridOffsetLeft;
									
								if( gridWidth - x > popupWidth ){
									popup.css({'left':x});
								}else{
									popup.css({'left':x - popupWidth});
								}
								
								isShow = true;
								popup.show();
								return false;
							});
						
						popup
							.off('click')
							.on('click',function(e){
								isShow = true;
								e.stopPropagation();
							})
							.off('click', '.l-checkbox')
							.on('click', '.l-checkbox', function(e){
								var self = $(e.currentTarget);
								
								if( self.hasClass('l-checkbox-selected') ){
									if( popup.find('.l-checkbox-selected').length <= 1 ){ return false; }
									self.removeClass('l-checkbox-selected');
								}else{
									self.addClass('l-checkbox-selected');
								}
								
								var selected = popup.find('.l-checkbox-selected').next(),
									len      = selected.length,
									i        = 0,
									arr      = [];
									
								for(; i<len; i++){
									arr[i] = selected.eq(i).html();
								}
								saogaUI.base.cookie.set(encodeURIComponent(location.pathname), arr.join(), 200000);
								that.setCacheColumns();
								that.tHeadCreateHtml();
								that.tBodyCreateHtml();
								e.stopPropagation();
							})
							.off('click', '.l-grid-popup-text')
							.on('click', '.l-grid-popup-text', function(e){
								var self  = $(e.currentTarget);
								self.prev().trigger('click');
								saogaUI.ui.onselectstart(self);
								e.stopPropagation();
							});
						
						$(window).on('click', function(){
							if( isShow ){
								popup.hide();
								isShow = false;
							}
						});
					}
				},
						
				/**
				* 行事件
				*/
				rowFn: function(){
					
					var that   = this,
						grid1             = g.grid1,
						grid2             = g.grid2,
						grid1Body         = grid1.find('.l-grid-body'),   //表格主体						
						grid2Header       = grid2.find('.l-grid-header'), //表格头
						grid2Body         = grid2.find('.l-grid-body'),   //表格主体
						onCheckFn         = p.onCheckFn,
						pageSize          = p.pageSize,
						onRowFn           = p.onRowFn,
						isOnRowCheckbox   = p.isOnRowCheckbox,
						isSelectSingleRow = p.isSelectSingleRow,
						isOnRowFn         = saogaUI.base.isFunction(onRowFn);
						
					grid2Body
						.off('mouseover', '.l-grid-row-cell')
						.on('mouseover', '.l-grid-row-cell', function(){
							var self = $(this),
								arrt = self.attr('data-cell');
							
							self.parent().attr('data-cell', arrt);
						});
					
					grid2Body
						.off('click', '.l-grid-row')
						.on('click', '.l-grid-row', function(){
							var self          = $(this),
								pageIndex     = p.pageIndex,
								//selected      = grid2Body.find('.l-grid-row-selected'),
								selfDetail    = self.next('.l-grid-row-detail'),
								i             = self.attr('data-row'),
								currentArr    = _cache.rowSelected[pageIndex-1],
								grid1Row      = grid1Body.find('.l-grid-row').eq(i),
								grid1Checkbox = grid1Body.find('.l-checkbox').eq(i);
												
							if( !self.hasClass('l-grid-row-selected') ){
								if( !onRowFn || isSelectSingleRow ){
									self.siblings().removeClass('l-grid-row-selected');
									grid1Row.siblings().removeClass('l-grid-row-selected');
								}
								if( isOnRowCheckbox ){
									grid1Checkbox.addClass('l-checkbox-selected');									
								}
															
								self.addClass('l-grid-row-selected');
								selfDetail.addClass('l-grid-row-selected');
								grid1Row.addClass('l-grid-row-selected');

							}else{
								if( !isSelectSingleRow ){
									self.removeClass('l-grid-row-selected');
									selfDetail.removeClass('l-grid-row-selected');
									grid1Row.removeClass('l-grid-row-selected');
								}
								if( isOnRowCheckbox ){
									grid1Checkbox.removeClass('l-checkbox-selected');								
								}
							}
							
							if( isOnRowFn ){
								if( !self.hasClass('l-grid-row-selected') ){
									currentArr[i] = that.getRowData(i);
									
								}else{
									_cache.rowSelected[pageIndex-1][i] = null;
								}
								onRowFn(that.getRowData(i), self);
							}
						});
				},
				
				/**
				* 列事件
				* TODO
				*/
				cellFn: function(){
					var grid1           = g.grid1,
						grid2           = g.grid2,
						grid1Body       = grid1.find('.l-grid-body'),   //表格主体						
						grid2Header     = grid2.find('.l-grid-header'), //表格头
						grid2Body       = grid2.find('.l-grid-body'),   //表格主体
						onCheckFn       = p.onCheckFn,
						pageSize        = p.pageSize,
						onRowFn         = p.onRowFn,
						isOnRowCheckbox = p.isOnRowCheckbox,
						isOnRowFn       = saogaUI.base.isFunction(onRowFn);
				},
				
				/**
				* 运行 grid 控件
				*/
				run: function(reRequest){
					var that = this;
					
					reRequest = reRequest === undefined ? true : reRequest;
					
					that.handleData(reRequest);
					
					if( p.isHead ){
						that.tHeadCreateHtml();
						that.tHeadFn();
					}
					
					that.tBodyCreateHtml();
					
					if( g.isInit ){
						that.rowFn();
						//this.cellFn();
						that.checkboxFn();
						that.detailBtnFn();
						g.isInit = false;
						saogaUI.ui.onselectstart(g.grid1);
					}
					
					if( p.isPage || p.bottomBtns ){
						if( p.isPage ){
							that.pageCreateHtml();
							that.pageFn();
						}
						if( p.bottomBtns ){
							that.bottomBtnsCreateHtml();
							that.bottomBtnsFn();
						}
					}else{
						g.footer.remove();
					}
					
				},
				
				/**
				* grid 初始化
				* @return {Object} grid对象
				*/
				init: function(){
					var grid    = p.wrap.append('<div class="l-grid" id='+ p.id +'></div>').find('#'+p.id),
						loding  = grid.append('<div class="l-grid-loading fn-hide"><div class="l-grid-loadingBg"></div><div class="l-grid-loadingIco"></div></div>').find('.l-grid-loading'),
						popup   = grid.append('<div class="l-grid-popup"></div>').find('.l-grid-popup'),
						gBody   = grid.append('<div class="l-grid-body fn-clear"></div>').find('.l-grid-body'),
						grid1   = gBody.append('<div class="l-grid1"></div>').find('.l-grid1'),
						grid2   = gBody.append('<div class="l-sl-grid2"><div class="l-grid2"></div></div>').find('.l-grid2'),
						footer  = grid.append('<div class="l-grid-footer"></div>').find('.l-grid-footer'),
						btnWrap = footer.append('<div class="l-grid-footer-btns"></div>').find('.l-grid-footer-btns'),
						page    = footer.append('<div class="l-grid-footer-page"></div>').find('.l-grid-footer-page');
					
					p.pageIndex = 1;
					g.loding      = loding;
					g.popup       = popup;
					g.grid        = grid;
					g.grid1       = grid1;
					g.grid2       = grid2;
					g.footer      = footer;
					g.page        = page;
					g.btnWrap     = btnWrap;
					g.isInit      = true;
					g.onLoaded    = false;

					this.run();
					return g;
				}
				
			};//_core end

		/**
		* grid 刷新对象
		* @method saogaUI.ui.grid.refresh
		* @param {object} [o] - 刷新grid新的配置项
		* @return {Object} grid对象
		*/
		g.refresh = function(o){
			if( o ){
				for(var key in o){
					if( o.hasOwnProperty(key) && o[key] !== undefined ){
						if( p.pageAjax && o.pageAjax ){
							for(var key2 in o.pageAjax){
								p[key][key2] = o.pageAjax[key2];
							}
						}else{
							p[key] = o[key];
						}
					}
				}
			}
			
			if( o && !o.refreshIndex ){
				p.pageIndex = 1;
			}
			
			_cache.tmpData = [];
			_cache.rowSelected = [];
			_cache.detailSelected = [];
			
			_core.run();
			return g;
		};
		
		/**
		* grid 获取列头
		* @method saogaUI.ui.grid.getColumns
		* @return {Array} grid对象的列头数据
		*/
		g.getColumns = function(){
			if( _cache.columns.length ){
				return _cache.columns;
			}
			return p.columns;
		},

		/**
		* grid 重设列头
		* @method saogaUI.ui.grid.reSetColumns
		* @param {object} 列对象
		* @return {Object} grid对象
		*/
		g.reSetColumns = function(o){
			 p.columns = _cache.columns = o.columns;
			_core.run(false);
		};

		/**
		* grid 修改列名
		* @method saogaUI.ui.grid.changeHeaderText
		* @param {Number|String} i - 为Number时Columns的引值，checkbox的不算；为string时是Columns的name
		* @param {String} text - 要修改的文本
		* @return {Object} grid对象
		*/
		g.changeHeaderText = function(i, text){
			var grid2    = g.grid2,
				isString = isNaN(Number(i));
				
			
			if( isString ){
				var obj = grid2.find('.l-grid-hd-cell-span'),
					len = obj.length,
					j   = 0;
				for(; j<len; j++){
					if( obj.eq(j).attr('data-columnname') === i ){
						obj.eq(j).find('.l-grid-hd-cell-text').html(text);
					}
				}
			}else{
				grid2.find('.l-grid-hd-cell-text').eq(i).html(text);
			}
			
			return g;
		};

		/**
		* grid 获取当前页数据，只支持静态数据，使用ajax数据时请用pageAjax提供的success方式获取
		* @method saogaUI.ui.grid.getCurrentData
		* @return {Object} grid当前页数据对象
		*/
		g.getCurrentData = function(){
			var pageIndex = p.pageIndex;
			return _cache.tmpData[pageIndex - 1];
		};
		
		/**
		* grid 获取当前页所有数据
		* @method saogaUI.ui.grid.getCurrentAllData
		*/
		g.getCurrentAllData = function(){
			return p.data;
		};

		/**
		* grid 获取选中的数据
		* @method saogaUI.ui.grid.getSelectData
		* @return {object} grid数据，格式与请求的一样
		*/
		g.getSelectData = function(){
			var arr      = [],
				i        = 0, 
				selected = _cache.rowSelected,
				len      = selected.length,   //记录的长度
				total    = 0;                 //data个数
			
			/*过滤掉records下面的空元素*/
			for(; i < len; i++){
				if( selected[i] ){
					for(var h = 0; h<selected[i].length; h++){
						if( selected[i][h] ){
							arr.push( selected[i][h] );
						}
					}
				}
			}
			
			/*组装一个表格适用的data数据*/
			total = arr.length;
			
			return {
				"rows": arr,
				"total":total
			};
		};
		
		/**
		* grid 获取当前页索引
		* @method saogaUI.ui.grid.getPageIndex
		* @return {Boolean} 
		*/
		g.getPageIndex = function(){
			return p.pageIndex;
		};
		
		/**
		* grid 取消的选中的行
		* @method saogaUI.ui.grid.uncheckRow
		* @param {Number} i 取消的选中的行，值为当前页
		* @return {Object} grid对象
		*/
		/*g.uncheckRow = function(i, pageIndex){
			if( i !== undefined ){
				var grid1       = g.grid1,
					grid2       = g.grid2,
					grid1Header = grid1.find('.l-grid-header'), //表格头
					grid1Body   = grid1.find('.l-grid-body'),   //表格主体
					grid2Body   = grid2.find('.l-grid-body'),   //表格主体
					grid1Row    = grid1Body.find('.l-grid-row').eq(i),
					grid2Row    = grid2Body.find('.l-grid-row').eq(i),
					checkbox    = grid1Body.find('.l-checkbox').eq(i),
					currentArr  = _cache.rowSelected[pageIndex-1];
				
				checkbox.removeClass('l-checkbox-selected');
				grid1Row.removeClass('l-grid-row-selected');
				grid2Row.removeClass('l-grid-row-selected');
				grid1Header.find('.l-checkbox').removeClass('l-checkbox-selected');
				currentArr[i] = null;
				
				_core.initCheckbox();
			}
			return g;
		};
        */
        g.uncheckRowByID = function(id){
			if( id !== undefined ){
				var grid1       = g.grid1,
					grid2       = g.grid2,
					grid1Header = grid1.find('.l-grid-header'), //表格头
					grid1Body   = grid1.find('.l-grid-body'),   //表格主体
					grid2Body   = grid2.find('.l-grid-body'),   //表格主体
                    i           = getIndex(),
					grid1Row    = grid1Body.find('.l-grid-row').eq(i),
					grid2Row    = grid2Body.find('.l-grid-row').eq(i),
					checkbox    = grid1Body.find('.l-checkbox').eq(i);
                
				checkbox.removeClass('l-checkbox-selected');
				grid1Row.removeClass('l-grid-row-selected');
				grid2Row.removeClass('l-grid-row-selected');
				grid1Header.find('.l-checkbox').removeClass('l-checkbox-selected');
				
				_core.initCheckbox();
			}
            
			return g;
            
            function getIndex(){
                var selectedArr = _cache.rowSelected,
                    len         = selectedArr.length,
                    index       = 0;
                    
                for(; index<len; index++){
                    if( selectedArr[index] ){
                        var subSelectedArr = selectedArr[index],
                            subLen         = subSelectedArr.length,
                            subIndex       = 0;
                        for(; subIndex<subLen; subIndex++){
                            if( subSelectedArr[subIndex] && subSelectedArr[subIndex].id == id ){
                                subSelectedArr[subIndex] = null;
                                return subIndex;
                            }
                        }
                    }
                }
            }
		};
		
		/*g.uncheckRow2 = function(key, val){
			var data = _cache.rowSelected;
			
			for(var i = 0; i<data.length; i++){
				var dataItem = data[i];
				for(var h = 0; h<dataItem.length; h++){
					if( dataItem[h][key] !== undefined && dataItem[h][key] === val ){
						
					}
				}
			}
		};*/
		
		g.resetStatisToFixed = function(num){
			p.statisToFixed = num;
		}
		
		/**
		* grid 跳出执行
		* @method saogaUI.ui.grid.jump
		* @return {Boolean} 
		*/
		g.jump = function(data){
			console.log('ajax data error:',data);
			return false;
		};
		
		/**
		* grid 扩展
		* @method saogaUI.ui.grid.methos
		* @return {object} 
		*/
		g.methos = g.methos || {};
		
		return _core.init(o);
	};

	return function(options){
		return new Grid(options);
	};
});
define('core/tree',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* saogaUI.ui.tree 树形控件
	* @class saogaUI.ui.tree
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 树形参数
    * @param {String} o.id 树形id
    * @param {String} o.data 树形数据
    * @param {String} o.ajax 树形ajax数据，与o.data互斥
    * @param {String} o.ajax.url
    * @param {String} o.ajax.data
    * @param {String} o.ajax.beforeSend
    * @param {String} o.ajax.success
    * @param {String} o.ajax.error
    * @param {String} o.isSimple 简单数据格式，已经经过递归的数据
    * @param {String} o.target 树形容器
    * @param {Object} o.height o.target的高度
    * @param {Object} o.selectedID 初始化选中的ID
    * @param {Object} o.isOpen 初始化是否打开
    * @param {Object} o.onClick 树形item的click事件
    * @param {Object} o.onRightClick 树形item的RightClick事件
    * @param {Object} o.onMouseOver 树形item的onmouseover事件
    * @param {Object} o.onMouseOut 树形item的onmouseout事件
    * @param {Object} o.onLoad 树形加载完触发的事件
	* @return {Object} tree对象
	*/
	
	var Tree = function(o){
		
		var g = this,
        
			p = {
					id           : 'l-tree-'+(new Date()).valueOf(),
					data         : o.data,
					ajax         : null,
					isSimple     : true,   //是否是简单的数据格式
					target       : null,
					height       : 'auto',
					selected     : [],
					check        : null,
					isOpen       : true,
					isMultiple   : false,
					onClick      : null,
					onRightClick : null,
					onMouseOver  : null,
					onMouseOut   : null,
					onLoad       : null
				},
                
            /* 缓存池 */
            _cache = {
                selected: [],
                init: false
            },
            
			c = {
					/**
					* 创建树对象
					*/
					createHtml: function(){
						var data       = p.data,
							target     = p.target,
							//isMultiple = p.isMultiple,
							isCheckBox = p.check === 'checkbox',
							isRadio    = p.check === 'radio',
							isFirst    = true,
							tree       = function(data, pid, level){
							
								if( data ){
									var html  = '';
									
									level++;
																		
									for(var i = 0; i<data.length; i++){
										if( Number(data[i].pid) === pid ){
										
											var son          = data[i].children ? data[i].children : [],
												sonWrap      = '',
												sonHtml      = tree(son, Number(data[i].id), level),
												isLast       = !data[i+1],
												lastCls      = '',
												lastSwitch   = '',
												lastIco      = '',
												lineCls      = '',
												openCls      = '',
												closeCls     = '',
												selectCls    = '',
												isParent     = data[i].isParent === undefined ? false : data[i].isParent,
												isOpen       = data[i].open === undefined ? false : data[i].open,
                                                icon         = data[i].icon ? ' style="background:url('+ data[i].icon +') 0 0 no-repeat;"' : '',
												parentNode   = isParent ? ' l-tree-parentNode' : '',
                                                j            = 0,
                                                selected     = p.selected,
                                                selectedLen  = selected ? selected.length : 0,
                                                isChecked    = data[i].checked === undefined ? false : data[i].checked,
                                                checkedStr   = '',
												checkHtml    = '',
                                                dataName     = data[i].name,
                                                dataId       = data[i].id,
                                                dataPid      = data[i].pid,
                                                dataTitle    = data[i].title !== undefined ? data[i].title : data[i].name;
                                             
                                            /* 获取选中数据 */
                                            for( ; j<selectedLen; j++ ){
                                                if( isChecked ){
                                                    _cache.selected.push(data[i]);
													selectCls = ' l-tree-selectedNode';
                                                }
                                            }
                                            
                                            if( isChecked ){
                                                checkedStr = ' data-checked="true"';
                                            }
											
											if( isCheckBox ){
												checkHtml = '<span class="l-tree-check l-tree-checkbox l-tree-check-'+ level +'" data-level="'+ level +'"'+ checkedStr +'></span>';
											}
											
											if( isRadio ){
												checkHtml = '<span class="l-tree-check l-tree-radio" data-level="'+ level +'"></span>';
											}
											
											/*判断是不是子*/
											if( isLast ){
												lastCls    = ' l-tree-lastItem';
												lastSwitch = ' l-tree-lastSwitch';
												lastIco    = ' l-tree-lastIco';
											}

											/*判断最后一个*/
											if( !isLast ){
												lineCls = ' l-tree-line';
											}
											
											if( isOpen || isParent ){
												openCls = ' l-tree-open';
											}
											
											/*判断子有没有存在*/											
											if( sonHtml ){
												if( !isOpen ){
                                                    openCls  = '';
													closeCls = ' l-tree-close';
												}
												sonWrap +=	'<ul class="l-tree-ul'+ lineCls + (closeCls?' fn-hide':'') +'">';
												sonWrap +=		sonHtml;
												sonWrap +=	'</ul>';
												if( isFirst && dataPid === 0 ){
													parentNode = ' l-tree-parentNode l-tree-parentFirstNode';
													isFirst = false;
												}else{
													parentNode = ' l-tree-parentNode';
												}
											}
											
											html += '<li class="fn-clear l-tree-level-'+ level + lastCls +'">';
											html += 	'<div class="l-tree-item l-tree-itemLevel-'+ level + parentNode + '">';
											html += 		'<span class="l-tree-switch'+ openCls + closeCls + lastSwitch +'"></span>';
											html +=         checkHtml;
											html += 		'<a class="l-tree-node '+ selectCls +'" data-id="'+ dataId +'" data-pid="'+ dataPid+'" data-name="'+ dataName +'" title="'+ dataTitle +'">';
											html += 			'<span class="l-tree-ico'+ lastIco +'"'+ icon +'></span>';
											html += 			'<i class="l-tree-text">'+ dataName +'</i>';
											html += 		'</a>';
											html += 	'</div>';
											html += 	sonWrap;
											html += '</li>';
										}
									}
									return html;
								}
								
								return '';
							};
						
						target.html( '<ul class="l-tree">'+ tree(data, 0, 0) +'</ul>' );
					},
					
					/**
					* 数据处理
					*/
					handleData: function(){
						var data   = p.data,
							format = function(data, pid){
								var arr = [],
									son = [],
									h   = 0;
									
								//pid = pid === undefined ? 0 : pid,
								pid = pid >>> 0;
								
								for(var i = 0; i<data.length; i++){
									if( Number(data[i].pid) === Number(pid) ){
										son = format(data, data[i].id);
										if( son.length ){
											data[i].children = son;
										}
										arr[h] = data[i];
										h++;
									}
								}
								
								return arr;
							};
							p.data = format(data);
					},
					
					/**
					* ajax方式获取数据
					*/
					ajaxGetData: function(callback){
						var ajax = p.ajax;
						
						$.ajax({
							type: ajax.type === undefined ? 'POST' : ajax.type,
							url: ajax.url,
							cache: false,
							dataType: "json",
							data: ajax.data,
							beforeSend: function(){
								if( saogaUI.base.isFunction(ajax.beforeSend) ){
									ajax.beforeSend();
								}
							},
							success: function(data){
								if( saogaUI.base.isFunction(ajax.success) ){
									ajax.success(data, _cache.selected);
								}
								if( saogaUI.base.isFunction(callback) ){
									callback(data);
								}
							},
							error: function(data){
								if( saogaUI.base.isFunction(ajax.error) ){
									ajax.error(data);
								}
							}
						});
					},
					
					/**
					* 事件函数
					*/
					eventFn: function(){
						var target   = p.target,
							time     = null,
							itemData = function(obj){
											return {
														id: obj.attr('data-id'),
														pid: obj.attr('data-pid'),
														name: obj.attr('data-name'),
														isParent: obj.parent('.l-tree-item').hasClass('l-tree-parentNode')
													};
										};

						target
                            .off('click', '.l-tree-node')
							.on('click', '.l-tree-node', function(e){
								var that = $(e.currentTarget),
									data = itemData(that);
									
								target
									.find('a')
									.removeClass('l-tree-selectedNode');
								that.addClass('l-tree-selectedNode');
								saogaUI.ui.onselectstart(that);
									
								if( saogaUI.base.isFunction(p.onClick) && !p.check ){
									clearTimeout(time);
									time = setTimeout(function(){
										p.onClick(that, data);
									}, 100);
								
									_cache.selected = data;
								}
								
								return false;
							})
                            .off('dblclick', '.l-tree-node')
							.on('dblclick', '.l-tree-node', function(e){
								var that      = $(e.currentTarget),
									data      = itemData(that),
									switchBtn = that.siblings('.l-tree-switch'),
									isParent  = data.isParent;
									
								if( isParent ){
									clearTimeout(time);
									switchBtn.trigger('click');
								}
								
								if( saogaUI.base.isFunction(p.dblclick) ){
									p.dblclick(that, data);
								}
                                
                                _cache.selected = data;
                                
								return false;
							})
                            .off('contextmenu', '.l-tree-node')
							.on('contextmenu', '.l-tree-node', function(e){
								if( saogaUI.base.isFunction(p.onRightClick) ){
									var that = $(e.currentTarget),
										data = itemData(that);
										
									p.onRightClick(that, data, e);
									
									return false;
								}
							})
                            .off('mouseover', '.l-tree-node')
							.on('mouseover', '.l-tree-node', function(e){
								if( saogaUI.base.isFunction(p.onMouseOver) ){
									var that = $(e.currentTarget),
										data = itemData(that);
										
									p.onMouseOver(that, data);
								}
							})
                            .off('mouseout', '.l-tree-node')
							.on('mouseout', '.l-tree-node', function(e){
								if( saogaUI.base.isFunction(p.onMouseOut) ){
									var that = $(e.currentTarget),
										data = itemData(that);
										
									p.onMouseOut(that, data);
								}
							})
                            .off('click', '.l-tree-switch')
							.on('click', '.l-tree-switch', function(e){
								var that = $(e.currentTarget),
									son  = that.parent('.l-tree-item').next('.l-tree-ul');
                                    
                                saogaUI.ui.onselectstart(that);
									
								if( that.hasClass('l-tree-open') ){
									that.addClass('l-tree-close')
										.removeClass('l-tree-open');
									son.addClass('fn-hide');
								}else{
									that.addClass('l-tree-open')
										.removeClass('l-tree-close');
									son.removeClass('fn-hide');
								}
								
								return false;
							})
                            .off('click', '.l-tree-checkbox')
							.on('click', '.l-tree-checkbox', function(e){
								var that    = $(e.currentTarget),
									level   = Number(that.attr('data-level')),
                                    isInit  = _cache.init,
									checkFn = function(obj, level, isCurrent){
													var isChecked      = obj.hasClass('l-tree-checkbox-checked'),
														isPartChecked  = obj.hasClass('l-tree-checkbox-checked-part'),
														checkNum       = null,
														//partCheckNum   = null,
														parentWrap     = obj.parents('.l-tree-level-' + level ),
														parentsWrap    = obj.parents('.l-tree-level-' + (level-1) ),
														parentCheck    = parentsWrap.find('.l-tree-check-' + (level-1)),
														bother         = parentsWrap.find('.l-tree-check-' + level),
														botherNum      = bother.length,
														children       = parentWrap.find('.l-tree-check');
														
													/* 判断是否当前 */
													if( isCurrent ){
														
														if( isPartChecked  ){
															obj
																.addClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
																
															children
																.addClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
														}
														
														if( !isChecked ){
															obj.addClass('l-tree-checkbox-checked');
															children.addClass('l-tree-checkbox-checked');
														}else{
															if( !isInit ){
																obj.removeClass('l-tree-checkbox-checked');
																children.removeClass('l-tree-checkbox-checked');
															}
														}
														
														/* 获取已选数量 */
														checkNum = parentsWrap.find('.l-tree-check-' + level +'.l-tree-checkbox-checked').length;
														
														if( botherNum === checkNum ){
															parentCheck
																.addClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
														}else if( !checkNum ){
															parentCheck
																.removeClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
														}else{
															parentCheck
																.removeClass('l-tree-checkbox-checked')
																.addClass('l-tree-checkbox-checked-part');
														}
													}else{
														/* 获取已选数量 */
														checkNum = parentsWrap.find('.l-tree-check-' + level +'.l-tree-checkbox-checked').length;
														
														if( botherNum === checkNum ){
															parentCheck
																.addClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
														}else if( !checkNum && !isChecked && !isPartChecked ){
															parentCheck
																.removeClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
															children.removeClass('l-tree-checkbox-checked');
														}else{
															parentCheck
																.removeClass('l-tree-checkbox-checked')
																.addClass('l-tree-checkbox-checked-part');
														}
													}

													level--;
													if( level > 1 ){
														checkFn(parentCheck, level, false);
													}
                                                    
												};
								
								saogaUI.ui.onselectstart(that);
								
								checkFn(that, level, true);
                                p.onClick(that, g.getSelected());
                                
							})
                            
                            //FIXED ME
                            .off('click', '.l-tree-radio')
							.on('click', '.l-tree-radio', function(e){
								var that    = $(e.currentTarget),
									level   = Number(that.attr('data-level')),
									checkFn = function(obj){
													var isChecked   = obj.hasClass('l-tree-radio-checked'),
														parent      = obj.parents('.l-tree-level-' + level ),
														parents     = obj.parents('.l-tree-level-' + (level-1) ),
														parentCheck = parents.find('.l-tree-check[data-level="'+ (level-1) +'"]'),
														bother      = parents.find('.l-tree-check[data-level="'+ level +'"]'),
														botherNum   = bother.length,
														children    = parent.find('.l-tree-check');
													
													if( !isChecked ){
														bother.removeClass('l-tree-radio-checked');
														obj.addClass('l-tree-radio-checked');
														//children.addClass('l-tree-radio-checked');
													}else{
														obj.removeClass('l-tree-radio-checked');
														children.removeClass('l-tree-radio-checked');
													}
													if( botherNum === parents.find('.l-tree-check[data-level="'+ level +'"].l-tree-radio-checked').length ){
														parentCheck.addClass('l-tree-radio-checked');
													}else{
														//parentCheck.removeClass('l-tree-radio-checked');
													}
													if( level >= 1 ){
														level--;
														checkFn(parents);
													}
												};
								
								saogaUI.ui.onselectstart(that);
								
								checkFn(that);
							});
					},
                    
                    /**
					* 初始化checks
					*/
                    initCheckFn: function(){

                        var checked = p.target.find('.l-tree-checkbox[data-checked="true"]'),
                            len     = checked.length,
                            i       = 0;
                        
                        for(; i<len; i++){
                           checked.eq(i).trigger('click');
                        }

                    },
					
					/**
					* 创建树对象
					*/
					run: function(){
						if( p.isSimple ){
							this.handleData();
						}
						this.createHtml();
						this.eventFn();
                        if( p.check ){
                            this.initCheckFn();
                        }
					},
					
					/**
					* 初始化
					*/
					init: function(o){
			
						for(var key in o){
							if( o.hasOwnProperty(key) && o[key] !== undefined ){
								p[key] = o[key];
							}
						}
						
						p.target = $(p.target);
						
						if( p.ajax ){
							c.ajaxGetData(function(data){
								p.data = data;
								c.run();
								if( saogaUI.base.isFunction(p.onLoad) ){
									p.onLoad(p.data, _cache.selected);
								}
							});
							return g;
						}
						
						c.run();
						if( p.data && saogaUI.base.isFunction(p.onLoad) ){
							p.onLoad(p.data, _cache.selected);
						}
						return g;
					}
				};
		
		/**
		* 刷新树
		*/
		g.refresh = function(o){
			if( o ){
				for(var key in o){
					if( o.hasOwnProperty(key) && o[key] !== undefined ){
						if( p.ajax && o.ajax ){
							for(var key2 in o.ajax){
								p[key][key2] = o.ajax[key2];
							}
						}else{
							p[key] = o[key];
						}
					}
				}
			
                if( p.ajax ){
                    c.ajaxGetData(function(data){
                        p.data = data;
                        c.run();
                        if( saogaUI.base.isFunction(p.onLoad) ){
                            p.onLoad(p.data, _cache.selected);
                        }
                    });
                    return g;
                }
                
                c.run();
            }
			return g;
		};
        
		/**
		* 获取选中数据，不能获取初始化选中数据
		*/
        g.getSelected = function(){
            if( p.check ){
                var checkbox = p.target.find('.l-tree-checkbox'),
                    len      = checkbox.length,
                    i        = 0;

                _cache.selected = [];
                
                for(; i<len; i++){
                    var item = checkbox.eq(i);
                    if( item.hasClass('l-tree-checkbox-checked') || item.hasClass('l-tree-checkbox-checked-part') ){
                        var node = item.next('.l-tree-node'),
                            id   = node.attr('data-id'),
                            pid  = node.attr('data-pid'),
                            name = node.attr('data-name'),
                            obj  = {'pid':pid, 'id':id, 'name':name, 'checked':true};
							
                        _cache.selected.push(obj);
                    }
                }
            }
            return _cache.selected;
        };
		
		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new Tree(o);
	};
});
define('core/check',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* saogaUI.ui.check 下拉框控件
	* @class saogaUI.ui.check
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 下拉框参数
    * @param {String} o.id 下拉框id
	* @return {Object} select对象
	*/
	
	var Check = function(o){
		
		var 
			/**
			* 当前对象
			*/
			g = this,
			
			/**
			* 默认配置
			*/
			p = {
					id           : 'l-check-'+(new Date()).valueOf(),
					target       : null,
					wrap         : null,   //target外框，一般不设置
					checkbox     : false,  //multiple时设置有效，与radio互斥
					radio        : false,  //multiple时设置有效，与checkbox互斥
					onLoad       : null
				},
			
			/**
			* 代码逻辑
			*/
			c = {

					/**
					* 创建 html
					*/
					createHtml: function(){
						var target  = p.target,
							len     = p.target.length,
							type    = len ? target[0].type : null,
							i       = 0;
						
						p.wrap = p.target.parent();
						
						/*遍历多个target*/						
						for(; i<len; i++){
							var checkItem      = target.eq(i);
                            
                            if( checkItem.parent().hasClass('l-check-wrap') ){
                                continue;
                            }
                            
							var checkItemClass = checkItem[0].className,
                                checkItemValue = checkItem.attr('value'),
								checkItemName  = checkItem.attr('name'),
								isChecked      = checkItem.attr('checked'),
								isDisabled     = checkItem.attr('disabled'),
								disabledClass  = isDisabled ? (' l-'+ type + '-disabled') :'',
								checkedClass   = isChecked ? (' l-'+ type + '-selected') :'';
								
							checkItem.next()
									 .addClass('l-check-label l-'+ type +'-label')
									 .end()
									 .wrap('<div class="l-check-wrap fn-left"></div>')
									 .after('<div class="l-check-item l-'+ type +' '+ checkItemClass + checkedClass + disabledClass +'" data-name="'+ checkItemName +'" data-val="'+ checkItemValue +'"></div>');

						}
						target.css({'width':0,'height':0})
						//target.hide();
					},

					
					/**
					* 事件处理
					*/
					checkFn: function(){
						var that    = this,
							wrap    = p.wrap
							browser = saogaUI.base.browser;
							
						saogaUI.ui.onselectstart(wrap.parent());
                        
						wrap
							.off('click','.l-check-wrap')
							.on('click','.l-check-wrap',function(e){
								if( browser.ie && Number(browser.ie) < 8 ){
									var self      = $(e.currentTarget)
										checkItem = self.find('input');
									checkItem.trigger('change');
								}
							})
                            .on('click', '.l-check-item', function(e){
                                checkItem.trigger('change');
                            })
							.on('change', 'input', function(e){
								var self       = $(e.currentTarget),
									checkItem  = self.next(),
									selfName   = self.attr('name'),
									selfType   = self[0].type;
									
								if( !selfName ){ return console.log(selfType+' name is not define!') }
								
								if( selfType === 'radio' ){
									var sibling    = wrap.find('.l-check-item'),
										siblingLen = sibling.length,
										i          = 0;
									for(; i<siblingLen; i++){
										if( sibling.eq(i).attr('data-name') === selfName ){
											sibling.eq(i).removeClass('l-radio-selected');
										}
									}
									checkItem.addClass('l-radio-selected');
								}else{
									if( checkItem.hasClass('l-checkbox-selected') ){
										checkItem.removeClass('l-checkbox-selected');
									}else{
										checkItem.addClass('l-checkbox-selected');
									}
								}
							})
					},
					
					/**
					* 运行check
					*/
					run: function(){
						var that = this;
							
						that.createHtml();
						that.checkFn();
						
					},
					
					/**
					* 初始化
					*/
					init: function(o){
			
						for(var key in o){
							if( o.hasOwnProperty(key) && o[key] !== undefined ){
								p[key] = o[key];
							}
						}

						p.target = $(p.target);

						c.run();

						return g;
					}//end init
				};
		
		/**
		* 刷新下拉框
		*/
		g.refresh = function(o){
			for(var key in o){
				if( o.hasOwnProperty(key) && o[key] !== undefined && !o.target){
					p[key] = o[key];
				}
			}

			c.init();
			return g;
		};
		
		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new Check(o);
	};
});
define('core/btnDropdown',['core/saogaUI'], function(saogaUI){

	var btnDropdown = function(options){
		
		var isShow = false,
			target = options.target,
			menu   = $(options.menu);
		
		$('body').on('click', target, function(e){
			var that = $(this),
				menu = $(options.menu);
			e.stopPropagation();
			saogaUI.ui.onselectstart( that.parent() );
			if( !isShow ){
				menu.addClass('fn-hide');
				that.next(options.menu).removeClass('fn-hide');
				isShow = true;
			}else{
				menu.addClass('fn-hide');
				isShow = false;
			}
		}).on('mouseout', target, function(){
			isShow = false;
		}).on('click', options.menu + ' li', function(e){
			$(options.menu).addClass('fn-hide');
		});
		
		$(window).on('click', function(){
			if( !isShow ){
				$(options.menu).addClass('fn-hide');
			}
		});
		
	};

	return btnDropdown;

});
define('core/btnSwitch',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* TODO
	* saogaUI.ui.validator
	* @class saogaUI.ui.validator
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 
    * @param {String} o.id 
	* @return {Object} select对象
	*/
	
	var BtnSwitch = function(o){
		
		var 
			/**
			* 默认配置
			*/
			p = {
				target: null,
				open: null,
				close: null
			},
			
			/**
			* 代码逻辑
			*/
			c = {
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
							p[key] = o[key];
						}
					}

					var isFunction    = saogaUI.base.isFunction,
						onselectstart = saogaUI.ui.onselectstart;
						
					$('body')
						.off('click', p.target)
						.on('click', p.target, function(e){
							var that   = onselectstart( $(e.currentTarget) ),
								isOpen = that.hasClass('ui-btn-switch-open');

							if(isOpen){
								if( p.close ){
									if( p.close.ajax ){
										$.ajax({
											type: 'POST',
											url: p.close.ajax.url,
											data: p.close.ajax.data,
											async: false,
											success: function(){
												if( isFunction(p.open.run) ){
													p.close.run();
												}
											}
										});
									}else{
										if( isFunction(p.open.run) ){
											p.close.run();
										}
									}
								}
								that.removeClass('ui-btn-switch-open')
									.addClass('ui-btn-switch-close')
									.find('em')
									.html('已关闭');
							}else{
								if( p.open ){
									if( p.open.ajax ){
										$.ajax({
											type: 'POST',
											url: p.open.ajax.url,
											data: p.open.ajax.data,
											async: false,
											success: function(){
												if( isFunction(p.open.run) ){
													p.open.run();
												}
											}
										});
									}else{
										if( isFunction(p.open.run) ){
											p.open.run();
										}
									}
								}
								that.removeClass('ui-btn-switch-close')
									.addClass('ui-btn-switch-open')
									.find('em')
									.html('已开启');
							}
						});
				}
			};

		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new BtnSwitch(o);
	};
});
define('app/saogaUI',['require','core/saogaUI','template','core/drag','core/dialog','core/pop','core/tip','core/tab','core/calendar','core/validator','core/selectArea','core/grid','core/calendar','core/tree','core/select','core/check','core/btnDropdown','core/btnSwitch'],function(require){
	
	/**
	* 载入saogaUI
	*/
	var saogaUI             = require('core/saogaUI');
	saogaUI.template        = require('template');
	saogaUI.ui.drag         = require('core/drag');
	saogaUI.ui.dialog       = require('core/dialog');
	saogaUI.ui.pop          = require('core/pop');
	saogaUI.ui.tip          = require('core/tip');
	saogaUI.ui.tab          = require('core/tab');
	saogaUI.ui.calendar     = require('core/calendar');
	saogaUI.ui.validator    = require('core/validator');
	saogaUI.ui.selectArea   = require('core/selectArea');
	saogaUI.ui.grid         = require('core/grid');
	saogaUI.ui.calendar     = require('core/calendar');
	saogaUI.ui.tree         = require('core/tree');
	saogaUI.ui.select2      = require('core/select');
	saogaUI.ui.check        = require('core/check');
	saogaUI.ui.btnDropdown  = require('core/btnDropdown');
	saogaUI.ui.btnSwitch    = require('core/btnSwitch');
	
	return saogaUI;
});
define('jquery', [], function() {
    return jQuery;
});
define("app/jquery", function(){});

define('app/main',['require','app/saogaUI','app/jquery'],function(require){

	var saogaUI = require('app/saogaUI');
	
	require('app/jquery');
	//require('jquery-migrate1.2.1');
	

	
	return saogaUI;
});
