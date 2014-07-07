var taskNameExist = false;
//检查任务名称是否重复
function checkTaskName(vv) {
	alert(12312);
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
	alert(123);
	$("#hidSubID").val("");
	//$("#txtSubdivson").val("");
	$("#spansubCount").html('统计人数');
	 $("#spansubCount").css("color", "green");
	$("#clearsub").remove();
}


//删除模板
function DeleteTemplate() {
    if ($("#selTemplate").val() != "") {
        if (confirm("您确认要删除吗？")) {
            var data = { id: $("#selTemplate").val() };
            $.ajax({
                url: "/apps/service/memberAuto/DeleteConcertPatternTemplate.do",
                data: data,
                type: "post",
                success: function (json) {
                    if (json.IsOK) {
                        $("#selTemplate option:selected").remove();
                        $("#p_update").css("display", "none");
                        $("#p_add").css("display", "");
                    } else {
                        alert(json.Description);
                    }
                },
                error: function (e) {
                    alert(e);
                }
            });
        }
    } else {
        alert('请选择要删除的模板');
    }
}

//文本框只能输入数字
function onlyNum(obj,id){
	obj.on("keypress","#"+id,
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

