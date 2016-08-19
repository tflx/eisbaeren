import React, {Component, PropTypes} from 'react';
import {saveUser} from '../../utils/user';
import {validateHoldsportLogin} from '../../utils/holdsport';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import H1 from 'components/H1';

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


    validateHoldsportLogin(username.input.value, password.input.value)
    .then((response) => {
      console.log(response);
      saveUser(username.input.value, password.input.value);
      this.props.onLogin();
    })
    .catch((error) => {
      console.log('ERROR!!', error);
    });
  }

  render() {
    return (
      <div>
        <H1>Holdsport login</H1>
        <form noValidate>
          <TextField ref="username" floatingLabelText="Brugernavn" id="username" name="username" type="text" />
          <TextField ref="password" floatingLabelText="Adgangskode" id="password" name="password" type="password" />
          <RaisedButton label="Log ind" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}