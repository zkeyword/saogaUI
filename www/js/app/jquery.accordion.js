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
	$.fn.accordion = function(options){
		$(this).off('click', options.tab).on('click', options.tab, function(e){
			var that            = $(e.currentTarget),
				next            = that.next(options.content),
				siblings        = that.siblings(options.tab),
				nextSiblings    = next.siblings(options.content),
				isCloseSiblings = options.isCloseSiblings === undefined ? true : options.isCloseSiblings;

 			if( next.is(':visible') ){
 				next.hide();
 				that.removeClass('active')
 					.find('.icon-font')
 					.html('&#983722');
				if( isCloseSiblings ){
 					siblings.removeClass('active')
				}
			}else{
				next.show()
					.css({opacity:0.1})
					.animate({ 
						opacity: 1
					}, 500);
				that.addClass('active')
					.find('.icon-font')
					.html('&#983721');
 				
 				if( isCloseSiblings ){
 					nextSiblings.hide();
 					siblings.removeClass('active')
 						.find('.icon-font')
 						.html('&#983722');
 				}
			}
		});
		return this;
	};
    
}));