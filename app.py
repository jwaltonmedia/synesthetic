async_mode = None

if async_mode is None:
    try:
        import eventlet
        async_mode = 'eventlet'
    except ImportError:
        pass

    if async_mode is None:
        try:
            from gevent import monkey
            async_mode = 'gevent'
        except ImportError:
            pass

    if async_mode is None:
        async_mode = 'threading'

    print('async_mode is ' + async_mode)

# monkey patching is necessary because this application uses a background
# thread
if async_mode == 'eventlet':
    import eventlet
    eventlet.monkey_patch()
elif async_mode == 'gevent':
    from gevent import monkey
    monkey.patch_all()

import flask
import time
from flask_socketio import SocketIO, emit
from bin.readpin import getReading
from threading import Thread

app = flask.Flask(__name__)
app.config['SECRET_KEY'] = 's.y.n.e.s.t.h.e.t.i.c'
socketio = SocketIO(app, async_mode=async_mode)
thread = None

def getLightValue():
    while True:
        time.sleep(1)
        socketio.emit('light', {'data': getReading()}, namespace='/test')

@app.route("/")
def hello():
    global thread
    if thread is None:
        thread = Thread(target=getLightValue)
        thread.daemon = True
        thread.start()
    return flask.render_template('index.html')

@socketio.on('connect', namespace='/test')
def test_connect():
    emit('response', {'data': 'Connected!'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected...')

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=80, debug=True)
