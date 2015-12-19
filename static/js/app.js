var namespace = '/test';
var connectUrl = 'http://' + document.domain + ':' + location.port + namespace;

var socket = io.connect(connectUrl);

socket.on('response', function (msg) {
  console.log(msg);
});

socket.on('connect', function (msg) {
  socket.emit('event', {data: 'I\'m connected!'});
});
