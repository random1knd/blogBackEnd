const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    createdBy:{
        type:String,
        required:true
    },
    title:{
        type:String,
        requried:true
    },
    description:{
        type:String,
        required:true
    },
    blogData:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("blog",blogSchema)