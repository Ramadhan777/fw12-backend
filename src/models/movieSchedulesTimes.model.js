const db = require('../helpers/db.helper')

exports.selectAllMovieSchedulesTimes = (filter, callback) => {
  const sql = `SELECT * FROM "movieSchedulesTimes" WHERE time::VARCHAR LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllMovieSchedulesTimes = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM "movieSchedulesTimes" WHERE time::VARCHAR LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
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
  const sql = `UPDATE "movieSchedulesTimes" SET "time"=COALESCE(NULLIF($1,'00:00:00'::time), "time"), "movieScheduleId"=COALESCE(NULLIF($2,0), "movieScheduleId") WHERE id=$3 RETURNING *`;

  const values = [data.time, data.movieScheduleId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovieSchedulesTime = (param, callback) => {
  return db.query(`DELETE FROM "movieSchedulesTimes" WHERE id=${param.id} RETURNING *`, callback)
}
