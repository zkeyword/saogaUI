// AMD support
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define(['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {
	"use strict";
	
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
        
        return this;
    };
    
}));