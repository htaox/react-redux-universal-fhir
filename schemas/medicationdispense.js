var mongoose = require('mongoose');

var MedicationDispenseSchema = new mongoose.Schema({
    identifier: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    status: String,
    patient: {
        reference: String,
        display: String
    },
    dispenser: {
        reference: String,
        display: String
    },
    authorizingPrescription: [{
        reference: String,
        display: String
    }],
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
        medication: {
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
        }],
        dosage: [{
            additionalInstructions: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            timingDateTime: Date,
            timingPeriod: {
            },
            timingSchedule: {
            },
            site: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            route: {
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
            quantity: {
                value: String,
                units: String,
                system: String,
                code: String
            },
            rate: {
            },
            maxDosePerPeriod: {
            }
        }]
    }],
    substitution: {
        fhirType: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        reason: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        responsibleParty: [{
            reference: String,
            display: String
        }]
    }
});

mongoose.model('MedicationDispense', MedicationDispenseSchema);
