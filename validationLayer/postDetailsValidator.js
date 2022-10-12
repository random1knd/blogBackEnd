const Joi = require('joi')

const { postSchema, commentSchema ,commentUpdateSchema, postUpdateSchema , postDeleteSchema , commentDeleteSchema} = require('../validators/postDetailsValidatorSchema')

/*
###############################
start of post validator schema
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
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
    next()
}


const postDeleteValidate = async (req,res,next)=>{
    try{
        await postDeleteSchema.validateAsync(req.body)
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
    next()
}

/*
#############################
End of post validator schema
##############################
*/




/* 
#################################
start of comment validate schema
################################
*/ 
                                    

const commentValidate = async (req,res,next)=>{
    
    try{
        await commentSchema.validateAsync(req.body)
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
}


const commentUpdateValidate = async (req,res,next)=>{
    try{
        await commentUpdateSchema.validateAsync(req.body)
    }catch(err){
        
        return res.status(422).send({success:false,message:err.message})
        
    }
}

const commentDeleteValidate = async (req,res,next)=>{
    try{
        await commentDeleteSchema.validateAsync(req.body)
    }catch(err){
        
        return res.status(422).send({success:false,message:err.message})
    }

}

/*
####################################
End of the comment validation schema
####################################
*/

module.exports = {postValidate,  commentValidate , commentUpdateValidate, postUpdateValidate , postDeleteValidate, commentDeleteValidate}