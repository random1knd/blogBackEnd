const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    madeBy:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
    blogId:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("comments",commentSchema)