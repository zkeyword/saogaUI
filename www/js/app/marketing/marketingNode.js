
var emailEditor;

//#region 分组

//搜索客户分组
function searchSubdivision() {
    var name = $("#searchSubdivisionInput").val();
    if ($.trim(name) == "") {
        $("#ktreeSearch").hide();
        $("#ktreehidden").show();
    }
    else {
        ajaxDone('/marketing/GetSubdivisionByName', { name: name }, function (json) {
            if (json == null || json.length == 0) {
                $("#ktreeSearch").html("<div id='noMsg' style='text-align:center;color:#f60;margin:2px'>暂无相关数据!</div>");
                $("#ktreeSearch").show();
                $("#ktreehidden").hide();
            }
            else {
                var html = "";
                $.each(json, function (i) {
                    var key = json[i].Key;
                    var value = json[i].Value;
                    var title = json[i].KeyChar;
                    var showValue = value;
                    if (value.length > 23)
                        showValue = value.substring(0, 20) + '...';

                    html += '<li>';
                    html += '<span class="user"><a title="' + htmlEncode(title) + '"onclick="SetUserSubMenuValue(' + key + ',\'' + htmlEncode(value) + '\');" href="javascript:void(0)">' + showValue + '</a></span>';
                    html += '</li>';
                });
                $("#ktreeSearch").html(html);
                $("#ktreeSearch").treeview();
                $("#ktreeSearch").show();
                $("#ktreehidden").hide();
            }
        });
    }
}

//选择分组
function SetUserSubMenuValue(id, value) {
    $("#txtSubdivisonName").val(UrlDecode(value));
    $("#txtSubTaskName").val(UrlDecode(value));
    $("#hidSubdivisonId").val(id);
    $("#spanSubdivisonPeopleCount").html("<a href='#' onclick='showUserCount();'>统计</a>");
    $("#treeMenu").hide();
}

//绑定分组
function bindSubdivison(jsonData) {
    try {
        var nowDate = new Date();
        $("#txtSubTaskName").val("分组客户");
        $("#txtSubSendTime").val($("#timetoday").val());
        $("#SubSendHour").val(nowDate.getHours());
        $("#SubSendMin").val("0");
        $("#txtSubdivisonName").val("");
        $("#hidSubdivisonId").val("");
        $("#txtSubRemark").val("");

        if ($("#hidActivityType").val() == "2") {
            $(".delayTime").show();
            $("#trLoopTip").show();
            $(".absoluteTime").hide();
        }
        else {
            $(".delayTime").hide();
            $("#trLoopTip").hide();
            $(".absoluteTime").show();
        }

        var guid = "";
        if (jsonData != '') {
            var jsonObject = JSON.parse(jsonData);
            guid = jsonObject.guid;
            $("#txtSubTaskName").val(MarketingDecodeURIComponent(jsonObject.nodeName));
            $("#txtSubSendTime").val(jsonObject.sendTime);
            $("#SubSendHour").val(jsonObject.sendHour);
            $("#SubSendMin").val(jsonObject.sendMin);
            $("#txtSubdivisonName").val(MarketingDecodeURIComponent(jsonObject.subdivsonName));
            $("#hidSubdivisonId").val(jsonObject.subdivsonId);
            if (typeof (jsonObject.remark) != 'undefined') {
                $("#txtSubRemark").val(MarketingDecodeURIComponent(jsonObject.remark));
            }
            if (typeof (jsonObject.delayMinute) != 'undefined') {
                $("#txtSubDelayHour").val(ConvertToFloat(jsonObject.delayMinute) / 60);
            }
        }

        if (guid != "" && !IsCanEditNode(guid)) {
            $("#txtSubTaskName").prop("disabled", true);
            $("#txtSubSendTime").prop("disabled", true);
            $("#SubSendHour").prop("disabled", true);
            $("#SubSendMin").prop("disabled", true);
            $("#txtSubDelayHour").prop("disabled", true);
            $("#txtSubdivisonName").prop("disabled", true);
            $("#txtSubRemark").prop("disabled", true);
            $("#selUser").hide();
        }
        else {
            //分组选择
            $("#trreTd").bind("mouseleave", function () { $("#treeMenu").hide(); });
            $("#txtSubdivisonName").bind("click", function () { $("#treeMenu").toggle(); });
            //显示统计人数
            $("#spanSubdivisonPeopleCount").html("<a href='#' onclick='showUserCount();'>统计</a>");
        }
    } catch (e) {
         DoDesign.alert(e);
    }
}

//显示满足条件的用户数量
function showUserCount() {
    var id = $("#hidSubdivisonId").val();
    if ($.trim(id) != '') {
        $("#spanSubdivisonPeopleCount").html('统计中…');

        var url = '/UserSubdivision/GetUserCountByID';
        var data = { UserSubdivisionID: $("#hidSubdivisonId").val() };
        ajaxDone(url, data, function (json) {
            if ($("#hidSubdivisonId").val() == id) {
                $("#spanSubdivisonPeopleCount").html('总人数：' + json + '人');
            }
        });
    }
    else {
         DoDesign.alert('请选择分组！');
    }
}

//保存分组
function SelSubdivison() {
    var cellIds = $("#hidId").val();
    var cellStyle = $("#hidStyle").val();
    
    $("#subdivisonError").hide();
    var strError = '';
    var taskName = $("#txtSubTaskName").val();
    var sendTime = $("#sendTime").val();
    //var sendHour = $("#SubSendHour").val();
  //  var sendMin = $("#SubSendMin").val();
    var sendDelayHour = $("#txtSubDelayHour").val();
    var subdivsonName = $("#txtSubdivisonName").val();
    var subdivsonId = $("#txtSubdivson").val();
    var remark = $("#txtSubRemark").val();

    //基础校验
    if (taskName == '') {
        strError += "节点名称不能为空！";
    }
     if (sendTime == ''||sendTime==undefined) {
    	 sendTime  = $("#timetoday").val();
        //strError += "执行时间不能为空！";
    }
//    if (sendDelayHour == '') {
//        strError += "延时执行小时不能为空！";
//    }
    if (subdivsonId == '') {
        strError += "请选择分组！";
    }

    if (strError != '') {
        $("#subdivisonError").show();
        $("#subdivisonError").html(strError);
        return;
    }

    var editIds = cellIds.split(',');
    //依次保存节点值
    for (var i = 0; i < editIds.length; i++) {
        var curId = editIds[i];
        if ($.trim(curId) != "") {
            var curTaskName = taskName + (i > 0 ? "(" + i + ")" : "");
            var data = {
                guid: curId,
                cellId: curId,
                cellStyle: cellStyle,
                nodeName: curTaskName,
                sendTime: sendTime,
                sendDelayHour:sendDelayHour,
                //sendHour: sendHour,
                //sendMin: sendMin,
                //delayMinute: ConvertToFloat(sendDelayHour) * 60,
                subdivsonId: subdivsonId,
                subdivsonName: subdivsonName,
                remark: remark
            };
            //设置的json数据
            var jsonData = JSON.stringify(data);
            //提示内容
            var tipDate = "";

            if ($("#hidActivityType").val() == "2") {
                tipDate = "<span  cid='" + curId + "' class='nodeDateTip'>延时: " + ConvertToFloat(sendDelayHour) + " 小时</span><br/>";
            } else {
               /// tipDate = "<span cid='" + curId + "' class='nodeDateTip'>" + sendTime + ' ' + (sendHour.length == 1 ? '0' + sendHour : sendHour) + ':' + (sendMin.length == 1 ? '0' + sendMin : sendMin) + '</span><br/>';
            	tipDate = "<span cid='" + curId + "' class='nodeDateTip'>" + sendTime + '</span><br/>';
            }
            tipDate += curTaskName;

            //保存设置
            SaveConfigData(curId, cellStyle, tipDate, jsonData);
        }
    }

   // window.parent.$.colorbox.close();
}

//#endregion

//#region 导入

//导入文件节点
function bindFileNode(jsonData) {
    try {
        $("#trFileNodeCompleted").hide();
        $("#trFileNodeUpload").hide();
        $("#txtFileNodeName").val("导入客户");
        $("#txtFileNodeSendTime").val($("#timetoday").val());
        $("#fileNodeSendHour").val("0");
        $("#fileNodeSendMin").val("0");
        $("#txtFileNodeRemark").val("");


        var guid = "";
        if (jsonData != '') {
            var jsonObject = JSON.parse(jsonData);
            guid = jsonObject.guid;
            $("#trFileNodeCompleted").show();
            $("#txtFileNodeName").val(MarketingDecodeURIComponent(jsonObject.nodeName));
            $("#txtFileNodeSendTime").val(jsonObject.sendTime);
            $("#fileNodeSendHour").val(jsonObject.sendHour);
            $("#fileNodeSendMin").val(jsonObject.sendMin);
            $("#txtFileNodeFileName").val(MarketingDecodeURIComponent(jsonObject.fileName));
            $("#hidFileReocrdCount").val(jsonObject.numberCount);
            $("#hidFilePath").val(MarketingDecodeURIComponent(jsonObject.fileNodePath));
            $("#txtFileNodeRemark").val(MarketingDecodeURIComponent(jsonObject.remark));
        }
        else {
            $("#trFileNodeUpload").show();
        }

        if (guid != "" && !IsCanEditNode(guid)) {
            $("#txtFileNodeName").prop("disabled", true);
            $("#txtFileNodeFileName").prop("disabled", true);
            $("#txtFileNodeRemark").prop("disabled", true);
            $("#deleteSelectedFile").hide();
            $("#btnSaveFileNode").hide();
        }
    } catch (e) {
         DoDesign.alert(e);
    }
}

//保存导入文件
function SelFileNode() {
    try {        
        var nodeName = $("#txtFileNodeName").val();
        var sendTime = $("#txtFileNodeSendTime").val();

        $("#fileNodeError").hide();

        var strError = "";
        //基础校验
        if (nodeName == '') {
            strError += "节点名称不能为空！";
        }
         if (sendTime == ''||sendTime==undefined) {
            strError += "执行时间不能为空！";
        }

        if (strError != '') {
            $("#fileNodeError").show();
            $("#fileNodeError").html(strError);
            return;
        }
        if ($("#txtFileNodeFileName").val() == '') {
            //上传文件
            UploadKnowledgeSubmit();
        } else {
            uploadSuccess($("#hidFileReocrdCount").val(), $("#txtFileNodeFileName").val(), $("#hidFilePath").val());
        }
    } catch (e) {
         DoDesign.alert(e);
    }
}

//上传文件
function UploadKnowledgeSubmit() {
    $("#fileNodeError").hide();
    $("#btnSaveFileNode").prop("disabled", true);
    var filePath = $("input#FileLink").attr("value");
    //Chrome 浏览器自动添加内容 替换掉
    filePath = filePath.replace("C:\\fakepath\\", "");
    
    var extension = filePath.substr(filePath.lastIndexOf('.') + 1).toLowerCase();
    if ($.trim(filePath) == "") {
        $("#fileNodeError").show();
        $("#fileNodeError").html("请选择要上传的文件！");
        $("#btnSaveFileNode").prop("disabled", false);
        return;
    }
    if (extension != "xls" && extension != "xlsx") {
        $("#fileNodeError").show();
        $("#fileNodeError").html("请选择xls文件上传！");
        $("#btnSaveFileNode").prop("disabled", false);
        return;
    }
    $("#spanFileNodeUpTip").html("正在上传……");
    var url = "/StepMarketing/UploadMarketingFile";
    //上传开始（ajax上传）
    $.ajaxFileUpload(
                {
                    url: url,
                    secureuri: false,
                    fileElementId: 'FileLink',
                    //fileElementArea: '.ym-content', //当1个页面有两个同样的id时，指定范围，否则传空值
                    dataType: 'json',
                    success: function (data, status) {
                        if (typeof (data.result) != 'undefined') {
                            if (data.result == false) {
                                $("#fileNodeError").show();
                                $("#fileNodeError").html(data.error);
                                return;
                            } else {
                                SaveUploadKnowledge(data.msg, filePath);
                            }
                        }
                        //$("a#uploadKnowledgeSubmit").prop("disabled", false);
                    },
                    error: function (data, status, e) {
                        //$("a#uploadKnowledgeSubmit").prop("disabled", false);
                    }
                }
            );
}

//上传结束后开始保存数据
function SaveUploadKnowledge(path, fileName) {
    var _url = "/StepMarketing/SaveUploadMarketing";
    var data = { filePath: path };
    var maxInter = 0;
    $("#spanFileNodeUpTip").html("正在保存");
    var tip = setInterval(function () {
        if (maxInter > 600) {
            clearInterval(tip);
        }
        var txt = $("#spanFileNodeUpTip").html();
        if (txt.length >= 10) {
            $("#spanFileNodeUpTip").html('正在保存');
        } else {
            $("#spanFileNodeUpTip").html(txt + '.');
        }
    }, 500);

    ajaxDone(_url, data, function (json) {
        $("#btnSaveFileNode").prop("disabled", false);
        clearInterval(tip);
        if (json > 0) {
            $("#btnSaveFileNode").html("当前导入" + json + "人");
            uploadSuccess(json, fileName, path);
            window.parent.$.colorbox.close();
        } else {
            $("#fileNodeError").show();
            $("#fileNodeError").html("导入错误或者导入人数为空，请检查导入文件！");
        }
    });
}

//文件保存成功
function uploadSuccess(json, fileName, path) {
    $("#fileNodeError").hide();
    var nodeName = $("#txtFileNodeName").val();
    var sendTime = $("#txtFileNodeSendTime").val();
    var sendHour = $("#fileNodeSendHour").val();
    var sendMin = $("#fileNodeSendMin").val();
    var remark = $("#txtFileNodeRemark").val();

    var strError = "";
    //基础校验
    if (nodeName == '') {
        strError += "节点名称不能为空！";
    }
     if (sendTime == ''||sendTime==undefined) {
        strError += "执行时间不能为空！";
    }

    if (strError != '') {
        $("#fileNodeError").show();
        $("#fileNodeError").html(strError);
        return;
    }

    try {
        var cellIds = $("#hidId").val();
        var cellStyle = $("#hidStyle").val();

        var editIds = cellIds.split(',');
        //依次保存节点值
        for (var i = 0; i < editIds.length; i++) {
            var curId = editIds[i];
            if ($.trim(curId) != "") {
                var curNodeName = nodeName + (i > 0 ? "(" + i + ")" : "");
                //保存数据
                var data = {
                    guid: curId,
                    cellId: curId,
                    cellStyle: cellStyle,
                    nodeName: curNodeName,
                    sendTime: sendTime,
                    sendHour: sendHour,
                    sendMin: sendMin,
                    fileName: fileName,
                    numberCount: json,
                    fileNodePath: path,
                    remark: remark
                };
                var jsonData = JSON.stringify(data);
                var tipDate = "<span cid='" + curId + "' class='nodeDateTip'></span>" + curNodeName + '<br/>(<span style="color:red;font-weight:bold;">' + json + '</span>人)';

                SaveConfigData(curId, cellStyle, tipDate, jsonData);
            }
        }

        window.parent.$.colorbox.close();
    } catch (e) {
         DoDesign.alert(e);
    }
}

//删除文件
function DeleteFileNodeFile() {
    $("#trFileNodeCompleted").hide();
    $("#txtFileNodeFileName").val("");
    $("#trFileNodeUpload").show();
}

