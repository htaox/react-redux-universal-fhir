var mongoose = require('mongoose');

function onConnectedCallback () {
  console.info('Mongoose connected successfully');
}

if (mongoose.connection.readyState != 1) {
  var mongoServer = '127.0.0.1';
  var collection = 'fhir';
  
  var options = {
    db: { native_parser: true },
    server: { poolSize: 5, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
  }
  mongoose.connect('mongodb://'+mongoServer+'/'+collection, options)
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'mongodb connection error for '+mongoServer+'/'+collection));
  db.once('open', onConnectedCallback);
}
else {
  console.info('Mongoose already connected');
  onConnectedCallback();
}

var express = require('express'),
  bodyParser = require('body-parser'), 
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  rest = require('mers')
  schemaHelper = require('./lib/schema-helper'),
  port = 4000;

schemaHelper.readSchemas(__dirname + '/schemas');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/fhir', rest({ mongoose: mongoose}).rest())
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.use(morgan('combined'));
app.listen(port);
console.info("Express server listening on port %d in %s mode, visit http://localhost:%d/fhir/", port, app.settings.env, port);

//http://localhost:4000/rest/adversereaction 
//etc
//expected result
// {"title":"Search results for resource type AdverseReaction","id":"http://localhost:3000/adversereaction","totalResults":0,"link":{"href":"http://localhost:3000/adversereaction","rel":"self"},"updated":"2014-10-23T18:04:56.623Z","entry":[]}
