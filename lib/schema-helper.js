'use strict';

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { FHIR_SCHEMAS_DIR, SCHEMAS_DEST, DEPENDENCIES_DEST, NATIVE_TYPES, EVAL_JS_TYPES } from '../lib/config';
// const schemaSequencePath = `${DEPENDENCIES_DEST}/importSchemaSequence`;
import { schemaSequence } from '../dependencies/importSchemaSequence';

export class SchemaHelper {

  constructor(props) {
    this.models = {};
  }

  readParse(filePath){
    let file = fs.readFileSync(filePath, { encoding: 'utf8' });
    return JSON.parse(file);
  }

  convertToJSType(json) {

    for (var x in json) {
      if (typeof json[x] === 'object') {
        convertToJSType(json[x]);
      } else {
        if (x == 'type' && EVAL_JS_TYPES[json[x]]) {
          json[x] = EVAL_JS_TYPES[json[x]];
        }
      }
    }
    
  }

  processSchemas() {

    for(let modelPath of schemaSequence) {
      let schemaDef = this.readParse(modelPath);
      const modelName = path.basename(modelPath);
      try {
        let schema = mongoose.Schema(schemaDef, { collection: modelName });    
        let model = mongoose.model(modelName, schema);

        Object.assign(this.models, model);
      }
      catch(e){
        console.log('%s => %s ', modelName, e.message);
      }
    }
    
  }

}