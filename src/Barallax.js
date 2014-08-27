// Barallax by Saverio Caminiti
"use strict";

function Barallax($scroller) {
	// private
	var self = this; // to be used in callbacks where this refers to something else
	var $window = $(window);
	var isOnWindow = false, speedAdjust = 0;
	var vSlowBg = [], vBoxedBg = [];

	function _constructor() {
		if (!$scroller) $scroller = $window;
		else $scroller = $scroller.first(); // just one element, please
		isOnWindow = $scroller[0] == $window[0];
		if (!isOnWindow) speedAdjust = 1;
		
		$scroller.on({
			scroll: syncScrollHandler,
			mousewheel: syncScrollHandler
		});
		$window.resize(syncScrollHandler);
	}

	function syncScrollHandler() { // sync with browsers redraw
		window.requestAnimationFrame(scrollHandler);
	}
	
	function scrollHandler() {
		// Slow down effect

		var y = $scroller.scrollTop();
		// console.log("here y = "+y);
		for (var i = vSlowBg.length - 1; i >= 0; i--) {
			var o = vSlowBg[i];
			var $target = o.target;
			var f = 1 - (o.speed + speedAdjust);
			$target.css("background-position", o.hPosition+" "+(y*f)+"px");
		}

		// Boxed effect
		var sy, sh;
		if (isOnWindow) {
			sy = y;
			sh = $window[0].innerHeight;
		} else {
			sy = $scroller.offset().top;
			sh = $scroller[0].clientHeight;
		}
		// console.log("scroller y="+sy+" h="+sh);
		for (var i = vBoxedBg.length - 1; i >= 0; i--) {
			var o = vBoxedBg[i];
			var $targets = o.target;
			$targets.each(function (i) {
				var $target = $targets.eq(i);
			
				var ty = $target.offset().top,
					th = $target.outerHeight();
				// console.log("  target y="+ty+" h="+th);
				var min = sy, // sy-th,
					max = sy+sh-th; // sy+sh+th;
				// console.log("  min="+min+" max="+max);
				var p = 100* (ty-min) / (max-min);
				// console.log("  p="+p);
				$target.css("background-position", o.hPosition+" "+p+"%");
			});
		}

	}

	function addSlowBackground($target, hPosition, speed) {
		var o = {
			target: $target,
			speed: speed,
			hPosition: hPosition
		}
		vSlowBg.push(o);
		syncScrollHandler();
		return o;
	}

	function removeSlowBackground(o) {
		var i = $.inArray(o, vSlowBg);
		if (i >= 0) vSlowBg.splice(i, 1);
	}
	
	function addBoxedBackground($target, hPosition) {
		var o = {
			target: $target,
			hPosition: hPosition
		}
		vBoxedBg.push(o);
		syncScrollHandler();
		return o;
	}

	function removeBoxedBackground(o) {
		var i = $.inArray(o, vBoxedBg);
		if (i >= 0) vBoxedBg.splice(i, 1);
	}

	// public
	this.addSlowBackground = addSlowBackground;
	this.removeSlowBackground = removeSlowBackground;
	this.addBoxedBackground = addBoxedBackground;
	this.removeBoxedBackground = removeBoxedBackground;
	this.update = syncScrollHandler;

	// init
	_constructor();
}


// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function(){var e=0;var t=["ms","moz","webkit","o"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n){window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame)window.requestAnimationFrame=function(t,n){var r=(new Date).getTime();var i=Math.max(0,16-(r-e));var s=window.setTimeout(function(){t(r+i)},i);e=r+i;return s};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=function(e){clearTimeout(e)}})()
