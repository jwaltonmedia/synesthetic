import flask
from bin.readpin import getReading

app = flask.Flask(__name__)

@app.route("/")
def hello():
    reading = str(getReading())
    return flask.render_template('index.html', reading=reading)

@app.route("/synesthetic")
def synesthetic():
    return "I hear no evil therefore I see no evil."

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
