var mongoose = require('mongoose');

var QuestionnaireSchema = new mongoose.Schema({
    status: String,
    authored: Date,
    subject: {
        reference: String,
        display: String
    },
    author: {
        reference: String,
        display: String
    },
    source: {
        reference: String,
        display: String
    },
    name: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    encounter: {
        reference: String,
        display: String
    },
    group: {
        name: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        header: String,
        text: String,
        ordered: Boolean,
        subject: {
            reference: String,
            display: String
        },
        group: [{
        }],
        question: [{
            name: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            text: String,
            answerDecimal: Number,
            answerInteger: Number,
            answerBoolean: Boolean,
            answerDate: Date,
            answerString: String,
            answerDateTime: Date,
            answerInstant: Date,
            choice: [{
                system: String,
                code: String,
                display: String
            }],
            options: {
                reference: String,
                display: String
            },
            data: {
            },
            remarks: String,
            group: [{
            }]
        }]
    }
});

mongoose.model('Questionnaire', QuestionnaireSchema);
