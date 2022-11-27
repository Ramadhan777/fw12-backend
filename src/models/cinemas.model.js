const db = require('../helpers/db.helper')

exports.selectAllCinemas = (filter, callback) => {
  const sql = `SELECT * FROM cinemas WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllCinemas = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM cinemas WHERE name LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
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
