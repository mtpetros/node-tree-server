const whiteList = [
  'http://0.0.0.0:7324',
  'https://node-tree-client.herokuapp.com'
]

const getCorsOrigin = (origin, cb) => {
  if (whiteList.includes(origin)) {
    return cb(null, true)
  }

  return cb(new Error(`${origin} not allowed by CORS`))
}

module.exports = getCorsOrigin
