(function(e){try{document.createEvent("TouchEvent")}catch(t){var n={},r={touchstart:"mousedown",touchend:"mouseup",touchmove:"mousemove"};function i(e,t,n){if(typeof e=="object")return[e];var i=e.match(/([^.]*)(\..*|$)/),o=i[0],e=i[1],u=i[2],a=r[e];return result=[(a||e)+u],arguments.length>1&&(a&&(t=s(e,t,n)),result.push(t)),result}function s(e,t,r){return n[t]=function(n){return n.liveFired&&(r=this),n.button?!1:(n.touches=[{length:1,clientX:n.clientX,clientY:n.clienty,pageX:n.pageX,pageY:n.pageY,screenX:n.screenX,screenY:n.screenY,target:n.target}],n.touchtype=e,t.apply(r,[n]))}}var o=e.fn.bind;e.fn.bind=function(e,t){return o.apply(this,i(e,t,this))};var u=e.fn.unbind;e.fn.unbind=function(e,t){if(!e){u.apply(this);return}var r=u.apply(this,i(e).concat([n[t]||t]));return delete n[t],r};var a=e.fn.one;e.fn.one=function(e,t){return a.apply(this,i(e,t,this))};var f=e.fn.delegate;e.fn.delegate=function(e,t,n){return f.apply(this,[e].concat(i(t,n,this)))};var l=e.fn.undelegate;e.fn.undelegate=function(e,t,r){var s=l.apply(this,[e].concat(i(t),[n[r]||r]));return delete n[r],s};var c=e.fn.live;e.fn.live=function(e,t){return c.apply(this,i(e,t,this))};var h=e.fn.die;e.fn.die=function(e,t){var r=h.apply(this,i(e).concat([n[t]||t]));return delete n[t],r};var p=e.fn.trigger;e.fn.trigger=function(e,t){return p.apply(this,i(e).concat([t]))};var d=e.fn.triggerHandler;e.fn.triggerHandler=function(e,t){return d.apply(this,i(e).concat([t]))}}})(Zepto);