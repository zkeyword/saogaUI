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
define(['core/saogaUI', 'i18n!core/nls/str'], function(saogaUI, lang){
	
	var BaseGrid = function(o){
		var g       = this,
		
			/**
			* 缓存池
			* @private
			*/
			_cache = {
				data: [],
				tmpData: [],
				rowSelected: [],
				detailSelected: []
			},
			
			/**
			* 内部对象
			* @private
			*/
			_core   = {
				/**
				* 内部表格表头内容
				*/
				tHeadCreateHtml: function(){
					var columns   = g.o.columns,
						len       = columns.length,
						width     = g.o.width,    //考虑去掉
						detail    = g.o.detail,   //表格明细
						checkbox  = g.o.checkbox, //复选框
						popup     = g.popup,
						grid1     = g.grid1,
						grid2     = g.grid2,
						i         = 0,
						s         = '';
					
					//取出宽度最大的列
					var tmpWidth = 0
					for(var h = 0; h < columns.length; h++){
						tmpWidth = Math.max(columns[h].width, tmpWidth);
					}
					
					s += '<div class="l-grid-header"><table style="width:100%">';
					s += '<tr class="l-grid-hd-row">';
					if( detail.length ){
						s += '<th class="l-grid-hd-cell l-grid-hd-detail" style="width:13px"><div class="l-grid-row-cell-inner"><span class="l-detailbtn"></span></div></th>';
					}
					if( checkbox ){
						s += '<th class="l-grid-hd-cell l-grid-hd-checkbox" style="width:13px"><div class="l-grid-hd-cell-inner"><span class="l-checkbox l-grid-hd-checkbox"></span></div></th>';
					}
					for(; i < len; i++){
						var colWidth, innerWidth;
						if( columns[i].width === tmpWidth ){
							innerWidth = '';
							colWidth = 'auto';
						}else{
							innerWidth = ' style="width:'+ (columns[i].width - 10) +'px"';
							colWidth = columns[i].width + 'px';
						}
						s += '<th class="l-grid-hd-cell" style="width:'+ colWidth +'"><div class="l-grid-hd-cell-inner"'+ innerWidth +'>'+ columns[i].display +'</div></th>';
					}
					s += '</tr>';
					s += '</table></div>';

					grid2.append(s);
				},
				
				/**
				* 内部表格主体内容
				*/
				tBodyCreateHtml: function(){
					var columns   = g.o.columns,
						len       = columns.length,
						width     = g.o.width,    //考虑去掉
						detail    = g.o.detail,   //表格明细
						checkbox  = g.o.checkbox, //复选框
						nullText  = g.o.nullText,
						pageSize  = g.o.pageSize,
						popup     = g.popup,
						grid1     = g.grid1,
						grid2     = g.grid2,
						i         = 0,
						s         = '',
						tmpData   = _cache.tmpData,
						total     = g.o.data.total,
						index     = index !== undefined ? index - 1  : 0;
					
					//取出宽度最大的列
					var tmpWidth = 0;
					for(var h = 0; h < columns.length; h++){
						tmpWidth = Math.max(columns[h].width, tmpWidth);
					}
						
					s += '<table style="width:100%">';
					
					if( total ){
					
						for(var i = 0; i<pageSize; i++){
							if( tmpData[index][i] ){
														
								s += '<tr class="l-grid-row'+ (i%2 == 0 ? '' : ' l-grid-row-even') +'">';
								
								if( detail.length ){
									s += '<td style="width:13px"><div class="l-grid-row-cell-inner"><span class="l-detailbtn l-grid-row-detailbtn l-detailbtn-close"></span></div></td>';
								}
								
								if( checkbox ){
									s += '<td style="width:13px"><div class="l-grid-row-cell-inner"><span class="l-checkbox l-grid-row-checkbox"></span></div></td>';
								}
								
								for(var h = 0; h < columns.length; h++){
									var colWidth, innerWidth;
									if( columns[h].width === tmpWidth ){
										innerWidth = '';
										colWidth = 'auto';
									}else{
										innerWidth = ' style="width:'+ (columns[h].width - 10) +'px"';
										colWidth = columns[h].width + 'px';
									}
									s += '<td style="width:'+colWidth+'"><div class="l-grid-row-cell-inner"'+ innerWidth +'>';
									if( columns[h].render !== undefined ){
										s += columns[h].render.call(tmpData[index][i], i, tmpData[index][i][columns[h].name]);
									}else{
										s += tmpData[index][i][columns[h].name];
									}
									s += '</div></td>';
								}
								
								s += '</tr>';
								
								if( detail.render !== undefined ){
									var str    = detail.render(tmpData[index], pageStar),
										colLen = columns.length + (checkbox ? 1 : 0) + 1;
									s += '<tr class="l-grid-row-cell-detail"><td colspan="'+ colLen +'">'+ str +'</td></tr>';
								}
								
							}
						}
					}else{
						s += '<tr class="l-grid-row"><td><div class="l-grid-row-cell-inner">'+ nullText +'</div></td></tr>';
					}
					s += '</table>';

					grid2.append(s);
				},
				
				PagerCreateHtml: function(){
					
				},
				
				/**
				* 内部分页函数
				* @param {object} init 和 refresh共享的对象
				*/
				pageFn: function(options){
					
				},
				
				/**
				* 内部获取行数据
				* @param {Object} init 和 refresh共享的对象
				* @param {Number} 记录的索引值
				*/
				getRowData: function(options, index){
				
				},
				
				/**
				* 初始化选择框
				* @param {object} init 和 refresh共享的对象
				*/
				initCheckbox: function(options, selectedRecords){

				},
				
				/**
				* 选择框事件
				* @param {object} init 和 refresh共享的对象
				*/
				checkboxFn: function(options){
					
				},
				
				/**
				* 明细按钮事件
				* @param {object} init 和 refresh共享的对象
				*/
				detailBtnFn: function(options){
					
				},
				
				/**
				* ajax获取数据
				*/
				ajaxGetData: function(index, callback){
					var pageAjax = g.o.pageAjax,
						type     = pageAjax.type == undefined ? 'POST' : pageAjax.type;
					
					$.ajax({
						type: type,
						url: pageAjax.url,
						cache: false,
						async: false,
						dataType: "json",
						data: (pageAjax.data).replace('{{index}}', index),
						beforeSend: function(){
							if( saogaUI.base.isFunction(pageAjax.beforeSend) ){
								pageAjax.beforeSend();
							}
						},
						success: function(data){
							if( saogaUI.base.isFunction(pageAjax.success) ){
								pageAjax.success(data);
							}
							if( saogaUI.base.isFunction(callback) ){
								callback(data);
							}
						},
						error: function(data){
							g.jump(data);
						}
					});
				},
				
				/**
				* 分割数据
				* @param {number} 页面索引值，默认从1开始
				*/
				splitData: function(index){
					if( g.o.pageAjax ){
						this.ajaxGetData(index, function(data){
							g.o.data = data;
						});
					}else{
						
						/**************待定****************/
						var i         = 0,
							data      = g.o.data.rows,
							pageSize  = g.o.pageSize,
							dataLen   = g.o.data.total,                    //记录总数
							pageStar  = index*pageSize,                        //当前记录的起始
							pageEnd   = Math.min((index+1)*pageSize, dataLen); //当前记录的结束
	
						for(; pageStar < pageEnd; pageStar++){
							if( data[pageStar] ){
								splitData[i] = data[pageStar];
							}
							i++;
						}
						
						g.o.data = {};
						g.o.data.rows = data;
						g.o.data.total = dataLen;
						/**************待定****************/
					}
					
				},
				
				
				/**
				* 数据处理
				*/
				handleData: function(){
					//初始化
					this.splitData(1);
										
					//ajax 请求失败或data无指定、data格式不对
					if( !g.o.data || g.o.data.rows === undefined ){g.jump(g.o.data);}
						
					var data = g.o.data,
						len  = Math.ceil(data.total / g.o.pageSize),
						i    = 1,
						arr  = [];
					
					arr[0] = data.rows;
					_cache.rowSelected[0] = [];
					
					//i = 1是因为splitData初始化的时候已经为1
					for(; i<len; i++){
						if( !g.o.pageAjax ){
							this.splitData(i + 1);
							_cache.tmpData[0] = g.o.data;
						}else{
							arr[i] = [];
						}
						_cache.rowSelected[i] = []; //选择中
					}
					_cache.tmpData = arr;
					console.log(_cache.tmpData)
				},
				
				/**
				* 表头事件
				*/
				tHeadFn: function(){
					
				},
				
				/**
				* 排序
				*/
				dataSort: function(){
				
				},
				
				/**
				* 行事件
				*/
				rowFn: function(){
				
				},
				
				/**
				* 列事件
				*/
				cellFn: function(){
				
				},
				
				/**
				* 创建grid对象
				*/
				run: function(){
					this.handleData();
					this.tHeadCreateHtml();
					this.tBodyCreateHtml();
					this.checkboxFn();
					this.checkboxFn();
					this.pageFn();
					this.tHeadFn();
					this.rowFn();
					this.cellFn();
				}
				
			};

		/**
		* 表格全局数据源
		*/
		g.o = {
			data:         o.data || {},
			columns:      o.columns || {},
			wrap:         $(o.wrap),
			id:           o.id || 'l-grid-' + (new Date()).valueOf(),
			bottomBtns:   o.bottomBtns || {},
			isPager:      o.isPager ? false : true,
			pageIndex:    o.pageIndex || 1,
			pageSize:     o.pageSize || 10,
			onPageFn:     o.onPageFn,
			checkbox:     o.checkbox ? true : false,
			width:        o.width || 'auto',
			onCheckFn:    o.onCheckFn || null,
			isMemory:     o.isMemory ? true : false,
			nullText:     o.nullText ? o.nullText : '',
			detail:       o.detail || {},
			pageAjax:     o.pageAjax || null,
			current:      1
		};
		
		
		/**
		* 表格初始化
		*/
		g.init = function(){
			var grid  = g.o.wrap.append('<div class="l-grid" id='+ g.o.id +'></div>').find('#'+g.o.id),
				popup = grid.append('<div class="l-grid-popup"></div>').find('.l-grid-popup'),
				grid1 = grid.append('<div class="l-grid1"></div>').find('.l-grid1'),
				grid2 = grid.append('<div class="l-grid2"></div>').find('.l-grid2');
			
			g.o.current   = 1;
			g.o.pageIndex = 1;
			g.grid        = grid;
			g.popup       = popup;
			g.grid1       = grid1;
			g.grid2       = grid2;
			
			_core.run();
			return g;
		};
		
		/**
		* 表格刷新数据源
		*/
		g.refresh = function(o){
			g.o.current   = 1;
			g.o.pageIndex = 1;
			_core.run();
			return g;
		},

		/**
		* 重设列头
		*/
		g.reSetColumns = function(o){
			g.o.columns = o.columns;
			_core.run();
		},

		/*修改列名*/
		g.changeHeaderText = function(){

		},
			
		/**
		* 获取选中的数据，并组装成表格可用的数据格式
		*/
		g.getSelectData = function(){
		
		};
		
		g.jump = function(data){
			console.log(data);
			return false;
		};

		g.methos = g.methos || {};
		
	};

	/**
	 * grid实例化
	 */
	return function(options){
		var grid = new BaseGrid(options);
		return grid.init();
	};
	
});