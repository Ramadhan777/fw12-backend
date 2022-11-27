const db = require('../helpers/db.helper')

exports.selectAllMovieSchedules = (filter, callback) => {
  const sql = `SELECT * FROM "movieSchedules" WHERE "movieId"::VARCHAR LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllMovieSchedules = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM "movieSchedules" WHERE "movieId"::VARCHAR LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
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
  const sql = `UPDATE "movieSchedules" SET "movieId"=COALESCE(NULLIF($1,0), "movieId"), "cinemaId"=COALESCE(NULLIF($2,0), "cinemaId"), "price"=COALESCE(NULLIF($3,0), "price"), "startDate"=COALESCE(NULLIF($4,'1000-01-01'::DATE), "startDate"), "endDate"=COALESCE(NULLIF($5,'1000-01-01'::DATE), "endDate") WHERE id=$6 RETURNING *`;

  const values = [data.movieId, data.cinemaId, data.price, data.startDate, data.endDate, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovieSchedule = (param, callback) => {
  return db.query(`DELETE FROM "movieSchedules" WHERE id=${param.id} RETURNING *`, callback)
}
