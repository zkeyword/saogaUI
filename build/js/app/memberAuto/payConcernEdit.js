var taskNameExist = false;
//初始化操作
$(function(){ 
	var patternType=$("#hidPatternType").val();
	var type=$("#hidType").val();
	//自动备注---备注签名隐藏与显示
     if(type=='5'){
    	 $("#selRemarkSign").change(function(){
    		 if($("#selRemarkSign").is(":checked")){
    			 $("#remarkSign").show();
    			 $("#remarkSign").val('');
    		 }else{
    			 $("#remarkSign").hide();
    		 }
    	 });    	 
     }
	if(patternType=="sms"){   //短信
		AllowSignatrue();
		//绑定只能输入数字
		onlyNum("delayRemindMinuter1");    //定时         		
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

	            $("#checkboxForNew").removeAttr("checked");
	        } else {
	            $("#p_update").css("display", "none");
	            $("#p_add").css("display", "");
	            
	            $("#checkboxForSelf").removeAttr("checked"); 
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
	}else if(patternType=="email"){	 //邮件
	    //回写邮件模板选中项
	    var teid = parseInt($("#TemplateIdEmail").val());
	    if (teid > 0) {
	        $("#selTemplateEmail").val(teid);
	        ChangeEmailTemplate($("#selTemplateEmail"));
	    }  		
	}

    //会员等级下拉框初始化
    $("#selMemberGrade").val($("#hidMemberGrade").val());
    
    //处理优先级下拉框初始化
    $("#orderSelect").val($("#hidOrder").val());
    
 });


