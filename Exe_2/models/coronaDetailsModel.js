const mongoose = require('mongoose');
const Joi = require('joi');

// Define the corona details schema
const coronaDetailsSchema = new mongoose.Schema({
    vaccination: {
        type: [{
            dateReceived: Date,
            manufacturer: String
        }],
    },
    InformationDates: {
        positiveTestDate: Date,
        recoveryDate: Date,
    }

});

// Validate the body against Joi schema
exports.coronaDetailsValid = (_bodyValid) => {
    const joiSchema = Joi.object({
        vaccination: Joi.array().items(Joi.object({
            dateReceived: Joi.date().iso().required(),
            manufacturer: Joi.string().min(2).max(50).required()
        })).max(4).optional(),
        InformationDates: Joi.object({
            positiveTestDate: Joi.date().iso().required(),
            recoveryDate: Joi.date().iso().required()
        })
    });
    return joiSchema.validate(_bodyValid);
}

// Export the corona details model
exports.coronaDetailsModel = mongoose.model('Corona_Details', coronaDetailsSchema);
