(function( window, undefined ) {
	DoDesign = 
	{
	//property -------------start----------------------------------------	
			
		root:'/ecrp',
		pop_group:null,//弹出窗口对象
		pop_import:null,
		pop_filter:null,
		pop_grade:null,
		pop_property:null,
		pop_analysis:null,
		pop_sms:null,
		pop_union:null,
		pop_join:null,
		pop_pick:null,
		pop_sub:null,
		pop_email:null,
		pop_integral:null,
		pop_other:null,
		pop_integralActivities:null,
		pop_coupon:null,
		
		btn_group:true,//判断是否创建保存按钮
		btn_import:true,
		btn_filter:true,
		btn_grade:true,
		btn_property:true,
		btn_analysis:true,
		btn_sms:true,
		btn_union:true,
		btn_join:true,
		btn_pick:true,
		btn_sub:true,
		btn_email:true,
		btn_integral:true,
		btn_other:true,
		btn_integralActivities:true,
		btn_coupon:true,
		
	//property -------------end----------------------------------------
	  
	//fn -------------start----------------------------------------
			
	/**
	 * 
	 * 取客户分组树的数据(包括类)
	 * 
	 */
	getTreeData: function()
	{
		var res_data;
		var url = root+'/apps/layered/getCustomerGroupCategory.do';
		$.ajax({
				type: "post",
				url: url,
				async:false,
				dataType:"text",
				success: function(msg)
				{
					res_data=msg;
				},
				error: function(msg)
				{	 
				}
		});
		return JSON.parse(res_data);
	},
	/**
	 * 
	 * 取客户分组树的数据(只取分组)
	 * 
	 */
	getTreeData2: function()
	{
		var res_data;
		var url = root+'/apps/layered/getTreeData.do';
		$.ajax({
				type: "post",
				url: url,
				async:false,
				dataType:"text",
				success: function(msg)
				{
					res_data=msg;
				},
				error: function(msg)
				{	 
				}
		});
		return JSON.parse(res_data);
	},
	
	/**
	 * 
	 * 分组节点
	 * 
	 */
	groupSet:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		var tree_data = DoDesign.getTreeData();
		 DoDesign.pop_group = saogaUI.ui.pop({//
      			id:'fas',
      			title:'分组客户',
      			isMaskClose:false,
      		    width:'670px',
      		    height:'505px',
      		    async:false,
      			ajax:root+'/apps/marketing/toGroup.do',
      			onloadFn:function()
      			{
      				$("#hidId").val(cellId);
      				$("#hidStyle").val(cellStyle);
      				$("#hidJsonData").val(jsonData);
      				$("#hidActivityType").val(hidActivityType);
      				var _obj=null ;
      				var temp_subdivsonId='0';
      				if(hidActivityType=="0")
      				{
      					$("#delayShow").hide();
      					$("#tipMes").hide();
      					$("#sendTimeShow").show();
      				}
      				else
      				{
      					$("#tipMes").show();
      					$("#delayShow").show();
      					$("#sendTimeShow").hide();
      				}
      				var guid = "";
      				if(jsonData)
      				{
      					_obj= JSON.parse(jsonData);
      					 guid = _obj.guid;
      					//给分组表单附值 
      					$("#hidGuid").val(_obj.guid);
	      				$("#txtSubTaskName").val(_obj.nodeName);
	      				$("#sendTime").val(_obj.sendTime);
	      				$("#txtSubDelayHour").val(_obj.sendDelayHour);
	      				$("#txtSubRemark").val(_obj.remark);
      					temp_subdivsonId=_obj.subdivsonId;
      				}else{
      					$("#txtSubTaskName").val("分组客户");
      				}
      				
      				var isDisable = false;
      				 if (guid != "" && !IsCanEditNode(guid)) 
		   			 {
		   			 	isDisable = true;
		   			 	$("#spansubCount").hide();
		   			 }
		   			 $("#selSub").hide();
      				saogaUI.ui.select({//客户树 start
      					target: '#txtSubdivson',
      					selectedID:temp_subdivsonId,//
      					isTree:true,
      					disable:isDisable,
      					data:tree_data,
      					downHeight:200,
      					downWidth:200,
      					cls:'ui-select-130',
      					onclickItem: function(name, id,pid)
      					{
      					   
      					   $("#txtSubTaskName").val($(".ui-select-init:eq(0)").html());
      			            clearsub();//清除分组统计人数
      					},
      					onloadFn: function(obj)
      					{

      					}
      				});//客户树 end
      				
      				//表单校验
      				$("#groupForm").validate({
      				    rules:
      				    {
      							'txtSubTaskName' : {required:true},
      							'sendTime':{required:true},
      							'txtSubDelayHour':{required:true}
      					},	
      					messages:
      					{
      							'txtSubTaskName' : {required:"节点名称不为空"},
      							'sendTime':{required:"分组确认时间不能为空"},	
      							'txtSubDelayHour':{required:"延时不能为空"}							
      				    },
      				    errorPlacement: function(error, element)
      				    {
      				    	error.appendTo(element.parent());
      				    }
      				});
      			},
      			closeFn:function()
      			{
      			},
				btns:[
						{
							text:'保存',
							closePop:false,
							onclick:function(id)
							{
								var isSel = true;
								if($("#txtSubdivson").val()=="0"){
      									isSel =  false;
      									$("#selSub").show();
      								}else{
      									$("#selSub").hide();
      									isSel =  true;
      								}
								if($("#groupForm").valid()&&isSel){
									SelSubdivison();
									DoDesign.pop_group.close();
								}
							}
						},
						{
							text: '关闭'
						}
					]
      		});
      	  DoDesign.selTab();
      	  DoDesign.btn_group = DoDesign.disableForm(jsonData,DoDesign.pop_group);
      	  if(!DoDesign.btn_group){
      	    $("#spansubCount").hide();
      	  }
	},
		
		
	  /**
	   * 
	   * 导入节点
	   * 
	   */
	  importSet:function(object)
	  {
		  DoDesign.pop_import = saogaUI.ui.pop({
     			id:'import',
     			title:'导入',
     			isMaskClose:false,
     		    width:object.width,
     		    height:object.height,
     		    async:false,
     			ajax:root+'/apps/marketing/toImport.do',
     			onloadFn:function()
     			{
     				//tempObj = data;	
     			},
     			closeFn:function()
     			{
     			},
				btns:[
						{
							text:'保存',
							onclick:function()
							{
								DoDesign.pop_import.colse();
							}
						},
						{
							text: '关闭'
						}
					]
     			
     		});
     		
     		 DoDesign.selTab();
	},
	 
	/**
	 * 
	 * 其他节点
	 * 
	 */
	other:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		var tree_data = DoDesign.getTreeData();
		var height = 465;
		if(0==hidActivityType){
			height = 400;
		}
		 DoDesign.pop_other = saogaUI.ui.pop({//
      			id:'other',
      			title:'其他',
      			isMaskClose:false,
      		    width:object.width,
      		    height:height,
      		    async:false,
      			ajax:root+'/apps/marketing/otherEdit.do',
      			onloadFn:function()
      			{
      				$("#hidId").val(cellId);
      				$("#hidStyle").val(cellStyle);
      				$("#hidJsonData").val(jsonData);
      				$("#hidActivityType").val(hidActivityType);
      				var _obj=null ;
      				var temp_subdivsonId='0';
      				if(hidActivityType=="0")
      				{
      					$("#delayShow").hide();
      					$("#tipMes").hide();
      					
      				}
      				else
      				{
      					$("#tipMes").show();
      					$("#delayShow").show();
      				}
      				if(jsonData)
      				{
      					_obj= JSON.parse(jsonData);
      			
      					//给分组表单附值 
      					$("#hidGuid").val(_obj.guid);
	      				$("#txtSubTaskName").val(_obj.nodeName);
	      				$("#sendTime").val(_obj.sendTime);
	      				$("#txtSubDelayHour").val(_obj.sendDelayHour);
	      				$("#txtSubRemark").val(_obj.remark);
      					temp_subdivsonId=_obj.subdivsonId;
      				}else{
      					$("#txtSubTaskName").val("其他节点");
      				}
       
      				//表单校验
      				$("#groupForm").validate({
      				    ignore:"",
      				    rules:
      				    {
      							'txtSubTaskName' : {required:true},
      							'sendTime':{required:true},
      							'txtSubdivson':{required:function(){
      							//alert(123)
      								if($("#txtSubdivson").val()=="0"){
      									return false;
      								}else{
      									return true;
      								}
      							}}
      					},	
      					messages:
      					{
      							'txtSubTaskName' : {required:"节点名称不为空"},
      							'sendTime':{required:"分组确认时间不能为空"},						
      							'txtSubdivson':{required:"分组不能为空"}
      				    },
      				    errorPlacement: function(error, element)
      				    {
      				    	error.appendTo(element.parent());
      				    }
      				});
      			},
      			closeFn:function()
      			{
      			},
				btns:[
						{
							text:'保存',
							closePop:false,
							onclick:function(id)
							{
								if($("#groupForm").valid()){
									SelSubdivison();
									DoDesign.pop_other.close();
								}
							}
						},
						{
							text: '关闭'
						}
					]
      		});
      		 DoDesign.selTab();
      		 DoDesign.btn_other = DoDesign.disableForm(jsonData,DoDesign.pop_other);
	},
	/**
	 * 
	 * 筛选 
	 * 
	 */
	filter:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_filter =saogaUI.ui.pop({
 			id:'filter',
 			title:'筛选器',
 			isMaskClose:false,
 		    width:object.width,
 		    height:object.height,
 		    async:false,
 			ajax:root+'/apps/marketing/toFilter.do',
 			onloadFn:function(){
 				
 				$("#hidId").val(cellId);
  				$("#hidStyle").val(cellStyle);
  				$("#hidJsonData").val(jsonData);
  				$("#hidActivityType").val(hidActivityType);
  				
  				if(hidActivityType=="0")
  				{
  					$("#delayShow").hide();
  					$("#sendTimeShow").show();		
  				}
  				else
  				{
  					$("#sendTimeShow").hide();
  					$("#delayShow").show();
  				}
  				  //找到当前节点的来源节点
       		  var sources = GetSourceCellsFromParent(cellId);
       		  if (sources.length > 0) 
       		  {
	                var sourceStyle = sources[0].getStyle();
	  				switch (sourceStyle) {
	                    case "user": $("#spanSourceTask").html("分组任务："); break;
	                    case "file": $("#spanSourceTask").html("导入任务："); break;
	                    case "sms": $("#spanSourceTask").html("短信任务："); break;
	                    case "email": $("#spanSourceTask").html("邮件任务："); break;
	                    case "coupon": $("#spanSourceTask").html("优惠券任务："); break;
	                    case "promotion": $("#spanSourceTask").html("满减|打折任务："); break;
	                    case "lottery": $("#spanSourceTask").html("彩票任务："); break;
	                    case "other": $("#spanSourceTask").html("其他任务："); break;
	                    case "grade": $("#spanSourceTask").html("等级修改任务："); break;
	                    case "property": $("#spanSourceTask").html("属性修改任务："); break;
	                    case "union": $("#spanSourceTask").html("合并任务："); break;
	                    case "join": $("#spanSourceTask").html("交集任务："); break;
	                    case "pick": $("#spanSourceTask").html("抽取任务："); break;
	                    case "sub": $("#spanSourceTask").html("排除任务："); break;
	                    case "filter": $("#spanSourceTask").html("筛选器任务："); break;
	                    case "eleCoupon": $("#spanSourceTask").html("电子优惠劵："); break;
	                    case "integral": $("#spanSourceTask").html("积分任务："); break;
	                    case "integralActivities": $("#spanSourceTask").html("积分活动任务："); break;
	                    default: $("#spanSourceTask").html("上个任务："); break;
	                }
	                if (sourceStyle == 'email') {
	                    $("#trSourceTask").show();
	                    $("#selEmailOptions").show();
	                }
	                else if (sourceStyle == 'coupon') {
	                    $("#trSourceTask").show();
	                    $("#selCouponOptions").show();
	                }
	                else if (sourceStyle == 'promotion') {
	                    $("#trSourceTask").show();
	                    $("#selUmpOptions").show();
	                }
	                else if (sourceStyle == 'grade' || sourceStyle == 'property') {
	                    $("#trSourceTask").show();
	                    $("#selCustomerSignOptions").show();
	                }
	                else if (sourceStyle == 'lottery') {
	                    $("#trSourceTask").show();
	                    $("#selLotteryOptions").show();
	                }
	                else if (sourceStyle == 'ebook') {
	                    $("#trSourceTask").show();
	                    $("#selEbookOptions").show();
	                }
	                else if (sourceStyle == 'eleCoupon') {
	                    $("#trSourceTask").show();
	                    $("#selEleCouponOptions").show();
	                }
	                else if (sourceStyle == 'integral') {
	                    $("#trSourceTask").show();
	                    $("#selIntegralOptions").show();
	                }else if (sourceStyle == 'integralActivities') {
	                    $("#trSourceTask").show();
	                    $("#selIntegralActivitiesOptions").show();
	                }
	                else {
	                    $("#trSourceTask").show();
	                    $("#selSmsOptions").show();
	                }
                }
  				
  				var _obj=null ;
  				if(jsonData)
  				{
  				console.log(jsonData);
  					_obj= JSON.parse(jsonData);
  					$("#hidGuid").val(_obj.guid);
  					//给分组表单附值 
      				$("#txtNodeName").val(_obj.nodeName);
      				$("#sendTime").val(_obj.sendTime);
      				$("#txtNodeDelayHour").val(_obj.delayMinute);
      				//bindNode($("#hidJsonData").val());
      				createControllerByXml2(_obj.nodeUserFilterXml);
      				//$("#Template").val(_obj.content);
      				
		      		 $("#selSmsOptions").val(_obj.smsOption);
		            $("#selEmailOptions").val(_obj.emailOption);
		            $("#selUmpOptions").val(_obj.umpOption);
		            $("#selCouponOptions").val(_obj.couponOption);
		            $("#selCustomerSignOptions").val(_obj.customerSignOption);
		            $("#selLotteryOptions").val(_obj.lotteryOption);
		            $("#selEbookOptions").val(_obj.ebookOption);
		            $("#selEleCouponOptions").val(_obj.eleCouponOption);
		            $("#selIntegralOptions").val(_obj.integralOption);
		            $("#selIntegralActivitiesOptions").val(_obj.integralActivitiesOption);
  				}

  				//表单校验
  				$("#filterForm").validate({
  				    rules:
  				    {
						'txtNodeName' : {required:true},
						'txtSubDelayHour':{required:true},
						'sendTime':{required:true}
  					},	
  					messages:
  					{
						'txtNodeName' : {required:"任务名称不为空"},
						'txtSubDelayHour':{required:"延时不能为空"},
						'sendTime':{required:"节点执行时间不能为空"}						
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
 			},
 			closeFn:function(){
 			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function()
						{
						if (!CallValidate("userDetailcontent") || !CallValidate("RFMcontent")) 
						{
					    	 saogaUI.ui.dialog.alert({title:"提示信息",text:"您输入的筛选条件不合法，请确认！"});
					    }
						if($("#filterForm").valid()&&CallValidate("userDetailcontent")&& CallValidate("RFMcontent") )
						{
							  SelNode();//
							  DoDesign.pop_filter.close();
						}
						}
					},
					{
						text: '关闭'
					}
				]
 			
 		});
 		DoDesign.selTab();
      	DoDesign.btn_filter = DoDesign.disableForm(jsonData,DoDesign.pop_filter);
	},
	
	/**
	 * 
	 * 等级修改节点
	 * 
	 */
	grade:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_grade = saogaUI.ui.pop({
      			id:'grade',
      			title:'等级修改',
      			isMaskClose:false,
      		    width:'670',
      		    height:'530',
      		    async:false,
      			ajax:root+'/apps/marketing/toGradeEdit.do',
      			onloadFn:function()
      			{
      				$("#hidId").val(cellId);
      				$("#hidStyle").val(cellStyle);
      				$("#hidJsonData").val(jsonData);
      				$("#hidActivityType").val(hidActivityType);
      				var _obj=null ;
      				if(jsonData){
      					_obj= JSON.parse(jsonData);
      					$("#hidGuid").val(_obj.guid);
      					//给分组表单附值 
	      				$("#customerGradeTitle").val(_obj.nodeName);
	      				$("#selCustomerGrade").val(_obj.customerGrade);
	      				if(_obj.customerGradeOption==0)
	      				{
	      					$("#checkCustomerGradeOption0").attr("checked",true); 
	      				}
	      				else
	      				{
	      					$("#checkCustomerGradeOption1").attr("checked",true); 
	      				}
	      					$("#txtCustomerGradeRemark").val(_obj.customerGradeRemark);
      				}
      			},
      			closeFn:function()
      			{
      			},
				btns:[
						{
							text:'保存',
							closePop:false,
							onclick:function(id)
							{
								if(SelCustomerGrade())
								{
									DoDesign.pop_grade.close();
								}
							}
						},
						{
							text: '关闭'
						}
					]
      			
      		});
      		 DoDesign.selTab();
      	 	 DoDesign.btn_grade = DoDesign.disableForm(jsonData,DoDesign.pop_grade);
	},
	
	/**
	 * 
	 * 属性修改节点
	 * 
	 */
	property:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_property= saogaUI.ui.pop({
			id:'property',
			title:'属性修改',
			isMaskClose:false,
			width:'670',
    		height:'530',
			async:false,
			ajax:root+'/apps/marketing/toPropertyEdit.do',
			onloadFn:function()
			{
				$("#hidId").val(cellId);
				$("#hidStyle").val(cellStyle);
				$("#hidJsonData").val(jsonData);
				$("#hidActivityType").val(hidActivityType);
				
				var _obj=null ;
				if(jsonData)
				{
					_obj= JSON.parse(jsonData);
					$("#hidGuid").val(_obj.guid);
					$("#txtCustomerPropertyTitle").val(_obj.nodeName);
					bindCustomerProperty(jsonData);
				}
			},
			closeFn:function()
			{
			},
			btns:[
				      {
				    	  text:'保存',
				    	  closePop:false,
				    	  onclick:function(id)
				    	  {
				    		  if(SelCustomerProperty())
				    		  {
				    			  DoDesign.pop_property.close();
				    		  }
				    	  }
				      },
				      {
				    	  text: '关闭'
				      }
			      ]
		});
		 DoDesign.selTab();
      	 DoDesign.btn_property = DoDesign.disableForm(jsonData,DoDesign.pop_property);
	},
	
	/**
	 * 
	 * 分析节点
	 * 
	 */
	analysis:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_analysis= saogaUI.ui.pop({//
			id:'analysis',
			title:'分析',
			isMaskClose:false,
			width:object.width,
			height:object.height,
			async:false,
			ajax:root+'/apps/marketing/toAnalysisEdit.do',
			onloadFn:function(){
				$("#hidId").val(cellId);
				$("#hidStyle").val(cellStyle);
				$("#hidJsonData").val(jsonData);
				$("#hidActivityType").val(hidActivityType);
				
				var _obj=null ;
				if(jsonData){
					_obj= JSON.parse(jsonData);
					$("#hidGuid").val(_obj.guid);
					$("#txtAnalysisNodeName").val(_obj.nodeName);
					bindAnalysisNode(jsonData);
				}
				if(0==hidActivityType)
				{
					$("#showTime0").show();
					$("#showTime2").hide();
				}
				else
				{
					$("#showTime0").hide();
					$("#showTime2").show();
				}
			},
			closeFn:function(){
			},
			btns:[
			      {
			    	  text:'保存',
			    	  closePop:false,
			    	  onclick:function(id){
			    		  if(SelAnalysisNode()){
			    			  DoDesign.pop_analysis.close();
			    		  }
			    	  }
			      },
			      {
			    	  text: '关闭'
			      }
			      ]
			
		});
		 DoDesign.selTab();
      	// DoDesign.btn_analysis = DoDesign.disableForm(jsonData,DoDesign.pop_analysis);
	},
	
	/**
	 * 
	 * 对比分析
	 * 
	 */
	compareAnalysis:function()
	{
		 var pop_compareAnalysis= saogaUI.ui.pop({
			id:'compareAnalysis',
			title:'对比分析',
			isMaskClose:false,
			width:'900px',
			height:'600px',
			async:false,
			ajax:root+'/apps/marketing/toCompareAnalysis.do',
		}); 
	},	
	/**
	 * 
	 * 发送短信
	 * 
	 */
	sendSMS:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		var height="630";
		if(0==hidActivityType){
			height = 580;
		}
		DoDesign.pop_sms = saogaUI.ui.pop({
 			id:'_sms',
 			title:'短信',
 			isMaskClose:false,
 		    width:object.width,
 		    height:550,
 		    async:false,
 			ajax:root+'/apps/marketing/toSMS.do',
 			onloadFn:function()
 			{
 				$("#hidId").val(cellId);
  				$("#hidStyle").val(cellStyle);
  				$("#hidJsonData").val(jsonData);
  				$("#hidActivityType").val(hidActivityType);
  				
  				if(hidActivityType=="0")
  				{
  					$("#delayShow").hide();
  					$("#sendTimeShow").show();
  				}
  				else
  				{
  					$("#delayShow").show();
  					$("#sendTimeShow").hide();
  				}
  				$("#tdSMSSignature").val("【"+ $("#tdSMSSignature2").val()+"】");
  			//选择店铺短信签名
  			    $("#tdSMSSignature2").change(function () {
  			    	  $("#tdSMSSignature").val("【"+$(this).val()+"】");
  			            //计算短信数字
  			    	$("#TemplateSMS").keyup();
  			    });

  				var _obj=null ;
  				if(jsonData)
  				{
  					_obj= JSON.parse(jsonData);
  					$("#hidGuid").val(_obj.guid);
  					//给分组表单附值 
      				$("#MarketingTaskTitle").val(_obj.nodeName);
      				$("#sendTime").val(_obj.sendTime);
      				$("#txtMarketingDelayHour").val(_obj.delayMinute);
      				$("#TemplateSMS").val(_obj.content);
      				$("#tdSMSSignature2").attr("value",_obj.smsSignature2);
      				$("#tdSMSSignature").val("【"+_obj.smsSignature2+"】");
      				if(!_obj.isFilterFails)
      				{
      					$("#ckbIsFilterFails").attr("checked","");
      				}else{
      					$("#ckbIsFilterFails").attr("checked","checked");
      				}
  				}
  				$("#TemplateSMS").keyup();//统计次数

  				//表单校验
  				$("#smsForm").validate({
  				    rules:
  				    {
  							'MarketingTaskTitle' : {required:true},
  							'sendTime':{required:true},
  							'txtSubDelayHour':{required:true},
  							'TemplateSMS':{required:true}
  							
  					},	
  					messages:
  					{
  							'MarketingTaskTitle' : {required:"任务名称不为空"},
  							'sendTime':{required:"任务执行时间不能为空"},
  							'txtSubDelayHour':{required:"延时不能为空"},
  							'TemplateSMS':{required:"内容不能为空"}						
  							
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
  				

 			},
 			closeFn:function()
 			{
 			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(id)
						{
							if($("#smsForm").valid())
							{
								SelMarketing();
								DoDesign.pop_sms.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
 			
 		});
 		  DoDesign.selTab();
      	  DoDesign.btn_sms = DoDesign.disableForm(jsonData,DoDesign.pop_sms);
      	  if(!DoDesign.btn_sms)
      	  {
      	  	$("#saveTemplateTag").hide();
      	  }
      	  
	},
	
	  /**
	   * 
	   * 合并
	   * 
	   */
	union:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_union =saogaUI.ui.pop({
 			id:'union',
 			title:'合并',
 			isMaskClose:false,
 		    width:object.width,
 		    height:300,
 		    async:false,
 			ajax:root+'/apps/marketing/toUnion.do',
 			onloadFn:function(){
 				$("#hidId").val(cellId);
  				$("#hidStyle").val(cellStyle);
  				$("#hidJsonData").val(jsonData);
  				$("#hidActivityType").val(hidActivityType);
  				
  				var _obj=null ;
  				if(jsonData)
  				{
  					_obj= JSON.parse(jsonData);
  					$("#hidGuid").val(_obj.guid);
  					//给分组表单附值 
      				$("#txtNodeName").val(_obj.nodeName);
      				$("#txtNodeRemark").val(_obj.nodeRemark);
   
  				}
  				else
				{
  					$("#txtNodeName").val("合并");
				}
				//表单校验
  				$("#unionForm").validate({
  				    rules:
  				    {
  							'txtNodeName' : {required:true}
  							
  					},	
  					messages:
  					{
  							'txtNodeName' : {required:"任务名称不为空"}						
  							
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
 			},
 			closeFn:function(){
 			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function()
						{
							if($("#unionForm").valid())
							{
							  SelNode();
							  DoDesign.pop_union.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
 			
 		});
 		 DoDesign.selTab();
 		 DoDesign.btn_union = DoDesign.disableForm(jsonData,DoDesign.pop_union);
	},
	
	/**
	   * 
	   * 交集
	   * 
	   */
	join:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_join =saogaUI.ui.pop({
			id:'join',
			title:'交集',
			isMaskClose:false,
		    width:object.width,
		    height:300,
		    async:false,
			ajax:root+'/apps/marketing/toJoin.do',
			onloadFn:function()
			{
				$("#hidId").val(cellId);
				$("#hidStyle").val(cellStyle);
				$("#hidJsonData").val(jsonData);
				$("#hidActivityType").val(hidActivityType);
				
				var _obj=null ;
				if(jsonData)
				{
					_obj= JSON.parse(jsonData);
					$("#hidGuid").val(_obj.guid);
					//给分组表单附值 
    				$("#txtNodeName").val(_obj.nodeName);
    				$("#txtNodeRemark").val(_obj.nodeRemark);
				}
				else
				{
					$("#txtNodeName").val("交集");
				}
				//表单校验
  				$("#joinForm").validate({
  				    rules:
  				    {
  						'txtNodeName' : {required:true}
  					},	
  					messages:
  					{
  						'txtNodeName' : {required:"任务名称不为空"}						
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
			},
			closeFn:function(){
			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(){
							if($("#joinForm").valid())
							{
							  SelNode();//
							  DoDesign.pop_join.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
			
		});
		 DoDesign.selTab();
		 DoDesign.btn_join = DoDesign.disableForm(jsonData,DoDesign.pop_join);
	},
	
	/**
	   * 
	   * 抽取
	   * 
	   */
	pick:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_pick =saogaUI.ui.pop({
			id:'pick',
			title:'抽取',
			isMaskClose:false,
		    width:object.width,
		    height:320,
		    async:false,
			ajax:root+'/apps/marketing/toPick.do',
			onloadFn:function(){
				$("#hidId").val(cellId);
				$("#hidStyle").val(cellStyle);
				$("#hidJsonData").val(jsonData);
				$("#hidActivityType").val(hidActivityType);
				
				var _obj=null ;
				if(jsonData)
				{
					_obj= JSON.parse(jsonData);
					$("#hidGuid").val(_obj.guid);
					//给分组表单附值 
	  				$("#txtNodeName").val(_obj.nodeName);
	  				$("#txtNodeRemark").val(_obj.nodeRemark);
	  				$("#txtNodePercent").val(_obj.nodePercent);
				}
				else
				{
					$("#txtNodeName").val("抽取");
				}
				//表单校验
  				$("#pickForm").validate({
  				    rules:
  				    {
  							'txtNodeName' : {required:true},
  							'txtNodePercent' : {required:true,}
  							
  					},	
  					messages:
  					{
  							'txtNodeName' : {required:"任务名称不为空"}	,
  							'txtNodePercent' : {required:"抽取比例不为空"}	,
  							
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
			},
			closeFn:function(){
			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(){
							if($("#pickForm").valid())
							{
							  SelNode();//
							  DoDesign.pop_pick.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
			
		});
		 DoDesign.selTab();
		 DoDesign.btn_pick = DoDesign.disableForm(jsonData,DoDesign.pop_pick);
	},
	
	/**
	   * 
	   * 排除
	   * 
	   */
	sub:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_sub =saogaUI.ui.pop({
			id:'sub',
			title:'排除',
			isMaskClose:false,
		    width:object.width,
		    height:400,
		    async:false,
			ajax:root+'/apps/marketing/toSub.do',
			onloadFn:function(){
				$("#hidId").val(cellId);
				$("#hidStyle").val(cellStyle);
				$("#hidJsonData").val(jsonData);
				$("#hidActivityType").val(hidActivityType);
				//找到当前节点的来源节点
		        var sources = GetSourceCellsFromParent(cellId);
				 $("#trSub").show();
		            for (var i = 0; i < sources.length; i++) 
		            {
		                var nodeName = sources[i].getValue();
		                if (nodeName.indexOf('<br/>') > 0)
		                {
		                    nodeName = nodeName.substring(nodeName.indexOf('<br/>') + 5, nodeName.length);
		                }
		                $("#selBaseNodeFilter").append("<option value='" + sources[i].getId() + "'>" + nodeName + "</option>");
		                $("#selTargerNodeFilter").append("<option value='" + sources[i].getId() + "'>" + nodeName + "</option>");
		            }
		            
				var _obj=null ;
				if(jsonData)
				{
					_obj= JSON.parse(jsonData);
					$("#hidGuid").val(_obj.guid);
					//给分组表单附值 
					$("#txtNodeName").val(_obj.nodeName);
					$("#txtNodeRemark").val(_obj.nodeRemark);
				    $("#selBaseNodeFilter").val(_obj.baseNodeId);
			        $("#selTargerNodeFilter").val(_obj.targerNodeId);
				}
				else
				{
					$("#txtNodeName").val("排除");
				}

				//表单校验
  				$("#subForm").validate({
  				    rules:
  				    {
  							'txtNodeName' : {required:true},
  							'selBaseNodeFilter' : {required:true,},
  							'selTargerNodeFilter' : {required:true,}
  							
  							
  					},	
  					messages:
  					{
  							'txtNodeName' : {required:"任务名称不为空"}	,
  							'selBaseNodeFilter' : {required:"排除不为空"},
  							'selTargerNodeFilter' : {required:"排除不为空"}
  							
  							
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
			},
			closeFn:function(){
			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(){
							if($("#subForm").valid())
							{
							  SelNode();//
							  DoDesign.pop_sub.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
			
		});
		 DoDesign.selTab();
		 DoDesign.btn_sub = DoDesign.disableForm(jsonData,DoDesign.pop_sub);
	},
	
	/**
	 * 
	 * 发送邮件
	 * 
	 */
	sendEmail:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_email = saogaUI.ui.pop({
 			id:'email',
 			title:'邮件',
 			isMaskClose:false,
 		    width:object.width,
 		    height:object.height,
 		    async:false,
 			ajax:root+'/apps/marketing/toEmail.do',
 			onloadFn:function(){
 				
 				$("#hidId").val(cellId);
  				$("#hidStyle").val(cellStyle);
  				$("#hidJsonData").val(jsonData);
  				$("#hidActivityType").val(hidActivityType);
  				if(hidActivityType=="0")
  				{
  					$("#delayShow").hide();
  					$("#sendTimeShow").show();
  				}
  				else
  				{
  					$("#delayShow").show();
  					$("#sendTimeShow").hide();
  				}
  				if(hidActivityType=="0"){
  					$("#sendTimeShow").show();
  				}
  				else
  				{
  					$("#sendTimeShow").hide();
  				}
  				var _obj=null ;
  				if(jsonData)
  				{
	  				_obj= JSON.parse(jsonData);
	  				$("#hidGuid").val(_obj.guid);
	  				$("#MarketingTaskTitle").val(_obj.nodeName);
	  				$("#sendTime").val(_obj.sendTime);
	  				$("#txtMarketingDelayHour").val(_obj.delayMinute);
	  				$("#MarketingTitle").val(_obj.emailTitle);
	  				
	  			//	editorHead.html(_obj.content);//change
	  				//console.log(_obj.content);
	  				//editorHead.setContent(_obj.content);
	  				
	  				editorHead.addListener("ready", function () {   
	  					// editor准备好之后才可以使用 ,by hyf      
	  					editorHead.setContent(_obj.content);
	  				});
	  				
	  				if(!_obj.isFilterFails)
	  				{
	  					$("#ckbIsFilterFails").attr("checked",false);
	  				}
  				}
  				//表单校验
  				$("#emailForm").validate({
  				    rules:
  				    {
  							'MarketingTaskTitle' : {required:true},
  							'sendTime':{required:true},
  							'MarketingTitle':{required:true},
  							'txtSubDelayHour':{required:true},
  							'Template':{required:true}
  							
  					},	
  					messages:
  					{
  							'MarketingTaskTitle' : {required:"任务名称不为空"},
  							'sendTime':{required:"任务执行时间不能为空"},
  							'MarketingTitle':{required:"邮件主题目不能为空"},
  							'txtSubDelayHour':{required:"延时不能为空"},
  							'Template':{required:"内容不能为空"}						
  							
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
 			},
 			closeFn:function(){
 			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(id)
						{
							if($("#emailForm").valid())
							{
								SelMarketing();
								DoDesign.pop_email.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]

 		});
 		 DoDesign.selTab();
 		 DoDesign.btn_email = DoDesign.disableForm(jsonData,DoDesign.pop_email);
 		 if(!DoDesign.btn_email)
      	  {
      	  	$("#saveTemplateTag").hide();
      	  }
	},
	
	/**
	 * 
	 * 积分
	 * 
	 */
	giveIntegral:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_integral = saogaUI.ui.pop({
 			id:'pop_integral',
 			title:'积分',
 			isMaskClose:false,
 		    width:object.width,
 		    height:object.height,
 		    async:false,
 			ajax:root+'/apps/marketing/toIntergral.do',
 			onloadFn:function(){
 				$("#hidId").val(cellId);
  				$("#hidStyle").val(cellStyle);
  				$("#hidJsonData").val(jsonData);
  				$("#hidActivityType").val(hidActivityType);
  				
  				if(hidActivityType=="0")
  				{
  					$("#delayShow").hide();
  					$("#sendTimeShow").show();
  				}
  				else
  				{
  					$("#delayShow").show();
  					$("#sendTimeShow").hide();
  				}
  				if(hidActivityType=="0")
  				{
  					$("#sendTimeShow").show();
  				}
  				else
  				{
  					$("#sendTimeShow").hide();
  				}
  				var _obj=null ;
  				if(jsonData)
  				{
	  				_obj= JSON.parse(jsonData);
	  				$("#hidGuid").val(_obj.guid);
	  				$("#MarketingTaskTitle").val(_obj.nodeName);
	  				$("#sendTime").val(_obj.sendTime);
	  				$("#txtMarketingDelayHour").val(_obj.delayMinute);
	  				$("#txtIntergralNum").val(_obj.integralNum);
	  				$("#txtTaskRemark").val(_obj.remark);
	  				if(_obj.integralAction=='0')
	  				{
	  					$("#IntegralAction1").attr("checked",true);
	  				}
	  				if(_obj.integralAction=='1')
	  				{
	  					$("#IntegralAction2").attr("checked",true);
	  				}
	  				if(_obj.integralAction=='-1')
	  				{
	  					$("#IntegralAction3").attr("checked",true);
	  					SelIntegralAction(-1);
	  				}
  				}
  				//表单校验
  				$("#giveIntegralForm").validate({
  				    rules:
  				    {
  							'MarketingTaskTitle' : {required:true},
  							'sendTime':{required:true},
  							'txtMarketingDelayHour':{required:true},
  							'txtIntergralNum':{required:true,min:1,digits:true}
  							
  					},	
  					messages:
  					{
  							'MarketingTaskTitle' : {required:"任务名称不为空"},
  							'sendTime':{required:"执行时间不能为空"},
  							'txtMarketingDelayHour':{required:"延时不能为空"},
  							'txtIntergralNum':{required:"积分不能为空", min:"积分必须大于0!",digits:"积分必须是整数!"}						
  							
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
 			},
 			closeFn:function()
 			{
 			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(id)
						{
							if($("#giveIntegralForm").valid())
							{
								SelMarketing();
								DoDesign.pop_integral.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
 			
 		});
 		 DoDesign.selTab();
 		 DoDesign.btn_integral = DoDesign.disableForm(jsonData,DoDesign.pop_integral);
	},
	
	/**
	 * 
	 * 
	 * 活动设计_左树切换事件	
	 * 
	 */
	leftTreeEvent:function()
	{ 
		$("#sidebarContainer,#divTaskSidebar,#divNodeSidebar,#divAnalysisSidebar").find("h4").click(function() {
					$(this).next("div").toggle('fast', function() {
						if ($(this).is(':hidden')) 
						{
							$(this).prev("h4").find("span").html('+');
						} 
						else 
						{
							$(this).prev("h4").find("span").html('-');
						}
					});
			});
	},
	
	/**
	 * 
	 * 流程图创建入口
	 * 
	 */
	main:function (container, outline, toolbar, sidebar, status)
	{
		///var isSupportBrowser = $("#hidIsSupportBrowser").val();
		///var isSupportBrowser = Util.isSupportBrowser();
		///var isSupportBrowser = $("#hidIsSupportBrowser").val();
		var isSupportBrowser = false;
		
		var browser = DoDesign.browser();
		if(   browser.webkit || browser.firefox)
		{
			isSupportBrowser = true;
		}else if( browser.ie > 8){
			isSupportBrowser = true;
		}
		else if( browser.ie === undefined ){
		    if( !(!+[1,]) ){
				isSupportBrowser = true;
		    }
		}
		
		if (!isSupportBrowser)
		{
			saogaUI.ui.dialog.alert({
				title:"温馨提醒",
				text:$("#NotRightBrowserHtml").html(),
				width:420,
				height:80,
				ok:function(){
					DoDesign.GoBack();
					return;
	 			},
			});
		}
		if (!mxClient.isBrowserSupported()) 
		{
			//显示浏览器不支持的信息
			mxUtils.error('Browser is not supported!', 200, false);
		} 
		else
		{
			mxConstants.MIN_HOTSPOT_SIZE = 16;
			mxConstants.DEFAULT_HOTSPOT = 1;

			// Enables guides
			mxGraphHandler.prototype.guidesEnabled = true;

			// Alt disables guides
			mxGuide.prototype.isEnabledForEvent = function(evt) {
				return !mxEvent.isAltDown(evt);
			};

			// Enables snapping waypoints to terminals
			mxEdgeHandler.prototype.snapToTerminals = true;

			// Workaround for Internet Explorer ignoring certain CSS directives
			if (mxClient.IS_QUIRKS) 
			{
				document.body.style.overflow = 'hidden';
				new mxDivResizer(container);
				new mxDivResizer(outline);
				new mxDivResizer(toolbar);
				new mxDivResizer(sidebar);
				new mxDivResizer(status);
			}

			// Creates a wrapper editor with a graph inside the given container.
			// The editor is used to create certain functionality for the
			// graph, such as the rubberband selection, but most parts
			// of the UI are custom in this example.
			var editor = new mxEditor();
			var graph = editor.graph;
			var model = graph.getModel();

			currentEditor = editor;
			currentGraph = graph;
			// Disable highlight of cells when dragging from toolbar
			graph.setDropEnabled(false);

			// Uses the port icon while connections are previewed
			graph.connectionHandler.getConnectImage = function(state) {
				return new mxImage(state.style[mxConstants.STYLE_IMAGE], 16, 16);
			};

			// Centers the port icon on the target port
			graph.connectionHandler.targetConnectImage = true;

			// Does not allow dangling edges
			graph.setAllowDanglingEdges(false);

			// Sets the graph container and configures the editor
			editor.setGraphContainer(container);
			var config = mxUtils.load(root+ '/resources/js/mxGraph/config/keyhandler-commons.xml').getDocumentElement();
			editor.configure(config);

			// Defines the default group to be used for grouping. The
			// default group is a field in the mxEditor instance that
			// is supposed to be a cell which is cloned for new cells.
			// The groupBorderSize is used to define the spacing between
			// the children of a group and the group bounds.
			var group = new mxCell('Group', new mxGeometry(), 'group');
			group.setVertex(true);
			group.setConnectable(false);
			editor.defaultGroup = group;
			editor.groupBorderSize = 20;

			// Disables drag-and-drop into non-swimlanes.
			graph.isValidDropTarget = function(cell, cells, evt) {
				return this.isSwimlane(cell);
			};

			// Disables drilling into non-swimlanes.
			graph.isValidRoot = function(cell) {
				return this.isValidDropTarget(cell);
			};

			// Does not allow selection of locked cells
			graph.isCellSelectable = function(cell) {
				return !this.isCellLocked(cell);
			};

			// Returns a shorter label if the cell is collapsed and no
			// label for expanded groups

			graph.getLabel = function(cell) {
				var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"

				if (this.isCellLocked(cell)) 
				{
					// Returns an empty label but makes sure an HTML
					// element is created for the label (for event
					// processing wrt the parent label)
					return '';
				} 
				else if (this.isCellCollapsed(cell)) 
				{
					var index = tmp.indexOf('</h1>');

					if (index > 0) 
					{
						tmp = tmp.substring(0, index + 5);
					}
				}

				return tmp;
			};

			// Disables HTML labels for swimlanes to avoid conflict
			// for the event processing on the child cells. HTML
			// labels consume events before underlying cells get the
			// chance to process those events.
			//
			// NOTE: Use of HTML labels is only recommended if the specific
			// features of such labels are required, such as special label
			// styles or interactive form fields. Otherwise non-HTML labels
			// should be used by not overidding the following function.
			// See also: configureStylesheet.
			graph.isHtmlLabel = function(cell) 
			{
				return !this.isSwimlane(cell);
			};

			// 设定图表可编辑
			graph.setConnectable(true);

			// 配置样式表
			configureStylesheet(graph);

			// 绑定图例工具条
			if ($("#hidCanEdit").val() == '1')
			{
					addSidebarIcon(graph, sidebar, '分组', document.getElementById('userButton'), 50, 50, 'user');
//					addSidebarIcon(graph, sidebar, '导入', document.getElementById('fileButton'), 50, 50, 'file');
					addSidebarIcon(graph, sidebar, '短信', document.getElementById('smsButton'), 50, 50, 'sms');
					addSidebarIcon(graph, sidebar, '邮件', document.getElementById('emailButton'), 50, 50, 'email');
				    addSidebarIcon(graph, sidebar, '优惠券', document.getElementById('couponButton'), 50, 50, 'coupon');
				/// addSidebarIcon(graph, sidebar, '电子优惠券', document.getElementById('eleCouponButton'), 50, 50, 'eleCoupon');
				    //addSidebarIcon(graph, sidebar, '满送|打折', document.getElementById('promotionButton'), 50, 50, 'promotion');
				///addSidebarIcon(graph, sidebar, '彩票', document.getElementById('lotteryButton'), 50, 50, 'lottery');
				///addSidebarIcon(graph, sidebar, '电子书', document.getElementById('ebookButton'), 50, 50, 'ebook');
					addSidebarIcon(graph, sidebar, '积分', document.getElementById('integralButton'), 50, 50, 'integral');
				   addSidebarIcon(graph, sidebar, '积分活动', document.getElementById('integralActivitiesButton'), 50, 50, 'integralActivities');
				//只有单循环活动,才有控制组
				 if ($("#hidActivityType").val() == '0') {
				    addSidebarIcon(graph, sidebar, '其他', document.getElementById('otherButton'), 50, 50, 'other');	                    
				} else {
				    $("#otherButton").css("color", "darkgray");
				}  
					addSidebarIcon(graph, sidebar, '等级修改', document.getElementById('gradeButton'), 50, 50, 'grade');
					addSidebarIcon(graph, sidebar, '属性修改', document.getElementById('propertyButton'), 50, 50, 'property');
					addSidebarIcon(graph, sidebar, '合并', document.getElementById('unionButton'), 50, 50, 'union');
					addSidebarIcon(graph, sidebar, '交集', document.getElementById('joinButton'), 50, 50, 'join');
					addSidebarIcon(graph, sidebar, '抽取', document.getElementById('pickButton'), 50, 50, 'pick');
					addSidebarIcon(graph, sidebar, '排除', document.getElementById('subButton'), 50, 50, 'sub');
					addSidebarIcon(graph, sidebar, '筛选', document.getElementById('filterButton'), 50, 50, 'filter');
			} 
			else
			{
				$("#sidebarContainer .sidebarMenuActi").css("color", "darkgray");
			}
			addSidebarIcon(graph, sidebar, '分析', document.getElementById('analysisButton'), 50, 50, 'analysis');

			//添加双击事件
			graph.dblClick = function(evt, cell) {
				if (!mxEvent.isConsumed(evt) && cell != null&& this.isCellEditable(cell))
				{
					if (this.model.isEdge(cell) || !this.isHtmlLabel(cell)) 
					{
						this.startEditingAtCell(cell);
					} 
					else 
					{
					  // saogaUI.ui.onselectstart($(cell));
						EditNode(cell);
					}
				}
			};

			//重写连接方法
			//edge.source.getId() 来源节点ID
			//terminal.getId() 目标节点ID
			graph.cellConnected = function(edge, terminal, source, constraint) {
				var canConnected = true;

				if (edge.source != null)
				{
					var startType = edge.source.style;
					var endType = terminal.style;

					//验证连接合法性
					$.each(nodeRule, function(index, object) {
						//判断规则
						if (startType == object.source&& !inArray(endType, object.target)) 
						{
							alert(object.ErrorRule);
							canConnected = false;
							return false;
						}
						//判断输入
						if (endType == object.source&& terminal.getEdgeCount() > 0) 
						{
							var endNodeInput = 1;
							for (var i = 0; i < terminal.getEdgeCount(); i++) 
							{
								var tempEdge = terminal.getEdgeAt(i);
								if (tempEdge != edge) 
								{
									if (tempEdge.target == terminal) 
									{
										endNodeInput = endNodeInput + 1;
									}
								}
							}
							if (endNodeInput > object.maxSourceInput) 
							{
								alert(object.ErrorUpper);
								canConnected = false;
								return false;
							}
						}
					});

					//判断反连接
					if (canConnected) {
						for (var i = 0; i < terminal.getEdgeCount(); i++) 
						{
							var tempEdge = terminal.getEdgeAt(i);

							if (tempEdge != edge) 
							{
								if (( tempEdge.source == terminal && tempEdge.target == edge.source)
									 || (tempEdge.source == edge.source && tempEdge.target == terminal))
								{
									canConnected = false;
									alert('已经存在连接，如果需要重新连接，请删除原连接！');
									break;
								}
							}
						}
					}
				}

				if (!canConnected)
				{
					graph.removeCells([ edge ], true);
				}

				if (canConnected) 
				{
					if (edge != null) 
					{
						this.model.beginUpdate();
						try {
							this.setConnectionConstraint(edge, terminal,
									source, constraint);
							this.model.setTerminal(edge, terminal, source);
							this.resetEdgesOnConnect && this.resetEdge(edge);
						} 
						finally 
						{
							this.model.endUpdate();
						}
					}
				}
			};

			//重写删除方法
			graph.removeCells = function(cells, includeEdges)
			{
				includeEdges = (includeEdges != null) ? includeEdges : true;

				if (cells == null) 
				{
					cells = this.getDeletableCells(this.getSelectionCells());
				}

				// Adds all edges to the cells
				if (includeEdges)
				{
					cells = this.getDeletableCells(this.addAllEdges(cells));
				}

				//是否允许删除
				var isCanDeleted = true;
				for (var i = 0; i < cells.length; i++) 
				{
					if (isCanDeleted) 
					{
						isCanDeleted = CellIsCanDelete(cells[i]);
					}
					else 
					{
						break;
					}
				}

				if (!isCanDeleted) 
				{
					DoDesign.alert('已执行的节点,或执行中的活动任务节点,不允许删除!');
					return false;
				}

				//删除节点数据
				for (var i = 0; i < cells.length; i++)
				{
					if (!cells[i].isEdge()) 
					{
						DeleteCustomerValue(cells[i].getStyle(), cells[i].getId());
					}
				}

				this.model.beginUpdate();
				try
				{
					this.cellsRemoved(cells);
					this.fireEvent(new mxEventObject(mxEvent.REMOVE_CELLS,
							'cells', cells, 'includeEdges', includeEdges));
				} 
				finally 
				{
					this.model.endUpdate();
				}

				return cells;
			};

			//重写新增方法
			graph.cellsAdded = function(cells, parent, index, source, target,absolute, constrain) {
				//不允许编辑
				if ($("#hidCanEdit").val() == '0' && cells != null
						&& cells[0].getStyle() != 'analysis'
						&& !cells[0].isEdge()) 
				{
					return false;
				}
				if (cells != null && parent != null && index != null) 
				{
					//#region 保存节点
					this.model.beginUpdate();
					try {
						var parentState = (absolute) ? this.view.getState(parent) : null;
						var o1 = (parentState != null) ? parentState.origin: null;
						var zero = new mxPoint(0, 0);
						
						for (var i = 0; i < cells.length; i++) {
							if (cells[i] == null) {
								index--;
							} 
							else 
							{
								var previous = this.model.getParent(cells[i]);

								// Keeps the cell at its absolute location
								if (o1 != null && cells[i] != parent
										&& parent != previous) 
								{
									var oldState = this.view.getState(previous);
									var o2 = (oldState != null) ? oldState.origin
											: zero;
									var geo = this.model.getGeometry(cells[i]);

									if (geo != null) 
									{
										var dx = o2.x - o1.x;
										var dy = o2.y - o1.y;

										// to avoid forward references in sessions.
										geo = geo.clone();
										geo.translate(dx, dy);

										if (!geo.relative
												&& this.model.isVertex(cells[i])
												&& !this.isAllowNegativeCoordinates()) 
										{
											geo.x = Math.max(0, geo.x);
											geo.y = Math.max(0, geo.y);
										}

										this.model.setGeometry(cells[i], geo);
									}
								}

								// Decrements all following indices
								// if cell is already in parent
								if (parent == previous) 
								{
									index--;
								}

								this.model.add(parent, cells[i], index + i);

								// Extends the parent
								if (this.isExtendParentsOnAdd()
										&& this.isExtendParent(cells[i])) 
								{
									this.extendParent(cells[i]);
								}

								// Constrains the child
								if (constrain == null || constrain)
								{
									this.constrainChild(cells[i]);
								}

								// Sets the source terminal
								if (source != null) 
								{
									this.cellConnected(cells[i], source, true);
								}

								// Sets the target terminal
								if (target != null) 
								{
									this.cellConnected(cells[i], target, false);
								}
							}
						}
						this.fireEvent(new mxEventObject(mxEvent.CELLS_ADDED,
								'cells', cells, 'parent', parent, 'index',
								index, 'source', source, 'target', target,
								'absolute', absolute));
					} finally {
						this.model.endUpdate();
					}
					//#endregion

					//合并,交集 保存初始值
					//粘贴      复制值
					for (var i = 0; i < cells.length; i++) {
						//判断ID是否存在 防止ID重复
						var cellid = cells[i].getId();
						while (inArray(cellid, allCellIds)) {
							cellid = parseInt(cellid) + 1;
						}
						if (cellid != cells[i].getId()) {
							cells[i].setId(cellid);
						}
						allCellIds.push(cellid);

						//设置默认值
						if (!cells[i].isEdge()&& inArray(cells[i].getStyle(), [ 'union','join' ]))
						{
							SelNodeDefault(cells[i].getId(), cells[i].getStyle());
						}
						//设置复制值 注：1)筛选,排除 不进行节点复制; 2)交集,合并设置默认值,无需复制.
						if (!cells[i].isEdge()&& inArray(cells[i].getStyle(), canCopyNode))
						{
							var cellValue = cells[i].getValue();
							//替换标题内包含的CID为自身ID
							var repCidReg = new RegExp("cid='(\\d+)'", "g");
							var newCellValue = cellValue.replace(repCidReg,"cid='" + cellid + "'");
							cells[i].setValue(newCellValue);
							//复制节点值
							SelNodeParse(cellid, cells[i].getStyle(), cellValue);
						}
					}
				}
			};

			//加载XML
			try 
			{
				if ($("#hidGraphXml").val() != '') 
				{
					
					//alert(); 
					var temp = DoDesign.UrlDecode($("#hidGraphXml").val());
					//temp  = temp.replace("&lt;span cid=&#39;2&#39; class=&#39;nodeDateTip&#39;&gt;2014-07-16 19:17:47&lt;/span&gt;&lt;br/&gt;fdds","分组");
					//temp = temp.replace('vertex="1"',' vertex="1" parent="1" ');
					
					var doc = mxUtils.parseXml(temp);
					var dec = new mxCodec(doc);
					dec.decode(doc.documentElement, model);
				}
			} 
			catch (e) 
			{
				alert(e);
			}

			  // 显示提示信息框
			 var hints = document.createElement('div');
			 
			 hints.id = '_hints';
			 hints.style.position = 'fixed';
			 hints.style.overflow = 'hidden';
			 hints.style.width = '280px';
			 hints.style.bottom = '60px';
			 hints.style.height = '50px';
			 hints.style.right = '20px';

			 hints.style.background = 'black';
			 hints.style.color = 'green';
			 hints.style.fontFamily = 'Arial';
			 hints.style.fontWeight = 'bold';
			 hints.style.fontSize = '12px';
			 hints.style.padding = '4px';

			 mxUtils.setOpacity(hints, 50);                

			 if($("#SelGroupActivity").length > 0) {                    
			     var htmlButton = "<span style='padding-left: 24px;'>列表：</span><select onchange='DoDesign.toDesign(this);' style='width:200px;'>" + $("#SelGroupActivity").html() + "</select>";
			     htmlButton += "<br/><span>活动状态："+$("#hidActivityStatus2").val()+"</span>";
			     $(hints).html(htmlButton);
			     mxUtils.writeln(hints, "");
			 }
			 else {      
			     mxUtils.writeln(hints, '活动名称：' + $("#hidActivityName").val());
			     mxUtils.writeln(hints, '活动状态：'+$("#hidActivityStatus2").val());
			 }

			 document.body.appendChild(hints); 

			// Creates a new DIV that is used as a toolbar and adds
			// toolbar buttons.
			var spacer = document.createElement('div');
			spacer.style.display = 'inline';
			spacer.style.padding = '8px';

			var spacerLine = document.createElement('div');
			spacerLine.style.display = 'inline';
			spacerLine.style.width = '1px';
			spacerLine.style.height = '8px';
			spacerLine.style.background = '#D4D4D4';
			spacerLine.style.padding = '0px 0px 0px 1px';
			spacerLine.style.margin = '0px 5px 0px 8px';
			spacerLine.style.border = '0';

			// 定义保存的ACTION
			
			
			
			
			editor.addAction('save', function(editor, cell) {
				
				saogaUI.ui.dialog.confirm({
					title:'保存活动设计',
					text:'确定保存活动设计',
					ok:function(){
						var buttonSave = $("#toolbarContainer").find("button:last-child");
						$(buttonSave).prop("disabled", "disabled");
		
						var enc = new mxCodec(mxUtils.createXmlDocument());
						var node = enc.encode(editor.graph.getModel());
						var result = DoDesign.validateNodes();
						//已提交的任务,强制判断合法性
						if ($("#hidCanEdit").val() == 0 && !result) {
							DoDesign.alert('设置不合法!');
							return;
						}
		
						//保存所有任务
						//console.log(mxUtils.getPrettyXml(node)+"mxUtils.getPrettyXml(node)");
						DoDesign.saveAllTask(mxUtils.getPrettyXml(node), result);
						$(buttonSave).prop("disabled", "");
					},
					on:function(){
						return false;
					}
				});	
				
			});

			addToolbarButton(editor, toolbar, 'save', '保存', 'icon2-save');

			if ($("#hidPower").val() == "1") {
				if ($("#hidActivityStatus").val() == "4") {
					addToolbarButton(editor, toolbar, 'stopAct', '暂停','icon2-pause');
					editor.addAction('stopAct', function(deitor, cell) {
						//StopActivity();
						DoDesign.doPause();
					});
				}
				if ($("#hidActivityStatus").val() == "6") {
					addToolbarButton(editor, toolbar, 'reStartAct', '继续','icon2-forward');
					editor.addAction('reStartAct', function(deitor, cell) {
						DoDesign.reStartActivity();
					});
				}
			}
			editor.addAction('batchedit', function(editor, cell) {
				BatchEditNodes(currentGraph.getSelectionCells());
			});
			addToolbarButton(editor, toolbar, 'batchedit', '批量编辑', 'icon2-th');
			// addToolbarButton(editor, toolbar, 'history', '', root+ '/resources/js/mxGraph/images/save.gif');
			addToolbarButton(editor, toolbar, 'delete', '删除', 'icon2-remove');
			addToolbarButton(editor, toolbar, 'undo', '撤销', 'icon2-reply');
			editor.addAction('undo', function(editor, cell) {
				var isDo = $("#hidCanEdit").val(); //否可编辑 0 不允许编辑 1 可以编辑
				if("1"==isDo)
				{
					editor.undo(); 
				}
				if("0"==isDo)
				{
					DoDesign.alert("已经提交任务不能撤消!");
				}
				   
			});
			addToolbarButton(editor, toolbar, 'redo', '重做', 'icon2-share-alt');

			//toolbar.appendChild(spacerLine.cloneNode(true));

			addToolbarButton(editor, toolbar, 'zoomIn', '放大', 'icon2-zoom-in');
			addToolbarButton(editor, toolbar, 'zoomOut', '缩小', 'icon2-zoom-out');
			addToolbarButton(editor, toolbar, 'actualSize', '1:1','icon2-search');
			editor.addAction('fullScreen', function(deitor, cell) {
				//全屏/退出
				$("#toolbarContainer").find("a").each(
						function(index, object) {
							if ($(this).html().indexOf('退出全屏') > -1) 
							{
								$("#lt-left").show();
								$("#logoBar").show();
								$("#navBar").show();
								$("#lt-footer").show();
								$("#lt-rightMain").css({'width':'','height':''});
								$("#page-design-wrap").css({'width':'','height':''});
								$("#graphContainer").css({'hight':''});
								$('#sidebarContainer').css({'hight':''});
								$('#lt-wrap').css({'padding':'','margin':'','scroll':'no'});
								
								if( $(window).height() > 700 ){
									$("#page-design-wrap").height($(window).height()-$("#lt-header").height()-$("#lt-footer").height()-$("#navBar").height()-55);
								}else{
									$("#page-design-wrap").height(700)
								}
								
								$(this).html($(this).html().replace('退出全屏', '全屏'));
								return;
							} 
							else if ($(this).html().indexOf('全屏') > -1) 
							{
								$("#lt-left").hide();
								$("#logoBar").hide();
								$("#navBar").hide();
								$("#lt-footer").hide();
								$("#lt-rightMain").css({'width':$(window).width()-10,'height':$(window).height()-55});
								$("#page-design-wrap").css({'width':$(window).width()-10,'height':$(window).height()-55});
								$("#graphContainer").css({'hight':$(window).height()-55});
								$('#sidebarContainer').css({'hight':$(window).height()-55});
								$('#lt-wrap').css({'padding':'0','margin':'-10px'});
								
								$("#lt-rightMain").css("padding-left",'20px').width($("#lt-rightMain").width()-10);
								$("#page-design-wrap").width($("#page-design-wrap").width()-10);
								
								
								$(this).html($(this).html().replace('全屏', '退出全屏'));
								return;
							}
						});
			});
			addToolbarButton(editor, toolbar, 'fullScreen', '全屏','icon2-fullscreen');

			//toolbar.appendChild(spacerLine.cloneNode(true));

			// 检测设置是否合法
			editor.addAction('check', function(editor, cell) {
				if (DoDesign.validateNodes()) {
					DoDesign.alert('检测完成！');
					var allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
				    for (var j = 0; j < allCells.length; j++) 
				    {
					   if (!allCells[j].isEdge()) 
				        {
				    	  DoDesign.setNodeIcon(currentGraph, allCells[j], 1);
				    	}
				    }
				}
			});
			addToolbarButton(editor, toolbar, 'check', '检测', 'icon2-globe');

			// 测试短信/邮件
			editor.addAction('test', function(editor, cell) {
				ChannelTest();
			});
			addToolbarButton(editor, toolbar, 'test', '发送测试','icon2-external-link');

			// Creates a layout algorithm to be used
			// with the graph
			var layout = new mxHierarchicalLayout(graph,
					mxConstants.DIRECTION_WEST, true);
			// Moves stuff wider apart than usual
			layout.forceConstant = 100;
			layout.disableEdgeStyle = false;
			//整理
			editor.addAction('Arrange', function(editor, cell) {
				var parent = graph.getDefaultParent();
				layout.execute(parent);
			});

			addToolbarButton(editor, toolbar, 'Arrange', '整理', 'icon2-random');

			addToolbarButton(editor, toolbar, 'show', '展示', 'icon2-file');
			//返回
			editor.addAction('goback', function(editor, cell) {
				DoDesign.GoBack();
			});
			addToolbarButton(editor, toolbar, 'goback', '返回','icon2-circle-arrow-left');
			//对比分析
			editor.addAction('compareanalysis', function(editor, cell) {
					DoDesign.compareAnalysis();
			});
			addToolbarButton(editor, toolbar, 'compareanalysis', '对比分析','icon2-signal');

			//toolbar.appendChild(spacer.cloneNode(true));

			// Creates the outline (navigator, overview) for moving
			// around the graph in the top, right corner of the window.
			var outln = new mxOutline(graph, outline);

			// To show the images in the outline, uncomment the following code
			//outln.outline.labelsVisible = true;
			//outln.outline.setHtmlLabels(true);

			// Fades-out the splash screen after the UI has been loaded.
			var splash = document.getElementById('splash');
			if (splash != null) {
				try {
					mxEvent.release(splash);
					mxEffects.fadeOut(splash, 100, true);
				} catch (e) {

					// mxUtils is not available (library not loaded)
					splash.parentNode.removeChild(splash);
				}
			}

		}
		
	},
	
	/**
	 * 
	 * 初始化控件基础信息
	 * 
	 */
	customerMxGraphOnInit:function () 
	{
	    try {	 
	        //禁用编辑
	        if($("#hidCanEdit").val()=='0') {	            
	            $("#toolbarContainer").find("button").each(function(index, object) {
	                var commonTool = ["保存","继续","暂停","删除", "1:1", "放大", "缩小", "全屏","检测", "返回", "展示", "发送测试","整理","对比分析"];
	                $(this).prop("disabled", "disabled");
	                for(var i=0;i<commonTool.length;i++) {
	                    if($(this).html().indexOf(commonTool[i])>-1) {	                        
	                        $(this).prop("disabled", "");
	                        break;
	                    }
	                }
	            });
	            //隐藏模板应用
	            $("#ahrefHistoryTemplate").hide();
	        }
	        else {
	            $(".sidebarMenuActi").attr("title", "可鼠标拖动到设计区内");
	                
                //加载云模板
	            LoadCloudTemplate();
                //初始化树
	           // $("#ktreeSearch").treeview({collapsed: false});
	            $("#ktreeSearch div").click();
	                
	            //隐藏历史模板事件
	            $("#templateHistory").bind("mouseleave", function() {
                    $('#treeMenu').hide();
	            });
	                
                //删除自用模板图标
	            $("#userTemplate span").bind("mouseover",function(sender) {
	                $(this).next().show();
	            });
	            $("#userTemplate li").bind("mouseleave",function() {
	                $(this).children(":last-child").hide();
	            });
	        }

	        //获取已存在的所有节点ID
	        if (currentGraph != null) {
	            allCellIds = new Array();
	            var allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
	            for (var i = 0; i < allCells.length; i++) {
	                allCellIds.push(allCells[i].getId());
	            }
	        }
	            
	        //模板增加设置按钮
	        if( $("#hidActivityType").val() == '2') {
	            var htmlButton = "<a onclick='DoDesign.showPeriodConfig();'><i class='icon2-asterisk'></i><p>设置</p></a>";
	            $("#toolbarContainer").find("a").eq(1).before(htmlButton);
	        }
	    }catch (e) {
	        alert(e);
	    }
	},
	
	/**
	 * 
	 * 返回
	 * 
	 */
	GoBack:function ()
	{
		var _type = $("#hidType").val();
		if(_type==1)
		{
			window.location.href =root+'/apps/marketing/toShow.do';
		}
		else
		{
			window.location.href =root+'/apps/marketing/toAudit.do';
		}
	},
	
	
	/**
	 * 
	 * 清空节点状态图标
	 * 
	 */
	clearNodeIcon:function (cell) 
	{
		currentGraph.clearCellOverlays(cell);
	},
	
	
	/**
	 * 
	 * 保存所有任务
	 * 
	 */
	saveAllTask:function (xml,validated) 
	{
	    try 
	    {	            	          
	       DoDesign.showCommonLoading();
            //替换掉发送成功.失败人数
	        var reg = new RegExp("&lt;br/&gt;\\((.*?)人\\)", "g");	            
	        if(xml.match(reg))
	        {
	            xml = xml.replace(reg, "");
	        }
	        //兼容旧数据
	        var regOld = new RegExp("\\((.*?)人\\)", "g");	            
	        if(xml.match(regOld)) 
	        {
	            xml = xml.replace(regOld, "");
	        }
            var taskCount = GetTaskCellCount();
	        //alert(taskValues);
	        var taskValues = $("#hidTaskValues").val();
	        var nodeValues = $("#hidNodeValues").val();
	        var userValues = $("#hidUserValues").val();
	        var fileValues = $("#hidFileValues").val();
	        var customerValues = $("#hidCustomerValues").val();
	        var analysisValues = $("#hidAnalysisValues").val();
	        var activitiesStatus = $("#hidActivitiesStatus").val();   	            
	        //分析节点编辑信息 0：新增节点 1：修改节点  [0|id|guid|sourceguid],[1|id|guid|sourceguid]
	        var editAnalysisInfo = "";
	        //任务节点编辑信息 [guid],[guid]
	        var editTasksInfo = $("#hidTasksEdit").val();
	           
            //获取分析节点的来源节点GUID
	        if($("#hidCanEdit").val()=='0' && $("#hidAnalysisEdit").val()!='') 
	        {
	            var analysisArray = $("#hidAnalysisEdit").val().split(',');
	                
                for(var i=0;i<analysisArray.length;i++)
                {
                    if(analysisArray[i]!='') 
                    {
                        var analysisInfo = analysisArray[i].split('|');
                            
                        var sources = GetSourceCells(analysisInfo[1]);
                        var sourceData = GetCustomValue(sources[0].getStyle(), sources[0].getId());
                        var sourceJson = JSON.parse(sourceData);
                        var sourceGuid = sourceJson.guid;
                        editAnalysisInfo += analysisInfo[0] + '|' + analysisInfo[1] + '|' + analysisInfo[2] + '|' + sourceGuid + "],";
                    }
                }
	        }
	        var data = 
	        {
	            activitiesID: $("#hidActivityId").val(),
	            validated: validated ? 1 : 0,
	            taskCount:taskCount,
	            xml: encodeURIComponent(xml),
	            taskValues: taskValues,
	            nodeValues: nodeValues,
	            userValues: userValues,
	            fileValues: fileValues,
	            analysisValues: analysisValues,
	            customerValues :customerValues,
	            editAnalysisInfo:editAnalysisInfo,
	            editTasksInfo:editTasksInfo,
	            activitiesStatus:activitiesStatus
	        };
	            
	        $.ajax({
	            url: root+"/apps/marketing/doDesign.do",
	            type: "post",
	            data: data,
	            success: function (json) {
	            	var res = json.result;
	            	//alert(res.isOK);
	                DoDesign.hideCommonLoading();
	                if (res.isOK) 
	                {
	                    isChange = 0;
	                    DoDesign.GoBack();
	                }
	                else 
	                {
	                    DoDesign.alert(res.description);
	                }
	            },
	            error: function (e) 
	            {
	            	DoDesign.hideCommonLoading();
	                DoDesign.alert('服务器访问失败！');
	            }
	        });
	            
	    }
	    catch (e) 
	    {
	        alert(e);
	    }
	},
	
	/**
	 * 
	 * 检测节点设置是否有效
	 * 
	 */
	validateNodes:function () 
	{
	    var isValidate = true;
	    hasErrorNode = false;
	        
	    var allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
        var allEdgess = currentGraph.getChildEdges(currentGraph.getDefaultParent()); 
	        
        //清空可能存在的冗余数据 【由撤销导致】
	    var styleArrays = new Array();
	    var idArrays = new Array();
	    var dataArrays = new Array();
	    for (var j = 0; j < allCells.length; j++) 
	    {
	        if (!allCells[j].isEdge()) 
	        {
	            var cellStyle = allCells[j].getStyle();
	            var cellId = allCells[j].getId();	               
	            try
	            {	                
	                var jsonData = GetCustomValue(cellStyle, cellId);	                
	                if(jsonData !=null && jsonData!='') {	                    
	                    styleArrays.push(cellStyle);
	                    idArrays.push(cellId);
	                    dataArrays.push(jsonData);
	                }
	            } 
	            catch(e) 
	            {
	            }
	        }
	    }
	        
	    //清空节点数据
	    //ClearCustomerValue();
	        
	    //重新保存数据
        for(var k=0;k<styleArrays.length;k++) 
        {
            SetCustomValue(styleArrays[k], idArrays[k], dataArrays[k]);
        }
	        
	    //自动计算逻辑节点发送时间
	    CalculateNodeSendTime(allCells, allEdgess);
	        
	    //检测节点
	    for (var i = 0; i < allCells.length; i++) 
	    {
	        if (!allCells[i].isEdge())
	        {
	            isValidate = DoDesign.validateNodeRelation(allCells[i],allEdgess) && isValidate;
	        }
	    }
	    //重新获取节点状态
        NodeMarking();
	    return isValidate;
	},
	
	
	/**
	 * 
	 * 检测节点关系是否合法
	 * 
	 */
	validateNodeRelation:function (validateCell, allEdgess) 
	{
	    try 
	    {	            
	        //清空节点状态图标
	        //clearNodeIcon(validateCell);
	            
	        var cellId = validateCell.getId();
	        var cellStyle = validateCell.getStyle();

	        var sources = GetSourceCells(cellId, allEdgess);
	        var targets = GetTargetCells(cellId, allEdgess);

	        var validated = true;

            //验证连接合法性
	        $.each(nodeRule, function(index, object) {
	            if(cellStyle == object.source) {
	                //验证子连接类型合法
	                for(var i=0;i<targets.length;i++) {
	                        if(!inArray(targets[i].getStyle(),object.target)) {
	                            DoDesign.setNodeIcon(currentGraph, validateCell, 2, object.ErrorRule);
	                            validated = false;
	                            return false;
	                        }
	                }
	                //验证最小来源连接
	                if(sources.length < object.minSourceInput)
	                {
	                    DoDesign.setNodeIcon(currentGraph, validateCell, 2,"未设置来源节点");
	                    validated = false;
	                    return false;
	                }
	                //验证最大来源连接
	                if (sources.length > object.maxSourceInput)
	                {
                        DoDesign.setNodeIcon(currentGraph, validateCell, 2,object.ErrorUpper);
	                    validated = false;
	                    return false;
	                }
	                //验证最小输出连接
	                if(targets.length < object.minTargetOut)
	                {
	                    DoDesign.setNodeIcon(currentGraph, validateCell, 2,object.ErrorDown);
	                    validated = false;
	                    return false;
	                }
	                //导入子节点 只能连接分析节点
	                if(sources.length == 1 && sources[0].getStyle() == 'file' && targets.length > 0) {
	                    for(var j=0;j<targets.length;j++)
	                    {
	                        if(targets[j].getStyle()!='analysis')
	                        {
	                            DoDesign.setNodeIcon(currentGraph, validateCell, 2,"本节点后只能连接分析节点！");
	                            validated = false;
	                            return false;
	                        }
	                    }
	                }
	            }
	        });

            if(validated) 
            {
                //检测节点配置
                validated = DoDesign.validateNodeConfig(validateCell, sources, targets);
            }
	        return validated;
	    }catch (e)
	    {
	        alert(e);
	        return false;
	    }
	},
	
	/**
	 * 
	 * 设置节点状态图标
	 * 
	 */
	setNodeIcon:function (graph, cell, type,remark) 
	{
	    var img = null;
	    var tip = '';	        
	    if (type == 1) 
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/datacomplete.png';
	        tip = '设置完成';
	    }
	    if (type == 2) 
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/dataerror.png';
	        tip = '设置错误:'+remark;
	        if(!hasErrorNode) {
	            hasErrorNode = true;
	            //显示节点到最中央
	            graph.scrollCellToVisible(cell, true);
	        }
	    }
	    if (type == 3)
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/sending.png';
	        tip = '提交中';
	    }
	    if (type == 4) 
	    {	            
	        img = root+ '/resources/js/mxGraph/images/icons/sendstop.png';
	        tip = '发送失败,可营销人数为空.';
	    }
	    if (type == 5)
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/sendsuccess.png';
	        tip = '执行完成';
	        if(remark!=null && remark!="") 
	        {	               
	            var title = cell.getValue().toString();
	            var reg = new RegExp("\\((.*?)人\\)$", "g");
	            if(title.match(reg))
	            {	                    
	                title = title.replace(reg, "(" + remark + ")");
	                cell.setValue(title);
	            }
	            else 
	            {	                    
	                cell.setValue(title + "<br/>(" + remark + ")");    
	            }
	        }
	    }
	    if (type == 6) 
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/senderror.png';
	        tip = '发送异常：' + remark;	            
	    }
	    if (type == 7) 
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/aduit.png';
	        tip = '待雁书审核';
	    }
	    if (type == 17) {
	        img = root+ '/resources/js/mxGraph/images/icons/aduit.png';
	        tip = '待手机验证';
	    }
	    if (type == 18)
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/aduit.png';
	        tip = '待手机验证';
	    }
	    if (type == 8) 
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/sendcannel.png';
	        tip = '发送取消';
	    }
	    if(type == 9)
	    {
	        img = root+ '/resources/js/mxGraph/images/icons/sending.png';
	        tip = '发送中';
	    }
        if(type == 10) {
	        img = root+ '/resources/js/mxGraph/images/icons/sending.png';
	        tip = '已提交';
	    }
	        
	    graph.clearCellOverlays(cell);

	    var overlay = new mxCellOverlay(new mxImage(img, 16, 16), tip);	        
	    overlay.verticalAlign = mxConstants.ALIGN_TOP;
	       
	    overlay.addListener(mxEvent.CLICK, function(sender, evt2) {
	        var cellId = cell.getId();
	        var cellStyle = cell.getStyle();
	        if(type == 6) {
	            //异常
	            try {
	                    var jsonData = GetCustomValue(cellStyle, cellId);
	                    var jsonObject = JSON.parse(jsonData);
	                       /* window.parent.Confirm("是否重新提交任务？<br/>上次失败原因：" + remark, function() {
	                            ResetSubmit(cellId, jsonObject.guid);
	                        });*/
	                        
	                        saogaUI.ui.dialog.confirm({
	                			title:"提示",
	                			text:"是否重新提交任务？<br/>上次失败原因：" + remark,
	                			width:400,
	                			height:70,
	                			ok:function(){
	                				DoDesign.resetSubmit(cellId, jsonObject.guid);
	                			},
	                			on:function(){
	                				return false;
	                			}
	                		});	
	            }catch (e) {
	                alert(e);
	            }
	        }
	        if(type == 17) {
	            //短信验证
                var jsonData = GetCustomValue(cellStyle, cellId);
	            var jsonObject = JSON.parse(jsonData);
                window.parent.$.colorbox({title:"彩票短信验证",href:"/LotteryTicket/LotteryMarketingValidate?guid="+jsonObject.guid,width:450,height:260,iframe:true,onClosed:function(e) {
                    if(e.key == 1) {                            
                        graph.clearCellOverlays(cell);
                    }
	            }});
	        }
	        if(type == 18) {
	            //短信验证
                var jsonData = GetCustomValue(cellStyle, cellId);
	            var jsonObject = JSON.parse(jsonData);
                window.parent.$.colorbox({title:"电子书短信验证",href:"/EBook/EbookMarketingValidate?guid="+jsonObject.guid,width:450,height:260,iframe:true,onClosed:function(e) {
                    if(e.key == 1) {                            
                        graph.clearCellOverlays(cell);
                    }
	            }});
	        }
	    });
	        
	    graph.addCellOverlay(cell, overlay);
	},
	
	/**
	 * 
	 * 清空节点状态图标   
	 * 
	 */
	clearNodeIcon:function (cell) {        
        currentGraph.clearCellOverlays(cell);
    },  
    
    /**
     * 
     * 进度条
     * 
     */
    showCommonLoading:function(text) 
    {
        //    if (text == null || $.trim(text) == '') {
        //        text = "正在加载…";
        //    }
        //    var loadingWidth = $(window).width() / 2 - (parseInt($("#commonLoading").width()) + 50) / 2;
        //    $("#commonLoading").css({ left: loadingWidth }).html(text).show();
        if (text == null || $.trim(text) == '') 
        {
            // text = "正在加载…";
        }
        text = "";
        if (document.getElementById('commonLoading'))
        {
            var loadingWidth = $(window).width() / 2 - (parseInt($("#commonLoading").width()) + 50) / 2;
            $("#commonLoading").css({ left: loadingWidth }).show();
        } else 
        {
            var loadingWidth = $(window).width() / 2 - (parseInt(window.parent.$("#commonLoading").width()) + 50) / 2;
            window.parent.$("#commonLoading").css({ left: loadingWidth }).html(text).show();
        }
    },
    
    
    /**
     * 
     * 隐藏进度条
     * 
     */
    hideCommonLoading:function () 
    {
        $("#commonLoading").fadeOut(500);
    }, 
    
    /**
     * 
     * 检测节点设置是否设置正确    
     * 
     */
    validateNodeConfig:function (validateCell,sources,targets) 
    {	
	    try {
	        var cellId = validateCell.getId();
	        var cellStyle = validateCell.getStyle();

	        var jsonData = GetCustomValue(cellStyle, cellId);
	            
	        if (jsonData != '') 
	        {
	            var jsonObject = JSON.parse(jsonData);
	            //导入 分析 不需要判断设置 
	            if(cellStyle == 'file' || cellStyle == 'analysis') {
	                return true;
	            }

	            //当前任务执行时间
	          //  var timeTick = Date.parse(jsonObject.sendTime) + parseInt(jsonObject.sendHour) * 60 * 60 * 1000 + parseInt(jsonObject.sendMin) * 60 * 1000;
	         	  var jsTempTime = jsonObject.sendTime.replace("-", "/").replace("-", "/");	                
				  var timeTick = Date.parse(jsTempTime);
	            //判断 当前节点执行时间小于子任务执行时间
	            //判断 当前节点的被抽取比例是否大于100
	            var percent = 0;
	            var isError = false;
	              
	            for (var i = 0; i < targets.length; i++) {
	                var jsonDataTarget = GetCustomValue(targets[i].getStyle(), targets[i].getId());
	                if (jsonDataTarget != '') {
	                    var jsonObjectTarget = JSON.parse(jsonDataTarget);
	                        
                        //判断节点执行时间
                        //当前节点不与分析节点做时间比较	                        
	                    //模板节点不判断执行时间
	                    if(jsonObjectTarget.cellStyle != 'analysis' && $("#hidActivityType").val() != "2") {
	                        //var targetTimeTick = Date.parse(jsonObjectTarget.sendTime) + parseInt(jsonObjectTarget.sendHour) * 60 * 60 * 1000 + parseInt(jsonObjectTarget.sendMin) * 60 * 1000;
                              var sendTemp = jsonObjectTarget.sendTime.replace("-", "/").replace("-", "/");
                              var targetTimeTick = Date.parse(sendTemp);
                              
	                        if (timeTick > targetTimeTick) {
	                            //节点时间应小于子节点
	                            isError = true;
	                           DoDesign.showNodeError(targets[i], 14);return false;
	                        }
	                    }
	                    //验证节点被抽取比例
	                    if (targets[i].getStyle() == 'pick') {
	                        percent += parseFloat(jsonObjectTarget.nodePercent);
	                        if (percent > 100) {
	                            isError = true;
	                            DoDesign.showNodeError(targets[i], 13);return false;
	                        }
	                    }
	                }
	            }
	                
	            if (isError) {
	                return false;
	            }

	            //排除节点 判断设置的2个排除项是否是最新的来源节点
	            if (inArray(cellStyle, ['sub'])) {
	                if (sources.length == 2) {
	                    if (!inArray(jsonObject.baseNodeId, [sources[0].getId(), sources[1].getId()]) || !inArray(jsonObject.targerNodeId, [sources[0].getId(), sources[1].getId()])) {
	                        DoDesign.showNodeError(validateCell, 12); return false;
	                    }
	                }
	                else {
	                    DoDesign.showNodeError(validateCell, 10); return false;
	                }
	            }
	                
	            return true;
	        }
	        else {
	            DoDesign.showNodeError(validateCell, 11); return false;
	        }
	    } catch (e) {
	        alert(e);
	        return false;
	    }
	}, 
	
	
	/**
	 * 
	 * 显示节点错误
	 * 
	 */
	showNodeError:function(cell, errorCode)
    {
	    try
	    {

	        var strError = '';
	        switch (errorCode) 
	        {
		        case 0: strError = "未设置来源节点";
		            break;
		        case 1:
		            strError = "分组节点不能被设置为目标节点";
		            break;
		        case 2:
		            strError = "导入节点不能被设置为目标节点";
		            break;
		        case 3:
		            strError = "分组节点未设置目标节点";
		            break;
		        case 4:
		            strError = "导入节点未设置目标节点";
		            break;
		        case 5:
		            strError = "【导入节点】后只能连接一个【短信节点】";
		            break;
		        case 6:
		            strError = "【营销动作】未设置来源节点";
		            break;
		        case 7:
		            strError = "【营销动作】只能设置一个来源节点";
		            break;
		        case 8:
		            strError = "【营销动作】后只能连接（筛选节点,分析节点）";
		            break;
		        case 9:
		            strError = "【抽取,筛选】只能设置一个来源节点";
		            break;
		        case 10:
		            strError = "【排除节点】只能对两个来源节点进行排除";
		            break;
		        case 11:
		            strError = "节点内容未设置";
		            break;
		        case 12:
		            strError = "【排除节点】配置内容错误";
		            break;
		        case 13:
		            strError = "来源节点被抽取比例总和大于100%";
		            break;
		        case 14:
		            strError = "子任务执行时间应大于父任务执行时间";
		            break;
		        case 15:
		            strError = "【逻辑节点】未设置子节点";
		            break;
		        case 16:
		            strError = "【导入节点】后的营销任务不能有子节点";
		            break;
		        case 17:
		            strError = "【分析节点】未设置来源节点";
		            break;
		        case 18:
		            strError = "【分析节点】只能设置单个来源节点";
		            break;
		        case 19:
		            strError = "【分析节点】不能设置目标节点";
		            break;
		        case 20:
		            strError = "【分析节点】分析结束时间应大于来源节点执行时间";
		            break;
		        default:
	        }

	        DoDesign.setNodeIcon(currentGraph, cell, 2,strError);
	        //alert(strError);
	    } 
	    catch(e)
	    {
	        alert(e);
	    }
	},
	
	 UrlDecode:function(str)
	 {
	    if (str == null || str == undefined || str == NaN)
	    {
	        return "";
	    }
	    var ret = "";
	    for (var i = 0; i < str.length; i++) 
	    {
	        var chr = str.charAt(i);
	        if (chr == "+") 
	        {
	            ret += " ";
	        } else 
	        {
	            ret += chr;
	        }
	    }
	    return decodeURIComponent(ret);
	},
	
	/**
	 * 
	 * 循环活动周期设置
	 * 
	 */
	showPeriodConfig:function()
	{
		var periodConfig = saogaUI.ui.pop({//
  			id:'periodConfig',
  			title:'活动周期设置',
  			isMaskClose:false,
  		    width:600,
  		    height:400,
  		    async:false,
  			ajax:root+'/apps/marketing/toPeriodConfig.do?id='+$("#hidActivityId").val(),
  			onloadFn:function()
  			{
  				
  				
  			},
  			closeFn:function()
  			{
  			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(id)
						{
							if(SaveConfig())
							{
							   periodConfig.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
  		});
	},
	
	/**
	 * 
	 * 活动设计跳转
	 * 
	 */
	toDesign:function(obj)
	{
		 window.location.href =root+'/apps/marketing/toDesign.do?_type='+$("#hidType").val()+'&id='+$(obj).val();
	},
	/**
	 * 
	 * 隐藏和显示弹出界面按钮
	 * 
	 */
	isShowBTN:function(popId,btnTxt)
	{
		popId.modifyBtns(btnTxt);
	},
	
	/**
	 * alert
	 */
	alert:function(title,text,width,heigth)
	{
		saogaUI.ui.dialog.alert({
				title:title,
				text:text,
				width:width,
				height:heigth,
		});
	},
	
	/**
	 * alert
	 */
	alert:function(text)
	{
		saogaUI.ui.dialog.alert({
				title:"提示",
				text:text,
				width:220,
				height:50,
		});
	},
	
	/**
	 * confirm
	 */
	confirm:function(title,text)
	{
		var res = false;
		saogaUI.ui.dialog.confirm({
			title:title,
			text:text,
			ok:function(){
				res = true;
			},
			on:function(){
				res= false;
			}
		});	
		return res;
	},
	
	/**
	 * 判断浏览器
	 */
	browser:function()
	{
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
	},
	/**
	 * 活动完成状态 节点跳转到保存记录tab
	 */
	selTab:function()
	{
	   if($("#hidActivitiesStatus").val()=="5")
	   {
		   $("#tab li:eq(1)").trigger("click")
	   }
	},
	/**
	 * disable表单并隐藏保存按钮
	 */
	disableForm:function(jsonData,pop)
	{
	    var res = true;
		var guid = "";
		if(jsonData)
		{
			_obj= JSON.parse(jsonData);
			 guid = _obj.guid;
			if (guid != "" && !IsCanEditNode(guid)) 
		    {
	  		       $(".tab-main:eq(0)").find("*")
	  		                           .each(function(){ 
						$(this).attr("disabled", "disabled"); 
					}); 
	  			res = false;
	  			if($("#hidActivitiesStatus").val()=="5")
	   			{
	   				DoDesign.isShowBTN(pop,[]);
	   			}
	   			else
	   			{
	   				DoDesign.isShowBTN(pop,[{text: '关闭'}]);
	   			}
	  		}
	   }
	   return res;
	},
	/**
	 *
	 * 设置活动设计页面高度
	 */
	setHeight:function()
	{
		if( $(window).height() > 700 )
		{
			$("#page-design-wrap").height($(window).height()-$("#lt-header").height()-$("#lt-footer").height()-$("#navBar").height()-55);
		}else{
			$("#page-design-wrap").height(700)
		}
	},
	/**
	 * 
	 * 暂停事件
	 * 
	 */
	doPause:function()
	{
		saogaUI.ui.dialog.confirm({
			title:"提示",
			text:"您确定要暂停活动吗?",
			ok:function(){
				$.ajax({
		    		type:"post",
		    		url:root+'/apps/marketing/doHandler.do',
					data:'selID='+ $("#hidActivityId").val()+'&selIndex=7',
		    		success:function(r){
		                DoDesign.GoBack();
		    		}
				});
			},
			on:function(){
				return false;
			}
		});	
	},
	/**
	 * 
	 * 重新提交异常任务
	 * 
	 */
	resetSubmit:function (cellId,guid) {            
        var data = {       
            guid: guid
        };
        $.ajax({
            url: root+'/apps/marketing/resetErrorMarketing.do',
            type: "post",
            data: data,
            success: function (json) {
                if (json.isOK) {
                    try {                         
                        var cell = GetCellById(cellId);                        
                        DoDesign.clearNodeIcon(cell);
                        DoDesign.GoBack();
                    }catch (e) {
                        alert(e);
                    }
                } else {
                    alert(json.description);
                }
            },
            error: function (e) {
                alert('服务器访问失败！');
            }
        });
    },
    /**
     * 
     * 继续执行活动
     * 
     */
    reStartActivity:function()
    {
    	DoDesign.showCommonLoading();
         var data = { activityId: $("#hidActivityId").val() };
    	
    	saogaUI.ui.dialog.confirm({
			title:"提示",
			text:"您确定要继续执行活动吗?",
			ok:function(){
				$.ajax({
		            url: root+'/apps/marketing/reStartActivity.do',
		            type: "Post",
		            data: data,
		            success: function (json) 
		            {
		            	DoDesign.hideCommonLoading();
		                if (json.isOK) 
		                {
		                	DoDesign.GoBack();
		                } else 
		                {
		                    DoDesign.alert(json.description);
		                }
		            },
		            error: function (e) 
		            {
		            	DoDesign.hideCommonLoading();
		                DoDesign.alert('操作失败！');
		            }
		        });
				
			},
			on:function()
			{
				return false;
			}
		});	
    },
    
    /**
	 * 
	 * 积分活动
	 * 
	 */
	integralActivities:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_integralActivities = saogaUI.ui.pop({
 			id:'pop_integralActivities',
 			title:'积分活动',
 			isMaskClose:false,
 		    width:object.width,
 		    height:object.height,
 		    async:false,
 			ajax:root+'/apps/marketing/toIntegralActivities.do',
 			onloadFn:function()
 			{
 			    //隐藏和显示 时间
 				if(hidActivityType=="0")
  				{
  					$("#delayShow").hide();
  					$("#sendTimeShow").show();
  				}
  				else
  				{
  					$("#delayShow").show();
  					$("#sendTimeShow").hide();
  				}
  				//给隐藏域附值
  				$("#hidId").val(cellId);
  				$("#hidStyle").val(cellStyle);
  				$("#hidJsonData").val(jsonData);
  				$("#hidActivityType").val(hidActivityType);
  				//编辑时附值
  				var _obj=null ;
  				if(jsonData)
  				{
	  				_obj= JSON.parse(jsonData);
	  				$("#hidGuid").val(_obj.guid);
	  				$("#MarketingTaskTitle").val(_obj.nodeName);
	  				$("#sendTime").val(_obj.sendTime);
	  				$("#txtMarketingDelayHour").val(_obj.delayMinute);
	  				$("#selUMPActivity").val(_obj.selUmpActivity);
	  				$("#txtTaskRemark").val(_obj.remark);
  				}
  				//表单校验
  				$("#integralActivitiesForm").validate({
  				    rules:
  				    {
  							'MarketingTaskTitle' : {required:true},
  							'sendTime':{required:true},
  							'txtMarketingDelayHour':{required:true},
  							'selUMPActivity':{required:true}
  							
  					},	
  					messages:
  					{
  							'MarketingTaskTitle' : {required:"任务名称不为空"},
  							'sendTime':{required:"执行时间不能为空"},
  							'txtMarketingDelayHour':{required:"延时不能为空"},
  							'selUMPActivity':{required:"请选择活动名称"}						
  							
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
  				//
 			},
 			closeFn:function()
 			{
 			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(id)
						{
							if($("#integralActivitiesForm").valid())
							{
								SelMarketing();
								DoDesign.pop_integralActivities.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
 			
 		});
 		 DoDesign.selTab();
 		 DoDesign.btn_integralActivities = DoDesign.disableForm(jsonData,DoDesign.pop_integralActivities);
	},
	 /**
	 * 
	 * 店铺优惠券
	 * 
	 */
	coupon:function(object,cellStyle,cellId,jsonData,hidActivityType)
	{
		DoDesign.pop_coupon = saogaUI.ui.pop({
 			id:'pop_coupon',
 			title:'店铺优惠券',
 			isMaskClose:false,
 		    width:object.width,
 		    height:object.height,
 		    async:false,
 			ajax:root+'/apps/marketing/toCoupon.do',
 			onloadFn:function()
 			{
 			    //隐藏和显示 时间
 				if(hidActivityType=="0")
  				{
  					$("#delayShow").hide();
  					$("#sendTimeShow").show();
  				}
  				else
  				{
  					$("#delayShow").show();
  					$("#sendTimeShow").hide();
  				}
  				//给隐藏域附值
  				$("#hidId").val(cellId);
  				$("#hidStyle").val(cellStyle);
  				$("#hidJsonData").val(jsonData);
  				$("#hidActivityType").val(hidActivityType);
  				//编辑时附值
  				var _obj=null ;
  				if(jsonData)
  				{
	  				_obj= JSON.parse(jsonData);
	  				$("#hidGuid").val(_obj.guid);
	  				$("#MarketingTaskTitle").val(_obj.nodeName);
	  				$("#sendTime").val(_obj.sendTime);
	  				$("#txtMarketingDelayHour").val(_obj.delayMinute);
	  				$("#selCoupon").val(_obj.selCoupon);
	  				$("#selCoupon").change();
	  				$("#txtTaskRemark").val(_obj.remark);
  				}
  				//表单校验
  				$("#couponForm").validate({
  				    rules:
  				    {
  							'MarketingTaskTitle' : {required:true},
  							'sendTime':{required:true},
  							'txtMarketingDelayHour':{required:true},
  							'selCoupon':{required:true}
  							
  					},	
  					messages:
  					{
  							'MarketingTaskTitle' : {required:"任务名称不为空"},
  							'sendTime':{required:"执行时间不能为空"},
  							'txtMarketingDelayHour':{required:"延时不能为空"},
  							'selCoupon':{required:"请选择优惠券"}						
  							
  				    },
  				    errorPlacement: function(error, element)
  				    {
  				    	error.appendTo(element.parent());
  				    }
  				});
  				//
 			},
 			closeFn:function()
 			{
 			},
			btns:[
					{
						text:'保存',
						closePop:false,
						onclick:function(id)
						{
							if($("#couponForm").valid())
							{
								SelMarketing();
								DoDesign.pop_coupon.close();
							}
						}
					},
					{
						text: '关闭'
					}
				]
 			
 		});
 		 DoDesign.selTab();
 		 DoDesign.btn_coupon = DoDesign.disableForm(jsonData,DoDesign.pop_coupon);
	}
        
 //fn------------------end-------------------------
  };
})( window );


//另存为分组	
//function saveSubdivison(sender) {
//    $("#divSaveSubdivison").toggle();        
//}

