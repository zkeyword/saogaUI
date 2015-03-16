/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
/*!
 * jQuery Validation Plugin v1.13.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( 'app/jquery.validate',["jquery"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend($.fn, {
	// http://jqueryvalidation.org/validate/
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.validateDelegate( ":submit", "click", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $( event.target ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( event.target ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $( "<input type='hidden'/>" )
								.attr( "name", validator.submitButton.name )
								.val( $( validator.submitButton ).val() )
								.appendTo( validator.currentForm );
						}
						validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
			});
		}
		return valid;
	},
	// attributes: space separated list of attributes to retrieve and remove
	removeAttrs: function( attributes ) {
		var result = {},
			$element = this;
		$.each( attributes.split( /\s/ ), function( index, value ) {
			result[ value ] = $element.attr( value );
			$element.removeAttr( value );
		});
		return result;
	},
	// http://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );
				// remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
					if ( method === "required" ) {
						$( element ).removeAttr( "aria-required" );
					}
				});
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
			$( element ).attr( "aria-required", "true" );
		}

		// make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param });
		}

		return data;
	}
});

// Custom selectors
$.extend( $.expr[ ":" ], {
	// http://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},
	// http://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		return !!$.trim( "" + $( a ).val() );
	},
	// http://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		});
	});
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {
			if ( event.which === 9 && this.elementValue( element ) === "" ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element( element );
			}
		},
		onclick: function( element ) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date ( ISO ).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				});
			});
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			});

			function delegate( event ) {
				var validator = $.data( this[ 0 ].form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !this.is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this[ 0 ], event );
				}
			}
			$( this.currentForm )
				.validateDelegate( ":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'], [type='radio'], [type='checkbox']",
					"focusin focusout keyup", delegate)
				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).bind( "invalid-form.validate", this.settings.invalidHandler );
			}

			// Add aria-required to any Static/Data/Class required fields before first validation
			// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
			$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
		},

		// http://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend({}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// http://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				result = true;

			this.lastElement = checkElement;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				result = this.check( checkElement ) !== false;
				if ( result ) {
					delete this.invalid[ checkElement.name ];
				} else {
					this.invalid[ checkElement.name ] = true;
				}
			}
			// Add aria-invalid status for screen readers
			$( element ).attr( "aria-invalid", !result );

			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[ name ],
						element: this.findByName( name )[ 0 ]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				});
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements()
					.removeClass( this.settings.errorClass )
					.removeData( "previousValue" )
					.removeAttr( "aria-invalid" );
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
					.filter( ":visible" )
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea" )
			.not( ":submit, :reset, :image, [disabled]" )
			.not( this.settings.ignore )
			.filter( function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ this.name ] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var val,
				$element = $( element ),
				type = element.type;

			if ( type === "radio" || type === "checkbox" ) {
				return $( "input[name='" + element.name + "']:checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? false : $element.val();
			}

			val = $element.val();
			if ( typeof val === "string" ) {
				return val.replace(/\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				}).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule;

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {

					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method ) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[ method ],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}
			this.errorList.push({
				message: message,
				element: element,
				method: rule.method
			});

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map(function() {
				return this.element;
			});
		},

		showLabel: function( element, message ) {
			var place, group, errorID,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );
			if ( error.length ) {
				// refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
				// replace message on existing label
				error.html( message );
			} else {
				// create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement( place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {
					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );
				} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby

					errorID = error.attr( "id" );
					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\b" + errorID + "\b" ) ) ) {
						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						$.each( this.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + name + "']", this.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						});
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.idOrName( element ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";
			// aria-describedby should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
			}
			return this
				.errors()
				.filter( selector );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {
			// if radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name ).not( this.settings.ignore )[ 0 ];
			}
			return element;
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + name + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
				this.formSubmitted = false;
			}
		},

		previousValue: function( element ) {
			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ]);
				}
			});
		}
		return rules;
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}
				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			// convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number( value );
			}

			if ( value || value === 0 ) {
				rules[ method ] = value;
			} else if ( type === method && type !== "range" ) {
				// exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[ method ] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var method, value,
			rules = {}, $element = $( element );
		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			if ( value !== undefined ) {
				rules[ method ] = value;
			}
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {
		// handle dependency check
		$.each( rules, function( prop, val ) {
			// ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[ prop ];
				}
			}
		});

		// evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
		});

		// clean number parameters
		$.each([ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		});
		$.each([ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
				}
			}
		});

		if ( $.validator.autoCreateRanges ) {
			// auto-create ranges
			if ( rules.min && rules.max ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength && rules.maxlength ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	methods: {

		// http://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {
			// check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return $.trim( value ).length > 0;
		},

		// http://jqueryvalidation.org/email-method/
		email: function( value, element ) {
			// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// http://jqueryvalidation.org/url-method/
		url: function( value, element ) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional( element ) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
		},

		// http://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// http://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// http://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// http://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// http://jqueryvalidation.org/creditcard-method/
		// based on http://en.wikipedia.org/wiki/Luhn/
		creditcard: function( value, element ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if ( /[^0-9 \-]+/.test( value ) ) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false,
				n, cDigit;

			value = value.replace( /\D/g, "" );

			// Basing min and max length on
			// http://developer.ean.com/general_info/Valid_Credit_Card_Types
			if ( value.length < 13 || value.length > 19 ) {
				return false;
			}

			for ( n = value.length - 1; n >= 0; n--) {
				cDigit = value.charAt( n );
				nDigit = parseInt( cDigit, 10 );
				if ( bEven ) {
					if ( ( nDigit *= 2 ) > 9 ) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return ( nCheck % 10 ) === 0;
		},

		// http://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( $.trim( value ), element );
			return this.optional( element ) || length >= param;
		},

		// http://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( $.trim( value ), element );
			return this.optional( element ) || length <= param;
		},

		// http://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( $.trim( value ), element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// http://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// http://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $( param );
			if ( this.settings.onfocusout ) {
				target.unbind( ".validate-equalTo" ).bind( "blur.validate-equalTo", function() {
					$( element ).valid();
				});
			}
			return value === target.val();
		},

		// http://jqueryvalidation.org/remote-method/
		remote: function( value, element, param ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue( element ),
				validator, data;

			if (!this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = this.settings.messages[ element.name ].remote;
			this.settings.messages[ element.name ].remote = previous.message;

			param = typeof param === "string" && { url: param } || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ].remote = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.prepareElement( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						delete validator.invalid[ element.name ];
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, "remote" );
						errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}

	}

});

$.format = function deprecated() {
	throw "$.format has been deprecated. Please use $.validator.format instead.";
};

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;
// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter(function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			pendingRequests[port] = xhr;
		}
	});
} else {
	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			pendingRequests[port] = ajax.apply(this, arguments);
			return pendingRequests[port];
		}
		return ajax.apply(this, arguments);
	};
}

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target

$.extend($.fn, {
	validateDelegate: function( delegate, type, handler ) {
		return this.bind(type, function( event ) {
			var target = $(event.target);
			if ( target.is(delegate) ) {
				return handler.apply(target, arguments);
			}
		});
	}
});

}));
/**
 * This $ plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} $ Object
 */
(function (factory) {
    
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define('app/jquery.pagination',['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {

$.fn.pagination = function(maxentries, opts){
	opts = $.extend({
		items_per_page:10,
		num_display_entries:10,
		current_page:0,
		num_edge_entries:0,
		link_to:"#",
		prev_text:"Prev",
		next_text:"Next",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		callback:function(){return false;}
	},opts||{});
	
	return this.each(function() {
		/**
		 * Calculate the maximum number of pages
		 */
		function numPages() {
			return Math.ceil(maxentries/opts.items_per_page);
		}
		
		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @return {Array}
		 */
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start,end];
		}
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(page_id, evt){
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		/**
		 * This function inserts the pagination links into the container element
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// This helper function returns a handler function that calls pageSelected with the right page_id
			var getClickHandler = function(page_id) {
				return function(evt){ return pageSelected(page_id,evt); }
			}
			// Helper function for generating a single link (or a span tag if it's the current page)
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
				appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
				if(page_id == current_page){
					var lnk = $("<span class='current'>"+(appendopts.text)+"</span>");
				}
				else
				{
					var lnk = $("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/,page_id));
						
						
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes).removeClass('current');}
				panel.append(lnk);
			}
			// Generate "Previous"-Link
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}
			// Generate starting points
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
					$("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
			}
			// Generate interval links
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			}
			// Generate ending points
			if (interval[1] < np && opts.num_edge_entries > 0)
			{
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
				{
					$("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) {
					appendItem(i);
				}
				
			}
			// Generate "Next"-Link
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}
		}
		
		// Extract current_page from options
		var current_page = opts.current_page;
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		// Store DOM element for easy access from all inner functions
		var panel = $(this);
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){ 
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){ 
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		// When all initialisation is done, draw the links
		drawLinks();
        // call callback function
		// 注释 by linhq，创建的时候不调用回调函数
        //opts.callback(current_page, this);
	});
};


}));
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */

// AMD support
(function (factory) {
    
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define('app/jquery.form',['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {


/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

var hasProp = !!$.fn.prop;

// attr2 uses prop when it can but checks the return type for
// an expected string.  this accounts for the case where a form 
// contains inputs with names like "action" or "method"; in those
// cases "prop" returns the element
$.fn.attr2 = function() {
    if ( ! hasProp ) {
        return this.attr.apply(this, arguments);
    }
    var val = this.prop.apply(this, arguments);
    if ( ( val && val.jquery ) || typeof val === 'string' ) {
        return val;
    }
    return this.attr.apply(this, arguments);
};

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    var method, action, url, $form = this;

    if (typeof options == 'function') {
        options = { success: options };
    }
    else if ( options === undefined ) {
        options = {};
    }

    method = options.type || this.attr2('method');
    action = options.url  || this.attr2('action');

    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
        // clean url (don't include hash vaue)
        url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
        url:  url,
        success: $.ajaxSettings.success,
        type: method || $.ajaxSettings.type,
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
        traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements);
    if (options.data) {
        options.extraData = options.data;
        qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
        q = ( q ? (q + '&' + qx) : qx );
    }
    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else {
        options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
        callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
        callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            var fn = options.replaceTarget ? 'replaceWith' : 'html';
            $(options.target)[fn](data).each(oldSuccess, arguments);
        });
    }
    else if (options.success) {
        callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
        var context = options.context || this ;    // jQuery 1.4+ supports scope context
        for (var i=0, max=callbacks.length; i < max; i++) {
            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
        }
    };

    if (options.error) {
        var oldError = options.error;
        options.error = function(xhr, status, error) {
            var context = options.context || this;
            oldError.apply(context, [xhr, status, error, $form]);
        };
    }

     if (options.complete) {
        var oldComplete = options.complete;
        options.complete = function(xhr, status) {
            var context = options.context || this;
            oldComplete.apply(context, [xhr, status, $form]);
        };
    }

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });

    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
        // hack to fix Safari hang (thanks to Tim Molendijk for this)
        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
        if (options.closeKeepAlive) {
            $.get(options.closeKeepAlive, function() {
                jqxhr = fileUploadIframe(a);
            });
        }
        else {
            jqxhr = fileUploadIframe(a);
        }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
        jqxhr = fileUploadXhr(a);
    }
    else {
        jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k=0; k < elements.length; k++) {
        elements[k] = null;
    }

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData){
        var serialized = $.param(extraData, options.traditional).split('&');
        var len = serialized.length;
        var result = [];
        var i, part;
        for (i=0; i < len; i++) {
            // #252; undo param space replacement
            serialized[i] = serialized[i].replace(/\+/g,' ');
            part = serialized[i].split('=');
            // #278; use array instead of object storage, favoring array serializations
            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
        }
        return result;
    }

     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
        var formdata = new FormData();

        for (var i=0; i < a.length; i++) {
            formdata.append(a[i].name, a[i].value);
        }

        if (options.extraData) {
            var serializedData = deepSerialize(options.extraData);
            for (i=0; i < serializedData.length; i++) {
                if (serializedData[i]) {
                    formdata.append(serializedData[i][0], serializedData[i][1]);
                }
            }
        }

        options.data = null;

        var s = $.extend(true, {}, $.ajaxSettings, options, {
            contentType: false,
            processData: false,
            cache: false,
            type: method || 'POST'
        });

        if (options.uploadProgress) {
            // workaround because jqXHR does not expose upload property
            s.xhr = function() {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position; /*event.position is deprecated*/
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        options.uploadProgress(event, position, total, percent);
                    }, false);
                }
                return xhr;
            };
        }

        s.data = null;
        var beforeSend = s.beforeSend;
        s.beforeSend = function(xhr, o) {
            //Send FormData() provided by user
            if (options.formData) {
                o.data = options.formData;
            }
            else {
                o.data = formdata;
            }
            if(beforeSend) {
                beforeSend.call(this, xhr, o);
            }
        };
        return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
        var deferred = $.Deferred();

        // #341
        deferred.abort = function(status) {
            xhr.abort(status);
        };

        if (a) {
            // ensure that every serialized input is still enabled
            for (i=0; i < elements.length; i++) {
                el = $(elements[i]);
                if ( hasProp ) {
                    el.prop('disabled', false);
                }
                else {
                    el.removeAttr('disabled');
                }
            }
        }

        s = $.extend(true, {}, $.ajaxSettings, options);
        s.context = s.context || s;
        id = 'jqFormIO' + (new Date().getTime());
        if (s.iframeTarget) {
            $io = $(s.iframeTarget);
            n = $io.attr2('name');
            if (!n) {
                $io.attr2('name', id);
            }
            else {
                id = n;
            }
        }
        else {
            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
        }
        io = $io[0];


        xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function(status) {
                var e = (status === 'timeout' ? 'timeout' : 'aborted');
                log('aborting upload... ' + e);
                this.aborted = 1;

                try { // #214, #257
                    if (io.contentWindow.document.execCommand) {
                        io.contentWindow.document.execCommand('Stop');
                    }
                }
                catch(ignore) {}

                $io.attr('src', s.iframeSrc); // abort op in progress
                xhr.error = e;
                if (s.error) {
                    s.error.call(s.context, xhr, e, status);
                }
                if (g) {
                    $.event.trigger("ajaxError", [xhr, s, e]);
                }
                if (s.complete) {
                    s.complete.call(s.context, xhr, e);
                }
            }
        };

        g = s.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && 0 === $.active++) {
            $.event.trigger("ajaxStart");
        }
        if (g) {
            $.event.trigger("ajaxSend", [xhr, s]);
        }

        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
            if (s.global) {
                $.active--;
            }
            deferred.reject();
            return deferred;
        }
        if (xhr.aborted) {
            deferred.reject();
            return deferred;
        }

        // add submitting element to data if we know it
        sub = form.clk;
        if (sub) {
            n = sub.name;
            if (n && !sub.disabled) {
                s.extraData = s.extraData || {};
                s.extraData[n] = sub.value;
                if (sub.type == "image") {
                    s.extraData[n+'.x'] = form.clk_x;
                    s.extraData[n+'.y'] = form.clk_y;
                }
            }
        }

        var CLIENT_TIMEOUT_ABORT = 1;
        var SERVER_ABORT = 2;
                
        function getDoc(frame) {
            /* it looks like contentWindow or contentDocument do not
             * carry the protocol property in ie8, when running under ssl
             * frame.document is the only valid response document, since
             * the protocol is know but not on the other two objects. strange?
             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
             */
            
            var doc = null;
            
            // IE8 cascading access check
            try {
                if (frame.contentWindow) {
                    doc = frame.contentWindow.document;
                }
            } catch(err) {
                // IE8 access denied under ssl & missing protocol
                log('cannot get iframe.contentWindow document: ' + err);
            }

            if (doc) { // successful getting content
                return doc;
            }

            try { // simply checking may throw in ie8 under ssl or mismatched protocol
                doc = frame.contentDocument ? frame.contentDocument : frame.document;
            } catch(err) {
                // last attempt
                log('cannot get iframe.contentDocument: ' + err);
                doc = frame.document;
            }
            return doc;
        }

        // Rails CSRF hack (thanks to Yvan Barthelemy)
        var csrf_token = $('meta[name=csrf-token]').attr('content');
        var csrf_param = $('meta[name=csrf-param]').attr('content');
        if (csrf_param && csrf_token) {
            s.extraData = s.extraData || {};
            s.extraData[csrf_param] = csrf_token;
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        function doSubmit() {
            // make sure form attrs are set
            var t = $form.attr2('target'), 
                a = $form.attr2('action'), 
                mp = 'multipart/form-data',
                et = $form.attr('enctype') || $form.attr('encoding') || mp;

            // update form attrs in IE friendly way
            form.setAttribute('target',id);
            if (!method || /post/i.test(method) ) {
                form.setAttribute('method', 'POST');
            }
            if (a != s.url) {
                form.setAttribute('action', s.url);
            }

            // ie borks in some cases when setting encoding
            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (s.timeout) {
                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
            }

            // look for server aborts
            function checkState() {
                try {
                    var state = getDoc(io).readyState;
                    log('state = ' + state);
                    if (state && state.toLowerCase() == 'uninitialized') {
                        setTimeout(checkState,50);
                    }
                }
                catch(e) {
                    log('Server abort: ' , e, ' (', e.name, ')');
                    cb(SERVER_ABORT);
                    if (timeoutHandle) {
                        clearTimeout(timeoutHandle);
                    }
                    timeoutHandle = undefined;
                }
            }

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (s.extraData) {
                    for (var n in s.extraData) {
                        if (s.extraData.hasOwnProperty(n)) {
                           // if using the $.param format that allows for multiple values with the same name
                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                               extraInputs.push(
                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
                                   .appendTo(form)[0]);
                           } else {
                               extraInputs.push(
                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
                                   .appendTo(form)[0]);
                           }
                        }
                    }
                }

                if (!s.iframeTarget) {
                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                }
                if (io.attachEvent) {
                    io.attachEvent('onload', cb);
                }
                else {
                    io.addEventListener('load', cb, false);
                }
                setTimeout(checkState,15);

                try {
                    form.submit();
                } catch(err) {
                    // just in case form has element with name/id of 'submit'
                    var submitFn = document.createElement('form').submit;
                    submitFn.apply(form);
                }
            }
            finally {
                // reset attrs and remove "extra" input elements
                form.setAttribute('action',a);
                form.setAttribute('enctype', et); // #380
                if(t) {
                    form.setAttribute('target', t);
                } else {
                    $form.removeAttr('target');
                }
                $(extraInputs).remove();
            }
        }

        if (s.forceSync) {
            doSubmit();
        }
        else {
            setTimeout(doSubmit, 10); // this lets dom updates render
        }

        var data, doc, domCheckCount = 50, callbackProcessed;

        function cb(e) {
            if (xhr.aborted || callbackProcessed) {
                return;
            }
            
            doc = getDoc(io);
            if(!doc) {
                log('cannot access response document');
                e = SERVER_ABORT;
            }
            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                xhr.abort('timeout');
                deferred.reject(xhr, 'timeout');
                return;
            }
            else if (e == SERVER_ABORT && xhr) {
                xhr.abort('server abort');
                deferred.reject(xhr, 'error', 'server abort');
                return;
            }

            if (!doc || doc.location.href == s.iframeSrc) {
                // response not received yet
                if (!timedOut) {
                    return;
                }
            }
            if (io.detachEvent) {
                io.detachEvent('onload', cb);
            }
            else {
                io.removeEventListener('load', cb, false);
            }

            var status = 'success', errMsg;
            try {
                if (timedOut) {
                    throw 'timeout';
                }

                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                log('isXml='+isXml);
                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                    if (--domCheckCount) {
                        // in some browsers (Opera) the iframe DOM is not always traversable when
                        // the onload callback fires, so we loop a bit to accommodate
                        log('requeing onLoad callback, DOM not available');
                        setTimeout(cb, 250);
                        return;
                    }
                    // let this fall through because server response could be an empty document
                    //log('Could not access iframe DOM after mutiple tries.');
                    //throw 'DOMException: not available';
                }

                //log('response detected');
                var docRoot = doc.body ? doc.body : doc.documentElement;
                xhr.responseText = docRoot ? docRoot.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                if (isXml) {
                    s.dataType = 'xml';
                }
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': s.dataType};
                    return headers[header.toLowerCase()];
                };
                // support for XHR 'status' & 'statusText' emulation :
                if (docRoot) {
                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                }

                var dt = (s.dataType || '').toLowerCase();
                var scr = /(json|script|text)/.test(dt);
                if (scr || s.textarea) {
                    // see if user embedded response in textarea
                    var ta = doc.getElementsByTagName('textarea')[0];
                    if (ta) {
                        xhr.responseText = ta.value;
                        // support for XHR 'status' & 'statusText' emulation :
                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                    }
                    else if (scr) {
                        // account for browsers injecting pre around json response
                        var pre = doc.getElementsByTagName('pre')[0];
                        var b = doc.getElementsByTagName('body')[0];
                        if (pre) {
                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                        }
                        else if (b) {
                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
                        }
                    }
                }
                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                    xhr.responseXML = toXml(xhr.responseText);
                }

                try {
                    data = httpData(xhr, dt, s);
                }
                catch (err) {
                    status = 'parsererror';
                    xhr.error = errMsg = (err || status);
                }
            }
            catch (err) {
                log('error caught: ',err);
                status = 'error';
                xhr.error = errMsg = (err || status);
            }

            if (xhr.aborted) {
                log('upload aborted');
                status = null;
            }

            if (xhr.status) { // we've set xhr.status
                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (status === 'success') {
                if (s.success) {
                    s.success.call(s.context, data, 'success', xhr);
                }
                deferred.resolve(xhr.responseText, 'success', xhr);
                if (g) {
                    $.event.trigger("ajaxSuccess", [xhr, s]);
                }
            }
            else if (status) {
                if (errMsg === undefined) {
                    errMsg = xhr.statusText;
                }
                if (s.error) {
                    s.error.call(s.context, xhr, status, errMsg);
                }
                deferred.reject(xhr, 'error', errMsg);
                if (g) {
                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }
            }

            if (g) {
                $.event.trigger("ajaxComplete", [xhr, s]);
            }

            if (g && ! --$.active) {
                $.event.trigger("ajaxStop");
            }

            if (s.complete) {
                s.complete.call(s.context, xhr, status);
            }

            callbackProcessed = true;
            if (s.timeout) {
                clearTimeout(timeoutHandle);
            }

            // clean up
            setTimeout(function() {
                if (!s.iframeTarget) {
                    $io.remove();
                }
                else { //adding else to clean up existing iframe response.
                    $io.attr('src', s.iframeSrc);
                }
                xhr.responseXML = null;
            }, 100);
        }

        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else {
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            }
            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
        };
        var parseJSON = $.parseJSON || function(s) {
            /*jslint evil:true */
            return window['eval']('(' + s + ')');
        };

        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

            var ct = xhr.getResponseHeader('content-type') || '',
                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;

            if (xml && data.documentElement.nodeName === 'parsererror') {
                if ($.error) {
                    $.error('parsererror');
                }
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === 'string') {
                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                    data = parseJSON(data);
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    $.globalEval(data);
                }
            }
            return data;
        };

        return deferred;
    }
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
        var o = { s: this.selector, c: this.context };
        if (!$.isReady && o.s) {
            log('DOM not ready, queuing ajaxForm');
            $(function() {
                $(o.s,o.c).ajaxForm(options);
            });
            return this;
        }
        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
        return this;
    }

    if ( options.delegation ) {
        $(document)
            .off('submit.form-plugin', this.selector, doAjaxSubmit)
            .off('click.form-plugin', this.selector, captureSubmittingElement)
            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
        return this;
    }

    return this.ajaxFormUnbind()
        .bind('submit.form-plugin', options, doAjaxSubmit)
        .bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers
function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
        e.preventDefault();
        $(e.target).ajaxSubmit(options); // #365
    }
}

function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is("[type=submit],[type=image]"))) {
        // is this a child element of the submit el?  (ex: a span within a button)
        var t = $el.closest('[type=submit]');
        if (t.length === 0) {
            return;
        }
        target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
        if (e.offsetX !== undefined) {
            form.clk_x = e.offsetX;
            form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left;
            form.clk_y = e.pageY - offset.top;
        } else {
            form.clk_x = e.pageX - target.offsetLeft;
            form.clk_y = e.pageY - target.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var formId = this.attr('id');
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    var els2;

    if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
        els = $(els).get();  // convert to standard array
    }

    // #386; account for inputs outside the form which use the 'form' attribute
    if ( formId ) {
        els2 = $(':input[form="' + formId + '"]').get(); // hat tip @thet
        if ( els2.length ) {
            els = (els || []).concat(els2);
        }
    }

    if (!els || !els.length) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n || el.disabled) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            if (elements) {
                elements.push(el);
            }
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file') {
            if (elements) {
                elements.push(el);
            }
            var files = el.files;
            if (files.length) {
                for (j=0; j < files.length; j++) {
                    a.push({name: n, value: files[j], type: el.type});
                }
            }
            else {
                // #180
                a.push({ name: n, value: '', type: el.type });
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements) {
                elements.push(el);
            }
            a.push({name: n, value: v, type: el.type, required: el.required});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) {
            return;
        }
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++) {
                a.push({name: n, value: v[i]});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: this.name, value: v});
        }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array) {
            $.merge(val, v);
        }
        else {
            val.push(v);
        }
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
        else if (t == "file") {
            if (/MSIE/.test(navigator.userAgent)) {
                $(this).replaceWith($(this).clone(true));
            } else {
                $(this).val('');
            }
        }
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  $('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ( (includeHidden === true && /hidden/.test(t)) ||
                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
                this.value = '';
            }
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b === undefined) {
        b = true;
    }
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select === undefined) {
        select = true;
    }
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio') {
            this.checked = select;
        }
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
    if (!$.fn.ajaxSubmit.debug) {
        return;
    }
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
        window.opera.postError(msg);
    }
}

}));

