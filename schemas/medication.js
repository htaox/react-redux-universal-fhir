var mongoose = require('mongoose');

var MedicationSchema = new mongoose.Schema({
    name: String,
    code: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    isBrand: Boolean,
    manufacturer: {
        reference: String,
        display: String
    },
    kind: String,
    product: {
        form: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        ingredient: [{
            item: {
                reference: String,
                display: String
            },
            amount: {
            }
        }]
    },
    package: {
        container: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        content: [{
            item: {
                reference: String,
                display: String
            },
            amount: {
                value: String,
                units: String,
                system: String,
                code: String
            }
        }]
    }
});

mongoose.model('Medication', MedicationSchema);
