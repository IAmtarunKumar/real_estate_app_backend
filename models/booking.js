
const mongoose = require("mongoose")


const bookingSchema = mongoose.Schema({
    leadId: { type: String, required: false },
    bookingDate: { type: String, required: false },
    bookingAmount: { type: String, required: false },
    plotNumber: { type: String, required: false },
    salesExecutiveEmail: { type: String, required: false },
    fieldExecutive: { type: String, required: false },
    notes: { type: String, required: false },
    status: { type: String, required: false },
    project: { type: String, required: false },
    leadDetails : {type : String ,  required : false}

})

const Booking = mongoose.model("Booking" , bookingSchema )



module.exports = Booking