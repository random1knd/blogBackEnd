const mongoose = require('mongoose')
const notificationSchema = mongoose.Schema({
    updateFor:{
        type:String,
        required:true
    },
    updateTitle:{
        type:String,
        required:true
    },
    updateFrom:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("notifications",notificationSchema)