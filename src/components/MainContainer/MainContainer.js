import React, {PropTypes} from 'react';
import styles from './MainContainer.css';

function MainContainer({children}) {
  return (
    <div className={styles.mainContainer} >
      {children}
    </div>
  );
}

MainContainer.propTypes = {
  children: PropTypes.node
};

export default MainContainer;
