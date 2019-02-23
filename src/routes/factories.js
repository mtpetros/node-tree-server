const router = require('express').Router()
const schemas = require('../lib/schemas')
const validateFactory = require('../middleware/validation')(schemas.factories)
const generateChildren = require('../lib/generateChildren')

const {
  factories,
  children
} = require('../queries')

router.post('/', validateFactory, (req, res, next) => {
  const { data } = req.body
  const newChildren = generateChildren(data)

  factories.save(data)
    .then(factories => {
      const factory = factories[0]
      const { id } = factory

      return children.save(id, newChildren)
    })
    .then(() => res.json({}).end())
    .catch(next)
})

router.put('/:id', validateFactory, (req, res, next) => {
  const { id } = req.params
  const { data } = req.body
  const newChildren = generateChildren(data)

  factories.update(id, data)
    .then(() => children.remove(id))
    .then(() => children.save(id, newChildren))
    .then(() => res.status({}).end())
    .catch(next)
})

router.get('/', (req, res, next) => {
  factories.getAll()
    .then(data => res.json({ data }))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  children.remove(id)
    .then(() => factories.remove(id))
    .then(() => res.status(200).end())
    .catch(next)
})

module.exports = router
