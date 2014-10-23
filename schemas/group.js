var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    identifier: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    fhirType: String,
    actual: Boolean,
    code: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    name: String,
    quantity: Number,
    characteristic: [{
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        valueCodeableConcept: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        valueBoolean: Boolean,
        valueQuantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        valueRange: {
        },
        exclude: Boolean,
    }],
    member: [{
        reference: String,
        display: String
    }]
});

mongoose.model('Group', GroupSchema);
