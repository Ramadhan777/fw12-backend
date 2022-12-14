const db = require('../helpers/db.helper')

exports.selectAllTransactions = (filter, callback) => {
  const sql = `SELECT * FROM transactions WHERE "fullName" LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $2 OFFSET $3`

  const values = [`%${filter.search}%`, filter.limit, filter.offset]

  return db.query(sql, values, callback)
}

exports.countAllTransactions = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM transactions WHERE "fullName" LIKE $1`

  const values = [`%${filter.search}%`]

  return db.query(sql, values, callback)
}

exports.selectTransaction = (data, callback) => {
  const sql = `SELECT * FROM transactions WHERE id=$1`

  const values = [param.id]

  return db.query(sql, values, callback)
}

exports.insertTransaction = (data, callback) => {
  const sql = 'INSERT INTO transactions ("userId", "bookingDate", "movieId", "cinemaId", "fullName", "email", "phoneNumber", "paymentMethodId", "bookingTime") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';

  const values = [data.userId, data.bookingDate, data.movieId, data.cinemaId, data.fullName, data.email, data.phoneNumber, data.bookingTime]

  return db.query(sql, values, callback)
}

exports.patchTransaction = (data, param, callback) => {
  const sql = `UPDATE transactions SET "bookingDate"=COALESCE(NULLIF($1,'1970-01-01'::TIMESTAMPTZ), "bookingDate"), "movieId"=COALESCE(NULLIF($2,0), "movieId"), "cinemaId"=COALESCE(NULLIF($3,0), "cinemaId"), "movieScheduleID"=COALESCE(NULLIF($4,0), "movieScheduleID"), "fullName"=COALESCE(NULLIF($5,''), "fullName"), "email"=COALESCE(NULLIF($6,''), "email"), "phoneNumber"=COALESCE(NULLIF($7,''), "phoneNumber"), "statusId"=COALESCE(NULLIF($8,0), "statusId"), "statusId"=COALESCE(NULLIF($9,0), "statusId") WHERE id=$10 RETURNING *`;

  const values = [data.bookingDate, data.movieId, data.cinemaId, data.movieScheduleID, data.fullName, data.email, data.phoneNumber, data.statusId, data.paymentMethodId, param.id]

  return db.query(sql, values, callback)
}

exports.deleteTransaction = (param, callback) => {
  const sql = `DELETE FROM transactions WHERE id=$1 RETURNING *`

  const values = [param.id]

  return db.query(sql, values, callback)
}
