var mongoose = require('mongoose');

var CompositionSchema = new mongoose.Schema({
    identifier: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    instant: Date,
    fhirType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    class: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    title: String,
    status: String,
    confidentiality: {
        system: String,
        code: String,
        display: String
    },
    subject: {
        reference: String,
        display: String
    },
    author: [{
        reference: String,
        display: String
    }],
    attester: [{
        mode: String,
        time: Date,
        party: {
            reference: String,
            display: String
        }
    }],
    custodian: {
        reference: String,
        display: String
    },
    event: {
        code: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        period: {
        },
        detail: [{
            reference: String,
            display: String
        }]
    },
    encounter: {
        reference: String,
        display: String
    },
    section: [{
        code: {
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
        content: {
            reference: String,
            display: String
        },
        section: [{
        }]
    }]
});

mongoose.model('Composition', CompositionSchema);
