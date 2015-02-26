//初始化操作

$(function(){ 
		//是否允许短信签名
		AllowSignatrue();
	    //选择模板
	    $("#selTemplate").change(function () {
	        if ($("#selTemplate").val() != "") {
	            $("#p_update").css("display", "");
	            $("#p_add").css("display", "none");

	            $("#checkboxForSelf").removeAttr("checked");
	        } else {
	            $("#p_update").css("display", "none");
	            $("#p_add").css("display", "");

	            $("#checkboxForNew").removeAttr("checked");
	        }
	        $("#txtContent").val($("#selTemplate option:selected").attr("tag"));
	        
	      

	        //短信模板下来框改变事件
	        CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', false, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
	    });
	    
	    //计算字数    短信内容
	    if ($("#txtContent").length > 0)
	    {
	        CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', false, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
	    }  
	    
	    //选择保存新模板
	    $("#checkboxForNew").change(function () {
	        if ($("#checkboxForNew").is(":checked")) {
	            $("#txtNewTemplateName").css("display", "");
	            $("#txtNewTemplateName").focus();
	        } else {
	            $("#txtNewTemplateName").css("display", "none");
	        }
	    });

	    
	    //选择店铺短信签名
	    $("#SMSSignatureList").change(function () {
	    	  $("#SMSSignature").val("【"+$(this).val()+"】");
	            //计算短信数字
	          CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', false, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
	    	//changeSmsSignature($(this).val());
	    });
	    
	    
	 /*   //选择店铺短信签名
	    $("#SMSSignatureList").change(function () {
	    	if($(this).val()==0){
	    		$("#SMSSignature").val($("#hidSMSSignature").val());
	    	}else{
	    		changeSmsSignature($(this).val());
	    	}
	    });*/
	    
	    /*//默认选中店铺
	    $("#SMSSignatureList").val($("#hidShopId").val());*/
 })






//点击短信内容上的小标签  计算字符
function addMemberAutoPlaceholder(e) {
	var content=$("#txtContent").val();
    $("#txtContent").val(content+$(e).attr("lang"));
    CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', false, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
}


//删除模板
function deleteTemplate() {
    if ($("#selTemplate").val() != "") {
    	
    	saogaUI.ui.dialog.alert({
				title:"提示信息",
				text:"您确认删除吗！",
				ok:function(){
					var data = { id: $("#selTemplate").val() };
		            $.ajax({
		                url: root+"/apps/toolbox/marketingTemplate/deleteTemplate.do",
		                data: data,
		                type: "post",
		                dataType:"text",
		                success: function (msg) {
		            	    var json=eval('('+msg+')')
		                    if (json.isDelete) {
		                        $("#selTemplate option:selected").remove();
		                        $("#p_update").css("display", "none");
		                        $("#p_add").css("display", "");
		                    } else {
		                    	saogaUI.ui.dialog.alert({
		     						title:"提示信息",
		     						text:"删除模板失败！",
		     						ok:function(){
		     						}
		     					 });
		                    }
		                },
		                error: function (e) {
		                	saogaUI.ui.dialog.alert({
	     						title:"提示信息",
	     						text:"删除模板失败！",
	     						ok:function(){
	     						}
	     					 });
		                    
		                }
		            });
					
				}
			 });
    } else {
    	saogaUI.ui.dialog.alert({
				title:"提示信息",
				text:"请选择要删除的模板！",
				ok:function(){
				}
			 });
    }
}

//表单验证定义
$("#sendMessageForm").validate({
    rules:{
			'txtContent' : {required :true},
 			'txtNewTemplateName' : {required:function(){
            	           $("#txtNewTemplateName").focus();
            	           return true;
                   }
             }
	},	
	messages:{
			'txtContent' : {required:"短信内容不为空"},
			'txtNewTemplateName':{required:"新模板名称不为空"}
    },
    errorPlacement: function(error, element){
    	error.appendTo(element.parent());
    }
}); 

//表单验证定义
$("#sendAllMessageForm").validate({
    rules:{
			'txtContent' : {required :true},
 			'txtNewTemplateName' : {required:function(){
            	           $("#txtNewTemplateName").focus();
            	           return true;
                   }
             }
	},	
	messages:{
			'txtContent' : {required:"短信内容不为空"},
			'txtNewTemplateName':{required:"新模板名称不为空"}
    },
    errorPlacement: function(error, element){
    	error.appendTo(element.parent());
    }
}); 



