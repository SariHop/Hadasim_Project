const { PersonDetailsModel, PersonDetailsValid } = require("../models/personalDetailsModel");


const getAll = async (req, res) => {
    // get all the data from person_details
    try {
        const personalDetails = await PersonDetailsModel.find().populate('coronaDetails');
        res.send(personalDetails);
    } catch (err) {
        res.status(500).send(err);
    }
}


const create = async (req, res) => {
    // validate the body input
    const valdiateBody = PersonDetailsValid(req.body);
    if (valdiateBody.error) {
        return res.status(400).json(valdiateBody.error.details);
    }

    // create new obgect
    const newInMongo = new PersonDetailsModel(req.body);
    try {
        // save it in mongo
        const savepersonalDetails = await newInMongo.save();
        res.send(savepersonalDetails);
    } catch (err) {
        res.status(500).send(err);
    }
}


// Controller function to get the number of אhe people who are not vaccinated
const countUnvaccinatedMembers = async (req, res) => {
    try {

        const vaccinationArrey = await PersonDetailsModel.find({}, "coronaDetails").populate('coronaDetails', 'vaccination')
        // .countDocuments({ 'coronaDetails.vaccination.0': { $exists: false } })

        console.log(vaccinationArrey);
        console.log(vaccinationArrey[0]);

        res.status(200).send(vaccinationArrey); //return the vaccination arrey from coronaDetails

    } catch (err) {
        res.status(500).send(err);
    }
};


// Controller function to get the number of active patients each day in the last month
// This is my attempt to display statistical data, the functions are incomplete
const getActivePatientsLastMonth = async (req, res) => {

    try {

        const today = new Date();
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const rangeDate = await PersonDetailsModel.find({}, { coronaDetails: 1 }).populate('coronaDetails', 'InformationDates')
        // {recoveryDate:{"$gte":oneMonthAgo}}

        res.status(200).send(rangeDate); //return the InformationDates obgect from coronaDetails

    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { getAll, create, countUnvaccinatedMembers, getActivePatientsLastMonth };
