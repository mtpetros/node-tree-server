const { Pool } = require('pg')

const database = process.env.PGDATABASE || 'node_tree'
const host = process.env.PGHOST || '0.0.0.0'
const port = process.env.PGPORT || '5432'
const user = process.env.PGUSER || 'postgres'
const max = 10

const opts = {
  database,
  host,
  port,
  user,
  max
}

const pool = new Pool(opts)

module.exports = {
  pool
}
