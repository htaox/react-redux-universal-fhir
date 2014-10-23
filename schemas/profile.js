var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
    identifier: String,
    version: String,
    name: String,
    publisher: String,
    telecom: [{
    }],
    description: String,
    code: [{
        system: String,
        code: String,
        display: String
    }],
    status: String,
    experimental: Boolean,
    date: Date,
    fhirVersion: {
    },
    mapping: [{
        identity: {
        },
        uri: String,
        name: String,
        comments: String,
    }],
    structure: [{
        fhirType: String,
        name: String,
        publish: Boolean,
        purpose: String,
        element: [{
            path: String,
            representation: String,
            name: String,
            slicing: {
                discriminator: {
                },
                ordered: Boolean,
                rules: String,
            },
            definition: {
                short: String,
                formal: String,
                comments: String,
                requirements: String,
                synonym: String,
                min: Number,
                max: String,
                fhirType: [{
                    code: String,
                    profile: String,
                    aggregation: String,
                }],
                nameReference: String,
                value: {
                },
                example: {
                },
                maxLength: Number,
                condition: [{
                }],
                constraint: [{
                    key: {
                    },
                    name: String,
                    severity: String,
                    human: String,
                    xpath: String,
                }],
                mustSupport: Boolean,
                isModifier: Boolean,
                binding: {
                    name: String,
                    isExtensible: Boolean,
                    conformance: String,
                    description: String,
                    referenceUri: String,
                    referenceResource: {
                        reference: String,
                        display: String
                    }
                },
                mapping: [{
                    identity: {
                    },
                    map: String,
                }]
            }
        }]
    }],
    extensionDefn: [{
        code: String,
        display: String,
        contextType: String,
        context: String,
        definition: {
        }
    }]
});

mongoose.model('Profile', ProfileSchema);
