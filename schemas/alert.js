var mongoose = require('mongoose');

var AlertSchema = new mongoose.Schema({
    category: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    status: String,
    subject: {
        reference: String,
        display: String
    },
    author: {
        reference: String,
        display: String
    },
    note: String,
});

mongoose.model('Alert', AlertSchema);
