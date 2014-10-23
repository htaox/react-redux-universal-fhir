var mongoose = require('mongoose');

var DiagnosticReportSchema = new mongoose.Schema({
    status: String,
    issued: Date,
    subject: {
        reference: String,
        display: String
    },
    performer: {
        reference: String,
        display: String
    },
    reportId: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    requestDetail: [{
        encounter: {
            reference: String,
            display: String
        },
        requestOrderId: {
            use: String,
            label: String,
            system: String,
            value: String
        },
        receiverOrderId: {
            use: String,
            label: String,
            system: String,
            value: String
        },
        requestTest: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        bodySite: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        requester: {
            reference: String,
            display: String
        },
        clinicalInfo: String,
    }],
    serviceCategory: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    diagnosticDateTime: Date,
    diagnosticPeriod: {
    },
    results: {
        name: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        specimen: {
            reference: String,
            display: String
        },
        group: [{
        }],
        result: [{
            reference: String,
            display: String
        }]
    },
    image: [{
        reference: String,
        display: String
    }],
    conclusion: String,
    codedDiagnosis: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    representation: [{
    }]
});

mongoose.model('DiagnosticReport', DiagnosticReportSchema);
