import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import styles from './MainContainer.css';
import Navigation from 'components/Navigation/Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import config from '../../../mock-api/config.json';
import {getLogin, deleteUser} from '../../utils/user';


export default class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  }

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

  onLogOut = () => {
    deleteUser();
    this.setState({isLoggedIn: false});
    browserHistory.push('/');
  }


  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: config.colors.secondary,
        primary2Color: config.colors.primary,
        accent1Color: config.colors.primary,
      }
    });
    const children = React.cloneElement(this.props.children, {onLoginSuccess: this.onLoginSuccess, onLogOut: this.onLogOut, isLoggedIn: this.state.isLoggedIn});

    return (
      <div className={styles.mainContainer}>
        <MuiThemeProvider muiTheme={muiTheme}>
          {children}
        </MuiThemeProvider>
        <Navigation isLoggedIn={this.state.isLoggedIn} />
      </div>
    );
  }
}
