const db = require('../helpers/db.helper')

exports.selectAllGenres = (callback) => {
  return db.query(`SELECT * FROM genre`, callback)
}

exports.selectGenre = (param, callback) => {
  return db.query(`SELECT * FROM genre WHERE id=${param.id}`, callback)
}

exports.insertGenre = (data, callback) => {
  const sql = `INSERT INTO genre ("name") VALUES ($1) RETURNING *`;

  const values = [data.name];

  return db.query(sql, values, callback)
}

exports.patchGenre = (data, param, callback) => {
  const sql = `UPDATE genre SET "name"=COALESCE(NULLIF($1,''), "name") WHERE id=$2 RETURNING *`

  const values = [data.name, param.id]

  return db.query(sql, values, callback)
}

exports.deleteGenre = (param, callback) => {
  return db.query(`DELETE FROM genre WHERE id=${param.id} RETURNING *`, callback)
}
