'use strict';

var $ = window.jQuery;
var Numbers = function(options) {

    this.defaults = {
        debug:          false,
        initialized:    false
    };

    this.numbers = {
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

    this.$numbers;
    this.availableWidth;
    this.availableHeight;

    return this;
};


Numbers.prototype = {

    init: function() {
        var self = this;
        self.initialized = true;

        self.generateNumbers();

        self.availableWidth = $('.main-content').width();
        self.availableHeight = $('.main-content').height();

        return self;

    },

    start: function() {
        var self = this;

        self.init();
        var $numbers = $(".number");

        var animateNumbers = function(ndx, el) {
            var $el = $(this);
            var interval = (Math.random() * 7000) + 777;
            var blink = function() {
                $el.fadeOut(interval, function() {
                    $el.html(self.generateSingleNumber());
                    self.positionNumber($el);
                    $el.fadeIn(interval);
                });
            };
            window.setInterval(blink, interval);
        }

        $numbers.each(animateNumbers);
        $(".numbers-wrapper").fadeTo(1000, 0.13);
    },

    generateSingleNumber: function() {
        var num = ((Math.random() * 200) - 100).toFixed(2);
        return (num < 0 ? '' : '+')+num;
    },

    getNumberColor: function(num) {
        return  (num > 0 ? 'green' : 'red');
    },

    generateNumberDOM: function(numberType) {
        var self = this;

        var rand = self.generateSingleNumber();
        $('.numbers-wrapper').append("<div class='number "+numberType+" "+self.getNumberColor(rand)+"'>"+rand+"</div>")
    },

    generateNumbers: function() {

        var self = this;
        for(var type in self.numbers) {
            if(self.numbers.hasOwnProperty(type)) {
                for(var i = 0; i < self.numbers[type].total; i++) {
                    $('.numbers-wrapper').append(self.generateNumberDOM('number-'+type));
                }
            }
        }
    },

    positionNumber: function($el) {
        var self = this;
        var xPos = Math.random() * self.availableWidth,
            yPos = Math.random() * self.availableHeight;

        $el.css({'top': yPos+'px', 'left': xPos+'px'});
    },

};

module.exports = new Numbers();
