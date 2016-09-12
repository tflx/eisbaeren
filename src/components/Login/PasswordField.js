import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import eye from 'images/eye.svg';
import eyeOff from 'images/eye-off.svg';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import styles from './Login.css';

export default class PasswordField extends Component {
  static propTypes = {
    onKeyDown: PropTypes.func
  }
  state = {
    hidden: true
  };

  handleSwitch = () => {
    this.setState({hidden: !this.state.hidden});
    this.refs.password.focus();
  }

  render() {
    const iconStyle = {
      position: 'absolute',
      bottom: '0px',
      right: '0px'
    };

    return (
      <span className={styles.wrapper}>
        <TextField onKeyDown={this.props.onKeyDown} ref="password" type={this.state.hidden ? 'password' : 'text'} fullWidth ref="password" floatingLabelText="Adgangskode" id="password" name="password" />
        <IconButton style={iconStyle} onClick={this.handleSwitch}>
          {this.state.hidden ?
            <SvgIcon svg={eye} />
            :
            <SvgIcon svg={eyeOff} />}
        </IconButton>
      </span>
    );
  }
}