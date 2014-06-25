define(function(){
	
	'use strict';
	
	var validator = function(options){
		var o = options || {};
		var init = function(){
			console.log(options)
		};
		
		return {
			init: init
		}
	};
	
	return validator;
});