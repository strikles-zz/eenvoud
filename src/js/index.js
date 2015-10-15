/*global _:true*/
'use strict';

// Set debug to false to disable all console.logs
var App = global.App = {
	debug: 			true,
	initialized: 	false,
	resizers: 		[]
};

var	$ = require('jquery');

// Turn of console.log for unsupportedbrowsers and when debug is set to false;
require('./modules/_console');


$( document ).ready(function() {
	console.log('Eenvoud Foundetion');
	//$('nav#main-nav a').smoothScroll({offset: -34});
	_.each(App.resizers, function(resizer) {
		resizer();
	});

	
});

$(window).load(function() {
	App.initialized = true;
	//console.log(App.initialized);
	
	_.each(App.resizers, function(resizer) {
		resizer();
	});

});

var resizeTimer;

$(window).resize(function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		_.each(App.resizers, function(resizer) {
			resizer();
		});
	},100);
});
