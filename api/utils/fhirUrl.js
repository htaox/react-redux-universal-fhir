'use strict';

import _ from 'lodash';

export function fhirUrl(availableActions = {}, url = []) {
  
  let avail = _(Object.keys(availableActions))
    .filter(d => d.search(/^fhir/) != -1)
    .map(d => d.replace(/^fhir\$/, ''))
    .value();

  let newUrl = url.slice();

  if (avail.indexOf(url[0]) != -1){
    newUrl[0] = 'fhir$' + newUrl[0]; 
    if (url.length == 1){
      newUrl.push('list');
    }
    else {
      newUrl.splice(1, 0, 'load');
    }
  }
  return newUrl;
}