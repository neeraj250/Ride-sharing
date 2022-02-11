
const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema({
    emailId : {
        type:String,
        required:true
    },
    username : {
        type:String,
        required:true
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

module.exports = mongoose.model('User',usersSchema)