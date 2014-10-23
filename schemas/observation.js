var mongoose = require('mongoose');

var ObservationSchema = new mongoose.Schema({
    name: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    valueQuantity: {
        value: String,
        units: String,
        system: String,
        code: String
    },
    valueCodeableConcept: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    valueAttachment: {
    },
    valueRatio: {
    },
    valuePeriod: {
    },
    valueSampledData: {
    },
    valueString: String,
    interpretation: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    comments: String,
    appliesPeriod: {
    },
    appliesDateTime: Date,
    issued: Date,
    status: String,
    reliability: String,
    bodySite: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    method: {
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
    subject: {
        reference: String,
        display: String
    },
    performer: {
        reference: String,
        display: String
    },
    referenceRange: [{
        meaning: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        rangeQuantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        rangeRange: {
        },
        rangeString: String,
    }],
    component: [{
        name: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        valueQuantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        valueCodeableConcept: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        valueAttachment: {
        },
        valueRatio: {
        },
        valuePeriod: {
        },
        valueSampledData: {
        },
        valueString: String,
    }]
});

mongoose.model('Observation', ObservationSchema);
