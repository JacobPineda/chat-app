const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.port || 3000
const publicDirPath = path.join(__dirname, '../src/public')

app.use(express.static(publicDirPath))

// app.get('/', (req,res) => {
//     res.sendFile(publicDirPath)
// })

// let count = 0
const mssg = 'Welcome!'

io.on('connection', (socket) => {
    console.log('new websocket connection')

    // socket.emit('countUpdated', count)
    // socket.on('increment', () => {
    //     count++
    //     //socket.emit('countUpdated',count)
    //     io.emit('countUpdated',count)
    // })

    socket.emit('newUser',mssg)
    socket.broadcast.emit('newUser', 'A new user has joined!')

    socket.on('sendMessage', (message) => {
        io.emit('showMessage', message)
    })

    socket.on('disconnect', () => {
        io.emit('newUser','A user has left')
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})