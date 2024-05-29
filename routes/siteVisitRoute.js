const express = require("express")
const Sitevisit = require("../models/siteVisit")
const formattedDate = require("../function/formatedDate")
const generateUniqueId = require("../function/uniqueId")
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
router.get("/get", async (req, res) => {
    try {
        const allLead = await Sitevisit.find()
        return res.status(200).send(allLead)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})

//get sitevisit by id

router.post("/siteVisitById", async (req, res) => {
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
    const {  leadId , date ,  project , propertyType , salesExecutiveEmail , salesExecutiveName  , status , notes } = req.body
    try {
        let id = await generateUniqueId()
    
        const postSiteVisit = new Sitevisit({
            siteVisitId : id,
            leadId,
            date : formattedDate ,
            project,
            propertyType,
            salesExecutiveEmail,
            salesExecutiveName,
            status,
            notes
        })
        await postSiteVisit.save()
        return res.status(200).send("Site visit posted successfully")
        
    } catch (error) {
        console.log("error  : " , error)
        return res.status(500).send(`Internal server error ${error.message}`)
    }

  
});




//lead update
router.post("/update", async (req, res) => {
    console.log("site visit update api calling", req.body)
    const { leadId , siteVisitId , date ,  project , propertyType , salesExecutiveEmail , salesExecutiveName  , status , notes } = req.body


    try {

        let foundUser = await User.findOne({ "name": salesExecutiveName })
        if (foundUser) {
            salesExecutiveEmail = foundUser.email
        }
     

        const updatedUser = await Sitevisit.findOneAndUpdate({ siteVisitId }, {leadId , date , project, propertyType , salesExecutiveEmail ,  salesExecutiveName ,  status , notes}, {
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
router.post("/delete", async (req, res) => {

    console.log("check whats coming in body delete", req.body)
    const leadId = req.body.leadId;
    try {
        const foundUser = await Sitevisit.findOne({ leadId })
        if (!foundUser) return res.status(400).send("Site visit not found!")
        const deletedUser = await Sitevisit.findOneAndDelete({ leadId });
        if (!deletedUser) {
            return res.status(400).send(`Site visit not deleted!`);
        }
        return res.status(200).send("Site visit Deleted successfully");
    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error.message}`);
    }
});







module.exports = router
