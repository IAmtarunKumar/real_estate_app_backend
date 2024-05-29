const express = require("express")
const MiddleWares = require("./extra.js")
const app = express()
MiddleWares(app)
const dotenv = require("dotenv")
dotenv.config()
const Db = require("./db.js")


const userRouter = require("./routes/userRoute.js")
const leadRouter = require("./routes/leadRoute.js")
const dashboardRouter = require("./routes/dashboardRoute.js")


const Login = require("./Login")

const testRouter = require("./routes/testRoute.js")


app.use(express.json())
const bodyParser = require("body-parser")
const taskRouter = require("./routes/taskRoute.js")
const siteVisitRouter = require("./routes/siteVisitRoute.js")

///
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

////
app.get("/", async(req,res)=>{
    try{
    return res.status(200).send(`Welcome`)
    }catch(error){
        console.log(error.message)
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})
////

//
app.use("/user", userRouter)
app.use("/lead", leadRouter)
app.use("/dashboard", dashboardRouter)
app.use("/task" , taskRouter)
app.use("/sitevisit" , siteVisitRouter)


app.use("/test" , testRouter)


//
app.post("/login", async (req, res) => {
  Login(req, res);
});
//


Db()
let port = process.env.port || 5000
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