//检查任务名称是否重复
function checkTaskName(vv) {
    var type = $("#hidType").val();
    var pid = $("#hidPatternId").val();
    if (vv != "") {
        var  data = { patternID: pid, taskName: vv , type: type };
        $.ajax({
            url: root+"/apps/service/memberAuto/isTaskNameExist.do",
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
	    var url = root+'/apps/service/memberAuto/getUserCountByID.do';
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
		            var html = '<a href="javascript:void(0);" id="clearsub" onclick="clearsub();" style="color:red;">清  空</a>';
		            $("#spansubCount").html('总人数：' + obj.count + '人 ');
		            var txt1="<input type='hidden' data-id='"+obj.count+"' id='testData'/>"; 
		            $("#spansubCount").append(txt1);
		            if($("#clearsub")[0]==undefined){
		            	$("#spansubCount").after(html);
		            }
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
	$("#spansubCount").html('统计人数');
	$("#spansubCount").css("color", "green");
	$("#clearsub").remove();
}


//点击短信内容上的小标签  计算字符
function addMemberAutoPlaceholder(e) {
	$("#txtContent").insert($(e).attr("lang"));
    CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', false, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
}


//删除模板
function deleteTemplate() {
    if ($("#selTemplate").val() != "") {
        Dialog.confirm({
	        text:"您确定要删除吗？",
	        ok:function(){
	            var data = { id: $("#selTemplate").val() };
	            $.ajax({
	                url: root+"/apps/toolbox/marketingTemplate/deleteTemplate.do",
	                data: data,
	                type: "post",
	                dataType:"text",
	                success: function (msg) {
	            	    var json=eval('('+msg+')');
	                    if (json.isDelete) {
	                        $("#selTemplate option:selected").remove();
	                        $("#p_update").css("display", "none");
	                        $("#p_add").css("display", "");
	                    } else {
	                        Dialog.alert({text:"删除模板失败"});
	                    }
	                },
	                error: function (e) {
	                    Dialog.alert({text:"删除模板调用action失败"});
	                }
	            });
	        },
	        no:function(){
	        	
	        }
         });	    	
    } else {
        Dialog.alert({text:"请选择要删除的模板"});
    }
}


//表单验证定义
$("#memberAutoForm").validate({
    rules:{
			'task' : {required:true},
			'txtContent' : {required:function(){
				                var hidPatternType=$("#hidPatternType").val();
				                if(hidPatternType=="sms"){
				                	return true;
				                 }
				                 return false;
			                }			
             },
 			'txtNewTemplateName' : {required:function(){
            	           $("#txtNewTemplateName").focus();
            	           return true;
                   }
             },
            'txtRemarkContent':{required:function(){
				            	   var type=$("#hidType").val();
				            	     if(type=='5'){
				            		    return true;
				            	     }
				            	         return false;
                                      }
            },
            'remarkSign':{required:function(){
            	 var type=$("#hidType").val();
        	     if(type=='5'){
        	    	 var isRemarkSignType=$("input[type='checkbox'][name='remarkSignType']").checked;
        	    	 //console.log(isRemarkSignType);
        	    	 if(isRemarkSignType){
        	    		 return true; 
        	    	 }else{
        	    		 return false;
        	    	 }       		    
        	     }
        	         return false;
                  }                        	
            }
	},	
	messages:{
			'task' : {required:"任务名称不为空"},
			'txtContent' : {required:"短信内容不为空"},
			'txtNewTemplateName':{required:"新模板名称不为空"},
			'txtRemarkContent':{required:"备注内容不为空"},
			'remarkSign':{requred:"备注签名不能为空"}
    },
    errorPlacement: function(error, element){
    	error.appendTo(element.parent());
    }
}); 

//保存操作
function savePattern(commitForCheck) {
	if(taskNameExist){
        $("#txtTask").focus();
        return false;		
	}
    if($("#remindTime1").is(":checked")) {
        $("#txtRemindTimeHour").val("1");
        $("#txtRemindTimeMinuter").val("0");
    }	
	if($("#memberAutoForm").valid()==false){
		return;	
	}
    //店铺签名为空进行验证
	if($("#SMSSignature").val()==""){
		Dialog.alert({text:"签名不能为空"});	 
//	    var data = {
//				shopId: $("#SMSSignatureList").val()
//	    }
//	    var shopLabelTemplate = saogaUI.template('shopLabelTemplate', data); 
//   		saogaUI.ui.pop({
//   			title:'设置签名',
//   			html: shopLabelTemplate,
//			width:200,
//			height:80,
//   			onloadFn:function(id){
//
//   			},
//   			btns:[
//  				{
//  			    	text:'关闭',
//  			    	onclick:function(){
//  			
//  					}
//  				}
//  			]
//   		});	
   		return;
	}
	//自动备注执行的保存
	if(type==5){
     		Dialog.alert({text:"执行自动备注"});	 
		  //进行ajax请求
	        $.ajax({
	            url: root+"/apps/service/memberAuto/saveConcertPattern.do",
	            data: decodeURIComponent($("#memberAutoForm").serialize()),
	            type: "post",
	            dataType:"text",
	            success: function (msg) {
	                //$("#btnSave").removeAttr("disabled");
	        	    var obj=eval('('+msg+')');
	                if (obj.isOK) {
	                	//关闭弹框
	                    popObj.close();
	                	//主页面搜索
	                    $("#search").click();
	                } else {
	                	Dialog.alert({text:"保存失败"});	
	                }
	            },
	            error: function (e) {
	                //$("#btnSave").removeAttr("disabled");
                	Dialog.alert({text:"保存错误"});	
	            }
	        });
	        
	        return true;
	 } 
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
        //如果短信内容没修改，则不提交雁书
        if (type != 5 && type != 6) {
            if ($("#txtContent").val() != $("#smsContent").val()) {
                $("#strIsValid").val(2);
            }
        }
        //进行ajax请求
        $.ajax({
            url: root+"/apps/service/memberAuto/saveConcertPattern.do",
            data: decodeURIComponent($("#memberAutoForm").serialize()),
            type: "post",
            dataType:"text",
            success: function (msg) {
                //$("#btnSave").removeAttr("disabled");
        	    var obj=eval('('+msg+')')
                if (obj.isOK) {
                	//关闭弹框
                	popObj.close('concertPattern');
                	//主页面搜索
                    $("#search").click();
                } else {
                	 Dialog.alert({text:"保存失败"});
                }
            },
            error: function (e) {
                //$("#btnSave").removeAttr("disabled");
            	 Dialog.alert({text:"保存错误"});
            }
        });
    } else {//保存邮件
        isValid = $("input[type=radio][name=EmailOpen]:checked").val();
        var templateIdEmail = $("#selTemplateEmail").val();
        //当选择模板时修改表单传值参数的值
        $("#TemplateIdEmail").val(templateIdEmail);
        if (templateIdEmail < 1) {
        	$("#selTemplateEmailDiv").append("<span id='selTemplateEmailMessage'>请选择邮件模板!</span>");
            return false;
        }
        //保存邮件模板
        $.ajax({
            url: root+"/apps/service/memberAuto/saveConcertPatternEmail.do",
            data: decodeURIComponent($("#memberAutoForm").serialize()),
            type: "post",
            dataType:"text",
            async:false,
            success: function (msg) {
                var json=JSON.parse(msg);
                if (json.isOK) {
                	//关闭弹框
                	popObj.close();
                	//主页面搜索
                    $("#search").click();
                } else {
                	Dialog.alert({text:json.Description});
                }
            },
            error: function (e) {
                //$("#btnSave").removeAttr("disabled");
           	 	Dialog.alert({text:"保存错误"});
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
        },
        error: function (request) {
       	 	Dialog.alert({text:"是否允许短信签名 ajax 出错"});
        }
    });
}


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
            //计算短信数字
            CalculateSmsNumNew($("#txtContent"), 'templateLengthMsg', false, false, 'SMSSignature', $("#kedaoSignLength").val(), $("#oneSmsLength").val(), $("#multiSmsLength").val());
        },
        error: function (request) {
       	 	Dialog.alert({text:"获取店铺短信签名 ajax 出错"});
        }
    });
}


