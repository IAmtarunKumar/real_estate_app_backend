
const mongoose = require("mongoose")

const siteVisitSchema = mongoose.Schema({
    leadId: { type: String, required: false },
    siteVisitId: { type: String, required: false },
    date: { type: String, required: false },
    siteVisitDate: { type: String, required: false },
    status: { type: String, required: false },
    notes: { type: String, required: false },
    leadDetails : {type : String , required : false}

})

const Sitevisit = mongoose.model("Sitevisit" , siteVisitSchema)

module.exports = Sitevisit