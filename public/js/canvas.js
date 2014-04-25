define([
    'jquery'
], function($) {

    var context = null,
        centerX = 0,
        centerY = 0,
        radius = 0;

    // (function drawFrame() {
    //     window.requestAnimationFrame(drawFrame, canvas);
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    //     var dx = canvas_info.x - arrow.x;
    //     var dy = canvas_info.y - arrow.y;
    //     arrow.rotation = Math.atan2(dy, dx); //radians
    //     arrow.draw(context);
    // })();

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
        loop: function(arrayOfValues) {
            var me = this;
            this.clearAll();
            $.each(arrayOfValues, function(i, v) {
                me.drawCircle(v);
            });
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
