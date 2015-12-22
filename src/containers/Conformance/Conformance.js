import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
// import * as conformanceActions from 'redux/modules/conformance';
import { isLoaded as isConformanceLoaded, load as loadConformance } from 'redux/modules/conformance';
import {load as loadJsonInspector} from 'redux/modules/json-inspector';
import { JsonInspector } from 'components';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import config from '../../config';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isConformanceLoaded(getState())) {
    promises.push(dispatch(loadConformance()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({conformance: state.conformance.data, load: loadConformance }),
  { loadJsonInspector })
export default class Conformance extends Component {

  static propTypes = {
    conformance: PropTypes.object,
    load: PropTypes.func.isRequired,
    loadJsonInspector: PropTypes.func.isRequired
  }

  render() {
    const styles = require('./Conformance.scss');
    const {conformance} = this.props;
    if (conformance) {
      this.props.loadJsonInspector(conformance);
    }
    return (
      <div className={styles.conformance + ' '}>
      <h1>Conformance</h1>
        <DocumentMeta title={config.app.title + ': Conformance'}/>
        <JsonInspector />
        <div>{conformance ? JSON.stringify(conformance, null, '  ') : 'No conformance'}</div>
      </div>
    );
  }
}
