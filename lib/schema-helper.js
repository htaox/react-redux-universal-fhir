var _ = require('underscore'),
  mongoose = require('mongoose'),
  fs = require('fs');

var evalJSTypes = {
  "String": String,
  "Boolean": Boolean,
  "Number": Number,
  "Date": Date,
  "Array": Array,
  "string": String,
  "boolean": Boolean,
  "number": Number,
  "date": Date,
  "array": Array,
  //http://www.hl7.org/implement/standards/fhir/datatypes.html
  //UCUM http://unitsofmeasure.org/ucum-essence.xml
  "dateTime": Date,
  "code": String,
  "base64Binary": String,
  "uri": String,
  "integer": Number,
  "xhtml": String,
  "decimal": Number,
  "instant": Date,
  "oid": String,
  "uuid": String,
  "id": String,
  //Defined Variations on Quantity
  "Age": Object,
  "Count": Object,
  "Money": Object,
  "Distance": Object,
  "Duration": Object,
  "Extension": Object,
  "*": Object,
  "idref": Object,
  //mongoose
  "mixed": Schema.Types.Mixed,
  "objectId": Schema.Types.ObjectId 
};

function convertToJSType(json) {

  for (var x in json) {

    if (typeof json[x] === 'object') {
      convertToJSType(json[x]);
    } 
    else {
      if (x == 'type' && evalJSTypes[json[x]]) {
        json[x] = evalJSTypes[json[x]];
      }      
    }

  }
}

exports.readSchemas = function(dir) {
  var fs = require('fs');
  var models_path = dir;
  var models = fs.readdirSync(models_path);

  // NOTE: some models seem to be broken. once fixed, the following code will work

  models.forEach(function (file) {
    if (~file.indexOf('.js')) {
      console.log('Trying to require %s',file);
      require(models_path + '/' + file);
    }
  });
}

exports.loadSchemas = function (folder) {

  var files = fs.readdirSync(folder);

  var m = _.reduce(files, function (memo, f) {
    var modelName = f.replace(/\.json$/, '');
    
    //Compile model only one time.
    if (mongoose.modelNames().indexOf(modelName) != -1){
      memo[modelName] = mongoose.models[modelName]
      return memo;
    }

    var content = fs.readFileSync(folder + '/' + f, { encoding: 'utf8' });
    var json = JSON.parse(content);

    convertToJSType(json);

    //Explicitly declare _id as type String; default is ObjectId()
    json._id = String;
    
    try {
      var schema = mongoose.Schema(json);
    }
    catch(e){
      console.log(f + ' ' + e.message);    
    }
    //http://stackoverflow.com/questions/22391706/is-there-a-way-to-prevent-mongodb-adding-plural-form-to-collection-names
    var model = mongoose.model(modelName, schema, modelName);

    memo[modelName] = model;
    return memo;
  }, {});

  return m;

}
