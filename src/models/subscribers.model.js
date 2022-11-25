const db = require('../helpers/db.helper')

exports.selectAllSubscribers = (callback) => {
  return db.query(`SELECT * FROM subscribers`, callback)
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
  const sql = `UPDATE subscribers SET "email"=$1 WHERE id=$2 RETURNING *`

  const values = [data.email, param.id]

  return db.query(sql, values, callback)
}

exports.deleteSubscriber = (param, callback) => {
  return db.query(`DELETE FROM subscribers WHERE id=${param.id} RETURNING *`, callback)
}
