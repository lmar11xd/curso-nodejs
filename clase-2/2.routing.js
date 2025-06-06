const http = require('node:http')

// CommonJS -> Modulos clásicos de Node.js
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Página no encontrada</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString() // Convertir Buffer a string
          })
          req.on('end', () => {
            const newPokemon = JSON.parse(body)
            newPokemon.timestamp = Date.now() // Agregar un timestamp al nuevo Pokémon
            console.log('Nuevo Pokémon recibido:', newPokemon)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify({ message: 'Pokémon creado exitosamente', data: newPokemon }))
          })
          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Página no encontrada</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:${server.address().port}`)
})
