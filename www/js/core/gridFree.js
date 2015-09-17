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
define(['core/cncnERP', 'template', 'core/pagination'], function(cncnERP, template, pagination){
	
	'use strict';
	
	var 
		/**
		* 默认配置
		* @private
		*/
	
		p    = {
					template: null,
					wrap: null,
					pageSize:10,
					pageIndex:1,
					data:{},
					pageAjax:{
						type: 'post',
						dataType: "json"
					},
					isShowLoading: true
				},
				
		/**
		* 缓存池
		* @private
		*/
		_cache = {
			data: [],
			tmpData: [],
			ele: {}
		},
		
		/**
		* 内部对象
		* @private
		*/
		_core = {
			ajax: function(callback){
				var isShowLoading = p.isShowLoading,
					data          = p.pageAjax.data,
					args          = {},
					argsStr       = [],
					param,
					name,
					value;
				
				data += '&pageIndex=' + p.pageIndex;
				data += '&pageSize=' + p.pageSize;
									
				data = data.replace(/{{|}}/g,'');
				data = data.split('&');
				
				for (var i = 0; i < data.length; i++) {
					param = data[i].split('=');
					name = param[0],
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
				
				$.ajax({
					type: p.pageAjax.type,
					url: p.pageAjax.url,
					cache: false,
					dataType: p.pageAjax.dataType,
					data: args,
					beforeSend: function(){
						if( p.isShowLoading && _cache.ele.loading && p.pageIndex !== 1 ){
							_cache.ele.loading.style.display = 'block';
						}
					},
					success: function(data){
						_cache.data = data;
						_cache.tmpData[p.pageIndex - 1] = data.rows;
						
						if( p.pageIndex === 1 ){
							callback(data);
							p.pageAjax.success(data);
						}else{
							setTimeout(function(){
								callback();
								p.pageAjax.success(data);
								
								if( p.isShowLoading ){
									_cache.ele.loading.style.display = 'none';
								}
							}, 500);
						}
					},
					error: function(data){
						_cache.tmpData[p.pageIndex - 1] = [];
						_cache.total = 0;
						callback();
						p.pageAjax.error(data);
						console.log(data)
					}
				});
			},
			createWrap: function(ele){
				var wrap     = document.getElementById(ele),
					children = null;
				
				if( !wrap.children.length ){
					wrap.innerHTML ='<div class="l-gridFree"><div class="l-gridFree-loading"><div class="l-grid-loadingBg"></div><div class="l-grid-loadingIco"></div></div><div class="l-gridFree-body"></div><div class="l-gridFree-footer ui-pagination"></div></div>';
				}
				
				children = wrap.firstChild.children;
				
				return {
					wrap: wrap,
					loading: children[0],
					body: children[1],
					footer: children[2]
				}
			},
			createFooter: function(){
				pagination({
	                cur: p.pageIndex,
	                total: Math.ceil(_cache.data.total / p.pageSize),
	                target: _cache.ele.footer,
	                prevText:'&lt;',
	                nextText:'&gt;',
					callback: function(cur, total){
						p.pageIndex = cur;
						if( !_cache.tmpData[p.pageIndex -1] ){
							_core.ajax(function(){
								_core.createBody();
							});
						}else{
							_core.createBody();
						}
						
					}
	            });
			},
			createBody: function(){
				for(var i = 0, len = p.templateRender.length; i<len; i++){
					template.helper(p.templateRender[i].name, p.templateRender[i].handle);
				}
				
				_cache.data.rows = _cache.tmpData[p.pageIndex - 1];
				_cache.ele.body.innerHTML = template(p.template, _cache.data);
			}
		},
		
		/**
		* 表格对象
		* @public
		*/
		GridFree = function(options){

			p = $.extend(true, p, options);
			
			if( !p.wrap ) return;
			
			_cache.ele = $.extend({}, _cache.ele, _core.createWrap(p.wrap) );
			
			_core.ajax(function(){
				_core.createBody();
				_core.createFooter();
			});
		};

	GridFree.prototype.refresh = function(options){
		
		p = $.extend(true, p, options);
		_cache.tmpData = [];
		
		_core.ajax(function(){
			_core.createBody();
			_core.createFooter();
		});
		
		return this;
	};
	
	GridFree.prototype.getPageIndex = function(){
		return p.pageIndex;
	};
	
	GridFree.prototype.getCurrentData = function(){
		return _cache.data;
	};
	
	GridFree.prototype.getRowData = function(i){
		return _cache.data.rows[i];
	};

	return function(options){
		return new GridFree(options);
	};
});