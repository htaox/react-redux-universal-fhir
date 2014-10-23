var mongoose = require('mongoose');

var ImmunizationRecommendationSchema = new mongoose.Schema({
    subject: {
        reference: String,
        display: String
    },
    recommendation: [{
        recommendationDate: Date,
        vaccineType: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        doseNumber: Number,
        forecastStatus: String,
        dateCriterion: [{
            code: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            value: Date,
        }],
        protocol: {
            doseSequence: Number,
            description: String,
            authority: {
                reference: String,
                display: String
            },
            series: String,
        },
        supportingImmunization: [{
            reference: String,
            display: String
        }],
        supportingAdverseEventReport: [{
            identifier: [{
            }],
            reportType: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            reportDate: Date,
            text: String,
            reaction: [{
                reference: String,
                display: String
            }]
        }],
        supportingPatientObservation: [{
            reference: String,
            display: String
        }]
    }]
});

mongoose.model('ImmunizationRecommendation', ImmunizationRecommendationSchema);
