define(["core/saogaUI"],function(e){var t=function(e){function o(e){var e=window.event||e,t=r.css("top")=="auto"?0:r.css("top"),n=r.css("left")=="auto"?0:r.css("left");r.css({top:parseInt(t)+(e.clientY-s.y),left:parseInt(n)+(e.clientX-s.x)}),s.x=e.clientX,s.y=e.clientY}var t=e||{};if(!t.dragItem)return!1;var n=$("body").find(t.dragItem),r=$("body").find(t.dragWrap),i=parent.document||document,s={x:0,y:0};n.mousedown(function(e){var e=window.event||e;s.x=e.clientX,s.y=e.clientY,$(i).bind("mousemove",o),e.preventDefault()}),$(i).mouseup(function(e){$(i).unbind("mousemove",o)})};return e.drag=t,t});