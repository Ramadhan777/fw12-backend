const db = require('../helpers/db.helper')

exports.selectAllMovieSchedules = (callback) => {
  return db.query('SELECT * FROM "movieSchedules"', callback)
}

exports.selectMovieSchedule = (param, callback) => {
  return db.query(`SELECT * FROM "movieSchedules" WHERE id=${param.id}`, callback)
}

exports.insertMovieSchedule = (data, callback) => {
  const sql ='INSERT INTO "movieSchedules" ("movieId", "cinemaId", "price", "startDate", "endDate") VALUES ($1, $2, $3, $4, $5) RETURNING *';

  const values = [data.movieId, data.cinemaId, data.price, data.startDate, data.endDate]

  return db.query(sql, values, callback)
}

exports.patchUser = (data, param, callback) => {
  const sql = `UPDATE "movieSchedules" SET "movieId"=$1, "cinemaId"=$2, "price"=$3, "startDate"=$4, "endDate"=$5 WHERE id=$6 RETURNING *`;

  const values = [data.movieId, data.cinemaId, data.price, data.startDate, data.endDate, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovieSchedule = (param, callback) => {
  return db.query(`DELETE FROM "movieSchedules" WHERE id=${param.id} RETURNING *`, callback)
}
