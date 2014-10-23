var mongoose = require('mongoose');

var SupplySchema = new mongoose.Schema({
    name: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    identifier: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    status: String,
    orderedItem: {
        reference: String,
        display: String
    },
    patient: {
        reference: String,
        display: String
    },
    dispense: [{
        identifier: {
            use: String,
            label: String,
            system: String,
            value: String
        },
        status: String,
        fhirType: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        quantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        suppliedItem: {
            reference: String,
            display: String
        },
        supplier: {
            reference: String,
            display: String
        },
        whenPrepared: {
        },
        whenHandedOver: {
        },
        destination: {
            reference: String,
            display: String
        },
        receiver: [{
            reference: String,
            display: String
        }]
    }]
});

mongoose.model('Supply', SupplySchema);
