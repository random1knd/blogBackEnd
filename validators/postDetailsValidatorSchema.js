const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)



/* 
###############################
Start of post validator schemas
###############################
*/


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


//req.body.blogId || !req.body.blogData || !req.body.title || !req.body.description
const postUpdateSchema = Joi.object({
blogId:Joi.objectId()
.required(),

title:Joi.string()
.required()
.min(10)
.max(100),

description:Joi.string()
.required()
.min(20)
.max(200),

blogData:Joi.string()
.min(10)
.max(400)
.required()


})

const postDeleteSchema = Joi.object({
    postId:Joi.objectId()
    .required(),


})


/*
#############################
End of post validation schema
#############################
*/



/*
##################################
Start of comment validation schema
##################################
*/

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

/*
################################
End of comment validation schema
################################
*/

module.exports = {postSchema, commentSchema , commentUpdateSchema , postUpdateSchema ,postDeleteSchema,commentDeleteSchema}
