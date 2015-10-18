//object-path
var fs = require('fs');
var _ = require('underscore');
var objectPath = require("object-path");
var url = require('url');
var path = require('path');
var types = {};
var tmpDest = 'schemas/tmp';
var baseDest = 'schemas/base';
var typesDest = 'schemas/types';
var resourcesDest = 'schemas/resources';
var valuesetsDest = 'schemas/valuesets';

function setup() {

  var folders = ['schemas', tmpDest, baseDest, typesDest, resourcesDest, valuesetsDest];
  for (var i in folders) {
    if (!fs.existsSync(folders[i])) {
      fs.mkdirSync(folders[i]);
    }
  }
}

function recurse(json) {

  for (var x in json) {

    if (Object.prototype.toString.call(json[x]) == '[object Array]') {
      for (var y in json[x]) {

        if (typeof json[x][y] === 'object') {
          recurse(json[x][y]);
        }
      }
    }

    if (typeof json[x] === 'object') {
      recurse(json[x]);
    }

    if (x == 'type') {
      var type = types[json[x]];
      if (type) {
        //json[x] = type;
        for (var k in types[type]) {
          json[k] = types[type][k];
        }
      }
    }

  }

  if (typeof obj == 'object') {
    recurse(obj);
  }
}

function processBase(dir) {
  var files = fs.readdirSync(dir);

  for (var i in files) {
    if (files[i].search(/^type/i) != -1 && files[i].search(/(period)/i) != -1) {
      var done = processSchema(dir + '/' + files[i]);
      types[done.model] = done.schema;
    }
  }
}

function processTypes(dir) {

  var files = fs.readdirSync(dir);

  for (var i in files) {
    if (files[i].search(/^type/i) != -1 && files[i].search(/restful/i) == -1) {
      var done = processSchema(dir + '/' + files[i]);
      types[done.model] = done.schema;
    }
  }

  //For recursive references
  for (var i in types) {
    recurse(types[i]);
  }

  fs.writeFileSync(tmpDest + '/types.json', JSON.stringify(types, null, '  '));
}

function updateObjectPath(obj, path, value) {

  if (path.search(/extension|contained|text/i) == -1) {
    //console.log(value)
    try{
      objectPath.set(obj, path, value);
    }
    catch(e){
      throw new Error(path);
    }
  }
}

function processValueset(file) {
  var raw = fs.readFileSync(file, {
    encoding: 'utf8'
  });
  var json = JSON.parse(raw);
  if (!json.define) {
    console.log('Skipping => ' + file);
    return;
  }

  console.log('Processing => ' + file);
  var model = json['name'];
  var obj = {};
  obj.title = {
    type: "String",
    default: json.description
  };
  obj.concept = json['define']['concept'];
  for (var i in obj.concept) {
    obj.concept[i].type = 'String';
  }
  //
  fs.writeFileSync(valuesetsDest + '/' + path.basename(file, '.json') + '.json', JSON.stringify(obj, null, '  '));

}

