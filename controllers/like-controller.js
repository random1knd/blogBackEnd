const likeSchema = require('../schema/likeSchema')
const comment = require('../schema/commentSchema')
const commentSchema = require('../schema/commentSchema')
async function liker(req,res,next){

    try{
    const findLike = await likeSchema.findOne({likedBy:req.body.user.name,object:req.body.object})
    if(findLike===null){
        const data = {
            likedBy:req.body.user.name,
            object:req.body.object
        }
        const liker = new likeSchema(data)
        await liker.save()
        return res.send("liked")
    }else{
        await likeSchema.deleteOne({likedBy:req.body.user.name,object:req.body.object})
        return res.send("like deleted")
    }
}
catch(err){
    console.log('error occured at the liking object')
}
    
}


module.exports = { liker}