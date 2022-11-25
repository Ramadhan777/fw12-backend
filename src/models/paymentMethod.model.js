const db = require('../helpers/db.helper')

exports.selectAllPaymentMethods = (callback) => {
  return db.query('SELECT * FROM "paymentMethod"', callback)
}

exports.selectPaymentMethod = (param, callback) => {
  return db.query(`SELECT * FROM "paymentMethod" WHERE id=${param.id}`, callback)
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
  return db.query(`DELETE FROM "paymentMethod" WHERE id=${param.id} RETURNING *`, callback)
}
