//object-path
var fs = require('fs');
var _ = require('underscore');
var objectPath = require("object-path");
var url = require('url');
var path = require('path');
var types = {};
var baseDest = 'schemas/base';
var typesDest = 'schemas/types';
var resourcesDest = 'schemas/resources';
var valuesetsDest = 'schemas/valuesets';

function setup() {

  var folders = ['schemas', baseDest, typesDest, resourcesDest, valuesetsDest];
  for(var i in folders) {
    if (!fs.existsSync(folders[i])){
      fs.mkdirSync(folders[i]);
    }
  }
}

function recurse(json) {

  for (var x in json){
  
    if (Object.prototype.toString.call(json[x]) == '[object Array]'){
      for(var y in json[x]){
        
        if (typeof json[x][y] === 'object'){
          recurse(json[x][y]);
        }
      }
    }

    if (typeof json[x] === 'object'){
      recurse(json[x]);
    }
    
    if (x == 'type'){
      var type = types[json[x]];
      if (type){
        //json[x] = type;
        for(var k in types[type]) {
          json[k] = types[type][k];
        }
      } 
    }

  }

  if (typeof obj == 'object'){
    recurse(obj);
  }
}

function processTypes(dir) {

  var files = fs.readdirSync(dir);

  for(var i in files) {
    if (files[i].search(/^type/i) != -1 && files[i].search(/restful/i) == -1) {
      var done = processSchema(dir + '/' + files[i]);
      types[done.model] = done.schema; 
    }
  }

  //For recursive references
  for (var i in types) {
    recurse(types[i]);
  }

  //fs.writeFileSync(dest + '/types.json', JSON.stringify(types, null, '  '));
}

function updateObjectPath(obj, path, value) {

  if (path.search(/extension|contained|text/i)==-1) {
    objectPath.set(obj, path, value);
  }
}

function processValueset(file) {
  var raw = fs.readFileSync(file, {encoding:'utf8'});
  var json = JSON.parse(raw);
  if (!json.define){
    console.log('Skipping => '+file);
    return;
  }

  console.log('Processing => '+file);
  var model = json['name'];
  var obj = {};
  obj.title = json.description;
  obj.concept = json['define']['concept'];
  for(var i in obj.concept) {
    obj.concept[i].type = 'String';    
  }
  //
  fs.writeFileSync(valuesetsDest + '/' + path.basename(file, '.json') + '.json', JSON.stringify(obj, null, '  '));
  
}

function processSchema(file) {
  var raw = fs.readFileSync(file, {encoding:'utf8'});
  var json = JSON.parse(raw);
  if (!json.structure){
    console.log('Skipping => '+file);
    return;
  }
  console.log('Processing => '+file);
  var structure = json.structure[0];
  var element = structure.element;
  var searchParam = structure.searchParam;

  var model = element[0].path;
  
  var obj = {};

  for(var i in element) {
    //console.log(element[i].definition.type);
    //min == max 1 == 1?
    
    var el = element[i];
    
    if (i > 0 && el.definition && el.definition.type && el.definition.type.length > 0) {

      var val = { 
          title: { type: 'String', required: false, default: el.definition.short },
          description: { type: 'String', required: false, default: el.definition.formal },
          required: el.definition.min == 1 
        };

      if (el.definition.type[0].code == 'ResourceReference'){
        
        for(var i in el.definition.type) {
          //Need to clone it
          val = JSON.parse(JSON.stringify(val));

          var type = url.parse(el.definition.type[i].profile).pathname.split('/').pop();
          val.ref = type;
          val.type = 'String';

          updateObjectPath(obj, el.path + (i > 0 ? i : ''), el.definition.max == '*' ? [val] : val);
        }
      }
      else {
        var type = el.definition.type[0].code;

        //val[types[type] ? 'token' : 'type'] = types[type] ? types[type] : type;
        
        //val.type = type;

        if (types[type]){
          //token types like Identifier
          //val.type = 'String';
          //_.extend(val, types[type]);
          //val.type = types[type];
          for(var k in types[type]) {
            console.log(k)
            val[k] = types[type][k];
          }
          //delete required attribute
          delete val['required'];
        }
        else {
          val.type = type
        }
        
        updateObjectPath(obj, el.path, el.definition.max == '*' ? [val] : val);
      }      
    }
    else {
      updateObjectPath(obj, el.path, {});
    }
    
  }

  obj = obj[model];

  //Extension types defined by organization
  if (model != 'Extension'){
    
    var dest = resourcesDest;
    if (path.basename(file).search(/^type/i) != -1) {
      dest = typesDest;
    }
    if (path.basename(file).search(/^type-(period)/i) != -1){
      dest = baseDest;
    }

    fs.writeFileSync(dest + '/' + model + '.json', JSON.stringify(obj, null, '  '));
  }

  return { model: model, schema: obj };

}

function processAllSchemas(folder) {

  var files = fs.readdirSync(folder);

  for(var i in files) {
    if (files[i].search(/profile\.json$/i) != -1){
      processSchema(folder + '/' + files[i]);
    }
    if (files[i].search(/^valueset/i) != -1){
      processValueset(folder + '/' + files[i]);
    }
  } 

}

setup();
processTypes('fhir-schema');
console.log(types);
processAllSchemas('fhir-schema');
//processSchema('./fhir-schema/adversereaction.profile.json');