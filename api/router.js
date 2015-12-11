'use strict';

import fs from 'fs';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import SchemaHelper from '../lib/schema-helper';

// must load mongoose schemas before creating routes
new SchemaHelper().processSchemas();

// create our router
let router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  //res.json({ message: 'hooray! welcome to our api!' });
  res.send('<pre>' + mongoose.modelNames().join('\n') + '</pre>');
});

router.get('/meta', (req, res) => {
  //conformance
});

const modelNames = mongoose.modelNames();
for(let modelName of modelNames) {

  let thisModel = models[modelName];

  // on routes that end in /modelName
  // ----------------------------------------------------
  router.route('/' + modelName)

  // create a model (accessed at POST http://localhost:8080/modelName)
  .post((req, res) => {

    let model = new thisModel(req.body); // create a new instance of the Bear model

    model.save((err) => {
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

  .get((req, res) => {

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
  .get((req, res) => {
    thisModel.findById(req.params.model_id, (err, model) => {
      if (err)
        res.send(err);
      res.json(model);
    });
  })

  // update the model with this id
  .put((req, res) => {

    thisModel.findByIdAndUpdate(req.params.model_id, req.body, {
        upsert: true,
        w: 1
      })
      .exec((err, doc) => {
        if (err)
          res.send(err);
        res.json({
          message: modelName + ' updated!'
        });
      });    
  })

  // delete the model with this id
  .delete((req, res) => {
    thisModel.remove({
      _id: req.params.model_id
    }, (err, model) => {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  });

}
