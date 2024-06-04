const express = require("express")
const Booking = require("../models/booking")
const formattedDate = require("../function/formatedDate")
const generateUniqueId = require("../function/uniqueId")
const verifyToken = require("../middleware/auth")
const Lead = require("../models/lead")
const router =  express.Router()

router.get("/" , async(req,res)=>{
    try {
        return res.status(200).send("booking route working fine") 
    } catch (error) {
        console.log("error:" ,error)
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})


//get all site visit
router.get("/get",verifyToken,async (req, res) => {
    try {

        //array ke andar object aayega or iss object me lead Id
        let bookings= await Booking.find()
        let leads = await Lead.find()
        var modifiedSiteVisits = [];

        var leadsObject = {}
        leads.forEach((lead) => {
            leadsObject[lead.leadId] = lead
        })
        // console.log(leadsObject) // leadObject

        // console.log(leadsObject["531863"].name) // sd

        for (var i = 0; i < bookings.length; i++) {
            var id = bookings[i].leadId;
            // console.log(leadsObject[id]);
            // bookings[i].leadDetails = leadsObject[id];
            modifiedSiteVisits.push({
                _id: bookings[i]._id,
                siteVisitId: bookings[i].siteVisitId,
                leadId: bookings[i].leadId,
                date: bookings[i].date,
                siteVisitDate: bookings[i].siteVisitDate,
                project: bookings[i].project,
                status: bookings[i].status,
                notes: bookings[i].notes,
                _v: bookings[i]._v,
                leadDetails: leadsObject[id]
            })
        }

        console.log("bookings", modifiedSiteVisits)


        return res.status(200).send(modifiedSiteVisits);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(`Internal server error: ${error.message}`);
    }
})
//get sitevisit by id

router.post("/bookingById",verifyToken, async (req, res) => {
    try {
        const bookingId = req.body.bookingId
        const allBooking= await Booking.findOne({ bookingId })
        return res.status(200).send(allBooking)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})

//site visit post....
router.post("/post", verifyToken, async (req, res) => {
    const {  leadId, bookingDate  , propertyType   , status , notes  , project} = req.body
    try {

        let leadDetails = await Lead.findOne({leadId})

        console.log("lead details" , leadDetails)

        

        let id = await generateUniqueId()
    
        const postBooking = new Booking({
            bookingId : id,
            leadId,
            date : formattedDate ,
            project,
            propertyType,
            status,
            notes,
            bookingDate,
            leadDetails : leadDetails
        })
        await postBooking.save()
        return res.status(200).send("Booking posted successfully")
        
    } catch (error) {
        console.log("error  : " , error)
        return res.status(500).send(`Internal server error ${error.message}`)
    }

  
});


//lead update
router.post("/update",verifyToken, async (req, res) => {
    console.log("site visit update api calling", req.body)
    const { leadId , bookingId ,bookingDate, date ,  project , propertyType , salesExecutiveEmail , salesExecutiveName  , status , notes } = req.body


    try {

        let foundUser = await User.findOne({ "name": salesExecutiveName })
        if (foundUser) {
            salesExecutiveEmail = foundUser.email
        }
     
        const updatedUser = await Booking.findOneAndUpdate({ bookingId }, {leadId  , bookingDate, date , project, propertyType , salesExecutiveEmail ,  salesExecutiveName ,  status , notes}, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(400).send("Site visit not updated");
        }
        return res.status(200).send("Site visit updated successfully");

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send(`Internal server error: ${error.message}`);
    }
});


//lead delete
router.post("/delete",async (req, res) => {

    console.log("check whats coming in body delete...", req.body)
    const siteVisitId = req.body.bookingId;
    
    // console.log("site visit id" , siteVisitId)

    try {
        const foundUser = await Booking.findOne({ bookingId : bookingId })
        

        // console.log("found site visit" , foundUser)

        if (!foundUser) return res.status(400).send("booking not found!")
        const deletedUser = await Sitevisit.findOneAndDelete({ siteVisitId });
        if (!deletedUser) {
            return res.status(400).send(`booking not deleted!`);
        }
        return res.status(200).send("booking Deleted successfully");
    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error.message}`);
    }
});


module.exports = router
