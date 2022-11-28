const db = require('../helpers/db.helper')

exports.selectAllStatus = (filter, callback) => {
  const sql = `SELECT * FROM status WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllStatus = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM status WHERE name LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectStatus = (param, callback) => {
  const sql = `SELECT * FROM status WHERE id=$1`

  const values = [param.id]

  return db.query(sql, values, callback)
}

exports.insertStatus = (data, callback) => {
  const sql = `INSERT INTO status ("name") VALUES ($1) RETURNING *`;

  const values = [data.name];

  return db.query(sql, values, callback)
}

exports.patchStatus = (data, param, callback) => {
  const sql = `UPDATE status SET "name"=COALESCE(NULLIF($1,''), "name") WHERE id=$2 RETURNING *`

  const values = [data.name, param.id]

  return db.query(sql, values, callback)
}

exports.deleteStatus = (param, callback) => {
  const sql = `DELETE FROM status WHERE id=$1 RETURNING *`

  const values = [param.id] 

  return db.query(sql, values, callback)
}
