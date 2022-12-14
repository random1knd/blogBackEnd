const Joi = require('joi')

const { likeValidateSchema,postSchema, commentSchema ,commentUpdateSchema, postUpdateSchema , postDeleteSchema , commentDeleteSchema} = require('../validators/postDetailsValidatorSchema')
const commentSchemaDB = require('../schema/commentSchema')
const blogSchema = require('../schema/blogSchema')


/*
###############################
start of post validator 
################################
*/

const postValidate  = async (req,res,next)=>{
   try{
    await postSchema.validateAsync(req.body)
   }catch(err){
    return res.status(422).send({success:false,message:err.message})
   }
   next()
}

const postUpdateValidate = async (req,res,next)=>{
    
    try{
        await postUpdateSchema.validateAsync(req.body)
        if(await blogSchema.findOne({_id:blogId}) === null){
            return res.status(400).send({success:false,message:"post not found"})
        }
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
    next()
}


const postDeleteValidate = async (req,res,next)=>{
    try{
        await postDeleteSchema.validateAsync(req.body)
        if(await blogSchema.findOne({_id:blogId}) === null){
            return res.status(400).send({success:false,message:"post not found"})
        }
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
    next()
}

/*
#############################
End of post validator 
##############################
*/





module.exports = {postValidate,  postUpdateValidate , postDeleteValidate}