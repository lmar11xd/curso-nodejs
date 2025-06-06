const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`)

  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (req.url === '/imagen-super-bonita.png') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.end(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8//8/AwAI/wH+9Q4AAAAASUVORK5CYII=', 'base64'))
  } else if (req.url === '/about') {
    res.statusCode = 200
    res.end('<h1>Esta es la página de información</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>Página no encontrada</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Servidor escuchando en http://localhost:${server.address().port}`)
})

// Probar comando: curl http://localhost:3000
// Comando para refrescar sin reiniciar el servidor: node --watch ./clase-2/1.http.js
// Alternatica a --watch: npm i nodemon -D
