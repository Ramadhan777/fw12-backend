const db = require('../helpers/db.helper')

exports.selectAllMovieGenres = (callback) => {
  const sql = `SELECT * FROM "movieGenre"`

  return db.query(sql, callback)
}

exports.selectMovieGenre = (param, callback) => {
  const sql = `SELECT * FROM "movieGenre" WHERE id=$1`

  const values = [param.id]

  return db.query(sql, values,  callback)
}

exports.insertMovieGenre = (data, callback) => {
  const sql = `INSERT INTO "movieGenre"("movieId", "genreId") VALUES ($1, $2) RETURNING *`;

  const values = [data.movieId, data.genreId];

  return db.query(sql, values, callback)
}

exports.patchMovieGenre = (data, param, callback) => {
  const sql = `UPDATE "movieGenre" SET "movieId"=COALESCE(NULLIF($1,0), "movieId"), "genreId"=COALESCE(NULLIF($2,0), "genreId") WHERE id=$3 RETURNING *`

  const values = [data.movieId, data.genreId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovieGenre = (param, callback) => {
  const sql = `DELETE FROM "movieGenre" WHERE id=$1 RETURNING *`

  const values = [param.id]

  return db.query(sql, values, callback)
}
