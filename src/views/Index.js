import React, {Component} from 'react';
import {getUser} from '../utils/user';
import Activities from 'components/Activities/Activities';
import Login from 'components/Login/Login';

export default class Index extends Component {

  state = {
    isLoggedIn: getUser()
  };

  onLoginSuccess = () => {
    this.setState({isLoggedIn: true});
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? <Activities /> : <Login onLogin={this.onLoginSuccess} />}
      </div>
    );
  }
}