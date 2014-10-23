var mongoose = require('mongoose');

var ImmunizationSchema = new mongoose.Schema({
    date: Date,
    vaccineType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    subject: {
        reference: String,
        display: String
    },
    refusedIndicator: Boolean,
    reported: Boolean,
    performer: {
        reference: String,
        display: String
    },
    requester: {
        reference: String,
        display: String
    },
    manufacturer: {
        reference: String,
        display: String
    },
    location: {
        reference: String,
        display: String
    },
    lotNumber: String,
    expirationDate: Date,
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
    doseQuantity: {
        value: String,
        units: String,
        system: String,
        code: String
    },
    explanation: {
        reason: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        refusalReason: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }]
    },
    reaction: [{
        date: Date,
        detail: {
            reference: String,
            display: String
        },
        reported: Boolean,
    }],
    vaccinationProtocol: {
        doseSequence: Number,
        description: String,
        authority: {
            reference: String,
            display: String
        },
        series: String,
        seriesDoses: Number,
        doseTarget: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        doseStatus: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        doseStatusReason: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }
    }
});

mongoose.model('Immunization', ImmunizationSchema);
