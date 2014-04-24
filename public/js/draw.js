define([
    'jquery'
], function($) {

    var canvas = document.getElementById('viz'),
        context = canvas.getContext('2d'),
        centerX = 0,
        centerY = 0,
        radius = 0;

    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    var draw = {
        usingArrayOfValues: function(array) {

            $.each(array, function(i, num) {
                radius = num;
                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                context.closePath();
                context.fillStyle = '#e6e7e8';
                context.fill();
            });

        }
    };

    return draw;
});
