import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';
import config from '../../config';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ''}>
        <DocumentMeta title={config.app.title + ': Login'}/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="" onSubmit={this.handleSubmit}>
            <div className="">
              <input type="text" ref="username" placeholder="Enter a username" className=""/>
            </div>
            <button className="" onClick={this.handleSubmit}><i className=""/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="" onClick={logout}><i className=""/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
