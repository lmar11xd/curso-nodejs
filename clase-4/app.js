import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json') // Import movies data from JSON file

const app = express()
app.disable('x-powered-by')
app.use(express.json())

//app.use(corsMiddleware([ 'http://localhost:8080', 'https://movies-app.com' ]))
app.use(corsMiddleware())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!'
  })
})

app.use('/movies', moviesRouter) // Use the movies router for all /movies routes

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
