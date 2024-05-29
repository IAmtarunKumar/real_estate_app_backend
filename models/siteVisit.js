
const mongoose = require("mongoose")

const siteVisitSchema = mongoose.Schema({
    leadId: { type: String, required: false },
    siteVisitId: { type: String, required: false },
    date: { type: String, required: false },
    project: { type: String, required: false },
    propertyType: { type: String, required: false },  //flat , duplex
    salesExecutiveName: { type: String, required: false },
    salesExecutiveEmail: { type: String, required: false },
   
    status: { type: String, required: false },
    notes: { type: String, required: false },

})

const Sitevisit = mongoose.model("Sitevisit" , siteVisitSchema)

module.exports = Sitevisit