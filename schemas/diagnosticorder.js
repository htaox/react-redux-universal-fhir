var mongoose = require('mongoose');

var DiagnosticOrderSchema = new mongoose.Schema({
    subject: {
        reference: String,
        display: String
    },
    orderer: {
        reference: String,
        display: String
    },
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    encounter: {
        reference: String,
        display: String
    },
    clinicalNotes: String,
    specimen: [{
        reference: String,
        display: String
    }],
    status: String,
    priority: String,
    event: [{
        status: String,
        date: Date,
        actor: {
            reference: String,
            display: String
        }
    }],
    item: [{
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        specimen: [{
            reference: String,
            display: String
        }],
        bodySite: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        status: String,
        event: [{
        }]
    }]
});

mongoose.model('DiagnosticOrder', DiagnosticOrderSchema);
