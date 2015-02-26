var emailTestEditor = null;

//短信条数计算规则
var yanshuSmsRule = null;
//是否允许店铺短信签名
var allowSmsSignature = null;

var editor;

//节点配置信息
var myNodeConfig = [
    { Name: "user", Type: "1", Title: "分组", SaveHidden: "#hidUserValues", html: "#divSubdivision", width: "600px", height: "460px", pHeight:"520px", viewHeight: "500px" },
//    { Name: "file", Type: "2", Title: "导入", SaveHidden: "#hidFileValues", html: "#divFileNode", width: "600px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "sms", Type: "3", Title: "短信", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "750px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "email", Type: "3", Title: "邮件", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "750px", height: "580px", pHeight: "580px", viewHeight: "580px" },
    { Name: "coupon", Type: "3", Title: "优惠券", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "700px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "eleCoupon", Type: "3", Title: "电子优惠券", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "700px", height: "430px", pHeight: "430px", viewHeight: "430px" },
    { Name: "promotion", Type: "3", Title: "满送|打折", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "700px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "lottery", Type: "3", Title: "彩票", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "700px", height: "530px", pHeight: "530px", viewHeight: "530px" },
    { Name: "ebook", Type: "3", Title: "电子书", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "700px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "integral", Type: "3", Title: "积分", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "700px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "integralActivities", Type: "3", Title: "积分活动", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "700px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "other", Type: "3", Title: "其他", SaveHidden: "#hidTaskValues", html: "#divMarketingContainer", width: "700px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "grade", Type: "4", Title: "等级修改", SaveHidden: "#hidCustomerValues", html: "#divCustomerGrade", width: "600px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "property", Type: "7", Title: "属性修改", SaveHidden: "#hidCustomerValues", html: "#divCustomerProperty", width: "700px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "union", Type: "5", Title: "合并", SaveHidden: "#hidNodeValues", html: "#divFilterNode", width: "600px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "join", Type: "5", Title: "交集", SaveHidden: "#hidNodeValues", html: "#divFilterNode", width: "600px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "pick", Type: "5", Title: "抽取", SaveHidden: "#hidNodeValues", html: "#divFilterNode", width: "600px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "sub", Type: "5", Title: "排除", SaveHidden: "#hidNodeValues", html: "#divFilterNode", width: "600px", height: "500px", pHeight: "500px", viewHeight: "500px" },
    { Name: "filter", Type: "5", Title: "筛选器", SaveHidden: "#hidNodeValues", html: "#divFilterNode", width: "920px", height: "570px", pHeight: "570px", viewHeight: "570px" },
    { Name: "analysis", Type: "6", Title: "分析", SaveHidden: "#hidAnalysisValues", html: "#divAnalysis", width: "750px", height: "550px", pHeight: "550px", viewHeight: "550px" }];

//判断规则 
//  user file filter 
//  sms email coupon promotion lottery other 
//  grade property 
//  union join sub pick analysis
// 1 : 分组 -> 【筛选】,【营销动作】,【逻辑操作】，【客户标记】，【分析】
// 2 ：导入 -> 【短信】
// 3 : 筛选 -> 【营销动作】,【逻辑操作】，【客户标记】，【分析】
// 4 : 动作 -> 【筛选】,【分析】
// 5 : 标记 -> 【筛选】
// 6 : 逻辑 -> 【筛选】,【营销动作】,【逻辑操作】,【客户标记】，【分析】
// 7 : 分析 -> 不能有子节点
// minSourceInput 最小输入
// maxSourceInput 最大输入
// minTargetOut   最小输出
var nodeRule =
			 [
			    { source: 'user', target: ['filter', 'sms', 'email', 'coupon','eleCoupon','integralActivities', 'promotion', 'lottery', 'other', 'ebook','integral', 'union', 'join', 'sub', 'pick', 'analysis', 'grade', 'property'], minSourceInput: 0, maxSourceInput: 0, minTargetOut: 1, ErrorRule: "【分组】节点后,只能连接【筛选】,【营销动作】,【客户标记】,【逻辑操作】,【分析】节点", ErrorUpper: "【分组】节点不能存在来源节点", ErrorDown: "【分组】节点不能没有子节点" },
//			    { source: 'file', target: ['sms'], minSourceInput: 0, maxSourceInput: 0, minTargetOut: 1, ErrorRule: "【导入】节点后,只能连接【短信】节点", ErrorUpper: "【导入】节点不能存在来源节点", ErrorDown: "【导入】节点不能没有子节点" },
			    { source: 'filter', target: ['filter', 'sms', 'email', 'coupon','eleCoupon','integralActivities', 'promotion','lottery', 'other','ebook','integral', 'union', 'join', 'sub', 'pick', 'analysis', 'grade', 'property'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 1, ErrorRule: "【筛选】节点后,只能连接【营销动作】,【客户标记】,【逻辑操作】,【分析】节点", ErrorUpper: "【筛选】节点只能存在一个来源节点", ErrorDown: "【筛选】节点不能没有子节点" },
			    { source: 'sms', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【短信】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【短信】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'email', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【邮件】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【邮件】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'coupon', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【优惠劵】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【优惠劵】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'eleCoupon', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【电子优惠劵】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【电子优惠劵】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'promotion', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【满减|打折】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【满减|打折】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'lottery', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【彩票】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【彩票】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'ebook', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【电子书】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【电子书】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'integral', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【积分】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【积分】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'integralActivities', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【积分活动】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【积分活动】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'other', target: ['filter', 'analysis'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【其他】节点后,只能连接【筛选】,【分析】节点", ErrorUpper: "【其他】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'grade', target: ['filter'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【等级修改】节点后,只能连接【筛选】节点", ErrorUpper: "【等级修改】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'property', target: ['filter'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【属性修改】节点后,只能连接【筛选】节点", ErrorUpper: "【属性修改】节点只能存在一个来源节点", ErrorDown: "" },
			    { source: 'union', target: ['sms', 'email', 'coupon','eleCoupon', 'promotion','lottery', 'other','ebook','integral', 'filter', 'union', 'join', 'sub', 'pick', 'analysis', 'grade', 'property'], minSourceInput: 1, maxSourceInput: 100, minTargetOut: 1, ErrorRule: "【合并】节点后,只能连接【筛选】,【逻辑操作】,【营销动作】,【客户标记】,【分析】节点", ErrorUpper: "【合并】节点限制在100个来源节点内", ErrorDown: "【合并】节点不能没有子节点" },
			    { source: 'join', target: ['sms', 'email', 'coupon', 'eleCoupon', 'promotion', 'lottery', 'other', 'ebook', 'integral', 'filter', 'union', 'join', 'sub', 'pick', 'analysis', 'grade', 'property'], minSourceInput: 1, maxSourceInput: 100, minTargetOut: 1, ErrorRule: "【交集】节点后,只能连接【筛选】,【逻辑操作】,【营销动作】,【客户标记】,【分析】节点", ErrorUpper: "【交集】节点限制在100个来源节点内", ErrorDown: "【交集】节点不能没有子节点" },
			    { source: 'pick', target: ['sms', 'email', 'coupon', 'eleCoupon', 'promotion', 'lottery', 'other', 'ebook', 'integral', 'filter', 'union', 'join', 'sub', 'pick', 'analysis', 'grade', 'property'], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 1, ErrorRule: "【抽取】节点后,只能连接【筛选】,【逻辑操作】,【营销动作】,【客户标记】,【分析】节点", ErrorUpper: "【抽取】节点只能存在一个来源节点", ErrorDown: "【抽取】节点不能没有子节点" },
			    { source: 'sub', target: ['sms', 'email', 'coupon', 'eleCoupon', 'promotion', 'lottery', 'other', 'ebook', 'integral', 'filter', 'union', 'join', 'sub', 'pick', 'analysis', 'grade', 'property'], minSourceInput: 1, maxSourceInput: 2, minTargetOut: 1, ErrorRule: "【排除】节点后,只能连接【筛选】,【逻辑操作】,【营销动作】,【客户标记】,【分析】节点", ErrorUpper: "【排除】节点只能存在两个来源节点", ErrorDown: "【排除】节点不能没有子节点" },
			    { source: 'analysis', target: [], minSourceInput: 1, maxSourceInput: 1, minTargetOut: 0, ErrorRule: "【分析】节点后,不允许连接子节点", ErrorUpper: "【分析】节点只能存在一个来源节点", ErrorDown: "" }
			];

//允许复制的节点
//注：1)筛选,排除 不进行节点复制; 2)交集,合并设置默认值,无需复制.
var canCopyNode = ['user', 'file', 'sms', 'email', 'coupon', 'eleCoupon', 'promotion', 'lottery', 'ebook', 'integral', 'integralActivities','other', 'analysis', 'grade', 'property', 'pick'];

//#region 设置节点默认值[合并,交集]

//设置节点默认值[合并,交集]
function SelNodeDefault(cellId, cellStyle) {
    try {       
        var nodeName = "";
        var nodeSendTime = $("#timetoday").val();
        var nodeSendHour = 0;
        var nodeSendMin = 0;
        var nodeRemark = "";
        var nodePercent = "";
        var baseNodeId = "";
        var targerNodeId = "";

        var smsOption = 0;
        var emailOption = 0;
        var umpOption = 0;
        var couponOption = 0;
        var customerSignOption = 0;
        var nodeUserFilter = "";


        if (cellStyle == 'union') 
        {
            nodeName += "合并";
        } else if (cellStyle == 'join')
        {
            nodeName += "交集";
        }

        //保存数据
        var data = {
            guid: cellId,
            cellId: cellId,
            cellStyle: cellStyle,
            nodeName: nodeName,
            sendTime: nodeSendTime,
            sendHour: nodeSendHour,
            sendMin: nodeSendMin,
            nodeRemark:nodeRemark,
            nodePercent: nodePercent,
            baseNodeId: baseNodeId,
            targerNodeId: targerNodeId,
            smsOption: smsOption,
            emailOption: emailOption,
            umpOption: umpOption,
            couponOption: couponOption,
            customerSignOption: customerSignOption,
            nodeUserFilter: nodeUserFilter,
            nodeUserFilterXml: ""
        };
        var jsonData = JSON.stringify(data);
        
        //保存临时数据
        SetCustomValue(cellStyle, cellId, jsonData);
        
       // $.colorbox.close();
    } catch(e) {
         DoDesign.alert(e);
    }
}

//#endregion

//#region 拷贝节点[分组,导入,动作,标记,分析] 不包含 [筛选,合并,交集,排除]

function SelNodeParse(cellId, cellStyle, cellValue) {
    try {        
        var fromCellId = "";
        var reg = new RegExp("cid='(\\d+)'", "g");
        var v = reg.exec(cellValue);
        if (v != null) {
            fromCellId = v[1];
        }        
        if (fromCellId != "") {
            var jsonData = GetCustomValue(cellStyle, fromCellId);         
            if(jsonData!="") {
                var jsonObject = JSON.parse(jsonData);
                jsonObject.cellId = cellId;
                jsonObject.guid = cellId;
                //增加复制节点值
                SetCustomValue(cellStyle, cellId, JSON.stringify(jsonObject));

                if (cellStyle == 'analysis' && IsPartEdit()) {
                    AddEditAnalysisNode(0, cellId, cellId);                    
                }
            }
        }
    } catch (e) {
         DoDesign.alert(e);
    }
}

//#endregion

//#region 修改节点

function EditNode(cell) {
    //先清空编辑数组,然后增加编辑节点
    currentEditCells = [];
    currentEditCells.push(cell);

    try {
        var cellId = cell.getId();
        var cellStyle = cell.getStyle();
       var hidActivityType = $("#hidActivityType").val();
        $.each(myNodeConfig, function (index, object) {
            if (object.Name == cellStyle) {
                ///start
                var jsonData = GetCustomValue(cellStyle, cellId);
         
                if(cellStyle=="user")//客户分组
                {
                	DoDesign.groupSet(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="filter")//筛选
                {
                	DoDesign.filter(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="grade")//等级修改
                {
                	DoDesign.grade(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="property")//属性修改
                {
                	DoDesign.property(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="analysis")//分析
                {
                	DoDesign.analysis(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="sms")//短信
                {
                	DoDesign.sendSMS(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="email")//邮件
                {
                	DoDesign.sendEmail(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="integral")//积分
                {
                	DoDesign.giveIntegral(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="other")//其它
                {
                	DoDesign.other(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="union")//合并
                {
                	DoDesign.union(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="join")//交集
                {
                	DoDesign.join(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="pick")//抽取
                {
                	DoDesign.pick(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="sub")//排除
                {
                	DoDesign.sub(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="integralActivities")//积分活动
                {
                	DoDesign.integralActivities(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                 if(cellStyle=="coupon")//优惠券
                {
                	DoDesign.coupon(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                return false;
            }
        });
        
        return false;
    } catch (e) {
    	 DoDesign.alert("异常"+e);
    }
}

//#endregion

//#region 批量修改节点

//批量修改 只能在可编辑的活动内使用
//批量修改 不能包含已执行的任务
//批量修改 不包含【排除,筛选】节点
//批量修改 不能包含相同节点
function BatchEditNodes(cells) {
	var tree_data = DoDesign.getTreeData();
    //清空编辑数组
    currentEditCells = [];
    var errorMsg = "";
    if (IsPartEdit()) {
        DoDesign.alert('已执行的活动,不支持批量修改功能!');
        return;
    }

    // 多个节点ID ','隔开
    var cellIds = "";
    var cellStyle = "";
    //支持批量修改的节点类型
    var canBatchNodeStyle = ['user', 'file', 'sms', 'email', 'coupon', 'promotion', 'integral','lottery', 'other', 'grade', 'property', 'union', 'join', 'pick', 'analysis'];
    //获取id,增加编辑节点,判断节点是否修改
    $.each(cells, function (index, object) {
        var curId = object.getId();
        var curStyle = object.getStyle();

        if (CellIsProcessed(curId, curStyle)) {
            errorMsg += "批量修改不能包含已执行节点！";
            return false;
        }

        //增加编辑节点
        currentEditCells.push(object);

        if (cellStyle == "") {
            cellStyle = curStyle;
        }

        if (!inArray(cellStyle, canBatchNodeStyle)) {
            errorMsg += "批量修改不能包含【排除,筛选】节点！";
            return false;
        }
        else if (cellStyle != curStyle) {
            errorMsg += "批量修改不能包含不同节点！";
            return false;
        }
        else {
            cellIds += curId + ',';
        }
    });

    if (errorMsg != "") {
        //清空编辑数组
        currentEditCells = [];
        DoDesign.alert(errorMsg);
    }
    else {
        //批量修改节点
        $.each(myNodeConfig, function (index, object) {
        
	        var hidActivityType = $("#hidActivityType").val();
       if (object.Name == cellStyle) {
                ///start
                var cellId = cellIds;
                var jsonData = GetCustomValue(cellStyle, cellIds.split(',')[0]);
                
                
         
                if(cellStyle=="user")//客户分组
                {
                	DoDesign.groupSet(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="filter")//筛选
                {
                	DoDesign.filter(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="grade")//等级修改
                {
                	DoDesign.grade(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="property")//属性修改
                {
                	DoDesign.property(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="analysis")//分析
                {
                	DoDesign.analysis(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="sms")//短信
                {
                	DoDesign.sendSMS(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="email")//邮件
                {
                	DoDesign.sendEmail(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="integral")//积分
                {
                	DoDesign.giveIntegral(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="other")//积分
                {
                	DoDesign.other(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="union")//合并
                {
                	DoDesign.union(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="join")//交集
                {
                	DoDesign.join(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="pick")//抽取
                {
                	DoDesign.pick(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                if(cellStyle=="sub")//排除
                {
                	DoDesign.sub(object,cellStyle,cellId,jsonData,hidActivityType);
                }
                
                return false;
            }
            /* if (object.Name == cellStyle) {
                var height = object.height;
                if ($("#hidCanEdit").val() == "0") {
                    height = object.viewHeight;
                }
           
                var paras = "?activityId=" + $("#hidActivityId").val() + "&nodeId=" + cellIds + "&nodeStyle=" + cellStyle;
                var temp_subdivsonId='0';
                var Batch_Edit_Node= saogaUI.ui.pop({
        			id:'Batch_Edit_Node',
        			title:object.Title,
        			isMaskClose:false,
        			width:object.width,
        			height:object.height,
        			async:false,
        			ajax:root+'/apps/marketing/toBatchEditNodes.do'+paras,
        			onloadFn:function(){
        				 if($("#nodeStyle").val()=="user"){
        				saogaUI.ui.select({//客户树 start
          					target: '#txtSubdivson',
          					selectedID:temp_subdivsonId,//
          					isTree:true,
          					data:tree_data,
          					downHeight:60,
          					downWidth:200,
          					cls:'ui-select-130',
          					onclickItem: function(name, id,pid)
          					{
          			            clearsub();//清除分组统计人数
          					},
          					onloadFn: function(obj)
          					{

          					}
          				   });//客户树 end
        				 }
        			},
        			closeFn:function(){
        			},
        			btns:[
        			      {
        			    	  text:'保存',
        			    	  closePop:false,
        			    	  onclick:function(id){
        			    		  if($("#nodeStyle").val()=="user"){
        			    			   		SelSubdivison();
            			    			  Batch_Edit_Node.close();
        			    			  
        			    		  }if($("#nodeStyle").val()=="file"){
        			    			  	  SelFileNode();
            			    			  Batch_Edit_Node.close();
            			    		 
        			    		  }if($("#nodeStyle").val()=="sms"){
        			    			   		SelMarketing() ;
            			    			  Batch_Edit_Node.close();
        			    		  }if($("#nodeStyle").val()=="email"){
        			    			   SelMarketing() ;
            			    			  Batch_Edit_Node.close();
        			    		  }if($("#nodeStyle").val()=="integral"){
        			    			  SelMarketing() ;
        			    			  Batch_Edit_Node.close();
        			    		  }if($("#nodeStyle").val()=="grade"){
        			    			  if(SelCustomerGrade()){
            			    			  Batch_Edit_Node.close();
            			    		  }
        			    		  }if($("#nodeStyle").val()=="property"){
        			    			  if(SelCustomerProperty()){
            			    			  Batch_Edit_Node.close();
            			    		  }
        			    		  }if($("#nodeStyle").val()=="union"){
        			    			  	  SelNode();
            			    			  Batch_Edit_Node.close();
        			    		  }if($("#nodeStyle").val()=="join"){
	        			    			  SelNode();
	        			    			  Batch_Edit_Node.close();
        			    			  
        			    		  }if($("#nodeStyle").val()=="pick"){
	        			    			  SelNode();
	        			    			  Batch_Edit_Node.close();
        			    			  
        			    		  }if($("#nodeStyle").val()=="analysis"){
        			    			  if(SelAnalysisNode()){
            			    			  Batch_Edit_Node.close();
            			    		  }
        			    			  
        			    		  }
        			    		 
        			    	  }
        			      },
        			      {
        			    	  text: '关闭'
        			      }
        			      ]
        			
        		});
                return false;
            }*/
        });
    }
}

//#endregion

//#region 节点打标,更新节点最新状态

//节点打标
function NodeMarking() {
    try {
        var cellGuids = new Array();
        var cells = new Array();

        var allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
        for (var i = 0; i < allCells.length; i++) {
            if (!allCells[i].isEdge()) {
                var jsonData = GetCustomValue(allCells[i].getStyle(), allCells[i].getId());
                if (jsonData != null && jsonData != "") {
                    var jsonObject = JSON.parse(jsonData);
                    cellGuids.push(jsonObject.guid);
                    cells.push(allCells[i]);
                }
            }
        }
        var data = {  activityId: $("#hidActivityId").val() };
       //显示名称完成人数
       $.ajax({
            url: root+'/apps/marketing/activityProgress.do',
            type: "post",
            data:data,
            success: function (jsons) {
                var isCompleted = true;
                $.each(jsons, function (index, object) {
                    var guid = object.guid;
                    var marketingManner = object.marketingManner;
                    var submitState = object.submitState;
                    var remark = object.remark;
                    var numberOfPeople = object.numberOfPeople;
                    var sendSuccessCount = object.sendSuccessCount;
                    if (submitState != 5) {
                        isCompleted = false;
                    }
                    if (sendSuccessCount == null) {
                        sendSuccessCount = 0;
                    }

                    for (var i = 0; i < cellGuids.length; i++) {
                        if (cellGuids[i] == guid) {
                            if (submitState == '5') {
                                //分析不需要显示人数
                                if (marketingManner != 10) {
                                    remark = "<span style='color:red;font-weight:bold;'>" + numberOfPeople + "</span>人";
                                }
                                //营销动作显示成功人数
                                if (marketingManner == 0 || marketingManner == 1 || marketingManner == 2 || marketingManner == 3 || marketingManner == 11 || marketingManner == 12 || marketingManner == 16 || marketingManner == 17 || marketingManner == 18 || marketingManner == 19) {
                                    remark = "<span style='color:red;font-weight:bold;'>" + sendSuccessCount + "</span>人/<span style='color:red;font-weight:bold;'>" + numberOfPeople + "</span>人";
                                }
                            }
                            ShowNodeMark(cells[i], submitState, remark);
                        }
                    }
                });
                //执行完成不在进行状态刷新
                if (isCompleted) {
                    window.clearInterval(remarkThread);
                }

            },error: function (e) {
                window.clearInterval(remarkThread);
                //alert('加载数据失败！');
            }
        });
    } catch (e) {
        window.clearInterval(remarkThread);
        //alert(e);
    }
}
 //显示节点状态
	function ShowNodeMark(cell, submitState, remark)
	{
	    if(submitState == -1) {
	        DoDesign.setNodeIcon(currentGraph, cell, 6,remark);
	    }
	    if(submitState == 3) {	            
	        DoDesign.setNodeIcon(currentGraph, cell, 3);
	    }
	    if(submitState == 9 || submitState == 7) {
	        DoDesign.setNodeIcon(currentGraph, cell, 9);
	    }
	    if(submitState == 1) {
	        DoDesign.setNodeIcon(currentGraph, cell, 10);
	    }
	    if(submitState == 5) {	           
	        DoDesign.setNodeIcon(currentGraph, cell, 5,remark);
	    }
	    if(submitState == 2 || submitState == 4) {
	        DoDesign.setNodeIcon(currentGraph, cell, 4);
	    }
	    if(submitState == 8) {
	        DoDesign.setNodeIcon(currentGraph, cell, 8);
	    }
	    if(submitState == 6) {
	        if(cell.getStyle() == "lottery") {
	            DoDesign.setNodeIcon(currentGraph, cell, 17);
	        }
	        else if(cell.getStyle() == "ebook") {
	            DoDesign.setNodeIcon(currentGraph, cell, 18);
	        }
            else {
	            DoDesign.setNodeIcon(currentGraph, cell, 7);
	        }
	    }
	        
	}	
//#endregion

//#region 标记任务节点为执行中修改 【营销动作】
//function AddEditNode(guid) {
//    guid = "[" + guid + "]";
//    var editNodeGuids = $("#hidTasksEdit").val();
//    if (editNodeGuids.indexOf(guid) < 0) {
//        $("#hidTasksEdit").val(editNodeGuids + "," + guid);
//    }
//}
//#endregion

//#region 标记分析节点执行中新增/修改 0：新增节点 1：修改节点  [0|id|guid|sourceguid],[1|id|guid|sourceguid]

function AddEditAnalysisNode(type, cellId, guid) {
    var item = "[" + type + "|" + cellId + "|" + guid + "|0]";
    var editItems = $("#hidAnalysisEdit").val();
    if (editItems.indexOf(item) == -1) {
        $("#hidAnalysisEdit").val(editItems + "," + item);
    }
}

//#endregion

//#region 数据保存、获取、删除

//获取指定类型全部数据
function GetAllCustomValue(cellStyle) {
    var values = "";
    var temp = "";
    $.each(myNodeConfig, function (index, object) {
        if (object.Name == cellStyle) {
            temp = $(object.SaveHidden).val();
            return false;
        }
    });
   
    values = UrlDecode(temp);//取值转码
    var allValues = new Array();

    if (values.length > 0) {
        //存在
        var reg = new RegExp("\\{\\[\\d+\\]=\\[(.*?)\\]\\}", "g");
        var v = reg.exec(values);

        while (v != null) {
            allValues.push(v[1]);
            v = reg.exec(values);
        }
        
        return allValues;
    } else {
        //不存在
        return allValues;
    }
}

//获取键值
function GetCustomValue(cellStyle, key) {
    var values = "";
    var temp = "";
    $.each(myNodeConfig, function (index, object) {
        if (object.Name == cellStyle) {
            temp = $(object.SaveHidden).val();
        	//alert(values);
            return false;
        }
    });
    
    
    values = UrlDecode(temp);//取值转码
    if (values.indexOf('[' + key + ']') > 0) {
        //存在
        var reg = new RegExp("\\{\\[" + key + "\\]=\\[(.*?)\\]\\}", "g");
        var v = reg.exec(values);
        if (v != null) {
            return v[1];    
        } else {
            return "";
        }
    } else {
        //不存在
        return "";
    }
}

//设置键值
function SetCustomValue(cellStyle, key, value) {
    //替换可能存在的标记值
    var regSpecial = new RegExp("\\]\\}", "g");
    value = value.replace(regSpecial, "] }");

    //旧值
    var values = "";
    var temp = "";
    //保存数据的隐藏域
    var saveHidden;
    $.each(myNodeConfig, function (index, object) {
        if (object.Name == cellStyle) {
            saveHidden = $(object.SaveHidden);
            temp =$(object.SaveHidden).val();
            return false;
        }
    });
    values = UrlDecode(temp);//取值转码
    var newValue = '{[' + key + ']=[' + value + ']}';
    if (values.indexOf('[' + key + ']') > 0) {
        //替换
        var regSpecial2 = new RegExp("\\$", "g");
        newValue = newValue.replace(regSpecial2, "$$$");

        //存在
        var reg = new RegExp("\\{\\[" + key + "\\]=\\[.*?\\]\\}", "g");
        values = values.replace(reg, newValue);
        $(saveHidden).val(encodeURIComponent(values));
    } else {
        //不存在
        $(saveHidden).val(encodeURIComponent(values + newValue));
    }
    //设置数据被改变
    isChange = 1;
}

//删除键值
function DeleteCustomerValue(cellStyle, key) {
    var values = "";
    var saveHidden;
    var temp = "";
    $.each(myNodeConfig, function (index, object) {
        if (object.Name == cellStyle) {
            saveHidden = $(object.SaveHidden);
            temp = $(object.SaveHidden).val();
            return false;
        }
    });
    
    values = UrlDecode(temp);//取值转码
    if (values.indexOf('[' + key + ']') > 0) {
        //存在
        var reg = new RegExp("\\{\\[" + key + "\\]=\\[.*?\\]\\}", "g");
        values = values.replace(reg, "");
        $(saveHidden).val(encodeURIComponent(values));
    }
    //设置数据被改变
    isChange = 1;
}

//清空所有节点数据
function ClearCustomerValue() {
    $("#hidTaskValues").val("");
    $("#hidNodeValues").val("");
    $("#hidUserValues").val("");
    $("#hidFileValues").val("");
    $("#hidAnalysisValues").val("");
    $("#hidCustomerValues").val("");
}

//#endregion

//#region 发送测试

function ChannelTest() {   
	 var pop_channelTests= saogaUI.ui.pop({
			id:'channelTests',
			title:'发送测试',
			isMaskClose:false,
			width:'700px',
			height:'460px',
			async:false,
			ajax:root+'/apps/marketing/toChannelTests.do',
			onloadFn:function(){
			},
			closeFn:function(){
			},
			btns:[
			      {
			    	  text:'保存',
			    	  closePop:false,
			    	  onclick:function(id){
//			    		  alert(SendChannelTest());
			    		  if(SendChannelTest()){
			    		  pop_channelTests.close();
			    		  }
			    		
			    	  }
			      },
			      {
			    	  text: '关闭'
			      }
			     ]
		});
}

//解码 错误则返回原文
function DesginDecodeURIComponent(content) {
    try {
        return decodeURIComponent(content);
    } catch(e) {
        return content;
    }
}

//改变测试类型
function changeChannelTestType(obj) {    
    if ($(obj).val() == 0) {
        //短信        
        $("#spanChannelType").html("手机号：");
        $("#trTestTemplateMsgLenght").show();
        $("#trTestSmsSign").show();
        $("#selTestSms").show();
        $("#selTestEmail").hide();
        $("#selTestSms").val("");        
        
        //$("#TestTemplate").xheditor(false);
        editor.destroy();
        
        $("#selTestSms").change();
    }
    if ($(obj).val() == 2) {
        //邮件
        $("#spanChannelType").html("收件箱：");
        $("#trTestTemplateMsgLenght").hide();
        $("#trTestSmsSign").hide();
        $("#selTestSms").hide();
        $("#selTestEmail").show();
        $("#selTestEmail").val("");        

        editor = new UE.ui.Editor({
            initialFrameHeight: 120, initialFrameWidth: 553
        });

        editor.render('TestTemplate'); //将编译器渲染到容器 
        //editor.execCommand('insertHtml', "asdfasdfas");
        //editor.execCommand('insertHtml', values);
        
        $("#selTestEmail").change();
        
        //$("#TestTemplate").xheditor(false);
        //emailTestEditor = $("#TestTemplate").xheditor({ skin: 'vista', tools: 'Blocktag,Fontface,Bold,Italic,Underline,Strikethrough,|,FontColor,BackColor,|,Img,Hr,Table,|,Source,Print' });
        QuickTip();
    }
}

//字数统计
function TestTotalMsgNum(sender) {    
    CalculateSmsNumNew(sender, "testTemplateLengthMsg", true, false, "spanTestSmsSign");
}

//发送短信/邮件
function SendChannelTest(obj) {
    var button = $(obj);

    var type = $("input[type='radio'][name='ChannelType']:checked").val();
    var targets = $("#sendObjAdd").val();
    var content = $("#TestTemplate").val();   
    var targetObj = targets.split(',');
    var isExistSendObj = false;
    var errorMsg = '';
    
    $("#divTestErrorMsg").hide();
    button.prop("disabled", true);   hidTaskValues 

    if ($.trim(targets) == "") {
        if (type == 0) {
            errorMsg += "请输入手机号！ ";
        }
        if (type == 2) {
            errorMsg += "请输入邮件地址！ ";
        }
    }
    if ($.trim(content) == "") {
        errorMsg += '请填写发送内容！ ';
    }

    if (targetObj.length > 5000) {
        //errorMsg = "因最近央视曝光垃圾短信事件影响较大，故暂时关闭本页面短信批量发送功能（互动营销除外），给你造成不便，请您理解与支持！";
        errorMsg = "不能超过5000条！";
    } else {
        if (type == 0) {
            //短信
            var patrn = /^1[3|4|5|8][0-9]\d{4,8}$/ ;
            for (var i = 0; i < targetObj.length; i++) {
                if ($.trim(targetObj[i]) != "") {
                    if (!patrn.exec(targetObj[i])) {
                        errorMsg += "第" + (i + 1) + "个手机号码[" + targetObj[i] + "]格式错误！";
                        break;
                    } else {
                        isExistSendObj = true;
                    }
                }
            }
        }
        if (type == 2) {
            //邮件
            var patrn = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/ ;
            for (var i = 0; i < targetObj.length; i++) {
                if ($.trim(targetObj[i]) != "") {
                    if (!patrn.exec(targetObj[i])) {
                        errorMsg += "第" + (i + 1) + "个邮箱地址[" + targetObj[i] + "]格式错误！";
                        break;
                    } else {
                        isExistSendObj = true;
                    }
                }
            }
        }
    }
    
    if (errorMsg != '') {
        $("#divTestErrorMsg").html(errorMsg).show();
        button.prop("disabled", false);
        return;
    }
    if (isExistSendObj) {
        var data = { objAdd: targets, sendContent: encodeURIComponent(content), type: type };
        var reqUrl = "/StepMarketing/TestSendMarkentChannel";
        ajaxDone(reqUrl, data, function (json) {
            button.prop("disabled", false);
            
            if (json.IsOK) {
                DoDesign.alert("提交成功！");
            } else {
                var strError = '';
                if (json.ErrorStr != null && json.ErrorStr.length > 0) {
                    strError += "号码错误：" + json.ErrorStr;
                }
                if (json.RepeatStr != null && json.RepeatStr.length > 0) {
                    strError += "号码重复：" + json.RepeatStr;
                }
                if (json.FailureStr != null && json.FailureStr.length > 0) {
                    strError += "发送失败：" + json.FailureStr;
                }
                if (json.Message != null && json.Message.length > 0) {
                    strError += "失败原因：" + json.Message;
                }
                $("#divTestErrorMsg").html(strError);
                $("#divTestErrorMsg").show();
            }
        });
    } else {
        $("#divTestErrorMsg").html('无有效发送地址').show();
        button.prop("disabled", false);
        return;
    }
}

//选择模板
function changeTestTemplate(type) {
    var content = '';

    if (type == 0) {
        content = DesginDecodeURIComponent($("#selTestSms").find("option:checked").val());
        $("#TestTemplate").val(content);

        TestTotalMsgNum($("#TestTemplate"));
    }
    if (type == 2) {
        //$("#TestTemplate").xheditor(false);
        content = DesginDecodeURIComponent($("#selTestEmail").find("option:checked").val());
        //$("#TestTemplate").val(content);
        //editor.setContent(content, false);
        editor.html(content);//change
        //emailTestEditor = $("#TestTemplate").xheditor({ skin: 'vista', tools: 'Blocktag,Fontface,Bold,Italic,Underline,Strikethrough,|,FontColor,BackColor,|,Img,Hr,Table,|,Source,Print' });
    }
}

//#endregion

//#region 退出提醒

function QuickTip() {
    window.onbeforeunload = function(event) {
        if (isChange == 1) {
            event.returnValue = "数据未保存,确定离开当前页面吗？";
        }
    };
}

//#endregion

//#region mxGraph

//获取指定ID的节点
function GetCellById(cellId, allCells) {
    if (typeof (allCells) == 'undefined') {
        allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
    }
    for (var i = 0; i < allCells.length; i++) {
        if (allCells[i].getId() == cellId) {
            return allCells[i];
        }
    }
    return null;
}
//获取节点数
function GetTaskCellCount() {
    var taskCellCount = 0;
    var allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
    for (var i = 0; i < allCells.length; i++) {
        if (!allCells[i].isEdge()) {
            taskCellCount++;
        }
    }
    return taskCellCount;
}
//获取指定样式节点
function GetCellsByStyle(cellStyle, allCells) {
    var cellArray = new Array();
    if (typeof (allCells) == 'undefined') {
        allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
    }
    for (var i = 0; i < allCells.length; i++) {
        if (allCells[i].getStyle() == cellStyle) {
            cellArray.push(allCells[i]);
        }
    }
    return cellArray;
}
//获取节点的目标
function GetTargetCells(cellId, allEdgess) {
    if (typeof (allEdgess) == 'undefined') {
        allEdgess = currentGraph.getChildEdges(currentGraph.getDefaultParent());
    }
    var childs = new Array();
    for (var i = 0; i < allEdgess.length; i++) {
        if (allEdgess[i].source != null && cellId == allEdgess[i].source.getId()) {
            if (allEdgess[i].target != null) {
                childs.push(allEdgess[i].target);
            }
        }
    }
    return childs;
}
//获取节点的来源
function GetSourceCells(cellId, allEdgess) {
    if (typeof (allEdgess) == 'undefined') {
        allEdgess = currentGraph.getChildEdges(currentGraph.getDefaultParent());
    }
    var sourceCells = new Array();
    for (var i = 0; i < allEdgess.length; i++) {
        if (allEdgess[i].target != null && allEdgess[i].target.getId() == cellId) {
            if (allEdgess[i].source != null) {
                sourceCells.push(allEdgess[i].source);
            }
        }
    }
    return sourceCells;
}
//加载样式
function configureStylesheet(graph) {
    var style = new Object();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_LEFT;
    style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
    //style[mxConstants.STYLE_SPACING_TOP] = '56';
    style[mxConstants.STYLE_GRADIENTCOLOR] = '#7d85df';
    style[mxConstants.STYLE_STROKECOLOR] = '#5d65df';
    style[mxConstants.STYLE_FILLCOLOR] = '#adc5ff';
    style[mxConstants.STYLE_FONTCOLOR] = '#1d258f';
    style[mxConstants.STYLE_FONTFAMILY] = '微软雅黑';
    style[mxConstants.STYLE_FONTSIZE] = '12';
    style[mxConstants.STYLE_FONTSTYLE] = '1';
    style[mxConstants.STYLE_ROUNDED] = '1';
    style[mxConstants.STYLE_IMAGE_WIDTH] = '24';
    style[mxConstants.STYLE_IMAGE_HEIGHT] = '24';
    style[mxConstants.STYLE_OPACITY] = '80';
    style[mxConstants.STYLE_RESIZABLE] = false;
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
    graph.getStylesheet().putDefaultVertexStyle(style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] =root+ '/resources/js/mxGraph/images/icons24/user.png';
    graph.getStylesheet().putCellStyle('user', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] =root+ '/resources/js/mxGraph/images/icons24/user.png';
    graph.getStylesheet().putCellStyle('file', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/sms.png';
    graph.getStylesheet().putCellStyle('sms', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/email.png';
    graph.getStylesheet().putCellStyle('email', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/coupon.png';
    graph.getStylesheet().putCellStyle('coupon', style);
    
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/eleCoupon.png';
    graph.getStylesheet().putCellStyle('eleCoupon', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/promotion.png';
    graph.getStylesheet().putCellStyle('promotion', style);

	style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/promotion.png';
    graph.getStylesheet().putCellStyle('integralActivities', style);
    
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/lottery.png';
    graph.getStylesheet().putCellStyle('lottery', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/ebook.png';
    graph.getStylesheet().putCellStyle('ebook', style);
    
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/integral.png';
    graph.getStylesheet().putCellStyle('integral', style);
    
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/other.png';
    graph.getStylesheet().putCellStyle('other', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/grade.png';
    graph.getStylesheet().putCellStyle('grade', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/property.png';
    graph.getStylesheet().putCellStyle('property', style);


    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/union.png';
    graph.getStylesheet().putCellStyle('union', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/join.png';
    graph.getStylesheet().putCellStyle('join', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/pick.png';
    graph.getStylesheet().putCellStyle('pick', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/sub.png';
    graph.getStylesheet().putCellStyle('sub', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/filter.png';
    graph.getStylesheet().putCellStyle('filter', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_IMAGE] = root+ '/resources/js/mxGraph/images/icons24/analysis.png';
    graph.getStylesheet().putCellStyle('analysis', style);

    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
    style[mxConstants.STYLE_STROKEWIDTH] = '1';
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
};
//增加顶部按钮
function addToolbarButton(editor, toolbar, action, label, iconClass, isTransparent) {
    var button = document.createElement('a');    
    button.setAttribute("href", "javascript:void(0);");
    //button.style.marginRight = '4px';
    //button.style.padding-left: 2px; padding-right: 2px;

    //var button = $("<a><i class=\"icon-save\"></i>保存</a>");
    if (iconClass != null) {
        var icon = document.createElement('i');
        icon.setAttribute('class', iconClass);
        button.appendChild(icon);
        
        var title = document.createElement('p');
        title.innerHTML = label;
        button.appendChild(title);
    }
    
    //button.style.fontSize = '10';
    //if (image != null) {
    //    var img = document.createElement('img');
    //    img.setAttribute('src', image);
    //    img.style.width = '16px';
    //    img.style.height = '16px';
    //    img.style.verticalAlign = 'middle';
    //    img.style.marginRight = '2px';
    //    button.appendChild(img);
    //}
    //if (isTransparent) {
    //    button.style.background = 'transparent';
    //    button.style.color = '#FFFFFF';
    //    button.style.border = 'none';
    //}
    
    mxEvent.addListener(button, 'click', function (evt) {
        editor.execute(action);
    });
    mxUtils.write(button,"");
    //mxUtils.write(button, label);
    toolbar.appendChild(button);
};
//增加左侧操作按钮
function addSidebarIcon(graph, sidebar, value, opbutton, width, height, style) {
    var funct = function (graph, evt, cell, x, y) {
        var parent = graph.getDefaultParent();
        var model = graph.getModel();

        var v1 = null;

        model.beginUpdate();
        try {
            v1 = graph.insertVertex(parent, null, value, x, y, width, height, style);
            v1.setConnectable(true);
        } finally {
            model.endUpdate();
        }

        graph.setSelectionCell(v1);
    };

    // Creates the image which is used as the sidebar icon (drag source)
    //var img = document.createElement('img');
    //img.setAttribute('src', image);
    //img.style.width = '48px';
    //img.style.height = '48px';
    //img.title = 'Drag this to the diagram to create a new vertex';
    //sidebar.appendChild(img);

    var dragElt = document.createElement('div');
    dragElt.style.border = 'dashed black 1px';
    dragElt.style.width = width + 'px';
    dragElt.style.height = height + 'px';

    // Creates the image which is used as the drag icon (preview)
    var ds = mxUtils.makeDraggable(opbutton, graph, funct, dragElt, 0, 0, true, true);
    ds.setGuidesEnabled(true);
};
/*
* 节点是否允许删除
*
* 营销节点删除限制：
* 1：活动不允许编辑,且非本次添加节点,不允许删除
* 2：节点任务已被实际执行(不包括预执行),不允许删除
*/
function CellIsCanDelete(cell) {
    if(!cell.isEdge()) {
        var cellId = cell.getId();
        var cellStyle = cell.getStyle();
        var jsonData = GetCustomValue(cellStyle, cellId);
        
        if(jsonData != "") {
            var jsonObject = JSON.parse(jsonData);
            var guid = jsonObject.guid;
            if (guid.length >= 32) {
                //已执行的节点不能被删除
                //已设置的节点,且不允许编辑的活动不能删除                
                if ($("#hidProcessedCells").val().indexOf('[' + guid + ']') > -1 || $("#hidCanEdit").val() == "0") {
                    return false;
                }
                else {
                    return true;
                }
            } else {
                return true;
            }
        }
        else {
            return true;
        }
    } else {
        //连线 判断连线目标是否允许删除
        if (cell.target != null) {
            if(!cell.target.isEdge()) {
                return CellIsCanDelete(cell.target);
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }        
    }
}

/*
* 节点是否允许修改
*
* 营销节点修改限制：
* 1：活动不允许编辑,且非本次添加节点,不允许修改
* 2：节点任务已被实际执行(不包括预执行),不允许修改
*/
function IsCanEditNode(guid) {  
    //已执行
    if ($("#hidProcessedCells").val().indexOf('[' + guid + ']') > -1) {
        return false;
    }
    //非模板且活动状态不允许编辑
    if ($("#hidActivityType").val() != "2" && $("#hidCanEdit").val() == "0") {
        return false;
    }
    //模板且无权限
    if ($("#hidActivityType").val() == "2" && $("#hidPower").val() == "0") {
        return false;
    }

    return true;
}

//节点是否已经执行
function CellIsProcessed(cellId,cellStyle) {
    var jsonData = GetCustomValue(cellStyle, cellId);    
    if (jsonData != "") {
        var jsonObject = JSON.parse(jsonData);

        //已执行
//        if ($("#hidProcessedCells").val().indexOf('[' + jsonObject.guid + ']') > -1) {
//            return true;
//        } else {
//            return false;
//        }
        return false;
    } else {
        return false;
    }
}

/*
* 设置节点值
*
* 设置内容：
* 1：节点标题
* 2：节点状态
* 3：节点JSON数据
*/
function SetCurrentCellData(cellId, cellStyle, cellValue, jsonData) {
    var isExit = false;
    for (var i = 0; i < currentEditCells.length; i++) {
        if (currentEditCells[i].getId() == cellId) {
            //设置分组名称
            currentEditCells[i].setValue(cellValue);
            //保存节点选择分组ID
            SetCustomValue(cellStyle, cellId, jsonData);
            //设置完成
            DoDesign.setNodeIcon(currentGraph, currentEditCells[i], 1);
            isExit = true;
        }
    }    
    if(!isExit){
        DoDesign.alert('设置节点ID与当前编辑节点ID不同！');
    }else{
    	return true;
    }
}

//#endregion

//#region 自动计算节点发送时间【逻辑节点,客户标记】节点
/*
* 自动计算节点发送时间
* 自动计算的节点：逻辑节点,客户标记节点
*/
function CalculateNodeSendTime(cells, allEdgess) {
    try {
        for (var i = 0; i < cells.length; i++) {
            var cellId = cells[i].getId();
            var cellStyle = cells[i].getStyle();
            if (inArray(cellStyle, ['union', 'join', 'sub', 'pick', 'grade', 'property'])) {
                var jsonData = GetCustomValue(cellStyle, cellId);
                if (jsonData != "") {
                    var jsonObject = JSON.parse(jsonData);                   
                    
                    var timeTicks = 0;
                    var sources = GetSourceCells(cellId, allEdgess);
                    if (sources != null && sources.length > 0) {
                        for (var j = 0; j < sources.length; j++) {
                            var jsonDataSource = GetCustomValue(sources[j].getStyle(), sources[j].getId());
                            if (jsonDataSource != '') {                               
                                var jsonObjectSource = JSON.parse(jsonDataSource);
                                //var sourceTimeTicks = Date.parse(jsonObjectSource.sendTime) + parseInt(jsonObjectSource.sendHour) * 60 * 60 * 1000 + parseInt(jsonObjectSource.sendMin) * 60 * 1000;
                                var sourceTimeTicks = Date.parse(jsonObjectSource.sendTime) ;//+ parseInt(jsonObjectSource.sendHour) * 60 * 60 * 1000 + parseInt(jsonObjectSource.sendMin) * 60 * 1000;

                                if (timeTicks < sourceTimeTicks) {
                                    //节点时间应小于子节点
                                    jsonObject.sendTime = jsonObjectSource.sendTime;
                                    //jsonObject.sendHour = jsonObjectSource.sendHour;
                                    //jsonObject.sendMin = jsonObjectSource.sendMin;
                                    jsonData = JSON.stringify(jsonObject);
                                    SetCustomValue(cellStyle, cellId, jsonData);
                                    timeTicks = sourceTimeTicks;
                                }
                            }
                        }
                    }
                }
            }
        }

    } catch (e) {
        DoDesign.alert("自动计算逻辑节点时间异常：" + e);
    }
}

//#endregion

//#region 营销模板

//选择历史模板
function SelHistoryActivity(obj) {
    //加载XML
    try {        
        var guid = $(obj).attr("tag");
        var xml = $(obj).attr("xml");
        
        if (xml == "" && typeof (guid) != 'undefined') {
            LoadCloudTemplateXML(guid);
        } else {
            //showCommonLoading();
            LoadGraphXMLByTemplate(DoDesign.UrlDecode(xml));
           // DoDesign.hideCommonLoading();
        }        
    } catch(e) {
        alert(e);
    }
}

//加载云模板列表
function LoadCloudTemplate() {
  /*  $.ajax({
        url: "/StepMarketing/GetYSActivityTemplate",
        type: "post",
        data: { templateType: 1 },
        success: function (json) {
            if (json.IsOK) {
                $.each(json.ReturnValue, function (name, value) {
                    $("#cloudTemplate").append("<li><span class='liItem' onclick=\"SelHistoryActivity(this)\" xml='' tag=" + value + ">" + name + "</span></li>");
                });
            }
        }
    });*/
}

//加载云模板详情
function LoadCloudTemplateXML(guid) {
    showCommonLoading();

    $.ajax({
        url: "/StepMarketing/GetYSActivityTemplateDetail?guid=" + guid,
        type: "post",
        success: function (json) {
            DoDesign.hideCommonLoading();

            try {

                if (json.ReturnStr != "") {
                    var config = json.ReturnStr.toString();
                    //去掉换行
                    config = config.replace(/\n/g, "");

                    //替换配置
                    var loadConfig = {
                        type: ["xml", "task", "node", "analysis", "sign"],
                        reg: ["<--xml-->(.*?)<--xml-->",
                            "<--task-->(.*?)<--task-->",
                            "<--node-->(.*?)<--node-->",
                            "<--analysis-->(.*?)<--analysis-->",
                            "<--sign-->(.*?)<--sign-->"],
                        hidden: ["", "hidTaskValues", "hidNodeValues", "hidAnalysisValues", "hidCustomerValues"]
                    };

                    $.each(loadConfig.reg, function (index, value) {
                        var reg = new RegExp(value);
                        var r = reg.exec(config);

                        if (r != null) {
                            var content = r[0];
                            content = $.trim(content.replace(new RegExp("<--" + loadConfig.type[index] + "-->", "g"), ""));

                            if (loadConfig.type[index] == "xml") {
                                //加载XML
                                LoadGraphXMLByTemplate(content);
                            } else {
                                //设置节点数据
                                $("#" + loadConfig.hidden[index]).val(content);
                            }
                        }
                    });

                }

            } catch (e) {
                alert(e);
            }
        },
        error: function (e) {
            DoDesign.hideCommonLoading();
            alert('加载模板失败！');
        }
    });

}

//加载XML
//1）使用不同类型活动模板,内容进行切换
//2）清空当前设置的节点值
//3）重新获取所有当前节点ID
function LoadGraphXMLByTemplate(xml) {
    try {

        if ($("#hidCanEdit").val() == "1") {
            //日期时间            
            var dateRegex = new RegExp("value=\"([^\"]*?)nodeDateTip([^\"]*?)[\\d-]{10}([^\"]*?)br/&gt;([^\"]*?)\"", "g");
            //延时时间
            var timeRegex = new RegExp("value=\"([^\"]*?)nodeDateTip([^\"]*?)延时([^\"]*?)br/&gt;([^\"]*?)\"", "g");
            
            //使用不同类型活动模板,替换掉提示时间
            if ($("#hidActivityType").val() == "2") {
                xml = xml.replace(dateRegex, "value=\"$4\"");
            } else {
                xml = xml.replace(timeRegex, "value=\"$4\"");
            }
            
            if (xml == "") {
                xml = '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>';
            }

            //清空数据
          //  ClearCustomerValue();

            //加载界面
            var doc = mxUtils.parseXml(xml);
            var dec = new mxCodec(doc);
            dec.decode(doc.documentElement, currentGraph.getModel());

            //重新获取所有节点ID
            if (currentGraph != null) {
                allCellIds = new Array();
                var allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
                for (var i = 0; i < allCells.length; i++) {
                    allCellIds.push(allCells[i].getId());
                }
            }
        } else {
            DoDesign.alert('当前活动已执行,不允许使用模板替换！');
        }
    } catch (e) {
        alert(e);
    }
}

//标记/取消 模板标记
var pop_sign;
function SignAsTemplate(sender) {
    var type = $(sender).attr("tag");

    //取消模板标记
    if (type == 0) {
        var data = { shopId: 0, type: type, activityId: $("#hidActivityId").val(), templateName: "" };

        $.ajax({
            url: root+'/apps/marketing/signTP.do',
            data: data,
            type: "post",
            success: function (res) {
                if (res) {
                    //更改提示
                    SignTemplateComplated(1);
                } else {
                    DoDesign.alert('操作失败！');
                }
            },
            error: function (e) {
                DoDesign.alert('服务器访问失败！');
            }
        });
    }

    //模板标记
    if (type == 1) {
         pop_sign =saogaUI.ui.pop({
			isMaskClose:false,
		    title:"标记为模板",			 
		    width:320,
		    height:40,
		    ajax:root+'/apps/marketing/toSignTP.do',
		    //html: $("#signActivityTemplate").html(),//saogaUI.template('signActivityTemplate', data),
			onloadFn:function(){
				$("#txtSignActivityName").val($("#hidActivityName").val());
			},
			closeFn:function(){
				
			},
			btns:[
				{
					text:'保存',
					closePop:false,
					onclick:function(){
						SaveActivityTemplate(this)
					}
				},
				{
					text: '关闭'
				}
			]
			
		});
	
        
       $("#selShopList").hide();
        $("#txtSignTempShopName").show();
        $("#hidTemplateSaveType").val("0");
        $("#hidTemplateActivitiesID").val($("#hidActivityId").val());
    }

}
//保存活动模板
function SaveActivityTemplate(sender) {
    try {
        
        var actId = $("#hidTemplateActivitiesID").val();
        var tempName = $("#txtSignActivityName").val();
        var shopId = 0;
        //另存为其它店铺
        if ($("#hidTemplateSaveType").val() == "1") {
            shopId = $("#selShopList").val();
        }

        $("#signTemplateError").hide();
        if ($.trim(tempName) == "") {
            $("#signTemplateError").html("不能为空");
            $("#signTemplateError").show();
            return;
        }

        $(sender).prop("disabled", true);
        
        var data = { shopId: shopId, type: 1, activityId: actId, templateName: encodeURIComponent(tempName) };

        $.ajax({
            url: root+'/apps/marketing/signTP.do',
            data: data,
            type: "post",
            success: function (res) {
                if (res) {
                    if (shopId == 0) {
                        SignTemplateComplated(0);
                    }
                   DoDesign.alert('保存成功！');
                    pop_sign.close();
                    return true;
                }
                else {
                    DoDesign.alert('保存失败！');
                    return false;
                }
            },
            error: function (e) {
                DoDesign.alert('服务器访问失败！');
            }
        });
    } catch (e) {
        alert(e);
    }
}
//标记完成
function SignTemplateComplated(type) {
    var tip = "";
    if (type == 1) {
        tip = "标记为模板";
    } else {
        tip = "取消模板标记";
    }

    $(".ahrefTemplateAction").html(tip);
    $(".ahrefTemplateAction").attr("tag", type);
}

//模板另存为
function SaveToOtherShop(sender, activityId, activityName) {
    window.parent.$.colorbox({ html: $("#signActivityTemplate").html(), title: "另存为", width: "400px", height: "180px" });
    window.parent.$("#txtSignActivityName").val(activityName);
    window.parent.$("#hidTemplateActivitiesID").val(activityId);
    window.parent.$("#hidTemplateSaveType").val("1");
}

//删除模板标记
function DeleteTemplate(sender, activityId) {
    var data = { shopId: 0, type: 0, activityId: activityId, templateName: "" };
    window.parent.Confirm("是否取消标记？", function () {
        $.ajax({
            url: "/StepMarketing/SaveActivityGraphToShop",
            data: data,
            type: "post",
            success: function (json) {
                if (json.IsOK) {
                    $(sender).parent().parent().remove();
                } else {
                    DoDesign.alert('删除失败！');
                }
            },
            error: function (e) {
                DoDesign.alert('服务器访问失败！');
            }
        });
    });
}

//导出文件
function DownLoadGraphFile(activityId) {
    $.ajax({
        url: "/StepMarketing/GetActivityTemplate?activityId=" + activityId,
        type: "post",
        success: function (json) {
            if (json.IsOK) {
                if (json.ReturnValue != "") {
                    window.location.href = "/Common/GetExportTextFile?filePath=" + encodeURI(json.ReturnValue);
                }
            } else {
                DoDesign.alert(json.Description);
            }
        },
        error: function (request) {
            DoDesign.alert(request);
        }
    });
}

//#endregion

//#region 获取雁书规则-是否允许店铺签名

//是否允许短信签名
function IsAllowSmsSignatrue() {
    if (allowSmsSignature == null) {
        $.ajax({
            url: "/StepMarketing/AllowSmsSignatrue",
            type: "post",
            success: function(json) {
                if (json.IsOK) {
                    if (json.ReturnValue == true) {
                        allowSmsSignature = true;
                    } else {
                        allowSmsSignature = false;
                    }
                } else {
                    allowSmsSignature = false;
                }
            },
            error: function(request) {
                DoDesign.alert(request);
            }
        });
    } else {
        return allowSmsSignature;
    }
}

//#endregion

//#region 获取雁书短信计算规则

function GetYanShuSmsRule() {
    if (yanshuSmsRule == null) {
        $.ajax({
            url: root+'/apps/marketing/getYanShuSmsCalculateRule.do',
            type: "post",
            success: function (json) {
                if (json) {                    
                        if (json.singleSmsWordCount > 0 && json.singleSmsWordCount)
                            yanshuSmsRule = json;
                } 
            },
            error: function (request) {
                DoDesign.alert(request);
            }
        });
    }
}

function GetYanShuSmsRuleValue() {
    return yanshuSmsRule;
}

//#endregion

//活动执行中,编辑部分内容
function IsPartEdit() {
    if ($("#hidCanEdit").val() == "0") {
        return true;
    } else {
        return false;
    }
}

//判断是否在分组内
function inArray(value, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return true;
        }
    }
    return false;
}

function UrlDecode(str) {
    if (str == null || str == undefined || str == NaN) {
        return "";
    }
    var ret = ""
    	s = null;
    for (var i = 0; i < str.length; i++) {
        var chr = str.charAt(i);
        if (chr == "+") {
            ret += " ";
        } else {
            ret += chr;
        }
    }
    s = decodeURIComponent(ret);
    return s;
}



//另存为分组
function saveSubdivison(sender) {
     var tree_data = DoDesign.getTreeData2();
	 var popWindow=saogaUI.ui.pop({
			title:'分组另存为',
			html: divSaveSubdivisonHtml,
			isMaskClose:false,
			height:72,
			width:300,
			onloadFn:function()
			{
				saogaUI.ui.select({//客户树 start
      					target:'#subdivcateList',
      					selectedID:'',//
      					isTree:true,
      					onParent:true,
      					data:tree_data,
      					downHeight:200,
      					downWidth:200,
      					cls:'ui-select-130',
      					onclickItem: function(name, id,pid)
      					{
      					},
      					onloadFn: function(obj)
      					{

      					}
      				});//客户树 end
			},
			btns:[
			    {
			    	text:'保存',
			    	closePop:true,
			    	onclick:function(id, i, item, that){
			    		saveSubUser(that);
			    		popWindow.close();
					}
				},
				{
			    	text:'取消'
				}
			]
	});
}
//保存分组

function saveSubUser(btnObj) {  
var title = $.trim($("#txtSubdivisonTitle").val());

var catId = $("#subdivcateList").val();

var sql = $("#hidSubSql").val();       
//if(!validate($("#txtSubdivisonTitle"))) {            
//    return;
//}        

if (title == "") {
     DoDesign.alert("请输入分组名称!");
     saveSubdivison(sender);
} else if(sql == "") {
     DoDesign.alert("获取SQL语句失败");
}
else {
    $(btnObj).prop("disabled", true);                    
    //判断分组名称是否存在
    var datajuge = {
        subdivisionId: "",
        subdivisionName: encodeURIComponent(title)
    };
    $.ajax({
        url: root+"/apps/layered/subdivisionNameIsExist.do",
        type: "post",
        data: datajuge,
        success: function (data) {
     		var json=data.result;
             if (json.isExit) {
             	  $(btnObj).prop("disabled", false);
                    DoDesign.alert("分组名称已存在！");
            } else {
         	   var data = {
                        subid: "",
                        parentID: catId,
                        subname: encodeURIComponent(title),
                        suSql: encodeURIComponent(sql),
                        sqlRemark: ""
                    };
                    $.ajax({
                        url: root+"/apps/layered/saveUserSubSql.do",
                        type: "post",
                        data: data,
                        success: function (data) {
                     	   var newsubid=data.message;
                            if (newsubid >= 0) {
                                $(btnObj).prop("disabled", false);
                                $("#divSaveSubdivison").hide();
                                 DoDesign.alert('保存成功!');
                            } else {
                                $(btnObj).prop("disabled", false);
                                 DoDesign.alert('保存失败!');
                            }
                        },
                        error: function (e) {
                            $(btnObj).prop("disabled", false);
                             DoDesign.alert('服务器访问失败！');
                        }
                    });
              
            }
        },
        error: function (e) {
            $(btnObj).prop("disabled", false);
             DoDesign.alert('服务器访问失败！');
        }
    });
}
}    
//显示分组类别
function subTypeList(subList){
	if(subList!=""){
		$("#subdivcateList").html("");
		var html="",
			data = {},
			id   = [],
			name = [];
		html+="<option value='' selected='selected'>请选择</option>";
		for(var i=0;i<subList.length;i++){
			id[i]   = subList[i].id;
			name[i] = subList[i].subdivisionName;
			html+="<option >"+subList[i].subdivisionName+"</option >";
		}
		data.name = name;
		data.id = id;
		//$("#subdivcateList").html(html);
		divSaveSubdivisonHtml = saogaUI.template('divSaveSubdivison', data)
	}
}
