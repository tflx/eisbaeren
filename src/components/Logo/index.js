import React from 'react';
import logo from 'static/logo.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import styles from './Logo.css';

function Logo() {
  return (
    <div className={styles.brand}>
      <SvgIcon className={styles.logo} svg={logo} width="50px" />
    </div>
  );
}

Logo.propTypes = {

};

export default Logo;