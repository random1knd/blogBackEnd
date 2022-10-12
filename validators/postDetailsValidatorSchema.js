const Joi = require('joi')




const postSchema = Joi.object({
    // const {title,description,blogData}  =req.body
    title:Joi.string()
    .min(10)
    .max(100)
    .required(),

    description:Joi.string()
    .required()
    .min(20)
    .max(300),

    blogData:Joi.string()
    .min(50)
    .max(500)
    .required()

})

module.exports = {postSchema}