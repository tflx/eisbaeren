import React, {Component, PropTypes} from 'react';
import {getLogin} from '../utils/user';
import ActivityList from 'components/ActivityList/ActivityList';
import Login from 'components/Login/Login';
import Navigation from '../components/Navigation/Navigation';

export default class Index extends Component {
  static propTypes = {
    test: PropTypes.string
  }

  state = {
    isLoggedIn: false
  };

  componentWillMount() {
    let isLoggedIn = false;
    if (getLogin() !== undefined) isLoggedIn = true;
    this.setState({isLoggedIn});
  }

  componentDidMount() {
    console.log(this.props);
  }

  onLoginSuccess = () => {
    this.setState({isLoggedIn: true});
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? <ActivityList /> : <Login onLogin={this.onLoginSuccess} />}
        <Navigation isLoggedIn={this.state.isLoggedIn} />

      </div>
    );
  }
}