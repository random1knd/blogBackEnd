const Joi = require('joi')
const { postSchema } = require('../validators/postDetailsValidatorSchema')

const postValidate  = async (req,res,next)=>{
   try{
    await postSchema.validateAsync(req.body)
   }catch(err){
    return res.status(422).send({success:false,message:err.message})
   }
   next()
}

module.exports = {postValidate}