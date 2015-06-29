/*TMODJS:{"version":3,"md5":"8e427274d559415f73068fa06ec1a725"}*/
template('tpl',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,flight=$data.flight,$each=$utils.$each,msg=$data.msg,obj=$data.obj,i=$data.i,$escape=$utils.$escape,stock=$data.stock,$out='';$out+='<div class="m_t20"> ';
if(flight){
$out+=' <table class="form_table"> <tr> <th><span class="label">ʱ�䣺</span></th> <td> ';
$each(msg,function(obj,i){
$out+=' ';
if(i == flight[0].flight_id){
$out+=' <span class="label J_stock_time">';
$out+=$escape(obj.departure_date);
$out+='</label> ';
}
$out+=' ';
});
$out+=' </td> </tr> <tr> <th><span class="label">���棺</span></th> <td><label class="input_text w200"><input type="text" name="" id="J_stock_total_num" value="';
$out+=$escape(stock);
$out+='" /></label></td> </tr> <tr> <th><span class="label">�����ţ�</span></th> <td> ';
$each(flight,function(obj,i){
$out+=' <label class="input_radio"><input type="radio" class="flight_id" name="flight_id" value="';
$out+=$escape(obj.flight_id);
$out+='" ';
if(i === 0){
$out+=' checked="checked"';
}
$out+=' />';
$out+=$escape(obj.flight_no);
$out+='</label> ';
});
$out+=' </td> </tr> <tr> <th></th> <td>�ܿ��棺<span class="J_stock_total_num">';
$out+=$escape(msg[flight[0].flight_id].stock_total_num);
$out+='</span>&nbsp;&nbsp;��ռλ��<span class="J_stock_lock_num">';
$out+=$escape(msg[flight[0].flight_id].stock_lock_num);
$out+='</span>&nbsp;&nbsp;���ۣ�<span class="J_stock_use_num">';
$out+=$escape(msg[flight[0].flight_id].stock_use_num);
$out+='</span></td> </tr> </table> ';
}
$out+=' </div>';
return new String($out);
});