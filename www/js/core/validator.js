define(['core/saogaUI'], function(saogaUI){
	
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
                        
                        if( oItem[0].type === 'checkbox' && !oItem.attr('checked') ){
                            return c.handleText(oItem, 'check');
                        }

                        if(  oItem[0].type === 'radio' && !$("input:radio[name='"+ oItem[0].name +"']:checked").attr('checked') ){
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
                            var text = oItem.attr('data-validate-requiredText');
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
                        
                        if(!(!isNaN(f) && f.toString() == sVal && Math.round(f) == f)){
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
                        return ( parseInt(RegExp.$2, 10) == (1 + d.getMonth()) ) && (parseInt(RegExp.$1, 10) == d.getDate()) && (parseInt(RegExp.$3, 10) == d.getFullYear() );
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
				
				route: function(sVal, sRule, oItem){
					var oThat      = this,
						aRule      = sRule.split(';'),
						len        = aRule.length,
						i          = 0,
						rCode      = /\=/,
						rFormat    = /format\=|ajax\=/,
						isFunction = saogaUI.base.isFunction,
						oReturn    = {};
						
					for(; i<len; i++){
						var sText    = '',
							fRule    = null,
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
							oReturn.html    = sText;
							oReturn.type    = sType;
							oReturn.typeVal = sTypeVal;
							return oReturn;
						}
					}
					
					return oReturn;
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
						html     = sContents;
						
					if( !message.length ){
						if( oSelf.next('.ui-form-message').length ){
							message = oSelf.next('.ui-form-message');
						}else if( message.length === 1 ){
							message = oTarget.find('.ui-form-message');
						}
					}

					if( !html ){
						message.empty();
						return false;
					}
					if( oItems.length !== 1 && error.length && sType ){
						html = '<span class="error">'+ oThat.handleText(error.eq(0), sType, sTypeVal) +'</span>';
					}
					
					message.html( html );
				},
				
				handleError: function(oSelf, type, html, typeVal){
					var oThat        = this,
						sHideError   = oSelf.attr('data-ishideValidte'),
						hideErrorCls = (sHideError === "true" && sHideError) ? ' l-form-hideError' :'';

					if( html ){
						oSelf.addClass('l-form-error'+hideErrorCls);
						oSelf.parents('.l-select-wrap')
							 .find('.l-select-single-init')
							 .addClass('l-form-error' + hideErrorCls);
						oThat.handleMessage(oSelf, '<span class="error">'+html+'</span>', type, typeVal);
					}else{
						oSelf.removeClass('l-form-error' + hideErrorCls);
						oSelf.parents('.l-select-wrap')
							 .find('.l-select-single-init')
							 .removeClass('l-form-error' + hideErrorCls);
						oThat.handleMessage(oSelf, '<span class="success"></span>', type);
					}
				},
				
				run: function(){
					var oThat      = this,
						oTarget    = p.target,
                        fRules     = p.rules,
                        fAjax      = p.ajax,
						bPass      = false,
						fAction    = function(oSelf){
										var sVal         = oSelf.val(),
											sRule        = oSelf.attr('data-validate'),
											sHideError   = oSelf.attr('data-ishideValidte'),
											hideErrorCls = '',
											oRoute       = {},
											name         = oSelf.attr('data-validate-name'),
											allName      = oTarget.find('[data-validate-name="'+ name +'"]'),
											errorLen     = allName.parents('.ui-form').find('.l-form-error').length,
											isOK         = oTarget.find('[data-validate-result="true"]').length;
											
										if( sHideError === "true" && sHideError ){
											hideErrorCls = " l-form-hideError";
										}

                                        if( saogaUI.base.isFunction(fRules) && sRule === 'process' ){
                                            processHandle('process', fRules(oSelf), true );
                                            return true;
                                        }
                                        
                                        if( saogaUI.base.isFunction(fAjax) && sRule === 'ajax' ){
                                            processHandle('ajax');
                                            fAjax(oSelf, function(status, isShow){
                                                processHandle('ajax', status, isShow);
                                            });
                                            return true;
                                        }

										oRoute = oThat.route(sVal, sRule, oSelf);
										
										if( oRoute.html ){
											
											if( name && allName.length ){
												
												if( oRoute.type !== 'required' ){
													oThat.handleError(oSelf, oRoute.type, oRoute.html, oRoute.typeVal);
													oSelf.attr('data-validate-result','false');
													return true;
												}else if( errorLen && !sVal ){
													return ;
												}
												
												if( isOK && oRoute.type === 'required' ){
													if( oSelf.attr('data-validate-result') === 'true' && !oSelf.val() && !oSelf.hasClass('l-form-error') && !allName.val() ){
														oThat.handleError(oSelf, oRoute.type, oRoute.html, oRoute.typeVal);
														oSelf.attr('data-validate-result','false');
														return true;
													}
													if( oSelf.hasClass('l-form-error') && !oSelf.val() ){
														oThat.handleError(oSelf, oRoute.type, oRoute.html, oRoute.typeVal);
														oSelf.attr('data-validate-result','false');
														return true;
													}
													oThat.handleError(allName);
													oSelf.attr('data-validate-result','true');
													return true;
												}
												
												oThat.handleError(allName, oRoute.type, oRoute.html, oRoute.typeVal);
												return true;

											}

											oThat.handleError(oSelf, oRoute.type, oRoute.html, oRoute.typeVal);
											return true;
											
										}else if( name && allName.length ){
											oSelf.attr('data-validate-result','true');
											
											return (function(){
												var i    = 0,
													len  = allName.length,
													obj  = null,
													isOK = true; 
													
												for(; i<len; i++){
													obj = allName.eq(i);
													console.log( obj.attr('data-validate-result') === "false", oRoute.html, oRoute )
													if( obj.attr('data-validate-result') === "false" ){
														oThat.handleError(obj, oRoute.type, oRoute.html, oRoute.typeVal);
														return true;
													}
												}
												
												oThat.handleError(allName);
												return true;
											})();
										}
																				
										oThat.handleError(oSelf);
                                        return true;
                                        
                                        function processHandle(type, status, isShow){
                                            if( !status ){
												oThat.handleError(oSelf, type, isShow ? oSelf.attr('data-validate-'+ type +'Text') : '');
                                            }else{
                                                oThat.handleError(oSelf);
                                            }
                                        }
									},
						fUnAction  = function(oSelf){
										var sVal         = oSelf.val(),
											sHideError   = oSelf.attr('data-ishideValidte'),
											hideErrorCls = '',
											name         = oSelf.attr('data-validate-name'),
											allName      = oTarget.find('[data-validate-name="'+ name +'"]'),
											errorLen     = allName.parents('.ui-form').find('.l-form-error').length;

										if( sHideError === "true" && sHideError ){
											hideErrorCls = " l-form-hideError";
										}

                                        if( oSelf[0].type === 'checkbox' || oSelf[0].type === 'radio' ){
                                            $("input[name='"+ oSelf[0].name +"']").removeClass('l-form-error' + hideErrorCls);
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
					
					oTarget.on('change', 'select', function(e){
						fAction( $(e.currentTarget) );
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
		}
		
		g.getStatus = function(){
			var oTarget       = p.target,
				oError        = oTarget.find('.l-form-error'),
				oVisibleError = oError.filter(function(){
									var that = $(this);
									return that.filter(':visible').length && that.filter(':enabled').length;
								}),
				oHideError    = oError.filter('.l-form-hideError'),
				len           = oVisibleError.length + oHideError.length;
			
			if( oVisibleError.length ){
				$('body').animate({scrollTop:oVisibleError[0].scrollTop},500);
			}
			
			//else if( oHideError.length ){
				//$('body').animate({scrollTop:oHideError[0].scrollTop},500);
			//}
			return !len;
		}
		
		g.validatorAll = function(){
			p.target.triggerHandler('all');
            return g.getStatus();
		}
		
		g.reload = function(){
			//if( p.target.length ){
			//	c.run();
			//}else{
				console.log('target overloaded');
				c.init(o);
			//} 
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