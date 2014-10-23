var mongoose = require('mongoose');

var ValueSetSchema = new mongoose.Schema({
    identifier: String,
    version: String,
    name: String,
    publisher: String,
    telecom: [{
    }],
    description: String,
    copyright: String,
    status: String,
    experimental: Boolean,
    extensible: Boolean,
    date: Date,
    define: {
        system: String,
        version: String,
        caseSensitive: Boolean,
        concept: [{
            code: String,
            abstract: Boolean,
            display: String,
            definition: String,
            concept: [{
            }]
        }]
    },
    compose: {
        import: String,
        include: [{
            system: String,
            version: String,
            code: String,
            filter: [{
                property: String,
                op: String,
                value: String,
            }]
        }],
        exclude: [{
        }]
    },
    expansion: {
        identifier: {
            use: String,
            label: String,
            system: String,
            value: String
        },
        timestamp: Date,
        contains: [{
            system: String,
            code: String,
            display: String,
            contains: [{
            }]
        }]
    }
});

mongoose.model('ValueSet', ValueSetSchema);
