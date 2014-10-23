var mongoose = require('mongoose');

var MedicationPrescriptionSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    dateWritten: Date,
    status: String,
    patient: {
        reference: String,
        display: String
    },
    prescriber: {
        reference: String,
        display: String
    },
    encounter: {
        reference: String,
        display: String
    },
    reasonForPrescribing: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    medication: {
        reference: String,
        display: String
    },
    dosageInstruction: [{
        dosageInstructionsText: String,
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
        doseQuantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        rate: {
        },
        maxDosePerPeriod: {
        }
    }],
    dispense: {
        medication: {
            reference: String,
            display: String
        },
        validityPeriod: {
        },
        numberOfRepeatsAllowed: Number,
        quantity: {
            value: String,
            units: String,
            system: String,
            code: String
        },
        expectedSupplyDuration: {
        }
    },
    substitution: {
        fhirType: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        reason: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }
    }
});

mongoose.model('MedicationPrescription', MedicationPrescriptionSchema);
