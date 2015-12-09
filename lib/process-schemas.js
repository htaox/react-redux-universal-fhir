import fs from 'fs';
import _ from 'lodash';
import objectPath from 'object-path';

const fhirSchemasDir = './fhir-schema'
const schemasDest = './schemas';
const typesDest = `${schemasDest}/types`;
const resourcesDest = `${schemasDest}/resources`;
const valuesetsDest = `${schemasDest}/valuesets`;

class ProcessSchemas {

  constructor(props) {
    
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
        
        if (id && snapshot && snapshot.element) {

          var r = _.reduce(snapshot.element, function(m, d){
            const { short, definition } = d;
            
            let rgx = new RegExp(`^${id}\.`);
            let path = d.path.replace(rgx, '');
            
            //the root model won't have a short attribute, **I think** 
            if (short){
              objectPath.set(m, path, { short, definition });
            }
            
            return m;
          }, {});

          fs.writeFileSync(`${resourcesDest}/${id}`, JSON.stringify(r,null,'  '), { encoding:'utf8' });

        }
      }

    }

    return this;
  }

  setup() {

    let folders = [schemasDest, typesDest, resourcesDest, valuesetsDest];
    for (let folder of folders) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    }

    return this;
  }

}

new ProcessSchemas()
  .setup()
  .processProfiles();

