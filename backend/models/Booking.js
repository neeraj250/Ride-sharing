
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId : {
        type:String,
        required:true
    },
    driverId : {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Booking',bookingSchema)