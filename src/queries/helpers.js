const camelCase = require('lodash/camelCase')

const reduceRow = (acc, [key, value]) => {
  const camelKey = camelCase(key)

  return {
    ...acc,
    [camelKey]: value
  }
}

const convertRow = (row) => {
  return Object.entries(row).reduce(reduceRow, {})
}

const camelize = (result) => {
  return result.rows.map(convertRow)
}

module.exports = {
  camelize
}
