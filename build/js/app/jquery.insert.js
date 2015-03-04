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
        return this;
    };
    
}));