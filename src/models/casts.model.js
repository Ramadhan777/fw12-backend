const db = require('../helpers/db.helper')

exports.selectAllCasts = (callback) => {
  return db.query(`SELECT * FROM casts`, callback)
}

exports.selectCast = (param, callback) => {
  return db.query(`SELECT * FROM casts WHERE id=${param.id}`, callback)
}

exports.insertCast = (data, callback) => {
  const sql = `INSERT INTO casts ("name") VALUES ($1) RETURNING *`;

  const values = [data.name];

  return db.query(sql, values, callback)
}

exports.patchCast = (data, param, callback) => {
  const sql = `UPDATE casts SET "name"=$1 WHERE id=$2 RETURNING *`

  const values = [data.name, param.id]

  return db.query(sql, values, callback)
}

exports.deleteCast = (param, callback) => {
  return db.query(`DELETE FROM casts WHERE id=${param.id} RETURNING *`, callback)
}
