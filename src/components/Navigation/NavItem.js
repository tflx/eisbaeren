import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import H1 from 'components/H1';
import styles from './Navigation.css';

export default class NavItem extends Component {
  static propTypes = {
    href: PropTypes.string,
    label: PropTypes.string
  }

  render() {
    return (
      <Link {...this.props} to={this.props.href} className={styles.navLink}>
        <H1 className={styles.navText}>{this.props.label}</H1>
      </Link>
    );
  }
}
