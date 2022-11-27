const db = require('../helpers/db.helper')

exports.selectAllSubscribers = (filter, callback) => {
  const sql = `SELECT * FROM subscribers WHERE email LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllSubscribers = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM subscribers WHERE email LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectSubscriber = (param, callback) => {
  return db.query(`SELECT * FROM subscribers WHERE id=${param.id}`, callback)
}

exports.insertSubscriber = (data, callback) => {
  const sql = `INSERT INTO subscribers ("email") VALUES ($1) RETURNING *`;

  const values = [data.email];

  return db.query(sql, values, callback)
}

exports.patchSubscriber = (data, param, callback) => {
  const sql = `UPDATE subscribers SET "email"=COALESCE(NULLIF($1,''), "email") WHERE id=$2 RETURNING *`

  const values = [data.email, param.id]

  return db.query(sql, values, callback)
}

exports.deleteSubscriber = (param, callback) => {
  return db.query(`DELETE FROM subscribers WHERE id=${param.id} RETURNING *`, callback)
}
