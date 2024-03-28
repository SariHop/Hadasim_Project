const express = require("express")
const { uploud } = require("../controller/imageController")

const router = express.Router()

router.post("/", uploud)

module.exports = router