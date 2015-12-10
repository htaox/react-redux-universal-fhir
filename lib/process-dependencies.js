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
    this.g = shremlin(graph);
  }

  entries(obj) {
    return (for (key of Object.keys(obj)) [key, obj[key]]);
  }

  loadDeps(store){

    this.graph.clear();

    const raw = fs.readFileSync(`${DEPENDENCIES_DEST}/${store}`, { encoding: 'utf8' });

    var merged = JSON.parse(raw);

    for(let [k,v] of this.entries(merged)){
      v.forEach((n) => {
        this.graph.addLink(k, n, { store: store});      
      });
    }
  }

  findLevelsDeep(n){

    let retval = [];

    graph.forEachNode((d) => {

      let x = g.V(d.id);
      for(var i = 0;i < n; i++){
        x = x.out();
      }

      x.path()
      .forEach((path) => {
        if (projects.indexOf(path[0].id) != -1) {
          var l = path.pop();
          retval.push(l.id);
        }   
      });
    });

    return _.uniq(_.sortBy(retval, (d) => d ));
  }

  pyramidLoop(_deep){
    var processSequence = [];

    var deepest = _deep;
    do {
      console.log(deepest);
      var results = findLevelsDeep(deepest);
      console.log(results);
      console.log('===================');
      
      results.forEach(function(d){
        if(processSequence.indexOf(d) == -1){
          processSequence.push(d);
        }
      });

      deepest--;
    }
    while (deepest > 0);

    return processSequence;
  }

  processDependents() {
    console.log(this.dependencies);

    return this;
  }

}