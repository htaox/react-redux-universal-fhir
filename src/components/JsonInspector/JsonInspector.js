import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ObjectInspector from 'react-object-inspector';

@connect(state => ({ data: state.jsonInspector.data }))
export default class JsonInspector extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }

  render() {
    const {data} = this.props;
    return (
      <div className="">
        <ObjectInspector data={ data } />
      </div>
    );
  }
}
