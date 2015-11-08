'use strict';

var $ = window.jQuery;
var Icons = function(options) {

    this.defaults = {
        debug:          false,
        initialized:    false
    };

    this.icons = {
        ga: {
            cssClass: 'fa fa-gears'
        },
        users: {
            cssClass: 'fa fa-user'
        },
        settings: {
            cssClass: 'fa fa-wrench'
        }
    };

    this.numIcons = 3;
    this.totalIcons;

    this.$icons;
    this.availableWidth;
    this.availableHeight;

    return this;
};


Icons.prototype = {

    init: function() {
        var self = this;

        self.totalIcons = self.numIcons * Object.keys(self.icons).length;

        self.availableWidth = $('.main-content').width();
        self.availableHeight = $('.main-content').height();

        console.log('w', self.availableWidth, 'h', self.availableHeight);

        self.generateIcons();
        self.$icons = $(".fa");
        self.initialized = true;

        return self;

    },

    start: function() {
        var self = this;

        self.init();

        var animateIcons = function(ndx, el) {
            var $el = $(this);
            var interval = (Math.random() * 7000) + 777;

            self.positionIcon(ndx, $el);
            var blink = function() {
                $el.fadeOut(interval, function() {
                    $el.fadeIn(interval);
                });
            };
            window.setInterval(blink, interval);
        }

        self.$icons.each(animateIcons);
        $(".icons-wrapper").fadeTo(3000, 0.77);
    },

    generateIconDOM: function(type) {
        var self = this;
        var iconClass = self.icons[type].cssClass;

        console.log(type, iconClass);
        $('.icons-wrapper').append("<span class='"+iconClass+"'></span>")
    },

    generateIcons: function() {

        var self = this;
        for(var i = 0; i < self.numIcons; i++) {
            for(var type in self.icons) {
                if(self.icons.hasOwnProperty(type)) {
                    self.generateIconDOM(type);
                }
            }
        }
    },

    positionIcon: function(ndx, $el) {
        var self = this;

        var radius = Math.min(self.availableWidth, self.availableHeight)/3.5,
            yPos = (self.availableHeight/2.0) + radius*Math.sin(2.0*Math.PI*ndx/self.totalIcons),
            xPos = (self.availableWidth/2.0) + radius*Math.cos(2.0*Math.PI*ndx/self.totalIcons);

        console.log('', ndx, $el);
        $el.css({'top': yPos+'px', 'left': xPos+'px'});
    },

};

module.exports = new Icons();
