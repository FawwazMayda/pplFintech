const http = require('http')
const app = require('./app')
let port = 80
let server = http.createServer(app)

server.listen(port, ()=> console.log(`Listening at PORT ${port}`))