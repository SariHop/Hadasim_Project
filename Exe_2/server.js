const express = require('express')
const bodyParser = require("body-parser")
const cors =require('cors')
const fileUpload = require("express-fileupload");

const personalDetails =require("./routing/personaldetailsRouter")
const coronaDetails =require("./routing/coronaDetailsRouter")
const uploud = require('./routing/imageRouter')

// conect DB
require("./db/conect")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload({
    limits: { fileSize: 1024 * 1024 * 5}
}))

// routes
app.use("/personalDetails", personalDetails)
app.use("/coronaDetails", coronaDetails)
app.use("/image", uploud)

// run the srver at "localhost:8080"
app.listen(8080, () => {
    console.log("server is running")
}
)