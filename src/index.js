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
  'cpu-used=16',
  'deadline=1',
  'keyframe-max-dist=10',
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
const gstreamer = spawn('gst-launch-1.0', args, { stdio: 'inherit' })

gstreamer.on('exit', code => {
  if (code !== null) {
    console.log(`GStreamer error, exit code ${code}`)
  }
  process.exit()
})

app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))

let connections = 0
let streamStarted = false

io.on('connection', socket => {
  console.log('connection made to socket server')

  connections++

  socket.on('disconnect', () => {
    connections--
  })

  if (connections > 0 && !streamStarted) {
    const gs_socket = net.connect(9001, () => {
      streamStarted = true
      gs_socket.on('close', error => {
        console.log(`gs socket closed =>>>`, error)
        streamStarted = false
        // res.end()
      })
      gs_socket.on('data', data => {
        io.sockets.emit('liveStream', data)
      })
    })

    gs_socket.on('error', error => {
      console.log(`gs-error =>>>`, error)
    })
  }
})

// app.get('/webm', (req, res) => {
//   const date = new Date()

//   res.writeHead(200, {
//     Date: date.toUTCString(),
//     Connection: 'close',
//     'Cache-Control': 'private',
//     'Content-Type': 'video/webm',
//     Server: 'CustomStreamer/0.0.1'
//   })

// })

server.listen(NODE_PORT, () => {
  console.log(`Application running on port: ${NODE_PORT}`)
})
