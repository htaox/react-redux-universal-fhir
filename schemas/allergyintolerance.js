var mongoose = require('mongoose');

var AllergyIntoleranceSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    criticality: String,
    sensitivityType: String,
    recordedDate: Date,
    status: String,
    subject: {
        reference: String,
        display: String
    },
    recorder: {
        reference: String,
        display: String
    },
    substance: {
        reference: String,
        display: String
    },
    reaction: [{
        reference: String,
        display: String
    }],
    sensitivityTest: [{
        reference: String,
        display: String
    }]
});

mongoose.model('AllergyIntolerance', AllergyIntoleranceSchema);
