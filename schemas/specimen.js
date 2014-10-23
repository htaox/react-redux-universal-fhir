var mongoose = require('mongoose');

var SpecimenSchema = new mongoose.Schema({
    identifier: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    fhirType: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    source: [{
        relationship: String,
        target: [{
            reference: String,
            display: String
        }]
    }],
    subject: {
        reference: String,
        display: String
    },
    accessionIdentifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    receivedTime: Date,
    fhirCollection: {
        collector: {
            reference: String,
            display: String
        },
        comment: String,
        collectedTime: Date,
        quantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        method: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        sourceSite: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }
    },
    treatment: [{
        description: String,
        procedure: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        additive: [{
            reference: String,
            display: String
        }]
    }],
    container: [{
        identifier: [{
            use: String,
            label: String,
            system: String,
            value: String
        }],
        description: String,
        fhirType: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        capacity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        specimenQuantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        additive: {
            reference: String,
            display: String
        }
    }]
});

mongoose.model('Specimen', SpecimenSchema);
