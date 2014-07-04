/*
通用脚本
*/

Array.prototype.contain = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return true;
    }
    return false;
};
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

Date.prototype.DateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
    case 's':
        return new Date(Date.parse(dtTmp) + (1000 * Number));
    case 'n':
        return new Date(Date.parse(dtTmp) + (60000 * Number));
    case 'h':
        return new Date(Date.parse(dtTmp) + (3600000 * Number));
    case 'd':
        return new Date(Date.parse(dtTmp) + (86400000 * Number));
    case 'w':
        return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
    case 'q':
        return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'm':
        return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'y':
        return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
};
/**
 * 生成GUID
 * @return {[type]} [description]
 */
function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}
/**
 * 检测字符中是否包含UN-ASCII码
 * @return {bool} false:不包含，true:包含
 */
function isContailUNASCII() {
    var isSuccess = false;
    $(":text,textarea").each(function (index, domEle) {
        var currentValue = $(domEle).val();
        if (currentValue == "" || currentValue == null)
            return true;
        var currentChar = "";
        for (var i = 0; i < currentValue.length; i++) {
            currentChar = currentValue[i].charCodeAt();//字符转ASCII码
            if ((currentChar == 0x9) || (currentChar == 0xA) || (currentChar == 0xD)
                || ((currentChar >= 0x20) && (currentChar <= 0xD7FF))
                || ((currentChar >= 0xE000) && (currentChar <= 0xFFFD))
                || ((currentChar >= 0x10000) && (currentChar <= 0x10FFFF))) {
                continue;
            }
            isSuccess = true;
            $(domEle).focus();
            return isSuccess;
        }
        isSuccess = false;
    });
    return isSuccess;
}

//URL编码
function UrlEncode(sStr) {
    return encodeURIComponent(sStr);
}


function UrlDecode(str) {
    if (str == null || str == undefined || str == NaN) {
        return "";
    }
    var ret = "";
    for (var i = 0; i < str.length; i++) {
        var chr = str.charAt(i);
        if (chr == "+") {
            ret += " ";
        } else {
            ret += chr;
        }
    }
    return decodeURIComponent(ret);
}
//解码html
function htmlDecode(str) {
    if (str == null || str == undefined || str == NaN) {
        return "";
    }
    var s = "";
    if (str != undefined) {
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
    }
    return s;
}
//编码html
function htmlEncode(str) {
    if (str == null || str == undefined || str == NaN) {
        return "";
    }
    var s = "";
    if (str != undefined) {
        if (str.length == 0) return "";
        s = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, "&quot;");
    }
    return s;
}

//弹出简单信息提示
function Alert(msg) {
    $.colorbox({ title: "提示信息", inline: true, href: "#kdAlert", overlayClose: false, transition: "none",
        callback: function () {
            $("#kdAlert #kdcontents").html(msg);
        }
    });
}
//弹出确认框
function Confirm(msg, callback) {
    $.colorbox({ title: "确认操作", inline: true, href: "#kdConfirm", overlayClose: false, transition: "none",
        callback: function () {
            $("#confirmContentContainer").html(msg);
            $("#kdConfirm .kdContent").removeClass("Confirm").removeClass("Alert").removeClass("Loading").addClass("Confirm");
            $("#kdConfirm #btnConfirm").unbind("click").click(function () {
                if ($.isFunction(callback)) {
                    callback();
                } else {
                    alert("回调的不是函数！");
                }
                $.colorbox.close();
            }).show();
            $("#kdConfirm #btnConfirmCancel").unbind("click").click(function () {
            }).show();
        }
    });
}

//弹出数据导出提示框
function AlertExportSuccess(msg, link, linktext) {
    if (msg == null || msg == "undefined") {
        msg = "";
    }
    if (link == null || link == "undefined") {
        link = "";
    }
    if (linktext == null || linktext == "undefined") {
        linktext = "";
    }
    $.colorbox({
        href: "/Dialog/Common/ExportSuccess?context=" + encodeURIComponent(msg) + "&link=" + encodeURIComponent(link) + "&linktext=" + encodeURIComponent(linktext) + "&r=" + Math.random(),
        iframe: false,
        title: "提示信息",
        scrolling: false
    });
}

