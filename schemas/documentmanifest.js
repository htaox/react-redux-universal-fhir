var mongoose = require('mongoose');

var DocumentManifestSchema = new mongoose.Schema({
    masterIdentifier: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    subject: [{
        reference: String,
        display: String
    }],
    recipient: [{
        reference: String,
        display: String
    }],
    fhirType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    author: [{
        reference: String,
        display: String
    }],
    created: Date,
    source: String,
    status: String,
    supercedes: {
        reference: String,
        display: String
    },
    description: String,
    confidentiality: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    content: [{
        reference: String,
        display: String
    }]
});

mongoose.model('DocumentManifest', DocumentManifestSchema);
