;(function() {
  var mediaSource = new MediaSource()
  var buffer
  var queue = []
  var socket = io()
  var video = document.getElementById('player')
  var source = document.getElementById('source')

  console.log('client connected', socket)

  source.src = URL.createObjectURL(mediaSource)
  // video.src = URL.createObjectURL(mediaSource)

  video.play()

  mediaSource.addEventListener(
    'sourceopen',
    function(e) {
      buffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis, vp8"')

      buffer.addEventListener('updatestart', function(e) {
        console.log('updatestart: ' + mediaSource.readyState)
      })

      buffer.addEventListener('updateend', function(e) {
        console.log('updateend: ' + mediaSource.readyState)
      })

      buffer.addEventListener('error', function(e) {
        console.log('error: ' + mediaSource.readyState)
      })

      buffer.addEventListener('abort', function(e) {
        console.log('abort: ' + mediaSource.readyState)
      })

      buffer.addEventListener('update', function() {
        // Note: Have tried 'updateend'
        if (queue.length > 0 && !buffer.updating) {
          buffer.appendBuffer(queue.shift())
        }
      })

      socket.on('liveStream', function(data) {
        if (buffer.updating || queue.length > 0) {
          queue.push(data)
        } else {
          buffer.appendBuffer(data)
        }
      })
    },
    false
  )

  mediaSource.addEventListener('sourceopen', function(e) {
    console.log('sourceopen: ' + mediaSource.readyState)
  })
  mediaSource.addEventListener('sourceended', function(e) {
    console.log('sourceended: ' + mediaSource.readyState)
  })
  mediaSource.addEventListener('sourceclose', function(e) {
    console.log('sourceclose: ' + mediaSource.readyState)
  })
  mediaSource.addEventListener('error', function(e) {
    console.log('error: ' + mediaSource.readyState)
  })
})()