///保存成功
function AlertSuccess(msg) {
    $.colorbox({ title: "提示信息", inline: true, href: "#kdAlert", overlayClose: false, transition: "none",
        callback: function () {
            $("#kdAlert #kdcontents").html(msg);
        }
    });
    setTimeout("$.colorbox.close();", 1000);
}

//其他各个需要载入的调用的方法，无abort功能
function LoadAJAX(url, elementId, loadFunction) {
    if (url.indexOf('?') > -1) {
        url += "&";
    }
    else {
        url += "?";
    }
    url += "random=" + Math.random();
    $("#" + elementId).load(url, function () { loadFunction(); });
}


//异步AJAX
function ajaxDone(url, data, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        success: callback
    });
}

//同步AJAX
function ajaxDoneNoAsync(url, data, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        async: false,
        success: callback
    });
}

//记录下请求对象，如果请求的时候该对象不为null，则把对象abort()
var tempxhr = null;
function ajaxDoneWithAbort(url, data, callback) {
    if (url.indexOf('?') > -1) {
        url += "&random=" + Math.random();
    }
    else {
        url += "?random=" + Math.random();
    }
    if (tempxhr != null)
        tempxhr.abort();
    tempxhr = $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        success: callback
    });
}

//取对象的属性
function getObjAtt(Obj) {
    var sumTop = 0, sumLeft = 0;
    var sumHeight = 0, sumWidth = 0;
    sumHeight = Obj.clientHeight;
    sumWidth = Obj.clientWidth;
    sumTop = Obj.getBoundingClientRect().top + document.body.scrollTop;
    sumLeft = Obj.getBoundingClientRect().left;
    return { left: sumLeft, top: sumTop, width: sumWidth, height: sumHeight }
}
//半角转全角 SBC-全角，DBC-半角
function getSBCFromDBC(str) {
    var i;
    var result = '';
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i); // “65281”是“！”，“65373”是“｝”
        if (code >= 65281 && code < 65373)//  “65248”是转换码距
            result += String.fromCharCode(str.charCodeAt(i) - 65248);
        else
            result += str.charAt(i);
    }
    return result;
}
// *** 保存Cookies ***
function writeCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + (86400 * 1000 * 30));
    document.cookie = name + "=" + value + "; expires=" + exp.toGMTString() + "; path=/";
}
// *** 读取Cookies ***
function readCookie(name) {
    var search, rval;
    search = name + "=";
    offset = document.cookie.indexOf(search);
    if (offset != -1) {
        offset += search.length;
        end = document.cookie.indexOf(";", offset);
        if (end == -1) {
            end = document.cookie.length;
        }
        rval = document.cookie.substring(offset, end);
    }
    //if (rval=="" || isNaN(rval)) rval = 0;
    return rval;
}

//取得字符串的参数值.
function getParameter(strHref, strName) {
    //取得指定的参数,若未找到.返回空字符.
    try {
        if (strHref == "") return "";
        var arrTmp1 = strHref.split("&");
        var arrTmp2 = new Array();
        for (i = 0; i < arrTmp1.length; i++) {
            arrTmp2 = arrTmp1[i].split("=");
            if (arrTmp2[0].toLowerCase() == strName.toLowerCase())
                return arrTmp2[1];
        }
        return "";
    }
    catch (e) {
        return "";
    }
}

