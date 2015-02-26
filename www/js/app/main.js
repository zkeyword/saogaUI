define(function(require){
	
	/**
	* 载入第三方插件
	*/
	/*表单验证*/
	require('app/jquery.validate');
	
	/*ajax分页插件*/
	require('app/jquery.pagination');

	/*表单无刷提交*/
	require('app/jquery.form');
	
	/*树形控件*/
	require('app/jquery.ztree.all-3.3.min-amd');
	
	/*日期控件*/
	//require('app/My97DatePicker/WdatePicker');
	
	/*光标插件*/
	require('app/jquery.insert');
	
	/*手风琴*/
	require('app/jquery.accordion');
	
	/*只能输入数字*/
	require('app/jquery.inputOnlyPositiveNum');	
	
	/*页面常用*/
	var saogaUI = require('app/saogaUI');

	/*页面常用*/
	require('app/common');
	
	return saogaUI;
});
