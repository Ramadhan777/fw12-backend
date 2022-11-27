const db = require('../helpers/db.helper')

exports.selectAllUsers = (filter, callback) => {
  const sql = `SELECT * FROM users WHERE "firstName" LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllUsers = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM users WHERE "firstName" LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectUser = (data, callback) => {
  return db.query(`SELECT * FROM users WHERE id=${data.id}`, callback)
}

exports.insertUser = (data, callback) => {
  const sql = 'INSERT INTO users ("firstName", "lastName", "phoneNumber", "email", "password") VALUES ($1, $2, $3, $4, $5) RETURNING *';

  const values = [data.firstName, data.lastName, data.phoneNumber, data.email, data.password]

  return db.query(sql, values, callback)
}

exports.patchUser = (data, param, callback) => {
  const sql = `UPDATE users SET "firstName"=COALESCE(NULLIF($1,''), "firstName"), "lastName"=COALESCE(NULLIF($2,''), "lastName"), "phoneNumber"=COALESCE(NULLIF($3, ''), "phoneNumber"), "email"=COALESCE(NULLIF($4, ''), "email"), "password"=COALESCE(NULLIF($5,''), "password")  WHERE id=$6 RETURNING *`;

  const values = [data.firstName, data.lastName, data.phoneNumber, data.email, data.password, param.id]

  return db.query(sql, values, callback)
}

exports.deleteUser = (param, callback) => {
  return db.query(`DELETE FROM users WHERE id=${param.id} RETURNING *`, callback)
}
