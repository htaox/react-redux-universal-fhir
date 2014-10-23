var mongoose = require('mongoose');

var RelatedPersonSchema = new mongoose.Schema({
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
    relationship: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    name: {
        use: String,
        text: String,
        family: [String],
        given: [String],
        prefix: [String],
        suffix: [String]
    },
    telecom: [{
    }],
    gender: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    address: {
    },
    photo: [{
    }]
});

mongoose.model('RelatedPerson', RelatedPersonSchema);
