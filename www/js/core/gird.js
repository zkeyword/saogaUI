define(['core/saogaUI', 'i18n!core/nls/str'], function(saogaUI, lang){
	
	var BaseGrid = function(){
		var g       = this,
		
			/**
			* 全局已选记录
			* @private
			*/
			_records = {
				rowselected: [],
				detailSelected: []
			},
			
			/**
			* 内部对象
			* @private
			*/
			_core   = {
				/**
				* 内部表格表头内容
				* @param {object} init 和 reflash共享的对象
				*/
				tHeadFn: function(options){
					var columns   = options.columns,
						len       = columns.length,
						width     = options.width,    //考虑去掉
						detail    = options.detail,   //表格明细
						checkbox  = options.checkbox, //复选框
						i         = 0,
						s         = '';
					
					//取出宽度最大的列
					var tmpWidth = 0;
					for(var h = 0; h < columns.length; h++){
						tmpWidth = Math.max(columns[h].width, tmpWidth);
					}
					
					s += '<div class="l-grid-header"><table style="width:100%">';
					s += '<tr>';
					if( detail ){
						s += '<th style="width:13px"><div class="l-grid-row-cell-inner"><span class="l-detailbtn"></span></div></th>';
					}
					if( checkbox ){
						s += '<th style="width:13px"><div class="l-grid-hd-cell-inner"><span class="l-checkbox l-grid-hd-checkbox"></span></div></th>';
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
						s += '<th style="width:'+ colWidth +'"><div class="l-grid-hd-cell-inner"'+ innerWidth +'>'+ columns[i].display +'</div></th>';
					}
					s += '</tr>';
					s += '</table></div>';
					return s;
				},
				
				/**
				* 内部表格主体内容
				* @param {object} init 和 reflash共享的对象
				*/
				tBodyFn: function(options, index){
					var columns   = options.columns,
						pageSize  = options.pageSize,
						width     = options.width,
						checkbox  = options.checkbox,                      //选择框
						detail    = options.detail,                        //行明细
						s         = '',
						tmpData   = options.tmpData,
						index     = index !== undefined ? index - 1  : 0;
					
					//取出宽度最大的列
					var tmpWidth = 0;
					for(var h = 0; h < columns.length; h++){
						tmpWidth = Math.max(columns[h].width, tmpWidth);
					}
						
					s += '<table style="width:100%">';
					for(var i = 0; i<pageSize; i++){
						if( tmpData[index][i] ){
							if( detail ){
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
									s += columns[h].render(tmpData[index][i], i, tmpData[index][i][columns[h].name]);
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
					s += '</table>';
					return s;
				},
				
				/**
				* 内部分页函数
				* @param {object} init 和 reflash共享的对象
				*/
				pagerFn: function(options){
					var columns     = options.columns,                   //表格columns
						id          = options.id,                        //表格ID
						pageSize    = options.pageSize,                  //每页显示多少个
						pageIndex   = options.pageIndex,                 //起始位置
						count       = options.data.total || 0,           //记录总个数
						onPageFn    = options.onPageFn,                  //记录总个数
						isMemory    = options.isMemory,                  //翻页是否记住选择记录
						isPageCache = options.isPageCache,               //翻页是否缓存
						itemNum     = 2,                                 //当前页两边显示个数
						grid        = $('#'+id),
						gridHeader  = grid.find('.l-grid-header'),       //表格头
						gridBody    = grid.find('.l-grid-body'),         //表格主体
						pager       = grid.find('.l-grid-footer-pager'), //分页容器
						current     = 1,                                 //当前位置
						html        = '',
						
						/**
						* 获取数字连接
						* @private
						* @param {Number} 
						* @param {String} 上下翻页的文本
						*/
						_getLink    = function(index, txt){
							return '<a href="javascript:;" data-page="'+ index +'"'+ (current === index ? ' class="on"' : '') + '>'+ (txt || index) +'</a>';
						},
						
						/**
						* 获取显示的数据
						* @private
						* @param {Number} 每页显示条数
						* @param {Number} 数据长度
						* @param {Number} 当前位置
						*/
						_getCount   = function(pageSize, count, index){
							var start   = (index-1)*pageSize + 1,
								end     = index*pageSize,
								str     = lang.countFont+'',
								pageNum = Math.ceil(count / pageSize);
							
							str = str.replace('{{start}}', start);     //当前开始位置
							str = str.replace('{{end}}', end);         //当前结束位置
							str = str.replace('{{count}}', count);     //总条数
							str = str.replace('{{size}}', pageSize);   //每页显示条数
							str = str.replace('{{pageNum}}', pageNum); //总页数
							str = str.replace('{{current}}', index);   //当前位置
							
							return str;
						},
						
						/**
						* 获取分页按钮
						* @private
						* @param {Number} 每页显示条数
						* @param {Number} 数据长度
						* @param {Number} 当前位置
						*/
						_getBtn     = function(pageSize, count, index){
							var s       = '',
								begin   = 1,
								end     = 1,
								i       = 0,
								pageNum = Math.ceil(count / pageSize);
								
							if(index > 1){
								s += _getLink(index - 1,'上一页');
							}else{
								s += '<span>'+ lang.prevPage +'</span>';
							}
							if(index - itemNum > 1){
								s += _getLink(1) + '<em>...</em>';
								begin = index - itemNum;
							}
							end = Math.min(pageNum, begin + itemNum * 2);
							if(end === pageNum - 1){
								end = pageNum;
							}
							for(i = begin; i <= end; i++) {
								s += _getLink(i);
							}
							if(end < pageNum){
								s += '<em>...</em>' + _getLink(index);
							}
							if(index < pageNum){
								s += _getLink(index + 1, lang.nextPage);
							}else{
								s += '<span>'+ lang.nextPage +'</span> ';
							}
							
							return s;
						},
						
						/**
						* 设置是否记录选择框的选择结果
						* @private
						*/
						_setMemory  = function(){
							if( !isMemory ){
								_records.rowselected = []; //修改选中的数组值
							}else{
								_core.initCheckbox(options, _records.rowselected); //初始化选中状态
							}
						};
						
	
					/*分页统计*/
					html += '<div class="l-grid-footer-pager-msg">'+ _getCount(pageSize, count, pageIndex) +'</div>';
					
					/*分页按钮*/
					html += '<div class="l-grid-footer-pager-btn">'+ _getBtn(pageSize, count, pageIndex) +'</div>';				
					
					/*生成分页*/
					pager.html(html);
					
					/*初始化records.rowselected*/
					_setMemory();
					
					/*分页事件*/
					pager.on('click','a',function(){
					
						var gridpageMsg = pager.find('.l-grid-footer-pager-msg'),
							gridpageBtn = pager.find('.l-grid-footer-pager-btn'),
							index       = Number( $(this).attr('data-page') ); // attr返回 string
						
						/*修改全局g.o的 pageIndex 成员*/
						options.pageIndex = index;
						
						/*返回接口，可能修改全局g.o对象，所以前置*/
						if( saogaUI.base.isFunction(onPageFn) ){
							if( isPageCache ){
								var cache = options.cache[index];
								onPageFn(index, pageSize, cache);
							}else{
								onPageFn(index, pageSize);
							}
						}
						
						/*重新获取数据*/
						options.tmpData[index] = _core.splitData(options, index);
						
						/*重载html*/
						current = index;
						gridBody.html( _core.tBodyFn(options, index) );
						gridpageMsg.html( _getCount(pageSize, count, index) );
						gridpageBtn.html( _getBtn(pageSize, count, index) );
						
						/*全部选上时给表头全选*/
						if( gridBody.find('.l-checkbox-selected').length == pageSize ){
							gridHeader.find('.l-checkbox').addClass('l-checkbox-selected');
						}else{
							gridHeader.find('.l-checkbox').removeClass('l-checkbox-selected');
						}
						
						/*修改records.rowselected*/
						_setMemory();
					});
				},
				
				/**
				* 内部获取行数据
				* @param {Object} init 和 reflash共享的对象
				* @param {Number} 记录的索引值
				*/
				getRowData: function(options, index){
					var	data      = options.data.rows; //表格数据
						
					if( index === -1 ){
						return false;
					}
					
					return data[index];
				},
				
				/**
				* 初始化选择框
				* @param {object} init 和 reflash共享的对象
				*/
				initCheckbox: function(options, selectedRecords){
					var pageSize   = options.pageSize,                  //每页显示多少个
						pageIndex  = options.pageIndex,                  //起始位置
						id         = options.id,                         //表格ID
						grid       = $('#'+id),
						gridHeader = grid.find('.l-grid-header'),        //表格头
						gridBody   = grid.find('.l-grid-body'),          //表格主体
						checkbox   = gridBody.find('.l-checkbox'),       //复选框
						len        = selectedRecords.length,
						i          = pageSize*(pageIndex-1),
						j          = 0,
						selected   = Math.min(pageSize, checkbox.length); //已选数量
					
					for(; i < len; i++, j++){
						if( selectedRecords[i] ){
							checkbox.eq(j).addClass('l-checkbox-selected');
						}
					}
	
					/*全部选上时给表头全选*/
					if( gridBody.find('.l-checkbox-selected').length === selected ){
						gridHeader.find('.l-checkbox').addClass('l-checkbox-selected');
					}
				},
				
				/**
				* 选择框事件
				* @param {object} init 和 reflash共享的对象
				*/
				checkboxFn: function(options){
					var id         = options.id,                  //表格ID
						grid       = $('#'+id),
						gridHeader = grid.find('.l-grid-header'), //表格头
						gridBody   = grid.find('.l-grid-body'),   //表格主体
						isMemory   = options.isMemory,            //是否记住选择
						onCheckFn  = options.onCheckFn;           //点击后执行
	
					/*多选*/
					gridBody.on('click', '.l-checkbox', function(){
						var self      = $(this),
							pageSize  = g.o.pageSize,                        //每次触发重新查找pageSize
							pageIndex = g.o.pageIndex,                       //每次触发重新查找pageIndex
							checkbox  = gridBody.find('.l-checkbox'),
							i         = checkbox.index(self),
							arr       = [],
							selected  = Math.min(pageSize, checkbox.length); //已选数量
						
						if( isMemory ){
							i = i + pageSize*(pageIndex - 1);
						}
											
						if( !self.hasClass('l-checkbox-selected') ){
							self.addClass('l-checkbox-selected');
							_records.rowselected[i] = _core.getRowData(options, i);
	
							/*全部选上时给表头全选*/
							if( gridBody.find('.l-checkbox-selected').length === selected ){
								gridHeader.find('.l-checkbox').addClass('l-checkbox-selected');
							}
						}else{
							_records.rowselected.splice(i, 1, null); //赋一个null值，站位，防bug
							self.removeClass('l-checkbox-selected');
							gridHeader.find('.l-checkbox').removeClass('l-checkbox-selected');
						}
											
						/*返回选择数据*/
						if( saogaUI.base.isFunction(onCheckFn) ){
							onCheckFn();
						}
	
					});
					
					/*全选*/
					gridHeader.on('click', '.l-checkbox', function(){
						var self      = $(this),
							pageSize  = g.o.pageSize,                 //每次触发重新查找pageSize
							pageIndex = g.o.pageIndex,                //每次触发重新查找pageIndex
							checkbox  = gridBody.find('.l-checkbox'),
							len       = checkbox.length,
							i         = 0,
							j         = len - 1;
						
						if( isMemory ){
							i   = pageSize*(g.o.pageIndex - 1);
							len = len + i;
						}
							
						if( !self.hasClass('l-checkbox-selected') ){
							self.addClass('l-checkbox-selected');
							checkbox.addClass('l-checkbox-selected');
							for(; i < len; i++){
								_records.rowselected[i] = _core.getRowData(options, i);
							}
						}else{
							self.removeClass('l-checkbox-selected');
							checkbox.removeClass('l-checkbox-selected');
							for(; j > -1; j--){
								_records.rowselected.splice(j, 1);
							}
						}
						
						/*返回选择数据*/
						if( saogaUI.base.isFunction(onCheckFn) ){
							onCheckFn();
						}
					});
				},
				
				/**
				* 明细按钮事件
				* @param {object} init 和 reflash共享的对象
				*/
				detailBtnFn: function(options){
					var id         = options.id,                  //表格ID
						grid       = $('#'+id),
						gridBody   = grid.find('.l-grid-body'),   //表格主体
						isMemory   = options.isMemory,            //是否记住选择
						onCheckFn  = options.onCheckFn;           //点击后执行
						
					gridBody.on('click', '.l-detailbtn', function(){
						var self = $(this),
							next = self.parents('tr').next('.l-grid-row-cell-detail');
						
						if( self.hasClass('l-detailbtn-close') ){
							self.removeClass('l-detailbtn-close');
							next.show();
						}else{
							self.addClass('l-detailbtn-close');
							next.hide();
						}
					});
				},
				
				ajaxGetData: function(options, index, callback){
					var index = index !== undefined ? index : 0;
					$.ajax({
						type: "get",
						url: options.pageAjax.url,
						cache: false,
						async: false,
						dataType: "json",
						data: (options.pageAjax.data).replace('{{index}}',index),
						beforeSend: function(){
							if( saogaUI.base.isFunction(options.pageAjax.beforeSend) ){
								options.pageAjax.beforeSend();
							}
						},
						success: function(data){
							if( saogaUI.base.isFunction(options.pageAjax.success) ){
								options.pageAjax.success(data);
							}
							if( saogaUI.base.isFunction(callback) ){
								callback(data);
							}
						},
						error: function(data){
							//console.log(data);
						}
					});
					
					
				},
				
				
				/**
				* 分割数据
				* @param {number}
				*/
				splitData: function(options, index){
					var splitData = [];
					if( options.pageAjax ){
						_core.ajaxGetData(options, index, function(data){
							splitData[index] = data.rows[0];
							console.log(splitData);
						});
					}else{
						var i         = 0,
							data      = options.data.rows,
							pageSize  = options.pageSize,
							dataLen   = options.data.total,                    //记录总数
							pageStar  = index*pageSize,                        //当前记录的起始
							pageEnd   = Math.min((index+1)*pageSize, dataLen); //当前记录的结束

						for(; pageStar < pageEnd; pageStar++){
							if( data[pageStar] ){
								splitData[i] = data[pageStar];
							}
							i++;
						}
					}
					
					return splitData;
				}
				
			};
		
		/**
		* 表格初始化
		* @member saogaUI.ui.BaseGrid
		* @param {Object} options 页面传过来的对象
		* @param {Object} options.data json数据源
		* @param {Object} options.columns 表格列信息
		* @param {String} options.wrap 收纳表格的容器
		* @param {String} options.id 表格ID
		* @param {Object} options.bottomBtns 底部按钮
		* @param {Boolean} options.isPager 是否分页
		* @param {Number} options.pageSize 每页显示条数
		* @param {Number} options.pageIndex 默认当前页
		* @param {Function} options.onPageFn 击分页加载的事件
		* @param {Boolean} options.checkbox 是否有checkbox
		* @param {Boolean} options.onCheckFn 选择事件(复选框)
		* @param {Number} options.width 表格总宽度
		* @param {Boolean} options.isMemory 翻页是否记住选择记录
		* @param {Boolean} options.isPageCache 翻页是否缓存数据
		* @param {String} options.nullText 数据为空时的提示文本
		* @param {Object} options.detail 表格详细
		* @return {Object} saogaUI.ui.baseGrid
		*/
		this.init = function(o){
			if(!o){return false;}
			var options = {
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
					isMemory:     o.isMemory ? false : true,
					isPageCache:  o.isPageCache ? false : true,
					nullText:     o.nullText ? o.nullText : '',
					detail:       o.detail || {},
					pageAjax:     o.pageAjax || null
				},
				tmpArr  = [],
				tmpPage = 0,
				tm      = 1;
			
			tmpArr[0] = _core.splitData(options, 0);
			tmpPage   = Math.ceil(options.data.total / options.pageSize);
			
			//tm = 1是因为splitData初始化的时候已经为0
			for(; tm<tmpPage; tm++){
				tmpArr[tm] = _core.splitData(options, tm);
			}
						
			options.tmpData = tmpArr;
			
			/*复制options共享g.o对象*/
			for(var key in options){
				if( options.hasOwnProperty(key) ){
					g.o[key] = options[key];
				}
			}
			
			/*生成表格*/
			
				/*插入容器*/
				options.wrap.append('<div class="l-gird" id="'+ options.id +'"></div>');
				var grid  = $('#' + options.id),
					width = (options.width === 'auto' ? grid.width() : options.width);
				
				options.width = width;
				
				/*表头*/
				var tHeadHtml = _core.tHeadFn(options);
				grid.append(tHeadHtml);
				
				/*内容*/
				if( options.tmpData.length ){
					var tBodyHtml = _core.tBodyFn(options);
					grid.append('<div class="l-grid-body">'+ tBodyHtml +'</div>');
				}else{
					grid.append('<div class="l-grid-body">'+ options.nullText +'</div>');
				}
								
				/*底部*/
				
					/*底部结构*/
					var tFootHtml = '';
					tFootHtml += '<div class="l-grid-footer">';
					if( options.bottomBtns.length ){ // 是否有底部按钮
						tFootHtml += '<div class="l-grid-footer-btns"></div>';
					}
					if( options.isPager ){ // 是否显示分页
						tFootHtml += '<div class="l-grid-footer-pager"></div>';
					}
					tFootHtml += '</div>';
					grid.append(tFootHtml);
			
					var gridFooter = grid.find('.l-grid-footer');
						
					/*按钮*/
					if( gridFooter.find('.l-grid-footer-btns') ){
						var gridFooterBtn = gridFooter.find('.l-grid-footer-btns'),
							btnData       = options.bottomBtns;
	
						$.each(btnData, function(i, item){
							gridFooterBtn.append('<a href="#btn" id="'+ item.id +'" class="l-btn ui-btn"><span class="ui-btnItem">'+ item.text +'</span></a>')
							item.onclick && gridFooterBtn.find('.l-btn').eq(i).click(function(){
								item.onclick(i, item);
							});
						});
					}
					
					/*分页*/
					if( gridFooter.find('.l-grid-footer-pager') ){
										
						/*翻页缓存*/
						if(	options.isPageCache ){
							g.o.cache = [];  //给g.o添加一个cache成员
							g.o.cache[options.pageIndex] = true;
						};
						
						_core.pagerFn(g.o);
					}
				
				/*选择框*/
				_core.checkboxFn(g.o);
				
				/*明细*/
				_core.detailBtnFn(g.o);
	
			return g;
		};
		
		/**
		* 表格全局数据源
		* @member saogaUI.ui.BaseGrid
		*/
		this.o = {};
		
		/**
		* 表格刷新数据源
		* @member saogaUI.ui.BaseGrid
		* @param {Object} 数据源
		* @param {Number} 页面值索引
		* @param {Boolean} 是否缓存
		* @return {Object} saogaUI.ui.BaseGrid
		*/
		this.reflash = function(data, index, cache){
			var options   = g.o,                       //全局数据源
				columns   = options.columns || {},
				wrap      = $(options.wrap),
				id        = options.id,
				pageSize  = options.pageSize,          //每页长度
				count     = options.data.total || 0,   //记录总个数
				grid      = $('#'+id),
				gridBody  = grid.find('.l-grid-body');
			
			if( cache ){
				/*缓存已翻页数据，与_core.pageFn配合*/
				var arr  = [],
					star = (index - 1) * pageSize, //当前页的起始位置
					i    = 0,
					n    = 0;
	
				for(; i < count; i++){
					if( options.data.rows[i] ){
						arr[i] = options.data.rows[i];
					}else{
						arr[i] = null;
					}
				}
				if( !options.cache[index] && data ){
					for(; n < pageSize; n++){
						arr[star] = data.rows[n];
						star++;
					}
				}
				
				/*修改全局数据源中的成员*/
				options.pageIndex = index;
				options.data.rows = arr;
				options.cache[index] = true;
			}else{
				var tBodyHtml = '';
				
				/*index不存在默认pageIndex*/
				if(index){
					options.pageIndex = index;
				}
				options.data = data; //覆盖全局数据源中的data成员
				tBodyHtml = _core.tBodyFn(options);
				gridBody.html(tBodyHtml);
			}
			
			/*分页*/
			if( grid.find('.l-grid-footer-pager') ){
				_core.pagerFn(options);
			}
			
			return g;
		};
			
		/**
		* 获取选中的数据，并组装成表格可用的数据格式
		* @member saogaUI.ui.BaseGrid
		* @return {Object} 返回一个表格数据源
		*/
		this.getSelectData = function(){
			var arr   = [],
				i     = 0,                
				len   = _records.rowselected.length, //记录的长度
				data  = {},             //data对象
				total = 0;              //data个数
				
			/*过滤掉records下面的空元素*/
			for(; i < len; i++){
				if( _records.rowselected[i] ){
					arr.push( _records.rowselected[i] );
				}
			}
			
			/*组装一个表格适用的data数据*/
			total = arr.length;
			data = {
				"rows": arr,
				"total":total
			}
			
			return data;
		};
		
	};

	/**
	 * grid实例化
	 * @dest 封装在saogaUI.ui.grid里，可创建多个saogaUI.ui.grid，又避免多个表格this互相影响
	 */
	return grid = function(options){
		var grid = new BaseGrid();
		grid.init(options);
		return grid;
	};
	
});