const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const routes = require('./src/routes')

const port = process.env.PORT || 8080

const getCorsOrigin = require('./src/lib/getCorsOrigin')
const corsOptions = {
  origin: getCorsOrigin,
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }))

app.use('/api/factories', routes.factories)

io.on('connection', (socket) => {
  socket.on('factory updated', () => {
    socket.broadcast.emit('factory updated')
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
