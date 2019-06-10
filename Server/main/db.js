const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Rameez1qwer',
  post: 5432
})

module.exports = pool
