import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemes/movie.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })

    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params

    const movie = await MovieModel.getById({ id })
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.json(movie)
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
  
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const newMovie = await MovieModel.create(result.data)
  
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialMovie(req.body) 
  
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const updatedMovie = await MovieModel.update({ id, movieData: result.data })
  
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
  
    res.json(updatedMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const deleted = await MovieModel.delete({ id })
    if (!deleted) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.status(204).json({ message: 'Movie deleted' })
  }
}