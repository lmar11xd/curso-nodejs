import { validateMovie, validatePartialMovie } from '../schemes/movie.js'

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })

    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params

    const movie = await this.movieModel.getById({ id })
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.json(movie)
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const newMovie = await this.movieModel.create({ movie: result.data })
  
    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body) 
  
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const updatedMovie = await this.movieModel.update({ id, movie: result.data })
  
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
  
    res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const deleted = await this.movieModel.delete({ id })
    if (!deleted) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.status(204).json({ message: 'Movie deleted' })
  }
}