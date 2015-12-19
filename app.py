import flask
import time
from flask.ext.socketio import SocketIO, emit
from bin.readpin import getReading
from threading import Thread

app = flask.Flask(__name__)
app.config['SECRET_KEY'] = 's.y.n.e.s.t.h.e.t.i.c'
socketio = SocketIO(app)

def getLightValue():
    while True:
        time.sleep(10)
        socketio.emit('response', {'data': getReading()}, namespace='/test')

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
    socketio.run(app, host='0.0.0.0', port=80)
