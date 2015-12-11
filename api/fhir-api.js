'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from '../api/router'

let app = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080; // set our port

let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test1'); // connect to our database

// REGISTER OUR ROUTES
app.use('/fhir', router);

app.get('/', (req, res) => {
  res.send('Try http://localhost:8080/fhir instead');
});

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);