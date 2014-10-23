var mongoose = require('mongoose');

var PractitionerSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
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
    address: {
    },
    gender: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    birthDate: Date,
    photo: [{
    }],
    organization: {
        reference: String,
        display: String
    },
    role: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    specialty: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    period: {
    },
    location: [{
        reference: String,
        display: String
    }],
    qualification: [{
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        period: {
        },
        issuer: {
            reference: String,
            display: String
        }
    }],
    communication: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }]
});

mongoose.model('Practitioner', PractitionerSchema);
