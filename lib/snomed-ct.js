'use strict';

import fs from 'fs';
import csvParse from 'csv-parse';
import es from 'event-stream';
import { SNOMED_CT_DIR, SNOMED_CT_FILE } from '../lib/config';

export class SnomedCT {

  constructor(props){

  }

  /**
    @description Sign up for an account at: https://www.nlm.nih.gov/research/umls/Snomed/us_edition.html
      download: http://download.nlm.nih.gov/mlb/utsauth/USExt/SnomedCT_RF2Release_US1000124_20150901.zip
      once extracted, we'll use this file: sct2_Description_Snapshot-en_US1000124_20150901.txt
  **/
  extractSubstance() {

    const parser = csvParse({columns: true, delimiter: '\t', relax: true});
    const input = fs.createReadStream(`${SNOMED_CT_DIR}/${SNOMED_CT_FILE}`);
    input.on('close', () => { fs.writeFileSync(`${SNOMED_CT_DIR}/substance.json`, out.join('\n'), {encoding: 'utf8'}); });
    
    let out = [];
    let counter = 0;
    const transformer = (data, cb) => {
      // active conceptId term
      if (++counter % 10000 == 0){
        console.log(counter);
      }
      if (data.active && data.term.search(/\(substance\)$/i) != -1) {
        const { conceptId, term } = data;
        out.push(JSON.stringify({ conceptId, term }));
      }
      cb(null, data);      
    }

    input.pipe(parser).pipe(es.map(transformer));

  }
}