//下载上传模板
function getTemplate() {
    $.ajax({
        url: "/StepMarketing/GetMarketingTemplate",
        type: "post",
        success: function (json) {
            if (json.IsOK) {
                if (json.ReturnValue != "") {
                    window.location.href = "/Common/GetExportXls?filePath=" + encodeURI(json.ReturnValue);
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

//#region 筛选/抽取/合并/交集/排除

//保存节点
function SelNode() {
    if (CallValidate("main")) {
        try {
            var cellIds = $("#hidId").val();
            var cellStyle = $("#hidStyle").val();

            var nodeName = $("#txtNodeName").val();
            var nodeSendTime = $("#txtNodeSendTime").val();
            var nodeSendHour = $("#NodeSendHour").val();
           var nodeSendMin = $("#NodeSendMin").val();
            var sendTime = $("#sendTime").val();
            var nodeDelayHour = $("#txtNodeDelayHour").val();
            var nodeRemark = $("#txtNodeRemark").val();

            var nodePercent = $("#txtNodePercent").val();

            var baseNodeId = $("#selBaseNodeFilter").val();
            var targerNodeId = $("#selTargerNodeFilter").val();

            var smsOption = $("#selSmsOptions").is(":hidden") ? "1" : $("#selSmsOptions").val();
            var emailOption = $("#selEmailOptions").is(":hidden") ? "1" : $("#selEmailOptions").val();
            var umpOption = $("#selUmpOptions").is(":hidden") ? "1" : $("#selUmpOptions").val();
            var couponOption = $("#selCouponOptions").is(":hidden") ? "1" : $("#selCouponOptions").val();
            var customerSignOption = $("#selCustomerSignOptions").is(":hidden") ? "1" : $("#selCustomerSignOptions").val();
            var lotteryOption = $("#selLotteryOptions").is(":hidden") ? "1" : $("#selLotteryOptions").val();
            var ebookOption = $("#selEbookOptions").is(":hidden") ? "1" : $("#selEbookOptions").val();
            var eleCouponOption = $("#selEleCouponOptions").is(":hidden") ? "1" : $("#selEleCouponOptions").val();
            var integralOption = $("#selIntegralOptions").is(":hidden") ? "1" : $("#selIntegralOptions").val();
             var integralActivitiesOption = $("#selIntegralActivitiesOptions").is(":hidden") ? "1" : $("#selIntegralActivitiesOptions").val();
            
            var nodeUserFilter = $("#userDetailcontent").html();
            var txtReceiveTime = 0;
            var txtRateTime = 0;
            var rateTimeType = 0;
            var txtRateNum = 0;
            var receiveTimeType = 0;
            var timeType = 0;
            var isOpenCheckTime = $("#IsOpenCheckTime").attr("checked") == "checked" ? true : false;
            if (isOpenCheckTime) {
                txtReceiveTime = $("#txtReceiveTime").val();
                txtReceiveTime = (txtReceiveTime == "" || txtReceiveTime == "undefined") ? 0 : txtReceiveTime;
                txtRateTime = $("#txtRateTime").val();
                txtRateTime = (txtRateTime == "" || txtRateTime == "undefined") ? 0 : txtRateTime;
                rateTimeType = $("#selRateTimeType").val();
                receiveTimeType = $("#selReceiveTimeType").val();
                txtRateNum = $("#txtRateNum").val();
                txtRateNum = (txtRateNum == "" || txtRateNum == "undefined") ? 0 : txtRateNum;
                if (smsOption == 18) {//已确认
                    timeType = receiveTimeType;
                    if (timeType == 0) { //小时
                        if (parseInt(txtReceiveTime) > 10 * 24) {
                             DoDesign.alert("确认收货时间小于等于10天（240个小时）");
                            return;
                        }
                    } else if (timeType == 1) { //天
                        if (parseInt(txtReceiveTime) > 10) {
                             DoDesign.alert("确认收货时间小于等于10天（240个小时）");
                            return;
                        }
                    }
                }
                else if (smsOption == 54) {//已评价
                    timeType = rateTimeType;
                    if (timeType == 0) { //小时
                        if (parseInt(txtRateTime) > 15 * 24) {
                             DoDesign.alert("确认收货时间小于等于15天（360个小时）");
                            return;
                        }
                    } else if (timeType == 1) { //天
                        if (parseInt(txtRateTime) > 15) {
                             DoDesign.alert("确认收货时间小于等于15天（360个小时）");
                            return;
                        }
                    }
                }
            }
            $("#nodeError").hide();

            var strError = "";
            //基础校验
            if (nodeName == '') {
                strError += "节点名称不能为空！";
            }
            if (sendTime == ''||sendTime==undefined) {
            	 sendTime  = $("#timetoday").val();
               // strError += "执行时间不能为空！";
            }
            if (nodeDelayHour == '') {
                strError += "延时执行小时不能为空！";
            }
            if (cellStyle == 'sub') {
                //排除
                if (baseNodeId == '' || targerNodeId == '') {
                    strError += "请选择需要排除的项！";
                } else if (baseNodeId == targerNodeId) {
                    strError += "排除目标节点不能与源节点相同！";
                }
            }
            if (cellStyle == 'pick') {
                //抽取
                if (nodePercent == '') {
                    strError += "请输入抽取百分比！";
                } else if (nodePercent.indexOf('.') > -1) {
                    strError += "百分比只能为整数";
                } else if (parseFloat(nodePercent) > 100) {
                    strError += "抽取百分比应小于100！";
                }
            }


            if (strError != '') {
                $("#nodeError").show();
                $("#nodeError").html(strError);
                return;
            }
            //获取筛选条件
            var nodeUserFilterXml = saveDetail();

            var editIds = cellIds.split(',');
            //依次保存节点值
            for (var i = 0; i < editIds.length; i++) {
                var curId = editIds[i];
                if ($.trim(curId) != "") {
                    var curNodeName = nodeName + (i > 0 ? "(" + i + ")" : "");
                    //保存数据
                    var data = {
                        guid: curId,
                        cellId: curId,
                        cellStyle: cellStyle,
                        nodeName: curNodeName,
                        sendTime: sendTime,
                        sendHour: nodeSendHour,
                        sendMin: nodeSendMin,
                        delayMinute: ConvertToFloat(nodeDelayHour) * 60,
                        nodeRemark: nodeRemark,
                        nodePercent: nodePercent,
                        baseNodeId: baseNodeId,
                        targerNodeId: targerNodeId,
                        smsOption: smsOption,
                        emailOption: emailOption,
                        umpOption: umpOption,
                        couponOption: couponOption,
                        customerSignOption: customerSignOption,
                        lotteryOption: lotteryOption,
                        ebookOption: ebookOption,
                        eleCouponOption: eleCouponOption,
                        integralOption: integralOption,
                        integralActivitiesOption: integralActivitiesOption,
                        nodeUserFilter: nodeUserFilter,
                        nodeUserFilterXml: nodeUserFilterXml,
                        isOpenCheckTime: isOpenCheckTime,
                        receiveTime: txtReceiveTime,
                        rateTime: txtRateTime,
                        timeType: timeType,
                        rateNum: txtRateNum
                    };
                    console.log(data);
                    var jsonData = JSON.stringify(data);

                    var tipDate = "";
                    if (cellStyle == "filter") {
                        if ($("#hidActivityType").val() == "2") {
                           // tipDate = "<span cid='" + curId + "' class='nodeDateTip'>延时: " + ConvertToFloat(nodeDelayHour) + " 小时</span><br/>";
                        } else {
                           // tipDate = "<span cid='" + curId + "' class='nodeDateTip'>" + nodeSendTime + ' ' + (nodeSendHour.length == 1 ? '0' + nodeSendHour : nodeSendHour) + ':' + (nodeSendMin.length == 1 ? '0' + nodeSendMin : nodeSendMin) + '</span><br/>';
                        }
                    } else {
                        tipDate = "<span cid='" + curId + "' class='nodeDateTip'></span>";
                    }

                    tipDate = tipDate + curNodeName;

                    SaveConfigData(curId, cellStyle, tipDate, jsonData);

                }
            }

            //window.parent.$.colorbox.close();
        } catch (e) {
             DoDesign.alert(e);
        }
    }
}

//绑定界面
function bindNode(jsonData) {
    try {
        var cellId = $("#hidId").val();
        var cellStyle = $("#hidStyle").val();

        var nowDate = new Date();

        $("#txtNodeName").val("");
        $("#txtNodeSendTime").val($("#timetoday").val());
        $("#NodeSendHour").val(nowDate.getHours());
        $("#NodeSendMin").val("");
        $("#txtNodeRemark").val("");

        $("#trNodePercent").hide();
        $("#txtNodePercent").val("");

        $("#trSub").hide();
        $("#selBaseNodeFilter").find("option").remove();
        $("#selTargerNodeFilter").find("option").remove();

        $(".absoluteTime").hide();
        $(".delayTime").hide();

        $("#trSourceTask").hide();
        $("#selSmsOptions").hide();
        $("#selEmailOptions").hide();
        $("#selUmpOptions").hide();
        $("#selCouponOptions").hide();
        $("#selCustomerSignOptions").hide();
        $("#selLotteryOptions").hide();
        $("#selEbookOptions").hide();
        $("#selEleCouponOptions").hide();
        $("#selIntegralOptions").hide();
        $("#selIntegralActivitiesOptions").hide();
        
        

        $("#selSmsOptions").val("1");
        $("#selEmailOptions").val("1");
        $("#selUmpOptions").val("1");
        $("#selCouponOptions").val("1");
        $("#selCustomerSignOptions").val("1");
        $("#selLotteryOptions").val("1");
        $("#selEbookOptions").val("1");
        $("#selEleCouponOptions").val("1");
        $("#selIntegralOptions").val("1");
        $("#selIntegralActivitiesOptions").val("1");
        
        

        $(".tbodyBaseFilter").hide();
        $("#userDetailcontent").html("");

        //找到当前节点的来源节点
        var sources = GetSourceCellsFromParent(cellId);;

        if (cellStyle == 'pick') {
            $("#txtNodeName").val("抽取");
            $("#trNodePercent").show();
        }

        if (cellStyle == 'sub') {
            //排除
            $("#txtNodeName").val("排除");
            $("#trSub").show();
            for (var i = 0; i < sources.length; i++) {
                var nodeName = sources[i].getValue();
                if (nodeName.indexOf('<br/>') > 0) {
                    nodeName = nodeName.substring(nodeName.indexOf('<br/>') + 5, nodeName.length);
                }
                $("#selBaseNodeFilter").append("<option value='" + sources[i].getId() + "'>" + nodeName + "</option>");
                $("#selTargerNodeFilter").append("<option value='" + sources[i].getId() + "'>" + nodeName + "</option>");
            }
        }

        if (cellStyle == 'filter') {
            $("#txtNodeName").val("筛选");

            if ($("#hidActivityType").val() == "2") {
                $(".delayTime").show();
                $(".absoluteTime").hide();
            }
            else {
                $(".delayTime").hide();
                $(".absoluteTime").show();
            }
            $(".tbodyBaseFilter").show();
            controlcontentSwap($('.controltitle_1:first'), 'usercontroller');
            if (sources.length > 0) {
                var sourceStyle = sources[0].getStyle();

                switch (sourceStyle) {
                    case "user": $("#spanSourceTask").html("分组任务："); break;
                    case "file": $("#spanSourceTask").html("导入任务："); break;
                    case "sms": $("#spanSourceTask").html("短信任务："); break;
                    case "email": $("#spanSourceTask").html("邮件任务："); break;
                    case "coupon": $("#spanSourceTask").html("优惠券任务："); break;
                    case "promotion": $("#spanSourceTask").html("满送|打折任务："); break;
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
	                    $("#selIntegralActivitesOptions").show();
	             }
                else {
                    $("#trSourceTask").show();
                    $("#selSmsOptions").show();
                }
            }
        }

        //绑定数据

        var guid = "";
        if (jsonData != '') {
            var jsonObject = JSON.parse(jsonData);

            guid = jsonObject.guid;
            $("#txtNodeName").val(MarketingDecodeURIComponent(jsonObject.nodeName));
            $("#txtNodeSendTime").val(jsonObject.sendTime);
            $("#NodeSendHour").val(jsonObject.sendHour);
            $("#NodeSendMin").val(jsonObject.sendMin);
            if (typeof (jsonObject.nodeRemark) != 'undefined') {
                $("#txtNodeRemark").val(MarketingDecodeURIComponent(jsonObject.nodeRemark));
            }
            if (typeof (jsonObject.delayMinute) != 'undefined') {
                $("#txtNodeDelayHour").val(ConvertToFloat(jsonObject.delayMinute) / 60);
            }

            $("#txtNodePercent").val(jsonObject.nodePercent);
            $("#selBaseNodeFilter").val(jsonObject.baseNodeId);
            $("#selTargerNodeFilter").val(jsonObject.targerNodeId);

            $("#selSmsOptions").val(jsonObject.smsOption);
            $("#selEmailOptions").val(jsonObject.emailOption);
            $("#selUmpOptions").val(jsonObject.umpOption);
            $("#selCouponOptions").val(jsonObject.couponOption);
            $("#selCustomerSignOptions").val(jsonObject.customerSignOption);
            $("#selLotteryOptions").val(jsonObject.lotteryOption);
            $("#selEbookOptions").val(jsonObject.ebookOption);
            $("#selEleCouponOptions").val(jsonObject.eleCouponOption);
            $("#selIntegralOptions").val(jsonObject.integralOption);
            $("#selIntegralActivitiesOptions").val(jsonObject.integralActivitiesOption);
            
            $("#userDetailcontent").html("");
            if (jsonObject.isOpenCheckTime) {
                $("#IsOpenCheckTime").prop("checked", true);
                isOpenCheckTime($("#IsOpenCheckTime"));
                $("#txtReceiveTime").val(jsonObject.receiveTime);
                $("#txtRateTime").val(jsonObject.rateTime);
                $("#selRateTimeType").attr("value", jsonObject.timeType);
                $("#selReceiveTimeType").attr("value", jsonObject.timeType);
                $("#txtRateNum").val(jsonObject.rateNum);
            }
            createControllerByXml(MarketingDecodeURIComponent(jsonObject.nodeUserFilterXml));
        }

        //是否允许编辑
        if (guid != "" && !IsCanEditNode(guid)) {
            $("#txtNodeName").prop("disabled", true);

            $("#txtNodeSendTime").prop("disabled", true);
            $("#NodeSendHour").prop("disabled", true);
            $("#NodeSendMin").prop("disabled", true);
            $("#txtNodeDelayHour").prop("disabled", true);
            $("#txtNodeRemark").prop("disabled", true);

            $("#txtNodePercent").prop("disabled", true);
            $("#selBaseNodeFilter").prop("disabled", true);
            $("#selTargerNodeFilter").prop("disabled", true);
            $("#selSmsOptions").prop("disabled", true);
            $("#selEmailOptions").prop("disabled", true);
            $("#selUmpOptions").prop("disabled", true);
            $("#selCouponOptions").prop("disabled", true);
            $("#selCustomerSignOptions").prop("disabled", true);
            $("#selLotteryOptions").prop("disabled", true);
            $("#selEbookOptions").prop("disabled", true);
            $("#selEleCouponOptions").prop("disabled", true);
            $("#selIntegralOptions").prop("disabled", true);
            $("#selIntegralActivitiesOptions").prop("disabled", true);

            $("#userDetailcontent").find(".del").hide();
            $("#userDetailcontent").find("input,select ").prop("disabled", true);
            $("#usercontroller").find("div").attr("onclick", "return;");

            $("#RFMcontent").find(".del").hide();
            $("#RFMcontent").find("input,select ").prop("disabled", true);
            $("#RFMcontroller").find("div").attr("onclick", "return;");

            isOpenCheckTime($("#IsOpenCheckTime"));
            $("#IsOpenCheckTime").prop("disabled", true);
            $("#txtReceiveTime").prop("disabled", true);
            $("#txtRateTime").prop("disabled", true);
            $("#selRateTimeType").prop("disabled", true);
            $("#selReceiveTimeType").prop("disabled", true);
            $("#txtRateNum").prop("disabled", true);

            $("#selNode").hide();
        }
    } catch (e) {
         DoDesign.alert(e);
    }
}

//#region 选择客户属性/删除客户属性

var grabolSelect = '<select class="grobalSelect">'
        + '<option value="and">并且</option>'
        + '<option value="or">或者</option>'
        + '</select>';
var empty = '<span class="subdivisionEmpty" style="width:60px;"></span>';
//增加条件
function addController(sender) {
    var arry = ($(sender).attr('name')).split(',');
    var times = arry[1];
    if (times != 'n') {
        var t = parseInt(times);
        if (t == 0) {
            return false;
        }
        else {
            t = t - 1;
            $(sender).attr('name', arry[0] + "," + t + "," + arry[2]);
            $(sender).find(".times").html(t);            
            if (t == 0) {                
                $(sender).find('.click-btn').addClass("click-btn cur");
                $(sender).find('.click-btn').attr("title", "本属性在同一个分组条件内只能使用一次");
            }
        }
    }
    var tname = $(sender).attr('tname');
    var cClass = $(sender).attr('lang');
    var stringJson = $(sender).attr('class');
    var cJson = $.parseJSON($(sender).attr('class'));
    var tips = $(sender).attr('littletip');
    if ($.trim(tips) != '') {
        tips = "注：" + tips;
    }
    var name = arry[0];
    var cname = arry[2];
    var len = cJson.length;
    var url = '/UserSubdivision/GetHtmlCondition';
    var addDiv = ''; //外层div
    var addConditon = ''; //逻辑关系
    var addhtml = ''; //显示的内容
    if (len > 0) {
        var code = cJson[0].v;        
        ajaxDoneNoAsync(url, { code: code }, function (json) {            
            if (json != null) {
                var existDivs = $("." + name).length + 1;
                
                if (json.Type == 5) {
                    var provinceSelect = '';
                    ajaxDoneNoAsync('/UserSubdivision/GetProvince', {}, function (json) {
                        provinceSelect += '<select class="province" onchange="changeProvince(this)" style="width:100px">';
                        provinceSelect += '<option value="-1">不限</option>';
                        for (var i = 0; i < json.length; i++) {
                            provinceSelect += '<option value="' + json[i].tb_id + '">' + json[i].tb_name + '</option>';
                        }
                        provinceSelect += '</select>';


                        addhtml = provinceSelect;
                        addhtml += '<select lang="' + name + '" style="width:60px"><option>不限<option></select>';
                        if (cJson[0].n != null && cJson[0].n != "") {
                            addConditon += "<select id='select" + name + "' class='" + stringJson + "' name='0' onchange='conditionChange(this)'  style='width:60px'>";
                            for (var i = 0; i < len; i++) {
                                if (cJson[0].n != null && cJson[0].n != "") {
                                    addConditon += '<option value="' + cJson[i].o + '">' + cJson[i].n + '</option>';
                                }
                            }
                            addConditon += '</select>';
                        }
                        if (existDivs > 1) {
                            addDiv += '<div style="clear:both;padding-top:3px;" name=\'' + stringJson + '\' class="' + name + '" id = "' + name + 'sub' + existDivs + '">' + grabolSelect + '<span class="conditionleft"></span><span class="innerconditon">' + cname + '：' + addConditon + addhtml + '<span class="del" onclick="delController(this)"></span></span><span class="conditionright"></span><div class="controlTips">' + tips + '</div></div>';
                        }
                        else {
                            addDiv += '<div style="clear:both;padding-top:3px;" name=\'' + stringJson + '\' class="' + name + '" id = "' + name + 'sub' + existDivs + '">' + empty + '<span class="conditionleft"></span><span class="innerconditon">' + cname + '：' + addConditon + addhtml + '<span class="del" onclick="delController(this)"></span></span><span class="conditionright"></span><div class="controlTips">' + tips + '</div></div>';
                        }

                        //判断外层框体是否存在
                        if ($("#" + name).attr('id') != name) {
                            if (cClass == 0) {
                                $("#userDetailcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                            }
                        }
                        $("#" + name).append($(addDiv));
                    });
                }
                else if (json.Type == 6) {
                    addhtml += '<span>'
                            + '<a  class="Empty" lang="1" onclick="changeImpress(this)"> </a>'
                            + '<a  class="Empty" lang="2" onclick="changeImpress(this)"> </a>'
                            + '<a  class="Empty" lang="3" onclick="changeImpress(this)"> </a>'
                            + '<a  class="Empty" lang="4" onclick="changeImpress(this)"> </a>'
                            + '<a  class="Empty" lang="5" onclick="changeImpress(this)"> </a>'
                            + '<input type="hidden" value="0" lang="' + name + '"></span>';
                    if (cJson[0].n != null && cJson[0].n != "") {
                        addConditon += "<select id='select" + name + "' class='" + stringJson + "' name='0' onchange='conditionChange(this)' >";
                        for (var i = 0; i < len; i++) {
                            if (cJson[0].n != null && cJson[0].n != "") {
                                addConditon += '<option value="' + cJson[i].o + '">' + cJson[i].n + '</option>';
                            }
                        }
                        addConditon += '</select>';
                    }
                    
                    if (existDivs > 1) {
                        addDiv += '<div style="clear:both;padding-top:3px" name=\'' + stringJson + '\' class="' + name + '" id = "' + name + 'sub' + existDivs + '">' + grabolSelect + '<span class="conditionleft"></span><span class="innerconditon">' + cname + '：' + addConditon + addhtml + '<span class="del" onclick="delController(this)"></span></span><span class="conditionright"></span><div class="controlTips">' + tips + '</div></div>';
                    }
                    else {
                        addDiv += '<div style="clear:both;padding-top:3px" name=\'' + stringJson + '\' class="' + name + '" id = "' + name + 'sub' + existDivs + '">' + empty + '<span class="conditionleft"></span><span class="innerconditon">' + cname + '：' + addConditon + addhtml + '<span class="del" onclick="delController(this)"></span></span><span class="conditionright"></span><div class="controlTips">' + tips + '</div></div>';
                    }
                    //判断外层框体是否存在
                    if ($("#" + name).attr('id') != name) {
                        if (cClass == 0) {
                            $("#userDetailcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                        }
                    }
                    $("#" + name).append($(addDiv));
                }
                else {
                    var vJson = $.parseJSON(json.Value);
                    if (parseInt(json.Type) == 0) {//类型 0-文本框 1-下拉框 2-单选 3-多选 4-日期
                        var reg = "";
                        if (cJson[0].reg != null) {
                            reg = "reg='" + cJson[0].reg + "' tip='" + cJson[0].tip + "'";
                        }

                        if (json.Description == "天" || json.Description == "岁" || json.Description == "次" || json.Description == "%" || json.Description == "件") {
                            addhtml += "<input style='width:30px' type='text' class='txt' lang='" + name + "' value='" + vJson[0].v + "' " + reg + "/>";
                        }
                        else if (json.Description == "元") {
                            addhtml += "<input style='width:60px' type='text' class='txt' lang='" + name + "' value='" + vJson[0].v + "' " + reg + "/>";
                        }
                        else {
                            addhtml += "<input style='width:120px' class='txt' type='text' lang='" + name + "' value='" + vJson[0].v + "' " + reg + "/>";
                        }
                    }
                    else if (json.Type == 1) {
                        addhtml += "<select lang='" + name + "' >";
                        for (var j = 0; j < vJson.length; j++) {
                            addhtml += "<option  value='" + vJson[j].v + "'>" + vJson[j].n + "</option>";
                        }
                        addhtml += "</select>";
                    }
                    else if (json.Type == 2) {
                        for (var j = 0; j < vJson.length; j++) {
                            if (j == 0) {
                                addhtml += "<input type='radio' checked lang='" + name + "' name='" + name + existDivs + "'  value='" + vJson[j].v + "' /><label>" + vJson[j].n + "</label>";
                            }
                            else {
                                addhtml += "<input type='radio' lang='" + name + "' name='" + name + existDivs + "'  value='" + vJson[j].v + "' /><label>" + vJson[j].n + "</label>";
                            }
                        }
                    }
                    else if (json.Type == 3) {
                        var reg = "";
                        if (cJson[0].reg != null) {
                            reg = "reg='" + cJson[0].reg + "' tip='" + cJson[0].tip + "'";
                        }
                        addhtml += "<input style='width:30px' type='text' class='txt' lang='" + name + "' value='" + vJson[0].v + "' " + reg + "/>~<input style='width:30px' type='text' class='txt' lang='" + name + "' value='" + vJson[0].v + "' " + reg + "/>";
                    }
                    else if (json.Type == 4) {
                        var isBirthday = json.Remark;
                        var dateValue = $("#timetoday").val();
                        if (isBirthday != null && $.trim(isBirthday) != '') {
                            if (isBirthday == "{ dateFmt: 'MM-dd' }") {
                                dateValue = dateValue.substring(10, 5);
                            }
                        }
                        else {
                            isBirthday = "";
                        }
                        addhtml += '<input value="' + dateValue + '"  type="text" class="Wdate"  onclick="WdatePicker(' + isBirthday + ');" onkeypress="return false;" onkeydown="return false;"  lang="' + name + '"/>';
                    }
                    if (json.Description != null && json.Description != "") {
                        addhtml = "<span>" + addhtml + "<label>" + json.Description + "</label></span>";
                    }
                    if (cJson[0].n != null && cJson[0].n != "") {
                        addConditon += "<select style='max-width:90px;' id='select" + name + "' class='" + stringJson + "' name='0' onchange='conditionChange(this)' >";
                        for (var i = 0; i < len; i++) {
                            if (cJson[0].n != null && cJson[0].n != "") {
                                addConditon += '<option value="' + cJson[i].o + '">' + cJson[i].n + '</option>';
                            }
                        }
                        addConditon += '</select>';
                    }

                    if (existDivs > 1) {
                        addDiv += '<div style="clear:both;padding-top:3px" name=\'' + stringJson + '\' class="' + name + '" id = "' + name + 'sub' + existDivs + '">' + grabolSelect + '<span class="conditionleft"></span><span class="innerconditon">' + cname + '：' + addConditon + addhtml + '<span class="del" onclick="delController(this)"></span></span><span class="conditionright"></span><div class="controlTips">' + tips + '</div></div>';
                    }
                    else {
                        addDiv += '<div style="clear:both;padding-top:3px" name=\'' + stringJson + '\' class="' + name + '" id = "' + name + 'sub' + existDivs + '">' + empty + '<span class="conditionleft"></span><span class="innerconditon">' + cname + '：' + addConditon + addhtml + '<span class="del" onclick="delController(this)"></span></span><span class="conditionright"></span><div class="controlTips">' + tips + '</div></div>';
                    }
                    //判断外层框体是否存在
                    if ($("#" + name).attr('id') != name) {
                        if (cClass == 0) {
                            $("#userDetailcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                            $("#usertitle").show();
                        }
                        else if (cClass == 1) {
                            $("#RFMcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                            $("#RFMtitle").show();
                        }
                        else if (cClass == 2) {
                            $("#marketingcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                            $("#marketingtitle").show();
                        }
                        else if (cClass == 3) {
                            $("#tradecontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                            $("#tradetitle").show();
                        }
                    }
                    $("#" + name).append($(addDiv));
                    //InitValidate();
                }
            }
        });
    }
}
//删除条件
function delController(sender) {
    var parentDiv = $(sender).parent().first().parent().first();
    var name = $(parentDiv).attr('class');
    $(parentDiv).remove();
    var divs = $("div." + name);
    if (divs.length > 0) {
        var thisid = $(divs[0]).attr('id');
        $("#" + thisid + " .grobalSelect").remove();
        if ($("#" + thisid + " .subdivisionEmpty").length == 0) {
            $(empty).prependTo($("#" + thisid));
        }
    }
    var controlDiv = $("#control" + name);
    var arry = ($(controlDiv).attr('name')).split(',');
    var times = arry[1];
    if (times != 'n') {
        var t = parseInt(times) + 1;
        $(controlDiv).attr('name', arry[0] + "," + t + "," + arry[2]);
        $(controlDiv).find(".times").html(t);
        if (t == 1) {//启用
            $(controlDiv).find('.backBtn').removeClass("backBtnDisable");
            var title = $(controlDiv).find('.backBtn').attr("title1");
            $(controlDiv).find('.backBtn').attr("title", title);
        }
    }
    divs = $("." + name);
    if (divs.length == 0) {
        $("#" + name).remove();
    }
    else {//对母div重新设置
        for (var i = 0; i < divs.length; i++) {
            $(divs[i]).attr('id', name + 'sub' + parseInt(i + 1));
        }
    }
    if ($("#userDetailcontent div").length == 0) {
        $("#usertitle").hide();
    }
    if ($("#RFMcontent div").length == 0) {
        $("#RFMtitle").hide();
    }
    if ($("#marketingcontent div").length == 0) {
        $("#marketingtitle").hide();
    }
    if ($("#tradecontent div").length == 0) {
        $("#tradetitle").hide();
    }
}
//保存条件
function saveDetail() {
    var conditionDivs = $("#userDetailcontent .conditionContent,#RFMcontent .conditionContent,#marketingcontent .conditionContent,#tradecontent .conditionContent,#integralcontent .conditionContent");

    var len = conditionDivs.length;
    var xml = '';
    if (len > 0) {
        xml += '<root>';
        $.each(conditionDivs, function (i) {
            var column = $(conditionDivs[i]).attr('id');
            if (column == "muliInput") {
                //#region 批量输入
                var childs = $(conditionDivs[i]).find("div." + column);
                xml += '<group>';
                $.each(childs, function (k) {
                    var relationClass = $(childs[k]).find(".grobalSelect");
                    var relation = '';
                    if (relationClass.length > 0) {
                        relation = $(relationClass[0]).val();
                    }
                    var name = $(childs[k]).find(".SlMuliInput").val();
                    var cname = $(childs[k]).find(".SlMuliInput").find("option:selected").text();
                    var value = $(childs[k]).find(".TTMuliInput").val().replace(/(\s{1,}|\\n{1,}|,{1,}|，{1,})/g, ",").replace(/,{2,}/g, ",");
                    xml += '<condition tname="kd_customer" class="-1" cname="' + cname + '" column="' + name + '" optionjson=\'\' oprate="in" relation="' + relation + '" ><![CDATA[' + value + ']]></condition>';
                });
                xml += '</group>';
                //#endregion
            }
            else if (column == "customerRate") {
                //#region 评价
                var rates = $(conditionDivs[i]).find("." + column);

                xml += '<group>';
                $.each(rates, function (k) {
                    var relationClass = $(rates[k]).find(".grobalSelect");
                    var relation = '';
                    if (relationClass.length > 0) {
                        relation = $(relationClass[0]).val();
                    }
                    var timeType = 0;
                    var minValue = '';
                    var maxValue = '';

                    //时间类型：相对时间，绝对时间
                    if ($(rates[k]).find(".relativeTimeInput").prop('checked')) {
                        timeType = 1;
                        minValue = $(rates[k]).find("[name='rtimeMin']").val();
                        maxValue = $(rates[k]).find("[name='rtimeMax']").val();
                    }
                    else {
                        minValue = $(rates[k]).find("[name='atimeMin']").val();
                        maxValue = $(rates[k]).find("[name='atimeMax']").val();
                    }

                    //评价类型 好评，中评，差评
                    var cname = $(rates[k]).find(".rateType").find("option:selected").text();
                    var cvalue = $(rates[k]).find(".rateType").val();


                    //评价内容（包含，不包含）
                    var ratecontenttypeName = $(rates[k]).find(".RateContentType").find("option:selected").text();
                    var ratecontenttypevalue = $(rates[k]).find(".RateContentType").val();

                    var rateContent = $(rates[k]).find("[name='rateContent']").val();
                    var contentMinCount = $(rates[k]).find("[name='contentMinCount']").val();
                    var contentMaxCount = $(rates[k]).find("[name='contentMaxCount']").val();

                    xml += '<condition tname="kd_customer" class="-2" column="Rate" cname="' + cname + '" timeType="' + timeType + '" minValue="' + minValue + '" maxValue="' + maxValue + '" optionjson=\'\' oprate="" relation="' + relation
                        + '" cvalue="' + cvalue + '" ratecontenttypeName="' + ratecontenttypeName + '" ratecontenttypevalue="' + ratecontenttypevalue + '" contentMinCount="' + contentMinCount + '" contentMaxCount="' + contentMaxCount + '"  ><![CDATA[' + rateContent + ']]></condition>';
                });
                xml += '</group>';
                //#endregion
            }
                //归档
            else if (column == "customerArchive") {
                //#region 归档
                var archives = $(conditionDivs[i]).find("div." + column);
                xml += '<group>';
                $.each(archives, function (k) {
                    var relationClass = $(archives[k]).find(".grobalSelect");
                    var relation = '';
                    if (relationClass.length > 0) {
                        relation = $(relationClass[0]).val();
                    }
                    var archiveType = $(archives[k]).find(".archiveType").val();
                    var archiveID = $(archives[k]).find(".archiveName").val();

                    var cname = $(archives[k]).find(".archiveName").find("option:selected").text();

                    var minTime = $(archives[k]).find("[name='timeMin']").val();
                    var maxTime = $(archives[k]).find("[name='timeMax']").val();

                    xml += '<condition tname="kd_customer" class="-3" column="Archive" archiveID="' + archiveID + '" cname="' + cname + '" archiveType="' + archiveType + '" minTime="' + minTime + '" maxTime="' + maxTime + '" optionjson=\'\' oprate="" relation="' + relation + '" ></condition>';
                });
                xml += '</group>';
                //#endregion
            }
            else {
                var cname = $(conditionDivs[i]).attr('name');
                var tname = $(conditionDivs[i]).attr('lang');
                var cClass = $(conditionDivs[i]).attr('cClass');
                var childdivs = $(conditionDivs[i]).find("div." + column);
                xml += '<group>';
                $.each(childdivs, function (j) {
                    column = $(conditionDivs[i]).attr('id');
                    var optionjson = $(childdivs[j]).attr('name');
                    var oprate = $(childdivs[j]).find("#select" + column).val();
                    var index = $(childdivs[j]).find("#select" + column).attr('name');
                    if (typeof (oprate) == 'undefined') {
                        oprate = "";
                    }
                    if (typeof (index) == 'undefined') {
                        index = "";
                    }
                    var tips = $(childdivs[j]).find(".controlTips").html();
                    var relationClass = $(childdivs[j]).find(".grobalSelect");
                    var relation = '';
                    if (relationClass.length > 0) {
                        relation = $(relationClass[0]).val();
                    }
                    var valueClass = $(childdivs[j]).find("[lang='" + column + "']");
                    var value = '';
                    if (valueClass.length > 1) {
                        if ($(valueClass[0]).attr('type') == 'radio') {
                            for (var n = 0; n < valueClass.length; n++) {
                                if ($(valueClass[n]).prop('checked')) {
                                    value = $(valueClass[n]).val();
                                }
                            }
                        }
                        else {
                            for (var n = 0; n < valueClass.length; n++) {
                                if (n == 0) {
                                    value += $(valueClass[n]).val();
                                }
                                else {
                                    value += "∝" + $(valueClass[n]).val();
                                }
                            }
                        }
                    }
                    else {
                        value = $(childdivs[j]).find("[lang='" + column + "']").val();
                    }
                    if (value != null) {
                        value = $.trim(value);
                    }
                    if ((column == 'city') && value == "不限") {
                        value = "";
                        var province = $(valueClass).prev().find("option:selected").text();
                        if (province != null && province != "不限") {
                            value = province;
                            column = 'province';
                        }
                    }
                    xml += '<condition tips="' + tips + '" tname="' + tname + '" class="' + cClass + '" cname="' + cname + '" column="' + column + '" optionjson=\'' + optionjson + '\' oprate="' + oprate + '" relation="' + relation + '" index="' + index + '"><![CDATA[' + value + ']]></condition>';
                });
                xml += '</group>';
            }
        });
        xml += '</root>';
    }
    return xml;
}
//选择省
function changeProvince(sender) {
    var pid = $(sender).val();
    var url = "/UserSubdivision/GetArea";
    var data = { pid: pid };
    ajaxDone(url, data, function (json) {
        var objCity = $(sender).next().get(0);
        objCity.options.length = 0;
        $.each(json, function (i) {
            objCity.options.add(new Option(json[i].tb_name, json[i].tb_name));
        });
    });
}
//买家映象
function changeImpress(sender) {
    var parentspan = $(sender).parents().first();
    var thisvalue = $(sender).attr("lang");
    var currNum = parentspan.find(".Full").length;
    var value = thisvalue;
    if (thisvalue == currNum) {
        parentspan.find("a").attr("class", "Empty");
        value = 0;
    }
    else {
        var as = parentspan.find("a");
        $.each(as, function (i) {
            if (i + 1 <= value) {
                $(as[i]).attr("class", "Full");
            } else {
                $(as[i]).attr("class", "Empty");
            }
        });
    }
    parentspan.find("input").val(value);
}
//逻辑条件选择框更改事件
function conditionChange(sender) {
    var cjson = $.parseJSON($(sender).attr('class'));
    var name = $(sender).attr('id');
    var oldindex = $(sender).attr('name');
    var newindex = $(sender).get(0).selectedIndex;

    var addhtml = "";
    $(sender).attr('name', newindex);
    if (cjson[oldindex].v != cjson[newindex].v || cjson[oldindex].reg != cjson[newindex].reg) {
        var code = cjson[newindex].v;
        var url = '/UserSubdivision/GetHtmlCondition';
        ajaxDone(url, { code: code }, function (json) {
            if (json != null) {
                var del = $(sender).next();
                if ($(del).attr('class') != "del") {
                    $(del).remove();
                }
                name = name.replace('select', '');
                var vJson = $.parseJSON(json.Value);
                if (parseInt(json.Type) == 0) {//类型 0-文本框 1-下拉框 2-单选 3-多选 4-日期
                    var reg = "";
                    if (cjson[newindex].reg != null) {
                        reg = "reg='" + cjson[newindex].reg + "' tip='" + cjson[newindex].tip + "'";
                    }
                    if (json.Description == "天" || json.Description == "岁" || json.Description == "次" || json.Description == "%") {
                        addhtml += "<input class='txt' type='text'  lang='" + name + "'  style='width:30px' value='" + vJson[0].v + "' " + reg + "/>";
                    }
                    else if (json.Description == "元") {
                        addhtml += "<input class='txt' type='text'  lang='" + name + "'  style='width:60px' value='" + vJson[0].v + "' " + reg + "/>";
                    }
                    else {
                        addhtml += "<input class='txt' type='text'  lang='" + name + "' style='width:120px' value='" + vJson[0].v + "' " + reg + "/>";
                    }
                }
                else if (json.Type == 1) {
                    addhtml += "<select lang='" + name + "'>";
                    for (var j = 0; j < vJson.length; j++) {
                        addhtml += "<option  value='" + vJson[j].v + "'>" + vJson[j].n + "</option>";
                    }
                    addhtml += "</select>";
                }
                else if (json.Type == 2) {
                    for (var j = 0; j < vJson.length; j++) {
                        addhtml += "<input lang='" + name + "' type='radio' value='" + vJson[j].v + "' /><label>" + vJson[j].n + "</label>";
                    }
                }
                else if (json.Type == 3) {
                    var reg = "";
                    if (cjson[newindex].reg != null) {
                        reg = "reg='" + cjson[newindex].reg + "' tip='" + cjson[newindex].tip + "'";
                    }
                    addhtml += "<input style='width:30px' type='text' class='txt' lang='" + name + "' value='" + vJson[0].v + "' " + reg + "/>~<input style='width:30px' type='text' class='txt' lang='" + name + "' value='" + vJson[0].v + "' " + reg + "/>";

                }
                else if (json.Type == 4) {
                    var isBirthday = "";
                    if (name == "Birthday") {
                        isBirthday = "{ dateFmt: 'MM-dd' }";

                    }
                    else {
                        isBirthday = "{ }";

                    }
                    addhtml += '<input lang="' + name + '" type="text" class="Wdate" size="30" onclick="WdatePicker(' + isBirthday + ');" onkeypress="return false;" onkeydown="return false;"  />';

                }
                if (json.Description != null && json.Description != "") {
                    addhtml = "<span>" + addhtml + "<label>" + json.Description + "</label></span>";
                }
                $(sender).after($(addhtml));
                InitValidate();
            }
        });
    }
}
//#region 根据xml生成控件
function createControllerByXml2(xml) {
   // var xml = $("#CustomerXMLhidden").val();
    //xml = UrlDecode(xml);
    if (xml != "" && xml != null) {
    	var cxml = $.parseXML(xml);
        var url = root+'/apps/layered/getSubdivisioncontrolJson.do';
        if (cxml != null) {
            var groups = $(cxml).find("group");
            $.each(groups, function (z, group) {
                var conditions = $(group).find("condition");
                $.each(conditions, function (k) {
                    var cClass = $(conditions[k]).attr('class');
                    if (cClass == "-1") {
                        $("#leadBtn").remove();
                        $("#usertitle").show();
                        var values = $(conditions[k]).text();
                        var column = $(conditions[k]).attr('column');
                        var relations = $(conditions[k]).attr('relation');
                        var html = '<div class="muliInput" style="width:90%">';
                        var gSelect = '';
                        if (relations == "or") {
                            gSelect += '<select class="ui-select grobalSelect"  style="height:22px">'
                                                            + '<option value="and">并且</option>'
                                                                + '<option value="or" selected>或者</option>'
                                                                    + '</select>';
                        } else if (relations == "and") {
                            gSelect += '<select class="ui-select grobalSelect"  style="height:22px">'
                                                            + '<option value="and" selected>并且</option>'
                                                                + '<option value="or">或者</option>'
                                                                    + '</select>';
                        } else {
                            gSelect += '<span class="subdivisionEmpty" style="height:100px"></span>';
                        }
                        html += gSelect;
                        var selected = '<select class="ui-select SlMuliInput">';
                        if (column == "nick") {
                            selected += '<option value="nick" selected>客户昵称</option>'
                                + '<option value="email">Email</option>'
                                    + '<option value="mobile">手机</option>';
                        }
                        else if (column == "email") {
                            selected += '<option value="nick" >客户昵称</option>'
                                + '<option value="email" selected>Email</option>'
                                    + '<option value="mobile">手机</option>';
                        }
                        else if (column == "mobile") {
                            selected += '<option value="nick" >客户昵称</option>'
                                + '<option value="email" >Email</option>'
                                    + '<option value="mobile" selected>手机</option>';
                        }
                        selected += '</select>';
                        html += selected + '<span style="display:inline-block;padding:3px;font-size:larger;color:#9D3C11">注：输入多个用 空格、逗号、回车 隔开 </span>'
                                    + '<textarea class="TTMuliInput" style="height:100px;width:85%;border:1px solid #ccc;font-size:small">' + values + '</textarea>'
                                        + '<span class="deldiv" onclick="delMuliInput(this)"></span>'
                                            + '</div>';
                        //判断外层框体是否存在
                        if ($("#muliInput").attr('id') != "muliInput") {
                            $("#userDetailcontent").append($('<div name="批量输入" id="muliInput" class="conditionContent"></div>'));
                        }
                        $("#muliInput").append(html);
                    }
                    else if (cClass == "-2") {
                        $("#leadBtn").remove();
                        $("#usertitle").show();
                        var values = $(conditions[k]).attr('cvalue');
                        var relations = $(conditions[k]).attr('relation');
                        var timeType = $(conditions[k]).attr('timeType');
                        var minValue = $(conditions[k]).attr('minValue');
                        var maxValue = $(conditions[k]).attr('maxValue');
                        var html = '<div class="customerRate" style="width:90%;display:inline-block">';
                        var gSelect = '';
                        if (relations == "or") {
                            gSelect += '<select class="grobalSelect">'
                                    + '<option value="and">并且</option>'
                                    + '<option value="or" selected>或者</option>'
                                    + '</select>';
                        }
                        else if (relations == "and") {
                            gSelect += '<select class="grobalSelect">'
                                    + '<option value="and" selected>并且</option>'
                                    + '<option value="or">或者</option>'
                                    + '</select>';
                        } else {
                            gSelect += '<span class="subdivisionEmpty"></span>';
                        }
                        html += gSelect;
                        var selected = '<span class="conditionleft"></span><span class="innerconditon">评价类型:<select class="rateType">';
                        if (values == "good") {
                            selected += '<option value="">全部</option>'
                                + '<option value="good" selected>好评</option>'
                                + '<option value="neutral">中评</option>'
                                    + '<option value="bad">差评</option>';
                        }
                        else if (values == "neutral") {
                            selected += '<option value="">全部</option>'
                                + '<option value="good" >好评</option>'
                                + '<option value="neutral" selected>中评</option>'
                                    + '<option value="bad">差评</option>';
                        }
                        else if (values == "bad") {
                            selected += '<option value="">全部</option>'
                                + '<option value="good" >好评</option>'
                                + '<option value="neutral" >中评</option>'
                                    + '<option value="bad" selected>差评</option>';
                        }
                        else {
                            selected += '<option value="" selected>全部</option>'
                                + '<option value="good" >好评</option>'
                                + '<option value="neutral" >中评</option>'
                                    + '<option value="bad" >差评</option>';
                        }
                        selected += '</select>';
                        html += selected
                        + '<input type="radio" value="0" name="rate' + rateNum + '" ' + (timeType == "0" ? 'checked' : '') + ' onclick="$(this).parent().first().find(\'.absoluteTime\').show();$(this).parent().first().find(\'.relativeTime\').hide();" /><label>绝对时间</label>'
                        + '<input type="radio" class="relativeTimeInput" value="1" name="rate' + rateNum + '"' + (timeType == "1" ? 'checked' : '') + ' onclick="$(this).parent().first().find(\'.absoluteTime\').hide();$(this).parent().first().find(\'.relativeTime\').show();"/><label>相对时间</label>'

                        + '<span class="absoluteTime" style="margin-left:5px;' + (timeType == "0" ? '' : 'display:none') + '">'
                        + '<input type="text" name="atimeMin" class="Wdate" style="width:95px" ' + (timeType == "0" ? 'value="' + minValue + '"' : '') + '  onclick="WdatePicker();" onkeypress="return false;" onkeydown="return false;"  />'
                        + '~<input type="text" name="atimeMax" class="Wdate" style="width:95px" ' + (timeType == "0" ? 'value="' + maxValue + '"' : '') + ' onclick="WdatePicker();" onkeypress="return false;" onkeydown="return false;"  />'
                        + '</span>'

                        + '<span class="relativeTime" style="margin-left:8px;' + (timeType == "0" ? 'display:none' : '') + '">距离当前'
                        + '<input style="width:30px" type="text" ' + (timeType == "1" ? 'value="' + minValue + '"' : '') + ' class="txt" name="rtimeMin" />天'
                        + '~<input style="width:30px" type="text" ' + (timeType == "1" ? 'value="' + maxValue + '"' : '') + ' class="txt" name="rtimeMax" />天'
                        + '</span>'

                        + '<span class="del" onclick="delRate(this)"></span></span><span class="conditionright"></span>';

                        var rateContent = $(conditions[k]).text();
                        var ratecontenttypevalue = $(conditions[k]).attr('ratecontenttypevalue');
                        var contentMinCount = ($(conditions[k]).attr('contentMinCount') == undefined ? "" : $(conditions[k]).attr('contentMinCount'));
                        var contentMaxCount = ($(conditions[k]).attr('contentMaxCount') == undefined ? "" : $(conditions[k]).attr('contentMaxCount'));
                        var addRateContentHtml = '<span style="display:inline-block;margin-left:54px;"><span class="conditionleft"></span><span class="innerconditon">评价内容:';
                        var isDisabled = false;
                        if (ratecontenttypevalue == "1") {
                            addRateContentHtml = addRateContentHtml + '<select class="RateContentType" onchange="onRateContentTypeChange(this)"><option value="0">不限</option><option value="1" selected="selected">包含</option><option value="2">不包含</option></select>';

                        } else if (ratecontenttypevalue == "2") {
                            addRateContentHtml = addRateContentHtml + '<select class="RateContentType" onchange="onRateContentTypeChange(this)"><option value="0">不限</option><option value="1">包含</option><option value="2"  selected="selected">不包含</option></select>';

                        } else {
                            addRateContentHtml = addRateContentHtml + '<select class="RateContentType" onchange="onRateContentTypeChange(this)"><option value="0"  selected="selected">不限</option><option value="1">包含</option><option value="2">不包含</option></select>';
                            isDisabled = true;
                        }
                        var a = isDisabled ? "disabled" : "";
                        addRateContentHtml = addRateContentHtml + '<span style="margin-left:5px"><input type="text" name="rateContent" style="width:85px" value="' + rateContent + '" ' + a + '/></span>'
                        + '&nbsp;字数:<input  name="contentMinCount" style="width:30px;" value="' + contentMinCount + '"/>~<input name="contentMaxCount"  value="' + contentMaxCount + '" style="width:30px;"/>'
                        + '</span><span class="conditionright"></span><span>';

                        html += addRateContentHtml;
                        //判断外层框体是否存在
                        if ($("#customerRate").attr('id') != "customerRate") {
                            $("#userDetailcontent").append($('<div name="批量输入" id="customerRate" class="conditionContent"></div>'));
                        }
                        $("#customerRate").append(html);
                        rateNum++;
                    }
                    else if (cClass == "-3") {
                        $("#leadBtn").remove();
                        $("#usertitle").show();
                        var relations = $(conditions[k]).attr('relation');
                        var archiveType = $(conditions[k]).attr('archiveType');
                        var archiveID = $(conditions[k]).attr('archiveID');
                        var minTime = $(conditions[k]).attr('minTime');
                        var maxTime = $(conditions[k]).attr('maxTime');
                        var html = '<div class="customerArchive" style="width:90%;display:inline-block">';
                        var gSelect = '';
                        if (relations == "or") {
                            gSelect += '<select class="grobalSelect">'
                                    + '<option value="and">并且</option>'
                                    + '<option value="or" selected>或者</option>'
                                    + '</select>';
                        }
                        else if (relations == "and") {
                            gSelect += '<select class="grobalSelect">'
                                    + '<option value="and" selected>并且</option>'
                                    + '<option value="or">或者</option>'
                                    + '</select>';
                        } else {
                            gSelect += '<span class="subdivisionEmpty"></span>';
                        }
                        html += gSelect;
                        var selected = '<span class="conditionleft"></span><span class="innerconditon">归档:<select onchange="getArchive(this)" class="archiveType">';
                        if (archiveType == "0") {
                            selected += '<option value="0" selected>全部</option>'
                                    + '<option value="1">评价归档</option>'
                                    + '<option value="2">询单归档</option>';
                        }
                        else if (archiveType == "1") {
                            selected += '<option value="0" >全部</option>'
                                    + '<option value="1" selected>评价归档</option>'
                                    + '<option value="2">询单归档</option>';
                        }
                        else if (archiveType == "2") {
                            selected += '<option value="0" >全部</option>'
                                    + '<option value="1">评价归档</option>'
                                    + '<option value="2" selected>询单归档</option>';
                        }
                        selected += '</select>';
                        html += selected;
                        html += '<select style="width:85px" class="archiveName">';
                        if (parseInt(archiveID) > 0) {
                            $.ajax({
                                type: 'POST',
                                url: '/UserSubdivision/GetArchive',
                                data: { type: archiveType, selectID: archiveID },
                                dataType: "json",
                                cache: false,
                                async: false,
                                success: function (arhtml) {
                                    html += arhtml;
                                }
                            });
                        }
                        else {
                            html += '<option value="0">不限</option>';
                        }
                        html += '</select>';
                        html += '归档时间：<input type="text" value="' + minTime + '" name="timeMin" class="Wdate" style="width:85px"  onclick="WdatePicker();" onkeypress="return false;" onkeydown="return false;"  />'
                            + '~<input type="text" value="' + maxTime + '" name="timeMax" class="Wdate" style="width:85px"  onclick="WdatePicker();" onkeypress="return false;" onkeydown="return false;"  />';

                        html += '<span class="del" onclick="delArchive(this)"></span></span><span class="conditionright"></span>';
                        //判断外层框体是否存在
                        if ($("#customerArchive").attr('id') != "customerArchive") {
                            $("#userDetailcontent").append($('<div name="批量输入" id="customerArchive" class="conditionContent"></div>'));
                        }
                        $("#customerArchive").append(html);
                    }
                    else if (cClass == "-4") {
                        $("#leadBtn").remove();
                        $("#usertitle").show();
                        var cname = $(conditions[k]).attr('cname');
                        var values = $(conditions[k]).text();

                        //禁用选择按钮
                        $("#controlTaoMobleUser").find('.a').addClass("cur");
                        var addhtml = '<span class="conditionleft"></span><span class="innerconditon">' + cname + ':';
                        if (values == "1") {
                            addhtml += '<input type="radio" lang="IsTaoMobleUser" value="1" name="IsTaoMobleUser" checked="checked"><label>是</label>';
                            addhtml += '<input type="radio" lang="IsTaoMobleUser" value="0" name="IsTaoMobleUser"><label>否</label>';
                        }
                        if (values == "0") {
                            addhtml += '<input type="radio" lang="IsTaoMobleUser" value="1" name="IsTaoMobleUser"><label>是</label>';
                            addhtml += '<input type="radio" lang="IsTaoMobleUser" value="0" name="IsTaoMobleUser" checked="checked"><label>否</label>';
                        }
                        addhtml += '<span class="del" onclick="delTaoMobleUserInput(this)"></span></span><span class="conditionright"></span>';
                        addhtml = '<div class="customerTaoMobleUser" style="width:90%;display:inline-block">' + '<span class="subdivisionEmpty" ></span>' + addhtml;

                        //判断外层框体是否存在
                        if ($("#customerTaoMobleUser").attr('id') != "customerTaoMobleUser") {
                            $("#userDetailcontent").append($('<div name="' + cname + '" id="customerTaoMobleUser" class="conditionContent"></div>'));
                        }

                        $("#customerTaoMobleUser").append(addhtml);
                    }
                    else if (cClass == "-5") {//客户标签
                        var values = $(conditions[k]).context.innerHTML;
                        var oprate = $(conditions[k]).attr('oprate');
                        var relations = $(conditions[k]).attr('relation');

                        $("#leadBtn").remove();
                        $("#usertitle").show();
                        var addhtml = '<span class="conditionleft"></span><span class="innerconditon">客户标签：' +
                                    '<select id="buyerTagOprate" onchange="onBuyerTagOprate(this)"><option value="" ' + (oprate == "" ? "selected" : "") + '>等于</option><option value="!="' + (oprate == "!=" ? "selected" : "") + '>不等于</option><option value="like"' + (oprate == "like" ? "selected" : "") + '>包含</option><option value="notlike"' + (oprate == "notlike" ? "selected" : "") + '>不包含</option><option value="isnull"' + (oprate == "isnull" ? "selected" : "") + '>为空</option><option value="isnotnull"' + (oprate == "isnotnull" ? "selected" : "") + '>不为空</option></select>' +
                                    '<select id="buyerTagValue">' + GetCustomerTagHtml(values) + '</select>' +
                                    '<span class="del" onclick="delImpressionTag(this)"></span></span><span class="conditionright"></span>';

                        $("#buyerTagOprate").val(oprate);

                        var gSelect = "";
                        if (relations == "or") {
                            gSelect += '<select class="grobalSelect">'
                                    + '<option value="and">并且</option>'
                                    + '<option value="or" selected>或者</option>'
                                    + '</select>';
                        }
                        else if (relations == "and") {
                            gSelect += '<select class="grobalSelect">'
                                    + '<option value="and" selected>并且</option>'
                                    + '<option value="or">或者</option>'
                                    + '</select>';
                        } else {
                            gSelect += '<span class="subdivisionEmpty"></span>';
                        }
                        addhtml = '<div class="BuyerImpression" style="clear:both;padding-top:3px">' + gSelect + addhtml + '</div>';
                        //判断外层框体是否存在
                        if ($("#BuyerImpression").attr('id') != "BuyerImpression") {
                            $("#userDetailcontent").append($('<div cclass="-5" lang="kd_customer" name="客户标签" id="BuyerImpression" class="conditionContent"></div>'));
                        }
                        $("#BuyerImpression").append(addhtml);
                    }
                    else if (cClass == "-6") { //最新关怀时间
                        var values = $(conditions[k]).context.innerHTML;
                        var oprate = $(conditions[k]).attr('oprate');
                        var relations = $(conditions[k]).attr('relation');
                        var oprate = $(conditions[k]).attr('oprate');
                        var tname = $(conditions[k]).attr('tname');
                        var column = $(conditions[k]).attr('column');

                        $("#leadBtn").remove();
                        $("#usertitle").show();
                        var grobalSelect = "";
                        if (relations == "or") {
                            grobalSelect += '<select class="grobalSelect">'
                                    + '<option value="and">并且</option>'
                                    + '<option value="or" selected>或者</option>'
                                    + '</select>';
                        }
                        else if (relations == "and") {
                            grobalSelect += '<select class="grobalSelect">'
                                    + '<option value="and" selected>并且</option>'
                                    + '<option value="or">或者</option>'
                                    + '</select>';
                        } else {
                            grobalSelect += '<span class="subdivisionEmpty"></span>';
                        }
                        var addHtml = '<div style="clear:both;padding-top:3px" class="LatestCallOnTime">' + grobalSelect + '<span class="conditionleft"></span>';
                        addHtml += '<span class="innerconditon">';
                        addHtml += '<select class="customerCareType"><option value="lastPhoneCareTime"' + (column == "lastPhoneCareTime" ? "selected" : "") + '>电话关怀</option><option value="lastUrgeTime"' + (column == "lastUrgeTime" ? "selected" : "") + '>订单催付</option><option value="lastPayConcernTime"' + (column == "lastPayConcernTime" ? "selected" : "") + '>付款关怀</option><option value="lastShipRemindTime"' + (column == "lastShipRemindTime" ? "selected" : "") + '>发货提醒</option><option value="lastArrivalReminderTime"' + (column == "lastArrivalReminderTime" ? "selected" : "") + '>到达提醒</option><option value="lastReceiveConcernTime"' + (column == "lastReceiveConcernTime" ? "selected" : "") + '>签收关怀</option><option value="lastConfirmConcernTime"' + (column == "lastConfirmConcernTime" ? "selected" : "") + '>确认关怀</option><option value="lastRefundConcernTime"' + (column == "lastRefundConcernTime" ? "selected" : "") + '>退款关怀</option><option value="lastMemberUpTime"' + (column == "lastMemberUpTime" ? "selected" : "") + '>升级提醒</option></select>:';

                        var whereStr = '<select id="selectLatestCallOnTime" class="selectLatestCallOnTime" name="0" onchange="conditionChange1(this);"><option value="between"' + (oprate == "between" ? "selected" : "") + '>等于</option><option value="notbetween"' + (oprate == "notbetween" ? "selected" : "") + '>不等于</option><option value="smaller"' + (oprate == "smaller" ? "selected" : "") + '>早于(不包含当天)</option><option value="timelarger"' + (oprate == "timelarger" ? "selected" : "") + '>晚于(不包含当天)</option><option value="earlyerbetween"' + (oprate == "earlyerbetween" ? "selected" : "") + '>距离当前</option><option value="isnull"' + (oprate == "isnull" ? "selected" : "") + '>为空</option><option value="isnotnull"' + (oprate == "isnotnull" ? "selected" : "") + '>不为空</option></select>';
                        whereStr += '<input value="' + values + '" type="text" class="Wdate" onclick="WdatePicker();" onkeypress="return false;" onkeydown="return false;" lang="LatestCallOnTime">';
                        whereStr += '<input type="hidden" class="selectLatestCallOnTimeValue" value="' + values + '" />';
                        addHtml += whereStr;
                        addHtml += '<span class="del" onclick="delController(this)"></span>';
                        addHtml += '</span>';

                        addHtml += '<span class="conditionright"></span><div class="controlTips"></div></div>';
                        //判断外层框体是否存在
                        if ($("#careTime").attr('id') != "careTime") {
                            $("#userDetailcontent").append($('<div cclass="0" lang="kd_customerext" name="最近关怀时间" id="careTime" class="conditionContent"></div>'));
                        }
                        careCount++;

                        $("#careTime").append(addHtml);
                        $(".selectLatestCallOnTime").change();
                    }
                    else {
                        var name = $(conditions[k]).attr('column');
                        var cname = $(conditions[k]).attr('cname');
                        if (name == "province") {
                            name = 'city';
                        }
                        var tname = $(conditions[k]).attr('tname');
                        var stringJson = $(conditions[k]).attr('optionjson');
                        var tips = $(conditions[k]).attr('tips');
                        if (tips == null) {
                            tips = "";
                        }
                        var oprate = $(conditions[k]).attr('oprate');
                        var relation = $(conditions[k]).attr('relation');
                        var index = $(conditions[k]).attr('index');
                        var value = $(conditions[k]).text();

                        var cJson = $.parseJSON(stringJson);
                        var existDivs = $("." + name).length + 1; //已存在div个数
                        var addDiv = ''; //外层div
                        var addConditon = ''; //逻辑关系
                        var addhtml = ''; //显示的内容
                        //次数统计
                        var arry = ($("#control" + name).attr('name')).split(',');
                        var times = arry[1];
                        if (times != 'n') {
                            var t = parseInt(times);
                            if (t == 0) {
                                return false;
                            } else {
                                t = t - 1;
                                $("#control" + name).attr('name', arry[0] + "," + t + "," + arry[2]);
                                $("#control" + name).find(".times").html(t);
                                $("#control" + name).addClass("disabled");
                            }
                        }
                        for (var n = 0; n < cJson.length; n++) {
                            if (n == index || index == 'undefined') {
                                var code = cJson[n].v;
                                ajaxDoneNoAsync(url, { code: code }, function (data) {
                                    if (data && data.result){
                                    	var json = data.result
                                        if (json.type == 5) {
                                            ajaxDoneNoAsync(root+'/apps/layered/getProvince.do', { city: value }, function (data) {
                                                addhtml = '<span><select class="ui-select province" selectName="province" onchange="changeProvince(this)" >';
                                                addhtml += '<option value="-1">不限</option>';
                                                var pjson = data.result;
                                                var pid = 0;
                                                $.each(pjson, function (i) {
                                                    if (pjson[i].state == -1 || pjson[i].tbName == value) {
                                                        pid = pjson[i].tbId;
                                                        addhtml += '<option selected value="' + pjson[i].tbId + '">' + pjson[i].tbName + '</option>';
                                                    } else {
                                                        addhtml += '<option value="' + pjson[i].tbId + '">' + pjson[i].tbName + '</option>';
                                                    }
                                                });
                                                addhtml += '</select></span>';
                                                ajaxDoneNoAsync(root+"/apps/layered/getCity.do", { pid: pid }, function (data) {
                                                	var cityjson = data.result;
                                                    addhtml += '<span><select class="ui-select" lang="' + name + '" >';
                                                    addhtml += '<option>不限</option>';
                                                    $.each(cityjson, function (t) {
                                                        if (cityjson[t].tbName == value) {
                                                            addhtml += '<option selected value="' + cityjson[t].tbName + '">' + cityjson[t].tbName + '</option>';
                                                        } else {
                                                            addhtml += '<option value="' + cityjson[t].tbName + '">' + cityjson[t].tbName + '</option>';
                                                        }
                                                    });
                                                    addhtml += '</select></span>';
                                                    if (json.description != null && json.description != "") {
                                                        addhtml += json.description;
                                                    }
                                                    if (cJson[0].n != null && cJson[0].n != "") {
                                                        addConditon += "<span><select class='ui-select' id='select" + name + "' conditionJson='" + stringJson + "' name='0' onchange='conditionChange(this)' >";
                                                        for (var x = 0; x < cJson.length; x++) {
                                                            if (cJson[0].n != null && cJson[0].n != "") {
                                                                addConditon += '<option value="' + cJson[x].o + '"';
                                                                if (cJson[x].o == oprate) {
                                                                    addConditon += 'selected';
                                                                }
                                                                addConditon += '>' + cJson[x].n + '</option>';
                                                            }
                                                        }
                                                        addConditon += '</select></span>';
                                                    }
                                                    var gSelect = '';
                                                    if (relation == "or") {
                                                        gSelect += '<span><select class="ui-select grobalSelect">'
                                                            + '<option value="and">并且</option>'
                                                            + '<option value="or" selected>或者</option>'
                                                            + '</select></span>';
                                                    } else if (relation == "and") {
                                                        gSelect += '<span><select class="ui-select grobalSelect">'
                                                            + '<option value="and" selected>并且</option>'
                                                            + '<option value="or">或者</option>'
                                                            + '</select></span>';
                                                    } else {
                                                        gSelect += empty;
                                                    }
                                                    addDiv += '<div class="fn-clear '+name+'" name=\''+stringJson+'\' id="' + name + 'sub'+existDivs+'" divName="'+name+'"><div class="ui-form">'+gSelect+ '<span>'+cname+'：</span>'+addConditon+addhtml+'<a href="javascript:void(0)" class="icon-font-10" data-uid="983381" onclick="delController(this)">X</a></div></div>';
                                                    //判断外层框体是否存在
                                                    if ($("#" + name).attr('id') != name) {
                                                        if (cClass == 0) {
                                                            $("#userDetailcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                                                            $("#usertitle").show();
                                                        }
                                                    }
                                                    $("#" + name).append($(addDiv));
                                                });

                                            });
                                        } else if (json.type == 6) {
                                            addhtml += '<span>';
                                            for (var p = 1; p <= 5; p++) {
                                                if (p <= value) {
                                                    addhtml += '<a  class="Full" lang="' + p + '" onclick="changeImpress(this)"> </a>';
                                                } else {
                                                    addhtml += '<a  class="Empty" lang="' + p + '" onclick="changeImpress(this)"> </a>';
                                                }
                                            }
                                            addhtml += '<input type="hidden" value="' + value + '" lang="' + name + '"></span>';
                                            if (json.Description != null && json.Description != "") {
                                                addhtml += json.description;
                                            }
                                            if (cJson[0].n != null && cJson[0].n != "") {
                                                addConditon += "<select id='select" + name + "' class='" + stringJson + "' name='0' onchange='conditionChange(this)' >";
                                                for (var x = 0; x < cJson.length; x++) {
                                                    if (cJson[0].n != null && cJson[0].n != "") {
                                                        addConditon += '<option value="' + cJson[x].o + '"';
                                                        if (cJson[x].o == oprate) {
                                                            addConditon += 'selected';
                                                        }
                                                        addConditon += '>' + cJson[x].n + '</option>';
                                                    }
                                                }
                                                addConditon += '</select>';
                                            }
                                            var gSelect = '';
                                            if (relation == "or") {
                                                gSelect += '<select class="grobalSelect">'
                                                    + '<option value="and">并且</option>'
                                                    + '<option value="or" selected>或者</option>'
                                                    + '</select>';
                                            } else if (relation == "and") {
                                                gSelect += '<select class="grobalSelect">'
                                                    + '<option value="and" selected>并且</option>'
                                                    + '<option value="or">或者</option>'
                                                    + '</select>';
                                            } else {
                                                gSelect += empty;
                                            }
                                            addDiv += '<div style="clear:both;padding-top:3px" name=\'' + stringJson + '\' class="' + name + '" id = "' + name + 'sub' + existDivs + '">' + gSelect + '<span class="conditionleft"></span><span class="innerconditon">' + cname + '：' + addConditon + addhtml + '<span  class="del"  onclick="delController(this)"></span></span><span class="conditionright"></span><div class="controlTips">' + tips + '</div></div>';
                                            //判断外层框体是否存在
                                            if ($("#" + name).attr('id') != name) {
                                                if (cClass == 0) {
                                                    $("#userDetailcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                                                    $("#usertitle").show();
                                                }
                                            }
                                            $("#" + name).append($(addDiv));
                                        } else {
                                            var vJson = $.parseJSON(json.value);
                                            if (parseInt(json.type) == 0) { //类型 0-文本框 1-下拉框 2-单选 3-多选 4-日期
                                                var reg = "";
                                                if (cJson[index].reg != null) {
                                                    reg = "reg='" + cJson[index].reg + "' tip='" + cJson[index].tip + "'";
                                                }
                                                if (json.description == "天" || json.description == "岁" || json.description == "次" || json.description == "%" || json.description == "件") {
                                                    addhtml +="<span><input  type='text' class='ui-input ui-input-50' lang='" + name + "' value='" + value + "' " + reg + "/></span>";
                                                   // addhtml += "<input style='width:30px' type='text' class='txt' lang='" + name + "' value='" + value + "' " + reg + "/>";
                                                } else if (json.description == "元") {
                                                	addhtml +="<span><input  type='text' class='ui-input ui-input-50' lang='" + name + "' value='" + value + "' " + reg + "/></span>";
                                                   // addhtml += "<input style='width:60px' type='text' class='txt' lang='" + name + "' value='" + value + "' " + reg + "/>";
                                                } else {
                                                	addhtml +="<span><input  type='text' class='ui-input ui-input-130' lang='" + name + "' value='" + value + "' " + reg + "/></span>";
                                                   // addhtml += "<input style='width:120px' class='txt' type='text' lang='" + name + "' value='" + value + "' " + reg + "/>";
                                                }
                                            } else if (json.type == 1) {
                                                addhtml += "<span><select class='ui-select' lang='" + name + "' >";
                                                for (var j = 0; j < vJson.length; j++) {
                                                    if (vJson[j].v == value) {
                                                        addhtml += "<option selected  value='" + vJson[j].v + "'>" + vJson[j].n + "</option>";
                                                    } else {
                                                        addhtml += "<option  value='" + vJson[j].v + "'>" + vJson[j].n + "</option>";
                                                    }
                                                }
                                                addhtml += "</select></span>";
                                            } else if (json.type == 2) {
                                                for (var j = 0; j < vJson.length; j++) {
                                                    addhtml +="<span><label><input type='radio' lang='"+name+"' name='" + name + existDivs + "'";
                                                    if (vJson[j].v == value) {
                                                        addhtml += " checked  ";
                                                    }
                                                    addhtml += "value='" + vJson[j].v + "' />" + vJson[j].n + "</label></span>";
                                                }
                                            } else if (json.type == 3) {
                                                var reg = "";
                                                if (cJson[index].reg != null) {
                                                    reg = "reg='" + cJson[index].reg + "' tip='" + cJson[index].tip + "'";
                                                }
                                                var vs = value.split('∝');
                                                addhtml += "<span><input  type='text' class='ui-input ui-input-30' lang='" + name + "' value='" + vs[0] + "' " + reg + "/></span>";
                                                addhtml += "<span>~</span>";
                                                addhtml += "<span><input  type='text' class='ui-input ui-input-30' lang='" + name + "' value='" + vs[1] + "' " + reg + "/></span>";
                                            } else if (json.type == 4) {
                                                var isBirthday = '';
                                                if (name == "birthday" || cJson[index].isBirthday == "1") {
                                                    isBirthday = "{ dateFmt: 'MM-dd' }";

                                                } else {
                                                    isBirthday = "";
                                                }
                                                addhtml += '<span><input value="' + value + '"  type="text" class="Wdate"  onclick="WdatePicker(' + isBirthday + ');" onkeypress="return false;" onkeydown="return false;"  lang="' + name + '"/></span>';
                                            }
                                            if (json.description != null && json.description != "") {
                                                addhtml += "<span>" + json.description  + "</span>";
                                            }
                                            if (cJson[0].n != null && cJson[0].n != "") {
                                            	
                                            	addConditon +="<span>";
                                           	 	addConditon += "<select class='ui-select' id='select" + name + "' conditionJson='" + stringJson + "' name='"+index+"' onchange='conditionChange(this)' >";
                                                for (var x = 0; x < cJson.length; x++) {
                                                    if (cJson[0].n != null && cJson[0].n != "") {
                                                        addConditon += '<option value="' + cJson[x].o + '"';
                                                        if (cJson[x].o == oprate) {
                                                            addConditon += 'selected';
                                                        }
                                                        addConditon += '>' + cJson[x].n + '</option>';
                                                    }
                                                }
                                                addConditon += '</select>';
                                                addConditon +="</span>";
                                            }

                                            var gSelect = '';
                                            if (relation == "or") {
                                                gSelect += '<span><select class="ui-select grobalSelect">'
                                                    + '<option value="and">并且</option>'
                                                    + '<option value="or" selected>或者</option>'
                                                    + '</select></span>';
                                            } else if (relation == "and") {
                                                gSelect += '<span><select class="ui-select grobalSelect">'
                                                    + '<option value="and" selected>并且</option>'
                                                    + '<option value="or">或者</option>'
                                                    + '</select></span>';
                                            } else {
                                                gSelect += empty;
                                            }
                                            addDiv += '<div name=\''+stringJson+'\'     class="fn-clear '+name+'"  id=  "' + name + 'sub' + existDivs+'" divName="'+name+'"><div class="ui-form">'+gSelect+ '<span>'+cname+'：</span>'+addConditon+addhtml+'<a href="javascript:void(0)" class="icon-font-10" data-uid="983381" onclick="delController(this)">X</a></div></div>';
                                            //判断外层框体是否存在
                                            if ($("#" + name).attr('id') != name) {
                                                if (cClass == 0) {
                                                    $("#userDetailcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                                                    $("#usertitle").show();
                                                }
                                                if (cClass == 1) {
                                                    $("#RFMcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                                                    $("#RFMtitle").show();
                                                }
                                                if (cClass == 2) {
                                                    $("#marketingcontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                                                    $("#marketingtitle").show();
                                                }
                                                if (cClass == 3) {
                                                    $("#tradecontent").append($('<div cClass="' + cClass + '" lang="' + tname + '"  name="' + cname + '" id="' + name + '" class="conditionContent"></div>'));
                                                    $("#tradetitle").show();
                                                }
                                            }
                                            $("#" + name).append($(addDiv));
                                            InitValidate();
                                        }
                                    }
                                });
                                break;
                            }
                        }
                    }
                });
            });
        }
    }
}

//#endregion

//控件框体伸缩

//点击客户分层右边导航 隐藏与显示
function changeNav(item) {
    $(".show-btn").hide();
    $("#show-btn" + item).show();
    $(".dir-icon").attr('class', 'icon-chevron-down pull-right dir-icon');
    $("#tip-icon" + item).attr('class', 'icon-chevron-up pull-right dir-icon');
    $(".nav-item").attr('class', 'nav-item');
    $("#nav-item" + item).attr('class', 'nav-item cur');
}

function controlcontentSwap(sender, id) {
    $("div.controlcontent").hide();
    $("#" + id).show();
    $("div.controltitle_1").css({ 'background': "#ebebeb" });
    $("div.controltitle_2").css({ 'background': "#ebebeb" });
    $("div.controltitle_3").css({ 'background': "#ebebeb" });
    $("div.controltitle_4").css({ 'background': "#ebebeb" });
    $("div.controltitle_5").css({ 'background': "#ebebeb" });
    $("div.controltitle_6").css({ 'background': "#ebebeb" });
    $("div.controltitle_7").css({ 'background': "#ebebeb" });
    $(sender).css({ 'background': "#10a7d6" }); //ccc
    $("#spanExpan1").html("+").css("margin-left", "0px");
    $("#spanExpan2").html("+").css("margin-left", "0px");
    $("#spanExpan3").html("+").css("margin-left", "0px");
    $("#spanExpan4").html("+").css("margin-left", "0px");
    $("#spanExpan5").html("+").css("margin-left", "0px");
    $("#spanExpan6").html("+").css("margin-left", "0px");
    $("#spanExpan7").html("+").css("margin-left", "0px");
    $(sender).children("span").last().html("-").css("margin-left", "3px");
}

//#endregion

//#endregion

//#region 任务节点 短信/邮件/优惠劵/定向优惠/彩票/电子书/电子优惠劵/其它

//#region 绑定界面 
function bindTask(jsonData) {
    try {        
        var nowDate = new Date();
        var cellId = $("#hidId").val();
        var cellStyle = $("#hidStyle").val();

        //重置    
        $("#MarketingTaskTitle").val("");
        $("#SendTime").val($("#timetoday").val());
        $("#SendHour").val(nowDate.getHours());

        if ($("#hidActivityType").val() == "2")
        {
            $(".delayTime").show();
            $(".absoluteTime").hide();
        }
        else
        {
            $(".delayTime").hide();
            $(".absoluteTime").show();
        }

        $(".trtaskTitle").hide();
        $(".tbodysub").hide();

        $("#MarketingTitle").val("");
        $("#trEmailSend").hide();

        $("#dxlengthMsg").hide();
        $("#trdxLengthMsg").hide();
        
        $("#p_update").hide();
        $("#p_add").hide();
        $(".helpTipbg").hide();
        $("#trSMSSignature").hide();

        $("#trIsFilterFails").hide();

        $(".tbodyCoupon").hide();
        $(".tbodyEleCoupon").hide();
        $(".tbodyUMP").hide();
        $(".tbodyLottery").hide();
        $(".tbodyEbook").hide();
        $(".tbodyIntegral").hide();
        
        var guid = '';
        if (jsonData != '') {
            var jsonObject = JSON.parse(jsonData);

            guid = jsonObject.guid;
            $("#MarketingTaskTitle").val(MarketingDecodeURIComponent(jsonObject.nodeName));
            $("#SendTime").val(jsonObject.sendTime);
            $("#SendHour").val(jsonObject.sendHour);
            $("#SendMin").val(jsonObject.sendMin);
            if (typeof (jsonObject.delayMinute) != 'undefined') {
                $("#txtMarketingDelayHour").val(ConvertToFloat(jsonObject.delayMinute) / 60);
            }

            $("#MarketingTitle").val(MarketingDecodeURIComponent(jsonObject.emailTitle));
            $("#Template").val(MarketingDecodeURIComponent(jsonObject.content)); //短信内容
            $("#selCoupon").val(jsonObject.selCoupon); 
            if (typeof (jsonObject.remark) != 'undefined') {
                $("#txtTaskRemark").val(MarketingDecodeURIComponent(jsonObject.remark));
            }

            if (cellStyle == "coupon" && $("#selCoupon").val() == "") {
                loadCouponInfo(jsonObject.selCoupon, $("#selCoupon"));
            }

            $("#selUMPActivity").val(jsonObject.selUmpActivity);
            if (jsonObject.selCoupon != '' && jsonObject.selCoupon != '0') {
                $("#selCoupon").change();
            }
            if (jsonObject.selUmpActivity != '' && jsonObject.selUmpActivity != '0') {
                $("#selUMPActivity").change();
            }            
            //是否【客户清洗】
            $("#ckbIsFilterFails").prop("checked", jsonObject.isFilterFails);

            $("#txtLotteryNotityMobile").val(jsonObject.lotteryNotityMobile);
            $("#selLotteryType").val(jsonObject.lotteryTypeId);
            $("#txtStakeCount").val(jsonObject.lotteryStakeCount);
            $("#txtSweetyWords").val(MarketingDecodeURIComponent(jsonObject.sweetyWords));
            //电子书 库ID,书ID,书名称            
            $("#hidEbookSelectedItem").val(jsonObject.ebookItem);
            $("#hidEbookPrice").val(jsonObject.ebookPrice);
            $("#txtEbookNotifyMobile").val(jsonObject.ebookNotifyMobile);
            $("#txtEbookBlessing").val(jsonObject.ebookBlessing);
            
            //电子优惠劵
            $("#selEleCoupon").val(jsonObject.eleCoupon);
            $("#txtEleCouponContent").val(jsonObject.eleCouponContent);
            
            //积分            
            $("#divIntegralAction input[type='radio']").each(function (index, object) {
                if ($(object).val() == jsonObject.integralAction) {
                    $(object).prop("checked", "checked");
                    SelIntegralAction($(object).val());
                }
            });
            $("#txtIntergralNum").val(jsonObject.integralNum);            
            if (jsonObject.integralTopWay == "1") {
                $("#chbIntegralTopWay").prop("checked", "checked");
            }
        }
        
        //判断是否允许店铺签名
        if (!IsAllowSmsSignatrue()) {
            var limitTop = "因工信部对短信签名要求,暂时无法使用店铺签名;建议在内容中提示店铺信息.<br/>如：XXX您好，您在“XXX旗舰店”的订单（订单金额：XX元）尚未付款，为避免……【客道】";
            $("#tdSMSSignature").html("");
            $("#spanEleSMSSignature").html("");
            $("#smslimitTip").html("<a style='color:red;' poptitle=\"" + limitTop + "\">暂时无法使用!</a>");
            $("#elelimitTip").html("<a style='color:red;' poptitle=\"" + limitTop + "\">暂时无法使用!</a>");
        }

        if (cellStyle == "sms" || cellStyle == "email") {
            $("#trIsFilterFails").show();
        }
        if (cellStyle == "sms") {
            $(".tbodysub").show();           
            $("#dxlengthMsg").show();
            $("#trdxLengthMsg").show();
            
            $(".helpTipbg").show();
            $("#trSMSSignature").show();          
        }
        if (cellStyle == "email") {
            $(".tbodysub").show();
            $(".trtaskTitle").show();            
            //初始化界面时显示和隐藏  保存至新模板和更新模板复选框
                  
            setTimeout(function () {
              /*  emailEditor = new UE.ui.Editor({
                    initialFrameHeight: 90, initialFrameWidth: 600, zIndex:9999
                });
                emailEditor.render('Template');*/
                //emailEditor = $("#Template").xheditor({ skin: 'vista', tools: 'Blocktag,Fontface,Bold,Italic,Underline,Strikethrough,|,FontColor,BackColor,|,Img,Hr,Table,|,Source,Print', upImgUrl: '/WWMsg/uploads' });
            	
            	emailEditor = new UE.ui.Editor({
        	        initialFrameHeight: 200, initialFrameWidth: "100%"
        	    });
            	emailEditor.render("Template"); 
            	
            }, 200);
        }
        
        if (cellStyle == "coupon") {
            $(".tbodyCoupon").show();            
        }
        if (cellStyle == "eleCoupon") {
            $(".tbodyEleCoupon").show();
            selEleCoupon();
        }
        if (cellStyle == "promotion") {
            $(".tbodyUMP").show();
        }
        if (cellStyle == "lottery") {
            $(".tbodyLottery").show();
        }
        if (cellStyle == "ebook") {
            var items = $("#hidEbookSelectedItem").val().split(',');
            if (items.length >= 3) {
                $("#spanSelectedEbook").html(items[2]);
            }
            $(".tbodyEbook").show();
        }
        if (cellStyle == "integral") {
            $(".tbodyIntegral").show();
        }

        //活动已提交
        if (guid != "" && !IsCanEditNode(guid)) {
            $("#MarketingTaskTitle").prop("disabled", true);
            $("#SendTime").prop("disabled", true);
            $("#SendHour").prop("disabled", true);
            $("#SendMin").prop("disabled", true);
            $("#txtMarketingDelayHour").prop("disabled", true);
            $("#MarketingTitle").prop("disabled", true);          
            $("#trIsFilterFails").prop("disabled", true);
            $("#Template").attr("readonly", "readonly");
            $("#ckbIsFilterFails").prop("disabled", true);

            $("#selUMPActivity").prop("disabled", true);
            $("#selCoupon").prop("disabled", true);
            $("#selLotteryType").prop("disabled", true);
            $("#txtStakeCount").prop("disabled", true);
            $("#txtSweetyWords").prop("disabled", true);
            $("#txtLotteryNotityMobile").prop("disabled", true);
            $("#txtTaskRemark").prop("disabled", true);
            
            //短信,邮件模板
            $("#smsTemplateList,#emailTemplateList").select2("readonly", true);

            $("#txtEbookItem").prop("disabled", true);
            $("#txtEbookNotifyMobile").prop("disabled", true);
            $("#txtEbookBlessing").prop("disabled", true);
            
            //电子优惠劵
            $("#selEleCoupon").prop("disabled", true);            
            $("#txtEleCouponContent").attr("readonly", "readonly");
            
            //积分
            $("#txtIntergralNum").prop("disabled", true);
            $("#divIntegralAction input[type='radio']").prop("disabled", true);

            $("#selMarketing").hide();
            $("#p_update").hide();
            $("#p_add").hide();
            $("#trContentRemark").hide();
            $("#trEleCouponContentRemark").hide();
            
            //允许编辑
            if ($("#hidType").val() == "audit") {                
                var showArray = [$("#selMarketing")];
                if (cellStyle == "sms") {
                    showArray.push($("#trContentRemark"));
                }
                if (cellStyle = "eleCoupon") {
                    showArray.push($("#trEleCouponContentRemark"));
                }
                var readOnlyArray = [$("#Template"), $("#txtEleCouponContent")];
                var enableArray = [$("#MarketingTaskTitle"), $("#SendTime"), $("#SendHour"), $("#txtMarketingDelayHour"), $("#SendMin"), $("#MarketingTitle"),
                    $("#ckbIsFilterFails"), $("#selUMPActivity"), $("#selCoupon"), $("#txtStakeCount"), $("#selLotteryType"),
                    $("#txtSweetyWords"), $("#txtLotteryNotityMobile"), $("#txtTaskRemark"), $("#txtEbookItem"), $("#txtEbookNotifyMobile"), $("#txtEbookBlessing"),
                    $("#selEleCoupon"), $("#txtIntergralNum"), $("#divIntegralAction input[type='radio']"), $("#smsTemplateList"), $("#emailTemplateList")];
                IsCanEditNodeOnServer(guid, showArray, readOnlyArray, enableArray);
            }
        }
    } catch (e) {
         DoDesign.alert(e);
    }
}
//#endregion

//#region 占位符

//模板插入占位符
function insertTemplate(sender) {
    var ShortCut = $(sender).attr("tag");
    var cellStyle = $("#hidStyle").val();
    if (cellStyle == "email") {
        //emailEditor.pasteText(ShortCut);
        //emailEditor.execCommand('insertHtml', ShortCut);
    	//editorHead.html(editorHead.html()+ShortCut);//change
    	editorHead.setContent(editorHead.getContent()+ShortCut);//hyf
    	
    }
    else {
    	$('#TemplateSMS').insert(ShortCut);

        //$('#TemplateSMS').insertAfter();
       totalMsgNum($("#TemplateSMS"));
    }
  //  totalMsgNum($("#Template"));
}
//统计字数
function totalMsgNum(sender) {
    var rule =  GetYanSmsRule();
    if (rule != null) {
        CalculateSmsNumNew(sender, "templateLengthMsg", false, false, "tdSMSSignature", rule.SpSignWordCount, rule.SingleSmsWordCount, rule.LongSmsWordCount);
    }
    else {
        CalculateSmsNumNew(sender, "templateLengthMsg", false, false, "tdSMSSignature");   
    }
}

//#endregion

//#region 电子优惠劵占位符

function insertEleTemplate(sender) {
    var shortCut = $(sender).attr("tag");
    $('#txtEleCouponContent').insert(shortCut);
    totalEleMsgNum($("#txtEleCouponContent"));
}

//统计字数
function totalEleMsgNum(sender) {
    var rule = GetYanSmsRule();

    if (rule != null) {
        CalculateSmsNumNew(sender, "spanEleCouponContentTip", true, false, "spanEleSMSSignature", rule.SpSignWordCount, rule.SingleSmsWordCount, rule.LongSmsWordCount);
    }
    else {
        CalculateSmsNumNew(sender, "spanEleCouponContentTip", true, false, "spanEleSMSSignature");
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
	//alert($("#" + smsSignature).html()+":"+$("#" + smsSignature).val());
    var desc = GetSmsLenDescNew($(src).val(), $.trim($("#" + smsSignature).val()), isContainHoldPlace, isbyte, kedaoSignLength, oneSmsLength, mulSmsLenght);
    $("#" + e).html(desc).show();
}

function GetSmsLenDescNew(content, smsSignature, isContainHoldPlace, isbyte, kedaoSignLength, oneSmsLength, mulSmsLenght) {
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
        strlen = GetStringLen(content, isContainHoldPlace, isbyte);
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
//选择电子优惠劵
function selEleCoupon() {
    //短地址
    var showUrl = $("#selEleCoupon").find('option:selected').attr('eurl') + " ";

    if ($("#selEleCoupon").val() != '')
    {
        //显示,替换占位符
        $("#spanEleCodeUrl").show();
        $("#spanEleCodeUrl").attr("tag", showUrl);
    }
    else
    {
        //隐藏
        //$("#spanEleCodeUrl").hide();
        $("#spanEleCodeUrl").attr("tag", "");
    }
    //计算短信长度
    totalEleMsgNum($("#txtEleCouponContent"));
}

//#endregion


//#region 保存任务
function SelMarketing() {
    try {
        var cellIds = $("#hidId").val();
        var cellStyle = $("#hidStyle").val();

        var marketingTaskTitle = $("#MarketingTaskTitle").val();
        var sendTime = $("#sendTime").val();
        var sendHour = $("#SendHour").val();
        var sendMin = $("#SendMin").val();
        var delayHour = $("#txtMarketingDelayHour").val();
        var emailTitle = $.trim($("#MarketingTitle").val());       
        var content = "";
        if (cellStyle == "email")
        {
         //   content = emailEditor.getContent();
        	//content =editorHead.html();
        	content =editorHead.getContent();//hyf
        	console.log(content);
        }
        if(cellStyle == "sms"){
        	 content = $("#TemplateSMS").val();
        }
     /*   else
        {
            content = editorHead.html();
        }*/
        //清洗
        var isFilterFails = $("#ckbIsFilterFails").prop("checked") ? true : false;

        var selCoupon = $("#selCoupon").val();
        var selUmpActivity = $("#selUMPActivity").val();

        var lotteryType = $("#selLotteryType").val();        
        var lotteryNotityMobile = $("#txtLotteryNotityMobile").val();
        var stakeCount = $("#txtStakeCount").val();
        var sweetyWords = $("#txtSweetyWords").val();
        var remark = $("#txtTaskRemark").val();
        //电子书 库ID,书ID,书名称
        var ebookItem = $("#hidEbookSelectedItem").val();
        var ebookNotifyMobile = $("#txtEbookNotifyMobile").val();
        var ebookPrice = $("#hidEbookPrice").val();
        var ebookBlessing = $("#txtEbookBlessing").val();
        //电子优惠劵
        var eleCoupon = $("#selEleCoupon").val();
        var eleCouponContent = $("#txtEleCouponContent").val();
        var eleShotUrl = $("#selEleCoupon").find('option:selected').attr('eurl');
        //积分值
        var integralAction = $("#divIntegralAction input[type='radio']:checked").val();
        var integralNum = $("#txtIntergralNum").val();
        var integralTopWay = $("#chbIntegralTopWay").is(":checked") ? "1" : 0;
        
        //tdSMSSignature
        var smsSignature2 = $("#tdSMSSignature").val();//短信签名列表取值
        
        $("#errMsg").hide();
        
        var smsSignature2 = $("#tdSMSSignature2").val();//短信签名列表取值
        var strError = "";
        //基础校验
    /*    if (marketingTaskTitle == '') {
            strError += "任务名称不能为空！";
        }
        if (sendTime == '') {
            //strError += "任务执行时间不能为空！";
             sendTime  = $("#timetoday").val();
        }
        if (delayHour == '') {
            strError += "延时执行小时不能为空！";
        }
        if (cellStyle == "sms" && content == '') {
            strError += "短信内容不能为空！";
        }
        if (cellStyle == "email" && emailTitle == '') {
            strError += "邮件主题不能为空！";
        }
        if (cellStyle == "email" && content == '') {
            strError += "邮件内容不能为空！";
        }
        if (cellStyle == "coupon" && selCoupon == '') {
            strError += "请选择使用的优惠劵！";
        }
        if (cellStyle == "promotion" && selUmpActivity == '') {
            strError += "请选择参与的定向优惠！";
        }
        if (cellStyle == "lottery" && lotteryType == '') {
            strError += "请选择赠送彩票类型！";
        }
        var intStakeCount = 0;
        if (cellStyle == "lottery") {
            intStakeCount = parseInt(stakeCount);
        }        
        if (cellStyle == "lottery" && lotteryNotityMobile == '') {
            strError += "请输入彩票通知手机号码！";
        }
        if (cellStyle == "lottery" && lotteryNotityMobile != '' && !IsMobile(lotteryNotityMobile)) {
            strError += "彩票通知手机号码格式错误！";
        }
        if (cellStyle == "lottery" && stakeCount == '') {
            strError += "请选择赠送彩票数量！";
        }
        if (cellStyle == "lottery" && stakeCount != '' && isNaN(stakeCount)) {
            strError += "赠送彩票数量只能为整数,且范围为：1-100";
        }
        if (cellStyle == "lottery" && stakeCount != '' && !isNaN(stakeCount) && (intStakeCount < 1 || intStakeCount > 100)) {
            strError += "赠送彩票数量只能为整数,且范围为：1-100";
        }
        if (cellStyle == "lottery" && (sweetyWords.length > 20)) {
            strError += "赠言长度限制20字内,当前赠言长度为：" + sweetyWords.length + "字符.";
        }
        if (cellStyle == "lottery" && sweetyWords.length > 0 && IsContainUrl(sweetyWords)) {
            strError += "赠言不能包含链接.";
        }

        if (cellStyle == "ebook" && ebookItem == '') {
            strError += "请选择赠送的电子书！";
        }
        if (cellStyle == "ebook" && ebookNotifyMobile != '' && !IsMobile(ebookNotifyMobile)) {
            strError += "电子书通知手机号码格式错误！";
        }
        
        if (cellStyle == "eleCoupon" && eleCoupon == '') {
            strError += "请选择赠送的电子优惠劵！";
        }
        if (cellStyle == "eleCoupon" && eleCouponContent == '') {
            strError += "请输入赠言！";
        }
        if (cellStyle == "eleCoupon" && eleCouponContent != '' && eleCoupon != '' && eleCouponContent.indexOf('{EleCode}') == -1) {
            strError += "赠言必须包含【电子优惠码】占位符！";
        }
        if (cellStyle == "eleCoupon" && eleCouponContent != '' && eleCoupon != '' && eleCouponContent.indexOf(eleShotUrl) == -1) {
            strError += "赠言必须包含【兑换链接】占位符！";
        }
        if (cellStyle == "eleCoupon" && eleCouponContent != '' && eleCoupon != '' && eleCouponContent.indexOf(eleShotUrl) > -1) {
            var eleIndex = eleCouponContent.indexOf(eleShotUrl) + eleShotUrl.length;            
            if (eleIndex < eleCouponContent.length) {
                if (eleCouponContent[eleIndex] != ' ') {
                    strError += "【兑换链接】后面必须接空格！";
                }
            }
        }

        if (cellStyle == "integral") {
            if (typeof(integralAction) == 'undefined') {
                strError += "请选择积分动作！";
            }
            if (integralAction == 0 || integralAction == 1) {
                var igNum = parseInt($.trim(integralNum));
                if (isNaN(igNum) || igNum <= 0) {
                    strError += "积分值应大于0！";
                } else {
                    integralNum = igNum;
                }
            }
        }*/
        
        if (strError != '') {
            $("#errMsg").show();
            $("#errMsg").html(strError);
            return;
        }

        var editIds = cellIds.split(',');
        //依次保存节点值
        for (var i = 0; i < editIds.length; i++) {
            var curId = editIds[i];
            if ($.trim(curId) != "") {
                var curNodeName = marketingTaskTitle + (i > 0 ? "(" + i + ")" : "");

                //增加编辑任务GUID
                var guid = curId;
                //活动不允许标记,表示执行中编辑        
              /*  if (IsPartEdit()) {
                    var jsonOldData = GetConfigData(cellStyle, curId);
                    if (jsonOldData != '') {
                        var jsonOldObject = JSON.parse(jsonOldData);
                        guid = jsonOldObject.guid;
                        //修改节点
                        AddEditNode(guid);
                    }
                }*/
                
                //保存数据
                var data = {
                    guid: guid,
                    cellId: curId,
                    cellStyle: cellStyle,
                    nodeName: curNodeName,
                    sendTime: sendTime,
                    sendHour: sendHour,
                    sendMin: sendMin,
                    delayMinute: ConvertToFloat(delayHour) * 60,
                    emailTitle: emailTitle,
                    content: content,
                    isFilterFails: isFilterFails,
                    selCoupon: selCoupon,
                    selUmpActivity: selUmpActivity,
                    lotteryTypeId: lotteryType,
                    lotteryStakeCount: stakeCount,
                    lotteryNotityMobile: lotteryNotityMobile,
                    sweetyWords: sweetyWords,
                    ebookItem: ebookItem,
                    ebookNotifyMobile: ebookNotifyMobile,
                    ebookPrice: ebookPrice,
                    ebookBlessing: ebookBlessing,
                    eleCoupon: eleCoupon,
                    eleCouponContent: eleCouponContent,
                    integralAction : integralAction,
                    integralNum: integralNum,
                   // integralTopWay: integralTopWay,
                   // allowSmsSignatrue: IsAllowSmsSignatrue() ? "1" : "0",
                    smsSignature2:smsSignature2,
                    remark: remark
                };
                var jsonData = JSON.stringify(data);
                var tipDate = "";
                if ($("#hidActivityType").val() == "2") {
                    tipDate = "<span cid='" + curId + "' class='nodeDateTip'>延时：" + ConvertToFloat(delayHour) + " 小时</span><br/>";
                } else {
                    tipDate = "<span cid='" + curId + "' class='nodeDateTip'>" + sendTime +  '</span><br/>';
                }
                tipDate = tipDate + curNodeName;
                SaveConfigData(curId, cellStyle, tipDate, jsonData);
            }
        }

        //计算短信条数,超2条给出提示
        if (cellStyle == "sms") {
            var rule = GetYanSmsRule();

            if (rule != null) {
                if ((content + $("#tdSMSSignature").html()).length + rule.SpSignWordCount > rule.SingleSmsWordCount) {
                    var tip = GetSmsLenDescNew(content, $("#tdSMSSignature").html(), true, false, rule.SpSignWordCount, rule.SingleSmsWordCount, rule.LongSmsWordCount);
                     DoDesign.alert(tip);
                } else {
                    //swindow.parent.$.colorbox.close();
                }
            } else {
                if ((content + $("#tdSMSSignature").html()).length > 70) {
                    var tip = GetSmsLenDescNew(content, $("#tdSMSSignature").html(), true, false);
                   ///  DoDesign.alert(tip);
                } else {
                   // window.parent.$.colorbox.close();
                }
            }            
        }
        else {
          //  window.parent.$.colorbox.close();
        }

    } catch (e) {
         DoDesign.alert("[marketingNode.js 2507]"+e);
    }
}
//#endregion  

//加载优惠劵信息
function loadCouponInfo(couponId, selObj) {
    var data = { couponId: couponId };
    $.ajax({
        url: "/StepMarketing/GetCouponInfo",
        type: "post",
        data: data,
        success: function (json) {
            if (json.IsOK) {
                $(selObj).append(json.Description);
                $(selObj).val(couponId);
                
            }
        },
        error: function (e) {

        }
    });
}

//加载电子书
function LoadEbooks(isRef) {

    //是否刷新淘宝数据
    if (typeof (isRef) == 'undefined') {
        isRef = 0;
    }
    //刷新
    if (isRef == 1) {
        $("#btnEbookRefrush").attr("disabled", "disabled");
        $("#btnEbookRefrush").val("刷新中");
        $("#selLibs").html("");
        $("#hidEbookItems").val("");
        $("#eBooksUlList li:gt(0)").remove();
    }
    $.ajax({
        url: "/EBook/SearchEbookItems?Ref=" + isRef,
        type: "post",
        success: function (json) {
            var selLibOptions = "<option value=''>请选择</option>";
            $(json).each(function (index, obj) {
                if (obj.EbookLibName != "" && selLibOptions.indexOf(obj.EbookLibName) < 0) {
                    selLibOptions += "<option value='" + obj.EbookLibId + "'>" + obj.EbookLibName + "</option>";                    
                }
            });
            
            $("#selLibs").html(selLibOptions);
            $("#hidEbookItems").val(JSON.stringify(json));
            pageEbooks(1);

            $("#btnEbookRefrush").removeAttr("disabled");                        
            $("#btnEbookRefrush").val("刷新");
        },
        error: function (e) {
             DoDesign.alert(e);
        }
    });
}

//电子书翻页
function pageEbooks(pageIndex) {
    var libId = $("#selLibs").val();
    var itemName = $.trim($("#txtEbookName").val());
    if (typeof (pageIndex) == 'undefined') {
        pageIndex = $("#hidEbookPageIndex").val() + 1;
    }
    
    var pageSize = 5;
    var jsons = JSON.parse($("#hidEbookItems").val());

    var books = new Array();

    $(jsons).each(function (index, obj) {
        if ((libId == "" || libId == obj.EbookLibId) && (itemName == "" || obj.ItemTitle.indexOf(itemName) > -1)) {
            books.push(obj);
        }
    });

    var pageTotal = books.length;
    var start = pageSize * (pageIndex - 1);
    var end = pageSize * pageIndex;

    var html = "";
    var page = "";

    for (var i = 0; i < books.length; i++) {
        if (i >= start && i < end) {
            var tip = "当前价格：" + books[i].ActualFee + "元; 原价：" + books[i].ItemPrice + "元; 实体书价：" + books[i].EntityPrice + "元; 作者：" + books[i].Author + "; 版权方：" + books[i].CopyRight;
            html += "<li><a title='" + tip + "' onclick=\"SelEbookItem(" + books[i].EbookLibId + "," + books[i].ItemId + ",'" + books[i].ItemTitle + "(" + books[i].ActualFee + "元)'," + books[i].ActualFee + ",'" + tip
                + "')\">" + books[i].ItemTitle + "(" + books[i].ActualFee + "元)</a></li>";
        }
    }

    if (start > 0) {
        page += "<a href='#' onclick='pageEbooks(" + (pageIndex - 1) + ")'>上一页</a>";
    }
    else {
        page += "<a href='#' style='color: darkgray;'>上一页</a>";
    }
    if (pageTotal > end) {
        page += " <a href='#' onclick='pageEbooks(" + (pageIndex + 1) + ")'>下一页</a>";
    }
    else {
        page += " <a href='#' style='color: darkgray;'>下一页</a>";
    }
    
    page += "<span style='padding-left: 60px;'>第" + pageIndex + "页,每页" + pageSize + "条共" + pageTotal + "条" + Math.ceil(pageTotal / pageSize) + "页</span>";
    html += "<li><div>" + page + "</div></li>";

    $("#eBooksUlList li:gt(0)").remove();    
    $("#eBooksUlList").append(html);    
}

//选中电子书
function SelEbookItem(libId, itemId, itemTitle, itemPrice, tip) {    
    try {
        $("#hidEbookSelectedItem").val(libId + "," + itemId + "," + itemTitle);
        $("#hidEbookPrice").val(itemPrice);
        $("#spanSelectedEbook").html(itemTitle);
        $("#spanSelectedEbook").attr("title", tip);
        //隐藏列表
        ToggleEbookList();
    } catch(e) {
         DoDesign.alert(e);
    }
}

//显示关闭电子书列表
function ToggleEbookList() {
    var mainDiv = $("#ebookMainDiv");
    if ($(mainDiv).attr("class") == 'btn-group') {
        $(mainDiv).removeClass("btn-group");
        $(mainDiv).addClass("btn-group open");
        LoadEbooks();
    }
    else
    {
        $(mainDiv).removeClass("btn-group open");
        $(mainDiv).addClass("btn-group");
    }
}

//选择积分动作
function SelIntegralAction(type) {
    if (type == 0)
    {
        $("#txtIntergralNum").prop("disabled", false);
        $("#chbIntegralTopWay").prop("disabled", false);
    }
    else if (type == 1)
    {
        $("#txtIntergralNum").prop("disabled", false);
        $("#chbIntegralTopWay").prop("disabled", true);
        $("#chbIntegralTopWay").removeAttr("checked");
    }
    else if (type == -1)
    {
        $("#txtIntergralNum").val("");
        $("#txtIntergralNum").prop("disabled", true);
        $("#chbIntegralTopWay").prop("disabled", true);
        $("#chbIntegralTopWay").removeAttr("checked");
    }
}

//#endregion

//#region 等级修改

//绑定界面
function bindCustomerGrade(jsonData) {
    try {
        //重置
        $("#CustomerGradeTitle").val("等级修改");
        $("#selCustomerGrade").val("-1");
        $("input[name='checkCustomerGradeOption']:eq(0)").prop("checked", "checked");

        //绑定数据    
        var guid = '';
        if (jsonData != '') {
            var jsonObject = JSON.parse(jsonData);
            guid = jsonObject.guid;
            $("#CustomerGradeTitle").val(MarketingDecodeURIComponent(jsonObject.nodeName));
            $("#selCustomerGrade").val(jsonObject.customerGrade);
            $("input[name='checkCustomerGradeOption']:eq(" + jsonObject.customerGradeOption + ")").prop("checked", "checked");
            $("#txtCustomerGradeRemark").val(MarketingDecodeURIComponent(jsonObject.customerGradeRemark));
        }

        //活动已提交
        if (guid != "" && !IsCanEditNode(guid)) {
            $("#CustomerGradeTitle").prop("disabled", true);
            $("#selCustomerGrade").prop("disabled", true);
            $("#txtCustomerGradeRemark").prop("disabled", true);
            $("input[name='checkCustomerGradeOption']").prop("disabled", true);

            $("#btn_SaveCustomerGrade").hide();
        }
    } catch (e) {
         DoDesign.alert(e);
    }
}

//保存设置
function SelCustomerGrade() {
    try {
        var cellIds = $("#hidId").val();
        var cellStyle = $("#hidStyle").val();

        var nodeTitle = $("#customerGradeTitle").val();
        var sendTime = $("#hidCustomerGradeSendTime").val();
        var sendHour = $("#hidCustomerGradeHour").val();
        var sendMin = $("#hidCustomerGradeMinute").val();
        var customerGrade = $("#selCustomerGrade").val();
        var customerGradeOption = $("input[name='checkCustomerGradeOption']:checked").val();
        var customerGradeRemark = $("#txtCustomerGradeRemark").val();

        var strError = "";
        //基础校验
        if (nodeTitle == '') {
            strError += "任务名称不能为空！";
        }
        if (customerGrade == "-1") {
            strError += "请选择会员等级！";
        }
        if (customerGradeOption == "") {
            strError += "请选择修改方案！";
        }

        if (strError != '') {
            $("#customerGradeError").show();
            $("#customerGradeError").html(strError);
            return false;
        }

        var editIds = cellIds.split(',');
        //依次保存节点值
        var j=0;
        for (var i = 0; i < editIds.length; i++) {
        	j=j+1;
            var curId = editIds[i];
      
            if ($.trim(curId) != "") {
                var curNodeName = nodeTitle + (i > 0 ? "(" + i + ")" : "");
               
                //增加编辑任务GUID
                var guid = curId;
                if (IsPartEdit()) {
                    var jsonOldData = GetConfigData(cellStyle, curId);
                    if (jsonOldData != '') {
                        var jsonOldObject = JSON.parse(jsonOldData);
                        guid = jsonOldObject.guid;
                        //新增节点
                        AddEditNode(guid);
                    }
                }
                //保存数据
                var data = 
	                {
	                    guid: guid,
	                    cellId: curId,
	                    cellStyle: cellStyle,
	                    nodeName: curNodeName,
	                    sendTime: sendTime,
	                    sendHour: sendHour,
	                    sendMin: sendMin,
	                    customerGrade: customerGrade,
	                    customerGradeOption: customerGradeOption,
	                    customerGradeRemark: customerGradeRemark
	                };

                var jsonData = JSON.stringify(data);
           
                curNodeName = "<span cid='" + curId + "' class='nodeDateTip'></span>" + curNodeName;
               if( SaveConfigData(curId, cellStyle, curNodeName, jsonData)){
            	   if(j==editIds.length-1||editIds.length==1){
            	   return true;
            	   }
               }else{
            	   if(j==editIds.length-1||editIds.length==1){
            	   return false;
            	   }
               }
            }
        }

//        window.parent.$.colorbox.close();
    } catch (e) {
         DoDesign.alert(e);
    }
}

//#endregion

//#region 属性修改

//绑定界面
function bindCustomerProperty(jsonData) {
    //重置
    $("#txtCustomerPropertyTitle").val("属性修改");

    var guid = '';
    if (jsonData != '') {
        var jsonObject = JSON.parse(jsonData);
        guid = jsonObject.guid;
        $("#txtCustomerPropertyTitle").val(MarketingDecodeURIComponent(jsonObject.nodeName));
        $("#hidCustomerPropertySendTime").val(jsonObject.sendTime);
        $("#hidCustomerPropertySendHour").val(jsonObject.sendHour);
        $("#hidCustomerPropertySendMinute").val(jsonObject.sendMin);
        var customerProperty = jsonObject.customerProperty;
        if (jsonObject.customerPropertyOption == '1') {
            $("#customerPropertyIsCover").prop("checked", "checked");
        }

        var customerItems = customerProperty.split('|');
        for (var i = 0; i < customerItems.length; i++) {
            if (customerItems[i] != '') {
                var type = "";
                var name = "";
                var value = "";
                var customerInfo = customerItems[i].split('=');

                if (customerInfo.length == 3) {
                    type = customerInfo[0];
                    name = customerInfo[1];
                    value = MarketingDecodeURIComponent(customerInfo[2]);
                }
                if (type == "text" || type == "select") {
                	
                    $("#customerPropertyContainer:first [name='" + name + "']").val(value);
                }
                if (type == "radio") {
                    $("#customerPropertyContainer:first [name='" + name + "']").each(function (index, object) {
                        if ($(object).val() == value) {
                            $(object).prop("checked", "checked");
                        }
                    });
                }
                if (type == "checkbox") {
                    if (name.indexOf('$row_$') > -1) {
                        $("#customerPropertyContainer:first [name='" + name + "']").prop("checked", "checked");
                        $("#customerPropertyContainer:first [name='" + name + "']").change();
                    } else {
                        $("#customerPropertyContainer:first [name='" + name + "']").each(function(index, object) {
                        	
                            if ($(object).val() == value) {
                                $(object).prop("checked", "checked");
                            }
                        });
                    }
                }
            }
        }
    }

    //活动已提交
//    if (guid != "" && !IsCanEditNode(guid)) {
//        $("#customerPropertyContainer input,#customerPropertyContainer select").prop("disabled", true);
//        $("#txtCustomerPropertyTitle").prop("disabled", true);
//        $("#customerPropertyIsCover").prop("disabled", true);
//
//        $("#btn_CustomerProperty").hide();
//    }
}

//保存设置
function SelCustomerProperty() {
    try {
        var cellIds = $("#hidId").val();
        var cellStyle = $("#hidStyle").val();

        var nodeTitle = $("#txtCustomerPropertyTitle").val();
        var sendTime = $("#hidCustomerPropertySendTime").val();
        var sendHour = $("#hidCustomerPropertySendHour").val();
        var sendMin = $("#hidCustomerPropertySendMinute").val();
        var customerProperty = "";
        var customerPropertyOption = "0";

        //是否设置覆盖
        if ($("#customerPropertyIsCover").is(":checked")) {
            customerPropertyOption = "1";
        }
        //获取设置的值
        $("#customerPropertyContainer:first").find('select,input').each(function (index, object) {
            var itemInfo = "";
            if ($(object).is("input")) {
                if ($(object).attr("Type") == "text") {
                    if ($(object).val() != "") {
                        itemInfo += 'text=' + $(object).attr("name") + '=' + encodeURIComponent($(object).val());
                    }
                }
                if ($(object).attr("Type") == "radio") {
                    if ($(object).is(":checked")) {
                        itemInfo += 'radio=' + $(object).attr("name") + '=' + encodeURIComponent($(object).val());
                    }
                }             
                if ($(object).attr("Type") == "checkbox") {
                    if ($(object).is(":checked")) {
                        itemInfo += 'checkbox=' + $(object).attr("name") + '=' + $(object).val();
                    }
                }
            }
            else if ($(object).is("select")) {
                if ($(object).val() != "") {
                    itemInfo += 'select=' + $(object).attr("name") + '=' + encodeURIComponent($(object).val());
                }
            }

            if (itemInfo != "") {
                customerProperty += itemInfo + '|';
            }
        });

        $("#customerPropertyError").hide();
        var strError = "";
        //基础校验
        if (nodeTitle == '') {
            strError += "任务名称不能为空！";
        }
        if (customerProperty == '') {
            strError += "请设置自定义属性！";
        }

        if (strError != '') {
            $("#customerPropertyError").show();
            $("#customerPropertyError").html(strError);
            return false;
        }

        var editIds = cellIds.split(',');
        //依次保存节点值
        var j=0;
        for (var i = 0; i < editIds.length; i++) {
        	j=j+1;
            var curId = editIds[i];
            if ($.trim(curId) != "") {
                var curNodeName = nodeTitle + (i > 0 ? "(" + i + ")" : "");

                //增加编辑任务GUID
                var guid = curId;
                if (IsPartEdit()) {
                    var jsonOldData = GetConfigData(cellStyle, curId);
                    if (jsonOldData != '') {
                        var jsonOldObject = JSON.parse(jsonOldData);
                        guid = jsonOldObject.guid;
                        //标记修改节点
                        AddEditNode(guid);
                    }
                }

                //保存数据
                var data = {
                    guid: guid,
                    cellId: curId,
                    cellStyle: cellStyle,
                    nodeName: curNodeName,
                    sendTime: sendTime,
                    sendHour: sendHour,
                    sendMin: sendMin,
                    customerProperty: customerProperty,
                    customerPropertyOption: customerPropertyOption
                };

                var jsonData = JSON.stringify(data);
                
                curNodeName = "<span cid='" + curId + "' class='nodeDateTip'></span>" + curNodeName;
//                if( SaveConfigData(curId, cellStyle, curNodeName, jsonData)){
//                
//             	   return true;
//                }else{
//             	   return false;
//                }
                if( SaveConfigData(curId, cellStyle, curNodeName, jsonData)){
             	   if(j==editIds.length-1||editIds.length==1){
             	   return true;
             	   }
                }else{
             	   if(j==editIds.length-1||editIds.length==1){
             	   return false;
             	   }
                }
            }
        }

//        window.parent.$.colorbox.close();

    } catch (e) {
         DoDesign.alert(e);
    }
}

//属性修改 选择行
function selCustomerSignRow(obj) {
    var tdInputobj = $(obj).parent().parent().find("td:eq(1)");
    var trObj = $(obj).parent().parent();
    if ($(obj).is(":checked")) {
        $(tdInputobj).find("input,select").prop("disabled", true);
        $(trObj).css('background-color', '#8B8682');
        $(tdInputobj).find("input,select").each(function (index, object) {
            if ($(object).is("input")) {
                if ($(object).attr("Type") == "text") {
                    $(object).val("");
                }
                if ($(object).attr("Type") == "radio") {
                    $(object).removeAttr("checked");
                }
                if ($(object).attr("Type") == "checkbox") {
                    $(object).removeAttr("checked");
                }
            }
            else if ($(object).is("select")) {
                $(object).val("");
            }
        });
    }
    else {
        $(tdInputobj).find("input,select").prop("disabled", false);
        $(trObj).css('background-color', '#FFFFFF');
    }
}

//#endregion

//#region 分析

//绑定分析数据
function bindAnalysisNode(jsonData) {
    var nowTick = Date.parse($("#timetoday").val());
    var maxDate = new Date(nowTick + 3 * 24 * 60 * 60 * 1000);
    var date = new Date();

    $("#txtAnalysisNodeName").val("分析");
    $("#txtAnalysisDateMin").val($("#timetoday").val() + " " + date.getHours() + ":" + date.getMinutes());
    $("#txtAnalysisDateMax").val(maxDate.format("yyyy-MM-dd") + " 00:00");
    $("#txtAnalysisRemark").val("");
    $("#hidItems").val("");

    $("#analysisError").hide();

    if ($("#hidActivityType").val() == "2") {
        $(".delayTime").show();
        $(".absoluteTime").hide();
    }
    else {
        $(".delayTime").hide();
        $(".absoluteTime").show();
    }

    //绑定数据  
    if (jsonData != '') {
        var jsonObject = JSON.parse(jsonData);
        $("#txtAnalysisNodeName").val(MarketingDecodeURIComponent(jsonObject.nodeName));
        $("#txtAnalysisDateMin").val(jsonObject.dateMin);
        $("#txtAnalysisDateMax").val(jsonObject.dateMax);
//        if (typeof (jsonObject.effectMinuteMin) != 'undefined') {
//            $("#txtAnalysisMinuteMin").val(ConvertToFloat(jsonObject.effectMinuteMin) / 60);
//        }
//        if (typeof (jsonObject.effectMinuteMax) != 'undefined') {
//            $("#txtAnalysisMinuteMax").val(ConvertToFloat(jsonObject.effectMinuteMax) / 60);
//        }

        if (typeof (jsonObject.remark) != 'undefined') {
            $("#txtAnalysisRemark").val(MarketingDecodeURIComponent(jsonObject.remark));
        }
        
        if (typeof(jsonObject.items) != 'undefined') {
            var regexItems = RegExp("\\&\\[(\\d+)=(.*?)\\]", "gi");
            var r = "";
            while (r = regexItems.exec(jsonObject.items)) {                
                SelectItem(null,r[1], r[2]);
            }
        }
    }
}

//保存分析数据
function SelAnalysisNode() {
    try {
        var cellIds = $("#hidId").val();
        var cellStyle = $("#hidStyle").val();

        var nodeName = $("#txtAnalysisNodeName").val();
        var dateMin = $("#txtAnalysisDateMin").val();
        var dateMax = $("#txtAnalysisDateMax").val();

        var effectMinuteMin = $("#txtAnalysisMinuteMin").val();
        var effectMinuteMax = $("#txtAnalysisMinuteMax").val();
        //分析商品
        var items = $("#hidItems").val();

        var remark = $("#txtAnalysisRemark").val();

        $("#fileNodeError").hide();

        var strError = "";
        //基础校验
        if (nodeName == '') {
            strError += "节点名称不能为空！";
        }
        if (dateMin == '' || dateMax == '') {
            strError += "请设置分析时间段！";
        } else {
            var tickMin = Date.parse(dateMin.replace('-', '/').replace('-', '/'));
            var tickMax = Date.parse(dateMax.replace('-', '/').replace('-', '/'));

            if (tickMin >= tickMax) {
                strError += "分析起始时间应小于结束时间！";
            }
        }
        if (effectMinuteMin == '' || effectMinuteMax == '') {
            strError += "请设置分析时间范围！";
        }
        else {
            if (ConvertToFloat(effectMinuteMin) >= ConvertToFloat(effectMinuteMax)) {
                strError += "请设置分析时间范围错误！";
            }
        }


        if (strError != '') {
            $("#analysisError").show();
            $("#analysisError").html(strError);
            return;
        }

         var editIds = cellIds.split(',');
        //依次保存节点值
         var j=0;
         for (var i = 0; i < editIds.length; i++) {
        	 j=j+1;
             var curId = editIds[i];
             if ($.trim(curId) != "") {
                 var curNodeName = nodeName + (i > 0 ? "(" + i + ")" : "");

                 var guid = curId;
                 if (IsPartEdit()) {
                     var jsonOldData = GetConfigData(cellStyle, curId);
                     if (jsonOldData) {
                         var jsonOldObject = JSON.parse(jsonOldData);
                         guid = jsonOldObject.guid;
                         if (guid.length >= 36) {
                             //修改节点
                             AddEditAnalysisNode(1, curId, guid);
                         } else {
                             //新增节点
                             AddEditAnalysisNode(0, curId, guid);
                         }
                     } else {
                         //新增节点
                         AddEditAnalysisNode(0, curId, guid);
                     }
                 }

                 //保存数据
                 var data = {
                     guid: guid,
                     cellId: curId,
                     cellStyle: cellStyle,
                     nodeName: curNodeName,
                     dateMin: dateMin,
                     dateMax: dateMax,
                     effectMinuteMin: ConvertToFloat(effectMinuteMin) * 60,
                     effectMinuteMax: ConvertToFloat(effectMinuteMax) * 60,
                     items: items,
                     remark: remark
                 };
                 var jsonData = JSON.stringify(data);

                 curNodeName = "<span cid='" + curId + "' class='nodeDateTip'></span>" + curNodeName;

//                 if( SaveConfigData(curId, cellStyle, curNodeName, jsonData)){
//                     
//               	   return true;
//                  }else{
//               	   return false;
//                  }
                 if( SaveConfigData(curId, cellStyle, curNodeName, jsonData)){
              	   if(j==editIds.length-1||editIds.length==1){
              	   return true;
              	   }
                 }else{
              	   if(j==editIds.length-1||editIds.length==1){
              	   return false;
              	   }
                 }
             }
         }

//        window.parent.$.colorbox.close();
    } catch (e) {
         DoDesign.alert(e);
    }
}

//#endregion

//找到当前节点来源
function GetSourceCellsFromParent(cellId) {
    //return $(window.parent.document).contents().find("#ganttframe")[0].contentWindow.GetSourceCells(cellId);
	return  GetSourceCells(cellId);
}

//节点是否允许编辑
function IsCanEditNode(guid) {
   // return $(window.parent.document).contents().find("#ganttframe")[0].contentWindow.IsCanEditNode(guid);
	 //已执行
//	 DoDesign.alert($("#hidProcessedCells").val());
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

//标记修改节点 【营销动作】
function AddEditNode(guid) {
    //$(window.parent.document).contents().find("#ganttframe")[0].contentWindow.AddEditNode(guid);
	 guid = "[" + guid + "]";
	    var editNodeGuids = $("#hidTasksEdit").val();
	    if (editNodeGuids.indexOf(guid) < 0) {
	        $("#hidTasksEdit").val(editNodeGuids + "," + guid);
	    }
}

//标记分析节点 【营销分析】
function AddEditAnalysisNode(type, cellId, guid) {
	 var item = "[" + type + "|" + cellId + "|" + guid + "|0]";
	    var editItems = $("#hidAnalysisEdit").val();
	    if (editItems.indexOf(item) == -1) {
	        $("#hidAnalysisEdit").val(editItems + "," + item);
	    }
}

//获取雁书短信计算规则
function GetYanSmsRule() {
	return GetYanShuSmsRuleValue();
}

//是否允许短信签名
function IsAllowSmsSignatrue() {
   // var isAllow = $(window.parent.document).contents().find("#ganttframe")[0].contentWindow.IsAllowSmsSignatrue();
	var isAllow = IsAllowSmsSignatrue();    
    if (isAllow != null && isAllow != "") {
        if (isAllow) {
            return true;
        }        
    }
    return false;    
}

//节点是否允许编辑 服务器二次验证
function IsCanEditNodeOnServer(guid, showArray, readArray, enableArray) {
    $.ajax({
        url: "/StepMarketing/TaskCanEdit?guid=" + guid,
        type: "post",
        success: function (json) {
            if (json.IsOK) {                
                if (showArray != null) {
                    for (var k = 0; k < showArray.length; k++) {
                        $(showArray[k]).show();
                    }
                }
                if (readArray != null) {
                    for (var j = 0; j < readArray.length; j++) {
                        $(readArray[j]).removeAttr("readonly");
                    }
                }
                if (enableArray != null) {
                    for (var l = 0; l < enableArray.length; l++) {                        
                        if ($(enableArray[l]).attr("id") == "smsTemplateList" || $(enableArray[l]).attr("id") == "emailTemplateList") {                            
                            $(enableArray[l]).select2("readonly", false);
                        } else {
                            $(enableArray[l]).prop("disabled", false);
                        }
                    }
                }
            }
        }
    });
}

//活动部分修改
function IsPartEdit() {
//    return $(window.parent.document).contents().find("#ganttframe")[0].contentWindow.IsPartEdit();
    if ($("#hidCanEdit").val() == "0") {
        return true;
    } else {
        return false;
    }
}

//判断文字是否包含链接
function IsContainUrl(content) {
    var regex = new RegExp("^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$");
    if (!regex.exec(content)) {
        return false;
    } else {
        return true;
    }
}

//判断是否为实数
function ConvertToFloat(data) {
    if ($.trim(data) == "") {
        return 0;
    } else {
        return parseInt((parseFloat(data) * 10)) / 10.0;
    }
}

//保存设置数据
function GetConfigData(cellStyle, cellId) {    
   // return $(window.parent.document).contents().find("#ganttframe")[0].contentWindow.GetCustomValue(cellStyle, cellId);
	GetCustomValue(cellStyle, cellId);
}

//保存设置数据
function SaveConfigData(id, style, value, jsonData) {
    //$(window.parent.document).contents().find("#ganttframe")[0].contentWindow.SetCurrentCellData(id, style, value, jsonData);
	if(SetCurrentCellData(id, style, value, jsonData)){
		return true;
	}else{
		return false;
	}
}

/**
 * [isOpenCheckTime 是否开启时间判定维度]
 * @param {[this]} self    [复选框对象]
 */
function isOpenCheckTime(self) {
    $("#txtReceiveTime,#txtRateTime,#txtRateNum").removeAttr("reg");
    if ($(self).attr("checked") == "checked") {
        $("#IsOpenCheckTimeDesc").hide();
        var smsCheckValue = $("#selSmsOptions").val();
        if (smsCheckValue == "18") { //已确认
            $("#receiveCheckTime").show();
            $("#txtReceiveTime").attr("reg", "^\\d{1,3}$");
        } else if (smsCheckValue == "54") { //已评价
            $("#rateCheckTime").show();
            $("#txtRateTime,#txtRateNum").attr("reg", "^\\d{1,3}$");
        }
    } else {
        $("#IsOpenCheckTimeDesc").show();
        $("#receiveCheckTime").hide();
        $("#rateCheckTime").hide();
    }
}

/**
 * [selSmsOptionsChange 是否开启时间判定唯独]
 * @param {[this]} self    [短信下拉框对象]
 */
function selSmsOptionsChange(self) {
    var smsSelectedValue = $(self).val();
    if (smsSelectedValue == "18" || smsSelectedValue == "54") {
        $("#IsOpenCheckTime").show();
        //$("#IsOpenCheckTime").prop("checked", false);
        isOpenCheckTime($("#IsOpenCheckTime"));
        if ($("#IsOpenCheckTime").attr("checked") == "checked") {
            if (smsSelectedValue == "18") { //已确认
                $("#rateCheckTime").hide();

            } else if (smsSelectedValue == "54") { //已评价
                $("#receiveCheckTime").hide();
            }
        }
    } else {
        $("#IsOpenCheckTime").hide();
        $("#IsOpenCheckTimeDesc").hide();
        $("#rateCheckTime").hide();
        $("#receiveCheckTime").hide();
    }
}

// 选择模板
// @param  {this} sender 当前对象
// @param  {String} templateType 模板类型   sms：短信  email：邮件
// @param  {bool} isCloudTemplate 模板类型   true：云模板  false：用户模板
function SelectTemplate(sender, templateType, isCloudTemplate) {
    var selectId = $(sender).val();
    var selectValue = UrlDecode($(sender).find("option:selected").attr("template"));
    
    //自用模板
    if (!isCloudTemplate) {
        
        if (templateType == "sms")
        {
            $("#TemplateSMS").val(selectValue);            
            $("#hiddenSmsTemplateId").val(selectId);
            totalMsgNum($("#TemplateSMS"));
        }
        if (templateType == "email")
        {
        	//editorHead.html(selectValue);    //change
        	editorHead.setContent(selectValue);//hyf
//        	editorHead.setContent(selectValue, false);
            $("#hiddenEmailTemplateId").val(selectId);
        }

        if (typeof (selectId) != 'undefined' && $.trim(selectId) != "")
        {
            $("#delTemplateTag").show();
            $("#updateTemplateTag").show();
        }
        else
        {
            $("#delTemplateTag").hide();
            $("#updateTemplateTag").hide();
        }
    }
}

// 删除模板
// @param  {String} templateType 模板类型   sms：短信  email：邮件
function DeleteTemplate2(templateType)
{
    var templateId = "";
    if (templateType == "sms") {
        templateId = $("#hiddenSmsTemplateId").val();
    }
    if (templateType == "email") {
        templateId = $("#hiddenEmailTemplateId").val();
    }
    if (templateId != "") {
   	  saogaUI.ui.dialog.confirm({
				title:"提示",
				text:"您确定要删除吗?",
				ok:function(){
					DoDesign.showCommonLoading();
		            var data = { id: templateId };
		            $.ajax({
		                url: root+'/apps/marketing/deleteTemplate.do',
		                data: data,
		                type: "post",
		                success: function (res)
		                {
		                  var json = res.result;
		                    DoDesign.hideCommonLoading();
		                    console.log(json);
		                    if (json.isOK)
		                    {
		                        if (templateType == "sms")
		                        {
		                            //清空被删除模板,并清空选择内容
		                           // $("#smsTemplateList").find("option:selected").remove();
		                           // $("#smsTemplateList").select2("val", "");
		                            $("#TemplateSMS").val("");
		                        }
		                        if (templateType == "email")
		                        {
		                            //清空被删除模板,并清空选择内容
		                            //$("#emailTemplateList").find("option:selected").remove();
		                           // $("#emailTemplateList").select2("val", "");
		                        	
		                          // editorHead.html("");
		                           editorHead.setContent("");//hyf
		                        }
		                        //隐藏更新,删除按钮
		                        $("#delTemplateTag").hide();
		                        $("#updateTemplateTag").hide();
		                         reloadTemplate(templateType);
		                    }
		                    else
		                    {
		                         DoDesign.alert(json.description);
		                    }
		                },
		                error: function (e2)
		                {
		                    DoDesign.hideCommonLoading();
		                     DoDesign.alert(e2);
		                }
		            });
						},
				on:function(){
					return false;
				}
			});
    }
}

// 更新模板
// @param  {String} templateType 模板类型   sms：短信  email：邮件
function UpdateTemplate(templateType)
{
    var templateId = "";
    var templateContent = "";
    if (templateType == "sms") {
        templateId = $("#hiddenSmsTemplateId").val();
        //templateContent = editorHead.html();
        templateContent = $("#TemplateSMS").val();
    }
    if (templateType == "email") {
        templateId = $("#hiddenEmailTemplateId").val();
        //templateContent = emailEditor.getContent();
         //templateContent = editorHead.html(); 
         templateContent = editorHead.getContent();//hyf
    }
    if (templateId != "") {        
         DoDesign.showCommonLoading();
        var data = { templateId: templateId, templateContent: encodeURIComponent(templateContent) };
        $.ajax({
            url:root+'/apps/marketing/updateTemplate.do',
            data: data,
            type: "post",
            success: function (res) {
        		var json = res.result;	
                DoDesign.hideCommonLoading();
                if (json.isOK) {                    
                    //更新修改内容
                    var obj,
                        index ;
                    if (templateType == "sms") {                        
                        //$("#smsTemplateList").find("option:selected").attr("template", templateContent);
                        obj =  $("#smsTemplateList");
                    }
                    if (templateType == "email") {                                                
                       // $("#emailTemplateList").find("option:selected").attr("template", templateContent);
                        obj =   $("#emailTemplateList");
                    }
                    
                     index = obj.find("option:selected").index("option");
                     reloadTemplate(templateType);
                     obj.find("option").eq(index).attr("selected",true)
                }
                else {
                     DoDesign.alert(json.description);
                }
            },
            error: function (e2) {
                DoDesign.hideCommonLoading();
               DoDesign.alert("提示","保存失败",120,50);
            }
        });        
    }
}

// 另存为模板
// @param  {String} templateType 模板类型   sms：短信  email：邮件
function ShowSaveAsTemplate(templateType)
{
    $("#saveTemplateTag").hide();    
    $("#saveTemlateMain").css("display", "inline");
    $("#newTemlateName").val("");
}

// 新增模板
// @param  {String} templateType 模板类型   sms：短信  email：邮件
function AddTempate(templateType) {
    var templateName = $.trim($("#newTemlateName").val());
    var templateContent = "";
    if (templateType == "sms") {    
        templateContent = $("#TemplateSMS").val();
    }
    if (templateType == "email") {        
        //templateContent = emailEditor.getContent();
         //templateContent = editorHead.html(); 
         templateContent = editorHead.getContent();//hyf
    }
    if (templateName == "") {
         DoDesign.alert('请输入模板名称！');
        return;
    }
    if (templateContent == "") {
         DoDesign.alert('请输入模板内容！');
        return;
    }

    DoDesign.showCommonLoading();
    var data = { templateType: templateType, templateName: encodeURIComponent(templateName), templateContent: encodeURIComponent(templateContent) };
    $.ajax({
        url: root+'/apps/marketing/addTemplate.do',
        data: data,
        type: "post",
        success: function (res) {
            var json = res.result;
            console.log(json);
            DoDesign.hideCommonLoading();
            if (json.isOK) {
                var newTempateOption = $("<option></option>").text(templateName).attr("template", templateContent).attr("value", json.ReturnID);
                
                //新增模板节点
                if (templateType == "sms") {
                    $("#smsTemplateList optgroup[label='自用模板']").prepend(newTempateOption);
                }
                if (templateType == "email") {                                        
                    $("#emailTemplateList optgroup[label='自用模板']").prepend(newTempateOption);
                }
                reloadTemplate(templateType);
                //取消模板新增
                CancelTemlate();
            }
            else {
                 DoDesign.alert(json.description);
            }
        },
        error: function (e2) {
            DoDesign.hideCommonLoading();
             DoDesign.alert(e2);
        }
    });
}

//重新加载模板列表
function reloadTemplate(templateType)
{
	var data = { templateType: templateType };
	
	$.ajax({
        url: root+'/apps/marketing/reloadTemplate.do',
        data: data,
        type: "post",
         async:false,
        success: function (res) {
            var data = res.result;
            var obj = null;
            
            if (templateType == "sms") 
            {   
	  		   obj = $("#smsTemplateList");
   			}
		    if (templateType == "email") 
		    { 
		  	   obj = $("#emailTemplateList");        
		    }
		    obj.empty();
		    var _option = $("<option>").text("请选择").val("");
		   		obj.append(_option);
		   		
            for(var i=0;i<data.length;i++) 
            {
			    var option = $("<option>").text(data[i].templateTitle).val(data[i].id);
			   		option.attr("template",data[i].template);
			   		
			    obj.append(option);
			}
        },
        error: function (e2) {
             DoDesign.alert(e2);
        }
    });
	
}
// 取消模板新增
function CancelTemlate() {
    $("#saveTemplateTag").show();  
    $("#saveTemlateMain").hide();
}

//验证手机号
function IsMobile(mobile) {
    var reg = new RegExp("^(13|15|14|18)[0-9]{9}$");
    if (!reg.test(mobile)) {        
        return false;
    } else {
        return true;
    }
}

//解码数据
function MarketingDecodeURIComponent(content) {
    try {
        return decodeURIComponent(content);  
    } catch(e) {
        return content;
    }
}

//只能输入数字和小数点
function InputOnlyRealNumber(sender,minNumber,maxNumber) {    
    $(sender).attr("o_value", "0");    
    $(sender).bind("keyup", function () {        
        if (isNaN(this.value))
        {
            this.value = $(this).attr("o_value");
        }
        else
        {
            $(this).attr("o_value", this.value);          
        }
    });
    $(sender).bind("afterpaste", function ()
    {
        if (isNaN(this.value))
        {
            this.value = $(this).attr("o_value");
        }
        else
        {
            $(this).attr("o_value", this.value);
        }
    });
    
    $(sender).bind("blur", function () {
        if (isNaN(this.value)) {
            this.value = $(this).attr("o_value");
        }
        else
        {
            var fvalue = parseFloat(this.value);
            if (fvalue < minNumber && fvalue != 0)
            {
                this.value = minNumber;
            }
            if (fvalue > maxNumber)
            {
                this.value = maxNumber;
            }
            
            $(this).attr("o_value", this.value);
        }
    });
}

//------------------新增加方法----
//外部调用验证
function CallValidate(validatePartID) {
    var result = true;
    var validatePart = $("#" + validatePartID);
    if (validatePart != null) {
        validatePart.find("[reg],[url]:not([reg])").each(function (i, item) {
            item = $(item);
            if (item.attr("reg") == undefined) {
                if (!ajax_validate(item)) {
                    result = false;
                }
            } else {
                if (!validate(item)) {
                    result = false;
                }
            }
        });
        if (typeof (isExtendsValidate) != "undefined") {
            if (result && isExtendsValidate) {
                return extendsValidate();
            }
        }
    }
    else {
        result = false;
    }
    return result;
}

function Alert(str){
	alert(str);
}


