/*global _:true*/
'use strict';

// Set debug to false to disable all console.logs
var App = global.App = {
    debug:          true,
    initialized:    false,
    resizers:       [],
    menu: require('./parts/_menu'),
    dv: require('./pages/_datavisualization')
};

var $ = require('jquery');

// Turn of console.log for unsupportedbrowsers and when debug is set to false;
require('./modules/_console');

$( document ).ready(function() {
    console.log('Eenvoud Foundetion');
    App.menu.start();
    App.dv.start();
    _.each(App.resizers, function(resizer) {
        resizer();
    });
});

$(window).load(function() {
    App.initialized = true;
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
    }, 100);
});
