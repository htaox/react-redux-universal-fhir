'use strict';

import fs from 'fs';
import _ from 'lodash';
import createGraph from 'ngraph.graph';
import shremlin from 'ngraph.shremlin';
import { FHIR_SCHEMAS_DIR, SCHEMAS_DEST, DEPENDENCIES_DEST } from '../lib/config';

export class ProcessDependencies {

  constructor(props){
    this.dependencies = {};
    this.graph = createGraph();
    this.g = shremlin(this.graph);
    this.processSequence = [];
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

  loadDeps(store){

    this.graph.clear();

    const raw = fs.readFileSync(`${DEPENDENCIES_DEST}/${store}`, { encoding: 'utf8' });

    var merged = JSON.parse(raw);

    this.addToGraph(store, merged);

    return this;
  }

  exportDeps(jn) {
    fs.writeFileSync(`${DEPENDENCIES_DEST}/${store}`, JSON.stringify(jn, null, '  ') ,{ encoding: 'utf8' });
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

    this.processSequence = processSequence;

    return this;
  }

  processDependents() {
    
    for(let [k,v] of this.entries(this.dependencies)){
      this.addToGraph(k, v);
    }

    this.pyramidLoop(2);

    return this;
  }

}