/*
 * JQuery zTree core 3.3
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2012-07-16
 * 给Ztree增加AMD规范
 * Date: 2014-05-19
 */
 (function(factory1,factory2,factory3){
 	if(define&&define.amd){
 		define('app/jquery.ztree.all-3.3.min-amd',["jquery"],function($){
 			factory1.call(window,$);
 			factory2.call(window,$);
 			factory3.call(window,$);
 		});
 	}else{
 		factory1.call(window,$);
		factory2.call(window,$);
		factory3.call(window,$);
 	}
 }
(function(k){var B,C,D,E,F,G,p={},H={},q={},L=0,I={treeId:"",treeObj:null,view:{addDiyDom:null,autoCancelSelected:!0,dblClickExpand:!0,expandSpeed:"fast",fontCss:{},nameIsHTML:!1,selectedMulti:!0,showIcon:!0,showLine:!0,showTitle:!0},data:{key:{children:"children",name:"name",title:"",url:"url"},simpleData:{enable:!1,idKey:"id",pIdKey:"pId",rootPId:null},keep:{parent:!1,leaf:!1}},async:{enable:!1,contentType:"application/x-www-form-urlencoded",type:"post",dataType:"text",url:"",autoParam:[],otherParam:[],
dataFilter:null},callback:{beforeAsync:null,beforeClick:null,beforeRightClick:null,beforeMouseDown:null,beforeMouseUp:null,beforeExpand:null,beforeCollapse:null,beforeRemove:null,onAsyncError:null,onAsyncSuccess:null,onNodeCreated:null,onClick:null,onRightClick:null,onMouseDown:null,onMouseUp:null,onExpand:null,onCollapse:null,onRemove:null}},r=[function(b){var a=b.treeObj,c=e.event;a.unbind(c.NODECREATED);a.bind(c.NODECREATED,function(a,c,g){j.apply(b.callback.onNodeCreated,[a,c,g])});a.unbind(c.CLICK);
a.bind(c.CLICK,function(a,c,g,l,e){j.apply(b.callback.onClick,[c,g,l,e])});a.unbind(c.EXPAND);a.bind(c.EXPAND,function(a,c,g){j.apply(b.callback.onExpand,[a,c,g])});a.unbind(c.COLLAPSE);a.bind(c.COLLAPSE,function(a,c,g){j.apply(b.callback.onCollapse,[a,c,g])});a.unbind(c.ASYNC_SUCCESS);a.bind(c.ASYNC_SUCCESS,function(a,c,g,l){j.apply(b.callback.onAsyncSuccess,[a,c,g,l])});a.unbind(c.ASYNC_ERROR);a.bind(c.ASYNC_ERROR,function(a,c,g,l,e,h){j.apply(b.callback.onAsyncError,[a,c,g,l,e,h])})}],s=[function(b){var a=
i.getCache(b);a||(a={},i.setCache(b,a));a.nodes=[];a.doms=[]}],t=[function(b,a,c,d,f,g){if(c){var l=b.data.key.children;c.level=a;c.tId=b.treeId+"_"+ ++L;c.parentTId=d?d.tId:null;if(c[l]&&c[l].length>0){if(typeof c.open=="string")c.open=j.eqs(c.open,"true");c.open=!!c.open;c.isParent=!0;c.zAsync=!0}else{c.open=!1;if(typeof c.isParent=="string")c.isParent=j.eqs(c.isParent,"true");c.isParent=!!c.isParent;c.zAsync=!c.isParent}c.isFirstNode=f;c.isLastNode=g;c.getParentNode=function(){return i.getNodeCache(b,
c.parentTId)};c.getPreNode=function(){return i.getPreNode(b,c)};c.getNextNode=function(){return i.getNextNode(b,c)};c.isAjaxing=!1;i.fixPIdKeyValue(b,c)}}],u=[function(b){var a=b.target,c=p[b.data.treeId],d="",f=null,g="",l="",h=null,m=null,k=null;if(j.eqs(b.type,"mousedown"))l="mousedown";else if(j.eqs(b.type,"mouseup"))l="mouseup";else if(j.eqs(b.type,"contextmenu"))l="contextmenu";else if(j.eqs(b.type,"click"))if(j.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+e.id.SWITCH)!==null)d=a.parentNode.id,
g="switchNode";else{if(k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+e.id.A}]))d=k.parentNode.id,g="clickNode"}else if(j.eqs(b.type,"dblclick")&&(l="dblclick",k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+e.id.A}])))d=k.parentNode.id,g="switchNode";if(l.length>0&&d.length==0&&(k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+e.id.A}])))d=k.parentNode.id;if(d.length>0)switch(f=i.getNodeCache(c,d),g){case "switchNode":f.isParent?j.eqs(b.type,"click")||j.eqs(b.type,"dblclick")&&j.apply(c.view.dblClickExpand,
[c.treeId,f],c.view.dblClickExpand)?h=B:g="":g="";break;case "clickNode":h=C}switch(l){case "mousedown":m=D;break;case "mouseup":m=E;break;case "dblclick":m=F;break;case "contextmenu":m=G}return{stop:!1,node:f,nodeEventType:g,nodeEventCallback:h,treeEventType:l,treeEventCallback:m}}],v=[function(b){var a=i.getRoot(b);a||(a={},i.setRoot(b,a));a[b.data.key.children]=[];a.expandTriggerFlag=!1;a.curSelectedList=[];a.noSelection=!0;a.createdNodes=[]}],w=[],x=[],y=[],z=[],A=[],i={addNodeCache:function(b,
a){i.getCache(b).nodes[a.tId]=a},addAfterA:function(b){x.push(b)},addBeforeA:function(b){w.push(b)},addInnerAfterA:function(b){z.push(b)},addInnerBeforeA:function(b){y.push(b)},addInitBind:function(b){r.push(b)},addInitCache:function(b){s.push(b)},addInitNode:function(b){t.push(b)},addInitProxy:function(b){u.push(b)},addInitRoot:function(b){v.push(b)},addNodesData:function(b,a,c){var d=b.data.key.children;a[d]||(a[d]=[]);if(a[d].length>0)a[d][a[d].length-1].isLastNode=!1,h.setNodeLineIcos(b,a[d][a[d].length-
1]);a.isParent=!0;a[d]=a[d].concat(c)},addSelectedNode:function(b,a){var c=i.getRoot(b);i.isSelectedNode(b,a)||c.curSelectedList.push(a)},addCreatedNode:function(b,a){(b.callback.onNodeCreated||b.view.addDiyDom)&&i.getRoot(b).createdNodes.push(a)},addZTreeTools:function(b){A.push(b)},exSetting:function(b){k.extend(!0,I,b)},fixPIdKeyValue:function(b,a){b.data.simpleData.enable&&(a[b.data.simpleData.pIdKey]=a.parentTId?a.getParentNode()[b.data.simpleData.idKey]:b.data.simpleData.rootPId)},getAfterA:function(b,
a,c){for(var d=0,f=x.length;d<f;d++)x[d].apply(this,arguments)},getBeforeA:function(b,a,c){for(var d=0,f=w.length;d<f;d++)w[d].apply(this,arguments)},getInnerAfterA:function(b,a,c){for(var d=0,f=z.length;d<f;d++)z[d].apply(this,arguments)},getInnerBeforeA:function(b,a,c){for(var d=0,f=y.length;d<f;d++)y[d].apply(this,arguments)},getCache:function(b){return q[b.treeId]},getNextNode:function(b,a){if(!a)return null;for(var c=b.data.key.children,d=a.parentTId?a.getParentNode():i.getRoot(b),f=0,g=d[c].length-
1;f<=g;f++)if(d[c][f]===a)return f==g?null:d[c][f+1];return null},getNodeByParam:function(b,a,c,d){if(!a||!c)return null;for(var f=b.data.key.children,g=0,l=a.length;g<l;g++){if(a[g][c]==d)return a[g];var e=i.getNodeByParam(b,a[g][f],c,d);if(e)return e}return null},getNodeCache:function(b,a){if(!a)return null;var c=q[b.treeId].nodes[a];return c?c:null},getNodes:function(b){return i.getRoot(b)[b.data.key.children]},getNodesByParam:function(b,a,c,d){if(!a||!c)return[];for(var f=b.data.key.children,
g=[],l=0,e=a.length;l<e;l++)a[l][c]==d&&g.push(a[l]),g=g.concat(i.getNodesByParam(b,a[l][f],c,d));return g},getNodesByParamFuzzy:function(b,a,c,d){if(!a||!c)return[];for(var f=b.data.key.children,g=[],l=0,e=a.length;l<e;l++)typeof a[l][c]=="string"&&a[l][c].indexOf(d)>-1&&g.push(a[l]),g=g.concat(i.getNodesByParamFuzzy(b,a[l][f],c,d));return g},getNodesByFilter:function(b,a,c,d,f){if(!a)return d?null:[];for(var g=b.data.key.children,l=d?null:[],e=0,h=a.length;e<h;e++){if(j.apply(c,[a[e],f],!1)){if(d)return a[e];
l.push(a[e])}var k=i.getNodesByFilter(b,a[e][g],c,d,f);if(d&&k)return k;l=d?k:l.concat(k)}return l},getPreNode:function(b,a){if(!a)return null;for(var c=b.data.key.children,d=a.parentTId?a.getParentNode():i.getRoot(b),f=0,g=d[c].length;f<g;f++)if(d[c][f]===a)return f==0?null:d[c][f-1];return null},getRoot:function(b){return b?H[b.treeId]:null},getSetting:function(b){return p[b]},getSettings:function(){return p},getTitleKey:function(b){return b.data.key.title===""?b.data.key.name:b.data.key.title},
getZTreeTools:function(b){return(b=this.getRoot(this.getSetting(b)))?b.treeTools:null},initCache:function(b){for(var a=0,c=s.length;a<c;a++)s[a].apply(this,arguments)},initNode:function(b,a,c,d,f,g){for(var l=0,e=t.length;l<e;l++)t[l].apply(this,arguments)},initRoot:function(b){for(var a=0,c=v.length;a<c;a++)v[a].apply(this,arguments)},isSelectedNode:function(b,a){for(var c=i.getRoot(b),d=0,f=c.curSelectedList.length;d<f;d++)if(a===c.curSelectedList[d])return!0;return!1},removeNodeCache:function(b,
a){var c=b.data.key.children;if(a[c])for(var d=0,f=a[c].length;d<f;d++)arguments.callee(b,a[c][d]);delete i.getCache(b).nodes[a.tId]},removeSelectedNode:function(b,a){for(var c=i.getRoot(b),d=0,f=c.curSelectedList.length;d<f;d++)if(a===c.curSelectedList[d]||!i.getNodeCache(b,c.curSelectedList[d].tId))c.curSelectedList.splice(d,1),d--,f--},setCache:function(b,a){q[b.treeId]=a},setRoot:function(b,a){H[b.treeId]=a},setZTreeTools:function(b,a){for(var c=0,d=A.length;c<d;c++)A[c].apply(this,arguments)},
transformToArrayFormat:function(b,a){if(!a)return[];var c=b.data.key.children,d=[];if(j.isArray(a))for(var f=0,g=a.length;f<g;f++)d.push(a[f]),a[f][c]&&(d=d.concat(i.transformToArrayFormat(b,a[f][c])));else d.push(a),a[c]&&(d=d.concat(i.transformToArrayFormat(b,a[c])));return d},transformTozTreeFormat:function(b,a){var c,d,f=b.data.simpleData.idKey,g=b.data.simpleData.pIdKey,l=b.data.key.children;if(!f||f==""||!a)return[];if(j.isArray(a)){var e=[],h=[];for(c=0,d=a.length;c<d;c++)h[a[c][f]]=a[c];for(c=
0,d=a.length;c<d;c++)h[a[c][g]]&&a[c][f]!=a[c][g]?(h[a[c][g]][l]||(h[a[c][g]][l]=[]),h[a[c][g]][l].push(a[c])):e.push(a[c]);return e}else return[a]}},n={bindEvent:function(b){for(var a=0,c=r.length;a<c;a++)r[a].apply(this,arguments)},bindTree:function(b){var a={treeId:b.treeId},b=b.treeObj;b.unbind("click",n.proxy);b.bind("click",a,n.proxy);b.unbind("dblclick",n.proxy);b.bind("dblclick",a,n.proxy);b.unbind("mouseover",n.proxy);b.bind("mouseover",a,n.proxy);b.unbind("mouseout",n.proxy);b.bind("mouseout",
a,n.proxy);b.unbind("mousedown",n.proxy);b.bind("mousedown",a,n.proxy);b.unbind("mouseup",n.proxy);b.bind("mouseup",a,n.proxy);b.unbind("contextmenu",n.proxy);b.bind("contextmenu",a,n.proxy)},doProxy:function(b){for(var a=[],c=0,d=u.length;c<d;c++){var f=u[c].apply(this,arguments);a.push(f);if(f.stop)break}return a},proxy:function(b){var a=i.getSetting(b.data.treeId);if(!j.uCanDo(a,b))return!0;for(var c=n.doProxy(b),d=!0,f=!1,g=0,l=c.length;g<l;g++){var e=c[g];e.nodeEventCallback&&(f=!0,d=e.nodeEventCallback.apply(e,
[b,e.node])&&d);e.treeEventCallback&&(f=!0,d=e.treeEventCallback.apply(e,[b,e.node])&&d)}try{f&&k("input:focus").length==0&&j.noSel(a)}catch(h){}return d}};B=function(b,a){var c=p[b.data.treeId];if(a.open){if(j.apply(c.callback.beforeCollapse,[c.treeId,a],!0)==!1)return!0}else if(j.apply(c.callback.beforeExpand,[c.treeId,a],!0)==!1)return!0;i.getRoot(c).expandTriggerFlag=!0;h.switchNode(c,a);return!0};C=function(b,a){var c=p[b.data.treeId],d=c.view.autoCancelSelected&&b.ctrlKey&&i.isSelectedNode(c,
a)?0:c.view.autoCancelSelected&&b.ctrlKey&&c.view.selectedMulti?2:1;if(j.apply(c.callback.beforeClick,[c.treeId,a,d],!0)==!1)return!0;d===0?h.cancelPreSelectedNode(c,a):h.selectNode(c,a,d===2);c.treeObj.trigger(e.event.CLICK,[b,c.treeId,a,d]);return!0};D=function(b,a){var c=p[b.data.treeId];j.apply(c.callback.beforeMouseDown,[c.treeId,a],!0)&&j.apply(c.callback.onMouseDown,[b,c.treeId,a]);return!0};E=function(b,a){var c=p[b.data.treeId];j.apply(c.callback.beforeMouseUp,[c.treeId,a],!0)&&j.apply(c.callback.onMouseUp,
[b,c.treeId,a]);return!0};F=function(b,a){var c=p[b.data.treeId];j.apply(c.callback.beforeDblClick,[c.treeId,a],!0)&&j.apply(c.callback.onDblClick,[b,c.treeId,a]);return!0};G=function(b,a){var c=p[b.data.treeId];j.apply(c.callback.beforeRightClick,[c.treeId,a],!0)&&j.apply(c.callback.onRightClick,[b,c.treeId,a]);return typeof c.callback.onRightClick!="function"};var j={apply:function(b,a,c){return typeof b=="function"?b.apply(K,a?a:[]):c},canAsync:function(b,a){var c=b.data.key.children;return b.async.enable&&
a&&a.isParent&&!(a.zAsync||a[c]&&a[c].length>0)},clone:function(b){var a;if(b instanceof Array){a=[];for(var c=b.length;c--;)a[c]=arguments.callee(b[c]);return a}else if(typeof b=="function")return b;else if(b instanceof Object){a={};for(c in b)a[c]=arguments.callee(b[c]);return a}else return b},eqs:function(b,a){return b.toLowerCase()===a.toLowerCase()},isArray:function(b){return Object.prototype.toString.apply(b)==="[object Array]"},getMDom:function(b,a,c){if(!a)return null;for(;a&&a.id!==b.treeId;){for(var d=
0,f=c.length;a.tagName&&d<f;d++)if(j.eqs(a.tagName,c[d].tagName)&&a.getAttribute(c[d].attrName)!==null)return a;a=a.parentNode}return null},noSel:function(b){if(i.getRoot(b).noSelection)try{window.getSelection?window.getSelection().removeAllRanges():document.selection.empty()}catch(a){}},uCanDo:function(){return!0}},h={addNodes:function(b,a,c,d){if(!b.data.keep.leaf||!a||a.isParent)if(j.isArray(c)||(c=[c]),b.data.simpleData.enable&&(c=i.transformTozTreeFormat(b,c)),a){var f=k("#"+a.tId+e.id.SWITCH),
g=k("#"+a.tId+e.id.ICON),l=k("#"+a.tId+e.id.UL);if(!a.open)h.replaceSwitchClass(a,f,e.folder.CLOSE),h.replaceIcoClass(a,g,e.folder.CLOSE),a.open=!1,l.css({display:"none"});i.addNodesData(b,a,c);h.createNodes(b,a.level+1,c,a);d||h.expandCollapseParentNode(b,a,!0)}else i.addNodesData(b,i.getRoot(b),c),h.createNodes(b,0,c,null)},appendNodes:function(b,a,c,d,f,g){if(!c)return[];for(var e=[],j=b.data.key.children,k=0,n=c.length;k<n;k++){var o=c[k];if(f){var p=(d?d:i.getRoot(b))[j].length==c.length&&k==
0;i.initNode(b,a,o,d,p,k==c.length-1,g);i.addNodeCache(b,o)}p=[];o[j]&&o[j].length>0&&(p=h.appendNodes(b,a+1,o[j],o,f,g&&o.open));g&&(h.makeDOMNodeMainBefore(e,b,o),h.makeDOMNodeLine(e,b,o),i.getBeforeA(b,o,e),h.makeDOMNodeNameBefore(e,b,o),i.getInnerBeforeA(b,o,e),h.makeDOMNodeIcon(e,b,o),i.getInnerAfterA(b,o,e),h.makeDOMNodeNameAfter(e,b,o),i.getAfterA(b,o,e),o.isParent&&o.open&&h.makeUlHtml(b,o,e,p.join("")),h.makeDOMNodeMainAfter(e,b,o),i.addCreatedNode(b,o))}return e},appendParentULDom:function(b,
a){var c=[],d=k("#"+a.tId),f=k("#"+a.tId+e.id.UL),g=h.appendNodes(b,a.level+1,a[b.data.key.children],a,!1,!0);h.makeUlHtml(b,a,c,g.join(""));!d.get(0)&&a.parentTId&&(h.appendParentULDom(b,a.getParentNode()),d=k("#"+a.tId));f.get(0)&&f.remove();d.append(c.join(""))},asyncNode:function(b,a,c,d){var f,g;if(a&&!a.isParent)return j.apply(d),!1;else if(a&&a.isAjaxing)return!1;else if(j.apply(b.callback.beforeAsync,[b.treeId,a],!0)==!1)return j.apply(d),!1;if(a)a.isAjaxing=!0,k("#"+a.tId+e.id.ICON).attr({style:"",
"class":"button ico_loading"});var l=b.async.contentType=="application/json",i=l?"{":"",m="";for(f=0,g=b.async.autoParam.length;a&&f<g;f++){var n=b.async.autoParam[f].split("="),o=n;n.length>1&&(o=n[1],n=n[0]);l?(m=typeof a[n]=="string"?'"':"",i+='"'+o+('":'+m+a[n]).replace(/'/g,"\\'")+m+","):i+=o+("="+a[n]).replace(/&/g,"%26")+"&"}if(j.isArray(b.async.otherParam))for(f=0,g=b.async.otherParam.length;f<g;f+=2)l?(m=typeof b.async.otherParam[f+1]=="string"?'"':"",i+='"'+b.async.otherParam[f]+('":'+m+
b.async.otherParam[f+1]).replace(/'/g,"\\'")+m+","):i+=b.async.otherParam[f]+("="+b.async.otherParam[f+1]).replace(/&/g,"%26")+"&";else for(var p in b.async.otherParam)l?(m=typeof b.async.otherParam[p]=="string"?'"':"",i+='"'+p+('":'+m+b.async.otherParam[p]).replace(/'/g,"\\'")+m+","):i+=p+("="+b.async.otherParam[p]).replace(/&/g,"%26")+"&";i.length>1&&(i=i.substring(0,i.length-1));l&&(i+="}");k.ajax({contentType:b.async.contentType,type:b.async.type,url:j.apply(b.async.url,[b.treeId,a],b.async.url),
data:i,dataType:b.async.dataType,success:function(f){var g=[];try{g=!f||f.length==0?[]:typeof f=="string"?eval("("+f+")"):f}catch(l){}if(a)a.isAjaxing=null,a.zAsync=!0;h.setNodeLineIcos(b,a);g&&g!==""?(g=j.apply(b.async.dataFilter,[b.treeId,a,g],g),h.addNodes(b,a,g?j.clone(g):[],!!c)):h.addNodes(b,a,[],!!c);b.treeObj.trigger(e.event.ASYNC_SUCCESS,[b.treeId,a,f]);j.apply(d)},error:function(c,d,f){if(a)a.isAjaxing=null;h.setNodeLineIcos(b,a);b.treeObj.trigger(e.event.ASYNC_ERROR,[b.treeId,a,c,d,f])}});
return!0},cancelPreSelectedNode:function(b,a){for(var c=i.getRoot(b).curSelectedList,d=c.length-1;d>=0;d--)if(!a||a===c[d])if(k("#"+c[d].tId+e.id.A).removeClass(e.node.CURSELECTED),h.setNodeName(b,c[d]),a){i.removeSelectedNode(b,a);break}if(!a)i.getRoot(b).curSelectedList=[]},createNodeCallback:function(b){if(b.callback.onNodeCreated||b.view.addDiyDom)for(var a=i.getRoot(b);a.createdNodes.length>0;){var c=a.createdNodes.shift();j.apply(b.view.addDiyDom,[b.treeId,c]);b.callback.onNodeCreated&&b.treeObj.trigger(e.event.NODECREATED,
[b.treeId,c])}},createNodes:function(b,a,c,d){if(c&&c.length!=0){var f=i.getRoot(b),g=b.data.key.children,g=!d||d.open||!!k("#"+d[g][0].tId).get(0);f.createdNodes=[];a=h.appendNodes(b,a,c,d,!0,g);d?(d=k("#"+d.tId+e.id.UL),d.get(0)&&d.append(a.join(""))):b.treeObj.append(a.join(""));h.createNodeCallback(b)}},expandCollapseNode:function(b,a,c,d,f){var g=i.getRoot(b),l=b.data.key.children;if(a){if(g.expandTriggerFlag){var J=f,f=function(){J&&J();a.open?b.treeObj.trigger(e.event.EXPAND,[b.treeId,a]):
b.treeObj.trigger(e.event.COLLAPSE,[b.treeId,a])};g.expandTriggerFlag=!1}if(a.open==c)j.apply(f,[]);else{if(!a.open&&a.isParent&&(!k("#"+a.tId+e.id.UL).get(0)||a[l]&&a[l].length>0&&!k("#"+a[l][0].tId).get(0)))h.appendParentULDom(b,a),h.createNodeCallback(b);var c=k("#"+a.tId+e.id.UL),g=k("#"+a.tId+e.id.SWITCH),m=k("#"+a.tId+e.id.ICON);a.isParent?(a.open=!a.open,a.iconOpen&&a.iconClose&&m.attr("style",h.makeNodeIcoStyle(b,a)),a.open?(h.replaceSwitchClass(a,g,e.folder.OPEN),h.replaceIcoClass(a,m,e.folder.OPEN),
d==!1||b.view.expandSpeed==""?(c.show(),j.apply(f,[])):a[l]&&a[l].length>0?c.slideDown(b.view.expandSpeed,f):(c.show(),j.apply(f,[]))):(h.replaceSwitchClass(a,g,e.folder.CLOSE),h.replaceIcoClass(a,m,e.folder.CLOSE),d==!1||b.view.expandSpeed==""||!(a[l]&&a[l].length>0)?(c.hide(),j.apply(f,[])):c.slideUp(b.view.expandSpeed,f))):j.apply(f,[])}}else j.apply(f,[])},expandCollapseParentNode:function(b,a,c,d,f){a&&(a.parentTId?(h.expandCollapseNode(b,a,c,d),a.parentTId&&h.expandCollapseParentNode(b,a.getParentNode(),
c,d,f)):h.expandCollapseNode(b,a,c,d,f))},expandCollapseSonNode:function(b,a,c,d,f){var g=i.getRoot(b),e=b.data.key.children,g=a?a[e]:g[e],e=a?!1:d,j=i.getRoot(b).expandTriggerFlag;i.getRoot(b).expandTriggerFlag=!1;if(g)for(var k=0,n=g.length;k<n;k++)g[k]&&h.expandCollapseSonNode(b,g[k],c,e);i.getRoot(b).expandTriggerFlag=j;h.expandCollapseNode(b,a,c,d,f)},makeDOMNodeIcon:function(b,a,c){var d=a.data.key.name,d=a.view.nameIsHTML?c[d]:c[d].replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
b.push("<span id='",c.tId,e.id.ICON,"' title='' treeNode",e.id.ICON," class='",h.makeNodeIcoClass(a,c),"' style='",h.makeNodeIcoStyle(a,c),"'></span><span id='",c.tId,e.id.SPAN,"'>",d,"</span>")},makeDOMNodeLine:function(b,a,c){b.push("<span id='",c.tId,e.id.SWITCH,"' title='' class='",h.makeNodeLineClass(a,c),"' treeNode",e.id.SWITCH,"></span>")},makeDOMNodeMainAfter:function(b){b.push("</li>")},makeDOMNodeMainBefore:function(b,a,c){b.push("<li id='",c.tId,"' class='level",c.level,"' tabindex='0' hidefocus='true' treenode>")},
makeDOMNodeNameAfter:function(b){b.push("</a>")},makeDOMNodeNameBefore:function(b,a,c){var d=i.getTitleKey(a),f=h.makeNodeUrl(a,c),g=h.makeNodeFontCss(a,c),l=[],k;for(k in g)l.push(k,":",g[k],";");b.push("<a id='",c.tId,e.id.A,"' class='level",c.level,"' treeNode",e.id.A,' onclick="',c.click||"",'" ',f!=null&&f.length>0?"href='"+f+"'":""," target='",h.makeNodeTarget(c),"' style='",l.join(""),"'");j.apply(a.view.showTitle,[a.treeId,c],a.view.showTitle)&&c[d]&&b.push("title='",c[d].replace(/'/g,"&#39;").replace(/</g,
"&lt;").replace(/>/g,"&gt;"),"'");b.push(">")},makeNodeFontCss:function(b,a){var c=j.apply(b.view.fontCss,[b.treeId,a],b.view.fontCss);return c&&typeof c!="function"?c:{}},makeNodeIcoClass:function(b,a){var c=["ico"];a.isAjaxing||(c[0]=(a.iconSkin?a.iconSkin+"_":"")+c[0],a.isParent?c.push(a.open?e.folder.OPEN:e.folder.CLOSE):c.push(e.folder.DOCU));return"button "+c.join("_")},makeNodeIcoStyle:function(b,a){var c=[];if(!a.isAjaxing){var d=a.isParent&&a.iconOpen&&a.iconClose?a.open?a.iconOpen:a.iconClose:
a.icon;d&&c.push("background:url(",d,") 0 0 no-repeat;");(b.view.showIcon==!1||!j.apply(b.view.showIcon,[b.treeId,a],!0))&&c.push("width:0px;height:0px;")}return c.join("")},makeNodeLineClass:function(b,a){var c=[];b.view.showLine?a.level==0&&a.isFirstNode&&a.isLastNode?c.push(e.line.ROOT):a.level==0&&a.isFirstNode?c.push(e.line.ROOTS):a.isLastNode?c.push(e.line.BOTTOM):c.push(e.line.CENTER):c.push(e.line.NOLINE);a.isParent?c.push(a.open?e.folder.OPEN:e.folder.CLOSE):c.push(e.folder.DOCU);return h.makeNodeLineClassEx(a)+
c.join("_")},makeNodeLineClassEx:function(b){return"button level"+b.level+" switch "},makeNodeTarget:function(b){return b.target||"_blank"},makeNodeUrl:function(b,a){var c=b.data.key.url;return a[c]?a[c]:null},makeUlHtml:function(b,a,c,d){c.push("<ul id='",a.tId,e.id.UL,"' class='level",a.level," ",h.makeUlLineClass(b,a),"' style='display:",a.open?"block":"none","'>");c.push(d);c.push("</ul>")},makeUlLineClass:function(b,a){return b.view.showLine&&!a.isLastNode?e.line.LINE:""},removeChildNodes:function(b,
a){if(a){var c=b.data.key.children,d=a[c];if(d){for(var f=0,g=d.length;f<g;f++)i.removeNodeCache(b,d[f]);i.removeSelectedNode(b);delete a[c];b.data.keep.parent?k("#"+a.tId+e.id.UL).empty():(a.isParent=!1,a.open=!1,c=k("#"+a.tId+e.id.SWITCH),d=k("#"+a.tId+e.id.ICON),h.replaceSwitchClass(a,c,e.folder.DOCU),h.replaceIcoClass(a,d,e.folder.DOCU),k("#"+a.tId+e.id.UL).remove())}}},setFirstNode:function(b,a){var c=b.data.key.children;if(a[c].length>0)a[c][0].isFirstNode=!0},setLastNode:function(b,a){var c=
b.data.key.children,d=a[c].length;if(d>0)a[c][d-1].isLastNode=!0},removeNode:function(b,a){var c=i.getRoot(b),d=b.data.key.children,f=a.parentTId?a.getParentNode():c;a.isFirstNode=!1;a.isLastNode=!1;a.getPreNode=function(){return null};a.getNextNode=function(){return null};k("#"+a.tId).remove();i.removeNodeCache(b,a);i.removeSelectedNode(b,a);for(var g=0,l=f[d].length;g<l;g++)if(f[d][g].tId==a.tId){f[d].splice(g,1);break}h.setFirstNode(b,f);h.setLastNode(b,f);var j,g=f[d].length;if(!b.data.keep.parent&&
g==0)f.isParent=!1,f.open=!1,g=k("#"+f.tId+e.id.UL),l=k("#"+f.tId+e.id.SWITCH),j=k("#"+f.tId+e.id.ICON),h.replaceSwitchClass(f,l,e.folder.DOCU),h.replaceIcoClass(f,j,e.folder.DOCU),g.css("display","none");else if(b.view.showLine&&g>0){var m=f[d][g-1],g=k("#"+m.tId+e.id.UL),l=k("#"+m.tId+e.id.SWITCH);j=k("#"+m.tId+e.id.ICON);f==c?f[d].length==1?h.replaceSwitchClass(m,l,e.line.ROOT):(c=k("#"+f[d][0].tId+e.id.SWITCH),h.replaceSwitchClass(f[d][0],c,e.line.ROOTS),h.replaceSwitchClass(m,l,e.line.BOTTOM)):
h.replaceSwitchClass(m,l,e.line.BOTTOM);g.removeClass(e.line.LINE)}},replaceIcoClass:function(b,a,c){if(a&&!b.isAjaxing&&(b=a.attr("class"),b!=void 0)){b=b.split("_");switch(c){case e.folder.OPEN:case e.folder.CLOSE:case e.folder.DOCU:b[b.length-1]=c}a.attr("class",b.join("_"))}},replaceSwitchClass:function(b,a,c){if(a){var d=a.attr("class");if(d!=void 0){d=d.split("_");switch(c){case e.line.ROOT:case e.line.ROOTS:case e.line.CENTER:case e.line.BOTTOM:case e.line.NOLINE:d[0]=h.makeNodeLineClassEx(b)+
c;break;case e.folder.OPEN:case e.folder.CLOSE:case e.folder.DOCU:d[1]=c}a.attr("class",d.join("_"));c!==e.folder.DOCU?a.removeAttr("disabled"):a.attr("disabled","disabled")}}},selectNode:function(b,a,c){c||h.cancelPreSelectedNode(b);k("#"+a.tId+e.id.A).addClass(e.node.CURSELECTED);i.addSelectedNode(b,a)},setNodeFontCss:function(b,a){var c=k("#"+a.tId+e.id.A),d=h.makeNodeFontCss(b,a);d&&c.css(d)},setNodeLineIcos:function(b,a){if(a){var c=k("#"+a.tId+e.id.SWITCH),d=k("#"+a.tId+e.id.UL),f=k("#"+a.tId+
e.id.ICON),g=h.makeUlLineClass(b,a);g.length==0?d.removeClass(e.line.LINE):d.addClass(g);c.attr("class",h.makeNodeLineClass(b,a));a.isParent?c.removeAttr("disabled"):c.attr("disabled","disabled");f.removeAttr("style");f.attr("style",h.makeNodeIcoStyle(b,a));f.attr("class",h.makeNodeIcoClass(b,a))}},setNodeName:function(b,a){var c=b.data.key.name,d=i.getTitleKey(b),f=k("#"+a.tId+e.id.SPAN);f.empty();b.view.nameIsHTML?f.html(a[c]):f.text(a[c]);j.apply(b.view.showTitle,[b.treeId,a],b.view.showTitle)&&
k("#"+a.tId+e.id.A).attr("title",!a[d]?"":a[d])},setNodeTarget:function(b){k("#"+b.tId+e.id.A).attr("target",h.makeNodeTarget(b))},setNodeUrl:function(b,a){var c=k("#"+a.tId+e.id.A),d=h.makeNodeUrl(b,a);d==null||d.length==0?c.removeAttr("href"):c.attr("href",d)},switchNode:function(b,a){a.open||!j.canAsync(b,a)?h.expandCollapseNode(b,a,!a.open):b.async.enable?h.asyncNode(b,a)||h.expandCollapseNode(b,a,!a.open):a&&h.expandCollapseNode(b,a,!a.open)}};k.fn.zTree={consts:{event:{NODECREATED:"ztree_nodeCreated",
CLICK:"ztree_click",EXPAND:"ztree_expand",COLLAPSE:"ztree_collapse",ASYNC_SUCCESS:"ztree_async_success",ASYNC_ERROR:"ztree_async_error"},id:{A:"_a",ICON:"_ico",SPAN:"_span",SWITCH:"_switch",UL:"_ul"},line:{ROOT:"root",ROOTS:"roots",CENTER:"center",BOTTOM:"bottom",NOLINE:"noline",LINE:"line"},folder:{OPEN:"open",CLOSE:"close",DOCU:"docu"},node:{CURSELECTED:"curSelectedNode"}},_z:{tools:j,view:h,event:n,data:i},getZTreeObj:function(b){return(b=i.getZTreeTools(b))?b:null},init:function(b,a,c){var d=
j.clone(I);k.extend(!0,d,a);d.treeId=b.attr("id");d.treeObj=b;d.treeObj.empty();p[d.treeId]=d;if(k.browser.msie&&parseInt(k.browser.version)<7)d.view.expandSpeed="";i.initRoot(d);b=i.getRoot(d);a=d.data.key.children;c=c?j.clone(j.isArray(c)?c:[c]):[];b[a]=d.data.simpleData.enable?i.transformTozTreeFormat(d,c):c;i.initCache(d);n.bindTree(d);n.bindEvent(d);c={setting:d,addNodes:function(a,b,c){function e(){h.addNodes(d,a,i,c==!0)}if(!b)return null;a||(a=null);if(a&&!a.isParent&&d.data.keep.leaf)return null;
var i=j.clone(j.isArray(b)?b:[b]);j.canAsync(d,a)?h.asyncNode(d,a,c,e):e();return i},cancelSelectedNode:function(a){h.cancelPreSelectedNode(this.setting,a)},expandAll:function(a){a=!!a;h.expandCollapseSonNode(this.setting,null,a,!0);return a},expandNode:function(a,b,c,e,m){if(!a||!a.isParent)return null;b!==!0&&b!==!1&&(b=!a.open);if((m=!!m)&&b&&j.apply(d.callback.beforeExpand,[d.treeId,a],!0)==!1)return null;else if(m&&!b&&j.apply(d.callback.beforeCollapse,[d.treeId,a],!0)==!1)return null;b&&a.parentTId&&
h.expandCollapseParentNode(this.setting,a.getParentNode(),b,!1);if(b===a.open&&!c)return null;i.getRoot(d).expandTriggerFlag=m;c?h.expandCollapseSonNode(this.setting,a,b,!0,function(){e!==!1&&k("#"+a.tId).focus().blur()}):(a.open=!b,h.switchNode(this.setting,a),e!==!1&&k("#"+a.tId).focus().blur());return b},getNodes:function(){return i.getNodes(this.setting)},getNodeByParam:function(a,b,c){return!a?null:i.getNodeByParam(this.setting,c?c[this.setting.data.key.children]:i.getNodes(this.setting),a,b)},
getNodeByTId:function(a){return i.getNodeCache(this.setting,a)},getNodesByParam:function(a,b,c){return!a?null:i.getNodesByParam(this.setting,c?c[this.setting.data.key.children]:i.getNodes(this.setting),a,b)},getNodesByParamFuzzy:function(a,b,c){return!a?null:i.getNodesByParamFuzzy(this.setting,c?c[this.setting.data.key.children]:i.getNodes(this.setting),a,b)},getNodesByFilter:function(a,b,c,d){b=!!b;return!a||typeof a!="function"?b?null:[]:i.getNodesByFilter(this.setting,c?c[this.setting.data.key.children]:
i.getNodes(this.setting),a,b,d)},getNodeIndex:function(a){if(!a)return null;for(var b=d.data.key.children,c=a.parentTId?a.getParentNode():i.getRoot(this.setting),e=0,h=c[b].length;e<h;e++)if(c[b][e]==a)return e;return-1},getSelectedNodes:function(){for(var a=[],b=i.getRoot(this.setting).curSelectedList,c=0,d=b.length;c<d;c++)a.push(b[c]);return a},isSelectedNode:function(a){return i.isSelectedNode(this.setting,a)},reAsyncChildNodes:function(a,b,c){if(this.setting.async.enable){var d=!a;d&&(a=i.getRoot(this.setting));
b=="refresh"&&(a[this.setting.data.key.children]=[],d?this.setting.treeObj.empty():k("#"+a.tId+e.id.UL).empty());h.asyncNode(this.setting,d?null:a,!!c)}},refresh:function(){this.setting.treeObj.empty();var a=i.getRoot(this.setting),b=a[this.setting.data.key.children];i.initRoot(this.setting);a[this.setting.data.key.children]=b;i.initCache(this.setting);h.createNodes(this.setting,0,a[this.setting.data.key.children])},removeChildNodes:function(a){if(!a)return null;var b=a[d.data.key.children];h.removeChildNodes(d,
a);return b?b:null},removeNode:function(a,b){a&&(b=!!b,b&&j.apply(d.callback.beforeRemove,[d.treeId,a],!0)==!1||(h.removeNode(d,a),b&&this.setting.treeObj.trigger(e.event.REMOVE,[d.treeId,a])))},selectNode:function(a,b){a&&j.uCanDo(this.setting)&&(b=d.view.selectedMulti&&b,a.parentTId?h.expandCollapseParentNode(this.setting,a.getParentNode(),!0,!1,function(){k("#"+a.tId).focus().blur()}):k("#"+a.tId).focus().blur(),h.selectNode(this.setting,a,b))},transformTozTreeNodes:function(a){return i.transformTozTreeFormat(this.setting,
a)},transformToArray:function(a){return i.transformToArrayFormat(this.setting,a)},updateNode:function(a){a&&k("#"+a.tId).get(0)&&j.uCanDo(this.setting)&&(h.setNodeName(this.setting,a),h.setNodeTarget(a),h.setNodeUrl(this.setting,a),h.setNodeLineIcos(this.setting,a),h.setNodeFontCss(this.setting,a))}};b.treeTools=c;i.setZTreeTools(d,c);b[a]&&b[a].length>0?h.createNodes(d,0,b[a]):d.async.enable&&d.async.url&&d.async.url!==""&&h.asyncNode(d);return c}};var K=k.fn.zTree,e=K.consts},

/*
 * JQuery zTree excheck 3.3
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2012-07-16
 */
function(j){var p,q,r,o={event:{CHECK:"ztree_check"},id:{CHECK:"_check"},checkbox:{STYLE:"checkbox",DEFAULT:"chk",DISABLED:"disable",FALSE:"false",TRUE:"true",FULL:"full",PART:"part",FOCUS:"focus"},radio:{STYLE:"radio",TYPE_ALL:"all",TYPE_LEVEL:"level"}},u={check:{enable:!1,autoCheckTrigger:!1,chkStyle:o.checkbox.STYLE,nocheckInherit:!1,radioType:o.radio.TYPE_LEVEL,chkboxType:{Y:"ps",N:"ps"}},data:{key:{checked:"checked"}},callback:{beforeCheck:null,onCheck:null}};p=function(c,a){if(a.chkDisabled===
!0)return!1;var b=g.getSetting(c.data.treeId),d=b.data.key.checked;if(n.apply(b.callback.beforeCheck,[b.treeId,a],!0)==!1)return!0;a[d]=!a[d];e.checkNodeRelation(b,a);d=j("#"+a.tId+i.id.CHECK);e.setChkClass(b,d,a);e.repairParentChkClassWithSelf(b,a);b.treeObj.trigger(i.event.CHECK,[b.treeId,a]);return!0};q=function(c,a){if(a.chkDisabled===!0)return!1;var b=g.getSetting(c.data.treeId),d=j("#"+a.tId+i.id.CHECK);a.check_Focus=!0;e.setChkClass(b,d,a);return!0};r=function(c,a){if(a.chkDisabled===!0)return!1;
var b=g.getSetting(c.data.treeId),d=j("#"+a.tId+i.id.CHECK);a.check_Focus=!1;e.setChkClass(b,d,a);return!0};j.extend(!0,j.fn.zTree.consts,o);j.extend(!0,j.fn.zTree._z,{tools:{},view:{checkNodeRelation:function(c,a){var b,d,f,k=c.data.key.children,m=c.data.key.checked;b=i.radio;if(c.check.chkStyle==b.STYLE){var h=g.getRadioCheckedList(c);if(a[m])if(c.check.radioType==b.TYPE_ALL){for(d=h.length-1;d>=0;d--)b=h[d],b[m]=!1,h.splice(d,1),e.setChkClass(c,j("#"+b.tId+i.id.CHECK),b),b.parentTId!=a.parentTId&&
e.repairParentChkClassWithSelf(c,b);h.push(a)}else{h=a.parentTId?a.getParentNode():g.getRoot(c);for(d=0,f=h[k].length;d<f;d++)b=h[k][d],b[m]&&b!=a&&(b[m]=!1,e.setChkClass(c,j("#"+b.tId+i.id.CHECK),b))}else if(c.check.radioType==b.TYPE_ALL)for(d=0,f=h.length;d<f;d++)if(a==h[d]){h.splice(d,1);break}}else a[m]&&(!a[k]||a[k].length==0||c.check.chkboxType.Y.indexOf("s")>-1)&&e.setSonNodeCheckBox(c,a,!0),!a[m]&&(!a[k]||a[k].length==0||c.check.chkboxType.N.indexOf("s")>-1)&&e.setSonNodeCheckBox(c,a,!1),
a[m]&&c.check.chkboxType.Y.indexOf("p")>-1&&e.setParentNodeCheckBox(c,a,!0),!a[m]&&c.check.chkboxType.N.indexOf("p")>-1&&e.setParentNodeCheckBox(c,a,!1)},makeChkClass:function(c,a){var b=c.data.key.checked,d=i.checkbox,f=i.radio,k="",k=a.chkDisabled===!0?d.DISABLED:a.halfCheck?d.PART:c.check.chkStyle==f.STYLE?a.check_Child_State<1?d.FULL:d.PART:a[b]?a.check_Child_State===2||a.check_Child_State===-1?d.FULL:d.PART:a.check_Child_State<1?d.FULL:d.PART,b=c.check.chkStyle+"_"+(a[b]?d.TRUE:d.FALSE)+"_"+
k,b=a.check_Focus&&a.chkDisabled!==!0?b+"_"+d.FOCUS:b;return"button "+d.DEFAULT+" "+b},repairAllChk:function(c,a){if(c.check.enable&&c.check.chkStyle===i.checkbox.STYLE)for(var b=c.data.key.checked,d=c.data.key.children,f=g.getRoot(c),k=0,m=f[d].length;k<m;k++){var h=f[d][k];h.nocheck!==!0&&(h[b]=a);e.setSonNodeCheckBox(c,h,a)}},repairChkClass:function(c,a){if(a){g.makeChkFlag(c,a);var b=j("#"+a.tId+i.id.CHECK);e.setChkClass(c,b,a)}},repairParentChkClass:function(c,a){if(a&&a.parentTId){var b=a.getParentNode();
e.repairChkClass(c,b);e.repairParentChkClass(c,b)}},repairParentChkClassWithSelf:function(c,a){if(a){var b=c.data.key.children;a[b]&&a[b].length>0?e.repairParentChkClass(c,a[b][0]):e.repairParentChkClass(c,a)}},repairSonChkDisabled:function(c,a,b){if(a){var d=c.data.key.children;if(a.chkDisabled!=b)a.chkDisabled=b,a.nocheck!==!0&&e.repairChkClass(c,a);if(a[d])for(var f=0,k=a[d].length;f<k;f++)e.repairSonChkDisabled(c,a[d][f],b)}},repairParentChkDisabled:function(c,a,b){if(a){if(a.chkDisabled!=b)a.chkDisabled=
b,a.nocheck!==!0&&e.repairChkClass(c,a);e.repairParentChkDisabled(c,a.getParentNode(),b)}},setChkClass:function(c,a,b){a&&(b.nocheck===!0?a.hide():a.show(),a.removeClass(),a.addClass(e.makeChkClass(c,b)))},setParentNodeCheckBox:function(c,a,b,d){var f=c.data.key.children,k=c.data.key.checked,m=j("#"+a.tId+i.id.CHECK);d||(d=a);g.makeChkFlag(c,a);a.nocheck!==!0&&a.chkDisabled!==!0&&(a[k]=b,e.setChkClass(c,m,a),c.check.autoCheckTrigger&&a!=d&&a.nocheck!==!0&&c.treeObj.trigger(i.event.CHECK,[c.treeId,
a]));if(a.parentTId){m=!0;if(!b)for(var f=a.getParentNode()[f],h=0,l=f.length;h<l;h++)if(f[h].nocheck!==!0&&f[h][k]||f[h].nocheck===!0&&f[h].check_Child_State>0){m=!1;break}m&&e.setParentNodeCheckBox(c,a.getParentNode(),b,d)}},setSonNodeCheckBox:function(c,a,b,d){if(a){var f=c.data.key.children,k=c.data.key.checked,m=j("#"+a.tId+i.id.CHECK);d||(d=a);var h=!1;if(a[f])for(var l=0,n=a[f].length;l<n&&a.chkDisabled!==!0;l++){var o=a[f][l];e.setSonNodeCheckBox(c,o,b,d);o.chkDisabled===!0&&(h=!0)}if(a!=
g.getRoot(c)&&a.chkDisabled!==!0){h&&a.nocheck!==!0&&g.makeChkFlag(c,a);if(a.nocheck!==!0){if(a[k]=b,!h)a.check_Child_State=a[f]&&a[f].length>0?b?2:0:-1}else a.check_Child_State=-1;e.setChkClass(c,m,a);c.check.autoCheckTrigger&&a!=d&&a.nocheck!==!0&&c.treeObj.trigger(i.event.CHECK,[c.treeId,a])}}}},event:{},data:{getRadioCheckedList:function(c){for(var a=g.getRoot(c).radioCheckedList,b=0,d=a.length;b<d;b++)g.getNodeCache(c,a[b].tId)||(a.splice(b,1),b--,d--);return a},getCheckStatus:function(c,a){if(!c.check.enable||
a.nocheck)return null;var b=c.data.key.checked;return{checked:a[b],half:a.halfCheck?a.halfCheck:c.check.chkStyle==i.radio.STYLE?a.check_Child_State===2:a[b]?a.check_Child_State>-1&&a.check_Child_State<2:a.check_Child_State>0}},getTreeCheckedNodes:function(c,a,b,d){if(!a)return[];for(var f=c.data.key.children,k=c.data.key.checked,e=b&&c.check.chkStyle==i.radio.STYLE&&c.check.radioType==i.radio.TYPE_ALL,d=!d?[]:d,h=0,l=a.length;h<l;h++){if(a[h].nocheck!==!0&&a[h][k]==b&&(d.push(a[h]),e))break;g.getTreeCheckedNodes(c,
a[h][f],b,d);if(e&&d.length>0)break}return d},getTreeChangeCheckedNodes:function(c,a,b){if(!a)return[];for(var d=c.data.key.children,f=c.data.key.checked,b=!b?[]:b,e=0,i=a.length;e<i;e++)a[e].nocheck!==!0&&a[e][f]!=a[e].checkedOld&&b.push(a[e]),g.getTreeChangeCheckedNodes(c,a[e][d],b);return b},makeChkFlag:function(c,a){if(a){var b=c.data.key.children,d=c.data.key.checked,f=-1;if(a[b])for(var e=!1,g=0,h=a[b].length;g<h;g++){var l=a[b][g],j=-1;if(c.check.chkStyle==i.radio.STYLE)if(j=l.nocheck===!0?
l.check_Child_State:l.halfCheck===!0?2:l.nocheck!==!0&&l[d]?2:l.check_Child_State>0?2:0,j==2){f=2;break}else j==0&&(f=0);else if(c.check.chkStyle==i.checkbox.STYLE){j=l.nocheck===!0?l.check_Child_State:l.halfCheck===!0?1:l.nocheck!==!0&&l[d]?l.check_Child_State===-1||l.check_Child_State===2?2:1:l.check_Child_State>0?1:0;if(j===1){f=1;break}else if(j===2&&e&&j!==f){f=1;break}else if(f===2&&j>-1&&j<2){f=1;break}else j>-1&&(f=j);e||(e=l.nocheck!==!0)}}a.check_Child_State=f}}}});var o=j.fn.zTree,n=o._z.tools,
i=o.consts,e=o._z.view,g=o._z.data;g.exSetting(u);g.addInitBind(function(c){var a=c.treeObj,b=i.event;a.unbind(b.CHECK);a.bind(b.CHECK,function(a,b,e){n.apply(c.callback.onCheck,[a,b,e])})});g.addInitCache(function(){});g.addInitNode(function(c,a,b,d,e,i){if(b){a=c.data.key.checked;typeof b[a]=="string"&&(b[a]=n.eqs(b[a],"true"));b[a]=!!b[a];b.checkedOld=b[a];b.nocheck=!!b.nocheck||c.check.nocheckInherit&&d&&!!d.nocheck;b.chkDisabled=!!b.chkDisabled||d&&!!d.chkDisabled;if(typeof b.halfCheck=="string")b.halfCheck=
n.eqs(b.halfCheck,"true");b.halfCheck=!!b.halfCheck;b.check_Child_State=-1;b.check_Focus=!1;b.getCheckStatus=function(){return g.getCheckStatus(c,b)};i&&g.makeChkFlag(c,d)}});g.addInitProxy(function(c){var a=c.target,b=g.getSetting(c.data.treeId),d="",e=null,k="",j=null;if(n.eqs(c.type,"mouseover")){if(b.check.enable&&n.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+i.id.CHECK)!==null)d=a.parentNode.id,k="mouseoverCheck"}else if(n.eqs(c.type,"mouseout")){if(b.check.enable&&n.eqs(a.tagName,"span")&&
a.getAttribute("treeNode"+i.id.CHECK)!==null)d=a.parentNode.id,k="mouseoutCheck"}else if(n.eqs(c.type,"click")&&b.check.enable&&n.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+i.id.CHECK)!==null)d=a.parentNode.id,k="checkNode";if(d.length>0)switch(e=g.getNodeCache(b,d),k){case "checkNode":j=p;break;case "mouseoverCheck":j=q;break;case "mouseoutCheck":j=r}return{stop:!1,node:e,nodeEventType:k,nodeEventCallback:j,treeEventType:"",treeEventCallback:null}});g.addInitRoot(function(c){g.getRoot(c).radioCheckedList=
[]});g.addBeforeA(function(c,a,b){var d=c.data.key.checked;c.check.enable&&(g.makeChkFlag(c,a),c.check.chkStyle==i.radio.STYLE&&c.check.radioType==i.radio.TYPE_ALL&&a[d]&&g.getRoot(c).radioCheckedList.push(a),b.push("<span ID='",a.tId,i.id.CHECK,"' class='",e.makeChkClass(c,a),"' treeNode",i.id.CHECK,a.nocheck===!0?" style='display:none;'":"","></span>"))});g.addZTreeTools(function(c,a){a.checkNode=function(a,b,g,m){var h=this.setting.data.key.checked;if(a.chkDisabled!==!0&&(b!==!0&&b!==!1&&(b=!a[h]),
m=!!m,(a[h]!==b||g)&&!(m&&n.apply(this.setting.callback.beforeCheck,[this.setting.treeId,a],!0)==!1)&&n.uCanDo(this.setting)&&this.setting.check.enable&&a.nocheck!==!0))a[h]=b,b=j("#"+a.tId+i.id.CHECK),(g||this.setting.check.chkStyle===i.radio.STYLE)&&e.checkNodeRelation(this.setting,a),e.setChkClass(this.setting,b,a),e.repairParentChkClassWithSelf(this.setting,a),m&&c.treeObj.trigger(i.event.CHECK,[c.treeId,a])};a.checkAllNodes=function(a){e.repairAllChk(this.setting,!!a)};a.getCheckedNodes=function(a){var b=
this.setting.data.key.children;return g.getTreeCheckedNodes(this.setting,g.getRoot(c)[b],a!==!1)};a.getChangeCheckedNodes=function(){var a=this.setting.data.key.children;return g.getTreeChangeCheckedNodes(this.setting,g.getRoot(c)[a])};a.setChkDisabled=function(a,b){b=!!b;e.repairSonChkDisabled(this.setting,a,b);b||e.repairParentChkDisabled(this.setting,a,b)};var b=a.updateNode;a.updateNode=function(c,f){b&&b.apply(a,arguments);if(c&&this.setting.check.enable&&j("#"+c.tId).get(0)&&n.uCanDo(this.setting)){var g=
j("#"+c.tId+i.id.CHECK);(f==!0||this.setting.check.chkStyle===i.radio.STYLE)&&e.checkNodeRelation(this.setting,c);e.setChkClass(this.setting,g,c);e.repairParentChkClassWithSelf(this.setting,c)}}});var s=e.createNodes;e.createNodes=function(c,a,b,d){s&&s.apply(e,arguments);b&&e.repairParentChkClassWithSelf(c,d)};var t=e.removeNode;e.removeNode=function(c,a){var b=a.getParentNode();t&&t.apply(e,arguments);a&&b&&(e.repairChkClass(c,b),e.repairParentChkClass(c,b))}},

