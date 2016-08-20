import React, {Component} from 'react';
import {getUser} from '../utils/user';
import ActivityList from 'components/ActivityList/ActivityList';
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
        {this.state.isLoggedIn ? <ActivityList /> : <Login onLogin={this.onLoginSuccess} />}
      </div>
    );
  }
}