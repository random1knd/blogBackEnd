const Joi = require('joi')
Joi.objectId = require('joi-objectId')(Joi)


const likeValidateSchema = Joi.object({
    object:Joi.objectId()
    .required()
})

module.exports = {likeValidateSchema}