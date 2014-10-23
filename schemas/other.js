var mongoose = require('mongoose');

var OtherSchema = new mongoose.Schema({
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
    author: {
        reference: String,
        display: String
    },
    created: Date,
});

mongoose.model('Other', OtherSchema);
