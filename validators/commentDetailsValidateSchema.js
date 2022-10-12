const Joi = require('joi')
Joi.objectId = require('joi-objectId')(Joi)
const commentSchema = Joi.object({
    blogId:Joi.objectId()
    .required(),
    comment:Joi.string()
    .required()
    .min(1)
    .max(300)
})

const commentUpdateSchema = Joi.object({
    commentId:Joi.objectId()
    .required(),

    comment:Joi.string()
    .required()
    .min(1)
    .max(300)
})


const commentDeleteSchema = Joi.object({
    commentId:Joi.objectId()
    .required()
})

module.exports = {commentSchema,commentUpdateSchema,commentDeleteSchema}