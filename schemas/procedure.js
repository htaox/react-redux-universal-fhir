var mongoose = require('mongoose');

var ProcedureSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    subject: {
        reference: String,
        display: String
    },
    fhirType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    bodySite: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    indication: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    performer: [{
        person: {
            reference: String,
            display: String
        },
        role: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }
    }],
    date: {
    },
    encounter: {
        reference: String,
        display: String
    },
    outcome: String,
    report: [{
        reference: String,
        display: String
    }],
    complication: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    followUp: String,
    relatedItem: [{
        fhirType: String,
        target: {
            reference: String,
            display: String
        }
    }],
    notes: String,
});

mongoose.model('Procedure', ProcedureSchema);
