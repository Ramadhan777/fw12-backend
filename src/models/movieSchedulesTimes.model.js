const db = require('../helpers/db.helper')

exports.selectAllMovieSchedulesTimes = (callback) => {
  return db.query('SELECT * FROM "movieSchedulesTimes"', callback)
}

exports.selectMovieSchedulesTime = (param, callback) => {
  return db.query(`SELECT * FROM "movieSchedulesTimes" WHERE id=${param.id}`, callback)
}

exports.insertMovieSchedulesTime = (data, callback) => {
  const sql ='INSERT INTO "movieSchedulesTimes" ("time", "movieScheduleId") VALUES ($1, $2) RETURNING *';

  const values = [data.time, data.movieScheduleId]

  return db.query(sql, values, callback)
}

exports.patchUser = (data, param, callback) => {
  const sql = `UPDATE "movieSchedulesTimes" SET "time"=$1, "movieScheduleId"=$2 WHERE id=$3 RETURNING *`;

  const values = [data.time, data.movieScheduleId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovieSchedulesTime = (param, callback) => {
  return db.query(`DELETE FROM "movieSchedulesTimes" WHERE id=${param.id} RETURNING *`, callback)
}
