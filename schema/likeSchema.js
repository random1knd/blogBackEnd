const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
    likedBy:{
        type:String,
        required:true
    },
    object:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("likes",likeSchema)