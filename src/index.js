const http = require('http')
const path = require('path')
const fs = require('fs')
const net = require('net')

const express = require('express')
const ejs = require('ejs')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const spawn = require('child_process').spawn
const NODE_PORT = 3333

const args = [
  'autovideosrc',
  'horizontal-speed=1',
  'is-live=true',
  '!',
  'videoconvert',
  '!',
  'vp8enc',
  'cpu-used=5',
  'deadline=1',
  'keyframe-max-dist=10',
  '!',
  'queue',
  'leaky=1',
  '!',
  'm.',
  'autoaudiosrc',
  '!',
  'audioconvert',
  '!',
  'vorbisenc',
  '!',
  'queue',
  'leaky=1',
  '!',
  'm.',
  'webmmux',
  'name=m',
  'streamable=true',
  '!',
  'queue',
  'leaky=1',
  '!',
  'tcpserversink',
  'host=127.0.0.1',
  'port=9001',
  'sync-method=2'
]
const gstreamer = spawn('gst-launch-1.0 -v -m', args, { stdio: 'inherit' })

gstreamer.on('exit', code => {
  if (code !== null) {
    console.log(`GStreamer error, exit code ${code}`)
  }
  process.exit()
})

app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))

app.get('/webm', (req, res) => {
  const date = new Date()

  res.writeHead(200, {
    Date: date.toUTCString(),
    Connection: 'close',
    'Cache-Control': 'private',
    'Content-Type': 'video/webm',
    Server: 'CustomStreamer/0.0.1'
  })

  const socket = net.connect(9001, () => {
    socket.on('close', error => {
      console.log(`socket closed`, error)
      res.end()
    })
    socket.on('data', data => {
      res.write(data)
    })
  })

  socket.on('error', error => {
    console.log(error)
  })
})

server.listen(NODE_PORT, () => {
  console.log(`Application running on port: ${NODE_PORT}`)
})
