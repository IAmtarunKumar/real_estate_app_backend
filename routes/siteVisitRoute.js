const express = require("express")
const Sitevisit = require("../models/siteVisit")
const formattedDate = require("../function/formatedDate")
const generateUniqueId = require("../function/uniqueId")
const verifyToken = require("../middleware/auth")
const Lead = require("../models/lead")
const router =  express.Router()

router.get("/" , async(req,res)=>{
    try {
        return res.status(200).send("site visit route working fine") 
    } catch (error) {
        console.log("error:" ,error)
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})


//get all site visit
router.get("/get",verifyToken,async (req, res) => {
    try {
        const allLead = await Sitevisit.find()
        return res.status(200).send(allLead)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})

//get sitevisit by id

router.post("/siteVisitById",verifyToken, async (req, res) => {
    try {
        const leadId = req.body.leadId
        const allLead = await Sitevisit.findOne({ leadId })
        return res.status(200).send(allLead)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})

//site visit post
router.post("/post", verifyToken, async (req, res) => {
    const {  leadId  ,siteVisitDate  , propertyType   , status , notes } = req.body
    try {

        let leadDetails = await Lead.findOne({leadId})
        let {name , email ,salesExecutiveEmail , salesExecutiveName , project  } = leadDetails

        let id = await generateUniqueId()
    
        const postSiteVisit = new Sitevisit({
            siteVisitId : id,
            name,
            email,
            leadId,
            date : formattedDate ,
            project,
            propertyType,
            salesExecutiveEmail,
            salesExecutiveName,
            status,
            notes,
            siteVisitDate
        })
        await postSiteVisit.save()
        return res.status(200).send("Site visit posted successfully")
        
    } catch (error) {
        console.log("error  : " , error)
        return res.status(500).send(`Internal server error ${error.message}`)
    }

  
});


//lead update
router.post("/update",verifyToken, async (req, res) => {
    console.log("site visit update api calling", req.body)
    const { leadId , siteVisitId ,siteVisitDate, date ,  project , propertyType , salesExecutiveEmail , salesExecutiveName  , status , notes } = req.body


    try {

        let foundUser = await User.findOne({ "name": salesExecutiveName })
        if (foundUser) {
            salesExecutiveEmail = foundUser.email
        }
     
        const updatedUser = await Sitevisit.findOneAndUpdate({ siteVisitId }, {leadId , siteVisitDate, date , project, propertyType , salesExecutiveEmail ,  salesExecutiveName ,  status , notes}, {
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
    const siteVisitId = req.body.siteVisitId;
    

    
    console.log("site visit id" , siteVisitId)

    try {
        const foundUser = await Sitevisit.findOne({ siteVisitId : siteVisitId })
        

        console.log("found site visit" , foundUser)

        if (!foundUser) return res.status(400).send("Site visit not found!")
        const deletedUser = await Sitevisit.findOneAndDelete({ siteVisitId });
        if (!deletedUser) {
            return res.status(400).send(`Site visit not deleted!`);
        }
        return res.status(200).send("Site visit Deleted successfully");
    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error.message}`);
    }
});


module.exports = router
