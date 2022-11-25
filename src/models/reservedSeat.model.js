const db = require('../helpers/db.helper')

exports.selectAllReservedSeats = (callback) => {
  return db.query('SELECT * FROM "reservedSeat"', callback)
}

exports.selectReservedSeat = (param, callback) => {
  return db.query(`SELECT * FROM "reservedSeat" WHERE id=${param.id}`, callback)
}

exports.insertReservedSeat = (data, callback) => {
  const sql ='INSERT INTO "reservedSeat" ("seatNum", "transactionId") VALUES ($1, $2) RETURNING *';

  const values = [data.seatNum, data.transactionId]

  return db.query(sql, values, callback)
}

exports.patchUser = (data, param, callback) => {
  const sql = `UPDATE "reservedSeat" SET "seatNum"=$1, "transactionId"=$2 WHERE id=$3 RETURNING *`;

  const values = [data.seatNum, data.transactionId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteReservedSeat = (param, callback) => {
  return db.query(`DELETE FROM "reservedSeat" WHERE id=${param.id} RETURNING *`, callback)
}
