const Joi = require('joi')
const {registerSchema, loginSchema} = require('../validators/userDetailsValidatorSchema')

// async function registerValidate(req,res,next){
//     registerSchema.validateAsync()
// }

const registerValidate = async(req,res,next)=>{
    
    try{await registerSchema.validateAsync(req.body)}
    catch(err){
        console.log("working")
        return res.status(422).send({success:false,message:err.message})
        
    }
    next()

}

const loginValidate = async (req,res,next)=>{
    try{
        await loginSchema.validateAsync(req.body)
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
}

module.exports = {registerValidate,loginValidate}