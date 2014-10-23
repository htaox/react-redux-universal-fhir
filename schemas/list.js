var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
    code: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    subject: {
        reference: String,
        display: String
    },
    source: {
        reference: String,
        display: String
    },
    date: Date,
    ordered: Boolean,
    mode: String,
    entry: [{
        flag: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        deleted: Boolean,
        date: Date,
        item: {
            reference: String,
            display: String
        }
    }],
    emptyReason: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }
});

mongoose.model('List', ListSchema);
