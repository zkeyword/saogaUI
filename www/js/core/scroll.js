(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.scroll = factory();
	}
}(this, function (){
	
	'use strict';
	
	var Scroll = function(options){
		
		var bMove          = false,
			//nSpeed         = options.speed,
			oDoc           = document,
			oScrollWrap    = oDoc.getElementById(options.scrollWrap),
			oScrollBtnWrap = (function(){
								var btnWrap = oDoc.createElement('div'),
									btn     = oDoc.createElement('div');
									
								oScrollWrap.className = 'l-scroll-wrap ' + oScrollWrap.className;
								btnWrap.className     = 'l-scroll-btnWrap';
								btn.className         = 'l-scroll-btn';
								
								btnWrap.appendChild(btn);
								oScrollWrap.appendChild(btnWrap);
								
								return oScrollWrap.lastChild;
							})(),
			oScrollBtn     = oScrollBtnWrap.lastChild,
			oScrollContent = oScrollBtnWrap.previousElementSibling ? oScrollBtnWrap.previousElementSibling : oScrollBtnWrap.previousSibling;
			nWrapHeight	   = oScrollWrap.offsetHeight - 2, //border的高度
			nWrapWidth	   = oScrollWrap.offsetWidth,
			nBtnHeight     = oScrollBtn.offsetHeight,
			nBtnDiff       = nWrapHeight - nBtnHeight,
			nContentHeight = oScrollContent.offsetHeight,
			nContentDiff   = nContentHeight - nWrapHeight,
			fScrll         = function(y){
								oScrollBtn.style.top = y + 'px';
								oScrollContent.style.marginTop = - (y/nBtnDiff)*nContentDiff +'px';
							},
			fMousePosition = function(e){
								var e = e || window.event,
									x = e.pageX || e.clientX + (oDoc.documentElement.scrollLeft || oDoc.body.scrollLeft),
									y = e.pageY || e.clientY + (oDoc.documentElement.scrollTop || oDoc.body.scrollTop);   //具有 DTD 时用 document.documentElement.scrollTop 代替 document.body.scrollTop
								
								return{
									positionX : x,
									positionY : y
								}
							},
			fOffset        = function( node ) {
								var nTop = 0;
								var nLeft = 0;
							    //var curtopscroll = 0;
							    if (node.offsetParent) {
							        do {
							        	nTop += node.offsetTop;
							        	nLeft += node.offsetLeft;
							            //curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
							        } while (node = node.offsetParent);
							    }
						        return {
						        	top: nTop,
						        	left: nLeft
					        	}
							},
			fMove          = function(e){
								var y = fMousePosition(e).positionY - fOffset(oScrollBtnWrap).top - nBtnHeight/2;

								fScrll(y>=nBtnDiff ? nBtnDiff : y<=1 ? 0 : y);
							},
			fWheel         = function(e){
								e = e || window.event;
								var wheelDelta = e.wheelDelta || e.detail,
									nDistance  = nBtnDiff*0.1,  //滚动基数
									nDistances = oScrollBtn.offsetTop;
									
								document.all ? e.returnValue = false : e.preventDefault();
								document.onselectstart = function(){return false;};

								if( wheelDelta == -120 || wheelDelta == 3 ){
									nDistances = nDistances + nDistance;
									nDistances = nDistances >= nBtnDiff ? nBtnDiff : nDistances;
								}else if( wheelDelta == 120 || wheelDelta == -3 ){
									nDistances = nDistances - nDistance;
									nDistances = nDistances <= 1 ? 0 : nDistances
								}
								
								fScrll( nDistances );
								
								return false;
							};
		
		oScrollBtnWrap.style.height = nWrapHeight + 'px';
		oScrollContent.className = 'l-scroll-contentWrap ' + oScrollContent.className;
		oScrollContent.style.width = (nWrapWidth - 15) + 'px';  //XXX: 短暂的滚动bug
		
		if(nWrapHeight > nContentHeight){
			oScrollBtnWrap.style.display = 'none';
			return;
		}

		oScrollBtnWrap.onclick = function(e){
			fMove(e);
		}
		
		oScrollBtn.onmousedown = function(e){
			bMove = true;
			e = e || window.event;
			
			document.all ? e.returnValue = false : e.preventDefault();
			document.onselectstart = function(){return false;};
		}
		
		oDoc.onmouseup = function(){
			bMove = false;
		}

		oDoc.onmousemove = function(e){
			if(bMove) fMove(e);
		}
		
		document.onmousewheel === undefined ? oScrollWrap.addEventListener('DOMMouseScroll', fWheel, true) : oScrollWrap.onmousewheel = fWheel;

	};

	return function(o){
		return o ? new Scroll(o) : {};
	};
	
}));