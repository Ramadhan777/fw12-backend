const db = require('../helpers/db.helper')

exports.selectAllResetPasswords = (filter, callback) => {
  const sql = `SELECT * FROM "resetPassword" WHERE email LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllResetPasswords = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM "resetPassword" WHERE email LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectResetPassword = (param, callback) => {
  const sql = `SELECT * FROM "resetPassword" WHERE id=$1`

  const values = [param.id]

  return db.query(sql, values, callback)
}

exports.insertResetPassword = (data, callback) => {
  const sql = `INSERT INTO "resetPassword"("email", "userId", "code") VALUES ($1, $2, $3) RETURNING *`;

  const values = [data.email, data.userId];

  return db.query(sql, values, callback)
}

exports.patchResetPassword = (data, param, callback) => {
  const sql = `UPDATE "resetPassword" SET "email"=COALESCE(NULLIF($1,''), "email"), "userId"=COALESCE(NULLIF($2, 0), "userId"), "code"=COALESCE(NULLIF($3,''), "code") WHERE id=$4 RETURNING *`

  const values = [data.email, data.userId, data.code, param.id]

  return db.query(sql, values, callback)
}

exports.deleteResetPassword = (param, callback) => {
  return db.query(`DELETE FROM "resetPassword" WHERE id=${param.id} RETURNING *`, callback)
}
