const db = require('../helpers/db.helper')

exports.selectAllMovieCasts = (callback) => {
  return db.query(`SELECT * FROM "movieCasts"`, callback)
}

exports.selectMovieCast = (param, callback) => {
  return db.query(`SELECT * FROM "movieCasts" WHERE id=${param.id}`, callback)
}

exports.insertMovieCast = (data, callback) => {
  const sql = `INSERT INTO "movieCasts"("movieId", "castsId") VALUES ($1, $2) RETURNING *`;

  const values = [data.movieId, data.castsId];

  return db.query(sql, values, callback)
}

exports.patchMovieCast = (data, param, callback) => {
  const sql = `UPDATE "movieCasts" SET "movieId"=COALESCE(NULLIF($1,0), "movieId"), "castsId"=COALESCE(NULLIF($2,0), "castsId") WHERE id=$3 RETURNING *`

  const values = [data.movieId, data.castsId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovieCast = (param, callback) => {
  return db.query(`DELETE FROM "movieCasts" WHERE id=${param.id} RETURNING *`, callback)
}
