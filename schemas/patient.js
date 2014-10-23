var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    name: [{
        use: String,
        text: String,
        family: [String],
        given: [String],
        prefix: [String],
        suffix: [String]
    }],
    telecom: [{
    }],
    gender: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    birthDate: Date,
    deceasedBoolean: Boolean,
    deceasedDateTime: Date,
    address: [{
    }],
    maritalStatus: {
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    },
    multipleBirthBoolean: Boolean,
    multipleBirthInteger: Number,
    photo: [{
    }],
    contact: [{
        relationship: [{
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }],
        name: {
            use: String,
            text: String,
            family: [String],
            given: [String],
            prefix: [String],
            suffix: [String]
        },
        telecom: [{
        }],
        address: {
        },
        gender: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        organization: {
            reference: String,
            display: String
        }
    }],
    animal: {
        species: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        breed: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        },
        genderStatus: {
            coding: [{
                system: String,
                code: String,
                display: String
            }]
        }
    },
    communication: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    careProvider: [{
        reference: String,
        display: String
    }],
    managingOrganization: {
        reference: String,
        display: String
    },
    link: [{
        other: {
            reference: String,
            display: String
        },
        fhirType: String,
    }],
    active: Boolean,
});

mongoose.model('Patient', PatientSchema);
