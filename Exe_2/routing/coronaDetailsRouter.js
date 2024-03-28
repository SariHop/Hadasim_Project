const express =require("express")

const Controler = require("../controller/coronaDetailsController")

const router = express.Router()

router.get('/getAll', Controler.getAll)
router.post('/create', Controler.create)

module.exports= router