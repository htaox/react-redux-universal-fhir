var mongoose = require('mongoose');

var ConceptMapSchema = new mongoose.Schema({
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
    date: Date,
    source: {
        reference: String,
        display: String
    },
    target: {
        reference: String,
        display: String
    },
    concept: [{
        name: String,
        system: String,
        code: String,
        map: [{
            system: String,
            code: String,
            equivalence: String,
            comments: String,
        }],
        concept: [{
        }]
    }]
});

mongoose.model('ConceptMap', ConceptMapSchema);
