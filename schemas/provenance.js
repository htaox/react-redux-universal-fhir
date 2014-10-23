var mongoose = require('mongoose');

var ProvenanceSchema = new mongoose.Schema({
    target: [{
        reference: String,
        display: String
    }],
    period: {
    },
    recorded: Date,
    reason: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    location: {
        reference: String,
        display: String
    },
    policy: String,
    agent: [{
        role: {
            system: String,
            code: String,
            display: String
        },
        fhirType: {
            system: String,
            code: String,
            display: String
        },
        reference: String,
        display: String,
    }],
    entity: [{
        role: String,
        fhirType: {
            system: String,
            code: String,
            display: String
        },
        reference: String,
        display: String,
        agent: {
        }
    }],
    integritySignature: String,
});

mongoose.model('Provenance', ProvenanceSchema);
