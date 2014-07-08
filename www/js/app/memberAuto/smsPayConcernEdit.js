var taskNameExist = false;
//初始化操作
$(function(){ 
	//绑定只能输入数字
	 onlyNum("delayRemindMinuter1");    //定时           
    // obj.on('click','.ui-textarea',function(){a()});
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
        //$("#txtContent").html($(this).val());
        //CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', true, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
    });


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
            url: "/apps/service/memberAuto/IsTaskNameExist.do",
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


//统计分组人数
function spansubCount(){
	    var url = '/apps/service/memberAuto/GetUserCountByID.do';
		var subId = 1;				//$('#hidSubID').val()
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
		            var html = '<a href="javascript:void(0);" id="clearsub" onclick="clearsub();" style="color:red;padding-left: 10px;">清  空</a>';
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
function AddMemberAutoPlaceholder(e) {
    $("#txtContent").insert($(e).attr("lang"));
    CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', true, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
}


//删除模板
function DeleteTemplate() {
    if ($("#selTemplate").val() != "") {
        if (confirm("您确认要删除吗？")) {
            var data = { id: $("#selTemplate").val() };
            $.ajax({
                url: root+"/apps/service/memberAuto/DeleteConcertPatternTemplate.do",
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
	
	alert(123123);
	var formValidate = $("#memberAutoForm").validate({
	    rules : {
			'txtTask' : {required:true},
			'txtSubdivson' : {required:true},
			'selTemplate' : {required:true},
			'txtContent' : {required:true}

		},	
		messages:{
			'txtTask' : {required:"企业不为空"},
			'txtSubdivson' : {required:"请选择合同类型"},
			'selTemplate' : {required:"客户签约人不能空"},
			'txtContent' : {required:"合同金额不能为空"}

		 },
	    errorPlacement: function(error, element){
	    	error.appendTo(element.parent());
	     }
//		submitHandler : function(form) {
//			var start=new Date(($("#startTime").val()).replace("-","/").replace("-","/"));
//			var end=new Date(($("#endTime").val()).replace("-","/").replace("-","/"));
//			if(start.getTime()>end.getTime()){
//				  $.tip("开始时间不能大于结束时间");
//				  return;
//			}
//			$("#subHi").hide();
//			$(form).ajaxSubmit(function(resp,state) {
//				if (state){
//					location.href = '${ctx}/mobile/api/agreement/showAgreementDetail?id='+resp;
//				}else{
//					$("#subHi").show();
//					alert(resp.result);
//				}
//			});
//		}
	});	
	
	console.log(formValidate)
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


//    if (taskNameExist) {
//    	
//        $("#txtTask").focus();
//        return false;
//    }else{
//    	alert(1123);
//    }
//  
//    $("#errMsg").hide();
//    if ($("#remindTime1").is(":checked")) {
//        $("#txtRemindTimeHour").val("1");
//        $("#txtRemindTimeMinuter").val("0");
//    }
//    var type = $("#hidType").val();
//    var task = $("#txtTask").val();
//    var memberGrade = $("#selMemberGrade").val();
//    var subId = $("#hidSubID").val();
//    var isValid = $("#strIsValid").val();
//    var sellerMobiles = '';
//    var couponId = '';
//    var couponEndTime = '';
//    var templateid = $("#selTemplate").val();
//    var content = $("#txtContent").val();
//    var provinceCode = "";
//    var province = "";
//    var cityCode = "";
//    var city = "";
//    var townCode = "";
//    var town = "";
//    var updateTemplate = false;
//    var newTemplate = false;
//    var newTemplateName = $("#txtNewTemplateName").val();
//    var delayRemindMinuter = 0;//签收关怀
//    var delayRemindMinuter1 = 0;//发货、付款、退款、确认
//    var reminderType = 0;
//    var reminderTime = "";
//    var remarkType = 0;
//    var remarkFlag = 0;
//    var remarkSignType = 0;
//    var remarkSign = "";
//    var isAddRemarkTime = 0;
//    var isAvoidMolest = $("input[type=radio][name=IsAvoidMolest]:checked").val();
//    var comment = $("input[type=radio][name=Comment]:checked").val();
//    var orderSelect = $("#orderSelect").val();
//    var refundStatus = $("#RefundStatusSelectListID").val();
//    if ($.trim(task) == "") {
//        $("#errMsg").html("请输入任务名称！");
//        $("#txtTask").focus();
//        $("#errMsg").show();
//        return false;
//    }
//    var isSms = $("#hidPatternType").val() == "sms" || $("#hidPatternType").val() == "";
//    if (isSms) {
//        if (!!$("#checkboxForSelf").prop("checked")) {
//            updateTemplate = true;
//        }
//        if (!!$("#checkboxForNew").prop("checked")) {
//            newTemplate = true;
//        }
//
//       if (type == 2) {
//            /*升级提醒*/
//            couponId = $("#selCoupon").val();
//            couponEndTime = $("#selCoupon").find("option:selected").attr('endTime');
//
//            if (couponId > 0) {
//                var couponHour = CalculateDate(couponEndTime, $("#hidDateAndTime").val());
//                if (couponHour < 24) {
//                    $("#errMsg").html("优惠劵距离过期剩" + couponHour + "小时,请选择使用期限大于1天的优惠劵.");
//                    $("#errMsg").show();
//                    return false;
//                }
//            }
//
//        } else if (type == 1 || type==2 || type == 3 || type == 4 || type==7 || type == 8) {
//            //发货提醒 升级提醒 付款关怀 退款关怀 到达提醒 确认关怀
//            if (type == 4) {
//                //卖家提醒
//                sellerMobiles = $("#txtSellerMobiles").val();
//
//                if ($.trim(sellerMobiles) != '') {
//                    var strMobiles = sellerMobiles.replace('，',',').split(',');
//                    for (var i = 0; i < strMobiles.length; i++) {
//                        if ($.trim(strMobiles[i]) != "") {
//                            if (!validateMobile(strMobiles[i])) {
//                                $("#errMsg").html("第" + (i + 1) + "个手机号码[" + strMobiles[i] + "]格式错误！");
//                                $("#txtSellerMobiles").focus();
//                                $("#errMsg").show();
//                                return false;
//                            }
//                        }
//                    }
//                }
//            }
//            reminderType = $("input[type=radio][name=remindTime]:checked").val();
//            if (reminderType == 1) {
//                //定时
//                var remindTimeHour = $("#txtRemindTimeHour").val();
//                var remindTimeMinuter = $("#txtRemindTimeMinuter").val();
//                if ($.trim(remindTimeHour) != '') {
//                    if (isNaN(parseInt(remindTimeHour))) {
//                        $("#errMsg").html("提醒时间格式错误,只能为整数值！");
//                        $("#txtRemindTimeHour").focus();
//                        $("#errMsg").show();
//                        return false;
//                    }
//                } else {
//                    $("#errMsg").html("提醒定时时间未设定！");
//                    $("#txtRemindTimeHour").focus();
//                    $("#errMsg").show();
//                    return false;
//                }
//                if ($.trim(remindTimeMinuter) != '') {
//                    if (isNaN(parseInt(remindTimeMinuter))) {
//                        $("#errMsg").html("提醒时间格式错误,只能为整数值！");
//                        $("#txtRemindTimeMinuter").focus();
//                        $("#errMsg").show();
//                        return false;
//                    }
//                } else {
//                    $("#errMsg").html("提醒定时时间未设定！");
//                    $("#txtRemindTimeMinuter").focus();
//                    $("#errMsg").show();
//                    return false;
//                }
//                //火狐下09<9是为true的
//                if (remindTimeHour == "09") {
//                    remindTimeHour = "9";
//                }
//                if (parseInt(remindTimeHour) > 23) {
//                    $("#errMsg").html("提醒时间：小时范围 ( 0 - 23 ) ");
//                    $("#remindTimeMinuter").focus();
//                    $("#errMsg").show();
//                    return false;
//                }
//                if (parseInt(remindTimeMinuter) > 59) {
//                    $("#errMsg").html("提醒时间：分钟范围 ( 0 - 59 ) ");
//                    $("#remindTimeMinuter").focus();
//                    $("#errMsg").show();
//                    return false;
//                }
//                if (parseInt(remindTimeHour) < 9 || parseInt(remindTimeHour) > 21 || (parseInt(remindTimeHour) == 21 && parseInt(remindTimeMinuter) > 0)) {
//                    $("#errMsg").html("提醒时间范围 ( 09:00 - 21:00 ) ");
//                    $("#txtRemindTimeHour").focus();
//                    $("#errMsg").show();
//                    return false;
//                }
//
//                reminderTime = $("#txtRemindTimeHour").val() + ":" + $("#txtRemindTimeMinuter").val();
//            }
//            else {
//
//                delayRemindMinuter1 = $("#delayRemindMinuter1").val();
//                if ($.trim(delayRemindMinuter1) != '') {
//                    if (isNaN(parseInt(delayRemindMinuter1))) {
//                        $("#errMsg").html("延时关怀时间格式错误,只能为整数值！");
//                        $("#delayRemindMinuter1").focus();
//                        $("#errMsg").show();
//                        return false;
//                    }
//                } else {
//                    $("#errMsg").html("延时关怀时间不能为空！");
//                    $("#delayRemindMinuter1").focus();
//                    $("#errMsg").show();
//                    return false;
//                }
//            }
//        } 
//        
//        
//        if ($.trim(content) == "") {
//            $("#errMsg").html("请输入短信内容！");
//            $("#txtContent").focus();
//            $("#errMsg").show();
//            return false;
//        }
//        if (newTemplate == 1) {
//            if ($.trim(newTemplateName) == "") {
//                $("#errMsg").html("请输入新模板名称！");
//                $("#txtNewTemplateName").focus();
//                $("#errMsg").show();
//                return false;
//            } else {
//                //判断是否存在
//                var isExit = false;
//
//                $("#selTemplate").find("option").each(function () {
//                    if ($(this).text() == newTemplateName) {
//                        isExit = true;
//                    }
//                });
//                if (isExit) {
//                    $("#errMsg").html("模板名称已存在！");
//                    $("#txtNewTemplateName").focus();
//                    $("#errMsg").show();
//                    return false;
//                }
//            }
//        }
//        //如果短信内容没修改，则不提交雁书
//        if (type != 5 && type != 6) {
//            if ($("#txtContent").val() != $("#smsContent").val()) {
//                isValid = 2;
//            }
//        }
//
//        var data = {
//            patternId: $("#hidPatternId").val(),
//            type: type,
//            task: encodeURIComponent(task),
//            memberGrade: memberGrade,
//            subId: subId,
//            isValid: isValid,
//            sellerMobiles: sellerMobiles,
//            couponId: couponId,
//            couponEndTime: couponEndTime,
//            reminderType: reminderType,
//            reminderTime: reminderTime,
//            delayRemindMinuter: delayRemindMinuter,
//            delayRemindMinuter1: delayRemindMinuter1,
//            content: encodeURIComponent(content),
//            templateid: templateid,
//            updateTemplate: updateTemplate,
//            newTemplate: newTemplate,
//            newTemplateName: encodeURIComponent(newTemplateName),
//            remarkType: remarkType,
//            remarkFlag: encodeURIComponent(remarkFlag),
//            remarkSignType: remarkSignType,
//            remarkSign: remarkSign,
//            isAddRemarkTime: isAddRemarkTime,
//            isAvoidMolest: isAvoidMolest,
//            comment: comment,
//            order: orderSelect,
//            refundStatus: refundStatus,
//            isCommitForCheck: commitForCheck,
//            areaDetail: $("#hidAreaDetail").val(),
//            urgeTarget: $("input[type=radio][name=ConcertTarget]:checked").val()
//        };
//
//        $("#btnSave").prop("disabled", true);
//
//        $.ajax({
//            url: "/MemberAuto/SaveConcertPattern",
//            data: data,
//            type: "post",
//            success: function (json) {
//                $("#btnSave").removeAttr("disabled");
//                if (json.IsOK) {
//                    window.parent.location.reload();
//                } else {
//                    alert(json.Description);
//                }
//            },
//            error: function (e) {
//                $("#btnSave").removeAttr("disabled");
//                alert(e);
//            }
//        });
//    } else {//保存邮件
//        isValid = $("input[type=radio][name=EmailOpen]:checked").val();
//        var templateIdEmail = $("#selTemplateEmail").val();
//        if (templateIdEmail < 1) {
//            alert("请选择邮件模板！");
//            return false;
//        }
//        var data2 = {
//            patternId: $("#hidPatternId").val(),
//            type: type,
//            task: encodeURIComponent(task),
//            memberGrade: memberGrade,
//            subId: subId,
//            order: orderSelect,
//            refundStatus: refundStatus,
//            isValid: isValid,
//            templateIdEmail: templateIdEmail,
//            reminderType: reminderType,
//            reminderTime: reminderTime
//        };
//        //保存邮件模板
//        $.ajax({
//            url: "/MemberAuto/SaveConcertPatternEmail",
//            data: data2,
//            type: "post",
//            success: function (json) {
//                $("#btnSave").removeAttr("disabled");
//                if (json.IsOK) {
//                    window.parent.location.reload();
//                } else {
//                    alert(json.Description);
//                }
//            },
//            error: function (e) {
//                $("#btnSave").removeAttr("disabled");
//                alert(e);
//            }
//        });
//    }
//    return true;
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
