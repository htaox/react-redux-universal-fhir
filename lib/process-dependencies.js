'use strict';

import fs from 'fs';
import _ from 'lodash';
import createGraph from 'ngraph.graph';
import shremlin from 'ngraph.shremlin';
import { FHIR_SCHEMAS_DIR, SCHEMAS_DEST, DEPENDENCIES_DEST } from '../lib/config';

const dependenciesFile = `${DEPENDENCIES_DEST}/dependencies.json`;
const schemaSequenceFile = `${DEPENDENCIES_DEST}/importSchemaSequence.js`;

export class ProcessDependencies {

  constructor(props){
    this.dependencies = {};
    this.graph = createGraph();
    this.g = shremlin(this.graph);
    this.processSequence = [];
    this.schemaProcessed = {}; 
  }

  setupDependenciesStore(store){
    if (!this.dependencies[store]){
      this.dependencies[store] = {};
    }
    return this.dependencies[store];
  }

  entries(obj) {
    return (for (key of Object.keys(obj)) [key, obj[key]]);
  }

  addToGraph(store, merged) {
    
    for(let [k,v] of this.entries(merged)){
      v.forEach((n) => {
        this.graph.addLink(k, n, { store: store});
      });
    }
    return this;
  }

  sortDependencies(store, merged) {
    for(let [k,v] of this.entries(merged)){
      merged[k] = v.sort();
    }
    return this;
  }

  loadDeps(){

    this.graph.clear();

    const raw = fs.readFileSync(dependenciesFile, { encoding: 'utf8' });
    var merged = JSON.parse(raw);

    for(let [k,v] of this.entries(merged)) {
      this.addToGraph(k, v);
    }

    return this;
  }

  exportDeps() {
    fs.writeFileSync(dependenciesFile, JSON.stringify(this.dependencies, null, '  ') ,{ encoding: 'utf8' });
    const exportSequence = JSON.stringify(this.processSequence, null, '  ');
    fs.writeFileSync(schemaSequenceFile, `export default ${exportSequence}` ,{ encoding: 'utf8' });
    return this;
  }

  findLevelsDeep(n){

    let retval = [];

    this.graph.forEachNode((d) => {

      let x = this.g.V(d.id);

      for(var i = 0;i < n; i++){
        x = x.out();
      }

      x.path()
      .forEach((path) => {
        var l = path.pop();
        retval.push(l.id); 
      });
    });

    return _.uniq(_.sortBy(retval, (d) => d ));

  }

  pyramidLoop(_deep){
    
    let processSequence = [];

    let deepest = _deep;
    do {
      console.log(deepest);
      let results = this.findLevelsDeep(deepest);
      //console.log(results);
      console.log('===================');
      
      results.forEach((d) => {
        if(processSequence.indexOf(d) == -1){
          processSequence.push(d);
        }
      });

      deepest--;
    }
    while (deepest > 0);

    //merge with schemaProcessed
    for(let [k,v] of this.entries(this.schemaProcessed)){
      if (processSequence.indexOf(k) == -1){
        processSequence.push(k);
      }
    }

    for (let k of processSequence){
      if (this.schemaProcessed[k] && this.schemaProcessed[k].filePath){
        //if the schema was skipped b/c boolean/string,etc we won't create a model for it
        this.processSequence.push(this.schemaProcessed[k].filePath);
      }
    }

    return this;
  }

  processDependents() {
    
    for(let [k,v] of this.entries(this.dependencies)){
      this
        .sortDependencies(k, v)
        .addToGraph(k, v);
    }

    this.pyramidLoop(4);

    return this;
  }

}