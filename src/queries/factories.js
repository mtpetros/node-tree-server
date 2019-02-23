const { pool } = require('./connection')
const { camelize } = require('./helpers')

const save = (data) => {
  const {
    name,
    bottom,
    top,
    amount
  } = data

  const text = `INSERT INTO factories (
      name,
      bottom,
      top,
      amount
    )

    VALUES ($1, $2, $3, $4)

    RETURNING *;`

  const values = [
    name,
    bottom,
    top,
    amount
  ]

  return pool.query({ text, values })
    .then(camelize)
}

const update = (id, data) => {
  const {
    name,
    bottom,
    top
  } = data

  const text = `UPDATE factories
    SET name = $2,
      bottom = $3,
      top = $4

    WHERE id = $1;`

  const values = [
    id,
    name,
    bottom,
    top
  ]

  return pool.query({ text, values })
    .then(camelize)
}

const getAll = () => {
  const text = `SELECT
      f.id,
      f.name,
      f.bottom,
      f.top,
      f.amount,
      c.children
    FROM factories f, LATERAL (
      SELECT ARRAY (
        SELECT c.number
        FROM children c
        WHERE c.factory_id = f.id
      ) as children
    ) c

    ORDER BY f.id ASC;`

  return pool.query({ text }).then(camelize)
}

const remove = (id) => {
  const text = `DELETE FROM factories
    WHERE id = $1`

  const values = [ id ]
  return pool.query({ text, values }).then(camelize)
}

module.exports = {
  save,
  update,
  getAll,
  remove
}
