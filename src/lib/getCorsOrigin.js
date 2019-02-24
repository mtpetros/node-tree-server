const whiteList = [
  'http://0.0.0.0:7324',
  'https://node-tree-client.herokuapp.com'
]

const getCorsOrigin = (origin, cb) => {
  const isAllowed = whiteList.includes(origin)
  if (isAllowed) {
    return cb(null, true)
  }

  return cb(new Error('Origin not allowed by CORS'))
}

module.exports = getCorsOrigin
