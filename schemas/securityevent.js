var mongoose = require('mongoose');

var SecurityEventSchema = new mongoose.Schema({
    event: {
        fhirType: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        subtype: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        action: String,
        dateTime: Date,
        outcome: String,
        outcomeDesc: String,
    },
    participant: [{
        role: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        reference: {
            reference: String,
            display: String
        },
        userId: String,
        altId: String,
        name: String,
        requestor: Boolean,
        media: {
            system: String,
            code: String,
            display: String
        },
        network: {
            identifier: String,
            fhirType: String,
        }
    }],
    source: {
        site: String,
        identifier: String,
        fhirType: [{
            system: String,
            code: String,
            display: String
        }]
    },
    object: [{
        identifier: {
            use: String,
            label: String,
            system: String,
            value: String
        },
        reference: {
            reference: String,
            display: String
        },
        fhirType: String,
        role: String,
        lifecycle: String,
        sensitivity: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        name: String,
        description: String,
        query: {
        },
        detail: [{
            fhirType: String,
            value: {
            }
        }]
    }]
});

mongoose.model('SecurityEvent', SecurityEventSchema);
