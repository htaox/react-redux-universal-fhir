'use strict';

import fs from 'fs';

export class ProcessDependencies {

  constructor(props){
    this.dependencies = {};
  }

  processDependents() {
    console.log(this.dependencies);

    return this;
  }

}