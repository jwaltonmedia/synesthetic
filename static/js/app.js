var namespace = '/test';
var connectUrl = 'http://' + document.domain + ':' + location.port + namespace;

var socket = io.connect(connectUrl);

function getRgbFromInt(i) {
  var vals = {
    r: (i & 0xff0000) >> 16,
    g: (i & 0x00ff00) >> 8,
    b: (i & 0x0000ff)
  };

  return "rbg(" + vals.r + "," + vals.g + "," + vals.b + ")";
};

socket.on('light', function (msg) {
  var value = msg.data;
  var newRgb = getRgbFromInt(value, 3);
  document.getElementsByTagName("body")[0].style.backgroundColor = newRgb;
});

socket.on('connect', function (msg) {
  socket.emit('event', {data: 'I\'m connected!'});
});
