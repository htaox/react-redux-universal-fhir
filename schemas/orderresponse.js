var mongoose = require('mongoose');

var OrderResponseSchema = new mongoose.Schema({
    request: {
        reference: String,
        display: String
    },
    date: Date,
    who: {
        reference: String,
        display: String
    },
    authority: {
        reference: String,
        display: String
    },
    cost: {
    },
    code: String,
    description: String,
    fulfillment: [{
        reference: String,
        display: String
    }]
});

mongoose.model('OrderResponse', OrderResponseSchema);
