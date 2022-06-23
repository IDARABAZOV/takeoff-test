import {IncomingMessage, ServerResponse} from "http";

const http = require('http')

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.write("hello world")
    res.end()
})

server.listen(3001)