//邮件预览
function ShowPreview() {
    var type = parseInt($("#hidType").val());
    var emailTemplateType = -1;
    if (type == 0) {
        //签收
        emailTemplateType = 6;
    }
    else if (type == 1) {
        //发货
        emailTemplateType = 7;
    }
    else if (type == 2) {
        //升级提醒
        emailTemplateType = 11;
    }
    else if (type == 3) {
        //付款
        emailTemplateType = 9;
    }
    else if (type == 4) {
        //退款
        emailTemplateType = 10;
    }
    else if (type == 7) {
        //到达
        emailTemplateType = 8;
    }
    else if (type == 8) {
        //确认
        emailTemplateType = 14;
    }
    var color = $("#hidColor").val();
    if (color == "") {
        color = "#9BD5FD";
    }
    var cdf = "";
    cdf = $("#hidCustomDefinition").val();
    var cdfHead = "";
    cdfHead = $("#hidCustomDefinitionHead").val();
    var cdfText = $("#hidCustomDefinitionText").val();
    var itemIds = $("#hidItemId").val();
    var url = root+"/apps/service/memberAuto/memberBillTemplateBrowse.do?ItemID=" + encodeURIComponent(itemIds) + "&color=" + encodeURIComponent(color) 
    + "&emailTemplateType=" + emailTemplateType;
    //进行弹窗
    openPostWindow(url, encodeURIComponent(cdfHead),encodeURIComponent(cdf),encodeURIComponent(cdfText), "MemberBillTemplateBrowse");
}

//弹窗
function openPostWindow(url, data1, data2, data3, name) {
    form = $("<form></form>");
    form.attr('id',"TemplateBrowse");
    form.attr('method','post');
    form.attr('action',url);
    form.attr('target',name);
    
    input1 = $("<input type='hidden' name='CustomDefinitionHead'/>");
    input1.attr('value',data1);
    
    input2 = $("<input type='hidden' name='CustomDefinition'/>");
    input2.attr('value',data2);
    
    input3 = $("<input type='hidden' name='CustomDefinitionText'/>");
    input3.attr('value',data3);
    
    form.append(input1);
    form.append(input2);
    form.append(input3);
    form.appendTo("body");
    form.css('display','none');
    form.submit();
    $(body).remove($("#TemplateBrowse"));
}

