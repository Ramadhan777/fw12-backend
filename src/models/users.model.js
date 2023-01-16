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

exports.selectUser = (id, callback) => {
  const sql = `SELECT * FROM users WHERE id=$1`

  const values = [id]

  return db.query(sql, values, callback)
}

exports.selectUserByEmail = (data, callback) => {
  const sql = `SELECT * FROM users WHERE email=$1`

  const values = [data.email]

  return db.query(sql, values, callback)
}

exports.insertUser = (data, callback) => {
  const sql = 'INSERT INTO users ("firstName", "lastName", "phoneNumber", "email", "password", "role") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

  const values = [data.firstName, data.lastName, data.phoneNumber, data.email, data.password, 'user']

  return db.query(sql, values, callback)
}

exports.patchUser = (data, id, callback) => {
  const sql = `UPDATE users SET "picture"=COALESCE(NULLIF($1,''), "picture"), "firstName"=COALESCE(NULLIF($2,''), "firstName"), "lastName"=COALESCE(NULLIF($3,''), "lastName"), "phoneNumber"=COALESCE(NULLIF($4, ''), "phoneNumber"), "email"=COALESCE(NULLIF($5, ''), "email"), "password"=COALESCE(NULLIF($6,''), "password") , "role"=COALESCE(NULLIF($7,''), "role")  WHERE id=$8 RETURNING *`;

  const values = [data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password, data.role, id]

  return db.query(sql, values, callback)
}


exports.uploadImage = (data, id, callback) => {
  const sql = `UPDATE users SET "picture"=COALESCE(NULLIF($1, ''), "picture") WHERE id = $2 RETURNING *`

console.log(data.picture)
  const values = [data.picture, id]

  return db.query(sql, values, callback)
}

exports.deleteUser = (id, callback) => {
  const sql = `DELETE FROM users WHERE id=$1 RETURNING *`

  const values = [id]

  return db.query(sql, values, callback)
}
