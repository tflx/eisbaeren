import React, {Component, PropTypes} from 'react';
import {saveUser} from '../../utils/user';
import {validateHoldsportLogin} from '../../utils/holdsport';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func
  }

  state = {
    submitted: false
  };

  handleSubmit = (event) => {
    if (event) event.preventDefault();

    const {username, password} = this.refs;

    validateHoldsportLogin(username.value, password.value)
    .then(() => {
      saveUser(username.value, password.value);
      this.props.onLogin();
    })
    .catch((error) => {
      console.log('ERROR!!', error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <label htmlFor="username">Brugernavn</label>
        <input ref="username" id="username" name="username" type="text" />
        <label htmlFor="password">Adgangskode</label>
        <input ref="password" id="password" name="password" type="password" />
        <button type="submit">Log Ind</button>
      </form>
    );
  }
}