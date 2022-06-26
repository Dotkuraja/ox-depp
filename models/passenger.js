const mongoose = require ("mongoose");

const passengerSchema = ({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    sex: {type: String, required: true},
    mobile: {type: Number, required: true},
    email: {type: String, required: true},
    destination: {type: String, required: true},
    passport: {
        data: Buffer,
        contentType: String
    },
    date_registered: {
        type: Date,
        default: Date().toString()
    }

})
const Passenger = new mongoose.model("passenger", passengerSchema)
module.exports = passenger;