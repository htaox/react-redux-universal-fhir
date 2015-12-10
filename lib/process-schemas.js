'use strict';

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import objectPath from 'object-path';
import { ProcessDependencies } from '../lib/process-dependencies';
import { FHIR_SCHEMAS_DIR, SCHEMAS_DEST, DEPENDENCIES_DEST, NATIVE_TYPES } from '../lib/config';

const typesDest = `${SCHEMAS_DEST}/types`;
const profilesDest = `${SCHEMAS_DEST}/profiles`;
const valuesetsDest = `${SCHEMAS_DEST}/valuesets`;

class ProcessSchemas extends ProcessDependencies {

  constructor(props) {
    super(props);       
  }

  setup() {

    let folders = [SCHEMAS_DEST, typesDest, profilesDest, valuesetsDest, DEPENDENCIES_DEST];
    for (let folder of folders) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    }

    return this;
  }

  mapType(type){

    let { code, profile } = type[0];
              
    if (code === 'Element'){
      return undefined;
    }
        
    code = code.search(/^uuid|uri|id|code|markdown|oid|string|time$/i) != -1 ? 'string' : code;
    code = code.search(/^date|dateTime$/i) != -1 ? 'date' : code;
    code = code.search(/instant|integer|decimal|unsignedInt|positiveInt/i) != -1 ? 'number' : code;
    code = code.search(/base64Binary/i) != -1 ? 'string' : code;
    //boolean == boolean
    let schema = this.schemaProcessed[code];
    let profileType = profile ? path.basename(profile[0]) : undefined;
    
    if (profile || (!NATIVE_TYPES.test(code) && schema)){
      code = { type: schema && schema.id ? schema.id.type : 'Schema.Types.Mixed', ref: profile ? profileType : code };
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
      const depKeyDest = `${profilesDest}/${depKey}`;
      if(!fs.existsSync(depKeyDest)){
        fs.mkdirSync(depKeyDest);
      }

      for(let ent of json.entry) {
        
        const {id, snapshot} = ent.resource;

        dep[id] = [];

        if (id && !NATIVE_TYPES.test(id) && snapshot && snapshot.element) {

          const func = (m, d) => {
            const { short, definition, type } = d;
            
            let rgx = new RegExp(`^${id}\.`);
            let pt = d.path.replace(rgx, '');
            
            //1. the root model won't have a short attribute, **I think** 
            //2. path should not equal model
            if (id != pt && short && type){

              let ty = this.mapType(type);

              if (ty) {
                
                objectPath.set(m, pt, { short, definition, type: ty });

                //add to dependencies
                if (ty.ref || (typeof ty === 'string' && !NATIVE_TYPES.test(ty)) == -1) {
                  let v = ty.ref ? ty.ref : ty;
                  if (dep[id].indexOf(v) == -1){
                    dep[id].push(v);
                  }                  
                }

              }

            }
            
            return m;
          };

          let r = _.reduce(snapshot.element, func, {});
          r.filePath = `${depKeyDest}/${id}`;
          
          fs.writeFileSync(`${depKeyDest}/${id}`, JSON.stringify(r,null,'  '), { encoding:'utf8' });

          this.schemaProcessed[id] = r;

        }
      }

    }

    return this;
  }  

}

new ProcessSchemas()
  .setup()
  .processProfiles()
  .processDependents()
  .exportDeps();