//获取店铺短信签名   id店铺ID
function changeSmsSignature(id) {
  $.ajax({
      url: root+"/apps/service/memberAuto/getShopSmsSignature.do",
      data:{
  	         id:id
             },
      type: "post",
      dataType:"text",
      success: function (msg) {
  	    var json=JSON.parse(msg);
          $("#SMSSignature").val(json.smsSignature);
      },
      error: function (request) {
          //alert("是否允许短信签名 ajax 出错:"+request);
      }
  });
}

//#region 发送操作
function savePattern() {
	
	if($("#sendMessageForm").valid()==false){
		return;	
	}
    var updateTemplate = false;
    var newTemplate = false;
    var newTemplateName = $("#txtNewTemplateName").val();
    
    //判断是进行短信或者邮件保存
    var isSms = $("#hidPatternType").val() == "sms" || $("#hidPatternType").val() == "";
    if (isSms) {
        if (!!$("#checkboxForSelf").prop("checked")) {
        	updateTemplate=true;
        }
        if (!!$("#checkboxForNew").prop("checked")) {
        	newTemplate = true;
        }
        
      //对模板进行处理
        if (newTemplate) {
            if ($.trim(newTemplateName) != "") {
                //判断是否存在
                var isExit = false;
                $("#selTemplate").find("option").each(function () {
                    if ($(this).text() == newTemplateName) {
                        isExit = true;
                    }
                });
                if (isExit) {
                    $("#txtNewTemplateName").focus();
                    $("#p_add").append("模板已存在");
                    return false;
                }
            }
        }
        
      

        //进行ajax请求
        $.ajax({
            url: root+"/apps/marketing/sendCallBackSms.do",
            data: form_serialize("sendMessageForm"),
            type: "post",
            dataType:"text",
            success: function (msg) {
            	
            	var obj = JSON.parse(msg);
            	//console.log("nihao +:"+msg);
            	 var message = obj.result.message;
            	 var IsOk = obj.result.isOK;
                if (IsOk =='1') {
                	saogaUI.ui.dialog.alert({
 						title:"提示信息",
 						text:message,
 						ok:function(){
 						}
 					 });
                	//关闭弹框
                	//saogaUI.ui.pop.close('sms');
                	popobjSms.close();
                	//主页面搜索
                    $("#smsbackListSearch").click();
                } else {
                	saogaUI.ui.dialog.alert({
 						title:"提示信息",
 						text:message,
 						ok:function(){
 						}
 					 });
                }
            },
            error: function (e) {
                //$("#btnSave").removeAttr("disabled");
                //alert(e);
            }
        });
    } 
    return true;
}


//#region 发送操作
function savePattern2() {

	
	if($("#sendAllMessageForm").valid()==false){
		return;	
	}
	
    var updateTemplate = false;
    var newTemplate = false;
    var newTemplateName = $("#txtNewTemplateName").val();
    
    //判断是进行短信或者邮件保存
    var isSms = $("#hidPatternType").val() == "sms" || $("#hidPatternType").val() == "";
    if (isSms) {
        if (!!$("#checkboxForSelf").prop("checked")) {
        	updateTemplate=true;
        }
        if (!!$("#checkboxForNew").prop("checked")) {
        	newTemplate = true;
        }
        
      //对模板进行处理
        if (newTemplate) {
            if ($.trim(newTemplateName) != "") {
                //判断是否存在
                var isExit = false;
                $("#selTemplate").find("option").each(function () {
                    if ($(this).text() == newTemplateName) {
                        isExit = true;
                    }
                });
                if (isExit) {
                    $("#txtNewTemplateName").focus();
                    $("#p_add").append("模板已存在");
                    return false;
                }
            }
        }

        //进行ajax请求
        $.ajax({
            url: root+"/apps/marketing/sendMultSms.do",
            data: form_serialize("sendAllMessageForm"),
            type: "post",
            dataType:"text",
            success: function (msg) {
            	
            	var obj = JSON.parse(msg);
            	 var black = obj.result.black;
            	 var repeated = obj.result.repeated;
            	 var success = obj.result.success;
            	 var total = obj.result.total;
            	 var wrong = obj.result.wrongNum;
            	 var unsubScribeNum = obj.result.unsubscribe;
            	 var str = '总共发'+total+'条短信'+';成功'+success+'条;'+'重复'+repeated+'条;'+'黑名单'+black+'条;'+"错误号码"+wrong+"条;"+"短信退订"+unsubScribeNum+"条";
            	 if(!obj.result.condition){
            		 str = obj.result.message;
            	 }
            	 saogaUI.ui.dialog.alert({
						title:"提示信息",
						text:str,
						ok:function(){
						}
					 });
                	//关闭弹框
                	//saogaUI.ui.pop.close('sms');
            	     popobjSmsMult.close();
                	//主页面搜索
                    $("#smsbackListSearch").click();
            },
            error: function (e) {
               // alert(e);
            }
        });
    } 
    return true;
}




