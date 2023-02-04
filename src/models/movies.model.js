const db = require("../helpers/db.helper");

exports.selectAllMovies = (filter, callback) => {
  const sql = `SELECT m.*, string_agg(g.name, ', ') as genre FROM movies m LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id LEFT JOIN genre g ON g.id = mg."genreId" WHERE title LIKE $1 GROUP BY m.id ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;

  const values = [`%${filter.search}%`, filter.limit, filter.offset];

  return db.query(sql, values, callback);
};

exports.selectAllMoviesByGenre = (filter, callback) => {
  const sql = `SELECT m.*, string_agg(g.name, ', ') as genre FROM movies m LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id LEFT JOIN genre g ON g.id = mg."genreId" WHERE g.name LIKE $1 GROUP BY m.id ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;

  const values = [`%${filter.search}%`, filter.limit, filter.offset];

  return db.query(sql, values, callback);
};


exports.selectMovieByDateAndCIty = (data, callback) => {
  const sql = `SELECT c.id, c.picture, c.name, c.address, array_agg(mst.time) as schedules, ms.price FROM movies m LEFT JOIN "movieSchedules" ms ON ms."movieId" = m.id LEFT JOIN cinemas c ON ms."cinemaId" = c.id LEFT JOIN "movieSchedulesTimes" mst ON ms.id = mst."movieScheduleId" WHERE m.id = $1 AND c.city = $2 AND $3 BETWEEN ms."startDate" AND ms."endDate" GROUP BY c.id,c.picture, c.name, c.address, ms.price`

  const values = [data.movieId, data.city, data.date]

  return db.query(sql, values, callback)
}

exports.countAllMovies = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM movies WHERE title LIKE $1`;

  const values = [`%${filter.search}%`];

  return db.query(sql, values, callback);
};

exports.countAllMoviesByGenre = (filter, callback) => {
  const sql = `SELECT COUNT(*) AS "totalData" FROM movies m LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id LEFT JOIN genre g ON g.id = mg."genreId" WHERE g.name LIKE $1`;

  const values = [`%${filter.search}%`];

  return db.query(sql, values, callback);
};

exports.selectMovie = (param, callback) => {
  const sql = `SELECT m.*, string_agg(DISTINCT(g.name), ', ') as genre,  string_agg(DISTINCT(c.name), ', ') as casts FROM "movies" m LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id LEFT JOIN "genre" g ON g.id = mg."genreId" LEFT JOIN "movieCasts" mc ON mc."movieId" = m.id LEFT  JOIN "casts" c ON mc."castId" = c.id  WHERE m.id=$1 GROUP BY m.id`;

  const values = [param.id];

  return db.query(sql, values, callback);
};

exports.selectMovieByNow = (filter, callback) => {
  const sql = `SELECT DISTINCT(m.id), m.*,  string_agg(DISTINCT(g.name), ', ') as genre FROM "movies" m JOIN "movieSchedules" ms ON ms."movieId" = m.id JOIN "cinemas" c ON ms."cinemaId" = c.id LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id LEFT JOIN genre g ON g.id = mg."genreId" WHERE current_date BETWEEN "startDate" AND "endDate" GROUP BY m.id, ms.id, c.id ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $1 OFFSET $2`;

  const values = [filter.limit, filter.offset];

  return db.query(sql, values, callback);
};

exports.selectMovieByMonth = (filter, data, callback) => {
  const sql = `SELECT m.*, string_agg(g.name, ', ') as genre FROM "movies" m LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id LEFT JOIN "genre" g ON g.id = mg."genreId" WHERE title LIKE $3 AND date_part('year',"releaseDate")::TEXT = COALESCE(NULLIF($1 ,''), date_part('year', current_date)::TEXT) AND date_part('month',"releaseDate")::TEXT = COALESCE(NULLIF($2 ,''), date_part('month', current_date)::TEXT) GROUP BY m.id `;
  // ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $3 OFFSET $4
  const values = [
    data.year,
    data.month,
    `%${filter.search}%`,
    // filter.limit,
    // filter.offset,
  ];

  return db.query(sql, values, callback);
};

exports.insertMovie = (data, callback) => {
  const sql =
    'INSERT INTO movies ("title", "picture", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

  const values = [
    data.title,
    data.picture,
    data.releaseDate,
    data.director,
    data.duration,
    data.synopsis,
  ];

  return db.query(sql, values, callback);
};

exports.patchMovie = (data, param, callback) => {
  const sql = `UPDATE movies SET "title"=COALESCE(NULLIF($1,''), "title"), "picture"=COALESCE(NULLIF($2,''), "picture"), "releaseDate"=COALESCE(NULLIF($3, '1970-01-01'::timestamptz), "releaseDate"), "director"=COALESCE(NULLIF($4,''), "director"), "duration"=COALESCE(NULLIF($5, '00:00:00'::time), "duration"), "synopsis"=COALESCE(NULLIF($6,''), "synopsis") WHERE id=$7 RETURNING *`;

  const values = [
    data.title,
    data.picture,
    data.releaseDate,
    data.director,
    data.duration,
    data.synopsis,
    param.id,
  ];

  return db.query(sql, values, callback);
};

exports.deleteMovie = (param, callback) => {
  const sql = `DELETE FROM movies WHERE id=$1 RETURNING *`;

  const values = [param.id];

  return db.query(sql, values, callback);
};
