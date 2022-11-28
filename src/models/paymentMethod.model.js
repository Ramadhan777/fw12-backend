const db = require('../helpers/db.helper')

exports.selectAllPaymentMethods = (filter, callback) => {
  const sql = `SELECT * FROM "paymentMethod" WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllPaymentMethods = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM "paymentMethod" WHERE name LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectPaymentMethod = (param, callback) => {
  const sql = `SELECT * FROM "paymentMethod" WHERE id=$1`

  const values = [param.id]

  return db.query(sql, values, callback)
}

exports.insertPaymentMethod = (data, callback) => {
  const sql ='INSERT INTO "paymentMethod" ("picture", "name") VALUES ($1, $2) RETURNING *';

  const values = [data.picture, data.name]

  return db.query(sql, values, callback)
}

exports.patchUser = (data, param, callback) => {
  const sql = `UPDATE "paymentMethod" SET "picture"=COALESCE(NULLIF($1,''), "picture"), "name"=COALESCE(NULLIF($2,''), "name") WHERE id=$3 RETURNING *`;

  const values = [data.picture, data.name, param.id]

  return db.query(sql, values, callback)
}

exports.deletePaymentMethod = (param, callback) => {
  const sql = `DELETE FROM "paymentMethod" WHERE id=$1 RETURNING *`

  const values = [param.id]

  return db.query(sql, values, callback)
}