/*
 * JQuery zTree exedit 3.3
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2012-07-16
 */
function(k){var F={event:{DRAG:"ztree_drag",DROP:"ztree_drop",REMOVE:"ztree_remove",RENAME:"ztree_rename"},id:{EDIT:"_edit",INPUT:"_input",REMOVE:"_remove"},move:{TYPE_INNER:"inner",TYPE_PREV:"prev",TYPE_NEXT:"next"},node:{CURSELECTED_EDIT:"curSelectedNode_Edit",TMPTARGET_TREE:"tmpTargetzTree",TMPTARGET_NODE:"tmpTargetNode"}},D={onHoverOverNode:function(b,a){var c=p.getSetting(b.data.treeId),d=p.getRoot(c);if(d.curHoverNode!=a)D.onHoverOutNode(b);d.curHoverNode=a;f.addHoverDom(c,a)},onHoverOutNode:function(b){var b=
p.getSetting(b.data.treeId),a=p.getRoot(b);if(a.curHoverNode&&!p.isSelectedNode(b,a.curHoverNode))f.removeTreeDom(b,a.curHoverNode),a.curHoverNode=null},onMousedownNode:function(b,a){function c(b){if(z.dragFlag==0&&Math.abs(K-b.clientX)<g.edit.drag.minMoveSize&&Math.abs(L-b.clientY)<g.edit.drag.minMoveSize)return!0;var a,c,e,j,l;l=g.data.key.children;h.noSel(g);k("body").css("cursor","pointer");if(z.dragFlag==0){if(h.apply(g.callback.beforeDrag,[g.treeId,m],!0)==!1)return q(b),!0;for(a=0,c=m.length;a<
c;a++){if(a==0)z.dragNodeShowBefore=[];e=m[a];e.isParent&&e.open?(f.expandCollapseNode(g,e,!e.open),z.dragNodeShowBefore[e.tId]=!0):z.dragNodeShowBefore[e.tId]=!1}z.dragFlag=1;z.showHoverDom=!1;h.showIfameMask(g,!0);e=!0;j=-1;if(m.length>1){var s=m[0].parentTId?m[0].getParentNode()[l]:p.getNodes(g);l=[];for(a=0,c=s.length;a<c;a++)if(z.dragNodeShowBefore[s[a].tId]!==void 0&&(e&&j>-1&&j+1!==a&&(e=!1),l.push(s[a]),j=a),m.length===l.length){m=l;break}}e&&(D=m[0].getPreNode(),E=m[m.length-1].getNextNode());
y=k("<ul class='zTreeDragUL'></ul>");for(a=0,c=m.length;a<c;a++)if(e=m[a],e.editNameFlag=!1,f.selectNode(g,e,a>0),f.removeTreeDom(g,e),j=k("<li id='"+e.tId+"_tmp'></li>"),j.append(k("#"+e.tId+d.id.A).clone()),j.css("padding","0"),j.children("#"+e.tId+d.id.A).removeClass(d.node.CURSELECTED),y.append(j),a==g.edit.drag.maxShowNodeNum-1){j=k("<li id='"+e.tId+"_moretmp'><a>  ...  </a></li>");y.append(j);break}y.attr("id",m[0].tId+d.id.UL+"_tmp");y.addClass(g.treeObj.attr("class"));y.appendTo("body");t=
k("<span class='tmpzTreeMove_arrow'></span>");t.attr("id","zTreeMove_arrow_tmp");t.appendTo("body");g.treeObj.trigger(d.event.DRAG,[b,g.treeId,m])}if(z.dragFlag==1){r&&t.attr("id")==b.target.id&&u&&b.clientX+x.scrollLeft()+2>k("#"+u+d.id.A,r).offset().left?(e=k("#"+u+d.id.A,r),b.target=e.length>0?e.get(0):b.target):r&&(r.removeClass(d.node.TMPTARGET_TREE),u&&k("#"+u+d.id.A,r).removeClass(d.node.TMPTARGET_NODE+"_"+d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE+"_"+F.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE+
"_"+F.move.TYPE_INNER));u=r=null;G=!1;i=g;e=p.getSettings();for(var B in e)if(e[B].treeId&&e[B].edit.enable&&e[B].treeId!=g.treeId&&(b.target.id==e[B].treeId||k(b.target).parents("#"+e[B].treeId).length>0))G=!0,i=e[B];B=x.scrollTop();j=x.scrollLeft();l=i.treeObj.offset();a=i.treeObj.get(0).scrollHeight;e=i.treeObj.get(0).scrollWidth;c=b.clientY+B-l.top;var o=i.treeObj.height()+l.top-b.clientY-B,n=b.clientX+j-l.left,H=i.treeObj.width()+l.left-b.clientX-j;l=c<g.edit.drag.borderMax&&c>g.edit.drag.borderMin;
var s=o<g.edit.drag.borderMax&&o>g.edit.drag.borderMin,I=n<g.edit.drag.borderMax&&n>g.edit.drag.borderMin,C=H<g.edit.drag.borderMax&&H>g.edit.drag.borderMin,o=c>g.edit.drag.borderMin&&o>g.edit.drag.borderMin&&n>g.edit.drag.borderMin&&H>g.edit.drag.borderMin,n=l&&i.treeObj.scrollTop()<=0,H=s&&i.treeObj.scrollTop()+i.treeObj.height()+10>=a,M=I&&i.treeObj.scrollLeft()<=0,N=C&&i.treeObj.scrollLeft()+i.treeObj.width()+10>=e;if(b.target.id&&i.treeObj.find("#"+b.target.id).length>0){for(var A=b.target;A&&
A.tagName&&!h.eqs(A.tagName,"li")&&A.id!=i.treeId;)A=A.parentNode;var O=!0;for(a=0,c=m.length;a<c;a++)if(e=m[a],A.id===e.tId){O=!1;break}else if(k("#"+e.tId).find("#"+A.id).length>0){O=!1;break}if(O&&b.target.id&&(b.target.id==A.id+d.id.A||k(b.target).parents("#"+A.id+d.id.A).length>0))r=k(A),u=A.id}e=m[0];if(o&&(b.target.id==i.treeId||k(b.target).parents("#"+i.treeId).length>0)){if(!r&&(b.target.id==i.treeId||n||H||M||N)&&(G||!G&&e.parentTId))r=i.treeObj;l?i.treeObj.scrollTop(i.treeObj.scrollTop()-
10):s&&i.treeObj.scrollTop(i.treeObj.scrollTop()+10);I?i.treeObj.scrollLeft(i.treeObj.scrollLeft()-10):C&&i.treeObj.scrollLeft(i.treeObj.scrollLeft()+10);r&&r!=i.treeObj&&r.offset().left<i.treeObj.offset().left&&i.treeObj.scrollLeft(i.treeObj.scrollLeft()+r.offset().left-i.treeObj.offset().left)}y.css({top:b.clientY+B+3+"px",left:b.clientX+j+3+"px"});l=a=0;if(r&&r.attr("id")!=i.treeId){var w=u==null?null:p.getNodeCache(i,u);c=b.ctrlKey&&g.edit.drag.isMove&&g.edit.drag.isCopy||!g.edit.drag.isMove&&
g.edit.drag.isCopy;a=!!(D&&u===D.tId);l=!!(E&&u===E.tId);j=e.parentTId&&e.parentTId==u;e=(c||!l)&&h.apply(i.edit.drag.prev,[i.treeId,m,w],!!i.edit.drag.prev);a=(c||!a)&&h.apply(i.edit.drag.next,[i.treeId,m,w],!!i.edit.drag.next);C=(c||!j)&&!(i.data.keep.leaf&&!w.isParent)&&h.apply(i.edit.drag.inner,[i.treeId,m,w],!!i.edit.drag.inner);if(!e&&!a&&!C){if(r=null,u="",v=d.move.TYPE_INNER,t.css({display:"none"}),window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null}else{c=
k("#"+u+d.id.A,r);l=w.isLastNode?null:k("#"+w.getNextNode().tId+d.id.A,r.next());s=c.offset().top;j=c.offset().left;I=e?C?0.25:a?0.5:1:-1;C=a?C?0.75:e?0.5:0:-1;b=(b.clientY+B-s)/c.height();(I==1||b<=I&&b>=-0.2)&&e?(a=1-t.width(),l=s-t.height()/2,v=d.move.TYPE_PREV):(C==0||b>=C&&b<=1.2)&&a?(a=1-t.width(),l=l==null||w.isParent&&w.open?s+c.height()-t.height()/2:l.offset().top-t.height()/2,v=d.move.TYPE_NEXT):(a=5-t.width(),l=s,v=d.move.TYPE_INNER);t.css({display:"block",top:l+"px",left:j+a+"px"});c.addClass(d.node.TMPTARGET_NODE+
"_"+v);if(P!=u||Q!=v)J=(new Date).getTime();if(w&&w.isParent&&v==d.move.TYPE_INNER&&(b=!0,window.zTreeMoveTimer&&window.zTreeMoveTargetNodeTId!==w.tId?(clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null):window.zTreeMoveTimer&&window.zTreeMoveTargetNodeTId===w.tId&&(b=!1),b))window.zTreeMoveTimer=setTimeout(function(){v==d.move.TYPE_INNER&&w&&w.isParent&&!w.open&&(new Date).getTime()-J>i.edit.drag.autoOpenTime&&h.apply(i.callback.beforeDragOpen,[i.treeId,w],!0)&&(f.switchNode(i,
w),i.edit.drag.autoExpandTrigger&&i.treeObj.trigger(d.event.EXPAND,[i.treeId,w]))},i.edit.drag.autoOpenTime+50),window.zTreeMoveTargetNodeTId=w.tId}}else if(v=d.move.TYPE_INNER,r&&h.apply(i.edit.drag.inner,[i.treeId,m,null],!!i.edit.drag.inner)?r.addClass(d.node.TMPTARGET_TREE):r=null,t.css({display:"none"}),window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null;P=u;Q=v}return!1}function q(b){if(window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=
null;Q=P=null;x.unbind("mousemove",c);x.unbind("mouseup",q);x.unbind("selectstart",e);k("body").css("cursor","auto");r&&(r.removeClass(d.node.TMPTARGET_TREE),u&&k("#"+u+d.id.A,r).removeClass(d.node.TMPTARGET_NODE+"_"+d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE+"_"+F.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE+"_"+F.move.TYPE_INNER));h.showIfameMask(g,!1);z.showHoverDom=!0;if(z.dragFlag!=0){z.dragFlag=0;var a,l,j;for(a=0,l=m.length;a<l;a++)j=m[a],j.isParent&&z.dragNodeShowBefore[j.tId]&&
!j.open&&(f.expandCollapseNode(g,j,!j.open),delete z.dragNodeShowBefore[j.tId]);y&&y.remove();t&&t.remove();var o=b.ctrlKey&&g.edit.drag.isMove&&g.edit.drag.isCopy||!g.edit.drag.isMove&&g.edit.drag.isCopy;!o&&r&&u&&m[0].parentTId&&u==m[0].parentTId&&v==d.move.TYPE_INNER&&(r=null);if(r){var n=u==null?null:p.getNodeCache(i,u);if(h.apply(g.callback.beforeDrop,[i.treeId,m,n,v,o],!0)!=!1){var s=o?h.clone(m):m;a=function(){if(G){if(!o)for(var b=0,a=m.length;b<a;b++)f.removeNode(g,m[b]);if(v==d.move.TYPE_INNER)f.addNodes(i,
n,s);else if(f.addNodes(i,n.getParentNode(),s),v==d.move.TYPE_PREV)for(b=0,a=s.length;b<a;b++)f.moveNode(i,n,s[b],v,!1);else for(b=-1,a=s.length-1;b<a;a--)f.moveNode(i,n,s[a],v,!1)}else if(o&&v==d.move.TYPE_INNER)f.addNodes(i,n,s);else if(o&&f.addNodes(i,n.getParentNode(),s),v==d.move.TYPE_PREV)for(b=0,a=s.length;b<a;b++)f.moveNode(i,n,s[b],v,!1);else for(b=-1,a=s.length-1;b<a;a--)f.moveNode(i,n,s[a],v,!1);for(b=0,a=s.length;b<a;b++)f.selectNode(i,s[b],b>0);k("#"+s[0].tId).focus().blur()};v==d.move.TYPE_INNER&&
h.canAsync(i,n)?f.asyncNode(i,n,!1,a):a();g.treeObj.trigger(d.event.DROP,[b,i.treeId,s,n,v,o])}}else{for(a=0,l=m.length;a<l;a++)f.selectNode(i,m[a],a>0);g.treeObj.trigger(d.event.DROP,[b,g.treeId,m,null,null,null])}}}function e(){return!1}var l,j,g=p.getSetting(b.data.treeId),z=p.getRoot(g);if(b.button==2||!g.edit.enable||!g.edit.drag.isCopy&&!g.edit.drag.isMove)return!0;var o=b.target,n=p.getRoot(g).curSelectedList,m=[];if(p.isSelectedNode(g,a))for(l=0,j=n.length;l<j;l++){if(n[l].editNameFlag&&h.eqs(o.tagName,
"input")&&o.getAttribute("treeNode"+d.id.INPUT)!==null)return!0;m.push(n[l]);if(m[0].parentTId!==n[l].parentTId){m=[a];break}}else m=[a];f.editNodeBlur=!0;f.cancelCurEditNode(g,null,!0);var x=k(document),y,t,r,G=!1,i=g,D,E,P=null,Q=null,u=null,v=d.move.TYPE_INNER,K=b.clientX,L=b.clientY,J=(new Date).getTime();h.uCanDo(g)&&x.bind("mousemove",c);x.bind("mouseup",q);x.bind("selectstart",e);b.preventDefault&&b.preventDefault();return!0}};k.extend(!0,k.fn.zTree.consts,F);k.extend(!0,k.fn.zTree._z,{tools:{getAbs:function(b){b=
b.getBoundingClientRect();return[b.left,b.top]},inputFocus:function(b){b.get(0)&&(b.focus(),h.setCursorPosition(b.get(0),b.val().length))},inputSelect:function(b){b.get(0)&&(b.focus(),b.select())},setCursorPosition:function(b,a){if(b.setSelectionRange)b.focus(),b.setSelectionRange(a,a);else if(b.createTextRange){var c=b.createTextRange();c.collapse(!0);c.moveEnd("character",a);c.moveStart("character",a);c.select()}},showIfameMask:function(b,a){for(var c=p.getRoot(b);c.dragMaskList.length>0;)c.dragMaskList[0].remove(),
c.dragMaskList.shift();if(a)for(var d=k("iframe"),e=0,f=d.length;e<f;e++){var j=d.get(e),g=h.getAbs(j),j=k("<div id='zTreeMask_"+e+"' class='zTreeMask' style='top:"+g[1]+"px; left:"+g[0]+"px; width:"+j.offsetWidth+"px; height:"+j.offsetHeight+"px;'></div>");j.appendTo("body");c.dragMaskList.push(j)}}},view:{addEditBtn:function(b,a){if(!(a.editNameFlag||k("#"+a.tId+d.id.EDIT).length>0)&&h.apply(b.edit.showRenameBtn,[b.treeId,a],b.edit.showRenameBtn)){var c=k("#"+a.tId+d.id.A),q="<span class='button edit' id='"+
a.tId+d.id.EDIT+"' title='"+h.apply(b.edit.renameTitle,[b.treeId,a],b.edit.renameTitle)+"' treeNode"+d.id.EDIT+" style='display:none;'></span>";c.append(q);k("#"+a.tId+d.id.EDIT).bind("click",function(){if(!h.uCanDo(b)||h.apply(b.callback.beforeEditName,[b.treeId,a],!0)==!1)return!1;f.editNode(b,a);return!1}).show()}},addRemoveBtn:function(b,a){if(!(a.editNameFlag||k("#"+a.tId+d.id.REMOVE).length>0)&&h.apply(b.edit.showRemoveBtn,[b.treeId,a],b.edit.showRemoveBtn)){var c=k("#"+a.tId+d.id.A),q="<span class='button remove' id='"+
a.tId+d.id.REMOVE+"' title='"+h.apply(b.edit.removeTitle,[b.treeId,a],b.edit.removeTitle)+"' treeNode"+d.id.REMOVE+" style='display:none;'></span>";c.append(q);k("#"+a.tId+d.id.REMOVE).bind("click",function(){if(!h.uCanDo(b)||h.apply(b.callback.beforeRemove,[b.treeId,a],!0)==!1)return!1;f.removeNode(b,a);b.treeObj.trigger(d.event.REMOVE,[b.treeId,a]);return!1}).bind("mousedown",function(){return!0}).show()}},addHoverDom:function(b,a){if(p.getRoot(b).showHoverDom)a.isHover=!0,b.edit.enable&&(f.addEditBtn(b,
a),f.addRemoveBtn(b,a)),h.apply(b.view.addHoverDom,[b.treeId,a])},cancelCurEditNode:function(b,a){var c=p.getRoot(b),q=b.data.key.name,e=c.curEditNode;if(e){var l=c.curEditInput,j=a?a:l.val();if(!a&&h.apply(b.callback.beforeRename,[b.treeId,e,j],!0)===!1)return e.editNameFlag=!0,!1;else e[q]=j?j:l.val(),a||b.treeObj.trigger(d.event.RENAME,[b.treeId,e]);k("#"+e.tId+d.id.A).removeClass(d.node.CURSELECTED_EDIT);l.unbind();f.setNodeName(b,e);e.editNameFlag=!1;c.curEditNode=null;c.curEditInput=null;f.selectNode(b,
e,!1)}return c.noSelection=!0},editNode:function(b,a){var c=p.getRoot(b);f.editNodeBlur=!1;if(p.isSelectedNode(b,a)&&c.curEditNode==a&&a.editNameFlag)setTimeout(function(){h.inputFocus(c.curEditInput)},0);else{var q=b.data.key.name;a.editNameFlag=!0;f.removeTreeDom(b,a);f.cancelCurEditNode(b);f.selectNode(b,a,!1);k("#"+a.tId+d.id.SPAN).html("<input type=text class='rename' id='"+a.tId+d.id.INPUT+"' treeNode"+d.id.INPUT+" >");var e=k("#"+a.tId+d.id.INPUT);e.attr("value",a[q]);b.edit.editNameSelectAll?
h.inputSelect(e):h.inputFocus(e);e.bind("blur",function(){f.editNodeBlur||f.cancelCurEditNode(b)}).bind("keydown",function(c){c.keyCode=="13"?(f.editNodeBlur=!0,f.cancelCurEditNode(b,null,!0)):c.keyCode=="27"&&f.cancelCurEditNode(b,a[q])}).bind("click",function(){return!1}).bind("dblclick",function(){return!1});k("#"+a.tId+d.id.A).addClass(d.node.CURSELECTED_EDIT);c.curEditInput=e;c.noSelection=!1;c.curEditNode=a}},moveNode:function(b,a,c,q,e,l){var j=p.getRoot(b),g=b.data.key.children;if(a!=c&&(!b.data.keep.leaf||
!a||a.isParent||q!=d.move.TYPE_INNER)){var h=c.parentTId?c.getParentNode():j,o=a===null||a==j;o&&a===null&&(a=j);if(o)q=d.move.TYPE_INNER;j=a.parentTId?a.getParentNode():j;if(q!=d.move.TYPE_PREV&&q!=d.move.TYPE_NEXT)q=d.move.TYPE_INNER;if(q==d.move.TYPE_INNER)if(o)c.parentTId=null;else{if(!a.isParent)a.isParent=!0,a.open=!!a.open,f.setNodeLineIcos(b,a);c.parentTId=a.tId}var n;o?n=o=b.treeObj:(!l&&q==d.move.TYPE_INNER?f.expandCollapseNode(b,a,!0,!1):l||f.expandCollapseNode(b,a.getParentNode(),!0,!1),
o=k("#"+a.tId),n=k("#"+a.tId+d.id.UL),o.get(0)&&!n.get(0)&&(n=[],f.makeUlHtml(b,a,n,""),o.append(n.join(""))),n=k("#"+a.tId+d.id.UL));var m=k("#"+c.tId);m.get(0)?o.get(0)||m.remove():m=f.appendNodes(b,c.level,[c],null,!1,!0).join("");n.get(0)&&q==d.move.TYPE_INNER?n.append(m):o.get(0)&&q==d.move.TYPE_PREV?o.before(m):o.get(0)&&q==d.move.TYPE_NEXT&&o.after(m);var x=-1,y=0,t=null,o=null,r=c.level;if(c.isFirstNode){if(x=0,h[g].length>1)t=h[g][1],t.isFirstNode=!0}else if(c.isLastNode)x=h[g].length-1,
t=h[g][x-1],t.isLastNode=!0;else for(n=0,m=h[g].length;n<m;n++)if(h[g][n].tId==c.tId){x=n;break}x>=0&&h[g].splice(x,1);if(q!=d.move.TYPE_INNER)for(n=0,m=j[g].length;n<m;n++)j[g][n].tId==a.tId&&(y=n);if(q==d.move.TYPE_INNER){a[g]||(a[g]=[]);if(a[g].length>0)o=a[g][a[g].length-1],o.isLastNode=!1;a[g].splice(a[g].length,0,c);c.isLastNode=!0;c.isFirstNode=a[g].length==1}else a.isFirstNode&&q==d.move.TYPE_PREV?(j[g].splice(y,0,c),o=a,o.isFirstNode=!1,c.parentTId=a.parentTId,c.isFirstNode=!0,c.isLastNode=
!1):a.isLastNode&&q==d.move.TYPE_NEXT?(j[g].splice(y+1,0,c),o=a,o.isLastNode=!1,c.parentTId=a.parentTId,c.isFirstNode=!1,c.isLastNode=!0):(q==d.move.TYPE_PREV?j[g].splice(y,0,c):j[g].splice(y+1,0,c),c.parentTId=a.parentTId,c.isFirstNode=!1,c.isLastNode=!1);p.fixPIdKeyValue(b,c);p.setSonNodeLevel(b,c.getParentNode(),c);f.setNodeLineIcos(b,c);f.repairNodeLevelClass(b,c,r);!b.data.keep.parent&&h[g].length<1?(h.isParent=!1,h.open=!1,a=k("#"+h.tId+d.id.UL),q=k("#"+h.tId+d.id.SWITCH),g=k("#"+h.tId+d.id.ICON),
f.replaceSwitchClass(h,q,d.folder.DOCU),f.replaceIcoClass(h,g,d.folder.DOCU),a.css("display","none")):t&&f.setNodeLineIcos(b,t);o&&f.setNodeLineIcos(b,o);b.check&&b.check.enable&&f.repairChkClass&&(f.repairChkClass(b,h),f.repairParentChkClassWithSelf(b,h),h!=c.parent&&f.repairParentChkClassWithSelf(b,c));l||f.expandCollapseParentNode(b,c.getParentNode(),!0,e)}},removeEditBtn:function(b){k("#"+b.tId+d.id.EDIT).unbind().remove()},removeRemoveBtn:function(b){k("#"+b.tId+d.id.REMOVE).unbind().remove()},
removeTreeDom:function(b,a){a.isHover=!1;f.removeEditBtn(a);f.removeRemoveBtn(a);h.apply(b.view.removeHoverDom,[b.treeId,a])},repairNodeLevelClass:function(b,a,c){if(c!==a.level){var b=k("#"+a.tId),f=k("#"+a.tId+d.id.A),e=k("#"+a.tId+d.id.UL),c="level"+c,a="level"+a.level;b.removeClass(c);b.addClass(a);f.removeClass(c);f.addClass(a);e.removeClass(c);e.addClass(a)}}},event:{},data:{setSonNodeLevel:function(b,a,c){if(c){var d=b.data.key.children;c.level=a?a.level+1:0;if(c[d])for(var a=0,e=c[d].length;a<
e;a++)c[d][a]&&p.setSonNodeLevel(b,c,c[d][a])}}}});var E=k.fn.zTree,h=E._z.tools,d=E.consts,f=E._z.view,p=E._z.data;p.exSetting({edit:{enable:!1,editNameSelectAll:!1,showRemoveBtn:!0,showRenameBtn:!0,removeTitle:"remove",renameTitle:"rename",drag:{autoExpandTrigger:!1,isCopy:!0,isMove:!0,prev:!0,next:!0,inner:!0,minMoveSize:5,borderMax:10,borderMin:-5,maxShowNodeNum:5,autoOpenTime:500}},view:{addHoverDom:null,removeHoverDom:null},callback:{beforeDrag:null,beforeDragOpen:null,beforeDrop:null,beforeEditName:null,
beforeRename:null,onDrag:null,onDrop:null,onRename:null}});p.addInitBind(function(b){var a=b.treeObj,c=d.event;a.unbind(c.RENAME);a.bind(c.RENAME,function(a,c,d){h.apply(b.callback.onRename,[a,c,d])});a.unbind(c.REMOVE);a.bind(c.REMOVE,function(a,c,d){h.apply(b.callback.onRemove,[a,c,d])});a.unbind(c.DRAG);a.bind(c.DRAG,function(a,c,d,f){h.apply(b.callback.onDrag,[c,d,f])});a.unbind(c.DROP);a.bind(c.DROP,function(a,c,d,f,g,k,o){h.apply(b.callback.onDrop,[c,d,f,g,k,o])})});p.addInitCache(function(){});
p.addInitNode(function(b,a,c){if(c)c.isHover=!1,c.editNameFlag=!1});p.addInitProxy(function(b){var a=b.target,c=p.getSetting(b.data.treeId),f=b.relatedTarget,e="",l=null,j="",g=null,k=null;if(h.eqs(b.type,"mouseover")){if(k=h.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+d.id.A}]))e=k.parentNode.id,j="hoverOverNode"}else if(h.eqs(b.type,"mouseout"))k=h.getMDom(c,f,[{tagName:"a",attrName:"treeNode"+d.id.A}]),k||(e="remove",j="hoverOutNode");else if(h.eqs(b.type,"mousedown")&&(k=h.getMDom(c,a,[{tagName:"a",
attrName:"treeNode"+d.id.A}])))e=k.parentNode.id,j="mousedownNode";if(e.length>0)switch(l=p.getNodeCache(c,e),j){case "mousedownNode":g=D.onMousedownNode;break;case "hoverOverNode":g=D.onHoverOverNode;break;case "hoverOutNode":g=D.onHoverOutNode}return{stop:!1,node:l,nodeEventType:j,nodeEventCallback:g,treeEventType:"",treeEventCallback:null}});p.addInitRoot(function(b){b=p.getRoot(b);b.curEditNode=null;b.curEditInput=null;b.curHoverNode=null;b.dragFlag=0;b.dragNodeShowBefore=[];b.dragMaskList=[];
b.showHoverDom=!0});p.addZTreeTools(function(b,a){a.cancelEditName=function(a){var d=p.getRoot(b),e=b.data.key.name,h=d.curEditNode;d.curEditNode&&f.cancelCurEditNode(b,a?a:h[e])};a.copyNode=function(a,k,e,l){if(!k)return null;if(a&&!a.isParent&&b.data.keep.leaf&&e===d.move.TYPE_INNER)return null;var j=h.clone(k);if(!a)a=null,e=d.move.TYPE_INNER;e==d.move.TYPE_INNER?(k=function(){f.addNodes(b,a,[j],l)},h.canAsync(b,a)?f.asyncNode(b,a,l,k):k()):(f.addNodes(b,a.parentNode,[j],l),f.moveNode(b,a,j,e,
!1,l));return j};a.editName=function(a){a&&a.tId&&a===p.getNodeCache(b,a.tId)&&(a.parentTId&&f.expandCollapseParentNode(b,a.getParentNode(),!0),f.editNode(b,a))};a.moveNode=function(a,q,e,l){function j(){f.moveNode(b,a,q,e,!1,l)}if(!q)return q;if(a&&!a.isParent&&b.data.keep.leaf&&e===d.move.TYPE_INNER)return null;else if(a&&(q.parentTId==a.tId&&e==d.move.TYPE_INNER||k("#"+q.tId).find("#"+a.tId).length>0))return null;else a||(a=null);h.canAsync(b,a)?f.asyncNode(b,a,l,j):j();return q};a.setEditable=
function(a){b.edit.enable=a;return this.refresh()}});var K=f.cancelPreSelectedNode;f.cancelPreSelectedNode=function(b,a){for(var c=p.getRoot(b).curSelectedList,d=0,e=c.length;d<e;d++)if(!a||a===c[d])if(f.removeTreeDom(b,c[d]),a)break;K&&K.apply(f,arguments)};var L=f.createNodes;f.createNodes=function(b,a,c,d){L&&L.apply(f,arguments);c&&f.repairParentChkClassWithSelf&&f.repairParentChkClassWithSelf(b,d)};f.makeNodeUrl=function(b,a){return a.url&&!b.edit.enable?a.url:null};var J=f.removeNode;f.removeNode=
function(b,a){var c=p.getRoot(b);if(c.curEditNode===a)c.curEditNode=null;J&&J.apply(f,arguments)};var M=f.selectNode;f.selectNode=function(b,a,c){var d=p.getRoot(b);if(p.isSelectedNode(b,a)&&d.curEditNode==a&&a.editNameFlag)return!1;M&&M.apply(f,arguments);f.addHoverDom(b,a);return!0};var N=h.uCanDo;h.uCanDo=function(b,a){var c=p.getRoot(b);return a&&(h.eqs(a.type,"mouseover")||h.eqs(a.type,"mouseout")||h.eqs(a.type,"mousedown")||h.eqs(a.type,"mouseup"))?!0:!c.curEditNode&&(N?N.apply(f,arguments):
!0)}
}
));


