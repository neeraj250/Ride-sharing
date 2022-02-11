const mongoose = require('mongoose')

const driversRouteSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    startPoint : {
        type:String,
        required:true
    },
    endPoint : {
        type : String,
        require : true
    },
    date : {
        type : String,
        require : true
    },
    time : {
        type : String,
        require : true
    },
    seats : {
        type : Number,
        require : true
    },
    remainingSeats : {
        type : Number,
        require : true
    },
    distance : {
        type : Number,
        required:true
    },
    phoneNo : {
        type : Number,
        required:true
    },
    vehicleModel : {
        type : String,
        required:true
    },
    vehicleNumber : {
        type : String,
        required:true
    }
})

module.exports = mongoose.model('DriverRoute',driversRouteSchema)