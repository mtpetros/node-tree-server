const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL
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

const getConnectionOpts = () => {
  if (connectionString) {
    return { connectionString }
  }

  return opts
}

const connectionOpts = getConnectionOpts()

const pool = new Pool(connectionOpts)

module.exports = {
  pool
}
