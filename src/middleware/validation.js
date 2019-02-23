const Joi = require('joi')

const validate = (schema) => {
  const validateRequest = (req, res, next) => {
    const { data } = req.body

    return Joi.validate(data, schema, (err) => {
      if (err) {
        console.error(err)
        return next(err)
      }

      return next()
    })
  }

  return validateRequest
}

module.exports = validate