//是否允许短信签名
function AllowSignatrue() {
    $.ajax({
        url: root+"/apps/service/memberAuto/allowSmsSignatrue.do",
        type: "post",
        dataType:"text",
        success: function (msg) {
    	    var json=JSON.parse(msg);
            if (json.isOK) {
                $("#SMSSignature").show();
                $("#spanSmsSignatureLimitTip").hide();
            }
            else {
                $("#SMSSignature").html("");
                $("#spanSmsSignatureLimitTip").show();
            }
            //计算短信数字
            CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', false, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
           // CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', true, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
            
          //  CalculateSmsNumNew(this, 'alertMsg', false, false, 'tdSMSSignature',$("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());	
            
            
            
        },
        error: function (request) {
            //alert("是否允许短信签名 ajax 出错:"+request);
        }
    });
}







/**************************************************************************************************js  逻辑方法*************************************************************************************************************/
//文本框只能输入数字
function onlyNum(id){
	$("#"+id).on("keypress",
	  function(event)
	     { 
		    var keyCode = event.which;  
		    if (keyCode == 46 || (keyCode >= 48 && keyCode <=57)) 
		      {
		           return true;   
		      }         
		     else
		     {
		         return false;
		     } 
	     }).focus(function() 
	                 { this.style.imeMode = 'disabled'; }
	              ); 
}

//定时的输入验证
function validateNum(obj,type){
	var str=obj.value;
	if(type==1){
		if(parseInt(str)<0 || parseInt(str)>23){  //只能输入0至23的数字
			$(obj).val("");
		}		
	}else{
		if(parseInt(str)<0 || parseInt(str)>59){  //只能输入0至59的数字
			$(obj).val("");	
		}			
	}
}



//计算短信长度
function CalculateSmsNumNew(src, e, isContainHoldPlace, isbyte, smsSignature, kedaoSignLength, oneSmsLength, mulSmsLenght) {
    ///<summary>计算短信长度</summary>
    ///<param name="src">验证控件对象</param>
    ///<param name="e">接收提醒信息对象ID名称</param>
    ///<param name="isContainHoldPlace">是否包含占位符（true:包含，false:不包含）</param>
    ///<param name="isbyte">是否双字节</param>
    ///<param name="smsSignature">装载短信签字对象ID名称</param>
    ///<returns></returns>    
    var desc = GetSmsLenDescNew($(src).val(), $.trim($("#" + smsSignature).val()), isContainHoldPlace, isbyte, kedaoSignLength, oneSmsLength, mulSmsLenght);
    $("#" + e).html(desc).show();
}


function GetSmsLenDescNew(content, smsSignature, isContainHoldPlace, isbyte,kedaoSignLength,oneSmsLength,mulSmsLenght) {
    ///<summary>生成短信长度描述</summary>
    ///<param name="content">短信内容</param>
    ///<param name="smsSignature">短信签名</param>
    ///<param name="isContainHoldPlace">是否包含占位符（true:包含，false:不包含）</param>
    ///<param name="isbyte">是否双字节</param>
    ///<returns></returns>

    if (typeof (content) == 'undefined') {
        content = "";
    }   
    if (typeof (oneSmsLength) == 'undefined') {
        oneSmsLength = 70;
    }
    if (typeof (mulSmsLenght) == 'undefined') {
        mulSmsLenght = 67;
    }

    var signLen = 0;
    var strlen = 0;
    if (smsSignature != undefined && smsSignature != null && smsSignature != "") {
        signLen = GetStringLen($.trim(smsSignature), isbyte);
    }
    if (content != undefined && content != null && content != "") {
        strlen = GetStringLen(content,isContainHoldPlace,isbyte);
    }
    var totalCount = strlen + signLen;

    if (typeof (kedaoSignLength) != 'undefined') {
        totalCount += parseInt(kedaoSignLength);
    }

    var smsCount = 1;
    var desc = "";
    var countToll = oneSmsLength;
    var fontColor = "#f48c12";
    if (totalCount > oneSmsLength) {
        smsCount = Math.ceil(totalCount / mulSmsLenght);
        fontColor = "#f48c12";
        countToll = mulSmsLenght;
    }
    desc = "您已录入<labl style='color:" + fontColor + ";font-weight:bold;display:inline-block;'>&nbsp;" + totalCount + "&nbsp;</labl>个字符(含店铺签名";
    if (typeof (kedaoSignLength) != 'undefined' && kedaoSignLength > 0) {
        desc += ",通道签名";
    }
    desc += ")，将被做为<labl style='color:" + fontColor + ";font-weight:bold;display:inline-block;'>&nbsp;" + smsCount + "&nbsp;</labl>条短信发送，";
    desc += "每条按<labl style='color:" + fontColor + "'>" + countToll + "</labl>字计价。";
    return desc;
}

