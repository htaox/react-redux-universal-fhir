// BASE SETUP
// =============================================================================
var _ = require('lodash');

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// configure app
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test1'); // connect to our database

//Schema helper (load mongoose BEFORE schemaHelper)
var models = {};
var schemaHelper = require('./lib/schema-helper');
var modelsToLoad = ['base', 'types', 'resources', 'valuesets'];
_.each(modelsToLoad, function(folder) {
  var m = schemaHelper.loadSchemas(__dirname + '/schemas/' + folder);
  _.extend(models, m);
});


//var Bear     = require('./app/models/modelName');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  //console.log(req.query);
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  //res.json({ message: 'hooray! welcome to our api!' });
  res.send('<pre>' + mongoose.modelNames().join('\n') + '</pre>');
});

var modelNames = mongoose.modelNames();
_.each(modelNames, function(modelName) {

  //for (var i in modelNames) {

  //var modelName = modelNames[i];
  var thisModel = models[modelName];

  // on routes that end in /modelName
  // ----------------------------------------------------
  router.route('/' + modelName)

  // create a model (accessed at POST http://localhost:8080/modelName)
  .post(function(req, res) {

    var model = new thisModel(req.body); // create a new instance of the Bear model

    model.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: modelName + ' created!'
      });
    });


  })

  //Probably want to set default limit
  // get all the fhir (accessed at GET http://localhost:8080/api/modelName)

  //http://www.hl7.org/implement/standards/modelName/search.html
  //GET [base-url]/patient?_id=23
  //GET [base-url]/Patient/23/procedure?date=>2010-01-01&date=<2011-12-31
  //GET [base-url]/Patient?identifier=http://acme.org/patient|2345
  //GET [base-url]/Patient?gender=http://hl7.org/modelName/v2/0001|M
  //GET [base-url]/Patient?gender:text=male

  .get(function(req, res) {

    //test
    res.send(thisModel.schema);

    /*
    thisModel.find(function(err, doc) {
    	if (err)
    		res.send(err);

    	res.json(doc);
    });
    */

  });

  // on routes that end in /modelName/:model_id
  // ----------------------------------------------------
  router.route('/modelName/:model_id')

  // get the model with that id
  .get(function(req, res) {
    thisModel.findById(req.params.model_id, function(err, model) {
      if (err)
        res.send(err);
      res.json(model);
    });
  })

  // update the model with this id
  .put(function(req, res) {

    thisModel.findByIdAndUpdate(req.params.model_id, req.body, {
        upsert: true,
        w: 1
      })
      .exec(function(err, doc) {
        if (err)
          res.send(err);
        res.json({
          message: modelName + ' updated!'
        });
      });
    /*
    thisModel.findById(req.params.model_id, function(err, model) {

    	if (err)
    		res.send(err);

    	model.name = req.body.name;
    	model.save(function(err) {
    		if (err)
    			res.send(err);

    		res.json({ message: modelName + ' updated!' });
    	});

    });
    */
  })

  // delete the model with this id
  .delete(function(req, res) {
    thisModel.remove({
      _id: req.params.model_id
    }, function(err, model) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  });


  // REGISTER OUR ROUTES -------------------------------
  app.use('/fhir', router);

});

app.get('/', function(req, res) {
  res.send('Try http://localhost:8080/fhir instead');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);