import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/conformance';

@connect(
    state => ({conformance: state.conformance.data}),
    dispatch => bindActionCreators({load}, dispatch))

export default class ConformanceMeta extends Component {
  static propTypes = {
    conformance: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  render() {
    const {conformance, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./ConformanceMeta.scss');
    return (
      <div className={styles.conformanceMeta + ' '}>
        <div className="">
          Conformance Statement
          {' '}
          <strong>{conformance ? conformance : 'No Conformance Meta!'}</strong>
          <span className={styles.time}>{conformance && new Date().toString()}</span>
          <button className="" onClick={load}>Reload from server</button>
        </div>
      </div>
    );
  }
}
