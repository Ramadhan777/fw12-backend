const db = require('../helpers/db.helper')

exports.selectAllTransactions = (callback) => {
  return db.query('SELECT * FROM transactions', callback)
}

exports.selectTransaction = (data, callback) => {
  return db.query(`SELECT * FROM transactions WHERE id=${data.id}`, callback)
}

exports.insertTransaction = (data, callback) => {
  const sql = 'INSERT INTO transactions ("bookingDate", "movieId", "cinemaId", "movieScheduleID", "fullName", "email", "phoneNumber", "statusId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

  const values = [data.bookingDate, data.movieId, data.cinemaId, data.movieScheduleID, data.fullName, data.email, data.phoneNumber, data.statusId]

  return db.query(sql, values, callback)
}

exports.patchTransaction = (data, param, callback) => {
  const sql = `UPDATE transactions SET "bookingDate"=COALESCE(NULLIF($1,'1970-01-01'::TIMESTAMPTZ), "bookingDate"), "movieId"=COALESCE(NULLIF($2,0), "movieId"), "cinemaId"=COALESCE(NULLIF($3,0), "cinemaId"), "movieScheduleID"=COALESCE(NULLIF($4,0), "movieScheduleID"), "fullName"=COALESCE(NULLIF($5,''), "fullName"), "email"=COALESCE(NULLIF($6,''), "email"), "phoneNumber"=COALESCE(NULLIF($7,''), "phoneNumber"), "statusId"=COALESCE(NULLIF($8,0), "statusId") WHERE id=$9 RETURNING *`;

  const values = [data.bookingDate, data.movieId, data.cinemaId, data.movieScheduleID, data.fullName, data.email, data.phoneNumber, data.statusId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteTransaction = (param, callback) => {
  return db.query(`DELETE FROM transactions WHERE id=${param.id} RETURNING *`, callback)
}
