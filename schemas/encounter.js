var mongoose = require('mongoose');

var EncounterSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    status: String,
    class: String,
    fhirType: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    subject: {
        reference: String,
        display: String
    },
    participant: [{
        fhirType: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        individual: {
            reference: String,
            display: String
        }
    }],
    period: {
    },
    length: {
    },
    reason: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    indication: {
        reference: String,
        display: String
    },
    priority: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    hospitalization: {
        preAdmissionIdentifier: {
            use: String,
            label: String,
            system: String,
            value: String
        },
        origin: {
            reference: String,
            display: String
        },
        admitSource: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        period: {
        },
        accomodation: [{
            bed: {
                reference: String,
                display: String
            },
            period: {
            }
        }],
        diet: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        specialCourtesy: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        specialArrangement: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        destination: {
            reference: String,
            display: String
        },
        dischargeDisposition: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        dischargeDiagnosis: {
            reference: String,
            display: String
        },
        reAdmission: Boolean,
    },
    location: [{
        location: {
            reference: String,
            display: String
        },
        period: {
        }
    }],
    serviceProvider: {
        reference: String,
        display: String
    },
    partOf: {
        reference: String,
        display: String
    }
});

mongoose.model('Encounter', EncounterSchema);
