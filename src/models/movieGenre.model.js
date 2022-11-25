const db = require('../helpers/db.helper')

exports.selectAllMovieGenres = (callback) => {
  return db.query(`SELECT * FROM "movieGenre"`, callback)
}

exports.selectMovieGenre = (param, callback) => {
  return db.query(`SELECT * FROM "movieGenre" WHERE id=${param.id}`, callback)
}

exports.insertMovieGenre = (data, callback) => {
  const sql = `INSERT INTO "movieGenre"("movieId", "genreId") VALUES ($1, $2) RETURNING *`;

  const values = [data.movieId, data.genreId];

  return db.query(sql, values, callback)
}

exports.patchMovieGenre = (data, param, callback) => {
  const sql = `UPDATE "movieGenre" SET "movieId"=$1, "genreId"=$2 WHERE id=$3 RETURNING *`

  const values = [data.movieId, data.genreId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovieGenre = (param, callback) => {
  return db.query(`DELETE FROM "movieGenre" WHERE id=${param.id} RETURNING *`, callback)
}
