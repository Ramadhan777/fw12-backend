const db = require('../helpers/db.helper')

exports.selectAllMovies = (callback) => {
  return db.query('SELECT * FROM movies', callback)
}

exports.selectMovie = (param, callback) => {
  return db.query(`SELECT * FROM movies WHERE id=${param.id}`, callback)
}

exports.insertMovie = (data, callback) => {
  const sql ='INSERT INTO movies ("title", "picture", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

  const values = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis]

  return db.query(sql, values, callback)
}

exports.patchUser = (data, param, callback) => {
  const sql = `UPDATE movies SET "title"=$1, "picture"=$2, "releaseDate"=$3, "director"=$4, "duration"=$5, "synopsis"=$6 WHERE id=$7 RETURNING *`;

  const values = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovie = (param, callback) => {
  return db.query(`DELETE FROM movies WHERE id=${param.id} RETURNING *`, callback)
}
