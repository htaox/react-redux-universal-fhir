var mongoose = require('mongoose');

var DeviceSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    fhirType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    manufacturer: String,
    model: String,
    version: String,
    expiry: Date,
    udi: String,
    lotNumber: String,
    owner: {
        reference: String,
        display: String
    },
    location: {
        reference: String,
        display: String
    },
    patient: {
        reference: String,
        display: String
    },
    contact: [{
    }],
    url: String,
});

mongoose.model('Device', DeviceSchema);
