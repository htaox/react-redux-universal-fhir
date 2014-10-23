var mongoose = require('mongoose');

var ImagingStudySchema = new mongoose.Schema({
    dateTime: Date,
    subject: {
        reference: String,
        display: String
    },
    uid: {
    },
    accessionNo: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    order: [{
        reference: String,
        display: String
    }],
    modality: String,
    referrer: {
        reference: String,
        display: String
    },
    availability: String,
    url: String,
    numberOfSeries: Number,
    numberOfInstances: Number,
    clinicalInformation: String,
    procedure: [{
        system: String,
        code: String,
        display: String
    }],
    interpreter: {
        reference: String,
        display: String
    },
    description: String,
    series: [{
        number: Number,
        modality: String,
        uid: {
        },
        description: String,
        numberOfInstances: Number,
        availability: String,
        url: String,
        bodySite: {
            system: String,
            code: String,
            display: String
        },
        dateTime: Date,
        instance: [{
            number: Number,
            uid: {
            },
            sopclass: {
            },
            fhirType: String,
            title: String,
            url: String,
            attachment: {
                reference: String,
                display: String
            }
        }]
    }]
});

mongoose.model('ImagingStudy', ImagingStudySchema);