//比较日期大小
function CompareDate(date1, date2) {
    var re = /^(\d{1,4})\-(\d{1,2})\-(\d{1,2})$/;
    re.exec(date1);
    var val1 = RegExp.$1 * 10000 + RegExp.$2 * 100 + RegExp.$3;
    re.exec(date2);
    var val2 = RegExp.$1 * 10000 + RegExp.$2 * 100 + RegExp.$3;
    if (val1 - val2 > 0)
        return true;
    else
        return false;
}
//比较时间大小
function CompareTime(time1, time2) {
    var re = /^(\d{1,4})\-(\d{1,2})\-(\d{1,2})\ (\d{1,2})\:(\d{1,2})\:(\d{1,2})$/;
    re.exec(time1);
    var val1 = RegExp.$1 * 24 * 60 * 60 * 31 * 12 + RegExp.$2 * 24 * 60 * 60 * 31 + RegExp.$3 * 24 * 60 * 60 + RegExp.$4 * 60 * 60 + RegExp.$5 * 60 + RegExp.$6;
    re.exec(time2);
    var val2 = RegExp.$1 * 24 * 60 * 60 * 31 * 12 + RegExp.$2 * 24 * 60 * 60 * 31 + RegExp.$3 * 24 * 60 * 60 + RegExp.$4 * 60 * 60 + RegExp.$5 * 60 + RegExp.$6;
    if (val1 - val2 > 0)
        return true;
    else
        return false;
}

//全选函数
var oldBgComm = new Array();
var oldBg = new Array();
var setTrCount = 0;
function setOldBg(obj, oldbgColorParam) {
    var _tempid = $(obj).attr("id");
    if (_tempid == null || _tempid == "" || _tempid == undefined) {
        _tempid = "tempid_" + setTrCount;
        setTrCount = setTrCount + 1;
        $(obj).attr("id", _tempid);
        var _oldbgColor;
        if (oldbgColorParam == undefined || oldbgColorParam == null) {
            _oldbgColor = $(obj).css("backgroundColor");
        } else {
            _oldbgColor = oldbgColorParam;
        }
        if (_oldbgColor == "transparent" || _oldbgColor == "#ffffff" || _oldbgColor == "#fff") {
            oldBg[_tempid] = "#ffffff";
        }
        else {
            oldBg[_tempid] = "#F4F9FF";
        }
    }
    else {
        if (oldBg[_tempid] == null || oldBg[_tempid] == "" || oldBg[_tempid] == undefined) {
            oldBg[_tempid] = oldbgColorParam;
        }
    }
}
function sel_all() {
    chks = document.getElementsByName("ids");
    if (chks) {
        var isChecked = document.getElementById("select_all").checked;
        if (oldBgComm.length == 0) {
            for (i = 0; i < chks.length; i++) {
                var _parent = $(chks[i]).parent().parent();
                setOldBg(_parent);
                var oldbgColor = $(chks[i]).parent().parent().css("backgroundColor");

                if (oldbgColor == "transparent" || oldbgColor == "#ffffff" || oldbgColor == "#fff") {
                    oldBgComm[i] = "#ffffff";
                }
                else {
                    oldBgComm[i] = "#F4F9FF";
                }
            }
        }
        //知识库的全选不需要改变背景
        var obj = document.getElementById("select_all");
        var objSourceType = $(obj).attr("lang");
        for (i = 0; i < chks.length; i++) {
            if (isChecked && objSourceType != "knowledge") {
                $(chks[i]).parent().parent();
            } else {
                $(chks[i]).parent().parent();
            }
            chks[i].checked = document.getElementById("select_all").checked;
        }
    }
}

//全选/取消
function sel_order_all() {
    var chks = document.getElementsByName("order_ids");
    if (chks) {
        for (i = 0; i < chks.length; i++) {
            chks[i].checked = document.getElementById("select_all").checked;
        }
    }
}

//分页跳转函数
function goto_page(url) {
    var pagenum = parseInt($('#gotoPage').val());
    if (pagenum > 0) {
        var pageTotalCount = parseInt($(".left div:last").html().replace("页", "").replace("共", ""));
        pagenum = pagenum > pageTotalCount ? pageTotalCount : pagenum;
        window.location = url.replace('###', pagenum - 1);
    } else {
        window.location = url.replace('###', 0);
    }
}

