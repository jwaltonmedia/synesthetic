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

        vis1: function(frequency, volume, timeDomain) {
            var me = this,
                pos = 0,
                fl = frequency.length,
                inc = this.element.width / fl,
                color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")",
                i, j;
            context.clearRect(0, 0, this.element.width, this.element.height);

            // var arrLength = frequency.length;
            //TODO: make use of Frequency data in visualization

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
            for (i = 0; i < (num_of_circ * sm_circ_radius); i += (sm_circ_diameter / num_of_circ)) {
                context.beginPath();
                var angle = i * 2 * Math.PI / volume;
                var x = centerX + Math.cos(angle) * volume;
                var y = centerY + Math.sin(angle) * volume;
                context.arc(x, y, sm_circ_radius, 0, 360, false);
                context.fillStyle = color;
                context.globalAlpha = 0.3;
                context.fill();
            }

            //create the frequency
            for (i = 0, j = fl; i < j; i++) {
                var freq = frequency[i];
                context.beginPath();
                context.rect(pos, centerY - (freq / 2), inc, freq);
                context.globalAlpha = 1;
                context.fillStyle = color;
                context.fill();
                pos += inc;
            }

            //create the waveform
            for (i = 0, j = fl; i < j; i++) {
                var td = timeDomain[i];
                var percent = td / 256;
                var height = this.element.height * percent;
                var offset = this.element.height - height - 1;
                var barWidth = this.element.width / fl;
                context.fillStyle = 'black';
                context.fillRect(i * barWidth, offset, 1, 1);
            }
        },

        /*
         * VIS2 - takes the output buffer from an audio signal and draws a sinewave
         * @param {Array} buffer - output buffer from audio analyzer
         * @param {Array} freq - frequency
         * @param {Array} vol - volume of audio signal
         */

        vis2: function(buffer, vol, audioContext) {
            if (!vol) return;
            var channel = 0;
            var freq = 440;
            var numOfChannels = buffer.numberOfChannels;
            for (; channel < numOfChannels; channel++) {
                var data = buffer.getChannelData(channel);
                var bufferLength = buffer.length;
                var inc = this.element.width / data.length;
                var positionX = 0;
                for (var sample = 0; sample < bufferLength; sample++) {

                    // The time at which the sample will play
                    var sampleTime = audioContext.currentTime + buffer.duration * sample / bufferLength;

                    // Set the data in the output buffer for each sample
                    data[sample] = vol * Math.sin(sampleTime * freq * Math.PI * 2);
                }
                for (var i = 0, j = data.length; i < j; i++) {
                    var d = data[i];
                    context.fillRect(positionX, centerY + d, inc, inc);
                    positionX += inc;
                }
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
