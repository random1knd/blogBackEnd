const Joi = require('joi')
const {registerSchema, loginSchema} = require('../validators/userDetailsValidatorSchema')
const userSchema = require('../schema/userSchema')
// async function registerValidate(req,res,next){
//     registerSchema.validateAsync()
// }

const registerValidate = async(req,res,next)=>{
    
    try{
        
        
        await registerSchema.validateAsync(req.body)
        
        if(await userSchema.findOne({user:req.body.user}) != null){
            return res.status(400).send({success:false,message:"user already exists"})
        }
        if(await userSchema.findOne({email:req.body.email})!=null){
            return res.status(400).send({success:false,message:"email already exists"})
        }

    }
   

    catch(err){
       
        return res.status(422).send({success:false,message:err.message})
        
    }
    // next()

}

const loginValidate = async (req,res,next)=>{
    try{
        await loginSchema.validateAsync(req.body)
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
}

module.exports = {registerValidate,loginValidate}