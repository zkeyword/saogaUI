var taskNameExist = false;
//初始化操作
$(function(){ 
	//是否允许短信签名
	AllowSignatrue();
	
	//绑定只能输入数字
	onlyNum("delayRemindMinuter1");    //定时           
	 
    //会员等级下拉框初始化
    $("#selMemberGrade").val($("#hidMemberGrade").val());
    
    //处理优先级下拉框初始化
    $("#orderSelect").val($("#hidOrder").val());
    
    //点击定时和即时输入切换
    if ($("#hidType").val() == "1" || $("#hidType").val() == "2" || $("#hidType").val() == "3" || $("#hidType").val() == "4" || $("#hidType").val() == "7" || $("#hidType").val() == "8") {
         $("#remindTime1").click(function () {
             if ($("#remindTime1").is(":checked")) {
                 $("#span_remindTime").hide();
                 $("#span_remindTime1").show();
             }
         });
         $("#remindTime2").click(function () {
             if ($("#remindTime2").is(":checked")) {
                 $("#span_remindTime").show();
                 $("#span_remindTime1").hide();
             }
         });
     } 
    
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
        CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', true, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
    });
    
    //计算字数    短信内容
    if ($("#txtContent").length > 0)
    {
        CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', true, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
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
    
    
 })


//检查任务名称是否重复
function checkTaskName(vv) {
    var type = $("#hidType").val();
    //alert("CheckTaskName:" + type);
    var pid = $("#hidPatternId").val();
    if (vv != "") {
        var  data = { patternID: pid, taskName: vv , type: type };
        $.ajax({
            url: "/apps/service/memberAuto/isTaskNameExist.do",
            data:data,
            type: "post",
            dataType:"text",
            success: function (msg) {
        	    var obj= eval('('+msg+')');
                if (obj.isOK!="true") {
                    $("#TaskNameNoExist").show();
                    $("#TaskNameExist").hide();
                    taskNameExist = false;
                } else {
                    $("#TaskNameNoExist").hide();
                    $("#TaskNameExist").show();
                    taskNameExist = true;
                }
            },
            error: function (msg) {
            }
        });
    }
}

//加载分组树
function getCustomerGroupCategory(){
	var data;
	var url = root+'/apps/layered/getCustomerGroupCategory.do';
	//进行ajax调用
	$.ajax({
		type: "post",
		url: url,
		async:false,
		dataType:"text",
		success: function(msg){
		    data=msg;
		},
		error: function(msg){	 
		}
	});
	return JSON.parse(data);
} 	


//统计分组人数
function spansubCount(){
	    var url = '/apps/service/memberAuto/getUserCountByID.do';
		var subId = $("#txtSubdivson").val();				//$('#hidSubID').val()
		if ($.trim(subId) != '') {
		    $("#spansubCount").html('统计中…');
		     //进行ajax调用
		     $.ajax({
		        type: "POST",
		        url: url,
		        data: {
		            id:subId
		        },
		        async:false,
		        dataType:"text",
		        success: function(msg){
		            var obj= eval('('+msg+')');
		            var html = '<a href="javascript:void(0);" id="clearsub" onclick="clearsub();" style="color:red;padding-left: 10px;position:relative;top:-37px;left:220px">清  空</a>';
		            $("#spansubCount").html('总人数：' + obj.count + '人');
		            $("#spansubCount").after(html);
		            $("#spansubCount").css("color", "red");
				 },
				error: function(msg){
					 
				}
			  });
		 }
} 	


// 清空分组
function clearsub(){
	$("#hidSubID").val("");
	//$("#txtSubdivson").val("");
	$("#spansubCount").html('统计人数');
	 $("#spansubCount").css("color", "green");
	$("#clearsub").remove();
}


//点击短信内容上的小标签  计算字符
function addMemberAutoPlaceholder(e) {
	var content=$("#txtContent").val();
    $("#txtContent").val(content+$(e).attr("lang"));
    CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', true, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
}


//删除模板
function deleteTemplate() {
    if ($("#selTemplate").val() != "") {
        if (confirm("您确认要删除吗？")) {
            var data = { id: $("#selTemplate").val() };
            $.ajax({
                url: root+"/apps/service/memberAuto/deleteConcertPatternTemplate.do",
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
                        alert("删除模板失败");
                    }
                },
                error: function (e) {
                    alert("删除模板调用action失败");
                }
            });
        }
    } else {
        alert('请选择要删除的模板');
    }
}


//#region 保存操作
function savePattern(commitForCheck) {

	alert($("#memberAutoForm").serialize());
	//设置是保存操作还是保存并审核操作
	if(commitForCheck){
		$("#isCommitForCheck").val(commitForCheck);
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
            if ($.trim(newTemplateName) == "") {
                $("#txtNewTemplateName").focus();
                alert("请输入模板名称");
                return false;
            } else {
                //判断是否存在
                var isExit = false;
                
                $("#selTemplate").find("option").each(function () {
                    if ($(this).text() == newTemplateName) {
                        isExit = true;
                    }
                });
                if (isExit) {
                    $("#txtNewTemplateName").focus();
                    alert("模板已存在");
                    return false;
                }
            }
        }
        
        //如果短信内容没修改，则不提交雁书
        if (type != 5 && type != 6) {
            if ($("#smsContent").val()!=""&&$("#txtContent").val() != $("#smsContent").val()) {
                $("#strIsValid").val(2);
            }
        }

        //进行ajax请求
        $.ajax({
            url: root+"/apps/service/memberAuto/saveConcertPattern.do",
            data: $("#memberAutoForm").serialize(),
            type: "post",
            dataType:"text",
            success: function (msg) {
                //$("#btnSave").removeAttr("disabled");
        	    var obj=eval('('+msg+')')
                if (obj.isOK) {
                	//关闭弹框
                	saogaUI.ui.pop.close('concertPattern');
                	//主页面搜索
                    $("#search").click();
                } else {
                    alert("保存失败");
                }
            },
            error: function (e) {
                //$("#btnSave").removeAttr("disabled");
                alert(e);
            }
        });
    } else {//保存邮件
        isValid = $("input[type=radio][name=EmailOpen]:checked").val();
        var templateIdEmail = $("#selTemplateEmail").val();
        if (templateIdEmail < 1) {
            alert("请选择邮件模板！");
            return false;
        }
        var data2 = {
            patternId: $("#hidPatternId").val(),
            type: type,
            task: encodeURIComponent(task),
            memberGrade: memberGrade,
            subId: subId,
            order: orderSelect,
            refundStatus: refundStatus,
            isValid: isValid,
            templateIdEmail: templateIdEmail,
            reminderType: reminderType,
            reminderTime: reminderTime
        };
        //保存邮件模板
        $.ajax({
            url: "/MemberAuto/SaveConcertPatternEmail",
            data: data2,
            type: "post",
            success: function (json) {
                $("#btnSave").removeAttr("disabled");
                if (json.IsOK) {
                    window.parent.location.reload();
                } else {
                    alert(json.Description);
                }
            },
            error: function (e) {
                $("#btnSave").removeAttr("disabled");
                alert(e);
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
            CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', true, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
        },
        error: function (request) {
            alert("是否允许短信签名 ajax 出错:"+request);
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
	alert(str);
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
    var desc = GetSmsLenDescNew($(src).val(), $.trim($("#" + smsSignature).html()), isContainHoldPlace, isbyte, kedaoSignLength, oneSmsLength, mulSmsLenght);
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