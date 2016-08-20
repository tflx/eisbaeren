import React, { Component, PropTypes } from 'react';
import styles from './Navigation.css';

export default class Float extends Component {
  static propTypes = {
    open: PropTypes.bool
  }

  render() {
    const open = this.props.open;
    return (
      <div className={open ? styles.floatingOpen : styles.floating} {...this.props}>
        <span className={open ? styles.navIconOpen : styles.navIcon}></span>
      </div>
    );
  }
}
