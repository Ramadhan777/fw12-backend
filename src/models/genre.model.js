const db = require('../helpers/db.helper')

exports.selectAllGenres = (filter, callback) => {
  const sql = `SELECT * FROM genre WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllGenres = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM genre WHERE name LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectGenre = (param, callback) => {
  const sql = `SELECT * FROM genre WHERE id=$1`

  const values = [param.id]

  return db.query(sql, values, callback)
}

exports.insertGenre = (data, callback) => {
  const sql = `INSERT INTO genre ("name") VALUES ($1) RETURNING *`;

  const values = [data.name];

  return db.query(sql, values, callback)
}

exports.patchGenre = (data, param, callback) => {
  const sql = `UPDATE genre SET "name"=COALESCE(NULLIF($1,''), "name") WHERE id=$2 RETURNING *`

  const values = [data.name, param.id]

  return db.query(sql, values, callback)
}

exports.deleteGenre = (param, callback) => {
  const sql = `DELETE FROM genre WHERE id=$1 RETURNING *`

  const values = [param.id]

  return db.query(sql, values, callback)
}
