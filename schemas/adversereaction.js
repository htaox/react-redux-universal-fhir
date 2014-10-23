var mongoose = require('mongoose');

var AdverseReactionSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    reactionDate: Date,
    subject: {
        reference: String,
        display: String
    },
    didNotOccurFlag: Boolean,
    recorder: {
        reference: String,
        display: String
    },
    symptom: [{
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        severity: String,
    }],
    exposure: [{
        exposureDate: Date,
        exposureType: String,
        causalityExpectation: String,
        substance: {
            reference: String,
            display: String
        }
    }]
});

mongoose.model('AdverseReaction', AdverseReactionSchema);
