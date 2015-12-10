'use strict';

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import objectPath from 'object-path';
import { ProcessDependencies } from '../lib/process-dependencies';

const fhirSchemasDir = './fhir-schema'
const schemasDest = './schemas';
const typesDest = `${schemasDest}/types`;
const resourcesDest = `${schemasDest}/resources`;
const valuesetsDest = `${schemasDest}/valuesets`;
const depdendenciesDest = 'dependencies';

class ProcessSchemas extends ProcessDependencies {

  constructor(props) {
    super(props);
  }

  setup() {

    let folders = [schemasDest, typesDest, resourcesDest, valuesetsDest, depdendenciesDest];
    for (let folder of folders) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    }

    return this;
  }

  processProfiles() {

    console.log('processing profiles');

    const profilesResources = `${fhirSchemasDir}/profiles-resources.json`;
    const profilesOthers = `${fhirSchemasDir}/profiles-others.json`;
    const profilesTypes = `${fhirSchemasDir}/profiles-types.json`;

    for (let file of [profilesResources, profilesOthers, profilesTypes]) {
      let raw = fs.readFileSync(file, { encoding: 'utf8' });
      let json = JSON.parse(raw);
      
      for(let ent of json.entry) {
        
        const {id, snapshot} = ent.resource;

        this.dependencies[id] = [];

        if (id && snapshot && snapshot.element) {

          const func = (m, d) => {
            const { short, definition, type } = d;
            
            let rgx = new RegExp(`^${id}\.`);
            let pt = d.path.replace(rgx, '');
            
            //the root model won't have a short attribute, **I think** 
            if (short && type){
              let ty = type[0].code;
              ty = ty == 'id' ? 'Schema.Types.ObjectId' : ty;
              ty = ty.search(/integer|decimal|unsignedInt/i) != -1 ? 'number' : ty;
              ty = ty.search(/base64Binary/i) != -1 ? 'string' : ty;
              ty = ty == 'Reference' ? { type: 'Schema.Types.Mixed', ref: path.basename(type[0].profile[0]) } : ty;
              objectPath.set(m, pt, { short, definition, type:ty });

              if (typeof ty === 'string' && ty.search(/boolean|string|number|date|mixed|objectid/i) == -1) {
                this.dependencies[id].push(ty.ref ? ty.ref : ty);
              }
            }
            
            return m;
          };

          let r = _.reduce(snapshot.element, func, {});

          fs.writeFileSync(`${resourcesDest}/${id}`, JSON.stringify(r,null,'  '), { encoding:'utf8' });

        }
      }

    }

    return this;
  }  

}

new ProcessSchemas()
  .setup()
  .processProfiles()
  .processDependents();

