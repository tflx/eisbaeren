import React, {Component} from 'react';
import responsive from '../../utils/responsive';
import styles from './Header.css';

export default class Header extends Component {

  state = {
    desktop: true,
    mobileNavActive: false
  };


  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({desktop: responsive.isDesktopMenu()});
  };

  handleMobileNav = () => {
    this.setState({
      mobileNavActive: !this.state.mobileNavActive
    });
  }


  render() {
    return (
      <div className={styles.header}>

      </div>
    );
  }
}
