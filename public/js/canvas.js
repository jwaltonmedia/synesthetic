define([
    'jquery'
], function($) {

    var context = null,
        centerX = 0,
        centerY = 0,
        radius = 0;

    var Canvas = {
        element: null,
        ctx: null,
        centerX: 0,
        centerY: 0,
        clearAll: function() {
            if (!context) return;
            context.clearRect(0, 0, this.element.width, this.element.height);
        },
        drawCircle: function(radius) {
            radius = radius || 0;
            context.save();
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.closePath();
            context.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
            context.fill();
            context.restore();
        },
        /*
         * VIS1 - makes a ring of circles; radius is effected by audio volume
         * @param {Array} frequency - a typed arra (Uint8Array)
         * @param {Number} volume
         */

        vis1: function(frequency, volume) {
            var me = this;
            context.clearRect(0, 0, this.element.width, this.element.height);

            // var arrLength = frequency.length;

            //large circle radius
            var lg_radius = volume;

            //large circle circumference
            var lg_circ = (Math.PI * 2) * lg_radius;

            //small circle diameter - based on volume as well
            var sm_circ_diameter = volume;

            //small circle radius
            var sm_circ_radius = sm_circ_diameter / 2;

            var num_of_circ = Math.round(lg_circ / sm_circ_diameter);

            //if, for some reason, the radius is NaN, return
            if (isNaN(sm_circ_radius)) return;

            //create the circles
            for (var i = 0; i < (num_of_circ * sm_circ_radius); i += (sm_circ_diameter / num_of_circ)) {
                context.beginPath();
                var angle = i * 2 * Math.PI / volume;
                var x = centerX + Math.cos(angle) * volume;
                var y = centerY + Math.sin(angle) * volume;
                context.arc(x, y, sm_circ_radius, 0, 360, false);
                context.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
                context.fill();
            }
        },

        setup: function(element, opt) {
            opt = opt || {};
            this.element = element;
            context = this.element.getContext('2d');
            this.element.height = opt.height || document.body.clientHeight;
            this.element.width = opt.width || document.body.clientWidth;
            centerY = this.element.height / 2;
            centerX = this.element.width / 2;
        }
    };

    return Canvas;
});
