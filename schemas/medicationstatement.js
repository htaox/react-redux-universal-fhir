var mongoose = require('mongoose');

var MedicationStatementSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    patient: {
        reference: String,
        display: String
    },
    wasNotGiven: Boolean,
    reasonNotGiven: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    whenGiven: {
    },
    medication: {
        reference: String,
        display: String
    },
    administrationDevice: [{
        reference: String,
        display: String
    }],
    dosage: [{
        timing: {
        },
        site: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        route: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        method: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        quantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        rate: {
        },
        maxDosePerPeriod: {
        }
    }]
});

mongoose.model('MedicationStatement', MedicationStatementSchema);
