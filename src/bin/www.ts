import app from '../app'
import dotenv from 'dotenv'
dotenv.config()

import http from 'http'

const onError = (error: {syscall: string; code: any}) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
    switch (error.code) {
        case 'EACCES':
            alert(`${bind} requires elevated privileges`)
            process.exit(1)

        case 'EADDRINUSE':
            alert(`${bind} is already in use`)
            process.exit(1)

        default:
            throw error
    }
}

const onListening = () => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    console.log(`Listening on ${bind}`)
}

const port = process.env.PORT || '3000'
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
