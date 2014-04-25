define([
    'jquery',
    'canvas'
], function($, Canvas) {

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback, element) {
                window.setTimeout(callback, 1000 / 60);
        };
    })();

    window.AudioContext = (function() {
        return window.webkitAudioContext ||
            window.AudioContext ||
            window.mozAudioContext;
    })();

    var source,
        analizer,
        processor,
        permission = false,
        audioStream,
        audioContext = new AudioContext();

    Canvas.setup($('#viz')[0]);

    function setupAudio(stream) {
        // create the media stream from the audio input source (microphone)
        source = audioContext.createMediaStreamSource(stream);
        analyzer = audioContext.createAnalyser();
        processor = audioContext.createScriptProcessor(512, 1, 1); // 512 - number of samples to collect before analyzing
        processor.onaudioprocess = function() {

            var frequencyArray = new Uint8Array(analyzer.frequencyBinCount);
            analyzer.getByteFrequencyData(frequencyArray);
            // animate using the data

            //Canvas.loop(frequencyArray);

            var total = 0;
            for (var i = 0; i < frequencyArray.length; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
                total += frequencyArray[i];
            }
            Canvas.clearAll();
            Canvas.drawCircle(total / (512 / 2));

        };

        // // Now connect the nodes together
        // // Do not connect source node to destination - to avoid feedback
        source.connect(analyzer);
        analyzer.connect(processor);
        processor.connect(audioContext.destination);
    }

    function audioStop() {
        if (processor) processor.onaudioprocess = null;
        if (source) source.disconnect();
    }

    function onError(e) {
        console.log('ERROR', err);
    }

    function getMediaPermission() {
        if (permission) {
            audioStop();
            setupAudio(audioStream);
        } else {
            try {
                navigator.getUserMedia({
                    video: false,
                    audio: true
                }, function(stream) {
                    audioStream = stream;
                    permission = true;
                    setupAudio(audioStream);
                }, function() {
                    permission = false;
                    onError();
                });
            } catch (err) {
                alert('getUserMedia threw exception :' + err);
            }
        }
        return permission;
    }

    function onclick_listener(e) {
        e.preventDefault();
        var target = $(e.currentTarget);
        if (target.hasClass('on')) {
            target.text('start');
            target.removeClass('on');
            audioStop();
        } else {
            target.addClass('on');
            getMediaPermission();
            target.text('stop');
        }
    }


    var App = {
        init: function() {
            var listenTrigger = $('a.listener');
            listenTrigger.on('click', onclick_listener);
        }
    };

    return App;
});
