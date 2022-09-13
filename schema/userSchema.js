const mongoose  = require('mongoose')
const schema =new  mongoose.Schema({
    user:{
        type:String,
        require:true,
        unique:true,
        dropDups: true 
        
    },
    password:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('user',schema)