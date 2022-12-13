const { Pool } = require('pg')

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:1@localhost:5432/postgres?schema=1";

const db = new Pool({
  connectionString,
})

module.exports = db
