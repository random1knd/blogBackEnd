const {likeValidateSchema} = require("../validators/likeDetailsValidateSchema")


const likeValidate =async (req,res,next)=>{
    try{

        await likeValidateSchema.validateAsync(req.body)
        if(commentSchema.findOne({_id:object})===null){
            return res.status(404).send({success:false,message:"comment not found"})
        }
    }catch(err){
        return res.status(422).send({success:false,message:err.message})
    }
    next()
}

module.exports = {likeValidate}