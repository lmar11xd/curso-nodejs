import express from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json())

  app.use(corsMiddleware())

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, World!'
    })
  })

  app.use('/movies', createMovieRouter({ movieModel: movieModel }))

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}
