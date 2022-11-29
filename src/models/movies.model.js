const db = require('../helpers/db.helper')

exports.selectAllMovies = (filter, callback) => {
  const sql = `SELECT * FROM movies WHERE title LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)}

exports.countAllMovies = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM movies WHERE title LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectMovie = (param, callback) => {
  const sql = `SELECT * FROM movies WHERE id=$1`

  const values = [param.id]

  return db.query(sql, values, callback)
}

exports.selectMovieByNow = (callback) => {
  const sql = `SELECT m.* FROM "movieSchedules" ms JOIN "movies" m ON ms."movieId" = m.id WHERE $1 BETWEEN "startDate" AND "endDate";`

  const values = [new Date()]

  return db.query(sql, values, callback)
}

exports.selectMovieByMonth = (month, callback) => {
  const sql = `SELECT * FROM "movies" WHERE "releaseDate" >= $1 AND "releaseDate" < $2`

  const values = [`2022-${month}-01`, `2022-${parseInt(month) + 1}-01`]

  return db.query(sql, values, callback)
}

exports.insertMovie = (data, callback) => {
  const sql ='INSERT INTO movies ("title", "picture", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

  const values = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis]

  return db.query(sql, values, callback)
}

exports.patchUser = (data, param, callback) => {
  const sql = `UPDATE movies SET "title"=COALESCE(NULLIF($1,''), "title"), "picture"=COALESCE(NULLIF($2,''), "picture"), "releaseDate"=COALESCE(NULLIF($3, '1970-01-01'::timestamptz), "releaseDate"), "director"=COALESCE(NULLIF($4,''), "director"), "duration"=COALESCE(NULLIF($5, '00:00:00'::time), "duration"), "synopsis"=COALESCE(NULLIF($6,''), "synopsis") WHERE id=$7 RETURNING *`;

  const values = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis, param.id]

  return db.query(sql, values, callback)
}

exports.deleteMovie = (param, callback) => {
  const sql = `DELETE FROM movies WHERE id=$1 RETURNING *`

  const values = [param.id]

  return db.query(sql, values, callback)
}
