const db = require('../helpers/db.helper')

exports.selectAllStatus = (callback) => {
  return db.query(`SELECT * FROM status`, callback)
}

exports.selectStatus = (param, callback) => {
  return db.query(`SELECT * FROM status WHERE id=${param.id}`, callback)
}

exports.insertStatus = (data, callback) => {
  const sql = `INSERT INTO status ("name") VALUES ($1) RETURNING *`;

  const values = [data.name];

  return db.query(sql, values, callback)
}

exports.patchStatus = (data, param, callback) => {
  const sql = `UPDATE status SET "name"=COALESCE(NULLIF($1,''), "name") WHERE id=$2 RETURNING *`

  const values = [data.name, param.id]

  return db.query(sql, values, callback)
}

exports.deleteStatus = (param, callback) => {
  return db.query(`DELETE FROM status WHERE id=${param.id} RETURNING *`, callback)
}