//选择邮件模板
function ChangeEmailTemplate(obj) {
	//去除提示
	if(typeof($("#selTemplateEmailMessage"))!=undefined){
		$("#selTemplateEmailMessage").remove();	
	}
    var eid = $(obj).find("option:selected").val();
    //Dialog.alert({text:eid});
    if (eid != null && eid != "" && eid > 0) {
        try {
            $.ajax({
                url: root+"/apps/service/memberAuto/getTemplate.do",
                type: "post",
                datatype: "text",
                data: { "id": eid },
                success: function (templateData) {
                    $("#hidColor").val(templateData.Color);
                    $("#hidCouponId").val(templateData.Coupons);
                    $("#hidItemId").val(decodeURIComponent(templateData.ItemIDs));
                    $("#hidCustomDefinition").val(templateData.CustomDefinition);
                    $("#hidCustomDefinitionHead").val(templateData.CustomDefinitionHead);
                    $("#hidCustomDefinitionText").val(templateData.CustomDefinitionText);
                },
                error: function () {
                	Dialog.alert({text:"邮件模板类型  template字段值错误"});
                }
            });
        } catch (e) {
        }
        $("#btnPreview").show();
        
    } else {
        $("#btnPreview").hide();
    }
}

//自动备注

//#region 绑定省,市 改变事件
//#region 页面加载后...//加载原来就存在的订单地区      
 
  //回写地区页面信息
  var area = $("#hidAreaDetail").val();
  
  if (area != null && area != "" && area.indexOf("pid") > 0) {
      var dataProvince = JSON.parse(area);
      for (var i = 0; i < dataProvince.length; i++) {
    	  
          var strArea = "";
          var cityCount = 0;
          var dp = dataProvince[i];
          //console.log(dp);
          strArea += "<table id=\"table" + dp.pid +
              "\" style=\"width:100%;\"><tr class=\"cpAreaDiv\" style=\"background-color: #F3F3F3;\"><td><input id=\"" + dp.pid +
              "\" name=\"province\" type=\"checkbox\" onclick=\"SelectAllCity(this," + dp.pid + ");\" /><label id=\"lab" + dp.pid +
              "\" class=\"lbl\" for=\"" + dp.pid + "\">" + dp.pname +
              "</label><span style=\"float: right\"><a href=\"javascript:void(0);\" onclick=\"DelAreaTable('" + dp.pid + "');\">删除－</a>" +
              "</span></td></tr><tr><td><ul>";
          //Dialog.alert({text:"dp.city.length:"+dp.city.length});
          $.ajax({
        	  url:root+"/apps/order/cityList.do",
              type: "post",
              async: false,
              data: ({ provinceId: dp.pid }),
              dataType: "json",
              success: function (html) {
              	var val = eval(html.result);   
              	//console.log(val);
                  $.each(val, function (k) {
                      strArea += "<li style=\"float:left; margin-right: 10px;\"><input id=\"" + val[k].tbId+ "\" name=\"city" + dp.pid +
                          "\" type=\"checkbox\" onclick=\"ChangeProvinceSelected(" + dp.pid + ");\" /><label id=\"lab" + val[k].tbName +
                          "\" class=\"lbl\" for=\"" + val[k].tbId + "\">" + val[k].tbName + "</label></li>";
                  });
                  strArea += "</ul></td></tr></table>";
                  $("#divAreaInfo").append(strArea);
                  //把选中的重新勾上
                  for (var j = 0; j < dp.city.length; j++) {
                      var dc = dp.city[j];
                      $("#" + dc.cid).attr("checked", true);
                      cityCount = cityCount + 1;
                  }
                  ChangeProvinceSelected(dp.pid);
              }
          });
          //当只有保存省份，没保存城市时，将城市全部选上
          if (cityCount == 0) {
              $("input[name='city" + dp.pid + "'][type='checkbox']").each(function () {
                  $(this).attr("checked", true);
              });
              ChangeProvinceSelected(dp.pid);
          }
      }
  }

