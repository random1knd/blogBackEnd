const {commentSchema , commentUpdateSchema, commentDeleteSchema} = require('../validators/commentDetailsValidateSchema')

const commentValidate = async (req,res,next)=>{
    
    try{
        await commentSchema.validateAsync(req.body)
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
    next()
}


const commentUpdateValidate = async (req,res,next)=>{
    try{
        await commentUpdateSchema.validateAsync(req.body)
    }catch(err){
        
        return res.status(422).send({success:false,message:err.message})
        
    }
    next()
}

const commentDeleteValidate = async (req,res,next)=>{
    try{
        await commentDeleteSchema.validateAsync(req.body)
       if(await commentSchema.findOne({_id:req.body.commentId})===null){
            return res.status(400).send({success:false,message:'comment does not exists'})
       }
    }catch(err){
        
        return res.status(422).send({success:false,message:err.message})
    }
    next()
}

module.exports = {commentValidate, commentUpdateValidate,commentDeleteValidate}