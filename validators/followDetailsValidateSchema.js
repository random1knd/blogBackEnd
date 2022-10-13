const Joi = require('joi')



const followDetailsValidateSchema = Joi.object({
    follow:Joi.string()
    .required()
})

module.exports = {followDetailsValidateSchema}