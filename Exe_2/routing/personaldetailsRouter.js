const express =require("express")

const Controler = require("../controller/personDetailController")

const router = express.Router()

router.get('/unvaccinated', Controler.countUnvaccinatedMembers)
router.get('/lastmonthactive', Controler.getActivePatientsLastMonth);
router.get('/getAll', Controler.getAll)
router.post('/create', Controler.create)

module.exports= router