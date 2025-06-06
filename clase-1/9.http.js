const http = require('node:http')
const { findAvailablePort } = require('./10.free-port.js')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.writeHead(200)
  res.end('Hola Mundo desde Node.js!\n')
})

// Configuramos el servidor con el puerto 0 para que el sistema elija un puerto libre
// Esto es útil para pruebas o cuando no nos importa el puerto específico
// No es recomendable para producción, donde deberíamos especificar un puerto fijo
/* server.listen(0, () => {
  console.log(`Servidor escuchando en http://localhost:${server.address().port}`)
}) */

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${server.address().port}`)
  })
})
