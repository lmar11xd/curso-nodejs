import crypto from 'node:crypto'
import movies from '../movies.json' with { type: 'json' }

export class MovieModel {
  static async getAll ({ genre}) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(m => m.id === id)

    return movie
  }

  static async create ({ movieData }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...movieData
    }

    movies.push(newMovie)

    return newMovie
  }

  static async update ({ id, movieData }) {
    const movieIndex = movies.findIndex(m => m.id === id)

    if (movieIndex === -1) return null

    const updatedMovie = {
      ...movies[movieIndex],
      ...movieData
    }

    movies[movieIndex] = updatedMovie

    return updatedMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(m => m.id === id)

    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)

    return true
  }
}