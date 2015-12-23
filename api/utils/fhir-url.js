'use strict';

export function fhirUrl(availableActions = {}, url = []) {
  let avail = Object.keys(availableActions).filter((d) => d.search(/^fhir/));
  if (avail.indexOf(url[0]) != -1){
    if (url.length == 1){
      url.push('list');
    }
    else {
      url.splice(1, 0, 'load');
    }
  }
  return url;
}