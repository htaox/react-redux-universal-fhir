var mongoose = require('mongoose');

var FamilyHistorySchema = new mongoose.Schema({
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
    note: String,
    relation: [{
        name: String,
        relationship: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        bornPeriod: {
        },
        bornDate: Date,
        bornString: String,
        deceasedBoolean: Boolean,
        deceasedAge: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        deceasedRange: {
        },
        deceasedDate: Date,
        deceasedString: String,
        note: String,
        condition: [{
            fhirType: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            outcome: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            onsetAge: {
                value: String,
                units: String,
                system: String,
                code: String
            },
            onsetRange: {
            },
            onsetString: String,
            note: String,
        }]
    }]
});

mongoose.model('FamilyHistory', FamilyHistorySchema);
