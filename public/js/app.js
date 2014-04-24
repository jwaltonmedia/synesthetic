define([
    'jquery',
    'draw'
], function($, Draw) {

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
        audioContext = new AudioContext();

    function setupAudio(stream) {

        // create the media stream from the audio input source (microphone)
        source = audioContext.createMediaStreamSource(stream);
        analyzer = audioContext.createAnalyser();
        processor = audioContext.createScriptProcessor(1024, 1, 1); // 1024 - number of samples to collect before analyzing
        processor.onaudioprocess = function() {

            var frequencyArray = new Uint8Array(analyzer.frequencyBinCount);
            analyzer.getByteFrequencyData(frequencyArray);
            // animate using the data
            requestAnimationFrame(function() {
                Draw.usingArrayOfValues(frequencyArray);
            });
        };

        // // Now connect the nodes together
        // // Do not connect source node to destination - to avoid feedback
        source.connect(analyzer);
        analyzer.connect(processor);
        processor.connect(audioContext.destination);
    }

    function onError(e) {
        console.log('ERROR', err);
    }

    function getMediaPermission() {
        try {
            navigator.getUserMedia({
                video: false,
                audio: true
            }, setupAudio, onError);
        } catch (err) {
            alert('getUserMedia threw exception :' + err);
        }
    }

    function onclick_listener(e) {
        e.preventDefault();
        var target = $(e.currentTarget);
        if (target.hasClass('on')) {
            target.text('start');
            target.removeClass('on');
            if (processor) processor.onaudioprocess = null;
            if (source) source.disconnect();
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
