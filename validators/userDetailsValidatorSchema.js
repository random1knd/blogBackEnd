const Joi = require('joi')






const registerSchema = Joi.object({
    

    user:Joi.string()
    .min(3)
    .max(30)
    .required(),

    password:Joi.string()
    .min(3)
    .required(),

    description:Joi.string()
    .min(4)
    .max(300)
    .required(),

    email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required()

    

    




})

module.exports = {registerSchema}
