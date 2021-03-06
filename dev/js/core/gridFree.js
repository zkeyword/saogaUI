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
define(['core/saogaUI', 'template', 'core/pagination'], function(saogaUI, template, pagination){
	
	'use strict';
	
	var 
		/**
		* 默认配置
		* @private
		*/
	
		p    = {
					template: null, //模板ID
					nullTemplate: null, //空模板ID
					wrap: null, //插入位置
					pageIndex:1, //初始化页码
					pageSize:10, //每页显示的条数
					pageSizeOptions: [10, 20, 50, 100, 200], //可选择设定的每页结果数
					data:{}, //静态数据
					pageAjax:{ //ajax数据源
						type: 'GET',
						dataType: "json",
						success: function(){},
						error: function(){},
						beforeSend: function(){}
					},
					isShowLoading: true, //是否显示loading效果
					onRowFn: function(){}, //点击行事件
					bottomBtns: {}, //底部按钮
					statis: [], //统计
					statisToFixed: 2 //统计精确位数
				},
				
		/**
		* 缓存池
		* @private
		*/
		_cache = {
			data: {},
			tmpData: [],
			ele: {},
			isInit: true,
			fragment: {
				loading: '<div class="l-gridFree-loading"><div class="l-grid-loadingBg"></div><div class="l-grid-loadingIco"></div></div>',
				pagination: '<div class="l-gridFree-footer-page ui-pagination"></div>',
				pageSelect: '<div class="l-gridFree-footer-select"></div>',
				bottomBtns: '<div class="l-gridFree-footer-btn"></div>',
				nullWrap: p.nullTemplate ? template(p.nullTemplate, {cls: 'l-gridFree-body-nullWrap'}) :'<div class="l-gridFree-body-nullWrap"></div>'
			}
		},
		
		/**
		* 内部对象
		* @private
		*/
		_core = {
			ajax: function(callback){
				var pageAjax      = p.pageAjax,
					type          = pageAjax.type === undefined ? 'GET' : pageAjax.type,
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
				
				if( !_cache.isInit ){
					saogaUI.base.cookie.set(pathname, args, 200000);
				}
				if( /getGridPrev/.test(location.search) ){
					args = saogaUI.base.cookie.get(pathname) ? saogaUI.base.cookie.get(pathname) : args;
					p.pageIndex = Number( strToData(args).pageIndex );
				}else{
					saogaUI.base.cookie.set(pathname, args, 200000);
				}
				
				$.ajax({
					type: p.pageAjax.type,
					url: p.pageAjax.url,
					cache: false,
					dataType: p.pageAjax.dataType,
					data: args,
					beforeSend: function(){
						//if( p.isShowLoading && _cache.ele.loading && ( p.nullTemplate || p.pageIndex !== 1 ) ){
							_cache.ele.loading.style.display = 'block';
						//}
					},
					success: function(data){
						_cache.data = data;
						_cache.tmpData[p.pageIndex - 1] = data.rows;
						
						//if( p.pageIndex === 1 && !p.nullTemplate ){
						//	callback(data);
						//	p.pageAjax.success(data);
						//}else{
							setTimeout(function(){
								callback();
								p.pageAjax.success(data);
								
								if( p.isShowLoading ){
									_cache.ele.loading.style.display = 'none';
								}
							}, 500);
						//}
					},
					error: function(data){
						_cache.tmpData[p.pageIndex - 1] = [];
						_cache.total = 0;
						callback();
						p.pageAjax.error(data);
						console.log(data)
						setTimeout(function(){
							_cache.ele.loading.style.display = 'none';
						}, 500);
					}
				});
			},
			createWrap: function(ele){
				var wrap     = document.getElementById(ele),
					children = null,
					footer   = null,
					fragment = _cache.fragment;
				
				if( !wrap.children.length ){
					wrap.innerHTML ='<div class="l-gridFree">'+ 
										fragment.loading +
										'<div class="l-gridFree-body">'+
											fragment.nullWrap +
										'</div>'+
										'<div class="l-gridFree-footer">'+
											fragment.bottomBtns +
											fragment.pageSelect +
											fragment.pagination +
										'</div>'+
									'</div>';
				}
				
				children = wrap.firstChild.children;
				footer   = children[2];
				
				return {
					wrap: wrap,
					loading: children[0],
					body: children[1],
					footer: footer,
					bottomBtns: footer.children[0],
					pageSelect: footer.children[1],
					pagination: footer.children[2]
				}
			},
			createBody: function(){
				var arr = _cache.tmpData[p.pageIndex - 1];

				/* 扩展template的辅助函数  */
				for(var i = 0, len = p.templateRender.length; i<len; i++){
					template.helper(p.templateRender[i].name, p.templateRender[i].handle);
				}
				
				_cache.data.rows          = arr;
				_cache.ele.body.innerHTML = arr.length ? template(p.template, _cache.data) : _cache.fragment.nullWrap;
				
			},
			createFooter: function(){
				
				if( !_cache.tmpData[p.pageIndex - 1].length ) {
					 _cache.ele.footer.style.display = 'none';
				}else{
					_cache.ele.footer.style.display = '';
				}
				
				var html            = '',
					pageSize        = p.pageSize,
					pageSizeOptions = p.pageSizeOptions;
				
				if( pageSizeOptions.length ){
					html += '<select class="ui-select">';
					for(var i = 0, len = pageSizeOptions.length, select = _cache.ele.pageSelect; i<len; i++){
						html += '<option value="'+ pageSizeOptions[i] +'"'+ (pageSize === pageSizeOptions[i] ? ' selected="selected"' : '') +'>'+ pageSizeOptions[i] +'</option>';
					}
					html += '</select>';
					
					select.innerHTML = html;
					
					select.firstChild.onchange = function(){
						p.pageSize = Number( this.value );
						p.pageIndex = 1;
						_cache.tmpData = [];
						
						_core.ajax(function(){
							_core.createBody();
							_core.createFooter();
						});
					}
				}
				
				pagination({
	                cur: p.pageIndex,
	                total: Math.ceil(_cache.data.total / pageSize),
	                target: _cache.ele.pagination,
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
			
			
			/**
			* 对比现有数据
			* @param {String} name 要比较的的字段
			* @param {String} sortType 排序裂隙
			*/
			compareData: function(name, sortType, callback){
				var index = p.pageIndex - 1,
					arr   = _cache.tmpData[index];
				
				arr.sort( getJsPercentDataComparator(name) );
				
				if( sortType === 'desc' ){
					arr.reverse();
				}
				
				_cache.tmpData[index] = arr;
				
				_core.createBody();
				
				callback();
				
				return;

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
			* 对比所有数据
			* @param {String} name 要比较的的字段
			* @param {String} sortType 排序裂隙
			*/
			compareAllData: function(name, sortType, callback){
				if( typeof p.pageAjax.data === 'string' ){
					if( /&sort=/.test(p.pageAjax.data) ){
						p.pageAjax.data = (p.pageAjax.data).replace(/&sort={{\w*}}/, '&sort={{'+ name+ '}}');
						p.pageAjax.data = (p.pageAjax.data).replace(/&sortType={{\w*}}/, '&sortType={{'+ sortType +'}}');
					}else{
						p.pageAjax.data = (p.pageAjax.data) + '&sort={{'+ name+ '}}&sortType={{'+ sortType +'}}';
					}
				}else if( typeof p.pageAjax.data === 'object' ){
					p.pageAjax.data.sort     = name;
					p.pageAjax.data.sortType = sortType;
				}else{
					p.pageAjax.data = {};
					p.pageAjax.data.sort     = name;
					p.pageAjax.data.sortType = sortType;
				}
				_core.ajax(function(){
					_core.createBody();
					callback();
				});
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
				_cache.isInit = false;
			});
		};
	
	/**
	* 刷新表格数据
	* @param {String} name 要比较的的字段
	* @param {String} sortType 排序裂隙
	*/
	GridFree.prototype.refresh = function(options){
		
		p = $.extend(true, p, options);
		_cache.tmpData = [];
		
		_core.ajax(function(){
			_core.createBody();
			_core.createFooter();
		});
		
		return this;
	};
	
	/**
	* 获取页码
	*/
	GridFree.prototype.getPageIndex = function(){
		return p.pageIndex;
	};
	
	/**
	* 获取当前页数据
	*/
	GridFree.prototype.getCurrentData = function(){
		return _cache.data;
	};
	
	/**
	* 获取行数据
	* @param {Number} i 当前页的行索引
	*/
	GridFree.prototype.getRowData = function(i){
		return _cache.data.rows[i];
	};
	
	/**
	* 排序
	* @param {String} options.sort 要比较的的字段
	* @param {String} options.sortType 排序类型
	* @param {Boolean} options.isSortCurrent 是否排序当前页的数据，默认为true，只按字符串大小排序，设置为false时，这进行ajax排序
	* @param {Function} options.callback 排序后的回调函数
	*/
	GridFree.prototype.sort = function(options){
		if( !options || !options.sort ) return;
				
		var sort          = options.sort,
			sortType      = options.sortType || 'asc',
			isSortCurrent = options.isSortCurrent === undefined ? true : options.isSortCurrent,
			callback      = options.callback || function(){};
		
		if( isSortCurrent ){
			_core.compareData(sort, sortType, callback);
		}else{
			_core.compareAllData(sort, sortType, callback);
		}
	};
	
	/**
	* 设置选中数据
	* @param {Number} i 当前页的行索引
	*/
	GridFree.prototype.setRowSelected = function(i){
		
	};
	
	/**
	* 删除选中数据
	* @param {Number} i 当前页的行索引
	*/
	GridFree.prototype.delRowSelected = function(i){
		
	};
	
	/**
	* 获取选中数据
	* @param {Number} i 当前页的行索引
	*/
	GridFree.prototype.getRowSelected = function(i){
		
	};

	return function(options){
		return new GridFree(options);
	};
});