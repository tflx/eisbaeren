import React, {PropTypes} from 'react';
import styles from './Navigation.css';

function NavigationContainer({children}) {
  return (
    <div className={styles.navContainer} >
      {children}
    </div>
  );
}

NavigationContainer.propTypes = {
  children: PropTypes.node
};

export default NavigationContainer;
