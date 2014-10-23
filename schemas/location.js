var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    name: String,
    description: String,
    fhirType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    telecom: {
    },
    address: {
    },
    physicalType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    position: {
        longitude: Number,
        latitude: Number,
        altitude: Number,
    },
    managingOrganization: {
        reference: String,
        display: String
    },
    status: String,
    partOf: {
        reference: String,
        display: String
    },
    mode: String,
});

mongoose.model('Location', LocationSchema);
