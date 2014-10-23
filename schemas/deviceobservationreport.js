var mongoose = require('mongoose');

var DeviceObservationReportSchema = new mongoose.Schema({
    instant: Date,
    identifier: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    source: {
        reference: String,
        display: String
    },
    subject: {
        reference: String,
        display: String
    },
    virtualDevice: [{
        code: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        channel: [{
            code: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            metric: [{
                observation: {
                    reference: String,
                    display: String
                }
            }]
        }]
    }]
});

mongoose.model('DeviceObservationReport', DeviceObservationReportSchema);