$(document).ready(function () {
  try {
      BindArea();
  } catch (e) { Dialog.alert({text:e}); }
});


function BindArea() {
  $.ajax({
  	url:root+"/apps/order/areaList.do",
      type: "post",
      data: ({areaType:2}),
      dataType: "json",
      success: function (html) {
      	//console.log(html);
          var drpProvinceOption = ("<option value=''>全部省份</option>");
          var area = eval(html.result);
          $.each(area, function (index) {
          	var val = area[index];
              drpProvinceOption += ("<option value='" + val.tbId + "'>" + val.tbName + "</option>");
          });
          var strTmp = "<span style='text-align: left;'>" +
          "<select id='drpProvince' name='drpProvince'>" + drpProvinceOption + "</select>省 " +
          "</span>&nbsp;&nbsp;<a href='javascript:void(0);' onclick='AddArea();'>添加＋</a>";
          try {
              $("#drpArea").append(strTmp);
          } catch (e) { Dialog.alert({text:e}); }
      },
      error: function (e) { Dialog.alert({text:e}); }
  });
}

//选择市
function ChangeCity(obj) {
  var parentId = $(obj).val();
  var districtObj = $(obj).parent().children("select")[2];

  if (parentId == "") {
      $(districtObj).val("");
  }

  $.ajax({
  	 url:root+"/apps/order/cityList.do",
       type: "post",
      data: ({ provinceId: parentId }),
      dataType: "json",
      success: function (html) {
      	var area = eval(html.result);
          $(districtObj).html("").append("<option value=''></option>");
          $(area).each(function(index){
              var val = area[index];
              $(districtObj).append("<option value='" + val.tbId + "'>" + val.tbName + "</option>");
          });
      }
  });
}

function AddArea() {
  var obj = $("#drpProvince");
  var parentId = obj.val();
  if (parentId != "") {
      //判断是否已存在
      var id = $("#table" + parentId).attr("id");
      if (id != undefined) {
    	  Dialog.alert({text:"当前省份信息已存在！"});
          return;
      }
      //
      var strArea = "<table id=\"table" + parentId +
          "\" style=\"width:100%;\"><tr class=\"cpAreaDiv\" style=\"background-color: #F3F3F3;\"><td><input id=\"" + parentId +
              "\" name=\"province\" type=\"checkbox\" onclick=\"SelectAllCity(this," + parentId + ");\" /><label class=\"lbl\" id=\"lab" + parentId +
                  "\" for=\"" + parentId + "\">" + $(obj).find("option:selected").text() +
              "</label><span style=\"float: right\"><a href=\"javascript:void(0);\" onclick=\"DelAreaTable('" + parentId + "');\">删除－</a>" +
                  "</span></td></tr><tr><td><ul>";
      $.ajax({
      	 url:root+"/apps/order/cityList.do",
           type: "post",
           data: ({ provinceId: parentId }),
          dataType: "json",
          success: function (html) {
          	var area = eval(html.result);
              $.each(area, function (index) {
              	 var val = area[index];
                  strArea += "<li style=\"float:left; margin-right: 10px;\"><input id=\"" +  val.tbId  + "\" name=\"city" + parentId +
                      "\" type=\"checkbox\" onclick=\"ChangeProvinceSelected(" + parentId + ");\" /><label class=\"lbl\" id=\"lab" +  val.tbId  +
                          "\" for=\"" +  val.tbId  + "\">" + val.tbName + "</label></li>";
              });
              strArea += "</ul></td></tr></table>";
              $("#divAreaInfo").append(strArea);
          }
      });
  }
}

function DelAreaTable(pid) {
  $("#table" + pid).remove();
}

