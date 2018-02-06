const http = require('http')
const path = require('path')
const fs = require('fs')
const express = require('express')
const ejs = require('ejs')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const spawn = require('child_process').spawn
const { NODE_PORT } = process.env

app.set('view engine', 'ejs')
app.use('/', express.static(path.join(__dirname, 'stream')));
app.get('/', (req, res) => res.render('index'))

const args = ['-w', '320', '-h', '240', '-o', './stream/image.jpg', '-t', '999999999', '-tl', '100'];
const proc = spawn('raspistill', args);

io.on('connection', socket => {

  // TODO: support multiple sockets.

  console.log(`socket connected: ${socket.id}`)

  fs.watchFile('./stream/image_stream.jpg', (current, previous) => {
    socket.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
  })

  socket.on('disconnect', () => {
    console.log('socket disconnected')
    fs.unwatchFile('./stream/image_stream.jpg')
  })

})

server.listen(NODE_PORT, () => {
  console.log(`Application running on port: ${NODE_PORT}`)
})



