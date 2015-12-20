import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { CounterButton } from 'components';
import config from '../../config';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

          </div>
        </div>
      </div>
    );
  }
}
