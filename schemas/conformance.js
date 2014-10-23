var mongoose = require('mongoose');

var ConformanceSchema = new mongoose.Schema({
    identifier: String,
    version: String,
    name: String,
    publisher: String,
    telecom: [{
    }],
    description: String,
    status: String,
    experimental: Boolean,
    date: Date,
    software: {
        name: String,
        version: String,
        releaseDate: Date,
    },
    implementation: {
        description: String,
        url: String,
    },
    fhirVersion: {
    },
    acceptUnknown: Boolean,
    format: String,
    profile: [{
        reference: String,
        display: String
    }],
    rest: [{
        mode: String,
        documentation: String,
        security: {
            cors: Boolean,
            service: [{
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            }],
            description: String,
            certificate: [{
                fhirType: String,
                blob: {
                }
            }]
        },
        resource: [{
            fhirType: String,
            profile: {
                reference: String,
                display: String
            },
            operation: [{
                code: String,
                documentation: String,
            }],
            readHistory: Boolean,
            updateCreate: Boolean,
            searchInclude: String,
            searchParam: [{
                name: String,
                source: String,
                fhirType: String,
                documentation: String,
                xpath: String,
                target: String,
                chain: String,
            }]
        }],
        operation: [{
            code: String,
            documentation: String,
        }],
        query: [{
            name: String,
            documentation: String,
            parameter: [{
            }]
        }],
        documentMailbox: String,
    }],
    messaging: [{
        endpoint: String,
        reliableCache: Number,
        documentation: String,
        event: [{
            code: {
                system: String,
                code: String,
                display: String
            },
            category: String,
            mode: String,
            protocol: [{
                system: String,
                code: String,
                display: String
            }],
            focus: String,
            request: {
                reference: String,
                display: String
            },
            response: {
                reference: String,
                display: String
            },
            documentation: String,
        }]
    }],
    document: [{
        mode: String,
        documentation: String,
        profile: {
            reference: String,
            display: String
        }
    }]
});

mongoose.model('Conformance', ConformanceSchema);
