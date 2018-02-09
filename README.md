# `s.y.n.e.s.t.h.e.t.i.c.`

`I see what you say`

This repo documents a series of explorations centered around streaming live video from a raspberry pi to a web browser. The requirements of this exploration are the following:

1. Create a live stream of video taken from the Raspberry Pi Camera Module.
2. Display the live stream, with <100ms latency in a web-browser.
3. Process the live stream data server-side using machine vision techniques. (see: OpenCV, or similar).

## How we got there

### Attempt 1: Nodejs & Socket.io

1. http://thejackalofjavascript.com/rpi-live-streaming/

* latency was a problem - describe
* works. good not great.

### Attempt 2: Nodejs & GStreamer

1. https://delog.wordpress.com/2011/04/26/stream-live-webm-video-to-browser-using-node-js-and-gstreamer/

* dead-end

### Attempt 3: ffmpeg & jsmpeg

1. https://forum.level1techs.com/t/livestream-webcam-with-nodejs-from-raspberry-pi-how-websocket/105746/9
2. http://phoboslab.org/log/2013/09/html5-live-video-streaming-via-websockets
3. https://github.com/phoboslab/jsmpeg

jsmpeg:

1. npm install ws
1. node websocket-relay.js password 8081 8082
1. in another window `http-server` (make sure it's installed globally - npm install -g http-server)
1. run the following command in a third window

```
ffmpeg -f video4linux2 -framerate 20 -video_size 320x240 -i /dev/video0 -f mpegts -vcodec mpeg1video -s 320x240 -bf 0 http://localhost:8081/password
```

if the command fails:

1. make an alias for ffmpeg - `alias ffmpeg=avconv`
2. change the framerate in the ffmpeg command from 20 > 24 or from 24 > 20.

* works. <100ms latency

### Attempt 4: Python & OpenCV

1. http://www.chioka.in/python-live-video-streaming-example/
2. https://blog.miguelgrinberg.com/post/video-streaming-with-flask
