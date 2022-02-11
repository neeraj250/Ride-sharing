
const mongoose = require('mongoose')

const driversSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    role : {
        type : String,
        require : true
    },
    phoneNo : {
        type : Number,
        required:true
    },
    password : {
        type : String,
        required:true
    }
})

module.exports = mongoose.model('Driver',driversSchema)