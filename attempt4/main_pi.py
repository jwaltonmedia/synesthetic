#!/usr/bin/env python
#
# Project: Video Streaming with Flask
# Author: Log0 <im [dot] ckieric [at] gmail [dot] com>
# Date: 2014/12/21
# Website: http://www.chioka.in/
# Description:
# Modified to support streaming out with webcams, and not just raw JPEGs.
# Most of the code credits to Miguel Grinberg, except that I made a small tweak. Thanks!
# Credits: http://blog.miguelgrinberg.com/post/video-streaming-with-flask
#
# Usage:
# 1. Install Python dependencies: cv2, flask. (wish that pip install works like a charm)
# 2. Run "python main.py".
# 3. Navigate the browser to the local webpage.
from flask import Flask, render_template, Response
from picamera import PiCamera
import time
import cv2
import io

camera = PiCamera()
camera.resolution = (320, 240)
camera.framerate = 20
stream = io.BytesIO()

time.sleep(2)

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


def gen():
    for _ in camera.capture_continuous(stream, format="jpeg", use_video_port=True):

        stream.seek(0)

        yield stream.read()

        stream.seek(0)
        stream.truncate()


@app.route('/video_feed')
def video_feed():

    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
