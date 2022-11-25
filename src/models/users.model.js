const db = require('../helpers/db.helper')

exports.selectAllUsers = (callback) => {
  return db.query('SELECT * FROM users', callback)
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
  const sql = `UPDATE users SET "firstName"=$1, "lastName"=$2, "phoneNumber"=$3, "email"=$4, "password"=$5 WHERE id=$6 RETURNING *`;

  const values = [data.firstName, data.lastName, data.phoneNumber, data.email, data.password, param.id]

  return db.query(sql, values, callback)
}

exports.deleteUser = (param, callback) => {
  return db.query(`DELETE FROM users WHERE id=${param.id} RETURNING *`, callback)
}
