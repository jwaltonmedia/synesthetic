import cv2

print cv2.__version__
video = cv2.VideoCapture(0)


class VideoCamera(object):
    def __init__(self):
        # Using OpenCV to capture from device 0. If you have trouble capturing
        # from a webcam, comment the line below out and use a video file
        # instead.
        print('initing')
        # print(cv2.VideoCapture())

    def __del__(self):
        video.release()

    def get_frame(self):
        success, image = video.read()
        # We are using Motion JPEG, but OpenCV defaults to capture raw images,
        # so we must encode it into JPEG in order to correctly display the
        # # video stream.
        if (image != None):
            ret, jpeg = cv2.imencode('.jpg', image)
            return jpeg.tobytes()
        else:
            return ""
