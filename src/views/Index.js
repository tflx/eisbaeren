import React, {Component} from 'react';
import {getLogin} from '../utils/user';
import ActivityList from 'components/ActivityList/ActivityList';
import Login from 'components/Login/Login';

export default class Index extends Component {

  state = {
    isLoggedIn: false
  };

  componentWillMount() {
    let isLoggedIn = false;
    if (getLogin() !== undefined) isLoggedIn = true;
    this.setState({isLoggedIn});
  }

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