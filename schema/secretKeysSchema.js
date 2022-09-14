const mongoose = require('mongoose')
const secretKeysSchema = new mongoose.Schema({
    refreshSecretKey:{
        type:String,
        required:true
    },
    accessSecretKey:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("secretKeys",secretKeysSchema)