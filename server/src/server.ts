const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'database/db.json'))
const middlewares = jsonServer.defaults()

server.db = router.db

server.use(auth)
server.use(middlewares)
server.use(router)

const PORT = 5000
server.listen(PORT, () => {
    console.log(`JSON Server is running on server: ${PORT}`)
})