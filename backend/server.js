const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes/routes')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectUsers = {}
io.on('connection', socket => {
    const { user } = socket.handshake.query

    connectUsers[user] = socket.id
})

require('./assets/connect.js')
app.use((req, res, next) => {
    req.io = io
    req.connectUsers = connectUsers

    return next()
})
app.use(cors())
app.use(express.json())
app.use(router)

server.listen(port, () => console.log('Server up on port: ', port))
