var mongoose = require('mongoose');

var ConditionSchema = new mongoose.Schema({
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
    encounter: {
        reference: String,
        display: String
    },
    asserter: {
        reference: String,
        display: String
    },
    dateAsserted: Date,
    code: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    category: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    status: String,
    certainty: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    severity: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    onsetDate: Date,
    onsetAge: {
        value: String,
        units: String,
        system: String,
        code: String
    },
    abatementDate: Date,
    abatementAge: {
        value: String,
        units: String,
        system: String,
        code: String
    },
    abatementBoolean: Boolean,
    stage: {
        summary: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        assessment: [{
            reference: String,
            display: String
        }]
    },
    evidence: [{
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        detail: [{
            reference: String,
            display: String
        }]
    }],
    location: [{
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        detail: String,
    }],
    relatedItem: [{
        fhirType: String,
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        target: {
            reference: String,
            display: String
        }
    }],
    notes: String,
});

mongoose.model('Condition', ConditionSchema);
