/*global _:true*/
'use strict';

// Set debug to false to disable all console.logs
var App = global.App = {
    debug:          true,
    initialized:    false,
    resizers:       []
};

var $ = require('jquery');

// Turn of console.log for unsupportedbrowsers and when debug is set to false;
require('./modules/_console');

$( document ).ready(function() {

    console.log('Eenvoud Foundetion');
    //$('nav#main-nav a').smoothScroll({offset: -34});
    _.each(App.resizers, function(resizer) {
        resizer();
    });




    // Move to menu.js
    var toggles = document.querySelectorAll(".cmn-toggle-switch");
    function toggleHandler(toggle) {
        toggle.addEventListener( "click", function(e) {
            console.log('showing menu');
            e.preventDefault();
            if(this.classList.contains("active") === true) {
                this.classList.remove("active");
                $('#menu').stop().velocity('fadeOut',{duration: 200});
            } else {
                this.classList.add("active");
                $('#menu').stop().velocity('fadeIn',{duration: 200});
            }

        });
    }
    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    };




    // Move to datavisualization.js
    var generateSingleNumber = function() {
        return ((Math.random() * 200) - 100).toFixed(2);
    }

    var getNumberColor = function(num) {
        return  (num > 0 ? 'green' : 'red');
    }

    var generateNumberDOM = function(numberType) {
        var rand = generateSingleNumber();
        $('.numbers-wrapper').append("<div class='number "+numberType+" "+getNumberColor(rand)+"'>"+rand+"</div>")
    }

    var generateNumbers = function() {

        var numbers = {
            large: {
                total: 19
            },
            normal: {
                total: 39
            },
            small: {
                total: 77
            }
        };

        for(var type in numbers) {
            if(numbers.hasOwnProperty(type)) {
                console.log(type, numbers[type].total);
                for(var i = 0; i < numbers[type].total; i++) {
                    $('.numbers-wrapper').append(generateNumberDOM('number-'+type));
                }
            }
        }

        var $numbers = $(".number"),
            availableWidth = $('.main-content').width(),
            availableHeight = $('.main-content').height();

        var positionNumber = function($el) {
            var xPos = Math.random() * availableWidth,
                yPos = Math.random() * availableHeight;

            $el.css({'top': yPos+'px', 'left': xPos+'px'});
        };

        var animateNumbers = function(ndx, el) {
            var $el = $(this);
            var interval = (Math.random() * 7000) + 777;
            var blink = function() {
                console.log('el', $el);
                $el.fadeOut(interval, function() {
                    positionNumber($el);
                    $el.fadeIn(interval);
                });
            }
            window.setInterval(blink, interval);
        };

        $numbers.each(animateNumbers);
        $(".numbers-wrapper").fadeTo(1000, 0.13);
    }

    generateNumbers();
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
