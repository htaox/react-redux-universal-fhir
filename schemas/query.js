var mongoose = require('mongoose');

var QuerySchema = new mongoose.Schema({
    identifier: String,
    parameter: [{
    }],
    response: {
        identifier: String,
        outcome: String,
        total: Number,
        parameter: [{
        }],
        first: [{
        }],
        previous: [{
        }],
        next: [{
        }],
        last: [{
        }],
        reference: [{
            reference: String,
            display: String
        }]
    }
});

mongoose.model('Query', QuerySchema);
