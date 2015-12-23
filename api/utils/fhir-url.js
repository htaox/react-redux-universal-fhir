'use strict';

import mongoose from 'mongoose';

export function fhirUrl(url = []) {
  
  let uc = url[0][0].toUpperCase() + url[0].slice(1);

  if (mongoose.modelNames().indexOf(uc) != -1){
    if (url.length == 1){
      url.push('list');
    }
    else {
      url.splice(1, 0, 'load');
    }
  }
  return url;
}