const db = require('../helpers/db.helper')

exports.selectAllCasts = (filter, callback) => {
  const sql = `SELECT * FROM casts WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllCasts = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM casts WHERE name LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectCast = (param, callback) => {
  return db.query(`SELECT * FROM casts WHERE id=${param.id}`, callback)
}

exports.insertCast = (data, callback) => {
  const sql = `INSERT INTO casts ("name") VALUES ($1) RETURNING *`;

  const values = [data.name];

  return db.query(sql, values, callback)
}

exports.patchCast = (data, param, callback) => {
  const sql = `UPDATE casts SET "name"=COALESCE(NULLIF($1,''), "name") WHERE id=$2 RETURNING *`

  const values = [data.name, param.id]

  return db.query(sql, values, callback)
}

exports.deleteCast = (param, callback) => {
  return db.query(`DELETE FROM casts WHERE id=${param.id} RETURNING *`, callback)
}
