const { coronaDetailsModel, coronaDetailsValid } = require("../models/coronaDetailsModel");


const getAll = async (req, res) => {
  // get all the data from corona_details
  try {
    const coronaDetails = await coronaDetailsModel.find();
    res.send(coronaDetails);
  } catch (err) {
    res.status(500).send(err);
  }
}


const create = async (req, res) => {
  // validate the body input
  const valdiateBody = coronaDetailsValid(req.body);
  if (valdiateBody.error) {
    return res.status(400).json(valdiateBody.error.details);
  }

  // create new obgect
  const newInMongo = new coronaDetailsModel(req.body);

  try {
    // save it in mongo
    const savedCoronaDetails = await newInMongo.save();
    res.send(savedCoronaDetails);
  } catch (err) {
    res.status(500).send(err);
  }
}


// const countUnvaccinatedMembers = async (req, res) => {
//   // 
//   try {
//     const unvaccinatedMembersCount = await coronaDetailsModel.countDocuments({ 'vaccination.0': { $exists: false } });
//     res.status(200).json({ count: unvaccinatedMembersCount });
//   } catch (error) {
//     console.error('Error counting unvaccinated members:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

module.exports = { getAll, create };
