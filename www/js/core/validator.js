define(['core/saogaUI', 'i18n!core/nls/str'], function(saogaUI, lang){
	
	'use strict';
		
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
				label: null
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
				
				/* 强制勾选 */
				check: function(sVal, oItem){
					if( oItem[0].type === 'checkbox' && !oItem.attr('checked') ){
						return '必须勾选！';
					}

					if(  oItem[0].type === 'radio' && !$("input:radio[name='"+ oItem[0].name +"']:checked").attr('checked') ){
						return '必须勾选！';
					}
				},
				
				/* 非空 */
				required: function(sVal){
					if( !sVal.trims() ){
						return '不能为空！';
					}
				},
				
				/* 固定长度 */
				length: function(sVal, sParam){
					if( sVal.length !== Number(sParam) ){
						return '输入字符长度等于' + sParam +'个';
					}
				},
				
				/* 最小长度 */
				minLength: function(sVal, sParam){
					if(sVal.length < sParam){
						return '输入字符长度不小于' + sParam +'个';
					}
				},
				
				/* 最大长度 */
				maxLength: function(sVal, sParam){
					if(sVal.length > sParam){
						return '输入字符长度不大于' + sParam +'个';
					}
				},
				
				/* 整数 */
				integer: function(sVal){
					var f = parseFloat(sVal);
					if(!(!isNaN(f) && f.toString() == sVal && Math.round(f) == f)){
						return '请输入一个正确的整数值';
					}
				},
				
				/* 正整数 */
				digits: function(sVal){
					if( !/^\d+$/.test(sVal) ){
						return '请输入一个非负整数，含0';
					}
				},
				
				/* 浮点数 */
				floatNumber: function(sVal, sParam){
					var reg = new RegExp('^[0-9]+[\.][0-9]{'+ sParam +'}$');
					if( !reg.test(sVal) ){
						return '请输入一个精确到'+ sParam +'位小数的数值';
					}
				},
				
				/* 数字 */
				number: function(sVal){
					sVal = sVal.trims();
					if( isNaN(Number(sVal)) || !sVal.length ){
						return '请输入一个正确的数字';
					}
				},
				
				/* 邮箱 */
				email: function(sVal){
					if( !/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(sVal) ){
						return '邮箱格式不正确，请检查！';
					}
				},
				
				/* 手机 */
				mobile: function(sVal){
					if( !/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/.test(sVal) ){
						return '手机号码不正确，请检查！如：13412345678';
					}
				},
				
				/* 电话 */
				phone: function(sVal){
					if( !/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(sVal) ){
						return '电话号码不正确，请检查！如：0592-1234567';
					}
				},
				
				/* 网址 */
				url: function(sVal){
					if( !/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(sVal) ){
						return '请输入正确的网址，比如:http://www.example.com';
					}
				},
				
				//FIXME 
				/* 日期 */
				date: function(sVal, sParam){
					var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
					if (!regex.test(sVal)) return false;
					var d = new Date(sVal.replace(regex, '$2/$1/$3'));
					return ( parseInt(RegExp.$2, 10) == (1 + d.getMonth()) ) && (parseInt(RegExp.$1, 10) == d.getDate()) && (parseInt(RegExp.$3, 10) == d.getFullYear() );
				},
				
				format: function(sVal, sParam, oItem){
					var reg = new RegExp(sParam);
					if( !reg.test(sVal) ){
						return oItem.attr('data-validate-formatText');
					}
				},
				
				ajax: function(sVal, sParam, oItem, oMessage){
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
                                oMessage.html( oItem.attr('data-ajax-formatText') );
                            }
						},
						error: function(data){
							console.log(data);
						}
					});
				},
				
				route: function(sVal, sRule, oItem, oMessage){
					var oThat      = this,
						aRule      = sRule.split(';'),
						len        = aRule.length,
						i          = 0,
						rCode      = /\=/,
						rFormat    = /format\=|ajax\=/
						isFunction = saogaUI.base.isFunction;
						
					for(; i<len; i++){
						var sText = '',
							fRule = null;
						
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
							
							fRule = oThat[aChild[0]];
							
							if( fRule && isFunction(fRule) ){
								sText = fRule(sVal, aChild[1], oItem, oMessage);
							}
							
						}else{
							
							fRule = oThat[aRule[i]];
							
							if( fRule && isFunction(fRule) ){
								sText = fRule(sVal, oItem, oMessage);
							}
						}

						if( sText ){
							return sText;
						}
					}
				},
				
				run: function(){
					var oThat      = this,
						oTarget    = p.target,
						bPass      = false,
						fAction    = function(oSelf){
										var sVal    = oSelf.val(),
											sRule   = oSelf.attr('data-validate'),
											parents = oSelf.parents('.ui-form'),
											message = parents.find('.ui-form-message'),
                                            html    = null;
											
										if( oSelf.next('.ui-form-message').length ){
											message = oSelf.next('.ui-form-message');
										}

										if( html = oThat.route(sVal, sRule, oSelf, message) ){
                                            oSelf.addClass('l-form-error');
                                            message.html(html);
                                            return true;
                                        }
                                        
                                        return false;
									},
						fUnAction  = function(oSelf){
										var sVal    = oSelf.val(),
											parents = oSelf.parents('.ui-form'),
											message = parents.find('.ui-form-message');

										if( oSelf.next('.ui-form-message').length ){
											message = oSelf.next('.ui-form-message');
										}

                                        if( oSelf[0].type === 'checkbox' || oSelf[0].type === 'radio' ){
                                            $("input[name='"+ oSelf[0].name +"']").removeClass('l-form-error');
                                        }else{
                                            oSelf.removeClass('l-form-error');
                                        }
                                        
										message.empty();
									},
						fActionAll = function(){
										var oItem   = oTarget.find('[data-validate]'),
											len     = oItem.length,
											i       = 0,
											bSumbit = false;
											
										for(; i<len; i++){
											bSumbit = !fAction( oItem.eq(i) );
											if( bSumbit ){
												fUnAction( oItem.eq(i) );
											}
										}
									}
						
					oTarget.on('blur', '[data-validate]', function(e){
						fAction( $(e.currentTarget) );
					});
					
					oTarget.on('focus', '[data-validate]', function(e){
						fUnAction( $(e.currentTarget) );
					});
					
					oTarget.on('submit', function(){
						fActionAll();
                        if( !g.getStatus() ){
                            return false;
                        }
					});
					
					oTarget.on('all', function(){
						fActionAll();
					});
				},
				
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
							p[key] = o[key];
						}
					}
					
					p.target = $(p.target);
					
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
                    .removeClass('l-form-error');
                oMessage.eq(i).empty();
            }
		}
		
		g.getStatus = function(){
			return !p.target.find('.l-form-error').length;
		}
		
		g.validatorAll = function(){
			p.target.trigger('all');
            return g.getStatus();
		}

		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new Validator(o);
	};
});