const db = require('../helpers/db.helper')

exports.selectAllMovieCasts = (callback) => {
  const sql = `SELECT * FROM "movieCasts"`;

  return db.query(sql, callback)
}

exports.selectMovieCast = (param, callback) => {
  const sql = `SELECT * FROM "movieCasts" WHERE id=$1`;

  const values = [param.id]

  return db.query(sql, values, callback)
}

exports.insertMovieCast = (data, callback) => {
  const sql = `INSERT INTO "movieCasts"("movieId", "castId") VALUES ($1, $2) RETURNING *`;

  const values = [data.movieId, data.castsId];

  return db.query(sql, values, callback)
}

exports.patchMovieCast = (data, param, callback) => {
  const sql = `UPDATE "movieCasts" SET "movieId"=COALESCE(NULLIF($1,0), "movieId"), "castsId"=COALESCE(NULLIF($2,0), "castsId") WHERE id=$3 RETURNING *`

  const values = [data.movieId, data.castsId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovieCast = (param, callback) => {
  const sql = `DELETE FROM "movieCasts" WHERE id=$1 RETURNING *`

  const values = [param.id]

  return db.query(sql, values, callback)
}
