const db = require('../helpers/db.helper')

exports.selectAllResetPasswords = (callback) => {
  return db.query(`SELECT * FROM "resetPassword"`, callback)
}

exports.selectResetPassword = (param, callback) => {
  return db.query(`SELECT * FROM "resetPassword" WHERE id=${param.id}`, callback)
}

exports.insertResetPassword = (data, callback) => {
  const sql = `INSERT INTO "resetPassword"("email", "userId", "code") VALUES ($1, $2, $3) RETURNING *`;

  const values = [data.email, data.userId];

  return db.query(sql, values, callback)
}

exports.patchResetPassword = (data, param, callback) => {
  const sql = `UPDATE "resetPassword" SET "email"=$1, "userId"=$2, "code"=$3 WHERE id=$4 RETURNING *`

  const values = [data.email, data.userId, data.code, param.id]

  return db.query(sql, values, callback)
}

exports.deleteResetPassword = (param, callback) => {
  return db.query(`DELETE FROM "resetPassword" WHERE id=${param.id} RETURNING *`, callback)
}
