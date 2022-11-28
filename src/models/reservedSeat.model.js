const db = require('../helpers/db.helper')

exports.selectAllReservedSeats = (filter, callback) => {
  const sql = `SELECT * FROM "reservedSeat" WHERE "transactionId"::VARCHAR LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllReservedSeat = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM "reservedSeat" WHERE "transactionId"::VARCHAR LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectReservedSeat = (param, callback) => {
  const sql = `SELECT * FROM "reservedSeat" WHERE id=$1`

  const values = [param.id]

  return db.query(sql, values, callback)
}

exports.insertReservedSeat = (data, callback) => {
  const sql ='INSERT INTO "reservedSeat" ("seatNum", "transactionId") VALUES ($1, $2) RETURNING *';

  const values = [data.seatNum, data.transactionId]

  return db.query(sql, values, callback)
}

exports.patchUser = (data, param, callback) => {
  const sql = `UPDATE "reservedSeat" SET "seatNum"=COALESCE(NULLIF($1,''), "seatNum"), "transactionId"=COALESCE(NULLIF($2,0), "transactionId") WHERE id=$3 RETURNING *`;

  const values = [data.seatNum, data.transactionId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteReservedSeat = (param, callback) => {
  const sql = `DELETE FROM "reservedSeat" WHERE id=$1 RETURNING *`

  const values = [param.id]

  return db.query(sql, values, callback)
}
