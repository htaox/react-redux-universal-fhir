var mongoose = require('mongoose');

var OrganizationSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    name: String,
    fhirType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    telecom: [{
    }],
    address: [{
    }],
    partOf: {
        reference: String,
        display: String
    },
    contact: [{
        purpose: {
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
        address: {
        },
        gender: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }
    }],
    location: [{
        reference: String,
        display: String
    }],
    active: Boolean,
});

mongoose.model('Organization', OrganizationSchema);
