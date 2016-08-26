import React, {Component, PropTypes} from 'react';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import styles from './Navigation.css';
import logo from 'static/logo.svg';
import config from '../../../mock-api/config.json';
import NavItem from './NavItem';
import Float from './Float';

export default class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  }

  state = {
    open: false
  }


  toggleOpen = () => {
    this.setState({open: !this.state.open});
  }

  handleItemClick = () => {
    this.toggleOpen();
  }

  renderList = () => {
    const navItems = config.nav;
    const items = navItems.map((item, index) =>
      <NavItem onClick={this.handleItemClick} key={index} href={item.href} label={item.label} />
    );
    return items;
  }

  render() {
    const factor = Math.ceil(Math.max(window.innerHeight, window.innerWidth) / 25);
    const open = {
      transform: this.state.open ? `scale(${factor})` : 'scale(1)'
    };
    const {isLoggedIn} = this.props;

    return (
      <div className={isLoggedIn ? styles.isLoggedIn : styles.isNotLoggedIn}>
        <Float onClick={this.toggleOpen} open={this.state.open} />
        <div className={styles.navLayer} style={open} />
        {this.state.open ?
          <div className={styles.navWrapper}>
            <div className={styles.brand}>
              <SvgIcon className={styles.logo} svg={logo} width="50px" />
            </div>
            <div>{this.renderList()}</div>
          </div>
          : null
        }
      </div>
    );
  }
}