function SelectAll() {
  if ($("#chkAllArea").attr("checked") == "checked") {
      $("input[type='checkbox']").each(function () {
      	//注意备注签名备注时间是否选中的状态不可以改变，要排除
      	var isRemarkSignType=$("input[name='remarkSignType']").checked;
      	var isAddRemarkTime=$("input[name='isAddRemarkTime']").checked;
          $(this).attr("checked", true);
          if(!isRemarkSignType)$("input[name='remarkSignType']").attr("checked",false);
          if(!isAddRemarkTime)$("input[name='isAddRemarkTime']").attr("checked",false);
          
      });
  } else {
      $("input[type='checkbox']").each(function () {
      	var isRemarkSignType=$("input[name='remarkSignType']").checked;
      	var isAddRemarkTime=$("input[name='isAddRemarkTime']").checked;
          $(this).attr("checked", false);
          if(isRemarkSignType)$("input[name='remarkSignType']").attr("checked",true);
          if(isAddRemarkTime)$("input[name='isAddRemarkTime']").attr("checked",true);
      });
  }
}

function SelectAllCity(par, id) {
  if ($(par).attr("checked") == "checked") {
      $("input[type='checkbox'][name='city" + id + "']").each(function () {
          $(this).attr("checked", true);
      });
  } else {
      $("input[type='checkbox'][name='city" + id + "']").each(function () {
          $(this).attr("checked", false);
      });
  }
}

function ChangeProvinceSelected(pid) {
  var selectAll = true;
  $("input[type='checkbox'][name='city" + pid + "']").each(function () {
      if ($(this).attr("checked") == undefined) {
          selectAll = false;
      }
  });
  $("#" + pid).attr("checked", selectAll);
}

//订单地区配置
//展示页面
function EditOrderArea() {
  var strHtml = $("#orderAreaDetail").html();
  $.colorbox({
      title: "地区配置",
      inline: true,
      href: strHtml,
      overlayClose: false,
      transition: "none",
      height: "410px",
      width: "530px",
      scrolling: true
  });
}

//保存订单地区明细
function SaveAreaDetail() {
  var strAreaInfo = "";
  $("input[name='province'][type='checkbox']").each(function () {
      var dataProvince = "";
      var dataCity = "";
      var itemAll = 0;
      var itemChecked = 0;
      $("input[name='city" + $(this).attr("id") + "'][type='checkbox']").each(function () {
          itemAll = itemAll + 1;
          if ($(this).attr("checked")) {
              itemChecked = itemChecked + 1;
              dataCity += ",{\"cid\": \"" + $(this).attr("id") + "\",\"cname\":\"" + $("#lab" + $(this).attr("id")).html() + "\"}";
          }
      });
      if (itemAll == itemChecked) {
          dataCity = "";
      }
      else {
          dataCity = dataCity.substring(1);
      }
      if (itemChecked > 0) {
          dataProvince = ",{\"pid\":\"" + $(this).attr("id") + "\",\"pname\":\"" + $("#lab" + $(this).attr("id")).html() + "\",\"city\":[" + dataCity + "]}";
          strAreaInfo += dataProvince;
      }
  });
  if (strAreaInfo != "") {
      strAreaInfo = "[" + strAreaInfo.substring(1) + "]";
  }
  $("#hidAreaDetail").val(strAreaInfo);
  //切回原来页面
  ChangeShowInfo(0);
  //改变提示信息
  if (strAreaInfo != "") {
      $("#areaNoSelected").hide();
      $("#areaSelected").show();
  }
  else {
      $("#areaNoSelected").show();
      $("#areaSelected").hide();
  }
}

//切换自动备注订单地区细化页面
function ChangeShowInfo(par) {
  if (par == "1") {
// 	 if( popObj ){
//		 popObj.modifyBtns('');
//	 }
      $("#divMain").fadeOut("300");
      setTimeout(function () {$("#orderAreaDetail").fadeIn("300");},400);
      
  }
  else if (par == "0") {
// 	 if( popObj ){
//		 popObj.modifyBtns('');
//	 }
      $("#orderAreaDetail").fadeOut("300");
      setTimeout(function () { $("#divMain").fadeIn("300"); }, 400);
  }
}

//清空地区页面信息
function DelAllAreaDetail() {
  $("#hidAreaDetail").val("");
  $("#divAreaInfo").html("");
  $("#areaNoSelected").show();
  $("#areaSelected").hide();
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