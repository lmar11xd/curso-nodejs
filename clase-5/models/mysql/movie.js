import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'db_nodejs',
  port: 3306
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const genreName = genre.toLowerCase();
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?', [genreName]
      );

      if (genres.length === 0) return [];
      
      const [{ id }] = genres;
      const [movieIds] = await connection.query(
        'SELECT movie_id FROM movie_genres WHERE genre_id = ?', [id]
      );

      if (movieIds.length === 0) return [];
      const ids = movieIds.map(row => row.movie_id);
      const placeholders = ids.map(() => '?').join(',');
      const [result] = await connection.query(
        `SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie WHERE id IN (${placeholders})`, ids
      );

      console.log(`Movies for genre<${genre}>:`, result);
      return result;
    }

    const [result] = await connection.query(
      'SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie'
    );

    console.log('getAll result:', result);
    return result;
  }

  static async getById ({ id }) {
    const [result] = await connection.query(
      'SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)', [id]
    );

    if (result.length === 0) return null;

    console.log(`getById result for id<${id}>:`, result[0]);
    return result[0];
  }

  static async create ({ movie }) {
    const { title, year, director, duration, poster, rate } = movie;

    const [uuidResult] = await connection.query(
      'SELECT UUID() AS uuid'
    );
    const [{uuid}] = uuidResult;

    console.log(`Creating movie with UUID: ${uuid}`);

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?)`,
        [title, year, director, duration, poster, rate]
      );
    } catch (error) {
      console.log(error)
      throw new Error('Error creating a movie')
    }

    const [movieResult] = await connection.query(
      'SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)',
      [uuid]
    );

    console.log(`create result for movie<${title}>:`, movieResult[0]);
    return movieResult[0];
  }

  static async update ({ id, movie }) {
    const { title, year, director, duration, poster, rate } = movie;

    try {
      await connection.query(
        'UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?) WHERE id = UUID_TO_BIN(?)'
        [title, year, director, duration, poster, rate, id]
      )
    } catch (error) {
      throw new Error('Error updating movie')
    }

    const [movieResult] = await connection.query(
      'SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)',
      [id]
    );

    return movieResult[0];
  }

  static async delete ({ id }) {
    try {
      await connection.query(
        'DELETE FROM movie WHERE id = UUID_TO_BIN(?)',
        [id]
      )
      return true;
    } catch (error) {
      throw new Error('Error deleting movie')
    }
  }
}