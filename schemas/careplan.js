var mongoose = require('mongoose');

var CarePlanSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    patient: {
        reference: String,
        display: String
    },
    status: String,
    period: {
    },
    modified: Date,
    concern: [{
        reference: String,
        display: String
    }],
    participant: [{
        role: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        member: {
            reference: String,
            display: String
        }
    }],
    goal: [{
        description: String,
        status: String,
        notes: String,
        concern: [{
            reference: String,
            display: String
        }]
    }],
    activity: [{
        goal: [{
        }],
        status: String,
        prohibited: Boolean,
        actionResulting: [{
            reference: String,
            display: String
        }],
        notes: String,
        detail: {
            reference: String,
            display: String
        },
        simple: {
            category: String,
            code: {
                coding: [{
                    system: String,
                    code: String,
                    display: String
                }]
            },
            timingSchedule: {
            },
            timingPeriod: {
            },
            timingString: String,
            location: {
                reference: String,
                display: String
            },
            performer: [{
                reference: String,
                display: String
            }],
            product: {
                reference: String,
                display: String
            },
            dailyAmount: {
                value: String,
                units: String,
                system: String,
                code: String
            },
            quantity: {
                value: String,
                units: String,
                system: String,
                code: String
            },
            details: String,
        }
    }],
    notes: String,
});

mongoose.model('CarePlan', CarePlanSchema);
