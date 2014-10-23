var mongoose = require('mongoose');

var SubstanceSchema = new mongoose.Schema({
    fhirType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    description: String,
    status: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    instance: {
        identifier: {
            use: String,
            label: String,
            system: String,
            value: String
        },
        expiry: Date,
        quantity: {
            value: String,
            units: String,
            system: String,
            code: String
        }
    },
    ingredient: [{
        quantity: {
        },
        substance: {
            reference: String,
            display: String
        }
    }]
});

mongoose.model('Substance', SubstanceSchema);
