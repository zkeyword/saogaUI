(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.Upload = factory(root.jQuery);
    }
}(this, function ($) {
	
	'use strict';
	
	var Upload = function(options){
		
		var g           = this,
			domFragment = {
							file: '<input type="file" name="{{name}}" />',
							params: '<input type="hidden" name="{{key}}" value="{{value}}" />',
							form: '<iframe name="iframe_{{name}}"></iframe><form method="post" enctype="multipart/form-data" name="form_{{name}}" target="iframe_{{name}}" action="{{url}}"></form>'
						},
			c           = {
							/* 简单模板替换 */ 
							_tpl: function (tpl, data) {
								return tpl.replace(/{{(.*?)}}/g, function ($1, $2) {
									return data[$2] === undefined ? '' : data[$2];
								});
							},
							/* 简单的遍历 */
							_each: function (tpl, data){
								var html = '';
								for(var i = 0, len = data ? data.length : 0; i<len; i++){
									data[i].index = i;
									html += c._tpl(tpl, data[i]);
								}
								return html;
							},
							init:function(){
								var target = g.target,
									url    = g.url,
									name   = g.name,
									obj    = {},
									wrap   = '',
									html   = '',
									iframe = '',
									form   = '';
									
								if( !url ){
									return console.log('url is not define');
								}
								if( !target ){
									return console.log('target is not define');
								}
								
								formObj = {
									url: url,
									name: name
								}

								if( !wrap.length ){
									target.before('<div class="l-upload-wrap" style="display:none;">'+ c._tpl(domFragment.form, formObj) +'</div>');
								}
								
								html = c._each(domFragment.params, params) + c._tpl(domFragment.form, formObj);
								
								wrap   = target.next('.l-upload-wrap');
								iframe = wrap.find('iframe');
								form   = wrap.find('form').html(html);
								file   = wrap.find('input[type="file"]');
								
								target
									.on('click', function(){
										
										/*iframe 在提交完成之后*/
										iframe
											.load(function() {
												var data = $(this).contents().find('body').html().match(/\{.+?\}/);
												if( dataType === 'json' ){
													data = $.parseJSON(data);
												}
												g.onComplate(data);
												/*setTimeout(function() {
													iframe.remove();
													form.remove();
												}, 5000);*/
											});
										
										/*文件框提交动作*/
										file.change(function() {
												form.submit();
											})

									});
							}
						}
						
		g.target     = $(options.trigger);
		g.url        = options.url || '';
		g.name       = options.name || 'filedata';
		g.params     = options.params || {};
		g.dataType   = options.dataType || 'json';
		g.onSend     = options.onSend || '';
		g.onComplate = options.onComplate || ''; 
		
		g.run = c.init;
		
		return;
		var o = options || {};
		if( !o.trigger ){ return false; };
		var noop       = function(){return true;},
			trigger    = $(o.trigger),                           //触发上传事件的容器
			url        = o.url || '',                            //上传地址
			name       = o.name || 'filedata',                   //文件域名字
			params     = o.params || {},                         //隐藏域数据
			dataType   = o.dataType || 'json',
			onSend     = o.onSend || noop,
			onComplate = o.onComplate || noop,
			iframe     = '',
			form       = '';
		
		trigger.click(function(){
			/*添加form数据域*/
			var formHtml = '<input type="file" id="input-'+ name +'" name="' + name + '" />';
			
			for (key in params) {
				formHtml += '<input type="hidden" name="' + key + '" value="' + params[key] + '" />';
			}
			
			if( !$('#iframe_'+ name).length ){
				$('body').append('<iframe style="position:absolute;top:-9999px" id="iframe_'+ name +'" name="iframe_'+ name +'"></iframe>');
				$('body').append('<form method="post" style="display:none;" enctype="multipart/form-data" id="form_'+ name +'" name="form_'+ name +'" target="iframe_'+ name +'" action="'+ url +'"></form>');
				iframe = $('#iframe_'+ name);
				form   = $('#form_'+ name).html(formHtml);
			}
		
			if(!onSend){
				return;
			}
						
			/*iframe 在提交完成之后*/
			iframe.load(function() {
				var data = $(this).contents().find('body').html().match(/\{.+?\}/);
				if( dataType === 'json' ){
					data = window.eval('(' + data + ')');
				}
				onComplate(data);
				setTimeout(function() {
					iframe.remove();
					form.remove();
				}, 5000);
			});
			
			/*文件框提交动作*/
			var fileInput = $('#input-'+name);
			fileInput.change(function() {
				form.submit();
			});
			fileInput.click();
		});
	};

	Upload.prototype = {
		
		constructor: Upload,
		
		getData: function(options){
			
		},
		
		reload: function(){
			
		}
	};

	return function(o){
		return o ? new Upload(o) : {};
	};
}));