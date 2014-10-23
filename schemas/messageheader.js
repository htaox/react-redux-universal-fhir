var mongoose = require('mongoose');

var MessageHeaderSchema = new mongoose.Schema({
    identifier: {
    },
    timestamp: Date,
    event: {
        system: String,
        code: String,
        display: String
    },
    response: {
        identifier: {
        },
        code: String,
        details: {
            reference: String,
            display: String
        }
    },
    source: {
        name: String,
        software: String,
        version: String,
        contact: {
        },
        endpoint: String,
    },
    destination: [{
        name: String,
        target: {
            reference: String,
            display: String
        },
        endpoint: String,
    }],
    enterer: {
        reference: String,
        display: String
    },
    author: {
        reference: String,
        display: String
    },
    receiver: {
        reference: String,
        display: String
    },
    responsible: {
        reference: String,
        display: String
    },
    reason: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    data: [{
        reference: String,
        display: String
    }]
});

mongoose.model('MessageHeader', MessageHeaderSchema);
