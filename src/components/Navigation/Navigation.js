import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import styles from './Navigation.css';
import logo from 'static/logo.svg';
import config from '../../../mock-api/config.json';
import NavItem from './NavItem';
import Float from './Float';

export default class Navigation extends Component {

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
    const factor = Math.floor(window.innerHeight / 26);
    const open = {
      transform: this.state.open ? `scale(${factor})` : 'scale(1)'
    };

    return (
      <div>
        <Float onClick={this.toggleOpen} open={this.state.open} />
        <div className={styles.navLayer} style={open} />
        {this.state.open ?
          <div className={styles.navWrapper}>
            <div className={styles.brand}>
              <SvgIcon className={styles.logo} svg={logo} width="50" />
            </div>
            <div>{this.renderList()}</div>
          </div>
          : null
        }
      </div>
    );
  }
}