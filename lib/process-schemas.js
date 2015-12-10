'use strict';

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import objectPath from 'object-path';
import { ProcessDependencies } from '../lib/process-dependencies';
import { FHIR_SCHEMAS_DIR, SCHEMAS_DEST, DEPENDENCIES_DEST } from '../lib/config';

const typesDest = `${SCHEMAS_DEST}/types`;
const resourcesDest = `${SCHEMAS_DEST}/resources`;
const valuesetsDest = `${SCHEMAS_DEST}/valuesets`;

class ProcessSchemas extends ProcessDependencies {

  constructor(props) {
    super(props);

    this.schemaProcessed = {};
  }

  setup() {

    let folders = [SCHEMAS_DEST, typesDest, resourcesDest, valuesetsDest, DEPENDENCIES_DEST];
    for (let folder of folders) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    }

    return this;
  }

  mapType(type){

    //let ty = type[0].code;
    let { code, profile } = type[0];
              
    if (code === 'Element'){
      return undefined;
    }
        
    code = code.search(/^uuid|uri|id|code|markdown|oid|string|time$/i) != -1 ? 'string' : code;
    code = code.search(/^date|dateTime$/i) != -1 ? 'date' : code;
    code = code.search(/instant|integer|decimal|unsignedInt|positiveInt/i) != -1 ? 'number' : code;
    code = code.search(/base64Binary/i) != -1 ? 'string' : code;
    //boolean == boolean
    if (profile || this.schemaProcessed[code]){
      code = { type: 'Schema.Types.Mixed', ref: profile ? path.basename(profile[0]) : this.schemaProcessed[code] };
    }    
  
    return code;
  }

  processProfiles() {

    console.log('processing profiles');

    const profilesResources = `${FHIR_SCHEMAS_DIR}/profiles-resources.json`;
    const profilesOthers = `${FHIR_SCHEMAS_DIR}/profiles-others.json`;
    const profilesTypes = `${FHIR_SCHEMAS_DIR}/profiles-types.json`;

    //MUST process types first
    for (let file of [profilesTypes, profilesResources, profilesOthers]) {
      
      let raw = fs.readFileSync(file, { encoding: 'utf8' });
      let json = JSON.parse(raw);
      let depKey = path.basename(file, '.json');
      let dep = this.setupDependenciesStore(depKey);

      //create the dep subfolder
      const depKeyDest = `${resourcesDest}/${depKey}`;
      if(!fs.existsSync(depKeyDest)){
        fs.mkdirSync(depKeyDest);
      }

      for(let ent of json.entry) {
        
        const {id, snapshot} = ent.resource;

        dep[id] = [];

        if (id && snapshot && snapshot.element) {

          const func = (m, d) => {
            const { short, definition, type } = d;
            
            let rgx = new RegExp(`^${id}\.`);
            let pt = d.path.replace(rgx, '');
            
            //the root model won't have a short attribute, **I think** 
            if (short && type){

              let ty = this.mapType(type);

              if (ty) {
                objectPath.set(m, pt, { short, definition, type:ty });

                if (typeof ty === 'string' && ty.search(/boolean|string|number|date|mixed|objectid/i) == -1) {
                  dep[id].push(ty.ref ? ty.ref : ty);
                }

              }

            }
            
            return m;
          };

          let r = _.reduce(snapshot.element, func, {});

          fs.writeFileSync(`${depKeyDest}/${id}`, JSON.stringify(r,null,'  '), { encoding:'utf8' });

          this.schemaProcessed[id] = 1;

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

