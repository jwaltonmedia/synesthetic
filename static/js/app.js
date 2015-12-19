var namespace = '/test';
var connectUrl = 'http://' + document.domain + ':' + location.port + namespace;

var socket = io.connect(connectUrl);

function getRgbFromInt(integer, n) {
  var str = integer.toString();
  var rgb = [255, 255, 255]; //pure white

  for (var i = 0, len = str.length; i < len; i += n) {
    rgb[i] = Number(str.substr(i, n));
  }

  return rgb;
};

socket.on('light', function (msg) {
  var value = msg.data;
  var newRgb = getRgbFromInt(value, 3);
  if (newRgb.length > 3) {
    console.log('BLACK', value);
  } else {
    console.log(newRgb, value);
  }
});

socket.on('connect', function (msg) {
  socket.emit('event', {data: 'I\'m connected!'});
});
