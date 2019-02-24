const Joi = require('joi')

const validate = (schema) => {
  const validateRequest = (req, res, next) => {
    const { data } = req.body

    return Joi.validate(data, schema, (err) => {
      if (err) {
        const error = err.details[0].message
        return res.status(422).json({ error })
      }

      return next()
    })
  }

  return validateRequest
}

module.exports = validate
