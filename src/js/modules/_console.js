'use strict';

if (window.console && console.warn && global.App.debug === true) {
	console.warn('debug mode is ON, all console.log messages will be shown!');
}

if (window.console && console.log && global.App.initialized === false) {
	console.log( 'This Website was built using the Eenvoud Foundetion theme. For more information, visit: http://www.eenvoudmedia.nl'); 
}

// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log && global.App.debug === true)) {
	(function() {
		var noop = function() {};
		var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
		var length = methods.length;
		var console = window.console = {};
		while (length--) {
			console[methods[length]] = noop;
		}
	}());
}
