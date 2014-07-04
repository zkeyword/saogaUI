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
		            $("#spansubCount").html('总人数：' + obj.count + '人' + html);
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
	$("#spansubCount").html('');				
}