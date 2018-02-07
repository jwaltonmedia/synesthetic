;(function() {
  var mediaSource = new MediaSource()
  var buffer
  var queue = []
  var socket = io()
  var video = document.getElementById('videoPlayer')

  console.log('client connected', socket)

  video.src = window.URL.createObjectURL(mediaSource)
  mediaSource.addEventListener(
    'sourceopen',
    function(e) {
      video.play()

      buffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001E"')

      buffer.addEventListener('updatestart', function(e) {
        console.log('updatestart: ' + mediaSource.readyState)
      })
      buffer.addEventListener('update', function(e) {
        console.log('update: ' + mediaSource.readyState)
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

  socket.on('liveStream', function(data) {
    if (buffer.updating || queue.length > 0) {
      queue.push(e.data)
    } else {
      buffer.appendBuffer(e.data)
    }
  })

  // var mediaSource
  // var sourceBuffer
  // var bufferPool = []
  // var sourceBufferpool = []

  // function setupVideo() {
  //   window.MediaSource = window.MediaSource || window.WebKitMediaSource
  //   if (!!!window.MediaSource) {
  //     console.log('MediaSource API is not available')
  //   }
  //   mediaSource = new MediaSource()
  //   video.src = window.URL.createObjectURL(mediaSource)
  //   mediaSource.addEventListener(
  //     'sourceopen',
  //     function(e) {
  //       try {
  //         video.play()
  //         sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
  //       } catch (e) {
  //         return console.log('Exception calling addSourceBuffer for video', e)
  //       }

  //       sourceBuffer.addEventListener('error', function(e) {
  //         console.log('error: ' + e.target + mediaSource.readyState)
  //       })

  //       sourceBuffer.addEventListener('abort', function(e) {
  //         console.log('abort: ' + e.target + mediaSource.readyState)
  //       })

  //       sourceBuffer.addEventListener(
  //         'update',
  //         function() {
  //           if (sourceBufferpool.length > 0 && !sourceBuffer.updating) {
  //             try {
  //               sourceBuffer.appendBuffer(sourceBufferpool.shift())
  //               console.log('update: pooled buffer appended ' + sourceBufferpool.length + ' ' + mediaSource.readyState)
  //             } catch (e) {
  //               console.log('Exception calling appendBuffer for video ', e)
  //               return
  //             }
  //           }
  //         },
  //         false
  //       )
  //       startWSStreaming()
  //     },
  //     false
  //   )

  //   mediaSource.addEventListener('sourceended', function(e) {
  //     console.log('sourceended: ' + mediaSource.readyState)
  //   })
  //   mediaSource.addEventListener('sourceclose', function(e) {
  //     console.log('sourceclose: ' + mediaSource.readyState)
  //   })
  //   mediaSource.addEventListener('error', function(e) {
  //     console.log('error: ' + mediaSource.readyState)
  //   })
  // }

  // function startWSStreaming() {
  //   var reader = new FileReader()

  //   reader.onload = function(evt) {
  //     if (sourceBuffer.updating || sourceBufferpool.length > 0) {
  //       sourceBufferpool.push(new Uint8Array(evt.target.result))
  //       console.log('update: pooled buffer appended ' + sourceBufferpool.length + mediaSource.readyState)
  //     } else {
  //       sourceBuffer.appendBuffer(new Uint8Array(evt.target.result))
  //       console.log('update: direct buffer appended ' + sourceBufferpool.length + mediaSource.readyState)
  //     }
  //   }

  //
  // }

  // setupVideo()
})()
