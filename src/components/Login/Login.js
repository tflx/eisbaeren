import React, {Component, PropTypes} from 'react';
import {saveUser, saveLogin} from '../../utils/user';
import {validateHoldsportLogin} from '../../utils/holdsport';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import H1 from 'components/H1';
import styles from './Login.css';

export default class Login extends Component {
  static propTypes = {
    onLoginSuccess: PropTypes.func
  }

  state = {
    error: false
  };

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit = (event) => {
    if (event) event.preventDefault();

    this.setState({error: false});
    const {username, password} = this.refs;

    validateHoldsportLogin(username.input.value, password.input.value)
    .then((response) => {
      saveUser(response);
      saveLogin(username.input.value, password.input.value);
      this.props.onLoginSuccess();
    })
    .catch((error) => {
      console.log('ERROR!!', error);
      this.setState({error: true});
    });
  }

  render() {
    return (
      <div>
        <H1>Holdsport login</H1>
        {this.state.error ? <p className={styles.error}>Forkert login!</p> : <p className={styles.error}>&nbsp;</p>}
        <form noValidate>
          <TextField fullWidth className={styles.input} ref="username" onKeyDown={this.onKeyDown} floatingLabelText="Brugernavn" id="username" name="username" type="text" />
          <TextField fullWidth className={styles.input} ref="password" onKeyDown={this.onKeyDown} floatingLabelText="Adgangskode" id="password" name="password" type="password" />
          <RaisedButton className={styles.button} label="Log ind" fullWidth onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}