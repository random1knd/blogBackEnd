const blogSchema = require("../schema/blogSchema")
const userSchema = require("../schema/userSchema")
const { followDetailsValidateSchema } = require("../validators/followDetailsValidateSchema")

const followDetailsValidator = async (req,res,next)=>{
    try{
        
        await followDetailsValidateSchema.validateAsync(req.body)
        if(await userSchema.findOne({user:req.body.follow}) === null){
            return res.status(404).send({success:false,message:"user not found"})
        }
    }catch(err){
        
        return res.status(422).send({success:false,message:err.message})
    }
}

module.exports = {followDetailsValidator}