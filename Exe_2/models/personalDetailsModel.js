const mongoose = require('mongoose');
const Joi = require("joi");

// Define the personaldetails schema
const personalDetailsSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    },
    idNumber: String,

    address: {
        city: String,
        street: String,
        numberBulding: String
    },
    birthDate: {
        type: Date,
    },
    Contact_details: {
        phone: String,
        mobilePhone: String
    },
    coronaDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corona_Details', // Refers to the CoronaDetails model
        required: true
    }
});

// Validate the body against Joi schema
exports.PersonDetailsValid = (_bodyValid) => {
    const joiSchema = Joi.object({
        name: Joi.object({
            firstName: Joi.string().min(2).max(50).required(),
            lastName: Joi.string().min(2).max(50).required()
        }),
        idNumber: Joi.string().regex(/^[0-9]+$/).required(),
        address: Joi.object({
            city: Joi.string().min(2).max(50).required(),
            street: Joi.string().min(2).max(100).required(),
            numberBulding: Joi.string().regex(/^[0-9]+$/).max(10).required()
        }),
        birthDate: Joi.date().iso().required(),
        Contact_details: Joi.object({
            phone: Joi.string().regex(/^\+?\d{1,4}\d{2,5}\d{6,8}$/),
            mobilePhone: Joi.string().regex(/^\+?\d{1,4}\d{2,5}\d{6,8}$/).required()
        }),
        coronaDetails: Joi.string().regex(/^[0-9a-fA-F]{24}$/) // Assuming ObjectId format
    });
    return joiSchema.validate(_bodyValid);
}

// Export the personal details model
exports.PersonDetailsModel = mongoose.model("Person_Details", personalDetailsSchema);