// AMD support
(function (factory) {
    
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define('app/jquery.insert',['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {
	
	
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
// AMD support
(function (factory) {
    
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define('app/jquery.accordion',['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {
	
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
// AMD support
(function (factory) {
    
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define('app/jquery.inputOnlyPositiveNum',['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {
	
	
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
define('core/saogaUI',[],function(){

	
	
	(function() {
		/**
		 * 针对原型的方法添加应用支持
		 */
		
		/**
		 * 获取中文长度
		 * @method getLength
		 */
		String.prototype.getLength = function(){
			return this.replace(/[^\x00-\xff]/g, "en").length; //若为中文替换成两个字母
		};
		
		/**
		 * 清空空格
		 * @method trims
		 * @return {String}
		 */
		String.prototype.trims = function(){
			return this.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "");
		};
		
		/**
		 * 转为unicode编码
		 * @method toUnicode
		 * @return {String}
		 */
		String.prototype.toUnicode = function(){
			return escape( this.toLocaleLowerCase().replace(/%u/gi, '\\') );
		};
		
		/**
		 * 转为unicode编码
		 * @method unicodeTo
		 * @return {String}
		 */
		String.prototype.unicodeTo = function(){
			return unescape( this.toLocaleLowerCase().replace(/%u/gi, '\\') );
		};
		
		/**
		 * 重写console
		 */
		if(!window.console){
			window.console = {};
		}
		if(!console.log){
			console.log = function(){};
		}
		
		/**
		 * 设定基本命名空间
		 * @namespace saogaUI
		 * @author norion
		 * @blog http://zkeyword.com/
		 */
		var saogaUI = window.saogaUI || {};
	
		/*设定基本构架*/
		saogaUI = {
			_INSTALL: function(){
				window.saogaUI = saogaUI;
			},
			base: {}, //基础层，所有的基础函数库，如cookie等
			ui: {},   //前端显示层，用来重构和回流DOM，前端的特效显示处理
			app:{}    //应用层，挂载一些应用的通用类。
		};
		
		saogaUI._INSTALL();
	}(window));
	
	/*鼠标滚轮监听*/
	/*(function($){
	    $.fn.preventScroll = function(){
	        var that = this[0];
	        if($.browser.mozilla){
	        	that.addEventListener('DOMMouseScroll',function(e){
	        		that.scrollTop += e.detail > 0 ? 60 : -60;   
	                e.preventDefault();
	            },false); 
	        }else{
	        	that.onmousewheel = function(e){   
	                e = e || window.event;   
	                that.scrollTop += e.wheelDelta > 0 ? -60 : 60;   
	                e.returnValue = false;  
	            };
	        }
	        return this;
	    };
	})(jQuery);*/
	
	/**
	 * 基础函数库
	 * @class saogaUI.base 基础函数库
	 * @author norion
	 * @blog http://zkeyword.com/
	 */
	saogaUI.base = {
		
		/**
		 * 判断是否是数组
		 * @method saogaUI.base.isArray
		 * @param {Object} 数组对象
		 * @return {Boolean}
		 */
		isArray: function(o){
			return o ? jQuery.isArray(o) : false;
		},
		
		/**
		 * 判断是否是对象
		 * @method saogaUI.base.isObject
		 * @param {Object} 字符串对象
		 * @return {Boolean}
		 */
		isObject: function(o){
			return o ? Object.prototype.toString.call(o) === "[object Object]" : false;
		},
		
		/**
		 * 判断是否是函数
		 * @method saogaUI.base.isFunction
		 * @param {Function} Function对象
		 * @return {Boolean}
		 */
		isFunction: function(o){
			return o ? Object.prototype.toString.call(o) === "[object Function]" : false;
		},
		
		/**
		 * 获取浏览器 userAgent
		 * @method saogaUI.base.browser
		 * @return {Object}
		 */
		browser: (function(){
			var na            = window.navigator,
				browserTester = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos)[ \/os]*([\d_.]+)/ig,
				ua            = na.userAgent.toLowerCase(),
				browser       = {
									platform: na.platform
								};
			ua.replace(browserTester, function(a, b, c) {
				var bLower = b.toLowerCase();
				if (!browser[bLower]) {
					browser[bLower] = c; 
				}
			});
			if( browser.msie ){
				browser.ie = browser.msie;
				var v = parseInt(browser.msie, 10);
				browser['ie' + v] = true;
			}	
			return browser;
		}()),
		
		/**
		 * cookie
		 * @method zUI.base.cookie
		 */
		cookie: {

			/**
			 * 设置cookie
			 * @param {String} cookie的名称
			 * @param {String} cookie的值
			 * @param {String} cookie的有效期
			 * @param {String} cookie的域名
			 * @param {String} cookie存放的路径
			 * @return {Boolean}
			 */
			set: function(name, value, hour, domain, path){
				if( hour ){
					var today  = new Date(),
						expire = new Date();
					expire.setTime(today.getTime() + 36E5 * hour);
				}
				document.cookie = name + "=" + encodeURI(value) + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "");
				return true;
			},
			
			/**
			 * 获取cookie
			 * @param {String} cookie的名称
			 * @return {String} cookie的值
			 */
			get: function( name ){
				var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
					m = document.cookie.match(r);
					
				return unescape(decodeURI(!m ? "" : m[1]));
			},
			
			/**
			 * 删除cookie
			 * @param {String} cookie的名称
			 * @param {String} cookie的域名
			 * @param {String} cookie存放的路径
			 */
			del: function(name, domain, path){
				document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "");
			}
		}
	};
	
	
	
	/**
	 * 前端显示层，用来重构和回流DOM，前端的特效显示处理
	 * @class saogaUI.ui 前端显示层
	 * @author norion
	 * @blog http://zkeyword.com/
	 */
	saogaUI.ui = {
		
		/**
		 * z-index
		 * @method saogaUI.ui.zIndex
		 * @return {Number} z-index值
		 */
		zIndex: function(){
			return 99999 + $('.l-ui').length;
		},
		
		/**
		 * 需要ui元素需要绝对定位的容器
		 * @method saogaUI.ui.wrap
		 * @return {Object} ui元素jquery对象
		 */
		wrap: function(){
			if( !$('#l-ui-wrap').length ){
				$('body').append('<div id="l-ui-wrap"><!--[if lte IE 6.5]><iframe src="javascript:false;" style="width:0;height:0;"></iframe><![endif]--></div>');
			}
			return $('#l-ui-wrap');
		},
		
		/**
		 * 去除滚动条
		 * @method saogaUI.ui.noScroll
		 */
		noScroll: function(){
			var html = $('html');
			
			/*监听滚轮*/
			if( document.onmousewheel === undefined ){
				html[0].addEventListener('DOMMouseScroll',function(e){
					html.scrollTop += e.detail > 0 ? 60 : -60;   
	            },false);
			}else{
				html.onmousewheel = function(e){   
	                e = e || window.event;   
	                html.scrollTop += e.wheelDelta > 0 ? -60 : 60;   
	                e.returnValue = false;  
	            };
			}
			
			html.addClass('html-noScroll');
		},
		
		/**
		 * 设置遮罩
		 * @method saogaUI.ui.lock
		 * @return {Object} 遮罩元素jquery对象
		 */
		lock: function(){
			var win      = $(window),
				body     = $('body'),
				lock     = $('.l-ui-lock'),
				_setSize = function(){
					if( !lock.length ){
						lock = body
								.append('<div class="l-ui-lock fn-hide"></div>')
								.find('.l-ui-lock')
					}
					lock.css({
						filter:'Alpha(opacity=20)',
						width:'100%',
						height: body[0].scrollHeight
					});
				};
				
			this.noScroll();
			_setSize();	
			win.resize(_setSize);
			lock.fadeIn();

			return lock;
		},
		
		/**
		 * 删除遮罩
		 * @method saogaUI.ui.unlock
		 */
		unlock: function(){
			$('html').removeClass('html-noScroll');
			$('.l-ui-lock').fadeOut();
		},
		
		/**
		 * 获取鼠标位置
		 * @method saogaUI.ui.mousePosition
		 * @param {Object} event事件
		 * @return {Array} 返回鼠标的x、y轴：[positionX, positionY]
		 */
		mousePosition: function(e){
			e = e || window.event;
			
			var x = e.pageX || e.clientX + document.body.scrollLeft,
				y = e.pageY || e.clientY + document.body.scrollTop;
				
			return{
				positionX : x,
				positionY : y
			};
		},
		
		/**
		 * 判断是否宽屏
		 * @method saogaUI.ui.widescreen
		 * @return {Boolean} 
		 */
		widescreen: (function(){
			return (screen.width >= 1210);
		})(),
		
		/**
		 * onselectstart 选中处理
		 * @method saogaUI.ui.onselectstart
		 * @param {Object} jquery 对象
		 */
		onselectstart: function(obj){
			if( !obj || !obj.length ){ return false; }
			if( document.onselectstart !== undefined ){
				obj[0].onselectstart = function(){return false;};
			}else{
				obj.css({'-moz-user-select':'none'});
			}
			return obj;
		}
	};	
	
	return saogaUI;
});
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(/^$|,+/)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/[\n\r\t\s]+/g," ").replace(/<!--.*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g;e.openTag="{{",e.closeTag="}}";var y=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a,b){a=a.replace(/^\s/,"");var c=a.split(" "),e=c.shift(),f=c.join(" ");switch(e){case"if":a="if("+f+"){";break;case"else":c="if"===c.shift()?" if("+c.join(" ")+")":"",a="}else"+c+"{";break;case"/if":a="}";break;case"each":var g=c[0]||"$data",h=c[1]||"as",i=c[2]||"$value",j=c[3]||"$index",k=i+","+j;"as"!==h&&(g="[]"),a="$each("+g+",function("+k+"){";break;case"/each":a="});";break;case"echo":a="print("+f+");";break;case"print":case"include":a=e+"("+c.join(",")+");";break;default:if(-1!==f.indexOf("|")){var l=b.escape;0===a.indexOf("#")&&(a=a.substr(1),l=!1);for(var m=0,n=a.split("|"),o=n.length,p=l?"$escape":"$string",q=p+"("+n[m++]+")";o>m;m++)q=y(q,n[m]);a="=#"+q}else a=d.helpers[e]?"=#"+e+"("+c.join(",")+");":"="+a}return a},"function"==typeof define?define('app/template',[],function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
define('core/drag',['core/saogaUI'],function(saogaUI){
	
	
	
	/**
	* saogaUI.ui.drag 拖拽控件
	* @class saogaUI.ui.drag
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options drag参数
    * @param {String} options.dragItem 拖拽触发对象选择器
    * @param {String} options.dragWrap 拖拽移动对象选择器
	*/
	var drag = function(options){         //IE下 iframe内的的拖动还是有问题
	
		var o = options || {};
		if( !o.dragItem ){return false;}
		var	dragItem = $('body').find(o.dragItem),
			dragWrap = $('body').find(o.dragWrap),
			win      = parent.document || document,
			mouse    = {x:0,y:0};
			
		function _moveDialog(e){
	        e = window.event || e;
	        
	        var top  = dragWrap.css('top') === 'auto' ? 0 : dragWrap.css('top'),
				left = dragWrap.css('left') === 'auto' ? 0 : dragWrap.css('left');
				
	        dragWrap.css({
				top  : parseInt(top) + (e.clientY - mouse.y),
				left : parseInt(left) + (e.clientX - mouse.x)
			});
	        
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	    }
		
	    dragItem.mousedown(function(e){
	        e = window.event || e;
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	        $(win).bind('mousemove', _moveDialog);
	        
	        if(e.preventDefault){
	        	e.preventDefault();
        	}else{
        		e.returnValue = false;
        	}
	    });
	    
	    $(win).mouseup(function(event){
	        $(win).unbind('mousemove', _moveDialog);
	    });
	};
	
	saogaUI.drag = drag;
	
	return drag;
});
/**
 * @license RequireJS i18n 2.0.4 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/i18n for details
 */
/*jslint regexp: true */
/*global require: false, navigator: false, define: false */

/**
 * This plugin handles i18n! prefixed modules. It does the following:
 *
 * 1) A regular module can have a dependency on an i18n bundle, but the regular
 * module does not want to specify what locale to load. So it just specifies
 * the top-level bundle, like "i18n!nls/colors".
 *
 * This plugin will load the i18n bundle at nls/colors, see that it is a root/master
 * bundle since it does not have a locale in its name. It will then try to find
 * the best match locale available in that master bundle, then request all the
 * locale pieces for that best match locale. For instance, if the locale is "en-us",
 * then the plugin will ask for the "en-us", "en" and "root" bundles to be loaded
 * (but only if they are specified on the master bundle).
 *
 * Once all the bundles for the locale pieces load, then it mixes in all those
 * locale pieces into each other, then finally sets the context.defined value
 * for the nls/colors bundle to be that mixed in locale.
 *
 * 2) A regular module specifies a specific locale to load. For instance,
 * i18n!nls/fr-fr/colors. In this case, the plugin needs to load the master bundle
 * first, at nls/colors, then figure out what the best match locale is for fr-fr,
 * since maybe only fr or just root is defined for that locale. Once that best
 * fit is found, all of its locale pieces need to have their bundles loaded.
 *
 * Once all the bundles for the locale pieces load, then it mixes in all those
 * locale pieces into each other, then finally sets the context.defined value
 * for the nls/fr-fr/colors bundle to be that mixed in locale.
 */
(function () {
    

    //regexp for reconstructing the master bundle name from parts of the regexp match
    //nlsRegExp.exec("foo/bar/baz/nls/en-ca/foo") gives:
    //["foo/bar/baz/nls/en-ca/foo", "foo/bar/baz/nls/", "/", "/", "en-ca", "foo"]
    //nlsRegExp.exec("foo/bar/baz/nls/foo") gives:
    //["foo/bar/baz/nls/foo", "foo/bar/baz/nls/", "/", "/", "foo", ""]
    //so, if match[5] is blank, it means this is the top bundle definition.
    var nlsRegExp = /(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;

    //Helper function to avoid repeating code. Lots of arguments in the
    //desire to stay functional and support RequireJS contexts without having
    //to know about the RequireJS contexts.
    function addPart(locale, master, needed, toLoad, prefix, suffix) {
        if (master[locale]) {
            needed.push(locale);
            if (master[locale] === true || master[locale] === 1) {
                toLoad.push(prefix + locale + '/' + suffix);
            }
        }
    }

    function addIfExists(req, locale, toLoad, prefix, suffix) {
        var fullName = prefix + locale + '/' + suffix;
        if (require._fileExists(req.toUrl(fullName + '.js'))) {
            toLoad.push(fullName);
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     * This is not robust in IE for transferring methods that match
     * Object.prototype names, but the uses of mixin here seem unlikely to
     * trigger a problem related to that.
     */
    function mixin(target, source, force) {
        var prop;
        for (prop in source) {
            if (source.hasOwnProperty(prop) && (!target.hasOwnProperty(prop) || force)) {
                target[prop] = source[prop];
            } else if (typeof source[prop] === 'object') {
                if (!target[prop] && source[prop]) {
                    target[prop] = {};
                }
                mixin(target[prop], source[prop], force);
            }
        }
    }

    define('i18n',['module'], function (module) {
        var masterConfig = module.config ? module.config() : {};

        return {
            version: '2.0.4',
            /**
             * Called when a dependency needs to be loaded.
             */
            load: function (name, req, onLoad, config) {
                config = config || {};

                if (config.locale) {
                    masterConfig.locale = config.locale;
                }

                var masterName,
                    match = nlsRegExp.exec(name),
                    prefix = match[1],
                    locale = match[4],
                    suffix = match[5],
                    parts = locale.split("-"),
                    toLoad = [],
                    value = {},
                    i, part, current = "";

                //If match[5] is blank, it means this is the top bundle definition,
                //so it does not have to be handled. Locale-specific requests
                //will have a match[4] value but no match[5]
                if (match[5]) {
                    //locale-specific bundle
                    prefix = match[1];
                    masterName = prefix + suffix;
                } else {
                    //Top-level bundle.
                    masterName = name;
                    suffix = match[4];
                    locale = masterConfig.locale;
                    if (!locale) {
                        locale = masterConfig.locale =
                            typeof navigator === "undefined" ? "root" :
                            (navigator.language ||
                             navigator.userLanguage || "root").toLowerCase();
                    }
                    parts = locale.split("-");
                }

                if (config.isBuild) {
                    //Check for existence of all locale possible files and
                    //require them if exist.
                    toLoad.push(masterName);
                    addIfExists(req, "root", toLoad, prefix, suffix);
                    for (i = 0; i < parts.length; i++) {
                        part = parts[i];
                        current += (current ? "-" : "") + part;
                        addIfExists(req, current, toLoad, prefix, suffix);
                    }

                    req(toLoad, function () {
                        onLoad();
                    });
                } else {
                    //First, fetch the master bundle, it knows what locales are available.
                    req([masterName], function (master) {
                        //Figure out the best fit
                        var needed = [],
                            part;

                        //Always allow for root, then do the rest of the locale parts.
                        addPart("root", master, needed, toLoad, prefix, suffix);
                        for (i = 0; i < parts.length; i++) {
                            part = parts[i];
                            current += (current ? "-" : "") + part;
                            addPart(current, master, needed, toLoad, prefix, suffix);
                        }

                        //Load all the parts missing.
                        req(toLoad, function () {
                            var i, partBundle, part;
                            for (i = needed.length - 1; i > -1 && needed[i]; i--) {
                                part = needed[i];
                                partBundle = master[part];
                                if (partBundle === true || partBundle === 1) {
                                    partBundle = req(prefix + part + '/' + suffix);
                                }
                                mixin(value, partBundle);
                            }

                            //All done, notify the loader.
                            onLoad(value);
                        });
                    });
                }
            }
        };
    });
}());

define('core/nls/str',{
  'root': {
    close: '关闭',
    /*dialog*/
    alert: '提示？',
    confirm: '确认？',
    error: '错误',
    /*grid*/
    nextPage: '&gt;',
    prevPage: '&lt;',
    countFont: '每页显示：{{size}}条，当前显示从{{start}}到{{end}}，总{{count}}条 。',
    nullText: '暂无数据，请确认！',
    requestText: '数据请求中，请稍后...'
  },
  'en': true
});

define('core/dialog',['core/saogaUI', 'core/drag', 'i18n!core/nls/str'], function(saogaUI, drag, lang){
	
	/**
	* saogaUI.ui.dialog 拖拽控件
	* @class saogaUI.ui.dialog
	* @author norion.z
    * @blog http://zkeyword.com/
	*/
	var dialog = {
		init: function(options){
			var o             = options || {},
				title         = o.title || '',
				text          = o.text || '',
				btns          = o.btns || '',							          //按钮若为空，将默认
				type          = o.type || '',                                     //错误类型
				top           = o.top,
				left          = o.left,
				ok            = o.ok || '',
				no            = o.no || '',
				width         = o.width || 200,
				height        = o.height || 50,
				id            = o.id || 'l-dialog-' + (new Date()).valueOf(),      //随机id，多次调用可以用
				titleId       = 'l-dialog-title' + (new Date()).valueOf(),
				isMask        = o.isMask === undefined  || o.isMask,               //是否允许遮罩
				isMaskClose   = o.isMaskClose === undefined || o.isMaskClose,      //是否点击遮罩关闭
				allowClose    = o.allowClose === undefined || o.allowClose,        //允许关闭
				allowEscClose = o.allowEscClose === undefined || o.allowEscClose,  //允许esc关闭
				isDrag        = o.isDrag === undefined || o.isDrag;                //允许拖拽
			
			var h = '';
				h += '<div class="l-ui l-dialog-wrap l-ui-current l-ui-mask" id="'+ id +'">';
				h += '	<table class="l-dialog-table">';
				h += '		<tr><td colspan="3" class="l-dialog-border l-dialog-border-top">&nbsp;</td></tr>';
				h += '		<tr>';
				h += '			<td class="l-dialog-border l-dialog-border-left">&nbsp;</td>';
				h += '			<td class="l-dialog-main"><div class="l-dialog-content" style="width:'+width+'px;height:'+height+'px"><div class="l-dialog-text">'+ text +'</div></div></td>';
				h += '			<td class="l-dialog-border l-dialog-border-right">&nbsp;</td>';
				h += '		</tr>';
				h += '		<tr><td colspan="3" class="l-dialog-border l-dialog-border-bottom">&nbsp;</td></tr>';
				h += '	</table>';
				h += '</div>';
			
			//载入容器
			saogaUI.ui.wrap();
			$('#l-ui-wrap').prepend(h);
			
			var dialogWrap    = $('#'+id),
				dialogMain    = dialogWrap.find('.l-dialog-main'),
				dialogContent = dialogWrap.find('.l-dialog-content');
			
			saogaUI.ui.dialog.setZIndex(id);
			
			/*标题*/
			if( title ){
				dialogMain.prepend('<div class="l-dialog-title" id="'+titleId+'">'+ title +'</div>');
			}	
			
			/*类型标识*/
			if( type ){
				dialogMain.find('.l-dialog-content').addClass('l-dialog-'+type);
			}
			
			/*按钮*/
			var i             = 0,
				btnWrap       = dialogMain.append('<div class="ui-floatCenter l-dialog-btnWrap"><div class="ui-sl-floatCenter"></div></div>')
										  .find('.ui-floatCenter'),
				btnMain       = dialogMain.find('.ui-sl-floatCenter'),
				btnWrapHeight = btnWrap.height();	
			if( btns ){
				$.each(btns,function(i,item){
					btnMain.append('<a href="javascript:;" class="'+ (item.cls?'ui-btn ui-btnMain ui-floatCenter-item '+item.cls:'ui-btn ui-btnMain ui-floatCenter-item') +'"><span>'+item.text+'</span></a>');
					if( item.onclick ){
						btnMain.find('a').eq(i).click(function(){
							item.onclick(i,item);
							saogaUI.ui.dialog.close(id);
						});
					}
					
					/*item.onclick && btnMain.find('a').eq(i).click(function(){
						item.onclick(i,item);
						saogaUI.ui.dialog.close(id);
					});*/
				});	
			}else{
				switch( type ){
					case 'alert':
						dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-check-square-o"></i></div>');
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-floatCenter-item l-dialog-ok"><span>确定</span></a>');
						btnMain.find('.l-dialog-ok').click(function(){
							if( saogaUI.base.isFunction(ok) ){
								ok();
							}
							saogaUI.ui.dialog.close(id);
						});
						break;
					case 'confirm':
						dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-question-circle"></i></div>');
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-floatCenter-item l-dialog-ok"><span>确定</span></a><a href="javascript:;" class="ui-btn ui-btnMain ui-btnMain-cancel ui-floatCenter-item l-dialog-no"><span>取消</span></a>');
						btnMain.find('.l-dialog-ok').click(function(){
							if( saogaUI.base.isFunction(ok) ){
								ok();
							}
							saogaUI.ui.dialog.close(id);
						});
						btnMain.find('.l-dialog-no').click(function(){
							if( saogaUI.base.isFunction(no) ){
								no();
							}
							saogaUI.ui.dialog.close(id);
						});
						break;
					case 'error':
						dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-frown-o"></i></div>');
						btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-btnMain-cancel ui-floatCenter-item l-dialog-no"><span>取消</span></a>');
						btnMain.find('.l-dialog-no').click(function(){
							if( saogaUI.base.isFunction(no) ){
								no();
							}
							saogaUI.ui.dialog.close(id);
						});
						break;
				}//end switch
			}//end if
			
			
			/*位置*/
			var win        = $(window),
				dialogIcon = dialogWrap.find('.l-dialog-icon'),
				dialogText = dialogWrap.find('.l-dialog-text'),
				_setSize   = function(){
					dialogWrap.css({
						top: top || /*win.scrollTop() +*/ ( win.height() - dialogWrap.height() )/2,
						left: left || ( win.width() - dialogWrap.width() )/2
					});
				}
			
			_setSize();	
			win.resize(_setSize);

			dialogIcon.css({top: (height - dialogIcon.height())/2 + 15 });
			dialogText.css({'padding-top': (height - dialogText.height())/2 });
			
			dialogContent
				.css({opacity:0.1})
				.animate({ 
					opacity: 1
				}, 500);
		

			
			/*遮罩*/
			if( isMask ){
				saogaUI.ui.lock();
			}
			
			/*拖拽*/
			if( isDrag ){
				drag({
					dragItem:'#'+titleId,
					dragWrap:'#'+id
				});
			}
			
			/*关闭*/
			if( allowClose ){
			
				/*添加关闭按钮*/
				dialogMain
					.prepend('<div class="l-dialog-close"><i class="icon icon-close" title="关闭"></i></div>')
					.find('.l-dialog-close')
					.click(function(){
						saogaUI.ui.dialog.close(id);
					});
				
				/*点击遮罩关闭*/
				/* if( isMask && isMaskClose ){
					$('.l-ui-lock').click(function(){
						saogaUI.ui.dialog.close(id);
					});
				} */
			
				/*esc退出*/
				if( allowEscClose ){
					var _modalKey = function (e){
						e = e || event;
						var code = e.which || event.keyCode;
						if(code === 27){
							saogaUI.ui.dialog.close(id);
						}
					};
					
					if(document.attachEvent){
						document.attachEvent('onkeydown', _modalKey);
					}else{
						document.addEventListener('keydown', _modalKey, true);
					}
				}
			}// end if( allowClose )
		},
		
		/**
		* 设置层级
		* @param {Object} options drag参数
		*/
		setZIndex: function(id){
			var obj        = $('.l-ui'),
				i          = 0,
				len        = obj.length,
				zIndex     = saogaUI.ui.zIndex(),
				mask       = $('.l-ui-lock'),
				maskZindex = Number( mask.css('z-index') ),
				dialog	   = $('#'+id);
			if( dialog.hasClass('l-ui-current') ){
								
				for(; i<len; i++){
					obj.eq(i).css({'z-index':maskZindex - i});
				}
				
				obj.removeClass('l-ui-current');
				dialog.css({'z-index':zIndex});
			}else{
				for(; i<len; i++){
					obj.eq(i).css({'z-index':maskZindex + len - i});
				}
				
			}
		},
		
		/**
		* 关闭释放
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
		*/
		close: function(id){
			if( id ){
				$('#'+id).remove();
			}else{
				$('.l-dialog-wrap').remove();
			}
			if( !$('.l-ui-mask').length ){
				saogaUI.ui.unlock();
			}
			saogaUI.ui.dialog.setZIndex(id);
		},
		
		/**
		* alert
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
		*/
		alert: function(options){
			var o      = options || {},
				title  = o.title || lang.alert,
				text   = o.text || '',
				width  = o.width,
				height = o.height,
				ok     = o.ok || '';
			this.init({
				title:title,
				text:text,
				width:width,
				height:height,
				type:'alert',
				ok:ok
			});
		},
		
		/**
		* confirm
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
		*/
		confirm: function(options){
			var o      = options || {},
				title  = o.title || lang.confirm,
				text   = o.text || '',
				width  = o.width,
				height = o.height,
				ok     = o.ok || '',
				no     = o.no || '';
			this.init({
				title:title,
				text:text,
				width:width,
				height:height,
				type:'confirm',
				ok:ok,
				no:no
			});
		},
		
		/**
		* error
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
		*/
		error: function(options){
			var o      = options || {},
				title  = o.title || '',
				text   = o.text || lang.error,
				width  = o.width,
				height = o.height,
				no     = o.no || '';
			this.init({
				title:title,
				text:text,
				width:width,
				height:height,
				type:'error',
				no:no
			});
		},
		
		/**
		* 小提示框
		* @member saogaUI.ui.dialog
		* @param {Object} options drag参数
		*/
		prompt: function(options){
			var o        = options || {},
				id       = o.id || 'l-dialog-' + (new Date()).valueOf(),
				top      = o.top,
				left     = o.left,
				cls      = o.cls || '',                          //自定义Class
				text     = o.text || '',                         //提示内容
				isMask   = o.isMask || true,                     //是否允许遮罩
				showTime = o.showTime || 2000,                   //显示时间，默认2秒
				endFn    = o.endFn || '',                        //关闭后需要执行的函数
				width    = o.width || '',
				height   = o.height || 'auto';
			
			//载入容器
			saogaUI.ui.wrap();
			var h = '';
			h += '<div class="l-ui l-dialog-wrap" id="'+ id +'">';
			h += '	<div class="l-dialog-prompt">'+ text +'</div>';
			h += '</div>';
			$('#l-ui-wrap').prepend(h);
			var zIndex     = saogaUI.ui.zIndex(),
				dialogWrap = $('#'+id).css({'width':width,'height':height,'z-index':zIndex});
			
			//位置
			var win      = $(window),
				_setSize = function(){
					dialogWrap.css({
						top: top || /*win.scrollTop() +*/ ( win.height() - dialogWrap.height() )/2,
						left: left || ( win.width() - dialogWrap.width() )/2
					});
				}
			
			_setSize();	
			win.resize(_setSize);
			
			//遮罩
			if( isMask ){
				saogaUI.ui.lock();
			}
			
			//关闭
			function show(){
				saogaUI.ui.dialog.close(id);
				if( endFn && typeof endFn === 'function' ){
					endFn();
				}
			}
			setTimeout(show,showTime);
			
		}
			
	};
	
	//saogaUI.ui.dialog = dialog;
	
	return dialog;
	
});
define('core/pop',['core/saogaUI'], function(saogaUI){
	
	
	
	/**
	* saogaUI.ui.pop 弹出窗控件
	* @class saogaUI.ui.pop
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 弹出窗参数
    * @param {String} o.id 弹出窗ID
    * @param {String} o.titleId 标题ID
    * @param {String} o.title 弹出框的标题
    * @param {Number} o.width 弹出框内部的宽，不包括边框的宽度
    * @param {Number} o.height 弹出框内部的高，不包括边框的高度
    * @param {Number} o.top 弹出框的top
    * @param {Number} o.left 弹出框的left
    * @param {String} o.cls 定义class
    * @param {String} o.url 用iframe方式加载
    * @param {String} o.ajax 用ajax方式加载
    * @param {String} o.ajaxType ajax请求类型
    * @param {String|Object} o.ajaxData ajax请求条件
    * @param {String} o.async ajax同步方式
    * @param {String} o.html 用html方式加载
    * @param {Function} o.onloadFn 载入时要触发的事件
    * @param {Function} o.closeFn 关闭时要触发的事件
    * @param {Object} o.btns 弹出框的按钮集合
    * @param {Function} o.btns.onclick 点击按钮要执行的动作，如果要执行一些异步的动作，closePop必须是false
    * @param {Function} o.btns.closePop 点击按钮之后是否直接关闭弹出框，默认直接关闭
    * @param {Function} o.btns.cls 按钮自定义class
    * @param {Function} o.btns.text 按钮文本
    * @param {Boolean} o.isMask 是否允许遮罩,默认true
    * @param {Boolean} o.isMaskClose 是否点击遮罩关闭,默认false
    * @param {Boolean} o.allowClose 允许关闭,默认true
    * @param {Boolean} o.allowEscClose 允许esc关闭,默认true
    * @param {Boolean} o.isDrag 允许拖拽,默认true
	* @return {Object} pop对象
	*/
	var Pop = function(o){
		var g      = this,
			
			/**
			* 默认配置
			* @private
			*/
			p      = {
				id            : 'l-pop-'+(new Date()).valueOf(),
				titleId       : 'l-pop-title-'+(new Date()).valueOf(),
				title         : '',                                     //弹出框的标题
				width         : 500,                                    //弹出框内部的宽，不包括边框的宽度
				height        : 300,                                    //弹出框内部的高，不包括边框的高度
				top           : null,                                   //弹出框的top
				left          : null,                                   //弹出框的left
				cls           : '',                                     //定义class
				url           : '',                                     //用iframe方式加载
				ajax          : '',                                     //用ajax方式加载
				ajaxType      : 'POST',
				ajaxData      : '',
				ajaxSuccess   : null,
				async         : false,
				html          : '',                                      //用html方式加载
				onloadFn      : null,                                    //载入时要触发的事件
				closeFn       : null,                                    //关闭时要触发的事件
				btns          : '',                                      //弹出框的按钮集合
				isMask        : true,                                    //是否允许遮罩,默认true
				isMaskClose   : false,                                   //是否点击遮罩关闭,默认true
				allowClose    : true,                                    //允许关闭,默认true
				allowEscClose : true,                                    //允许esc关闭,默认true
				isDrag        : true                                     //允许拖拽,默认true
			},
			
			/**
			* 临时对象
			* @private
			*/
			_cache = {
				popTitle: $(),
				popContent: $(),
				btnWrap: $(),
				mask: $()
			},
			
			/**
			* 内部处理
			* @private
			*/
			_core  = {
				
				/**
				* 创建遮罩
				*/
				createMask: function(){
					var isMask      = p.isMask,
						isMaskClose = p.isMaskClose;
					
					if( isMask ){
						var mask = saogaUI.ui.lock();
						
						if( isMaskClose && allowClose ){
							lock.click(function(){
								g.close();
							});
						}
						
						_cache.mask = mask;
						
						p.popWrap.addClass('l-ui-mask');
					}
				},
				
				/**
				* 创建标题
				*/
				createTitle: function(){
					var id         = p.id,
						title      = p.title,
						titleId    = p.titleId,
						popMain    = p.popMain,
						isDrag     = p.isDrag,
						allowClose = p.allowClose;
					
					if( title ){
						
						var popTitle = popMain.append('<div class="l-pop-title" id="'+ titleId +'"></div>')
											  .find('.l-pop-title')
											  .html(title);
						
						if( isDrag ){
							saogaUI.ui.drag({
								dragItem:'#'+titleId,
								dragWrap:'#'+id
							});
						}
						
						if( allowClose ){
							/*添加关闭按钮*/
							if( !popMain.find('.l-pop-close').length ){
								popMain.prepend('<div class="l-pop-close"><i class="icon icon-close" title="关闭"></i></div>');
							}
							
							popMain.find('.l-pop-close')
								   .click(function(){
										g.close();
									});
						}
						
						_cache.popTitle = popTitle;
					}
				},
				
				/**
				* 创建内容
				*/
				createContent: function(){
					var popMain     = p.popMain.append('<div class="l-pop-content"></div>'),
						url         = p.url,
						ajax        = p.ajax,
						ajaxType    = p.ajaxType,
						ajaxData    = p.ajaxData,
						async       = p.async,
                        ajaxSuccess = p.ajaxSuccess,
						html        = p.html,
						popContent  = popMain.find('.l-pop-content');
					
					if( url ){
						popContent.append('<iframe src="'+ url +'" frameborder="no" border="0"></iframe>').addClass('l-pop-contentIframe');
					}else if( ajax ){
						$.ajax({
							url     : ajax,
							type    : ajaxType,
							data    : ajaxData,
							cache   : false,
							async   : async,
							success : function(data){
                                if( saogaUI.base.isFunction(ajaxSuccess) ){
                                    ajaxSuccess(data);
                                }
								popContent.append(data);
							}
						}); 
					}else if( html ){
						popContent.append(html);
					}
					
					_cache.popContent = popContent;
				},
				
				/**
				* 创建按钮
				*/
				createBtn: function(){
					var id      = p.id,
						btns    = p.btns,
						popMain = p.popMain;
						
					if( btns ){
						if( !popMain.find('.l-pop-btnWrap').length ){
							popMain.append('<div class="ui-floatCenter l-pop-btnWrap"><div class="ui-sl-floatCenter"></div></div>');
						}
						
						var i       = 0,
						    btnWrap = popMain.find('.ui-floatCenter'),
						    btnMain = popMain.find('.ui-sl-floatCenter').html('');
												
						$.each(btns,function(i, item){
							btnMain.append('<a href="javascript:;" class="ui-btn ui-floatCenter-item ui-btn-primary'+ (item.cls ? item.cls :'') +'"><span>'+item.text+'</span></a>');
							btnMain.find('a').eq(i).click(function(){
								var that = $(this);
								if( item.onclick ){
									item.onclick(id, i, item, that);							
								}
								
								//if( item.closePop === undefined || item.closePop ){
								if( item.closePop === undefined ){
									g.close(id);
								}
							});
						});
						
						_cache.btnWrap = btnWrap;
					}
				},
				
				/**
				* esc关闭函数
				*/
				escCloseFn: function(){
					var allowClose    = p.allowClose,
						allowEscClose = p.allowEscClose,
						popMain       = p.popMain;

					if( allowClose && allowEscClose ){

						var _modalKey = function(e){
							e = e || event;
							var code = e.which || event.keyCode;
							if(code === 27){
								g.close();
							}
						};
						
						if(document.attachEvent){
							document.attachEvent('onkeydown', _modalKey);
						}else{
							document.addEventListener('keydown', _modalKey, true);
						}
					}
				},
				
				/**
				* 设置显示
				*/
				setShowFn:function(){
					var win         = $(window),
						popWrap     = p.popWrap,
						popContent  = _cache.popContent,
						titleHeight = _cache.popTitle.outerHeight(),
						btnHeight   = _cache.btnWrap.outerHeight(),
						otherHeight = titleHeight + btnHeight + 30 + 40, //30是popContent的padding的和，40是top、bottom的和
						_setSize    = function(){
							var winHeight = win.height(),
								winWidth  = win.width(),
								height    = p.height,
								width     = p.width;

							if( winHeight - otherHeight < height ){
								height = winHeight - otherHeight;
								if( p.url ){
									popContent
										.find('iframe')
										.height(height)
										.width(width);
								}
							}

							popContent.css({height:height,width:width});
								
							popWrap.css({
								top: p.top || ( winHeight - popWrap.height() )/2,
								left: p.left || ( winWidth - popWrap.width() )/2
							});
						};

					_setSize();
					win.resize(_setSize);
					
					popContent
						.css({opacity:0.1})
						.animate({ 
							opacity: 1
						}, 800);


					/*popContent.css({width:300,height:300,opacity:0.5});

					var popWrap = p.popWrap,
						top     = win.height()/2 - popWrap.height()/2,
						left    = ( win.width() - popWrap.width() )/2;
					
					popWrap.css({top:top, left:left});
					
					
					popContent.animate({ 
						width: width,
						height: height,
						opacity: 1,
					}, 500, function(){
						
						top  = p.top || win.height()/2 - popWrap.height()/2,
						left = p.left || ( win.width() - popWrap.width() )/2;
						
						popWrap.animate({ 
								top: top,
								left: left, 
							}, 500);
					});*/
   
				},
				
				/**
				* 设置层级
				*/
				setZIndex: function(){
					if( p.isMask ){
						var obj        = $('.l-ui'),
							i          = 0,
							len        = obj.length,
							zIndex     = saogaUI.ui.zIndex(),
							mask       = _cache.mask,
							maskZindex = Number( mask.css('z-index') ),
							popWrap	   = p.popWrap;
						
						if( popWrap.hasClass('l-ui-current') ){
											
							for(; i<len; i++){
								obj.eq(i).css({'z-index':maskZindex - i});
							}
							
							obj.removeClass('l-ui-current');
							popWrap.css({'z-index':zIndex});
						}else{
							for(; i<len; i++){
								obj.eq(i).css({'z-index':maskZindex + len - i});
							}
						}
					}
				},
				
				/**
				* 载入时要触发的事件
				*/
				loadFn: function(){
					if( saogaUI.base.isFunction(p.onloadFn) ){
						p.onloadFn(p.id, p.popMain);
					}
				},
				
				/**
				* 运行 pop
				*/
				run: function(){
					this.createMask();
					this.createTitle();
					this.createContent();
					this.createBtn();
					this.escCloseFn();
					this.setShowFn();
					this.setZIndex();
					this.loadFn();
				},
				
				/**
				* 初始化
				*/
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined ){
							p[key] = o[key];
						}
					}
					
					var h = '';
						h += '<div class="l-ui l-pop-wrap l-ui-current" id="'+ p.id +'">';
						h += '	<table class="l-pop-table">';
						h += '		<tr><td colspan="3" class="l-pop-border l-pop-border-top"></th></tr>';
						h += '		<tr>';
						h += '			<td class="l-pop-border l-pop-border-left"></td>';
						h += '			<td class="l-pop-main"></td>';
						h += '			<td class="l-pop-border l-pop-border-right"></td>';
						h += '		</tr>';
						h += '		<tr><td colspan="3" class="l-pop-border l-pop-border-bottom"></td></tr>';
						h += '	</table>';
						h += '</div>';
						
					/*载入容器*/
					var wrap = saogaUI.ui.wrap();
					wrap.prepend(h);
					
					
					/*给默认配置项添加popWrap和popMain成员*/
					p.popWrap = $('#'+p.id);
					p.popMain = p.popWrap.find('.l-pop-main');
					
					this.run();
					
					return g;					
				}
			};
		
		/**
		* 关闭弹窗
		* @method saogaUI.ui.pop.close
		* @param {String} [id] - pop的id
		*/
		g.close = function(id){
			
			var closeFn = p.closeFn;
			
			p.popWrap.remove();
			
			_core.setZIndex();
					
			p.popWrap.find('.l-select-wrap').addClass('fn-hide');
			
			/*如果没有其他需要遮罩的的ui*/
			if( !$('.l-ui-mask').length ){
				saogaUI.ui.unlock();
			}
			
			/*关闭时要触发的事件*/
			if( saogaUI.base.isFunction(closeFn) ){
				id = id !== undefined ? id : p.id;
				p.closeFn(id);
			}
			
		};
		
		/**
		* 修改标题
		* @method saogaUI.ui.pop.modifyTitle
		* @param {String} title 标题
		*/
		g.modifyTitle = function(title){
			_cache.popTitle.html(title);
			return g;
		};
		
		/**
		* 修改按钮
		* @method saogaUI.ui.pop.modifyBtns 
	    * @param {Object} btns 弹出框的按钮集合
	    * @param {Function} btns.onclick 点击按钮要执行的动作，如果要执行一些异步的动作，closePop必须是false
	    * @param {Function} btns.closePop 点击按钮之后是否直接关闭弹出框，默认直接关闭
	    * @param {Function} btns.cls 按钮自定义class
	    * @param {Function} btns.text 按钮文本
		*/
		g.modifyBtns = function(btns){
			p.btns = btns;
			_core.createBtn();
			return g;
		};
		
		/**
		* 修改窗体大小
		* @method saogaUI.ui.pop.modifyWrap 
		* @param {Number} width 
		* @param {Number} height
		*/
		g.modifyWrap = function(width, height){
			p.width  = width;
			p.height = height;
			_core.setShowFn();
			
			return g;
		};
		
		return _core.init(o);
	};
	
	return function(o){
		return new Pop(o);
	};
});
define('core/tip',[],function(){
	
	
	/**
	* saogaUI.ui.pop 弹出窗控件
	* @class saogaUI.ui.tip
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options 弹出窗参数
    * @param {String} options.id tip的id
    * @param {String} options.target tip的触发对象
    * @param {String} options.targetWrap target的最外层，默认网页的最外层为body，因为有可能在其他元素中定位
    * @param {String} options.header tip标题
    * @param {String} options.html tip的html内容
    * @param {String} options.render render事件，动态内容
    * @param {String} options.width 宽度
    * @param {String} options.isTrack 是否鼠标跟随
    * @param {String} options.isArrow 是否需要箭头
    * @param {String} options.arrowDirection 设箭头位置，默认是向上向下，可选是向左向右
    * @param {String} options.event 触发显示tip
	* @return {Object} tip对象
	*/
	var Tip = function(o){
		var 
			/**
			* 全局对象
			* @public
			*/
			g = this,
			
			/**
			* 默认配置
			* @private
			*/
			p = {
				id             : 'l-tip-'+(new Date()).valueOf(),
				target         : '',
				targetWrap     : 'body',          //target的最外层，默认网页的最外层为body，因为有可能在其他元素中定位
				header         : '',              //tip是否有标题
				html           : '',              //tip的内容
				render         : null,            //tip的内容事件，与data-tip、html互斥
				width          : 150,
				isTrack        : false,           //是否鼠标跟随
				isArrow        : true,           //是否需要箭头
				arrowDirection : 'topBottom',     //设箭头位置，默认是向上向下，可选是向左向右
				//isInitShow     : false,           //初始化显示tip
				event          : 'mouseover'      //触发显示tip
			},
			
			/**
			* 内部对象
			* @private
			*/
			c = {
				createHeader: function(){
					var tipHeader = p.tipHeader;
					if( tipHeader ){
						p.tipMain.append('<h5>'+ tipHeader +'</h5>');
					}
				},
				
				createContent: function(){
					var h = '';
					
					if( p.render && saogaUI.base.isFunction(p.render) ){
						h = p.render(p.target);
					}else if(p.html){
						h = p.html;
					}else{
						h = p.target.attr('data-tip');
					}
					
					if( !p.tipMain.find('.l-tipMain-text').length ){
						p.tipMain.append('<div class="l-tipMain-text">'+ h +'</div>');
					}
				},
				
				arrow: function(){
					if( p.isArrow ){
						var tipWrap          = p.tipWrap.addClass('l-tip-Arrow'),
							tipArrow         = tipWrap.prepend('<span class="l-tipArrow"></span>').find('.l-tipArrow'),
							tipWrapHeight    = tipWrap[0].offsetHeight,
							tipWrapWidth     = tipWrap[0].offsetWidth,
							target           = p.target,
							targetWidth      = target[0].offsetWidth,
							targetHeight     = target[0].offsetHeight,
							targetTop        = target.offset().top,
							targetLeft       = target.offset().left,
							targetWrap       = p.targetWrap,      
							targetWrapWidth  = targetWrap[0].offsetWidth,
							targetWrapHeight = targetWrap[0].offsetHeight,
							arrowDirection   = p.arrowDirection,
							top              = 0,
							left             = 0;
						
						if( arrowDirection === 'topBottom' ){
							tipArrow.addClass('l-tipArrow-topBottom');
							var tipArrowH = tipArrow.height(),
								tipArrowW = tipArrow.width();
							/*判断obj在左还是在右*/
							if( targetLeft < targetWrapWidth/2 - targetWidth/2 ){
								left = targetLeft;
								/*判断obj在上还是在下*/
								if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
									top = targetTop + targetHeight + tipArrowH;
									tipArrow.addClass('l-tipArrow-topLeft');
								}else{
									top = targetTop - tipWrapHeight - tipArrowH;
									tipArrow.addClass('l-tipArrow-bottomLeft');
								}
							}else{
								left = targetLeft + targetWidth - tipWrapWidth;
								/*判断obj在上还是在下*/
								if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
									top = targetTop + targetHeight + tipArrowH;
									tipArrow.addClass('l-tipArrow-topRight');
								}else{
									top = targetTop - tipWrapHeight - tipArrowH;
									tipArrow.addClass('l-tipArrow-bottomRight');
								}
							}
						}else{
							var tipArrowH = tipArrow.height(),
								tipArrowW = tipArrow.width();
							tipArrow.addClass('l-tipArrow-leftRight');
							/*判断obj在左还是在右*/
							if( targetLeft < targetWrapWidth/2 - targetWidth/2 ){
								left = targetLeft + targetWidth + tipArrowW;
								/*判断obj在上还是在下*/
								if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
									top = targetTop;
									tipArrow.addClass('l-tipArrow-leftTop');
								}else{
									top = targetTop + targetHeight - tipWrapHeight;
									tipArrow.addClass('l-tipArrow-leftBottom');
								}
							}else{
								left = targetLeft - targetWidth -tipArrowW;
								/*判断obj在上还是在下*/
								if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
									top = targetTop;
									tipArrow.addClass('l-tipArrow-rightTop');
								}else{
									top = targetTop + targetHeight - tipWrapHeight;
									tipArrow.addClass('l-tipArrow-rightBottom');
								}
							}
						}
						/*var tipArrowTop    = tipArrow.css('top') !='auto' ? parseInt(tipArrow.css('top')) : 0,
						    tipArrowLeft   = tipArrow.css('left') !='auto' ? parseInt(tipArrow.css('left')) : 0,
						    tipArrowBottom = tipArrow.css('bottom') !='auto' ? parseInt(tipArrow.css('bottom')) : 0,
							tipArrowRight  = tipArrow.css('right') !='auto' ? parseInt(tipArrow.css('right')) : 0;
							
						tipWrap.css({top:top,left:left + tipArrowLeft + tipArrowRight});*/
						tipWrap.css({top:top,left:left});
						
						//console.log(tipArrow.position().left)
					}
				},
				
				defaultPositon: function(){
					var tipWrap      = p.tipWrap.addClass('l-tip-default'),
						top          = 0,
						left         = 0,
						target       = p.target,
						targetWidth  = target[0].offsetWidth,
						targetHeight = target[0].offsetHeight,
						targetOffset = target.offset(),
						targetTop    = targetOffset.top,
						targetLeft   = targetOffset.left,
					
					left = targetLeft;
					top = targetTop + targetHeight + 5;
					tipWrap.css({top:top, left:left});
				},
				
				trackMouse: function(){
					if( p.isTrack ){
						var tipWrap       = p.tipWrap.addClass('l-tip-track'),
							mousePosition = saogaUI.ui.mousePosition();
						tipWrap.css({top:mousePosition.positionY + 5, left:mousePosition.positionX  + 5});
					}
				},
				
				remove: function(){
					p.tipWrap.remove();
					//p = null;
					//c = null;
					//g = null;
				},
				
				run:function(){
					this.createHeader();
					this.createContent();
					this.defaultPositon();
					this.trackMouse();
					this.arrow();
				},
				
				/**
				* 初始化
				*/
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined ){
							p[key] = o[key];
						}
					}
					
					var target = p.target,
						event  = p.event,
						isShow = false;
					

					$('body').off(event, target).on(event, target, function(e){
						
						/*载入容器*/
						var wrap   = saogaUI.ui.wrap(),
							h	   = '',
							id     = p.id,
							width  = p.width;
						
						h += '<div id="'+ id +'" class="l-ui l-tip">';
						h += '	<div class="l-tipHeader"></div>';
						h += '	<div class="l-tipMain"></div>';
						h += '</div>';
						
						/*给p添加两个新成员*/
						p.tipWrap = wrap.prepend(h)
										.find('#'+id)
										.css({'width':width, 'z-index':saogaUI.ui.zIndex()});
						
						p.tipMain = p.tipWrap.find('.l-tipMain');
						
						/*给p修改两个成员*/
						p.target = $(e.currentTarget);
						p.targetWrap = $(p.targetWrap);
						
						c.run();
						
						/*事件是点击时*/
						if( p.event === 'click' ){
							if( $('.l-tip').length ){
								p.tipWrap.siblings('.l-tip').remove();
							}
							
							$(target).on('mouseout', function(){
								isShow = true;
							}).on('mouseover', function(){
								isShow = false;
							});
							
							p.tipWrap.on('mouseout', function(){
								isShow = true;
							}).on('mouseover', function(){
								isShow = false;
							});
							
							$(window).off('click').on('click',function(){
								if( isShow ){
									c.remove();
								}
							});
							
						}
					}).on('mousemove', target, function(){
						c.trackMouse();
					}).on('mouseout', target, function(){
						if( p.event === 'mouseover' ){
							c.remove();
						}
					});
					
					return g;
				}
			};
		
		/**
		* 关闭tip
		* @method saogaUI.ui.tip.close
		*/
		g.close = function(){
			c.remove();
		};
		
		return c.init(o);
	};
	
	return function(o){
		return new Tip(o);
	};
});
define('core/tab',['core/saogaUI'], function(saogaUI){
	
	
	
	/**
	* saogaUI.ui.pop 弹出窗控件
	* @class saogaUI.ui.tab
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options 弹出窗参数
    * @param {String} options.tabItem tab选卡对象
    * @param {String} options.tabWrap tab切换内容对象
    * @param {String} options.tabEvent 切换事件，默认click
    * @param {Number} options.tabIndex tab选卡起始位置，从0开始，默认0
    * @param {Boolean} options.isAuto 是否自动播放，默认false
    * @param {Number} options.autoTime 自动播放时间
    * @param {Number} options.autoSpeed 自动播放速度
    * @param {Function} options.onclick 切换后执行的函数
	* @return {Object} tab对象
	*/	
	var tab = function(options){

		var o = options || {};
		
		if( !o.tabItem ){return false;}
		
		var tabItem   = o.tabItem,                          //tab选卡对象
			tabWrap   = o.tabWrap || null,                  //tab切换内容对象
			tabEvent  = o.tabEvent || 'click',              //切换事件
			tabIndex  = o.tabIndex || 0,                    //初始位置
			isAuto    = o.isAuto || false,                  //是否自动播放
			autoTime  = o.autoTime || 2000,                 //自动播放时间
			autoSpeed = o.autoSpeed || 0,                   //自动播放速度
			onclick   = o.onclick ? o.onclick : null;       //切换后执行的函数
		
		/*切换动作*/
		var tabFn = {
			/*初始化*/
			init: function(){
				$(tabWrap).eq(tabIndex).show().siblings(tabWrap).hide();
				if( tabWrap !== null ){
					var index = tabIndex;
					$(tabItem).bind(tabEvent,function(){
						index = $(tabItem).index(this);
						tabFn.cutoverFn(index);
					});
					if( isAuto ){
						tabFn.autoFn(index);
					}
				}
			},
			
			/*切换函数*/
			cutoverFn: function(i){
				//tab切换内容的html不为空才做下面动作
				if( $(tabWrap).eq(i).html() !== '' ){
					if( autoSpeed ){
						$(tabWrap).eq(i).stop(true,true).fadeIn(autoSpeed).siblings(tabWrap).fadeOut(autoSpeed);
					}else{
						$(tabWrap).eq(i).stop(true,true).show().siblings(tabWrap).hide();
					}
					$(tabItem).eq(i).addClass('on').siblings(tabItem).removeClass('on');
				}else{
					$(tabWrap).hide();
				}
				//点击tabItem执行函数
				if( saogaUI.base.isFunction(onclick) ){
					onclick(i, $(tabWrap));
				}
			},
			
			/*自动播放函数*/
			autoFn: function(i){
				var _mun    = $(tabWrap).size(),
					_MyTime = setInterval(function(){
						tabFn.cutoverFn(i);
						i++;
						if( i === _mun ){
							i = 0;
						}
					},autoTime);
				$(tabItem).parent().hover(function(){
					clearInterval(_MyTime);
				},function(){
					_MyTime = setInterval(function(){
						tabFn.cutoverFn(i);
						i ++;
						if( i === _mun ){
							i = 0;
						}
					},autoTime);
				});
			}
		};//end tabfn
		
		tabFn.init();
	};
	
	return tab;
});
define('core/validator',['core/saogaUI', 'i18n!core/nls/str'], function(saogaUI, lang){
	
	
		
	/**
	* TODO
	* saogaUI.ui.validator
	* @class saogaUI.ui.validator
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 
    * @param {String} o.id 
	* @return {Object} select对象
	*/
	
	var Validator = function(o){
		
		var 
			/**
			* 当前对象
			*/
			g = this,
			
			/**
			* 默认配置
			*/
			p = {
				target: null,
				label: null
			},
				
			/**
			* 缓存池
			*/
			t = {
				//submit: false
			},
			
			/**
			* XXX
			* 代码逻辑
			*/
			c = {
				
				/* 强制勾选 */
				check: function(sVal, oItem){
					if( oItem[0].type === 'checkbox' && !oItem.attr('checked') ){
						return '必须勾选！';
					}

					if(  oItem[0].type === 'radio' && !$("input:radio[name='"+ oItem[0].name +"']:checked").attr('checked') ){
						return '必须勾选！';
					}
				},
				
				/* 非空 */
				required: function(sVal){
					if( !sVal.trims() ){
						return '不能为空！';
					}
				},
				
				/* 固定长度 */
				length: function(sVal, sParam){
					if( sVal.length !== Number(sParam) ){
						return '输入字符长度等于' + sParam +'个';
					}
				},
				
				/* 最小长度 */
				minLength: function(sVal, sParam){
					if(sVal.length < sParam){
						return '输入字符长度不小于' + sParam +'个';
					}
				},
				
				/* 最大长度 */
				maxLength: function(sVal, sParam){
					if(sVal.length > sParam){
						return '输入字符长度不大于' + sParam +'个';
					}
				},
				
				/* 整数 */
				integer: function(sVal){
					var f = parseFloat(sVal);
					if(!(!isNaN(f) && f.toString() == sVal && Math.round(f) == f)){
						return '请输入一个正确的整数值';
					}
				},
				
				/* 正整数 */
				digits: function(sVal){
					if( !/^\d+$/.test(sVal) ){
						return '请输入一个非负整数，含0';
					}
				},
				
				/* 浮点数 */
				floatNumber: function(sVal, sParam){
					var reg = new RegExp('^[0-9]+[\.][0-9]{'+ sParam +'}$');
					if( !reg.test(sVal) ){
						return '请输入一个精确到'+ sParam +'位小数的数值';
					}
				},
				
				/* 数字 */
				number: function(sVal){
					sVal = sVal.trims();
					if( isNaN(Number(sVal)) || !sVal.length ){
						return '请输入一个正确的数字';
					}
				},
				
				/* 邮箱 */
				email: function(sVal){
					if( !/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(sVal) ){
						return '邮箱格式不正确，请检查！';
					}
				},
				
				/* 手机 */
				mobile: function(sVal){
					if( !/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/.test(sVal) ){
						return '手机号码不正确，请检查！如：13412345678';
					}
				},
				
				/* 电话 */
				phone: function(sVal){
					if( !/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(sVal) ){
						return '电话号码不正确，请检查！如：0592-1234567';
					}
				},
				
				/* 网址 */
				url: function(sVal){
					if( !/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(sVal) ){
						return '请输入正确的网址，比如:http://www.example.com';
					}
				},
				
				//FIXME 
				/* 日期 */
				date: function(sVal, sParam){
					var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
					if (!regex.test(sVal)) return false;
					var d = new Date(sVal.replace(regex, '$2/$1/$3'));
					return ( parseInt(RegExp.$2, 10) == (1 + d.getMonth()) ) && (parseInt(RegExp.$1, 10) == d.getDate()) && (parseInt(RegExp.$3, 10) == d.getFullYear() );
				},
				
				format: function(sVal, sParam, oItem){
					var reg = new RegExp(sParam);
					if( !reg.test(sVal) ){
						return oItem.attr('data-validate-formatText');
					}
				},
				
				ajax: function(sVal, sParam, oItem, oMessage){
					$.ajax({
						type: 'POST',
						url: sParam,
						cache: false,
						dataType: "json",
						beforeSend: function(){
							
						},
						success: function(data){
                            if( !data ){
                                oItem.addClass('l-form-error');
                                oMessage.html( oItem.attr('data-ajax-formatText') );
                            }
						},
						error: function(data){
							console.log(data);
						}
					});
				},
				
				route: function(sVal, sRule, oItem, oMessage){
					var oThat      = this,
						aRule      = sRule.split(';'),
						len        = aRule.length,
						i          = 0,
						rCode      = /\=/,
						rFormat    = /format\=|ajax\=/
						isFunction = saogaUI.base.isFunction;
						
					for(; i<len; i++){
						var sText = '',
							fRule = null;
						
						if( rCode.test(aRule[i]) ){
							var aChild = aRule[i].split('=');
							
							if( rFormat.test(aRule[i]) ){
								if( aChild[0] === 'format' ){
									aChild = ['format', aRule[i].replace(rFormat,'')];
								}else{
									var tmpVal = '';
									tmpVal = aRule[i].replace(rFormat,'');
									tmpVal = tmpVal.replace(/{{value}}/, sVal);
									aChild = ['ajax', tmpVal];
								}
							}
							
							fRule = oThat[aChild[0]];
							
							if( fRule && isFunction(fRule) ){
								sText = fRule(sVal, aChild[1], oItem, oMessage);
							}
							
						}else{
							
							fRule = oThat[aRule[i]];
							
							if( fRule && isFunction(fRule) ){
								sText = fRule(sVal, oItem, oMessage);
							}
						}

						if( sText ){
							return sText;
						}
					}
				},
				
				run: function(){
					var oThat      = this,
						oTarget    = p.target,
						bPass      = false,
						fAction    = function(oSelf){
										var sVal    = oSelf.val(),
											sRule   = oSelf.attr('data-validate'),
											parents = oSelf.parents('.ui-form'),
											message = parents.find('.ui-form-message'),
                                            html    = null;
											
										if( oSelf.next('.ui-form-message').length ){
											message = oSelf.next('.ui-form-message');
										}

										if( html = oThat.route(sVal, sRule, oSelf, message) ){
                                            oSelf.addClass('l-form-error');
                                            message.html(html);
                                            return true;
                                        }
                                        
                                        return false;
									},
						fUnAction  = function(oSelf){
										var sVal    = oSelf.val(),
											parents = oSelf.parents('.ui-form'),
											message = parents.find('.ui-form-message');

										if( oSelf.next('.ui-form-message').length ){
											message = oSelf.next('.ui-form-message');
										}

                                        if( oSelf[0].type === 'checkbox' || oSelf[0].type === 'radio' ){
                                            $("input[name='"+ oSelf[0].name +"']").removeClass('l-form-error');
                                        }else{
                                            oSelf.removeClass('l-form-error');
                                        }
                                        
										message.empty();
									},
						fActionAll = function(){
										var oItem   = oTarget.find('[data-validate]'),
											len     = oItem.length,
											i       = 0,
											bSumbit = false;
											
										for(; i<len; i++){
											bSumbit = !fAction( oItem.eq(i) );
											if( bSumbit ){
												fUnAction( oItem.eq(i) );
											}
										}
									}
						
					oTarget.on('blur', '[data-validate]', function(e){
						fAction( $(e.currentTarget) );
					});
					
					oTarget.on('focus', '[data-validate]', function(e){
						fUnAction( $(e.currentTarget) );
					});
					
					oTarget.on('submit', function(){
						fActionAll();
                        if( !g.getStatus() ){
                            return false;
                        }
					});
					
					oTarget.on('all', function(){
						fActionAll();
					});
				},
				
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
							p[key] = o[key];
						}
					}
					
					p.target = $(p.target);
					
					c.run();
				}
			};
			
		g.reset = function(){
			var oTarget  = p.target,
                oItem    = oTarget.find('[data-validate]'),
                oMessage = oTarget.find('.ui-form-message'),
                len      = oItem.length,
                i        = 0;
            
            for(; i<len; i++){
                oItem
                    .eq(i)
                    .val('')
                    .removeClass('l-form-error');
                oMessage.eq(i).empty();
            }
		}
		
		g.getStatus = function(){
			return !p.target.find('.l-form-error').length;
		}
		
		g.validatorAll = function(){
			p.target.trigger('all');
            return g.getStatus();
		}

		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new Validator(o);
	};
});
define('core/selectArea',['core/saogaUI'], function(saogaUI){
	
	
	
	/**
	* saogaUI.ui.selectArea 地区控件
	* @class saogaUI.ui.selectArea
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} options selectArea参数
    * @param {Object} options.data 数据源
    * @param {Object} options.initValue 初始值
    * @param {String} options.initValue.province 省级初始值
    * @param {String} options.initValue.city 市级初始值
    * @param {String} options.initValue.county 区、县级初始值
    * @param {String} options.province 省级对象选择器
    * @param {String} options.city 市级对象选择器
    * @param {String} options.county 区、县级对象选择器
	*/
	var selectArea = function(options){
		var data         = options.data ? options.data : [],
			initValue    = options.initValue ? options.initValue : {province:'',city:'',county:''},
			provinceWrap = $(options.province),
			cityWrap     = $(options.city),
			countyWrap   = $(options.county),
			html         = '<option value="">不限</option>',
			g            = this,
			_core        = {
				getProvince: function(){
					var i = 0,
						l = data.length,
						s = '',
						o = this;
					
					s += html;
					
					for(; i < l; i++){
						if( data[i].Province === initValue.province ){
							s += '<option selected value="'+ data[i].Province +'" data-index="'+ i +'">'+ data[i].ProvinceName +'</option>';
							o.getCity(i);
						}else{
							s += '<option value="'+ data[i].Province +'" data-index="'+ i +'">'+ data[i].ProvinceName +'</option>';
						}
					}
					provinceWrap.html(s);
					provinceWrap.on('change', function(e){
						var that     = $(this),
							val      = that.val(),
							selected = that.find('option:selected'),
							text     = selected.text(),
							index    = selected.attr('data-index');

						o.getCity(Number(index));
						o.getcounty();
					});
				},
				
				getCity: function(index){
					if( data[index] !== undefined ){
						var s        = '',
							cityData = data[index],
							o        = this,
							i        = 0, 
							c 		 = cityData.CityArray ? cityData.CityArray.length : 0;

						s += html;
						for(; i < c; i++){
							if( cityData.CityArray[i].City === initValue.city ){
								s += '<option selected value="'+cityData.CityArray[i].City+'" data-index="'+ i +'">'+ cityData.CityArray[i].CityName +'</option>';
								o.getcounty(cityData.CityArray[i]);
							}else{
								s += '<option value="'+cityData.CityArray[i].City+'" data-index="'+ i +'">'+ cityData.CityArray[i].CityName +'</option>';
							}
						}
						cityWrap.html(s);
						cityWrap.on('change', function(e){
							var that     = $(this),
								val      = that.val(),
								selected = that.find('option:selected'),
								text     = selected.text(),
								index    = selected.attr('data-index');
							o.getcounty(cityData.CityArray[Number(index)]);
						});
					}else{
						cityWrap.html(html);
					}
				},
				
				getcounty: function(data){
					if( data !== undefined ){
						var s = '',
							o = this,
							i = 0,
							c = data.CountyArray ? data.CountyArray.length : 0;
						
						s += html;
					    for(; i < c; i++){
					    	if( data.CountyArray[i].County === initValue.county ){
							    s += '<option selected value="'+data.CountyArray[i].County+'" data-index="'+ i +'">'+ data.CountyArray[i].CountyName +'</option>';
					    	}else{
							    s += '<option value="'+data.CountyArray[i].County+'" data-index="'+ i +'">'+ data.CountyArray[i].CountyName +'</option>';
					    	}
					    }
					    countyWrap.html(s);
					}else{
						countyWrap.html(html);
					}
				},
				
				init: function(){
					provinceWrap.html(html);
					cityWrap.html(html);
					countyWrap.html(html);
				},
				
				run: function(){
					this.init();
					this.getProvince();
					return g;
				}
			};
		
		_core.run();
		
		/**
		* selectArea 重置
		* @method saogaUI.ui.selectArea.reset
		* @return {Object} 
		*/
		g.reset = function(){
			cityWrap.html(html);
			countyWrap.html(html);
			provinceWrap.find('option').eq(0).attr('selected', true);
			cityWrap.find('option').eq(0).attr('selected', true);
			countyWrap.find('option').eq(0).attr('selected', true);
			
			return g;
		};
		
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new selectArea(o);
	};

});
define('core/select_debug',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* saogaUI.ui.select 下拉框控件
	* @class saogaUI.ui.select
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 下拉框参数
    * @param {String} o.id 下拉框id
	* @return {Object} select对象
	*/
	
	var Select = function(o){
		
		var 
			/**
			* 当前对象
			*/
			g = this,
			
			/**
			* 默认配置
			*/
			p = {
					id           : 'l-select-'+(new Date()).valueOf(),
					data         : null,
					selectedData : null,
					ajax         : null,
					//isSimple     : true,   //是否是简单的数据格式
					target       : null,
					wrap         : null,   //target外框，一般不设置
					width        : 200,
					height       : 'auto',
					type         : 'single', //multiple、single、tree
					checkbox     : false,  //multiple时设置有效，与radio互斥
					radio        : false,  //multiple时设置有效，与checkbox互斥
					isArrow      : true,
					onClick      : null,
					onRightClick : null,
					onMouseOver  : null,
					onMouseOut   : null,
					onLoad       : null,
					isAllowEnter : true
				},
				
			/**
			* 缓存池
			*/
			t = {
				data:[], //临时数据
				selectedData:[]  //选中的数据
			},
			
			/**
			* 代码逻辑
			*/
			c = {
					//TODO
					move:function(obj, item, index){
						var objOrigin      = obj[0],
							scrollHeight   = objOrigin.scrollHeight,
							//offsetHeight  = objOrigin.offsetHeight,
							clientHeight   = objOrigin.clientHeight,
							offsetTop      = objOrigin.offsetTop,
							itemOffsetTop  = item[0].offsetTop,
							itemHeight     = item.outerHeight(),
							itemOffsetTop2 = item.offset().top - obj.offset().top;           
							
						//console.log(itemOffsetTop,clientHeight,offsetTop, item.offset().top - obj.offset().top );
						console.log( itemOffsetTop,itemOffsetTop2,clientHeight, Math.ceil(scrollHeight / clientHeight) )
						
						if( item.offset().top - obj.offset().top > clientHeight ){
							//scrollTop = ;
							//obj.scrollTop(obj.scrollTop() + itemHeight);
						}
						if( item.offset().top - obj.offset().top > itemOffsetTop - clientHeight ){
							//scrollTop = obj.scrollTop() + itemHeight;
						}
						
						if( itemOffsetTop + itemHeight > clientHeight ){
							obj.scrollTop(obj.scrollTop() + itemHeight);
						}
						if( itemOffsetTop2 < itemHeight ){
							console.log(obj.scrollTop(),itemHeight)
							obj.scrollTop(obj.scrollTop() - itemHeight);
						}
						
					},
					
					show:function(obj){
						var allDownWrap = $('.l-select-down'),
							downWrap    = obj.find('.l-select-down'),
							wrap        = $('.l-select-wrap');

						allDownWrap.addClass('fn-hide');
						downWrap.removeClass('fn-hide');
						wrap.css({'z-index':''});
						obj.css({'z-index':'10'});
					},
					
					close:function(){
						var downWrap = $('.l-select-down'),
							wrap     = $('.l-select-wrap');
						
						downWrap.addClass('fn-hide');
						wrap.css({'z-index':''});
					},
					
					/**
					* 创建single html
					*/
					createSingleHtml: function(){
						var target  = p.target,
							isArrow = p.isArrow,
							len     = p.target.length,
							i       = 0;
						
						/*遍历多个target*/						
						for(; i<len; i++){
                            var selectItem      = target.eq(i);
                            
                            if( selectItem.parent().hasClass('l-select-wrap') ){
                                continue;
                            }
                            
							var selectItemWidth = selectItem.outerWidth(),
								selectItemClass = selectItem[0].className,
								selectItemVal   = selectItem.wrap('<div class="l-select-wrap"></div>')
															.after('<div class="l-select-single"><div class="l-select-single-init '+ selectItemClass +'"></div><div class="l-select-down fn-hide"><ul class="l-select-single-ul"></ul></div></div>')
															.val(),
								selectedItem    = selectItem.find('option:selected'),
								option          = selectItem.find('option'),
								optionLen       = option.length,
								h               = 0,
								single          = selectItem.next('.l-select-single'),
								singleInit      = single.find('.l-select-single-init'),
								singleInitHtml  = selectedItem.html(),
								singleUl        = single.find('.l-select-single-ul'),
								singleUlHtml    = '';
								
							if( isArrow ){
								single.append('<div class="l-select-single-arrow"></div>');
								singleInit.addClass('l-select-single-init-arrow');
							}
							
							/*遍历select中的option*/
							for(; h<optionLen; h++){
								var optionItem     = option.eq(h),
									optionItemVal  = optionItem.val(),
									optionItemHtml = optionItem.html();
									
								if( optionItemVal === selectItemVal && optionItemVal !== '' ){
									singleUlHtml += '<li class="l-select-single-li on" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}else{
									singleUlHtml += '<li class="l-select-single-li" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}
							}
							
							//selectItem.hide();
							singleInit
								.html(singleInitHtml)
								.width(selectItemWidth);
								
							singleUl
								.html(singleUlHtml)
								.width(singleInit.outerWidth()-2);
								
							p.wrap = p.target.parent();
						}
					},
					
					/**
					* 刷新single html
					*/
					refreshSingleHtml:function(){
						var target  = p.target,
							len     = p.target.length,
							i       = 0;
						
						/*遍历多个target*/						
						for(; i<len; i++){
							var selectItem      = target.eq(i),
                                selectItemWidth = selectItem.outerWidth(),
								selectItemVal   = selectItem.val(),
								selectedItem    = selectItem.find('option:selected'),
								option          = selectItem.find('option'),
								optionLen       = option.length,
								h               = 0,
								single          = selectItem.next('.l-select-single'),
								singleInit      = single.find('.l-select-single-init'),
								singleInitHtml  = selectedItem.html(),
								singleUl        = single.find('.l-select-single-ul'),
								singleUlHtml    = '';
							
							/*遍历select中的option*/
							for(; h<optionLen; h++){
								var optionItem     = option.eq(h),
									optionItemVal  = optionItem.val(),
									optionItemHtml = optionItem.html();
									
								if( optionItemVal === selectItemVal && optionItemVal !== '' ){
									singleUlHtml += '<li class="l-select-single-li on" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}else{
									singleUlHtml += '<li class="l-select-single-li" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}
							}
							
							singleInit
								.html(singleInitHtml)
								.width(selectItemWidth);
								
							singleUl
								.html(singleUlHtml);
								//.width(singleInit.outerWidth()-2);
								//console.log(singleInit.outerWidth()-2,selectItemWidth)
								
							p.wrap = p.target.parent();
						}
					},
					
					/**
					* single事件处理
					*/
					singleFn: function(){
						var that   = this,
							wrap   = p.wrap,
							item   = null,
							win    = $('body'),
							isShow = false;
							
						saogaUI.ui.onselectstart(wrap);
						
						wrap
							.on('click', '.l-select-single-li', function(e){
								var self       = $(e.currentTarget),
									index      = self.attr('data-index'),
									html       = self.html(),
									select     = self.parents('.l-select-wrap').find('select'),
									option     = select.find('option').eq(index),
									singleInit = self.parent().prev();
								
								isShow = false;
								singleInit.html(html);
								option.attr('selected', true);
								that.close();
								select.trigger('change');
							})
							.on('mouseover', '.l-select-single-li', function(e){
								var self     = $(e.currentTarget),
									siblings = self.siblings();
									
								self.addClass('on');
								siblings.removeClass('on');
							})
							.on('click','.l-select-single-init',function(e){
								var self    = $(e.currentTarget),
									parents = self.parents('.l-select-wrap'),
									width   = self.outerWidth(),
									singleUl= parents.find('.l-select-single-ul');
									
								singleUl.width(width-2); //修复refreshSingleHtml时获取宽度有误
									
								isShow = true;
								item   = self;  //点击后获取对象
								that.show(parents);
								e.stopPropagation();
								return false;
							})
							.on('change','select',function(){
								that.refreshSingleHtml();
							});

						win
							.on('click',function(){
								if( isShow ){
									that.close();
									isShow = false;
								}
							})
							.on('keydown',function(e){
								if(isShow && item){
									var down   = item.next().find('.l-select-single-ul'),
										li     = down.find('.l-select-single-li'),
										len    = li.length,
										index  = down.find('.on').attr('data-index');

									e.stopPropagation();
									switch(e.keyCode){
										case 13:
											item.html(li.eq(index).html());
											that.close();
											isShow = false;
										break;
										case 38:
											if(index > 0){
												index --;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down, down.find('.on'), index);
											}
											e.preventDefault();
										break;
										case 40:
											if(index < len-1){
												index++;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down, down.find('.on'), index);
											}
											e.preventDefault();
										break;
									}
								}
							});
					},
					
					/**
					* 创建multiple html
					*/
					createMultipleHtml: function(){
						var target = p.target,
							wrap   = target.parent(),
							width  = p.width,
							html;
							
						if( !wrap.hasClass('l-select-wrap') ){
							wrap = target.wrap('<div class="l-select-wrap"></div>').parent();
						}

						html = '<div class="l-select-multiple-selected fn-clear" style="width:'+ width +'px">'+
									'<ul>'+
										'<li class="l-select-multiple-selected-input">'+
											'<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="l-select-multiple-input" />'+
										'</li>'+
									'</ul>'+
								'</div>'+
								'<div class="l-select-down fn-hide"><ul class="l-select-multiple-down" style="width:'+ (width-2) +'px"></ul></div>';
						
						if( !wrap.find('.l-select-multiple').length ){
							wrap.append('<div class="l-select-multiple">'+ html +'</duv>');
						}else{
							wrap.find('.l-select-multiple').html(html);
						}
						
						p.wrap = wrap; 
					},
					
					/**
					* 刷新multiple 选项html
					*/
					refreshMultipleHtml: function(){
						var wrap        = p.wrap,
							down        = wrap.find('.l-select-multiple-down'),
							checkbox    = p.checkbox,
							radio       = p.radio,
							input       = p.wrap.find('.l-select-multiple-input'),
							val         = input.val(),
							isHasVal    = val === '' || val === undefined,
							data        = ( checkbox || radio ) ? ( isHasVal ? p.data : t.data ) : t.data,
							dataLen     = data ? data.length : 0,
							i           = 0,
							str         = '';

						if( checkbox ){
							str += '<li class="fn-clear"><span class="l-checkbox l-checkbox-all fn-left"></span><span class="fn-left">全选</span></li>'
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li'+ (i === 0 ? ' on' : '') +' fn-clear" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'" data-index="'+ i +'">'+ 
											'<span class="l-checkbox fn-left l-checkbox-'+ i +'"></span>' +
											'<span class="fn-left">' +
												data[i].name +
											'</span>' +
										'</li>';
							}
						}else if( radio ){
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li'+ (i === 0 ? ' on' : '') +' fn-clear" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'" data-index="'+ i +'">'+ 
											'<span class="l-radio fn-left l-radio-'+ i +'"></span>' +
											'<span class="fn-left">' +
												data[i].name +
											'</span>' +
										'</li>';
							}
						}else{
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li l-select-multiple-down-li-'+ i + (i === 0 ? ' on' : '') +'" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'">'+ data[i].name +'</li>';
							}
						}
						down.html( dataLen ? str : '' );
					},
					
					/**
					* multiple修改已选数据
					*/
					modifyMultipleSelectedData: function(){
						var data         = p.data,
							dataLen      = data ? data.length :0,
							y            = 0,
							input         = p.wrap.find('.l-select-multiple-input'),
							selectedData = t.selectedData,
							len          = selectedData.length,
							inputVal     = input.val(),
							checkbox     = p.checkbox,
							radio        = p.radio,
							reg          = new RegExp((inputVal?inputVal:'').toLowerCase()),
							val          = null,
							name         = null,
							isSelected   = false;
							
						
						if( ( checkbox || radio ) && inputVal === '' ){ return; }
						t.data = [];

						for(; y<dataLen; y++){
						
							val        = data[y].val ? data[y].val + '' : '',
							name       = data[y].name ? data[y].name + '' : '',
							isSelected = false;
							
							//过滤已选数据
							for(var h = 0; h<len; h++){
								if( selectedData[h] && selectedData[h].name === data[y].name ){
									isSelected = true;
								}
							}
							
							if( reg.test(val.toLowerCase()) || reg.test(name.toLowerCase()) ){
								if( !isSelected ){
									t.data.push(data[y]);
								}else if( checkbox || radio ){
									t.data.push(data[y]);
								}
							}
						}
						
					},

					/**
					* multiple事件处理
					*/
					multipleFn: function(){
						var that      = this,
							target    = p.target,
							wrap      = p.wrap,
							checkbox  = p.checkbox,
							radio     = p.radio,
							selected  = wrap.find('.l-select-multiple-selected'),
							input     = wrap.find('.l-select-multiple-input'),
							down      = wrap.find('.l-select-multiple-down'),
							data      = p.data,
							dataLen   = data ? data.length :0,
							win       = $('body'),
							isShow    = false,
							coreFn    = {
							
								/*修改input*/
								setInputSize: function(){
									var last           = selected.find('.l-select-multiple-selected-li:last'),
										lastWidth      = last.outerWidth(),
										lastOffset     = last.offset(),
										lastLeft       = lastOffset ? lastOffset.left : 0,
										selectedOffset = selected.offset(),
										selectedLeft   = selectedOffset ? selectedOffset.left : 0,
										width          = p.width;
									
									if( input.width() <= width || width < 10 ){
										width = width - (lastLeft + lastWidth - selectedLeft + 5);
									}
									
									if( !last.length ){
										width = p.width;
									}
									
									input
										.focus()
										.width(width);

									down.css({top:selected.outerHeight()});
									
								},
								
								/*设置已选id，并已字符串返回*/
								setSelectedInput: function(){
									var item    = selected.find('.l-select-multiple-selected-li'),
										len     = item.length,
										h       = 0,
										idArr   = [],
										nameArr = [],
										valArr  = [];
										
									for(; h<len; h++){
										idArr.push(item.eq(h).attr('data-id'));
										nameArr.push(item.eq(h).attr('data-name'));
										valArr.push(item.eq(h).attr('data-val'));
									}
									
									target
										.val(idArr.join())
										.attr({
											'data-name' : nameArr.join(),
											'data-val' : valArr.join()
										});
								},
								
								/*添加已选*/
								addSelectItem: function(obj){
									var id        = obj.attr('data-id'),
										i         = 0,
										inputVal  = input.val(),
										checkbox  = p.checkbox,
										isRefresh = true;
									
									for(; i<dataLen; i++){
										if( Number(data[i].id) === Number(id) ){
											if( radio ){
												t.selectedData = []
											}
											t.selectedData.push(data[i]);
										}
									}
									
									if( checkbox || radio ){
										isRefresh = false;
									}
									
									coreFn.initSelected(inputVal, isRefresh);
								},
								
								/*删除已选*/
								removeSelectItem: function(obj, isRefresh){
									var id           = obj.attr('data-id'),
										selectedData = t.selectedData,
										len          = selectedData.length,
										i	         = 0,
										inputVal     = input.val();
										
									//删除已选
									for(; i<=len; i++){
										if(selectedData[i] && Number(selectedData[i].id) === Number(id)){
											t.selectedData.splice(i, 1);
										}
									}
									
									if( checkbox ){
										isRefresh = false;
									}
									
									coreFn.initSelected(inputVal, isRefresh);
								},
								
								/*选中处理*/
								initSelected: function(inputVal, isRefresh){

									var data          = p.data,
										dataLen       = data.length,
										selectedData  = t.selectedData,
										len           = selectedData.length,
										i             = 0,
										selectedClass = '',
										selectedIndex = '',
										str           = '',
										checkbox      = p.checkbox;

									isRefresh = isRefresh === undefined ? true : isRefresh;

									//重获数据
									if( isRefresh ){
										that.modifyMultipleSelectedData();
									}
									that.refreshMultipleHtml();
									
									for(; i<len; i++){

										if( checkbox || radio ){
											for(var j = 0; j<dataLen; j++){
												var downAllItem = down.find('.l-select-multiple-down-li'),
													downItem    = downAllItem.eq(j),
													downItemLen = downAllItem.length;
	
												if( Number(downItem.attr('data-id')) === Number(selectedData[i].id) ){
													downItem
														.find('.l-checkbox')
														.addClass('l-checkbox-selected')
														.end()
														.find('.l-radio')
														.addClass('l-radio-selected');
													selectedClass = ' l-select-multiple-selected-li-'+j;
													selectedIndex = ' data-index="'+ j +'"';
												}
											}
											
											if( len === dataLen || downAllItem.find('.l-checkbox-selected').length === downItemLen ){
												down.find('.l-checkbox-all').addClass('l-checkbox-selected');
											}
										}
										
										str += '<li class="l-select-multiple-selected-li'+ 
														selectedClass +'" data-id="'+ 
														selectedData[i].id +'" data-val="'+ 
														selectedData[i].val +'" data-name="'+ 
														selectedData[i].name +'"'+ 
														selectedIndex +'>'+ 
													selectedData[i].name +
													'<span class="l-select-multiple-selected-del">x</span>'+
												'</li>';
												
									}//end for
									
									selected
										.find('.l-select-multiple-selected-li')
										.remove()
										.end()
										.find('.l-select-multiple-selected-input').before(str); 
									input.val(inputVal);

									coreFn.setInputSize();
									coreFn.setSelectedInput();
									
								}//end initSelected
								
							};//end coreFn
						
						/* 初始化 */
						if( p.data ){
							if( p.selectedData ){
								t.selectedData = p.selectedData;
							}
							coreFn.initSelected();
							
							saogaUI.ui.onselectstart(wrap);
						}
						
						/*给 wrap容器对象 绑定相关事件*/
						wrap
							.on('click','.l-select-multiple-selected',function(e){
								e.stopPropagation();
								input.focus();
								isShow = true;
								that.show(wrap);
							})
							.off('click', '.l-select-multiple-down li')
							.on('click', '.l-select-multiple-down li', function(e){
								e.stopPropagation();
								isShow = true;
								
								if( checkbox ){
									$(e.currentTarget).find('.l-checkbox').trigger('click');
								}else if(radio){
									$(e.currentTarget).find('.l-radio').trigger('click');
								}else{
									coreFn.addSelectItem($(e.currentTarget));
								}
							})
							.on('mouseover', '.l-select-multiple-down li', function(e){
								var self     = $(e.currentTarget),
									siblings = self.siblings();
								self.addClass('on');
								siblings.removeClass('on');
							})
							.off('click', '.l-radio')
							.on('click', '.l-radio', function(e){
								e.stopPropagation();
								var self     = $(e.currentTarget),
									allRadio = down.find('.l-radio');
									
								allRadio.removeClass('l-radio-selected');
								self.addClass('l-radio-selected');
								coreFn.addSelectItem(self.parent());
							})
							.off('click', '.l-checkbox')
							.on('click', '.l-checkbox', function(e){
								e.stopPropagation();
								var self        = $(e.currentTarget),
									index       = self.parent().attr('data-index'),
									downItem    = down.find('.l-select-multiple-down-li'),
									downLen     = downItem.length,
									allCheckbox = down.find('.l-checkbox');
									
								if( self.hasClass('l-checkbox-selected') ){
									if( self.hasClass('l-checkbox-all') ){
										allCheckbox.removeClass('l-checkbox-selected');
										for(var i = 0; i<downLen; i++){
											coreFn.removeSelectItem(downItem.eq(i));
										}
									}else{
										allCheckbox
											.eq(0)
											.removeClass('l-checkbox-selected');
										self.removeClass('l-checkbox-selected')
										coreFn.removeSelectItem(selected.find('.l-select-multiple-selected-li-'+index));
									}
								}else{
									if( self.hasClass('l-checkbox-all') ){
										t.selectedData = [];
										for(var i = 0; i<downLen; i++){
											coreFn.addSelectItem(downItem.eq(i));
										}
									}else{
										self.addClass('l-checkbox-selected');
										coreFn.addSelectItem(self.parent());
									}
								}
								
							})
							.on('click','.l-select-multiple-selected-del', function(e){
								var selectedItem  = $(e.currentTarget).parent(),
									selectedIndex = selectedItem.attr('data-index'),
									checkbox      = down.find('.l-checkbox-'+selectedIndex),
									allCheckbox   = down.find('.l-checkbox-all');
								
								checkbox.removeClass('l-checkbox-selected');
								allCheckbox.removeClass('l-checkbox-selected');
								coreFn.removeSelectItem(selectedItem);
							})
							.on('click', '.l-select-multiple-input', function(e){
								e.stopPropagation();
								isShow = true;
								that.show(wrap);
							})
							.off('keyup', '.l-select-multiple-input')
							.on('keyup', '.l-select-multiple-input', function(e){
								var self            = $(e.currentTarget),
									code            = e.keyCode,
									val             = self.val(),
									i               = 0,
									selectedData    = t.selectedData,
									selectedDataLen = selectedData.length,
									valReg          = /\\|\[|\]|\*|\(|\)|\+|\?/,
									itemLast        = selected.find('.l-select-multiple-selected-li:last');

								if( code !== 38 || code !== 40 || code !== 13 ){
									t.data = [];
									isShow = true;
									that.show(wrap);
									
									//过滤特殊符号
									if( valReg.test(val) ){
										val = val.replace(valReg, '');
									}
									
									if( code === 8 && val === '' && itemLast.length ){
										return false;
									}
									coreFn.initSelected(val);
								}
							})
							.off('keydown', '.l-select-multiple-input')
							.on('keydown', '.l-select-multiple-input', function(e){
								if( !p.isAllowEnter ){return false;}
								var self     = $(e.currentTarget),
									code     = e.keyCode,
									val      = self.val(),
									itemLast = selected.find('.l-select-multiple-selected-li:last');
								
								if( code === 8 ){
									if( val === '' ){
										if( itemLast.hasClass('on') ){
											coreFn.removeSelectItem(itemLast);
										}else{
											itemLast.addClass('on');
										}
										return false;
									}else{
										/*val只有一个字符时，删除并刷新*/
										if( val && val.length ){
											self.val('');
											coreFn.initSelected(val);
										}
									}
								}else if(code === 38 || code === 40){
									self.blur();
									isShow = true;
									that.show(wrap);
								}else if(code === 13 && val === ''){
									return false;
								}
							});//end wrap
							
						//TODO: 键盘上下键功能未实现
						/*给 window对象 绑定相关事件*/
						win
							.on('click', function(){
								if( isShow ){
									isShow = false;
									that.close();
								}
							})
							/*.on('keydown', function(e){
								if(isShow){
									var li    = down.find('.l-select-multiple-down-li'),
										len   = li.length,
										index = down.find('.on').attr('data-index');

									e.stopPropagation();
									switch(e.keyCode){
										case 13:
											input.focus();
											coreFn.addSelectItem(li.eq(index));
											isShow = false;
											that.close();
											return false;
										break;
										case 38:
											if(index > 0){
												index --;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down,li,index);
											}
											e.preventDefault();
										break;
										case 40:
											if(index < len-1){
												index++;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down,li,index);
											}
											e.preventDefault();
										break;
									}
							});}//end win*/
					},
					
					/**
					* 创建树形Html
					*/
					createTreeHtml: function(){
                        var target = p.target,
							wrap   = target.parent(),
							width  = p.width,
							html   = '';
							
						if( !wrap.hasClass('l-select-wrap') ){
							wrap = target.wrap('<div class="l-select-wrap"></div>').parent();
						}

						html += '<div class="l-select-tree-selected fn-clear">';
						html += '		<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="l-select-tree-input" />'
						html += '</div>';
						html += '<div class="l-select-down fn-hide"><div class="l-select-tree-down" style="width:'+ width +'px"></div></div>';
						
						if( !wrap.find('.l-select-tree').length ){
							wrap.append('<div class="l-select-tree" style="width:'+ width +'px">'+ html +'</duv>');
						}else{
							wrap.find('.l-select-tree').html(html);
						}
						p.wrap = wrap; 
					},
					
					/**
					* 树形相关事件
					*/
					treeFn: function(){

						var that     = this,
							wrap     = p.wrap,
							target   = p.target,
							win      = $('body'),
							isShow   = false,
							input    = wrap.find('.l-select-tree-input'),
							selected = null,
							tree     = saogaUI.ui.tree({
										target: wrap.find('.l-select-tree-down'),
										data: p.data,
										selected: p.selectedData,
										onClick: function(obj, data){

											if( saogaUI.base.isFunction(p.onClick) ){
												var isFalse = p.onClick(obj, data);
												if( !( isFalse === undefined ? true : isFalse ) ){
													return false;
												}
											}
											console.log(data)
											input.val(data.name);
											target.val(data.id);
											
											isShow = false;
											that.close();
											
										},
										onLoad: p.onLoad
										/*
										onLoad: function(data, selected){

											input.val(selected[0].name);
											target.val(selected[0].id);
											
											if( saogaUI.base.isFunction(p.onLoad) ){
												p.onLoad(p.data, selected);
											}
											
										}*/
									});
								
						selected = tree.getSelected();
						input.val(selected.length ? selected[0].name : '');
						target.val(selected.length ? selected[0].id : '');

						wrap
							.off('click', input)
							.on('click', input, function(e){
								e.stopPropagation();
								isShow = true;
								that.show(wrap);
							});
									
						/*给 window对象 绑定相关事件*/
						win.on('click', function(){
								if( isShow ){
									isShow = false;
									that.close();
								}
							})
					},
					
					/**
					* ajax方式获取数据
					*/
					ajaxGetData: function(callback){
						var ajax = p.ajax;
						
						$.ajax({
							type: ajax.type === undefined ? 'POST' : ajax.type,
							url: ajax.url,
							cache: false,
							//async: false,
							dataType: "json",
							data: ajax.data,
							beforeSend: function(data){
								if( saogaUI.base.isFunction(ajax.beforeSend) ){
									ajax.beforeSend();
								}
							},
							success: function(data){
								if( saogaUI.base.isFunction(ajax.success) ){
									ajax.success(data);
								}
								if( saogaUI.base.isFunction(callback) ){
									callback(data);
								}
							},
							error: function(data){
								if( saogaUI.base.isFunction(ajax.error) ){
									ajax.error(data);
								}
							}
						});
					},
					
					/**
					* 运行select
					*/
					run: function(){
						var that = this,
							type = p.type;
							
						switch (type){
							case 'single':
								that.createSingleHtml();
								if( !p.wrap ){ break; }
								that.singleFn();
								break;
							case 'multiple':
								that.createMultipleHtml();
								if( !p.wrap ){ break; }
								that.multipleFn();
								break;
							case 'tree':
								that.createTreeHtml();
								if( !p.wrap ){ break; }
								that.treeFn();
								break;
						}
					},
					
					/**
					* 初始化
					*/
					init: function(o){
			
						for(var key in o){
							if( o.hasOwnProperty(key) && o[key] !== undefined ){
								p[key] = o[key];
							}
						}

						p.target = $(p.target);

						if( !p.data  && !p.ajax ){
							p.data = [];
						}
					
						if( p.ajax ){
							c.ajaxGetData(function(data){
								p.data = data;
								c.run();
								if( saogaUI.base.isFunction(p.onLoad) ){
									p.onLoad();
								}
							});
							return g;
						}
						
						c.run();
						if( p.data && saogaUI.base.isFunction(p.onLoad) ){
							p.onLoad();
						}
						return g;
					}//end init
				};
		
		/**
		* 刷新下拉框
		*/
		g.refresh = function(o){
			for(var key in o){
				if( o.hasOwnProperty(key) && o[key] !== undefined && !o.target){
					p[key] = o[key];
				}
			}

			c.init();
			return g;
		};
		
		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new Select(o);
	};
});
/**
 **┏┓　　　┏┓ 
 *┏┛┻━━━┛┻┓ 
 *┃　　　　　　　┃ 　 
 *┃　　　━　　　┃ 
 *┃　┳┛　┗┳　┃ 
 *┃　　　　　　　┃ 
 *┃　　　┻　　　┃ 
 *┃　　　　　　　┃ 
 *┗━┓　　　┏━┛ 
 ****┃　　　┃　　　　 
 ****┃　　　┃ 神兽保护，代码无bug
 ****┃　　　┗━━━┓ 
 ****┃　　　　　　　┣┓ 
 ****┃　　　　　　　┏┛ 
 ****┗┓┓┏━┳┓┏┛ 
 ******┃┫┫　┃┫┫ 
 ******┗┻┛　┗┻┛  
*/
define('core/grid',['core/saogaUI', 'i18n!core/nls/str', 'core/select_debug'], function(saogaUI, lang, select){
	
	
	
	/**
	* saogaUI.ui.grid 表格控件
	* @class saogaUI.ui.grid
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 表格参数
    * @param {String} o.wrap 表格容器
    * @param {String} o.id 表格id
    * @param {Object} o.pageAjax ajax数据
    * @param {String} o.pageAjax.url ajax请求的url
    * @param {String} o.pageAjax.type ajax请求类型，默认是post
    * @param {String} o.pageAjax.data ajax请求的条件
    * @param {Object} o.data 静态数据
    * @param {String|Number} o.width 表格宽度
    * @param {Boolean} o.isFixedWidth 表宽度是否为固定宽度，默认为false，会去对比grid外框的宽度和o.columns.width，而达到自适应列的目的
    * @param {Object} o.columns 列结构
    * @param {String} o.columns.display 表头名称
    * @param {String} o.columns.name 数据字段名
    * @param {Number} o.columns.width 列宽度，这里是占比
    * @param {Function} o.columns.render 列自定义显示函数
    * @param {Function} o.columns.statisRender 统计列自定义显示函数
    * @param {String} o.columns.statisType 统计类型
    * @param {String} o.columns.statisWrap 统计容器
    * @param {Object} o.statis 统计
    * @param {Object} o.detail 表格详细
    * @param {Object} o.bottomBtns 底部按钮
    * @param {Boolean} o.isPage 是否显示分页
    * @param {Boolean} o.isHead 是否显示头部
    * @param {Boolean} o.showAllRow 显示所有数据，默认false，以分页和显示条数互斥 ，isPage=false、pageSize = total
    * @param {String} o.pageIndex 分页起始页
    * @param {String} o.pageSize 每页显示的条数
    * @param {Array} o.pageSizeOptions 可选择设定的每页结果数，默认[10, 20, 50, 100, 200]，不显示时可设置null
    * @param {Function} o.onPageFn 翻页事件
    * @param {Boolean} o.isPageCache 翻页时是否缓存当页数据
    * @param {Boolean} o.isMemory 翻页是否记住选择记录，默认false
    * @param {Boolean} o.checkbox 是否有checkbox
    * @param {Function} o.onCheckFn 点击checkbox事件
    * @param {Function} o.onRowFn 点击行事件
    * @param {Boolean} o.isSelectSingleRow 点击是否选中单行,onRowFn有设置时才生效
    * @param {Boolean} o.isOnRowCheckbox 点击行选中checkbox
    * @param {Function} o.initSelected 初始化选中事件
    * @param {String}  o.nullText 空文本
    * @param {String}  o.requestText 请求文本
    * @param {Boolean} o.isSort 是否排序，默认false
    * @param {Boolean} o.isSortCurrent 排序当前页中数据，默认false，使用时isSort必须是true，isPageCache必须是true
    * @param {Boolean} o.isShowLoading 是否显示loading效果，默认true
    * @param {String} o.countFont 统计文字
    * @param {String} o.refreshIndex 刷新当前页索引pageIndex,默认false
    * @param {String} o.isHideColumns 是否要隐藏列Columns
	* @return {Object} grid对象
	*/
	var Grid = function(o){
		
		var 
			/**
			* 全局对象
			* @public
			*/
			g       = this,
		
			/**
			* 默认配置
			* @private
			*/
			p = {
				wrap:            $(o.wrap),
				id:              o.id || 'l-grid-' + (new Date()).valueOf(),	
				pageAjax:        o.pageAjax || null,
				data:            o.data || {},                                           //静态数据
				width:           o.width || 'auto',
				isFixedWidth:    o.isFixedWidth  === undefined ? false : o.isFixedWidth, //表宽度是否为固定宽度，默认为false，为true时会去对比width和grid外框的宽度
				columns:         o.columns || {},
				statis:          o.statis || [],                                         //统计
				detail:          o.detail || null,
				bottomBtns:      o.bottomBtns || {},                                     //底部按钮
				isPage:          o.isPage === undefined ? true : o.isPage,               //是否显示分页
				isHead:          o.isHead === undefined ? true : o.isHead,               //是否显示头部
				showAllRow:      o.showAllRow ? true : false,                            //显示所有数据，默认false，以分页和显示条数互斥 ，isPage=false、pageSize = total
				pageIndex:       o.pageIndex || 1,                                       //分页起始页
				pageSize:        o.pageSize || 10,                                       //每页显示的条数
				pageSizeOptions: o.pageSizeOptions === undefined ? [10, 20, 50, 100, 200] : o.pageSizeOptions, //可选择设定的每页结果数
				onPageFn:        o.onPageFn,                                             //翻页事件
				isPageCache:     o.isPageCache === undefined ? true : o.isPageCache,     //翻页时是否缓存当页数据
				isMemory:        o.isMemory ? true : false,                              //翻页是否记住选择记录，默认false
				checkbox:        o.checkbox === undefined ? true : o.checkbox,           //是否有checkbox
				onCheckFn:       o.onCheckFn || null,                                    //点击checkbox事件
				onRowFn:         o.onRowFn || null,                                      //点击行事件
				isSelectSingleRow: o.isSelectSingleRow === undefined ? false : o.isSelectSingleRow, //点击是否选中单行
				isOnRowCheckbox: o.isOnRowCheckbox ? true : false,                       //点击行选中checkbox
				initSelected:    o.initSelected || null,                                 //初始化选中事件
				nullText:        o.nullText ? o.nullText : lang.nullText,                //空文本
				requestText:     o.requestText ? o.requestText : lang.requestText,       //请求文本
				isSort:          o.isSort ? true : false,                                //是否排序，默认false
				isSortCurrent:   o.isSortCurrent ? true : false,                         //排序当前页缓存中数据，默认false，使用时isSort必须是true，isPageCache必须是true
				isShowLoading:   o.isShowLoading === undefined ? true : o.isShowLoading, //是否显示loading效果
				countFont:       o.countFont ? o.countFont : lang.countFont,             //统计文字
				refreshIndex:    o.refreshIndex === undefined ? false : o.refreshIndex,  //刷新当前页索引pageIndex,默认false
			    isHideColumns:   o.isHideColumns === undefined ? false : o.isHideColumns //是否要隐藏列Columns
			},
		
			/**
			* 缓存池
			* @private
			*/
			_cache = {
				data: [],
				tmpData: [],
				columns: [],
				rowSelected: [],
				detailSelected: [],
				width:0
			},
			
			/**
			* 内部对象
			* @private
			*/
			_core   = {
				/**
				* 表格表头内容
				*/
				tHeadCreateHtml: function(){
					var isHideColumns = p.isHideColumns,
						columns       = p.columns,
						detail        = p.detail,   //表格明细
						checkbox      = p.checkbox, //复选框
						popup         = g.popup,
						grid1         = g.grid1,
						grid2         = g.grid2,
						isInit        = g.isInit,
						i             = 0,
						s1            = '',
						s2            = '',
						s3            = '';
						
					/*grid1*/
					s1 += '<table>';
					s1 += '<tr class="l-grid-hd-row">';
					if( detail ){
						s1 += '<th class="l-grid-hd-cell l-grid-hd-detail" style="width:13px"><div class="l-grid-row-cell-inner"><span class="l-grid-row-detailbtn"></span></div></th>';
					}
					if( checkbox ){
						s1 += '<th class="l-grid-hd-cell l-grid-hd-checkbox" style="width:13px"><div class="l-grid-hd-cell-inner"><span class="l-checkbox l-grid-hd-checkbox"></span></div></th>';
					}
					s1 += '</tr>';
					s1 += '</table>';
					
					/*grid2*/
					if( isInit && !saogaUI.base.cookie.get(p.id) ){
						_cache.columns = columns;
					}
					
					if( isHideColumns ){
						columns = _cache.columns;
						for(var h = 0; h < p.columns.length; h++){
							var popupSelected = '';
							for(var j = 0; j<columns.length; j++){
								if( p.columns[h].display === columns[j].display ){
									popupSelected = ' l-checkbox-selected';
								}
							}
							s3 += '<div class="l-grid-popup-item fn-clear"><span class="l-checkbox'+ popupSelected +'"></span><span class="l-grid-popup-text">'+ p.columns[h].display +'</span></div>';
						}
						
						popup.html(s3)
					}else if( columns.length ){
						columns = _cache.columns;
					}

					s2 += '<table>';
					s2 += '<tr class="l-grid-hd-row">';
					for(; i < columns.length; i++){
						s2 += '<th class="l-grid-hd-cell"><div class="l-grid-hd-cell-inner"><span class="l-grid-hd-cell-span" data-columnName='+ columns[i].name +'><span class="l-grid-hd-cell-text">'+ columns[i].display +'</span></span></div></th>';
					}
					s2 += '</tr>';
					s2 += '</table>';

					if( isInit ){
						grid1.append('<div class="l-grid-header">'+ s1 + '</div>');
						grid2.append('<div class="l-grid-header">'+ s2 +'</div>');
					}else{
						grid1.find('.l-grid-header').html(s1);
						grid2.find('.l-grid-header').html(s2);
					}
				},
				
				/**
				* 表格主体内容
				* @param {Number} index 页面索引
				*/
				tBodyCreateHtml: function(index){
					var columns    = _cache.columns.length ? _cache.columns : p.columns,
						len        = columns.length,
						statis     = p.statis,
						statisData = [],
						detail     = p.detail,   //表格明细
						checkbox   = p.checkbox, //复选框
						nullText   = g.loding.is(':visible') ? p.requestText : p.nullText,
						pageSize   = p.pageSize,
						popup      = g.popup,
						grid       = g.grid,
						grid1      = g.grid1,
						grid2      = g.grid2,
						i          = 0,
						s1         = '',
						s2         = '',
						tmpData    = _cache.tmpData,
						total      = p.data.total,
						rows       = p.data.rows,
						isInit     = g.isInit,
						that       = this;
					
					/*修改索引值，从1开始，所以减1*/
					index = index !== undefined ? index - 1 : 0;

					/*grid1*/
					if( checkbox || detail ){
						s1 += '<table>';
						if( total && rows.length ){
							for(var i = 0; i<pageSize; i++){
								if( tmpData[index][i] ){
									s1 += '<tr class="l-grid-row'+ 
											  (i%2 === 0 ? '' : ' l-grid-row-even') +
											  (that.initSelected( tmpData[index][i] ) ? ' l-grid-row-selected' : '') +
											  '" data-row="'+ i +'">';

									if( detail ){
										s1 += '<td style="width:13px"><div class="l-grid-row-cell-inner"><span class="l-grid-row-detailbtn l-grid-row-detailbtn-close"></span></div></td>';
									}
									if( checkbox ){
										s1 += '<td style="width:13px"><div class="l-grid-row-cell-inner"><span class="l-checkbox l-grid-row-checkbox"></span></div></td>';
									}
									s1 += '</tr>';
								}
							}
							/*判断是否统计*/
							if( statis ){
								var sLen = statis.length,
									n    = 0;
								for(; n<sLen; n++){
									s1 += '<tr class="l-grid-row l-grid-row-statis l-grid-row-'+ statis[n].type +'">';
									s1 += '<td style="width:13px"><div class="l-grid-row-cell-inner"></div></td>';
									s1 += '</tr>';
								}
							}
						}else{
							s1 += '<tr class="l-grid-row"><td></td></tr>';
						}
						s1 += '</table>';
					}

					/*grid2*/
					s2 += '<table>';
					
					if( total && rows.length ){
						for(var k = 0; k<len; k++){
							statisData[k] = [];
						}
						
						for(var i = 0; i<pageSize; i++){

							if( tmpData[index][i] ){
								
								s2 += '<tr class="l-grid-row' +
										  (i%2 === 0 ? '' : ' l-grid-row-even') +
										  (that.initSelected(tmpData[index][i], i) ? ' l-grid-row-selected' : '') +
										  '" data-row="'+ i +'">';
								
								var rowStatis = 0; //行统计和
								for(var h = 0; h < len; h++){
									
									/*统计数据*/
									if( columns[h].statisType ){
										var statisRow = Number( tmpData[index][i][columns[h].name] );
										statisData[h][i] = !isNaN(statisRow) ? statisRow : 0;
										rowStatis += statisData[h][i];
										if( columns[h].statis !== undefined ){
											statisData[h][i] = rowStatis;
										}
									}
									
									s2 += '<td class="l-grid-row-cell" data-cell="'+ h +'"><div class="l-grid-row-cell-inner l-grid-align-'+ (columns[h].align ? columns[h].align : 'left') +'">';

									if( columns[h].statis !== undefined ){
										if( columns[h].statisRender !== undefined ){
											s2 += columns[h].statisRender(rowStatis);
										}else{
											s2 += rowStatis;
										}
									}else if( columns[h].render !== undefined ){
										s2 += columns[h].render(tmpData[index][i], i, tmpData[index][i][columns[h].name], h);
									}else{
										s2 += tmpData[index][i][columns[h].name];
									}
									
									s2 += '</div></td>';
								}
								
								s2 += '</tr>';
								
								if( detail && detail.render !== undefined ){
									var str    = detail.render(tmpData[index][i]),
										colLen = columns.length + (checkbox ? 1 : 0) + 1;
									s2 += '<tr class="l-grid-row-detail'+ (i%2 === 0 ? '' : ' l-grid-row-even') +'"><td colspan="'+ colLen +'">'+ str +'</td></tr>';
								}
								
							}
						}

						/*判断是否统计*/
						if( statis ){
							var sLen = statis.length,
								n    = 0;
							for(; n<sLen; n++){
								s2 += '<tr class="l-grid-row l-grid-row-statis l-grid-row-'+ statis[n].type +'">';
								for(var m = 0; m < len; m++){
									s2 += '<td class="l-grid-row-cell"><div class="l-grid-row-cell-inner l-grid-align-'+ (columns[m].align ? columns[m].align : 'left') +'">';
									if( columns[m].statisWrap ){
										s2 += statis[n].display;
									}else{
										var sData = statisData[m],
											ssLen = sData.length,
											ssVal = 0,
											x     = 0,
											sum   = 0,
											avg   = 0,
											min   = 0,
											max   = 0;
										
										for(; x<ssLen; x++){
											ssVal += sData[x];
										}
										
										if( columns[m].statisType ){
											var str  = columns[m].statisType,
												arr  = str.split(','),
												d    = 0,
												dlen = arr.length,
												dStr = '';
											
											for(; d<dlen; d++){
												if( statis[n].type === arr[d] ){
													switch(arr[d]){
														case 'sum':
															dStr = ssVal.toFixed(2);
															break;
														case 'avg':
															dStr = ( (ssVal*1.0)/x ).toFixed(2);
															break;
														case 'min':
															dStr = Math.min.apply(Math, sData).toFixed(2);
															break;
														case 'max':
															dStr = Math.max.apply(Math, sData).toFixed(2);
															break;
													};
													
													if( columns[m].statisRender !== undefined ){
														s2 += columns[m].statisRender(dStr);
													}else{
														s2 += dStr;
													}
												}
											}// end for
											
										}
										
									}
									s2 += '</div></td>';
								}
								s2 += '</tr>';
							}
						}// end if statis
						
					}else{
						s2 += '<tr class="l-grid-row"><td><div class="l-grid-row-cell-inner l-grid-align-center l-grid-nullText">'+ nullText +'</div></td></tr>';
					}
					s2 += '</table>';
					
					
					/*init*/
					if( isInit ){
						grid1.append('<div class="l-grid-body">' + s1 +'</div>');
						grid2.append('<div class="l-grid-body">' + s2 +'</div>');
					}else{
						grid1.find('.l-grid-body').html(s1);
						grid2.find('.l-grid-body').html(s2);
					}
					
					/*hover*/
					grid
						.off('mouseover', '.l-grid-row')
						.on('mouseover', '.l-grid-row', function(){
							var row   = $(this),
								index = row.attr('data-row');
								
							grid1
								.find('.l-grid-row')
								.eq(index)
								.addClass('l-grid-row-hover');
								
							grid2
								.find('.l-grid-row')
								.eq(index)
								.addClass('l-grid-row-hover')
								.next('.l-grid-row-detail')
								.addClass('l-grid-row-hover');
						})
						.off('mouseout', '.l-grid-row')
						.on('mouseout', '.l-grid-row', function(){
							var row   = $(this),
								index = row.attr('data-row');
							
							grid1
								.find('.l-grid-row')
								.eq(index)
								.removeClass('l-grid-row-hover');
								
							grid2
								.find('.l-grid-row')
								.eq(index)
								.removeClass('l-grid-row-hover')
								.next('.l-grid-row-detail')
								.removeClass('l-grid-row-hover');
						});
					
					/*set size*/
					that.setCellWidth();
					if( checkbox ){
						that.setRowsHeight();
					}
					
					$(window).resize(function(){
						that.setCellWidth();
						if( checkbox ){
							that.setRowsHeight();
						}
					});
					
					/* 设置ajax模式缓存 */
					if( !p.isPageCache && !p.isSortCurrent ){
						_cache.tmpData[p.pageIndex - 1] = [];
					}
				},
				
				/**
				* 设置列宽
				*/
				setCellWidth: function(){
					var columns      = _cache.columns.length ? _cache.columns : p.columns,
						len          = columns.length,
						wrapWidth    = p.wrap.width(),
						grid         = g.grid,
						slGrid       = grid.find('.l-sl-grid2'),
						grid1        = g.grid1,
						checkbox     = p.checkbox,
						grid1Width   = checkbox ? grid1.outerWidth() : 0,
						grid2        = g.grid2,
						i            = 0,
						j            = 0,
						total        = 0,
						colWidth     = 0,
						isFixedWidth = p.isFixedWidth,
						_fixedWidth  = function(width){
										width = width === undefined ? p.width : width;
										for(; j<len; j++){
											grid2.find('.l-grid-hd-cell').eq(j).width(columns[j].width);
											grid2.find('.l-grid-row-cell').eq(j).width(columns[j].width);
										}
										grid.width(width);
										slGrid.css({
											width: width - grid1Width,
											//width: checkbox ? width - grid1Width - 1 : width,  //FIXME chrome外框多1px会乱掉  chrome放大所致
											overflow:'auto',
											marginRight:0
										});
										grid2.css({
											width: total,
											marginLeft:0
										});
									},
						_autoWidth   = function(){
										if( checkbox ){
											grid2.css({'margin-left':grid1Width});
											grid2.parent().css({'margin-right': - grid1Width});
										}
										for(; j<len; j++){
											colWidth = columns[j].width/total*100 + '%';
											grid2.find('.l-grid-hd-cell').eq(j).width(colWidth);
											grid2.find('.l-grid-row-cell').eq(j).width(colWidth);
										}
										grid.width('auto');
										slGrid.css({
											width:'100%',
											overflow:'inherit',
											marginRight:-grid1Width
										});
										grid2.css({
											width: 'auto',
											marginLeft:grid1Width
										});
									};
					
					for(; i<len; i++){
						total += columns[i].width;
					}
					
					//console.log(total,p.wrap.width(),p.wrap.width() > total)
					
					if( p.width === 'auto' ){
						_autoWidth();
					}else{
						if( isFixedWidth ){
							_fixedWidth();
						}else{
							if( wrapWidth > total || wrapWidth < p.width ){
								_autoWidth();
							}else{
								_fixedWidth( wrapWidth );
							}
						}
					}
				},
				
				/**
				* 设置行高
				*/
				setRowsHeight: function(){
					var grid1    = g.grid1,
						grid2    = g.grid2,
						pageSize = p.statis ? p.pageSize + p.statis.length : p.pageSize,
						i        = 0;
					
					grid1.find('.l-grid-hd-row').height( grid2.find('.l-grid-hd-row').outerHeight() );
					
					if( pageSize ){
						for(; i<pageSize; i++){
							var grid1_row       = grid1.find('.l-grid-row').eq(i),
								grid2_row       = grid2.find('.l-grid-row').eq(i),
								grid2_rowDetail = grid2_row.next('.l-grid-row-detail'),
								height          = grid2_row.outerHeight(),
								detailHeight    = grid2_rowDetail.length ? grid2_rowDetail[0].offsetHeight : 0;

							if(!height){return;}
							grid1_row.height(height+detailHeight);
						}
					}else{
						var grid1_row = grid1.find('.l-grid-row').eq(0),
							grid2_row = grid2.find('.l-grid-row').eq(0),
							height    = grid2_row.outerHeight();
						grid1_row.height(height);
					}
					
				},
				
				/**
				* 初始化行选中事件
				* @param {Object} rowData 行数据
				* @param {Number} i 行的索引
				*/
				initSelected: function(rowData, i){
					var that         = this,
						isMemory     = p.isMemory,
						initSelected = p.initSelected,
						pageIndex    = p.pageIndex,
						arr          = _cache.rowSelected[pageIndex-1];
					
					if( saogaUI.base.isFunction( initSelected ) ){
						if( initSelected( rowData ) ){
							if( isMemory && i !== undefined ){
								arr[i] = that.getRowData(i); //选中数据
								that.initCheckbox();
							}
							return true;
						}
					}
					
					return false;
				},
				
				/**
				* 内部分页对象
				* @private
				*/
				__pageCore: {
					/**
					* 获取数字连接
					* @private
					* @param {Number} index 链接索引
					* @param {String} txt 上下翻页的文本
					*/
					getLink: function(index, txt){
						return '<a href="javascript:;" data-page="'+ index +'"'+ (p.pageIndex === index ? ' class="current"' : '') + '>'+ (txt || index) +'</a>';
					},
					
					/**
					* 获取显示的数据
					* @private
					* @param {Number} pageSize 每页显示条数
					* @param {Number} count 数据长度
					* @param {Number} index 当前位置
					*/
					getCount: function(pageSize, count, index){
						var start   = (index-1)*pageSize + 1,
							end     = index*pageSize,
							str     = p.countFont+'',
							pageNum = Math.ceil(count / pageSize),
							diff    = pageNum*pageSize - count;
						
						str = str.replace('{{start}}', start);     //当前开始位置
						str = str.replace('{{end}}', (pageNum*pageSize === end ? end - diff : end)); //当前结束位置
						str = str.replace('{{count}}', count);     //总条数
						str = str.replace('{{size}}', pageSize);   //每页显示条数
						str = str.replace('{{pageNum}}', pageNum); //总页数
						str = str.replace('{{current}}', index);   //当前位置
						
						return str;
					},
					
					/**
					* 获取分页按钮
					* @private
					* @param {Number} pageSize 每页显示条数
					* @param {Number} count 数据长度
					* @param {Number} index 当前位置
					*/
					getBtn: function(pageSize, count, index){
						var s       = '',
							begin   = 1,
							end     = 1,
							i       = 0,
							itemNum = 2,
							pageNum = Math.ceil(count / pageSize);
							
						if(index > 1){
							s += this.getLink(index - 1, lang.prevPage);
						}else{
							s += '<span class="prev">'+ lang.prevPage +'</span>';
						}
						if(index - itemNum > 1){
							s += this.getLink(1) + '<span>...</span>';
							begin = index - itemNum;
						}
						end = Math.min(pageNum, begin + itemNum * 2);
						if(end === pageNum - 1){
							end = pageNum;
						}
						for(i = begin; i <= end; i++) {
							s += this.getLink(i);
						}
						if(end < pageNum){
							s += '<span>...</span>' + this.getLink(pageNum);
						}
						if(index < pageNum){
							s += this.getLink(index + 1, lang.nextPage);
						}else{
							s += '<span class="next">'+ lang.nextPage +'</span> ';
						}
						
						return s;
					},
					
					/**
					* 获取分页选项
					* @private
					*/
					getPageSelect: function(){
						var pageSize        = p.pageSize,
							pageSizeOptions = p.pageSizeOptions;
						
						if( pageSizeOptions ){
							var len = pageSizeOptions.length,
								i   = 0,
								s   = '';
							
							s += '<select class="ui-select">';
							for(; i<len; i++){
								if( pageSize === pageSizeOptions[i] ){
									s += '<option selected="selected" value="'+ pageSizeOptions[i] +'">'+ pageSizeOptions[i] +'</option>';
								}else{
									s += '<option value="'+ pageSizeOptions[i] +'">'+ pageSizeOptions[i] +'</option>';
								}
							}
							s += '</select>';
							return s;
						}
						return '';
					}
				},
				
				/**
				* 分页内容
				*/
				pageCreateHtml: function(){
					var that      = this,
						s         = '',
						total     = p.data.total,
						pageIndex = p.pageIndex,
						pageSize  = p.pageSize;
					
					/*分页统计*/
					s += '<div class="l-grid-footer-page-msg">'+ that.__pageCore.getCount(pageSize, total, pageIndex) +'</div>';
					
					if( total ){
						/*分页选项*/
						s += '<div class="l-grid-footer-page-select">'+ that.__pageCore.getPageSelect() +'</div>';

						/*分页按钮*/
						s += '<div class="l-grid-footer-page-btn ui-pagination">'+ that.__pageCore.getBtn(pageSize, total, pageIndex) +'</div>';	
					}
										
					/*生成分页*/
					g.page.html(s);
					
					that.initCheckbox();
					
					/*if( p.pageSizeOptions ){
						select({
							target:'.l-grid-footer-page-select select',
							type:'single'
						})
					}*/
				},
				
				/**
				* 分页函数
				*/
				pageFn: function(){
					var page       = g.page,
						grid1      = g.grid1,
						gridHeader = grid1.find('l-gird-header'),
						gridBody   = grid1.find('l-gird-body'),
						pageSize   = p.pageSize,
						onPageFn   = p.onPageFn,
						that       = this;
					
					/*分页事件*/
					page.off('click', 'a').on('click', 'a', function(){
					
						var index = Number( $(this).attr('data-page') );
						
						/*修改页面位置*/
						p.pageIndex = index;
						
						/*返回接口，可能修改全局g.o对象，所以前置*/
						if( saogaUI.base.isFunction(onPageFn) ){
							onPageFn(index, pageSize);
						}
						
						if( !_cache.tmpData[index-1] || !_cache.tmpData.length ){
							/*获取数据并重载 Html*/
							that.getData();
						}else{
							/*重载 html*/
							that.tBodyCreateHtml(index);
							that.pageCreateHtml();
						}

						/*全部选上时给表头全选*/
						if( gridBody.find('.l-checkbox-selected').length === pageSize ){
							gridHeader.find('.l-checkbox').addClass('l-checkbox-selected');
						}else{
							gridHeader.find('.l-checkbox').removeClass('l-checkbox-selected');
						}
						
						/*初始化checkbox*/
						that.initCheckbox();
					});
					
					/*下拉框事件*/
					page.off('change', 'select').on('change','select', function(){
						_cache.tmpData = [];
						p.pageSize = Number( $(this).val() );
						p.pageIndex = 1;
						g.refresh();
					});
				},

				/**
				* 初始化checkbox
				*/
				initCheckbox: function(){
					var that       = this,
						pageSize   = p.pageSize,                        //每页显示多少个
						pageIndex  = p.pageIndex,                       //起始位置
						grid1      = g.grid1,
						gridHeader = grid1.find('.l-grid-header'),        //表格头
						gridBody   = grid1.find('.l-grid-body'),          //表格主体
						checkbox   = gridBody.find('.l-checkbox'),        //复选框
						isMemory   = p.isMemory;
					
					if( !isMemory ){
						var len = _cache.rowSelected.length,
							i   = 0;
						for(; i<len; i++){
							_cache.rowSelected[i] = []; //修改选中的数组值
						}
						gridHeader.find('.l-checkbox').removeClass('l-checkbox-selected');
					}else{
						var selected = Math.min(pageSize, checkbox.length), //已选数量
							arr      = _cache.rowSelected[pageIndex-1],
							len      = arr ? arr.length : 0,
							i        = 0,
							j        = 0;
						
						for(; i < len; i++, j++){
							if( arr[i] ){
								checkbox.eq(j).addClass('l-checkbox-selected');
							}
						}
						
						/*全部选上时给表头全选*/
						if( gridBody.find('.l-checkbox-selected').length === selected ){
							gridHeader.find('.l-checkbox').addClass('l-checkbox-selected');
						}else{
							gridHeader.find('.l-checkbox').removeClass('l-checkbox-selected');
						}
					}
				},
				
				/**
				* 选择框事件
				*/
				checkboxFn: function(){
					var that        = this,
						grid1       = g.grid1,
						grid2       = g.grid2,
						grid1Header = grid1.find('.l-grid-header'), //表格头
						grid1Body   = grid1.find('.l-grid-body'),   //表格主体
						grid2Body   = grid2.find('.l-grid-body'),   //表格主体
						onCheckFn   = p.onCheckFn,
						pageSize    = p.pageSize;
					
					/*多选*/
					grid1Body.off('click', '.l-checkbox').on('click', '.l-checkbox', function(){
						var self        = $(this),
							pageIndex   = p.pageIndex,
							checkbox    = grid1Body.find('.l-checkbox'),
							i           = checkbox.index(self),
							selected    = Math.min(pageSize, checkbox.length), //已选数量
							currentArr  = _cache.rowSelected[pageIndex-1],
							grid1Row    = grid1Body.find('.l-grid-row').eq(i),
							grid2Row    = grid2Body.find('.l-grid-row').eq(i),
							grid2Detail = grid2Row.next('.l-grid-row-detail'),
							tmpData     = _cache.tmpData[p.pageIndex - 1];
											
						if( !self.hasClass('l-checkbox-selected') ){
							self.addClass('l-checkbox-selected');
							grid1Row.addClass('l-grid-row-selected');
							grid2Row.addClass('l-grid-row-selected');
							grid2Detail.addClass('l-grid-row-selected');
							currentArr[i] = that.getRowData(i); //选中数据
							
							/*全部选上时给表头全选*/
							if( grid1Body.find('.l-checkbox-selected').length === selected ){
								grid1Header.find('.l-checkbox').addClass('l-checkbox-selected');
							}
						}else{
							currentArr[i] = null;
							self.removeClass('l-checkbox-selected');
							grid1Row.removeClass('l-grid-row-selected');
							grid2Row.removeClass('l-grid-row-selected');
							grid2Detail.removeClass('l-grid-row-selected');
							grid1Header.find('.l-checkbox').removeClass('l-checkbox-selected');
						}
						
						/*返回选择数据*/
						if( saogaUI.base.isFunction(onCheckFn) ){
							onCheckFn(tmpData[i], grid1Row, grid2Row);
						}
					});
					
					/*全选*/
					grid1Header.off('click', '.l-checkbox').on('click', '.l-checkbox', function(e){
						e.stopPropagation();
						var self        = $(this),
							pageIndex   = p.pageIndex,
							arr         = _cache.rowSelected[pageIndex-1],
							checkbox    = grid1Body.find('.l-checkbox'),
							grid1Rows   = grid1Body.find('.l-grid-row'),
							grid2Rows   = grid2Body.find('.l-grid-row'),
							grid2Detail = grid2Rows.next('.l-grid-row-detail'),
							len         = checkbox.length,
							i           = 0,
							j           = len - 1,
							tmpData     = _cache.tmpData[p.pageIndex - 1];
						
						if( !self.hasClass('l-checkbox-selected') ){
							self.addClass('l-checkbox-selected');
							grid1Rows.addClass('l-grid-row-selected');
							grid2Rows.addClass('l-grid-row-selected');
							grid2Detail.addClass('l-grid-row-selected');
							checkbox.addClass('l-checkbox-selected');
							for(; i < len; i++){
								arr[i] = that.getRowData(i);
							}
						}else{
							self.removeClass('l-checkbox-selected');
							checkbox.removeClass('l-checkbox-selected');
							grid1Rows.removeClass('l-grid-row-selected');
							grid2Rows.removeClass('l-grid-row-selected');
							grid2Detail.removeClass('l-grid-row-selected');
							for(; j > -1; j--){
								arr[j] = null;
							}
						}
						
						/*返回选择数据*/
						if( saogaUI.base.isFunction(onCheckFn) ){
							onCheckFn(tmpData, grid1Rows, grid2Rows);
						}
						
					});
				},
				
				/**
				* 获取行数据
				* @param {Number} index 记录的索引值
				*/
				getRowData: function(index){
					var	pageIndex = p.pageIndex,
						data      = _cache.tmpData[pageIndex - 1]; //表格数据
	
					if( index === -1 ){
						return false;
					}
					
					return data[index];
				},
				
				/**
				* 明细按钮事件
				* @param {object} init 和 refresh共享的对象
				*/
				detailBtnFn: function(options){
					var that        = this,
						grid1       = g.grid1,
						grid2       = g.grid2,
						grid1Body   = grid1.find('.l-grid-body'),   //表格主体
						grid2Body   = grid2.find('.l-grid-body'),   //表格主体
						pageSize    = p.pageSize;
						
					grid1Body.on('click','.l-grid-row-detailbtn',function(){
						var self         = $(this),
							parents      = self.parents('.l-grid-row'),
							index        = parents.attr('data-row'),
							grid2_row    = grid2Body.find('.l-grid-row').eq(index),
							detail       = grid2Body.find('.l-grid-row-detail').eq(index);

						if( self.hasClass('l-grid-row-detailbtn-close') ){
							detail.show();
							self.removeClass('l-grid-row-detailbtn-close')
								.addClass('l-grid-row-detailbtn-open');
							parents.height(grid2_row[0].offsetHeight + detail[0].offsetHeight);
						}else{
							detail.hide();
							self.removeClass('l-grid-row-detailbtn-open')
								.addClass('l-grid-row-detailbtn-close');
								
							parents.height(grid2_row[0].offsetHeight);
						}
					});
				},
				
				/**
				* ajax获取数据
				* @param {Function} callback ajax回调函数
				*/
				ajaxGetData: function(callback){
					var pageAjax      = p.pageAjax,
						type          = pageAjax.type === undefined ? 'POST' : pageAjax.type,
						showAllRow    = p.showAllRow,
						pageIndex     = p.pageIndex,
						pageSize      = p.pageSize,
						data          = pageAjax.data,
						isShowLoading = p.isShowLoading;
					
					/*************************临时处理*********************/
					//data = data.replace('{{index}}', pageIndex);
					//data = data.replace(/pageSize=\d*/, '');
					/*************************临时处理*********************/
					
					
					data += '&pageIndex=' + pageIndex;
					data += '&pageSize=' + pageSize;
										
					data = data.replace(/{{|}}/g,'');
					data = data.split('&');
					
                    /*解析URL并转换为json形式，防止特殊字符问题*/
					var args = {},
						argsStr = [],
						param,
						name,
						value;
					
					for (var i = 0; i < data.length; i++) {
						param = data[i].split('=');
						name = param[0],
						value = param[1];
						if(name === ""){
							name = "unkown";
						}
						if(typeof(args[name]) === "undefined"){ //参数尚不存在
							args[name] = value;
						}else if(typeof(args[name]) === "string"){ //参数已经存在则保存为数组
							args[name] = [args[name]];
							args[name].push(value);
						}else{ //已经是数组的
							args[name].push(value);
						}
					}

					/*var showArg = function (x) { //转换不同数据的显示方式
						if (typeof(x) == "string" && !/\d+/.test(x))
							return "'" + x + "'"; //字符串
						if (x instanceof Array)
							return "[" + x + "]"; //数组
						return x; //数字
					}*/
					
					//console.log(args)
					
					/*args.toString = function () { //组装成json格式
						for (var i in args)
							argsStr.push(i + ':' + showArg(args[i]));
						return '{' + argsStr.join(',') + '}';
					}*/
					//console.log(args)
					
					$.ajax({
						type: type,
						url: pageAjax.url,
						cache: false,
						dataType: "json",
						data: args,
						beforeSend: function(){
							if( saogaUI.base.isFunction(pageAjax.beforeSend) ){
								pageAjax.beforeSend();
							}
							if( isShowLoading ){
								g.loding.fadeIn();
							}
							g.onLoaded = false;
						},
						success: function(data){
							if( saogaUI.base.isFunction(pageAjax.success) ){
								pageAjax.success(data);
							}
							if( saogaUI.base.isFunction(callback) ){
								setTimeout(function(){
									callback(data);
									if( isShowLoading ){
										g.loding.fadeOut();
									}
								}, 500);
							}
							if( showAllRow ){
								p.pageSize = data ? data.total : 0;
								p.isPage   = false;
							}

							g.onLoaded = true;
						},
						error: function(data){
							callback();
							g.loding.fadeOut();
							g.jump(data);
						}
					});
				},
				
				/**
				* 获取数据
				*/
				getData: function(){
					var that      = this,
						pageIndex = p.pageIndex,
						nullText  = p.nullText;
						
					if( p.pageAjax ){
						p.data = {rows:[],total:0};
						that.ajaxGetData(function(data){
							p.data = data = !data ? p.data : ((!data.rows || !data.total) ? p.data : data);
							that.handleData(false);
							that.tBodyCreateHtml(pageIndex);
							that.pageCreateHtml();
							if( !data.total ){
								g.grid2.find('.l-grid-nullText').html(nullText);
							}
						});
					}
				},
				
				/**
				* 设置在cookie中的columns数据
				*/
				setCacheColumns: function(){
					var columns   = p.columns,
						len       = columns.length,
						i         = 0,
						h         = 0,
						cookieStr = saogaUI.base.cookie.get(p.id),
						cookieArr = cookieStr.split(','),
						cookieLen = cookieArr.length;
						
					if( cookieStr ){
						_cache.columns = [];
					}
					
					for(; i<len; i++){
						for(var j = 0; j<cookieLen; j++){
							if( columns[i].display === cookieArr[j] ){
								_cache.columns[h] = columns[i];
								h++;
							}
						}
					}
				},

				/**
				* 数据处理
				* XXX: 待优化
				*@param {boolean} isGetData 防止ajax请求数据时死循环
				*/
				handleData: function(isGetData){
					var that      = this,
					    data      = p.data = !p.data ? {rows:[],total:0} : ((!p.data.rows || !p.data.total) ? {rows:[],total:0} : p.data),
						pageAjax  = p.pageAjax,
						pageSize  = p.pageSize,
						pageIndex = p.pageIndex,
						len       = Math.ceil(data.total / pageSize),
						i         = 0,
						arr       = []; //临时数组
				
					/*初始化*/
					isGetData = isGetData == undefined ? true : isGetData;
					if( isGetData ){
						that.getData(); //获取数据并重载 Html
					}
					
					/*分割数据*/
					for(; i<len; i++){
						
						if( !_cache.rowSelected[i] ){
							_cache.rowSelected[i] = []; //已选行数据
						}
						
						/*分割静态数据给arr*/
						if( !pageAjax ){
							var h = 0;	
							
							arr[i] = [];
							
							for(; h< pageSize; h++){
								var rowData = data.rows[pageSize*i + h];
								if( rowData ){
									arr[i][h] = rowData;
								}
							}
						}
					}
					
					if( pageAjax ){
						_cache.tmpData[pageIndex - 1] = p.data.rows;
					}else{
						_cache.tmpData = arr;
					}
					
					/*设置列的cookie*/
					if( p.isHideColumns ){
						that.setCacheColumns();
					}
				},
				
				/**
				* 对比现有数据
				* @param {String} name 要比较的的字段
				* @param {String} sortType 排序裂隙
				*/
				compareData: function(name, sortType){
					var index = p.pageIndex - 1,
						arr   = _cache.tmpData[index],
						len   = arr.length,
						i     = 0;
					
					/*序顺序(a、b都是数字时按大小，a、b长度都一样是按字母，a、b长度不一时按长度)*/
					function getJsPercentDataComparator(name){
						return function(a, b){

							var result = 0;
							if( a[name] !== null && b[name] !== null ){
								var aStr   = a[name],
									bStr   = b[name],
									afloat = parseFloat(aStr),
									bfloat = parseFloat(bStr);
								
								if( !isNaN(bfloat) && !isNaN(afloat) ){
									result = (afloat>bfloat) ? 1 : -1;
								}else{
									if( aStr.length === bStr.length ){
										result = aStr.localeCompare(bStr);
									}else{
										result = (aStr.length>bStr.length) ? 1 : -1;
									}
									
								}
							}
							
							return result;
						};
					}
					
					arr.sort( getJsPercentDataComparator(name) );
					
					if( sortType === 'desc' ){
						arr.reverse();
					}
					
					_cache.tmpData[index] = arr;
					
					return arr;
				},
				
				/**
				* 表头事件
				*/
				tHeadFn: function(){
					var that           = this,
						pageSize       = p.pageSize,                  //每页显示多少个
						pageIndex      = p.pageIndex,                 //起始位置
						grid1          = g.grid1,
						grid2          = g.grid2,
						grid1Header    = grid1.find('.l-grid-header'),        //表格头
						grid1Body      = grid1.find('.l-grid-body'),          //表格主体
						grid2Header    = grid2.find('.l-grid-header'),        //表格头
						grid2Body      = grid2.find('.l-grid-body'),          //表格主体
						isSort         = p.isSort,
						isSortCurrent  = p.isSortCurrent,
						popup          = g.popup,
						isHideColumns  = p.isHideColumns,
						isShow         = true;
					
					//排序
					if( isSort ){
						grid2Header.find('.l-grid-hd-cell-span')
								   .addClass('l-grid-hd-cell-sortWrap')
								   .append('<span class="l-grid-hd-cell-sort"><b class="icon icon-angle-up"></b></span>');
						
						grid2Header.off('click', '.l-grid-hd-cell-span').on('click', '.l-grid-hd-cell-span', function(){
							var self     = $(this),
								name     = self.attr('data-columnName'),
								sortType = '',
								sort     = self.find('.l-grid-hd-cell-sort');
							
							if( isSortCurrent ){
								
								if( sort.hasClass('desc') ){
									sort.html('<b class="icon icon-angle-up"></b');
									sort.removeClass('desc');
									sortType = 'desc';
								}else{
									sort.html('<b class="icon icon-angle-down"></b');
									sort.addClass('desc');
									sortType = 'asc';
								}
								
								that.compareData(name, sortType);
								that.tBodyCreateHtml();
								
							}else{
								
								if( g.onLoaded ){
									
									if( sort.hasClass('desc') ){
										sort.html('<b class="icon icon-angle-up"></b');
										sort.removeClass('desc');
										sortType = 'desc';
									}else{
										sort.html('<b class="icon icon-angle-down"></b');
										sort.addClass('desc');
										sortType = 'asc';
									}
	
									if( /&sort=/.test(p.pageAjax.data) ){
										p.pageAjax.data = (p.pageAjax.data).replace(/&sort={{\w*}}/, '&sort={{'+ name+ '}}');
										p.pageAjax.data = (p.pageAjax.data).replace(/&sortType={{\w*}}/, '&sortType={{'+ sortType +'}}');
									}else{
										p.pageAjax.data = (p.pageAjax.data) + '&sort={{'+ name+ '}}&sortType={{'+ sortType +'}}';
									}
							
									that.handleData();
									that.tBodyCreateHtml();
									
								}// end if g.onLoaded
								
							}
						});
						
					}//end if isSort
					
					if( isHideColumns ){
						grid2Header.off('contextmenu', '.l-grid-hd-cell').on('contextmenu', '.l-grid-hd-cell', function(e){
							var self           = $(e.currentTarget),
								popup          = g.popup,
								popupWidth     = popup.outerWidth(),
								grid           = g.grid,
								gridWidth      = grid.outerWidth(),
								gridOffsetLeft = g.grid.offset().left,
								mousePosition  = saogaUI.ui.mousePosition(e),
								x              = mousePosition.positionX - gridOffsetLeft;
								
							if( gridWidth - x > popupWidth ){
								popup.css({'left':x});
							}else{
								popup.css({'left':x - popupWidth});
							}
							
							isShow = true;
							popup.show();
							return false;
						});
						
						popup
							.off('click')
							.on('click',function(e){
								isShow = true;
								e.stopPropagation();
							})
							.off('click', '.l-checkbox')
							.on('click', '.l-checkbox', function(e){
								var self = $(e.currentTarget);
								
								if( self.hasClass('l-checkbox-selected') ){
									if( popup.find('.l-checkbox-selected').length <= 1 ){ return false; }
									self.removeClass('l-checkbox-selected');
								}else{
									self.addClass('l-checkbox-selected');
								}
								
								var selected = popup.find('.l-checkbox-selected').next(),
									len      = selected.length,
									i        = 0,
									arr      = [];
									
								for(; i<len; i++){
									arr[i] = selected.eq(i).html();
								}
								saogaUI.base.cookie.set(p.id, arr.join(), 200000);
								that.setCacheColumns();
								that.tHeadCreateHtml();
								that.tBodyCreateHtml();
								e.stopPropagation();
							})
							.off('click', '.l-grid-popup-text')
							.on('click', '.l-grid-popup-text', function(e){
								var self  = $(e.currentTarget);
								self.prev().trigger('click');
								saogaUI.ui.onselectstart(self);
								e.stopPropagation();
							});
						
						$(window).on('click', function(){
							if( isShow ){
								popup.hide();
								isShow = false;
							}
						});
					}
				},
						
				/**
				* 行事件
				*/
				rowFn: function(){
					
					var that   = this,
						grid1             = g.grid1,
						grid2             = g.grid2,
						grid1Body         = grid1.find('.l-grid-body'),   //表格主体						
						grid2Header       = grid2.find('.l-grid-header'), //表格头
						grid2Body         = grid2.find('.l-grid-body'),   //表格主体
						onCheckFn         = p.onCheckFn,
						pageSize          = p.pageSize,
						onRowFn           = p.onRowFn,
						isOnRowCheckbox   = p.isOnRowCheckbox,
						isSelectSingleRow = p.isSelectSingleRow,
						isOnRowFn         = saogaUI.base.isFunction(onRowFn);
						
					grid2Body.off('mouseover', '.l-grid-row-cell').on('mouseover', '.l-grid-row-cell', function(){
						var self = $(this),
							arrt = self.attr('data-cell');
						
						self.parent().attr('data-cell', arrt);
					});
					
					grid2Body.off('click', '.l-grid-row').on('click', '.l-grid-row', function(){
						var self          = $(this),
							pageIndex     = p.pageIndex,
							//selected      = grid2Body.find('.l-grid-row-selected'),
							selfDetail    = self.next('.l-grid-row-detail'),
							i             = self.attr('data-row'),
							currentArr    = _cache.rowSelected[pageIndex-1],
							grid1Row      = grid1Body.find('.l-grid-row').eq(i),
							grid1Checkbox = grid1Body.find('.l-checkbox').eq(i);
											
						if( !self.hasClass('l-grid-row-selected') ){
							if( !onRowFn || isSelectSingleRow ){
								self.siblings().removeClass('l-grid-row-selected');
								grid1Row.siblings().removeClass('l-grid-row-selected');
							}
							if( isOnRowCheckbox ){
								grid1Checkbox.addClass('l-checkbox-selected');									
							}
														
							self.addClass('l-grid-row-selected');
							selfDetail.addClass('l-grid-row-selected');
							grid1Row.addClass('l-grid-row-selected');

						}else{
							if( !isSelectSingleRow ){
								self.removeClass('l-grid-row-selected');
								selfDetail.removeClass('l-grid-row-selected');
								grid1Row.removeClass('l-grid-row-selected');
							}
							if( isOnRowCheckbox ){
								grid1Checkbox.removeClass('l-checkbox-selected');								
							}
						}
						
						if( isOnRowFn ){
							if( !self.hasClass('l-grid-row-selected') ){
								currentArr[i] = that.getRowData(i);
								
							}else{
								_cache.rowSelected[pageIndex-1][i] = null;
							}
							onRowFn(that.getRowData(i), self);
						}
					});
				},
				
				/**
				* 列事件
				* TODO
				*/
				cellFn: function(){
					var grid1           = g.grid1,
						grid2           = g.grid2,
						grid1Body       = grid1.find('.l-grid-body'),   //表格主体						
						grid2Header     = grid2.find('.l-grid-header'), //表格头
						grid2Body       = grid2.find('.l-grid-body'),   //表格主体
						onCheckFn       = p.onCheckFn,
						pageSize        = p.pageSize,
						onRowFn         = p.onRowFn,
						isOnRowCheckbox = p.isOnRowCheckbox,
						isOnRowFn       = saogaUI.base.isFunction(onRowFn);
				},
				
				/**
				* 运行 grid 控件
				*/
				run: function(reRequest){
					var that = this;
					
					reRequest = reRequest === undefined ? true : reRequest;
					
					that.handleData(reRequest);
					
					if( p.isHead ){
						that.tHeadCreateHtml();
						that.tHeadFn();
					}
					
					that.tBodyCreateHtml();
					
					if( g.isInit ){
						that.rowFn();
						//this.cellFn();
						that.checkboxFn();
						that.detailBtnFn();
						g.isInit = false;
						saogaUI.ui.onselectstart(g.grid1);
					}
					
					if( p.isPage ){
						that.pageCreateHtml();
						that.pageFn();
					}else{
						g.footer.remove();
					}
					
				},
				
				/**
				* grid 初始化
				* @return {Object} grid对象
				*/
				init: function(){
					var grid   = p.wrap.append('<div class="l-grid" id='+ p.id +'></div>').find('#'+p.id),
						loding = grid.append('<div class="l-grid-loading fn-hide"><div class="l-grid-loadingBg"></div><div class="l-grid-loadingIco"></div></div>').find('.l-grid-loading'),
						popup  = grid.append('<div class="l-grid-popup"></div>').find('.l-grid-popup'),
						gBody  = grid.append('<div class="l-grid-body fn-clear"></div>').find('.l-grid-body'),
						grid1  = gBody.append('<div class="l-grid1"></div>').find('.l-grid1'),
						grid2  = gBody.append('<div class="l-sl-grid2"><div class="l-grid2"></div></div>').find('.l-grid2'),
						footer = grid.append('<div class="l-grid-footer"></div>').find('.l-grid-footer'),
						page   = footer.append('<div class="l-grid-footer-page"></div>').find('.l-grid-footer-page');
					
					p.pageIndex = 1;
					g.loding      = loding;
					g.popup       = popup;
					g.grid        = grid;
					g.grid1       = grid1;
					g.grid2       = grid2;
					g.footer      = footer;
					g.page        = page;
					g.isInit      = true;
					g.onLoaded    = false;

					this.run();
					return g;
				}
				
			};//_core end

		/**
		* grid 刷新对象
		* @method saogaUI.ui.grid.refresh
		* @param {object} [o] - 刷新grid新的配置项
		* @return {Object} grid对象
		*/
		g.refresh = function(o){
			if( o ){
				for(var key in o){
					if( o.hasOwnProperty(key) && o[key] !== undefined ){
						if( p.pageAjax && o.pageAjax ){
							for(var key2 in o.pageAjax){
								p[key][key2] = o.pageAjax[key2];
							}
						}else{
							p[key] = o[key];
						}
					}
				}
			}
			
			if( o && !o.refreshIndex ){
				p.pageIndex = 1;
			}
			
			_cache.tmpData = [];
			_cache.rowSelected = [];
			_cache.detailSelected = [];
			
			_core.run();
			return g;
		};
		
		/**
		* grid 获取列头
		* @method saogaUI.ui.grid.getColumns
		* @return {Array} grid对象的列头数据
		*/
		g.getColumns = function(){
			if( _cache.columns.length ){
				return _cache.columns;
			}
			return p.columns;
		},

		/**
		* grid 重设列头
		* @method saogaUI.ui.grid.reSetColumns
		* @param {object} 列对象
		* @return {Object} grid对象
		*/
		g.reSetColumns = function(o){
			 p.columns = _cache.columns = o.columns;
			_core.run(false);
		};

		/**
		* grid 修改列名
		* @method saogaUI.ui.grid.changeHeaderText
		* @param {Number|String} i - 为Number时Columns的引值，checkbox的不算；为string时是Columns的name
		* @param {String} text - 要修改的文本
		* @return {Object} grid对象
		*/
		g.changeHeaderText = function(i, text){
			var grid2    = g.grid2,
				isString = isNaN(Number(i));
				
			
			if( isString ){
				var obj = grid2.find('.l-grid-hd-cell-span'),
					len = obj.length,
					j   = 0;
				for(; j<len; j++){
					if( obj.eq(j).attr('data-columnname') === i ){
						obj.eq(j).find('.l-grid-hd-cell-text').html(text);
					}
				}
			}else{
				grid2.find('.l-grid-hd-cell-text').eq(i).html(text);
			}
			
			return g;
		};

		/**
		* grid 获取当前页数据，只支持静态数据，使用ajax数据时请用pageAjax提供的success方式获取
		* @method saogaUI.ui.grid.getCurrentData
		* @return {Object} grid当前页数据对象
		*/
		g.getCurrentData = function(){
			var pageIndex = p.pageIndex;
			return _cache.tmpData[pageIndex - 1];
		};

		/**
		* grid 获取选中的数据
		* @method saogaUI.ui.grid.getSelectData
		* @return {object} grid数据，格式与请求的一样
		*/
		g.getSelectData = function(){
			var arr      = [],
				i        = 0, 
				selected = _cache.rowSelected,
				len      = selected.length,   //记录的长度
				total    = 0;                 //data个数
			
			/*过滤掉records下面的空元素*/
			for(; i < len; i++){
				if( selected[i] ){
					for(var h = 0; h<selected[i].length; h++){
						if( selected[i][h] ){
							arr.push( selected[i][h] );
						}
					}
				}
			}
			
			/*组装一个表格适用的data数据*/
			total = arr.length;
			
			return {
				"rows": arr,
				"total":total
			};
		};
		
		/**
		* grid 获取当前页索引
		* @method saogaUI.ui.grid.getPageIndex
		* @return {Boolean} 
		*/
		g.getPageIndex = function(){
			return p.pageIndex;
		};
		
		/**
		* grid 取消的选中的行
		* @method saogaUI.ui.grid.uncheckRow
		* @param {Number} i 取消的选中的行，值为当前页
		* @return {Object} grid对象
		*/
		g.uncheckRow = function(i, pageIndex){
			if( i !== undefined ){
				var grid1       = g.grid1,
					grid2       = g.grid2,
					grid1Header = grid1.find('.l-grid-header'), //表格头
					grid1Body   = grid1.find('.l-grid-body'),   //表格主体
					grid2Body   = grid2.find('.l-grid-body'),   //表格主体
					grid1Row    = grid1Body.find('.l-grid-row').eq(i),
					grid2Row    = grid2Body.find('.l-grid-row').eq(i),
					checkbox    = grid1Body.find('.l-checkbox').eq(i),
					currentArr  = _cache.rowSelected[pageIndex-1];
				
				checkbox.removeClass('l-checkbox-selected');
				grid1Row.removeClass('l-grid-row-selected');
				grid2Row.removeClass('l-grid-row-selected');
				grid1Header.find('.l-checkbox').removeClass('l-checkbox-selected');
				currentArr[i] = null;
				
				_core.initCheckbox();
			}
			return g;
		};
		
		/*g.uncheckRow2 = function(key, val){
			var data = _cache.rowSelected;
			
			for(var i = 0; i<data.length; i++){
				var dataItem = data[i];
				for(var h = 0; h<dataItem.length; h++){
					if( dataItem[h][key] !== undefined && dataItem[h][key] === val ){
						
					}
				}
			}
		};*/
		
		/**
		* grid 跳出执行
		* @method saogaUI.ui.grid.jump
		* @return {Boolean} 
		*/
		g.jump = function(data){
			console.log('ajax data error:',data);
			return false;
		};
		
		/**
		* grid 扩展
		* @method saogaUI.ui.grid.methos
		* @return {object} 
		*/
		g.methos = g.methos || {};
		
		return _core.init(o);
	};

	return function(options){
		return new Grid(options);
	};
});
define('core/dorpDownTree',['core/saogaUI'], function(saogaUI){
	
	
	
	var DorpDownTree = function(options){
		var o = options || {};
		if(!o.target){return false;}
		var g           = this,
			data        = o.data,
			target      = $(o.target),
			height      = o.height ? o.height : 'auto',
			selectedID  = Number(o.selectedID),
			isOpen      = o.isOpen === undefined ? true : o.isOpen,
			isMultiple  = o.isMultiple || false,
			onclickItem = o.onclickItem,
			onloadFn    = o.onloadFn;
		
		
		var _core = {
				
			/**
			* 创建树对象
			*/
			createHtml: function(data){
				var line        = '',
					node        = '<div class="l-treeNode"></div>',
					isLastGroup,
					ischildren,
					selected,
					tree        = function(data, line, isOrigin){
						var i    = 0,
							len  = data.length,
							html = '';
						for(; i<len; i++){

							var childrenObj      = data[i].children,
								isLastNode       = ( i === len-1 ),
								isYoungerBrother = (data[i+1] !== undefined ? false : true);
							
							if( selectedID === Number(data[i].id) ){
								selected = data[i];
							}else if(selectedID === undefined){
								selected = data[0];
							}
							
							console.log(selectedID,Number(data[i].id))
							
							html += '<div class="l-treeItemWrap fn-clear'+ ( childrenObj ? ' l-treeParent' : ' l-treeLast' ) + (selectedID === Number(data[i].id) ? ' l-treeSelected' : '') +'">';
								if( isOrigin ){
									if( isLastNode ){
										html += '<div class="l-treeBox l-treeExpandableLast-open"></div><div class="l-treeBox l-treeIco"></div>';
										isLastGroup = true;
									}else{
										html += '<div class="l-treeBox l-treeExpandable-open"></div><div class="l-treeBox l-treeIco"></div>';
									}
								}else{
									html += '<div class="l-treeBox'+ (isLastGroup ? '' : ' l-treeLine') +'"></div>';
								}
								
								//html += (isMultiple ? '<div class="l-treeCheckbox"></div>' : '');
								
								//替换字符串，考虑修改
								html +=	(line ? line + node + '<div class="l-treeBox l-treeIco"></div>' : '');
								html = html.replace('l-treeLine"></div><div class="l-treeNode"></div>',(isLastNode ? 'l-treeLastNode' : 'l-treeNode') +'"></div>');
								if( isYoungerBrother && childrenObj ){
									//line = line.replace(/ l-treeLine/g, '');
								}

								if( childrenObj === undefined && !isOrigin ){
									//html = html.replace(/l-treeNode/g, 'l-treeExpandable-open');
									//html = html.replace('l-treeLastNode', 'l-treeExpandableLast-open');
									html = html.replace(/<div class="l-treeBox l-treeExpandable-open"><\/div><div class="l-treeBox l-treeIcoLast"><\/div>/g,'<div class="l-treeBox l-treeNode"></div><div class="l-treeBox l-treeIcoLast"></div>');
								}else if( !childrenObj && !isOrigin ){
									html += '<div class="l-treeBox l-treeIcoLast"></div>';
									html = html.replace('<div class="l-treeBox l-treeIco"></div><div class="l-treeBox l-treeIcoLast"></div>', '<div class="l-treeBox l-treeIcoLast"></div>');
								}
								html += '<div class="l-treeItem" data-id='+ data[i].id +' data-isCategory='+ data[i].isCategory +'>'+ data[i].name +'</div>';
							
							html += '</div>';
									
							if( childrenObj ){
								html += '<div class="l-treeChildrenWrap fn-clear" data-pid='+ data[i].id +'>'+ tree(childrenObj, line+'<div class="l-treeBox l-treeLine"></div>', false) +'</div>';
							}
						}
											
						return html;
					};
				
				target.html( '<div class="l-tree">'+ tree(data, line, true) +'</div>' );
				
				return selected;
			},
			
			onItem: function(){
				target.find('.l-treeItem').on('click',function(e){
					e.stopPropagation();
					var that = $(this),
						name = that.text(),
						id   = that.attr('data-id'),
						pid  = that.parents('.l-treeChildrenWrap').attr('data-pid'),
						isCategory  = that.attr('data-isCategory');
					
					if( pid === undefined ){
						pid = '';
					}

					if( onclickItem && saogaUI.base.isFunction(onclickItem) ){
						onclickItem(name, id, pid, that, isCategory);
					}
				});
			},
			
			/**
			* 创建树对象
			*/
			run: function(){
				var selected = _core.createHtml(data);
				
				/*初始化选中*/
				if( onloadFn && saogaUI.base.isFunction(onloadFn)  ){
					onloadFn(selected);
				}
				
				
				target.find('.l-treeParent .l-treeNode').addClass('l-treeExpandable-open');
				target.find('.l-treeParent .l-treeLastNode').addClass('l-treeExpandableLast-open');
				
				if( !isOpen ){
					target.find('.l-treeChildrenWrap').hide();
					target.find('.l-treeExpandable-open').addClass('l-treeExpandable-close');
					target.find('.l-treeExpandableLast-open').addClass('l-treeExpandableLast-close');
				}
				target.find('.l-treeExpandable-open').on('click',function(e){
					e.stopPropagation();
					var that = $(this);
					if( that.hasClass('l-treeExpandable-close') ){
						that.removeClass('l-treeExpandable-close');
						that.parent().next('.l-treeChildrenWrap').show();
					}else{
						that.addClass('l-treeExpandable-close');
						that.parent().next('.l-treeChildrenWrap').hide();
					}
				});
				target.find('.l-treeExpandableLast-open').on('click',function(e){
					e.stopPropagation();
					var that = $(this);
					if( that.hasClass('l-treeExpandableLast-close') ){
						that.removeClass('l-treeExpandableLast-close');
						that.parent().next('.l-treeChildrenWrap').show();
					}else{
						that.addClass('l-treeExpandableLast-close');
						that.parent().next('.l-treeChildrenWrap').hide();
					}
				});
				//target.find('.l-treeChildrenWrap .l-treeLast:last').addClass('l-treeLastNode')
				_core.onItem();
			}
		};
		
		g.init = function(){
			_core.run(data);
			return g;
		};

	};
	
	return function(options){
		var tree = new DorpDownTree(options);
		return tree.init();
	};
});
define('core/select',['core/saogaUI','core/dorpDownTree'], function(saogaUI, dorpDownTree){
	var select = function(options){
		var o           = options,
			id          = o.id || 'l-select-'+(new Date()).valueOf(),
			cls         = o.cls === undefined ? '' : o.cls,
			target      = $(o.target).wrap('<div class="ui-select '+ cls +'" id="'+ id +'"></div>'),
			wrap        = $('#'+id),
			initWrap    = wrap.append('<div class="arrow"></div><div class="ui-select-init"></div>').find('.ui-select-init'),
			itemWrap    = null,
			arrow       = wrap.find('.arrow'),
			top         = wrap.offset().top,
			left        = wrap.offset().left,
			height      = wrap.outerHeight(),
			downHeight  = o.downHeight === undefined ? 300 : o.downHeight,
			downWidth   = o.downWidth === undefined ? 300 : o.downWidth,
			disable     = o.disable === undefined ? false : o.disable,
			isTree      = o.isTree === undefined ? false : o.isTree,
			initVal     = o.initVal,
			data        = o.data,
			selectedID  = o.selectedID,
			onclickItem = o.onclickItem,
			onloadFn    = o.onloadFn,
			onParent    = o.onParent === undefined ? false : o.onParent,
			onChildren  = o.onChildren === undefined ? false : o.onChildren,
			isShow      = false,
			zIndex      = saogaUI.ui.zIndex();
		
		/*载入容器*/
		saogaUI.ui.wrap();
		
		itemWrap = $('#l-ui-wrap').prepend('<div class="l-select-wrap ui-select-itemWrap fn-hide" id="'+ id +'-wrap"></div>').find('#'+ id +'-wrap');

		itemWrap.css({
			'z-index':200000,
			position:'absolute',
			width: wrap.width(),
			top: top + height,
			left:left
		});
				
		wrap.click(function(e){
			e.stopPropagation();
			$('.ui-select-itemWrap').addClass('fn-hide');
			if( !isShow ){
				itemWrap.removeClass('fn-hide');
				isShow = true;
			}else{
				itemWrap.addClass('fn-hide');
				isShow = false;
			}
		});
		/*wrap.on('mouseover', function(){
			isShow = false;
		}).on('mouseout',function(){
			isShow = true;
		});*/
		
		
		$(window).on('click', function(){
			if( isShow && !disable ){
				itemWrap.addClass('fn-hide');
				isShow = false;
			}
		});
		
		if( !isTree ){
			$.each(data, function(i, item){
			
				if( initVal === item.value ){
					initWrap.attr('data-value', item.value)
							.html( item.name );
				}
				
				itemWrap.height(downHeight)
						.append('<div class="ui-select-item" data-value="'+ item.value +'">'+ item.name +'</div>')
						.find('.ui-select-item')
						.eq(i)
						.click(function(){
							var val  = $(this).attr('data-value'),
								name = $(this).html();
								
							target.val( val );
							initWrap.attr('data-value', val)
									.html( name );
							
							itemWrap.addClass('fn-hide');
						})
						.hover(function(){
							$(this).addClass('selected');
						},
						function(){
							$(this).removeClass('selected');
						});
			});

		}else{
			dorpDownTree({
				data: data,
				target: itemWrap,
				selectedID: selectedID,
				onclickItem: function(name, id, pid, that, isCategory){
					if( onParent && isCategory !== '0' ){
						target.val( id );
						initWrap.attr('data-value', id)
								.html( name );
						itemWrap.addClass('fn-hide');
					}
					
					if( !onChildren && isCategory === '0' ){
						target.val( id );
						initWrap.attr('data-value', id)
								.html( name );
						itemWrap.addClass('fn-hide');
						isShow = false;
					}
					
					if(onParent&&onChildren){
						target.val( id )
							  .attr('data-name', obj.name);
						initWrap.attr('data-value', id)
								.html( name );
						itemWrap.addClass('fn-hide');
						isShow = false;
					}
										
					if( onclickItem && saogaUI.base.isFunction(onclickItem)  ){
						onclickItem(name, id, pid, that, isCategory);
					}
					
				},
				onloadFn: function(obj){
					itemWrap.height(downHeight)
							.width(downWidth);
					
					if( obj ){
						target.val( obj.id )
							  .attr('data-name', obj.name);
						initWrap.attr('data-value', obj.val)
								.html( obj.name );
						if( onloadFn && saogaUI.base.isFunction(onloadFn)  ){
							onloadFn(obj);
						}
					}
					

					if( disable ){ 
						
						wrap.addClass('ui-select-disable');
						itemWrap.remove();
						
					}
				}
			});
		}
		
	};
	
	return function(options){
		select(options);
	};
});
define('core/calendar',['core/saogaUI'], function(saogaUI){
	
	var calendar = function(options){
		var o = options || {};
		if(!o.trigger){return;}
		var trigger    = $(o.trigger).wrap('<div class="l-ui-calendarWrap"></div>'),
			wrap       = trigger.parent(),
			top        = o.top || trigger.outerHeight(),
			left       = o.left || 0,
			main       = wrap.append('<div class="l-ui-calendarMain" style="top:'+ top +'px;left:'+ left +'px"></div>')
							 .find('.l-ui-calendarMain'),
			callback   = o.callback,
			beginYear  = Number(o.beginYear) || 1980,
			endYear    = Number(o.endYear) ||  2050,
			language   = o.language || {
											next: '上个月',
											prev: '下个月',
											submit: '提交',
											year: '年',
											month: '月',
											time: '时间',
											weeks: ['日', '一', '二', '三', '四', '五', '六']
										},
			days       = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			weeks      = language.weeks,
			months     = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			dateFormat = o.dateFormat || 'yyyy-MM-dd hh:mm:ss',
			date       = o.date || new Date(),
			globalDate = date,
			isShowTime = /(h+)/.test(dateFormat),
			_core      = {
							/*格式化日期*/
							format: function(year, month, day, hour, minute, second, week, quarter, millisecond){
								var o = {
										// "M+" : month + 1 || date.getMonth() + 1,                                       //month
										// "d+" : day || date.getDate(),                                                  //day
										// "h+" : hour || date.getHours(),                                                //hour
										// "m+" : minute || date.getMinutes(),                                            //minute
										// "s+" : second || date.getSeconds(),                                            //second
										// "w+" : weeks[week] || weeks[date.getDay()],                                    //week
										// "q+" : Math.floor((quarter + 3) / 3) || Math.floor((date.getMonth() + 3) / 3), //quarter
										// "S"  : millisecond || date.getMilliseconds()                                   //millisecond
										'M+': month + 1,
										'd+': day,
										'h+': hour,
										'm+': minute,
										's+': second,
										'w+': weeks[week],
										'q+': Math.floor((quarter + 3) / 3),
										'S' : millisecond
									},
									str  = dateFormat;
								
								year = year.toString();
								
								if( /(y+)/.test(str) ){
									str = str.replace(/(y+)/, year.substr(4 - Math.min(4, RegExp.$1.length)));
								}
								for( var k in o ){
									if(	new RegExp("("+ k +")").test(str) ){
										if(	o[k] !== undefined && !isNaN(o[k]) ){
											str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
										}else{
											str = str.replace(/\s[^\d](.)*/, '');
										}
									}
								}
								return str;
							},
						
							/*判断闰年*/
							isLeapYear: function(y){
								if((y % 400 === 0) || (y % 100 !== 0) && (y % 4 === 0)){
									return true;
								}
								return false;
							},
							
							/*获取月份天数*/
							getDayCount: function(y, m){
								if( _core.isLeapYear(y, m) ){
									days[1] = 29;
								}else{
									days[1] = 28;
								}
								return days[m];
							},
							
							/*获取新date*/
							getNewDate: function(y, m, d) {
								var newDate = new Date();
								newDate.setFullYear(y, m, d);
								// !isNaN(y) && newDate.setFullYear(y);
								// !isNaN(m) && newDate.setMonth(m);
								// !isNaN(d) && newDate.setDate(d);
								return newDate;
							},
							
							/*获取上下月*/
							getPrevNextMonth: function(poor){
								var y = globalDate.getFullYear(),
									m = globalDate.getMonth() + poor;
								if(m < 0){
									y -= 1;
									m = 11;
								}else if(m > 11){
									y += 1;
									m = 0;
								}
								return _core.getNewDate(y, m, 1);
							},
							getPrevDate: function(){
								return _core.getPrevNextMonth(-1);
							},
							getNextDate: function(){
								return _core.getPrevNextMonth(1);
							},
							
							/*创建头部*/
							createHeader: function(){
								var html     = '',
									yearLen  = endYear - beginYear,
									i        = 0,
									monthLen = 12,
									n        = 0;
									
								html += '<a class="l-ui-calendarHeader-btn l-ui-calendarHeader-prev" href="javascript:;" title="'+ language.prev +'"></a>';
								html += '<div class="l-ui-calendarHeader-text">';
								html += '<select class="l-ui-calendarHeader-year">';
								for(; i < yearLen; i++){
									var year = beginYear + i;
									if( year === globalDate.getFullYear() ){
										html += '<option value="'+ year +'" selected>'+ year +'</option>';
									}else{
										html += '<option value="'+ year +'">'+ year +'</option>';
									}
								}
								html += '</select>' + language.year;
								html += '<select class="l-ui-calendarHeader-month">';
								for(; n < monthLen; n++){
									var month = months[n];
									if( n === globalDate.getMonth() ){
										html += '<option value="'+ n +'" selected>'+ month +'</option>';
									}else{
										html += '<option value="'+ n +'">'+ month +'</option>';
									}
								}
								html += '</select>' + language.month;
								html += '</div>';
								html += '<a class="l-ui-calendarHeader-btn l-ui-calendarHeader-next" href="javascript:;" title="'+ language.next +'"></a>';
								
								return '<div class="l-ui-calendarHeader fn-clear">'+ html +'</div>';
							},
							
							/*创建周*/
							createWeeks: function(){
								var html = '',
									i    = 0;
								html += '<div class="l-ui-calendarWeeks fn-clear">';
								for(; i < 7; i++){
									if( i === 0 ){
										html += '<span class="l-ui-calendarWeek l-ui-calendarWeek-sunday">'+ weeks[i] +'</span>';
									}else if( i === 6 ){
										html += '<span class="l-ui-calendarWeek l-ui-calendarWeek-saturday">'+ weeks[i] +'</span>';
									}else{
										html += '<span class="l-ui-calendarWeek">'+ weeks[i] +'</span>';
									}
								}
								html += '</div>';
								return html;
							},
							
							/*创建天*/
							createDays: function(){
								var //year       = date.getFullYear(),
									//month      = date.getMonth(),
									day        = date.getDate(),
									curYear    = globalDate.getFullYear(),              //当前全局date对象
									curMonth   = globalDate.getMonth(),
									curDay     = globalDate.getDate(),
									curDayNum  = _core.getDayCount(curYear, curMonth),
									prevDate   = _core.getPrevDate(),                    //获取上月的date
									prevYear   = prevDate.getFullYear(),
									prevMonth  = prevDate.getMonth(),
									prevDayNum = _core.getDayCount(prevYear, prevMonth),
									nextDate   = _core.getNextDate(),                    //获取下月的date
									nextYear   = nextDate.getFullYear(),
									nextMonth  = nextDate.getMonth(),
									lastWeek   = new Date(curYear, curMonth, 1).getDay(), //获取本月1号的星期数
									html       = '',
									p          = prevDayNum - lastWeek +1,               //上月剩余天数(礼拜从礼拜日算起)
									nextDayNuM = 42 - lastWeek - curDayNum,              //下月剩余天数
									i          = 1,
									n          = 1;

								for(; p <= prevDayNum; p++) {
									var prevDayStr =  _core.format(prevYear, prevMonth, p);
									html += '<a href="javascript:;" class="l-ui-calendarDay l-ui-calendarDay-prev l-ui-calendarDay-disable" title="'+ prevDayStr +'" year="'+ prevYear +'" month="'+ prevMonth +'">'+ p +'</a>';
								}
								
								for(; i <= curDayNum; i++){
									var cls       = '',
										curDayStr = _core.format(curYear, curMonth, i);
									if( day === i ){
										cls = ' l-ui-calendarDay-current';
									}
									html += '<a href="javascript:;" class="l-ui-calendarDay'+ cls +'" title="'+ curDayStr +'" year="'+ curYear +'" month="'+ curMonth +'">'+ i+'</a>';
								}
								
								for(; n <= nextDayNuM; n++) {
									var nextDayStr =  _core.format(nextYear, nextMonth, n);
									html += '<a href="javascript:;" class="l-ui-calendarDay l-ui-calendarDay-next l-ui-calendarDay-disable" title="'+ nextDayStr +'" year="'+ nextYear +'" month="'+ nextMonth +'">'+ n +'</a>';
								}
												
								return '<div class="l-ui-calendarDays fn-clear">'+ html +'</div>';
							},
							
							/*创建时分秒*/
							createTime: function(){
								var hour       = date.getHours(),
									minute     = date.getMinutes(),
									second     = date.getSeconds(),
									hourHtml   = '',
									minuteHtml = '',
									secondHtml = '',
									h          = 0,
									m          = 0,
									s          = 0;
									
								hour   = hour < 10 ? '0' + hour  : hour;
								minute = minute < 10 ? '0' + minute  : minute;
								second = second < 10 ? '0' + second  : second;
								
								for(; h < 24; h++){
									hourHtml += '<a href="javascript:;">'+ (h < 10 ? '0' + h  : h) +'</a>';
								}
								
								for(; m < 60; m++){
									minuteHtml += '<a href="javascript:;">'+ (m < 10 ? '0' + m  : m) +'</a>';
								}
								
								for(; s < 60; s++){
									secondHtml += '<a href="javascript:;">'+ (s < 10 ? '0' + s  : s) +'</a>';
								}
									
								return  '<div class="l-ui-calendarTime fn-clear">' +
											'<div class="l-ui-calendarTimeTitle">'+ language.time +':</div>' + 
											'<div class="l-ui-calendarTimeWrap fn-clear">' +
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-hourWrap">' +
													'<input type="text" class="l-ui-calendarTime-hourInput" value="'+ hour +'" /><span>:</span>' +
													'<div class="l-ui-calendarTime-hour">'+ hourHtml +'</div>' +
												'</div>' + 
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-minuteWrap">' + 
													'<input type="text" class="l-ui-calendarTime-minuteInput" value="'+ minute +'" /><span>:</span>' + 
													'<div class="l-ui-calendarTime-minute">'+ minuteHtml +'</div>' + 
												'</div>' + 
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-secondWrap">'  +
													'<input type="text" class="l-ui-calendarTime-secondInput" value="'+ second +'" />' + 
													'<div class="l-ui-calendarTime-second">'+ secondHtml +'</div>' + 
												'</div>'  +
											'</div>' + 
											'<a href="javascript:;" class="l-ui-calendarTimeBtn">'+ language.submit +'</a>' +
										'</div>';
							},
							
							/*点击下个月*/
							clickNext: function(){
								globalDate = _core.getPrevNextMonth(1);
								_core.init();
							},
							
							/*点击上个月*/
							clickPrev: function(){
								globalDate = _core.getPrevNextMonth(-1);
								_core.init();
							},
							
							/*年月选择*/
							clickYearMonth: function(year, month){
								globalDate = new Date(year, month, 1);
								_core.init();
							},
							
							/*关闭日历*/
							close: function(val){
								trigger.val(val);
								main.hide();
								if( saogaUI.base.isFunction(callback) ){
									callback(val);
								}
							},
				 
							/*初始化函数*/
							init: function(){
								main.html(_core.createHeader() + _core.createWeeks() + _core.createDays());
								
								main.find('.l-ui-calendarHeader-prev').click(function(){
									_core.clickPrev();
								});
								main.find('.l-ui-calendarHeader-next').click(function(){
									_core.clickNext();
								});

								main.find('.l-ui-calendarHeader-month').change(function(){
									var year  = main.find('.l-ui-calendarHeader-year').val(),
										month = $(this).val();
									_core.clickYearMonth(year, month);
								});
								main.find('.l-ui-calendarHeader-year').change(function(){
									var year  = $(this).val(),
										month = main.find('.l-ui-calendarHeader-month').val();
									_core.clickYearMonth(year, month);
								});
								
								main.find('.l-ui-calendarDay').each(function(i){
									var saturday = i%7 === 6 ? ' l-ui-calendarDay-saturday' : '',
										sunday   = i%7 === 0 ? ' l-ui-calendarDay-sunday' : '';
									$(this).addClass(saturday+sunday);
								}).click(function(){
									var self = $(this),
										val  = self.attr('title');
										
									self.addClass('l-ui-calendarDay-current')
										.siblings()
										.removeClass('l-ui-calendarDay-current');
										
									if( !isShowTime ){
										_core.close(val);
									}else{
										var curYear  = self.attr('year'),
											curMonth = self.attr('month'),
											curDay   = self.text();
										
										globalDate = _core.getNewDate(curYear, curMonth, curDay);
									}
								}).dblclick(function(){
									if( isShowTime ){
										var hour     = hourInput.val(),
											minute   = minuteInput.val(),
											second   = secondInput.val(),
											curYear  = globalDate.getFullYear(),  //当前全局date对象
											curMonth = globalDate.getMonth(),
											curDay   = globalDate.getDate(),
											val      = _core.format(curYear, curMonth, curDay, hour, minute, second);
										
										_core.close(val);
									}
								}).mouseover(function(){
									var self = $(this);
									if( !self.hasClass('l-ui-calendarDay-current') ){
										self.addClass('l-ui-calendarDay-on')
									}
								}).mouseout(function(){
									var self = $(this);
									self.remove('l-ui-calendarDay-on')
								});
								
								if( isShowTime ){
									if( !main.find('.l-ui-calendarTime').length ){
										main.append(_core.createTime());
									}
				 
									var hourInput   = main.find('.l-ui-calendarTime-hourInput'),
										minuteInput = main.find('.l-ui-calendarTime-minuteInput'),
										secondInput = main.find('.l-ui-calendarTime-secondInput'),
										inputTime   = function( o ){
														o.siblings('div')
														 .show()
														 .find('a')
														 .click(function(){
															o.val( $(this).text() )
															 .siblings('div')
															 .hide();
														 });
														o.parent().siblings().find('div').hide();
													};
									
									hourInput.click(function(){
										inputTime( $(this) );
									});
									minuteInput.click(function(){
										inputTime( $(this) );
									});
									secondInput.click(function(){
										inputTime( $(this) );
									});
									main.find('.l-ui-calendarTimeBtn').click(function(){
										var hour     = hourInput.val(),
											minute   = minuteInput.val(),
											second   = secondInput.val(),
											curYear  = globalDate.getFullYear(),  //当前全局date对象
											curMonth = globalDate.getMonth(),
											curDay   = globalDate.getDate(),
											val      = _core.format(curYear, curMonth, curDay, hour, minute, second);
										
										_core.close(val);
									});
								}
							}
						};//end code
		
		_core.init();
		trigger.click(function(){
			main.show();
		});
	};
	
	return calendar;
});
define('core/tree_debug',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* saogaUI.ui.tree 树形控件
	* @class saogaUI.ui.tree
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 树形参数
    * @param {String} o.id 树形id
    * @param {String} o.data 树形数据
    * @param {String} o.ajax 树形ajax数据，与o.data互斥
    * @param {String} o.ajax.url
    * @param {String} o.ajax.data
    * @param {String} o.ajax.beforeSend
    * @param {String} o.ajax.success
    * @param {String} o.ajax.error
    * @param {String} o.isSimple 简单数据格式，已经经过递归的数据
    * @param {String} o.target 树形容器
    * @param {Object} o.height o.target的高度
    * @param {Object} o.selectedID 初始化选中的ID
    * @param {Object} o.isOpen 初始化是否打开
    * @param {Object} o.onClick 树形item的click事件
    * @param {Object} o.onRightClick 树形item的RightClick事件
    * @param {Object} o.onMouseOver 树形item的onmouseover事件
    * @param {Object} o.onMouseOut 树形item的onmouseout事件
    * @param {Object} o.onLoad 树形加载完触发的事件
	* @return {Object} tree对象
	*/
	
	var Tree = function(o){
		
		var g = this,
        
			p = {
					id           : 'l-tree-'+(new Date()).valueOf(),
					data         : o.data,
					ajax         : null,
					isSimple     : true,   //是否是简单的数据格式
					target       : null,
					height       : 'auto',
					selected     : [],
					check        : null,
					isOpen       : true,
					isMultiple   : false,
					onClick      : null,
					onRightClick : null,
					onMouseOver  : null,
					onMouseOut   : null,
					onLoad       : null
				},
                
            /* 缓存池 */
            _cache = {
                selected: [],
                init: false
            },
            
			c = {
					/**
					* 创建树对象
					*/
					createHtml: function(){
						var data       = p.data,
							target     = p.target,
							isMultiple = p.isMultiple,
							isCheckBox = p.check === 'checkbox',
							isRadio    = p.check === 'radio',
							isFirst    = true,
							tree       = function(data, pid, level){
							
								if( data ){
									var html  = '';
									var lll = level
									level++;
																		
									for(var i = 0; i<data.length; i++){
										if( Number(data[i].pid) === pid ){
										
											var son          = data[i].children ? data[i].children : [],
												sonWrap      = '',
												sonHtml      = tree(son, Number(data[i].id), level),
												isLast       = !data[i+1],
												lastCls      = '',
												lastSwitch   = '',
												lastIco      = '',
												lineCls      = '',
												openCls      = '',
												closeCls     = '',
												selectCls    = '',
												isParent     = data[i].isParent === undefined ? false : data[i].isParent,
												isOpen       = data[i].open === undefined ? false : data[i].open,
                                                icon         = data[i].icon ? ' style="background:url('+ data[i].icon +') 0 0 no-repeat;"' : '',
												parentNode   = isParent ? ' l-tree-parentNode' : '',
                                                j            = 0,
                                                selected     = p.selected,
                                                selectedLen  = selected ? selected.length : 0,
                                                isChecked    = data[i].checked === undefined ? false : data[i].checked,
                                                checkedStr   = '',
												checkHtml    = '';
                                             
                                            /* 获取选中数据 */
                                            for( ; j<selectedLen; j++ ){
                                                if( Number(selected[j]) === Number(data[i].id) ){
                                                    _cache.selected.push(data[i]);
													selectCls = ' l-tree-selectedNode';
                                                }
                                            }
                                            
                                            if( isChecked ){
                                                checkedStr = ' data-checked="true"';
                                            }
											
											if( isCheckBox ){
												checkHtml = '<span class="l-tree-check l-tree-checkbox l-tree-check-'+ level +'" data-level="'+ level +'"'+ checkedStr +'></span>';
											}
											
											if( isRadio ){
												checkHtml = '<span class="l-tree-check l-tree-radio" data-level="'+ level +'"></span>';
											}
											
											/*判断是不是子*/
											if( isLast ){
												lastCls    = ' l-tree-lastItem';
												lastSwitch = ' l-tree-lastSwitch';
												lastIco    = ' l-tree-lastIco';
											}

											/*判断最后一个*/
											if( !isLast ){
												lineCls = ' l-tree-line';
											}
											
											if( isOpen || isParent ){
												openCls = ' l-tree-open';
											}
											
											/*判断子有没有存在*/											
											if( sonHtml ){
												if( !isOpen ){
                                                    openCls  = '';
													closeCls = ' l-tree-close';
												}
												sonWrap +=	'<ul class="l-tree-ul'+ lineCls + (closeCls?' fn-hide':'') +'">';
												sonWrap +=		sonHtml;
												sonWrap +=	'</ul>';
												if( isFirst && data[i].pid === 0 ){
													parentNode = ' l-tree-parentNode l-tree-parentFirstNode';
													isFirst = false;
												}else{
													parentNode = ' l-tree-parentNode';
												}
											}
											
											html += '<li class="fn-clear l-tree-level-'+ level + lastCls +'">';
											html += 	'<div class="l-tree-item l-tree-itemLevel-'+ level + parentNode + '">';
											html += 		'<span class="l-tree-switch'+ openCls + closeCls + lastSwitch +'"></span>';
											html +=         checkHtml;
											html += 		'<a class="l-tree-node '+ selectCls +'" data-id="'+ data[i].id +'" data-pid="'+ data[i].pid +'" data-name="'+ data[i].name +'" title="'+ data[i].name +'">';
											html += 			'<span class="l-tree-ico'+ lastIco +'"'+ icon +'></span>';
											html += 			'<i class="l-tree-text">'+ data[i].name +'</i>';
											html += 		'</a>';
											html += 	'</div>';
											html += 	sonWrap;
											html += '</li>';
										}
									}
									return html;
								}
								
								return '';
							}
						
						target.html( '<ul class="l-tree">'+ tree(data, 0, 0) +'</ul>' );
					},
					
					/**
					* 数据处理
					*/
					handleData: function(){
						var data   = p.data,
							array  = [],
							format = function(data, pid){
								var pid = pid === undefined ? 0 : pid,
									arr = [],
									son = [],
									h   = 0;
								
								for(var i = 0; i<data.length; i++){
									if( Number(data[i].pid) === Number(pid) ){
										son = format(data, data[i].id);
										if( son.length ){
											data[i].children = son;
										}
										arr[h] = data[i]
										h++;
									}
								}
								
								return arr;
							}
							p.data = format(data);
					},
					
					/**
					* ajax方式获取数据
					*/
					ajaxGetData: function(callback){
						var ajax = p.ajax;
						
						$.ajax({
							type: ajax.type === undefined ? 'POST' : ajax.type,
							url: ajax.url,
							cache: false,
							dataType: "json",
							data: ajax.data,
							beforeSend: function(data){
								if( saogaUI.base.isFunction(ajax.beforeSend) ){
									ajax.beforeSend();
								}
							},
							success: function(data){
								if( saogaUI.base.isFunction(ajax.success) ){
									ajax.success(data, _cache.selected);
								}
								if( saogaUI.base.isFunction(callback) ){
									callback(data);
								}
							},
							error: function(data){
								console.log(data);
								if( saogaUI.base.isFunction(ajax.error) ){
									ajax.error(data);
								}
							}
						});
					},
					
					/**
					* 事件函数
					*/
					eventFn: function(){
						var target   = p.target,
							time     = null,
							itemData = function(obj){
											return {
														id: obj.attr('data-id'),
														pid: obj.attr('data-pid'),
														name: obj.attr('title'),
														isParent: obj.parent('.l-tree-item').hasClass('l-tree-parentNode')
													};
										};

						target
                            .off('click', '.l-tree-node')
							.on('click', '.l-tree-node', function(e){
								var that = $(e.currentTarget),
									data = itemData(that);
									
								target
									.find('a')
									.removeClass('l-tree-selectedNode');
								that.addClass('l-tree-selectedNode');
								saogaUI.ui.onselectstart(that);
									
								if( saogaUI.base.isFunction(p.onClick) ){
									clearTimeout(time);
									time = setTimeout(function(){
										p.onClick(that, data);
									}, 100);
								}
								
                                //xxx: 未添加多选
                                _cache.selected = data;
								
								return false;
							})
                            .off('dblclick', '.l-tree-node')
							.on('dblclick', '.l-tree-node', function(e){
								var that      = $(e.currentTarget),
									data      = itemData(that),
									switchBtn = that.siblings('.l-tree-switch'),
									isParent  = data.isParent;
									
								if( isParent ){
									clearTimeout(time);
									switchBtn.trigger('click');
								}
								
								if( saogaUI.base.isFunction(p.dblclick) ){
									p.dblclick(that, data);
								}
                                
                                _cache.selected = data;
                                
								return false;
							})
                            .off('contextmenu', '.l-tree-node')
							.on('contextmenu', '.l-tree-node', function(e){
								if( saogaUI.base.isFunction(p.onRightClick) ){
									var that = $(e.currentTarget),
										data = itemData(that);
										
									p.onRightClick(that, data, e);
									
									return false;
								}
							})
                            .off('mouseover', '.l-tree-node')
							.on('mouseover', '.l-tree-node', function(e){
								if( saogaUI.base.isFunction(p.onMouseOver) ){
									var that = $(e.currentTarget),
										data = itemData(that);
										
									p.onMouseOver(that, data);
								}
							})
                            .off('mouseout', '.l-tree-node')
							.on('mouseout', '.l-tree-node', function(e){
								if( saogaUI.base.isFunction(p.onMouseOut) ){
									var that = $(e.currentTarget),
										data = itemData(that);
										
									p.onMouseOut(that, data);
								}
							})
                            .off('click', '.l-tree-switch')
							.on('click', '.l-tree-switch', function(e){
								var that = $(e.currentTarget),
									son  = that.parent('.l-tree-item').next('.l-tree-ul');
                                    
                                saogaUI.ui.onselectstart(that);
									
								if( that.hasClass('l-tree-open') ){
									that.addClass('l-tree-close')
										.removeClass('l-tree-open');
									son.addClass('fn-hide');
								}else{
									that.addClass('l-tree-open')
										.removeClass('l-tree-close');
									son.removeClass('fn-hide');
								}
								
								return false;
							})
                            .off('click', '.l-tree-checkbox')
							.on('click', '.l-tree-checkbox', function(e){
								var that    = $(e.currentTarget),
									level   = Number(that.attr('data-level')),
                                    isInit  = _cache.init,
									checkFn = function(obj, level, isCurrent){
													var isChecked      = obj.hasClass('l-tree-checkbox-checked'),
														isPartChecked  = obj.hasClass('l-tree-checkbox-checked-part'),
														checkNum       = null,
														partCheckNum   = null,
														parentWrap     = obj.parents('.l-tree-level-' + level ),
														parentsWrap    = obj.parents('.l-tree-level-' + (level-1) ),
														parentCheck    = parentsWrap.find('.l-tree-check-' + (level-1)),
														bother         = parentsWrap.find('.l-tree-check-' + level),
														botherNum      = bother.length,
														children       = parentWrap.find('.l-tree-check');
														
													/* 判断是否当前 */
													if( isCurrent ){
														
														if( isPartChecked  ){
															obj
																.addClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
																
															children
																.addClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
														}
														
														if( !isChecked ){
															obj.addClass('l-tree-checkbox-checked');
															children.addClass('l-tree-checkbox-checked');
														}else{
															if( !isInit ){
																obj.removeClass('l-tree-checkbox-checked');
																children.removeClass('l-tree-checkbox-checked');
															}
														}
														
														/* 获取已选数量 */
														checkNum = parentsWrap.find('.l-tree-check-' + level +'.l-tree-checkbox-checked').length;
														
														if( botherNum === checkNum ){
															parentCheck
																.addClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
														}else if( !checkNum ){
															parentCheck
																.removeClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
														}else{
															parentCheck
																.removeClass('l-tree-checkbox-checked')
																.addClass('l-tree-checkbox-checked-part');
														}
													}else{
														/* 获取已选数量 */
														checkNum = parentsWrap.find('.l-tree-check-' + level +'.l-tree-checkbox-checked').length;
														
														if( botherNum === checkNum ){
															parentCheck
																.addClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
														}else if( !checkNum && !isChecked && !isPartChecked ){
															parentCheck
																.removeClass('l-tree-checkbox-checked')
																.removeClass('l-tree-checkbox-checked-part');
															children.removeClass('l-tree-checkbox-checked');
														}else{
															parentCheck
																.removeClass('l-tree-checkbox-checked')
																.addClass('l-tree-checkbox-checked-part');
														}
													}

													level--;
													if( level > 1 ){
														checkFn(parentCheck, level, false);
													}
												}
								
								saogaUI.ui.onselectstart(that);
								
								checkFn(that, level, true);
							})
                            .off('click', '.l-tree-radio')
							.on('click', '.l-tree-radio', function(e){
								var that    = $(e.currentTarget),
									level   = Number(that.attr('data-level')),
									checkFn = function(obj){
													var isChecked   = obj.hasClass('l-tree-radio-checked'),
														parent      = obj.parents('.l-tree-level-' + level ),
														parents     = obj.parents('.l-tree-level-' + (level-1) ),
														parentCheck = parents.find('.l-tree-check[data-level="'+ (level-1) +'"]'),
														bother      = parents.find('.l-tree-check[data-level="'+ level +'"]'),
														botherNum   = bother.length,
														children    = parent.find('.l-tree-check');
													
													if( !isChecked ){
														bother.removeClass('l-tree-radio-checked');
														obj.addClass('l-tree-radio-checked');
														//children.addClass('l-tree-radio-checked');
													}else{
														obj.removeClass('l-tree-radio-checked');
														children.removeClass('l-tree-radio-checked');
													}
													if( botherNum === parents.find('.l-tree-check[data-level="'+ level +'"].l-tree-radio-checked').length ){
														parentCheck.addClass('l-tree-radio-checked');
													}else{
														//parentCheck.removeClass('l-tree-radio-checked');
													}
													if( level >= 1 ){
														level--
														checkFn(parents);
													}
												}
								
								saogaUI.ui.onselectstart(that);
								
								checkFn(that);
							});
					},
                    
                    /**
					* 初始化checks
					*/
                    initCheckFn: function(){

                        var checked = p.target.find('.l-tree-checkbox[data-checked="true"]'),
                            len     = checked.length,
                            i       = 0;
                        
                        for(; i<len; i++){
                           checked.eq(i).trigger('click');
                        }

                    },
					
					/**
					* 创建树对象
					*/
					run: function(){
						if( p.isSimple ){
							this.handleData();
						}
						this.createHtml();
						this.eventFn();
                        if( p.check ){
                            this.initCheckFn();
                        }
					},
					
					/**
					* 初始化
					*/
					init: function(o){
			
						for(var key in o){
							if( o.hasOwnProperty(key) && o[key] !== undefined ){
								p[key] = o[key];
							}
						}
						
						p.target = $(p.target);
						
						if( p.ajax ){
							c.ajaxGetData(function(data){
								p.data = data;
								c.run();
								if( saogaUI.base.isFunction(p.onLoad) ){
									p.onLoad(p.data, _cache.selected);
								}
							});
							return g;
						}
						
						c.run();
						if( p.data && saogaUI.base.isFunction(p.onLoad) ){
							p.onLoad(p.data, _cache.selected);
						}
						return g;
					}
				};
		
		/**
		* 刷新树
		*/
		g.refresh = function(o){
			for(var key in o){
				if( o.hasOwnProperty(key) && o[key] !== undefined && !o.target){
					p[key] = o[key];
				}
			}

			c.run();
			return g;
		};
        
		/**
		* 获取选中数据，不能获取初始化选中数据
		*/
        g.getSelected = function(){
            if( p.check ){
                var checkbox = p.target.find('.l-tree-checkbox'),
                    len      = checkbox.length,
                    i        = 0;

                _cache.selected = [];
                
                for(; i<len; i++){
                    var item = checkbox.eq(i)
                    if( item.hasClass('l-tree-checkbox-checked') || item.hasClass('l-tree-checkbox-checked-part') ){
                        var node = item.next('.l-tree-node'),
                            id   = node.attr('data-id'),
                            pid  = node.attr('data-pid'),
                            name = node.attr('data-name'),
                            obj  = {'pid':pid, 'id':id, 'name':name, 'checked':true}
                        _cache.selected.push(obj);
                    }
                }
            }
            return _cache.selected;
        };
		
		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new Tree(o);
	};
});
define('core/check_debug',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* saogaUI.ui.check 下拉框控件
	* @class saogaUI.ui.check
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 下拉框参数
    * @param {String} o.id 下拉框id
	* @return {Object} select对象
	*/
	
	var Check = function(o){
		
		var 
			/**
			* 当前对象
			*/
			g = this,
			
			/**
			* 默认配置
			*/
			p = {
					id           : 'l-check-'+(new Date()).valueOf(),
					target       : null,
					wrap         : null,   //target外框，一般不设置
					checkbox     : false,  //multiple时设置有效，与radio互斥
					radio        : false,  //multiple时设置有效，与checkbox互斥
					onLoad       : null
				},
			
			/**
			* 代码逻辑
			*/
			c = {

					/**
					* 创建 html
					*/
					createHtml: function(){
						var target  = p.target,
							len     = p.target.length,
							type    = len ? target[0].type : null,
							i       = 0;
						
						p.wrap = p.target.parent();
						
						/*遍历多个target*/						
						for(; i<len; i++){
							var checkItem      = target.eq(i),
								checkItemClass = checkItem[0].className,
								checkItemName  = checkItem.attr('name'),
								isChecked      = checkItem.attr('checked'),
								isDisabled     = checkItem.attr('disabled'),
								disabledClass  = isDisabled ? (' l-'+ type + '-disabled') :'',
								checkedClass   = isChecked ? (' l-'+ type + '-selected') :'';
								
							checkItem.next()
									 .addClass('l-check-label l-'+ type +'-label')
									 .end()
									 .wrap('<div class="l-check-wrap fn-left"></div>')
									 .after('<div class="l-check-item l-'+ type +' '+ checkItemClass + checkedClass + disabledClass +'" data-name="'+ checkItemName +'"></div>');

						}
						target.css({'width':0,'height':0})
						//target.hide();
					},

					
					/**
					* 事件处理
					*/
					checkFn: function(){
						var that    = this,
							wrap    = p.wrap
							browser = saogaUI.base.browser;
							
						saogaUI.ui.onselectstart(wrap.parent());
                        
						wrap
							.off('click','.l-check-wrap')
							.on('click','.l-check-wrap',function(e){
								if( browser.ie && Number(browser.ie) < 8 ){
									var self      = $(e.currentTarget)
										checkItem = self.find('input');
									checkItem.trigger('change');
								}
							})
							.on('change','input',function(e){
								var self       = $(e.currentTarget),
									checkItem  = self.next(),
									selfName   = self.attr('name'),
									selfType   = self[0].type;
									
								if( !selfName ){ return console.log(selfType+' name is not define!') }
								
								if( selfType === 'radio' ){
									var sibling    = wrap.find('.l-check-item'),
										siblingLen = sibling.length,
										i          = 0;
									for(; i<siblingLen; i++){
										if( sibling.eq(i).attr('data-name') === selfName ){
											sibling.eq(i).removeClass('l-radio-selected');
										}
									}
									checkItem.addClass('l-radio-selected');
								}else{
									if( checkItem.hasClass('l-checkbox-selected') ){
										checkItem.removeClass('l-checkbox-selected');
									}else{
										checkItem.addClass('l-checkbox-selected');
									}
								}
							})
					},
					
					/**
					* 运行check
					*/
					run: function(){
						var that = this;
							
						that.createHtml();
						that.checkFn();
						
					},
					
					/**
					* 初始化
					*/
					init: function(o){
			
						for(var key in o){
							if( o.hasOwnProperty(key) && o[key] !== undefined ){
								p[key] = o[key];
							}
						}

						p.target = $(p.target);

						c.run();

						return g;
					}//end init
				};
		
		/**
		* 刷新下拉框
		*/
		g.refresh = function(o){
			for(var key in o){
				if( o.hasOwnProperty(key) && o[key] !== undefined && !o.target){
					p[key] = o[key];
				}
			}

			c.init();
			return g;
		};
		
		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new Check(o);
	};
});
define('core/btnDropdown',['core/saogaUI'], function(saogaUI){

	var btnDropdown = function(options){
		
		var isShow = false,
			target = options.target,
			menu   = $(options.menu);
		
		$('body').on('click', target, function(e){
			var that = $(this),
				menu = $(options.menu);
			e.stopPropagation();
			saogaUI.ui.onselectstart( that.parent() );
			if( !isShow ){
				menu.addClass('fn-hide');
				that.next(options.menu).removeClass('fn-hide');
				isShow = true;
			}else{
				menu.addClass('fn-hide');
				isShow = false;
			}
		}).on('mouseout', target, function(){
			isShow = false;
		}).on('click', options.menu + ' li', function(e){
			$(options.menu).addClass('fn-hide');
		});
		
		$(window).on('click', function(){
			if( !isShow ){
				$(options.menu).addClass('fn-hide');
			}
		});
		
	};

	return btnDropdown;

});
define('core/btnSwitch',['core/saogaUI'], function(saogaUI){
	
	
		
	/**
	* TODO
	* saogaUI.ui.validator
	* @class saogaUI.ui.validator
	* @author norion.z
    * @blog http://zkeyword.com/
    * @param {Object} o 
    * @param {String} o.id 
	* @return {Object} select对象
	*/
	
	var BtnSwitch = function(o){
		
		var 
			/**
			* 默认配置
			*/
			p = {
				target: null,
				open: null,
				close: null
			},
			
			/**
			* 代码逻辑
			*/
			c = {
				init: function(o){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
							p[key] = o[key];
						}
					}

					var isFunction    = saogaUI.base.isFunction,
						onselectstart = saogaUI.ui.onselectstart;
						
					$('body')
						.off('click', p.target)
						.on('click', p.target, function(e){
							var that   = onselectstart( $(e.currentTarget) ),
								isOpen = that.hasClass('ui-btn-switch-open');

							if(isOpen){
								if( p.close ){
									if( p.close.ajax ){
										$.ajax({
											type: 'POST',
											url: p.close.ajax.url,
											data: p.close.ajax.data,
											async: false,
											success: function(html){
												if( isFunction(p.open.run) ){
													p.close.run();
												}
											}
										});
									}else{
										if( isFunction(p.open.run) ){
											p.close.run();
										}
									}
								}
								that.removeClass('ui-btn-switch-open')
									.addClass('ui-btn-switch-close')
									.find('em')
									.html('已关闭');
							}else{
								if( p.open ){
									if( p.open.ajax ){
										$.ajax({
											type: 'POST',
											url: p.open.ajax.url,
											data: p.open.ajax.data,
											async: false,
											success: function(html){
												if( isFunction(p.open.run) ){
													p.open.run();
												}
											}
										});
									}else{
										if( isFunction(p.open.run) ){
											p.open.run();
										}
									}
								}
								that.removeClass('ui-btn-switch-close')
									.addClass('ui-btn-switch-open')
									.find('em')
									.html('已开启');
							}
						});
				}
			};

		return c.init(o);
	};
	
	return function(o){
		if( !o ){
			return {};
		}
		return new BtnSwitch(o);
	};
});
define('app/saogaUI',['require','core/saogaUI','app/template','core/drag','core/dialog','core/pop','core/tip','core/tab','core/validator','core/selectArea','core/grid','core/select','core/calendar','core/tree_debug','core/select_debug','core/check_debug','core/btnDropdown','core/btnSwitch'],function(require){
	
	/**
	* 载入saogaUI
	*/
	var saogaUI             = require('core/saogaUI');
	saogaUI.template        = require('app/template');
	saogaUI.ui.drag         = require('core/drag');
	saogaUI.ui.dialog       = require('core/dialog');
	saogaUI.ui.pop          = require('core/pop');
	saogaUI.ui.tip          = require('core/tip');
	saogaUI.ui.tab          = require('core/tab');
	//saogaUI.ui.calendar     = require('core/calendar');
	saogaUI.ui.validator    = require('core/validator');
	saogaUI.ui.selectArea   = require('core/selectArea');
	saogaUI.ui.grid         = require('core/grid');
	//saogaUI.ui.dorpDownTree = require('core/dorpDownTree');
	saogaUI.ui.select       = require('core/select');
	saogaUI.ui.calendar     = require('core/calendar');
	
	saogaUI.ui.tree         = require('core/tree_debug');
	saogaUI.ui.select2      = require('core/select_debug');
	saogaUI.ui.check        = require('core/check_debug');
	
	saogaUI.ui.btnDropdown  = require('core/btnDropdown');
	saogaUI.ui.btnSwitch    = require('core/btnSwitch');
	
	return saogaUI;
	
});
define('app/common',['app/saogaUI'], function(saogaUI){
	
	/* 页面高度 */
	if( $('#lt-sl-right').length ){
		var headerHeight  = $('#lt-header').outerHeight(),
			footerHeight  = $('#lt-footer').outerHeight(),
			rightMain     = $('#lt-sl-right'),
			rightHeightFn = function(){
				var win         = $(window);
					winHeight   = win.height(),
					rightHeight = winHeight - headerHeight - footerHeight;
					
				rightMain.css({'minHeight':rightHeight});
				win.resize(function(){
					win         = $(window);
					winHeight   = win.height();
					rightHeight = winHeight - headerHeight - footerHeight;
					if( rightHeight > 500 ){
						rightMain.css({'minHeight':rightHeight});
					}
					
				});
			}
			
		rightHeightFn();
	}
	
	/*菜单*/
	$('#menuList .itemTitle').click(function(){
		var that            = $(this),
			parent          = that.parent(),
			arrow           = that.find('.lastIcon'),
			submenu         = that.next('.submenu'),
			siblings        = parent.siblings(),
			siblingsArrow   = siblings.find('.lastIcon'),
			siblingsSubmenu = siblings.find('.submenu');
			
		if( parent.hasClass('on') ){
			parent.removeClass('on');
			arrow
				.addClass('icon-angle-down')
				.removeClass('icon-angle-up');
			submenu.slideUp(300);
		}else{
			parent.addClass('on');
			arrow
				.addClass('icon-angle-up')
				.removeClass('icon-angle-down')
			submenu.slideDown(300);
		}
		siblings.removeClass('on');
		siblingsSubmenu.slideUp(300);
		siblingsArrow
			.addClass('icon-angle-down')
			.removeClass('icon-angle-up');
		saogaUI.ui.onselectstart(parent);
	});

		
	/* 底部 */
	setTimeout(function(){
		if( $('#footer-left').length && $('#footer-advisor').length ){
			$('#footer-left').html(saogaUI.template('footer-advisor', null));
		}
	}, 1000);
		
	/*点击显示下拉框*/
	var isShow = false;
	$('#user').on('click', ' .text',function(e){
		e.stopPropagation();
		var userOption = $("#userOption"),
			lastIcon   = $("#user .lastIcon");
			
		if( !isShow ){
			userOption.fadeIn(200);
			lastIcon
				.addClass('icon-angle-up')
				.removeClass('icon-angle-down');
			isShow = true;
		}else{
			userOption.fadeOut(200);
			lastIcon
				.addClass('icon-angle-down')
				.removeClass('icon-angle-up');
			isShow = false;
		}
	});
	$('#userOption').click(function(e){
		e.stopPropagation();
	});
	$(document).on('click',function(){
		if( isShow ){
	   		$("#userOption").fadeOut(200);
			$("#user .lastIcon")
				.addClass('icon-angle-down')
				.removeClass('icon-angle-up');
			isShow = false;
		}
	});
	
	saogaUI.ui.btnDropdown({
		target:'.ui-btn-dropdown-icon',
		menu:'.ui-btn-dropdown-menu'
	 });
	 
	 saogaUI.ui.btnDropdown({
		target:'.ui-btn',
		menu:'.ui-btn-dropdown-menu'
	 });
	
	
});
define('app/main',['require','app/jquery.validate','app/jquery.pagination','app/jquery.form','app/jquery.ztree.all-3.3.min-amd','app/jquery.insert','app/jquery.accordion','app/jquery.inputOnlyPositiveNum','app/saogaUI','app/common'],function(require){
	
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

