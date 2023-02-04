const { Pool } = require('pg')

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:1@localhost:5432/postgres?schema=1";

const db = new Pool({
  connectionString,
})

db.connect((err) =>{
  if(err) {
    console.log(err)
    console.log('database is not connect')
  } else{
    console.log('database connected')
  }
})

module.exports = db
