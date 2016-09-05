import React, {Component, PropTypes} from 'react';
import {saveUser, saveLogin} from '../../utils/user';
import holdsport from '../../utils/holdsport';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import H1 from 'components/H1';
import styles from './Login.css';

export default class Login extends Component {
  static propTypes = {
    onLoginSuccess: PropTypes.func
  }

  state = {
    snackbarOpen: false
  };

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit = (event) => {
    if (event) event.preventDefault();

    this.setState({snackbarOpen: false});
    const {username, password} = this.refs;

    holdsport.validateHoldsportLogin(username.input.value, password.input.value)
    .then((response) => {
      saveUser(response);
      saveLogin(username.input.value, password.input.value);
      this.props.onLoginSuccess();
    })
    .catch((error) => {
      console.log('ERROR!!', error);
      this.setState({snackbarOpen: true});
    });
  }

  render() {
    const style = {
      backgroundColor: 'red'
    };

    return (
      <div>
        <H1>Holdsport login</H1>
        <form noValidate>
          <TextField fullWidth className={styles.input} ref="username" onKeyDown={this.onKeyDown} floatingLabelText="Brugernavn" id="username" name="username" type="text" />
          <TextField fullWidth className={styles.input} ref="password" onKeyDown={this.onKeyDown} floatingLabelText="Adgangskode" id="password" name="password" type="password" />
          <RaisedButton className={styles.button} label="Log ind" fullWidth onClick={this.handleSubmit} />
        </form>
        <Snackbar
          open={this.state.snackbarOpen}
          message="Fejl i brugernavn eller adgangskode"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={style}
        />
      </div>
    );
  }
}