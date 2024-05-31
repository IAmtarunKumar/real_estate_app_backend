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
router.get("/get", async (req, res) => {
    try {

        //array ke andar object aayega or iss object me lead Id
        let sitevisits = await Sitevisit.find()
        let leads = await Lead.find()
        var modifiedSiteVisits = [];

        var leadsObject = {}
        leads.forEach((lead) => {
            leadsObject[lead.leadId] = lead
        })
        // console.log(leadsObject) // leadObject

        // console.log(leadsObject["531863"].name) // sd

        for (var i = 0; i < sitevisits.length; i++) {
            var id = sitevisits[i].leadId;
            // console.log(leadsObject[id]);
            // sitevisits[i].leadDetails = leadsObject[id];
            modifiedSiteVisits.push({
                _id: sitevisits[i]._id,
                siteVisitId: sitevisits[i].siteVisitId,
                leadId: sitevisits[i].leadId,
                date: sitevisits[i].date,
                siteVisitDate: sitevisits[i].siteVisitDate,
                project: sitevisits[i].project,
                status: sitevisits[i].status,
                notes: sitevisits[i].notes,
                _v: sitevisits[i]._v,
                leadDetails: leadsObject[id]
            })
        }

        console.log("sitevisits", modifiedSiteVisits)


        return res.status(200).send(modifiedSiteVisits);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(`Internal server error: ${error.message}`);
    }
});

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

//site visit post....
router.post("/post", async (req, res) => {
    const {  leadId  ,siteVisitDate  , propertyType   , status , notes ,project } = req.body
    try {

        let id = await generateUniqueId()
    
        const postSiteVisit = new Sitevisit({
            siteVisitId : id,
            leadId,
            date : formattedDate ,
            project,
            propertyType,
            status,
            notes,
            siteVisitDate,
           
            project
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
    const { leadId , siteVisitId ,siteVisitDate ,  project , date , propertyType   , status , notes } = req.body


    try {

    
     
        const updatedUser = await Sitevisit.findOneAndUpdate({ siteVisitId }, {leadId , siteVisitDate, date , project, propertyType  ,  status , notes}, {
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
