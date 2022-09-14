const mongoose = require('mongoose')
const followSchema = mongoose.Schema({
    followedBy:{
        type:String,
        required:true
    },
    following:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("follow",followSchema)