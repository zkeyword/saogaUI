define(['core/saogaUI'], function(saogaUI){
	
	'use strict';
		
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
							type    = target[0].type,
							len     = p.target.length,
							i       = 0;
						
						if( type !== 'radio' || type !== 'checkbox' ){}
						
						p.wrap = p.target.parent();
						
						/*遍历多个target*/						
						for(; i<len; i++){
							var checkItem      = target.eq(i),
								checkItemClass = checkItem[0].className,
								checkItemName  = checkItem.attr('name'),
								isChecked      = checkItem.attr('checked'),
								isDisabled     = checkItem.attr('disabled'),
								disabledClass  = isDisabled ? (' l-'+ type + '-disabled') :'',
								checkedClass   = isChecked ? (' l-'+ type + '-selected') :'';
								
							checkItem.next()
									 .addClass('l-check-label l-'+ type +'-label')
									 .end()
									 .wrap('<div class="l-check-wrap fn-left"></div>')
									 .after('<div class="l-check-item l-'+ type +' '+ checkItemClass + checkedClass + disabledClass +'" data-name="'+ checkItemName +'"></div>');

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
							.on('change','input',function(e){
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