const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const users = {}

app.use(express.static(__dirname))
server.listen(3000, ()=>{
    console.log('Server initiated at http://localhost:3000');
})

io.on('connection', socket =>{
    console.log('New user connected');
    if (!users.hasOwnProperty('circle')) {
        users["circle"] = socket.id
        socket.emit('registerUser', "circle")
    }
    else if(!users.hasOwnProperty('x')){
        users["x"] = socket.id
        socket.emit('registerUser', "x")
    }

    socket.on('update', (data)=>{
        console.log(data);
        socket.emit('update', data)
        socket.broadcast.emit('update', data)
    })

    socket.on('updateTurn', (data) =>{
        socket.emit('updateTurn', data)
        socket.broadcast.emit('updateTurn', data)
    })
})