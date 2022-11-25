const db = require('../helpers/db.helper')

exports.selectAllCinemas = (callback) => {
  return db.query(`SELECT * FROM cinemas`, callback)
}

exports.selectCinema = (param, callback) => {
  return db.query(`SELECT * FROM cinemas WHERE id=${param.id}`, callback)
}

exports.insertCinema = (data, callback) => {
  const sql = `INSERT INTO cinemas ("picture", "name", "address", "city") VALUES ($1, $2, $3, $4) RETURNING *`;

  const values = [data.picture, data.name, data.address, data.city];

  return db.query(sql, values, callback)
}

exports.patchCinema = (data, param, callback) => {
  const sql = `UPDATE cinemas SET "picture"=COALESCE(NULLIF($1,''), "picture"), "name"=COALESCE(NULLIF($2,''), "name"), "address"=COALESCE(NULLIF($3,''), "address"), "city"=COALESCE(NULLIF($4,''), "city") WHERE id=$5 RETURNING *`

  const values = [data.picture, data.name, data.address, data.city, param.id]

  return db.query(sql, values, callback)
}

exports.deleteCinema = (param, callback) => {
  return db.query(`DELETE FROM cinemas WHERE id=${param.id} RETURNING *`, callback)
}
