;(function() {
  var video = document.getElementById('videoPlayer')
  var mediaSource
  var sourceBuffer
  var bufferPool = []
  var sourceBufferpool = []

  function setupVideo() {
    window.MediaSource = window.MediaSource || window.WebKitMediaSource
    if (!!!window.MediaSource) {
      console.log('MediaSource API is not available')
    }
    mediaSource = new MediaSource()
    video.src = window.URL.createObjectURL(mediaSource)
    mediaSource.addEventListener(
      'sourceopen',
      function(e) {
        try {
          sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
        } catch (e) {
          return console.log('Exception calling addSourceBuffer for video', e)
        }

        sourceBuffer.addEventListener('error', function(e) {
          console.log('error: ' + e.target + mediaSource.readyState)
        })

        sourceBuffer.addEventListener('abort', function(e) {
          console.log('abort: ' + e.target + mediaSource.readyState)
        })

        sourceBuffer.addEventListener(
          'update',
          function() {
            if (sourceBufferpool.length > 0 && !sourceBuffer.updating) {
              try {
                sourceBuffer.appendBuffer(sourceBufferpool)
                console.log('update: pooled buffer appended ' + sourceBufferpool.length + ' ' + mediaSource.readyState)
              } catch (e) {
                console.log('Exception calling appendBuffer for video ', e)
                return
              }
            }
          },
          false
        )

        startWSStreaming()
      },
      false
    )

    mediaSource.addEventListener('sourceended', function(e) {
      console.log('sourceended: ' + mediaSource.readyState)
    })
    mediaSource.addEventListener('sourceclose', function(e) {
      console.log('sourceclose: ' + mediaSource.readyState)
    })
    mediaSource.addEventListener('error', function(e) {
      console.log('error: ' + mediaSource.readyState)
    })
  }

  function startWSStreaming() {
    var reader = new FileReader()

    reader.onload = function(evt) {
      if (sourceBuffer.updating || sourceBufferpool.length > 0) {
        sourceBufferpool.push(new Uint8Array(evt.target.result))
        console.log('update: pooled buffer appended ' + sourceBufferpool.length + mediaSource.readyState)
      } else {
        sourceBuffer.appendBuffer(new Uint8Array(evt.target.result))
        console.log('update: direct buffer appended ' + sourceBufferpool.length + mediaSource.readyState)
      }
    }

    reader.onloadend = function(evt) {
      if (bufferPool.length > 0) {
        var chunk = new Blob([bufferPool.shift()], { type: 'video/webm' })
        evt.target.readAsArrayBuffer(chunk)
        console.log('Processed buffer pool: current size ' + bufferPool.length)
      }
    }

    var socket = io()
    console.log('client connected')

    socket.on('liveStream', function(data) {
      if (reader.readyState == 1 || bufferPool.length > 0) {
        bufferPool.push(data)
        console.log('Received buffer pooled: current size ' + bufferPool.length)
      } else {
        reader.readAsArrayBuffer(new Blob([data], { type: 'video/webm' }))
        console.log('First buffer processed')
      }
    })
  }

  setupVideo()
})()
