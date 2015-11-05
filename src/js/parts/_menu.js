'use strict';

var $ = window.jQuery;
var Menu = function() {

    this.defaults = {
        debug:          false,
        initialized:    false
    };

    this.toggles = undefined;

    return this;
};


Menu.prototype = {

    init: function() {
        var self = this;
        self.toggles = document.querySelectorAll(".cmn-toggle-switch");
        self.initialized = true;

        return self;
    },

    toggleHandler: function(toggle) {
        var self = this;

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
    },

    start: function() {
        var self = this;

        self.init();
        for (var i = self.toggles.length - 1; i >= 0; i--) {
            var toggle = self.toggles[i];
            self.toggleHandler(toggle);
        }
    }

};

module.exports = new Menu();
