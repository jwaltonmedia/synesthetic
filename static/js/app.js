var namespace = '/test';
var connectUrl = 'http://' + document.domain + ':' + location.port + namespace;

var socket = io.connect(connectUrl);

var bodyEl = document.getElementsByTagName("body")[0];
var valueEl = document.getElementById('value');

function getRgbFromInt(i) {
  var vals = {
    r: (i & 0xff0000) >> 16,
    g: (i & 0x00ff00) >> 8,
    b: (i & 0x0000ff)
  };

  return "rgba(" + vals.r + "," + vals.g + "," + vals.b + ", 1)";
};

socket.on('light', function (msg) {
  var value = msg.data;
  var newRgb = getRgbFromInt(value, 3);
  bodyEl.setAttribute('style', 'background:' + newRgb);
  valueEl.innerHTML = value;
});

socket.on('connect', function (msg) {
  socket.emit('event', {data: 'I\'m connected!'});
});