// 自动带入ip
function ipBind(ipstart, ipend) {
    var elem_start = document.getElementById(ipstart);
    var elem_end = document.getElementById(ipend);
    if (elem_start && elem_end) {
        elem_start.onblur = function () {
            // 当输入起始ip不为空且终止ip为空，终止ip自动带入
            if (elem_start.value && !elem_end.value)
                elem_end.value = elem_start.value;
        };
    }
}

//字符串转换为时间
function stringToDateTime(dateChar) {
    var date = dateChar.replace('-', '/').replace('-', '/');
    var newDate = new Date(date);
    return newDate;
}

//日期格式化
Date.prototype.format = function (format) //author: meizz
{
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

//获取焦点后，将焦点移动到最后
function setCursorPos(obj) {
    var txtRange = obj.createTextRange();
    txtRange.moveStart("character", obj.value.length);
    txtRange.moveEnd("character", 0);
    txtRange.select();
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

function GetStringLen(str,isContainHoldPlace, isbyte) {
    ///<summary>返回字符串长度</summary>
    ///<param name="str">要计算的字符串</param>
    ///<param name="isContainHoldPlace">是否包含占位符</param>
    ///<param name="isbyte">是否按字节计算(true:是，false:否)</param>
    ///<returns>返回字符串的长度</returns>
    if (str == undefined || str == "") {
        return 0;
    }
    if (isContainHoldPlace) {
        str = ReplacePlaceholder(isContainHoldPlace, str);
    }
    if (isbyte){
        return str.replace(/[^\x00-\xff]/g, "**").length;
    }
    else{
        return str.length;
    }
}


//#region CRM系统占位符默认字数替换
function ReplacePlaceholder(isReplace, content) {
    if (isReplace) {
        var replaceContent = content.replace(/{Name}/g, "qqq")   //客户姓名,预设字数3
            .replace(/{TradeId}/g, "qqqqqqqqqqqqqqq")    //订单编号,预设字数15
            .replace(/{Nick}/g, "qqqqqqqq")   //客户昵称,预设字数8
            .replace(/{ItemNum/g, "q")      //商品购买数量,预设字数1   
            .replace(/{Payment}/g, "qqqqq")  //付款金额,预设字数5   
            .replace(/{PostFee}/g, "qqq")    //邮费,预设字数3   
            .replace(/{Created}/g, "qqqqqqqqqqqqqqqqqqq")    //订单成交时间,预设字数19     
            .replace(/{PayTime}/g, "qqqqqqqqqqqqqqqqqqq")    //付款时间,预设字数19
            .replace(/{ConsignTime}/g, "qqqqqqqqqqqqqqqqqqq")    //卖家发货时间,预设字数19
            .replace(/{EndTime}/g, "qqqqqqqqqqqqqqqqqqq")        //交易成功时间,预设字数19
            .replace(/{BuyerAlipayNo}/g, "qqqqqqqqqqq")  //买家支付宝账号,预设字数11
            .replace(/{Phone}/g, "qqqqqqqqqqq")      //手机号,预设字数11
            .replace(/{Email}/g, "qqqqqqqqqqqqqqqqqq")   //邮箱,预设字数18
            .replace(/{ReceiverName}/g, "qqq")   //客户姓名,预设字数3
            .replace(/{MemberGrade}/g, "qqqq")   //会员等级,预设字数4
            .replace(/{CompanyName}/g, "qqqq")   //物流公司,预设字数4
            .replace(/{OutSid}/g, "qqqqqqqqqqqqq")   //运单号,预设字数13
            .replace(/{LogisticTrack}/g, "qqqqqqqqqqqqqqqqqqqqqqqqq")    //物流查询,预设字数25
            .replace(/{LocalTime}/g, "qqqqqqqqqqqqqqqqqqq")  //到达时间,预设字数19
            .replace(/{LocalCity}/g, "qqq")  //到达城市,预设字数3
            .replace(/{ReceiveTime}/g, "qqqqqqqqqqqqqqqqqqq")   //签收时间,预设字数19
            .replace(/{RefundFee}/g, "qqqqq")  //退款金额,预设字数5  
            .replace(/{RefundTime}/g, "qqqqqqqqqqqqqqqqqqq")    //退款时间,预设字数19
            .replace(/{NewGrade}/g, "qqqq")      //新会员等级,预设字数4
            .replace(/{OldGrade}/g, "qqqq")      //老会员等级,预设字数4
            .replace(/{UpgradeTime}/g, "qqqqqqqqqqqqqqqqqqq")   //升级时间,预设字数19
            .replace(/{IntegralNum}/g, "qqq")   //积分赠额,预设字数3
            .replace(/{QuestionnaireName}/g, "qqqqqqqqqq")   //问卷名称,预设字数10
            .replace(/{EleCode}/g, "qqqqqqqqq");   //电子优惠码,预设字数9
        
        return replaceContent;
    }
    return content;
}

//#endregion


//计算短信长度
function CalculateSmsNum(src, e, isContainHoldPlace, isbyte, smsSignature) {
    ///<summary>计算短信长度</summary>
    ///<param name="src">验证控件对象</param>
    ///<param name="e">接收提醒信息对象ID名称</param>
    ///<param name="isContainHoldPlace">是否包含占位符（true:包含，false:不包含）</param>
    ///<param name="isbyte">是否双字节</param>
    ///<param name="smsSignature">装载短信签字对象ID名称</param>
    ///<returns></returns>
    var desc = GetSmsLenDesc($(src).val(), $.trim($("#" + smsSignature).html()), isContainHoldPlace, isbyte);
    $("#" + e).html(desc).show();
}


function GetSmsLenDesc(content, smsSignature, isContainHoldPlace, isbyte) {
    ///<summary>生成短信长度描述</summary>
    ///<param name="content">短信内容</param>
    ///<param name="smsSignature">短信签名</param>
    ///<param name="isContainHoldPlace">是否包含占位符（true:包含，false:不包含）</param>
    ///<param name="isbyte">是否双字节</param>
    ///<returns></returns>
    var signLen = 0;
    var strlen = 0;
    if (smsSignature != undefined && smsSignature != null && smsSignature != "") {
        signLen = GetStringLen($.trim(smsSignature), isbyte);
    }
    if (content != undefined && content != null && content != "") {
        strlen = GetStringLen($.trim(content), isbyte);
    }
    var totalCount = strlen + signLen;
    var smsCount = 1;
    var desc = "";
    var fontColor = "green";
    if (totalCount > 70) {
        smsCount = Math.ceil(totalCount / 67);
        fontColor = "red";
    }
    desc = "已输入：<labl style='color:" + fontColor + ";font-weight:bold;display:inline-block;'>&nbsp;" + totalCount + "&nbsp;</labl>个字(含签名)，将分割成<labl style='color:" + fontColor + ";font-weight:bold;display:inline-block;'>&nbsp;" + smsCount + "&nbsp;</labl>条发出。</br>拆分规则：超过70个字将视为长短信，按67个字/条计费。";
    if (isContainHoldPlace) {
        desc += "<br/>含有占位符的短信字数统计有误差，请谨慎输入!";
    }
    return desc;
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

//多行文本计算内容长度
function CalculateWordCount(src, e, length) {
    ///<summary>多行文本计算内容长度</summary>
    ///<param name="src">验证控件对象</param>
    ///<param name="e">接收提醒信息对象ID名称</param>
    ///<param name="length">验证控件最大输入长度</param>
    ///<returns></returns>
    var strlen = GetStringLen($(src).val(), true);
    if (strlen == 0) {
        $('#' + e).hide();
    }
    else {
        var text = "";
        if (length > 0) {
            text = "你已输入" + strlen + "个字符，最多只能输" + length + "个字符";
        }
        else {
            text = "你已输入" + strlen + "个字符。";
        }
        $('#' + e).html(text);
        $('#' + e).show();
    }
}


function RepalceSmsPlaceHold(tempTemplate, typeName) {
    var template = "";
    switch (typeName) {
        case "UrgeTemp":
            template = tempTemplate.replace("{$Name$}", "{ReceiverName}").replace("{$TradeID$}", "{TradeId}")
                .replace("{$TradeCreatedTime$}", "{Created}").replace("{$Nick$}", "{Nick}")
                .replace("{$客户姓名$}", "{ReceiverName}").replace("{$交易编号$}", "{TradeId}")
                .replace("{$下单时间$}", "{Created}").replace("{$客户昵称$}", "{Nick}");
            break;
        case "ReceiveTemp":
            template = tempTemplate.replace("{$Name$}", "{Name}").replace("{$TradeID$}", "{TradeId}")
                .replace("{$TradeCreatedTime$}", "{Created}").replace("{$Nick$}", "{Nick}")
                .replace("{$客户姓名$}", "{Name}").replace("{$交易编号$}", "{TradeId}")
                .replace("{$下单时间$}", "{Created}").replace("{$客户昵称$}", "{Nick}")
                .replace("{$发货时间$}", "{ConsignTime}").replace("{$物流公司$}", "{CompanyName}")
                .replace("{$运单号$}", "{OutSid}").replace("{$物流查询$}", "{LogisticTrack}");

            break;
        default:
            break;
    }
    return template;
}

//更多筛选条件
function getDetailCondition(sender, moreConditionHtmlID) {
    var type = $(sender).attr('type');
    if (type == 'up') {
        $('#' + moreConditionHtmlID).show();
        $(sender).removeClass();
        $(sender).addClass("simplesearch");
        $(sender).attr('type', 'down');
    }
    else if (type == 'down') {
        $('#' + moreConditionHtmlID).hide();
        $(sender).attr('type', 'up');
        $(sender).removeClass();
        $(sender).addClass("moresearch");
    }
    setTimeout("ResetContentBoxWidth()", 0);
}

function formatDate(date) {
    if (date == undefined) {
        return null;
    }
    date = date.substr(1, date.length - 2);
    var obj = eval('(' + "{Date: new " + date + "}" + ')');
    var dateValue = obj["Date"];
    return dateValue;
}

Date.prototype.format = function (format) {
    /*
    * eg:format="YYYY-MM-dd HH:mm:ss";
    */
    var o = {
        "M+": this.getMonth() + 1,  //month
        "d+": this.getDate(),     //day
        "H+": this.getHours(),    //hour
        "m+": this.getMinutes(),  //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
};
Date.prototype.addDays = function (d) {
    this.setDate(this.getDate() + d);
};
Date.prototype.addWeeks = function (w) {
    this.addDays(w * 7);
};
Date.prototype.addMonths = function (m) {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d) this.setDate(0);
};
Date.prototype.addYears = function (y) {
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);
    if (m < this.getMonth()) {
        this.setDate(0);
    }
};

//插入内容 包括焦点位置，替换选中文本等
(function ($) {
    $.fn.insert = function (_m) {
        var _o = $(this).get(0);
        if ($.browser.msie) {
            _o.focus();
            sel = document.selection.createRange();
            sel.text = _m;
            sel.select();
        } else if (_o.selectionStart || _o.selectionStart == '0') {
            var startPos = _o.selectionStart;
            var endPos = _o.selectionEnd;
            var restoreTop = _o.scrollTop;
            _o.value = _o.value.substring(0, startPos) + _m + _o.value.substring(endPos, _o.value.length);
            if (restoreTop > 0) {
                _o.scrollTop = restoreTop;
            }
            _o.focus();
            _o.selectionStart = startPos + _m.length;
            _o.selectionEnd = startPos + _m.length;
        }
    };
})(jQuery);

//查看模块说明
function ShowModuleDesc(type) {
    $.colorbox({ href: "/Dialog/Common/ModuleDesc?Type=" + type + "&random=" + Math.random(), iframe: false, title: "模块说明", width: 500, height: 450, scrolling: false });
}

//生成交易来源描述
function GenerateTradeFromDesc(tradeFrom) {
    if (tradeFrom == null || tradeFrom == "") {
        return "未知";
    }
    tradeFrom = tradeFrom.toUpperCase();
    var arr = tradeFrom.split(',');
    var items = [];
    for (var i = 0; i < arr.length; i++) {
        var flag = true;
        for (var j = 0; j < items.length; i++) {
            if (items[j] == arr[i]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            items.push(arr[i]);
        }
    }
    var result = "";
    for (var i = items.length - 1; i >= 0; i--) {
        switch (items[i]) {
            case "WAP":
                result += " 手机 ";
                break;
            case "HITAO":
                result += " 嗨淘 ";
                break;
            case "TOP":
                result += " TOP平台 ";
                break;
            case "TAOBAO":
                //result += " 普通淘宝 ";
                result += "";
                break;
            case "JHS":
                result += " 聚划算 ";
                break;
        }
    }
    return result;
}

//#region 只能输入数字或数字后面只能带一个"."号
(function ($) {
    $.fn.inputOnlyNum = function () {
        this.keypress(function (e) {
            if (e.which == 8 || e.keyCode == 9) return true; //Backspace & Tab in ff
            var b = /^[\d\.-]$/.test(String.fromCharCode(e.which));
            if (b) {
                window.setTimeout(function () {
                    if (isNaN($(e.target).val()) && $(e.target).val() != '-') { $(e.target).val(''); }
                }, 10);
            }
            return b;
        }).bind("paste", function () { return !isNaN(clipboardData.getData('text')); })
               .bind("dragenter", function () { return false; }).css("ime-mode", "disabled");
    };

})(jQuery);
//endregion

//只能输入数字或数字
(function ($) {
    $.fn.inputOnlyPositiveNum = function () {
        this.keypress(function (e) {
            if (e.which == 8 || e.keyCode == 9) return true; //Backspace & Tab in ff
            var b = /^[\d]$/.test(String.fromCharCode(e.which));
            if (b) {
                window.setTimeout(function () {
                    if (isNaN($(e.target).val()) && $(e.target).val() != '-') { $(e.target).val(''); }
                }, 10);
            }
            return b;
        }).bind("paste", function () { return !isNaN(clipboardData.getData('text')); })
               .bind("dragenter", function () { return false; }).css("ime-mode", "disabled");
    };
})(jQuery);

//最大输入N个字符
(function ($) {
    $.fn.inputMaxCharfive = function (maxLength) {
        this.keypress(function (e) {
            if (e.which == 8 || e.keyCode == 9) return true;
            var v = $(this).val();
            if (v.length >= maxLength) {
                return false;
            }
        });
    };
})(jQuery);

//过滤特殊字符
function FilterSpecialChar(str,msgName)
{
    var msg="";
    if (str.indexOf("\\") > -1 ||str.indexOf("\/") > -1 ||str.indexOf("?") > -1 ||str.indexOf("*") > -1 ||
        str.indexOf("<") > -1 ||str.indexOf(">") > -1 ||str.indexOf("|") > -1 ||str.indexOf("[") > -1 ||str.indexOf("]") > -1){
            msg=msgName+"不能包含下列任一字符: \ / ? * < > | [ ]";
       }
    return msg;
}
//var enterSubmit = {
//    //键盘回车搜索
//    search: function (callBack) {
//        $(document).keyup(function () {
//            var e = e || event,
//                keycode = e.which || e.keyCode;
//            if (keycode == 13) {
//                callBack();
//            }
//        });
//    }
//};

var enterSubmit = {
    //键盘回车搜索
    //callBack:函数方法名
    search: function (callBack) {
        $(document).keyup(function(e) {
            var e = e || event,
                keycode = e.which || e.keyCode;
            if (keycode == 13) {
                callBack();
            }
        });
    },
    //selectorName：ID选择器名称
    submit: function (selectorName, isEnterSubmit) {
        $(document).keyup(function (e) {
            var e = e || event,
            keycode = e.which || e.keyCode;
            if (keycode == 13) {
                $("#" + selectorName + "").submit();
            }
        });
    },
    //取消回车搜索
    cancel: function() {
        $(document).unbind("keyup");
    }
};