function GetStringLen(str, isbyte) {
    ///<summary>返回字符串长度</summary>
    ///<param name="str">要计算的字符串</param>
    ///<param name="isbyte">是否按字节计算(true:是，false:否)</param>
    ///<returns>返回字符串的长度</returns>
    if (str == undefined || str == "") {
        return 0;
    }
    if (isbyte)
        return str.replace(/[^\x00-\xff]/g, "**").length;
    else
        return str.length;
}






/*
//计算短信长度
function CalculateSmsNumNew(src, e, isContainHoldPlace, isbyte, smsSignature, kedaoSignLength, oneSmsLength, mulSmsLenght) {
    ///<summary>计算短信长度</summary>
    ///<param name="src">验证控件对象</param>
    ///<param name="e">接收提醒信息对象ID名称</param>
    ///<param name="isContainHoldPlace">是否包含占位符（true:包含，false:不包含）</param>
    ///<param name="isbyte">是否双字节</param>
    ///<param name="smsSignature">装载短信签字对象ID名称</param>
    ///<returns></returns>   
    var desc = GetSmsLenDescNew($(src).val(), $.trim($("#" + smsSignature).val()), isContainHoldPlace, isbyte, kedaoSignLength, oneSmsLength, mulSmsLenght);
    $("#" + e).html(desc).show();
}


function GetSmsLenDescNew(content, smsSignature, isContainHoldPlace, isbyte,kedaoSignLength,oneSmsLength,mulSmsLenght) {
    ///<summary>生成短信长度描述</summary>
    ///<param name="content">短信内容</param>
    ///<param name="smsSignature">短信签名</param>
    ///<param name="isContainHoldPlace">是否包含占位符（true:包含，false:不包含）</param>
    ///<param name="isbyte">是否双字节</param>
    ///<returns></returns>

    if (typeof (content) == 'undefined') {
        content = "";
    }   
    if (typeof (oneSmsLength) == 'undefined') {
        oneSmsLength = 70;
    }
    if (typeof (mulSmsLenght) == 'undefined') {
        mulSmsLenght = 67;
    }

    var signLen = 0;
    var strlen = 0;
    if (smsSignature != undefined && smsSignature != null && smsSignature != "") {
        signLen = GetStringLen($.trim(smsSignature), isbyte);
    }
    if (content != undefined && content != null && content != "") {
        strlen = GetStringLen(content,isContainHoldPlace,isbyte);
    }
    var totalCount = strlen + signLen;

    if (typeof (kedaoSignLength) != 'undefined') {
        totalCount += parseInt(kedaoSignLength);
    }

    var smsCount = 1;
    var desc = "";
    var countToll = oneSmsLength;
    var fontColor = "#f48c12";
    if (totalCount > oneSmsLength) {
        smsCount = Math.ceil(totalCount / mulSmsLenght);
        fontColor = "#f48c12";
        countToll = mulSmsLenght;
    }
    desc = "您已录入<labl style='color:" + fontColor + ";font-weight:bold;display:inline-block;'>&nbsp;" + totalCount + "&nbsp;</labl>个字符(含店铺签名";
    if (typeof (kedaoSignLength) != 'undefined' && kedaoSignLength > 0) {
        desc += ",通道签名";
    }
    desc += ")，将被做为<labl style='color:" + fontColor + ";font-weight:bold;display:inline-block;'>&nbsp;" + smsCount + "&nbsp;</labl>条短信发送，";
    desc += "每条按<labl style='color:" + fontColor + "'>" + countToll + "</labl>字计价。";
    return desc;
}

function GetStringLen(str, isbyte) {
    ///<summary>返回字符串长度</summary>
    ///<param name="str">要计算的字符串</param>
    ///<param name="isbyte">是否按字节计算(true:是，false:否)</param>
    ///<returns>返回字符串的长度</returns>
    if (str == undefined || str == "") {
        return 0;
    }
    if (isbyte)
        return str.replace(/[^\x00-\xff]/g, "**").length;
    else
        return str.length;
}*/