function processSchema(file) {

  /*
    Place loadTypes() here and not processAllSchemas so we can do unit test
  */
  if (Object.keys(types) == 0) {
    loadTypes();
  }

  var raw = fs.readFileSync(file, {
    encoding: 'utf8'
  });
  var json = JSON.parse(raw);
  //if (!json.structure) {
  if (!json.snapshot) {
    console.log('Skipping => ' + file);
    return;
  }
  console.log('Processing => ' + file);
  //var structure = json.structure[0];
  //var element = structure.element;
  var element = json.snapshot.element;
  //var searchParam = structure.searchParam;

  //var model = element[0].path;
  var model = json.id;

  var obj = {};

  for (var i in element) {
    //console.log(element[i].definition.type);
    //min == max 1 == 1?

    var el = element[i];
    if (!el.path){
      throw new Error(el);
    }
    //We need to handle property collection (note:lowercase "c" b/c mongoose keyword for creating schema)
    //Capitalizing it fixes problem
    el.path = el.path.replace(/collection/g, 'Collection');

    //replace "[x]" VisionPrescription.reason[x] to VisionPrescription.reason
    el.path = el.path.replace(/\[x\]/g,'');

    //replace .length with .size
    el.path = el.path.replace(/\.length/g,'.size');

    //if (i > 0 && el.definition && el.definition.type && el.definition.type.length > 0) {
    if (el.definition) {

      var val = {
        label: {
          type: 'String',
          required: false,
          default: el.short
          //default: el.definition.short
        },
        description: {
          type: 'String',
          required: false,
          default: el.definition
          //default: el.definition.formal
        },
        required: el.min == 1 //el.definition.min == 1
      };

      /**
        If you don't want title and description, comment out above and use below simple val def.
      **/
      //var val = {};

      //if (el.definition.type[0].code == 'ResourceReference') {
      if (el.type && el.type[0].code == 'ResourceReference') {

        for (var i in el.definition.type) {
            //Need to clone it
            val = JSON.parse(JSON.stringify(val));

            var type = url.parse(el.definition.type[i].profile).pathname.split('/').pop();
            val.ref = type;
            val.type = 'String';

            //updateObjectPath(obj, el.path + (i > 0 ? i : ''), el.definition.max == '*' ? [val] : val);
            updateObjectPath(obj, el.path + (i > 0 ? i : ''), el.max == '*' ? [val] : val);
          }
      }
      else if (el.type){
         
        //var type = el.definition.type[0].code;
        var type = el.type[0].code;

        //val[types[type] ? 'token' : 'type'] = types[type] ? types[type] : type;
        //val.type = type;

        if (types[type]) {
          //token types like Identifier
          //val.type = 'String';
          //_.extend(val, types[type]);
          //val.type = types[type];
          for (var k in types[type]) {
            val[k] = types[type][k];
          }
          //delete required attribute
          delete val['required'];
        }
        else {
          val.type = type;
        }
      } 
      else {
        val.type = 'String';
      }

      //updateObjectPath(obj, el.path, el.definition.max == '*' ? [val] : val);
      updateObjectPath(obj, el.path, el.max == '*' ? [val] : val);
      //console.log(el.path)
    }
    else {
      updateObjectPath(obj, el.path, {});
    }

  } //le fin for each

  obj = obj[model];

  //Extension types defined by organization
  if (model != 'Extension') {

    var dest = resourcesDest;
    if (path.basename(file).search(/^type/i) != -1) {
      dest = typesDest;
    }
    if (path.basename(file).search(/^type-(period)/i) != -1) {
      dest = baseDest;
    }

    fs.writeFileSync(dest + '/' + model + '.json', JSON.stringify(obj, null, '  '));
  }

  return {
    model: model,
    schema: obj
  };

}

function loadBase(folder) {
  var files = fs.readdirSync(folder);

  for (var i in files) {
    var raw = fs.readFileSync(folder + '/' + files[i], {
      encoding: 'utf8'
    });
    var json = JSON.parse(raw);
    types[path.basename(files[i], 'json')] = json;
  }
}

function loadTypes() {
  var raw = fs.readFileSync('schemas/tmp/types.json', {
    encoding: 'utf8'
  });
  var json = JSON.parse(raw);
  types = json;
}

function processAllSchemas(folder) {

  var files = fs.readdirSync(folder);

  for (var i in files) {
    if (files[i].search(/profile\.json$/i) != -1) {
      processSchema(folder + '/' + files[i]);
    }

    if (files[i].search(/^valueset/i) != -1) {
      processValueset(folder + '/' + files[i]);
    }

  }

}

function flatTest() {

  var flatten = require('flat');
  var specimen = fs.readFileSync('schemas/resources/Specimen.json', {
    encoding: 'utf8'
  });
  console.log(flatten(JSON.parse(specimen)), {
    safe: true
  });
}

setup();
processBase('fhir-schema');
loadBase(baseDest);
processTypes('fhir-schema');
processAllSchemas('fhir-schema');
//processSchema('./fhir-schema/specimen.profile.json');