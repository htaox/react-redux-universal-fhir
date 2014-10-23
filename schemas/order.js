var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    date: Date,
    subject: {
        reference: String,
        display: String
    },
    source: {
        reference: String,
        display: String
    },
    target: {
        reference: String,
        display: String
    },
    reason: String,
    authority: {
        reference: String,
        display: String
    },
    when: {
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        schedule: {
        }
    },
    detail: [{
        reference: String,
        display: String
    }]
});

mongoose.model('Order', OrderSchema);
