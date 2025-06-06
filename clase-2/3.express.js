const express = require('express')
const app = express()
const dittoJSON = require('./pokemon/ditto.json')

app.disable('x-powered-by') // Deshabilitar el encabezado X-Powered-By por seguridad

const PORT = process.env.PORT || 3000

// Forma Nativa: Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json())

// Forma Imperativa: Middleware para parsear JSON en el cuerpo de las solicitudes
/* app.use((req, res, next) => {
  console.log('Mi primer middleware en Express')

  // Middleware para registrar cada solicitud
  console.log(`${req.method} ${req.url}`)

  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // Solo llegan request POST con Content-Type application/json
  let body = ''

  // Acumular los datos del cuerpo de la solicitud
  req.on('data', chunk => {
    body += chunk.toString() // Convertir Buffer a string
  })

  req.on('end', () => {
    const data = JSON.parse(body) // Parsear el cuerpo JSON
    data.timestamp = Date.now() // Agregar un timestamp

    req.body = data // Asignar el cuerpo parseado a req.body
    next() // Llamar al siguiente middleware o ruta
  })

  next() // Llamar al siguiente middleware o ruta
}) */

app.get('/', (req, res) => {
  // Por defecto, Express envía una respuesta con el código de estado 200
  res.send('Hello World!')
})

app.get('/pokemon/ditto', (req, res) => {
  // Express maneja automáticamente el encabezado Content-Type si se usa un middleware adecuado
  res.json(dittoJSON) // Enviar JSON directamente
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body) // Enviar el cuerpo del POST como respuesta con código 201
})

// Ultima ruta para manejar cualquier solicitud que no coincida con las anteriores
app.use((req, res) => {
  // Manejar rutas no encontradas
  res.status(404).send('<h1>Página no encontrada</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
