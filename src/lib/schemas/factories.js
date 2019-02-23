const Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.number().allow(null),
  name: Joi.string().alphanum().min(1).required(),
  amount: Joi.number().min(1).max(15).required(),
  bottom: Joi.number().required(),
  top: Joi.number().greater(Joi.ref('bottom')).required(),
  children: Joi.array().items(Joi.number()).required()
})

module.exports = schema
