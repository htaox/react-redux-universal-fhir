var mongoose = require('mongoose');

var OperationOutcomeSchema = new mongoose.Schema({
    issue: [{
        severity: String,
        fhirType: {
            system: String,
            code: String,
            display: String
        },
        details: String,
        location: String,
    }]
});

mongoose.model('OperationOutcome', OperationOutcomeSchema);
