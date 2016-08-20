import React, {PropTypes} from 'react';
import styles from './H1.css';

function H1({children}) {
  return (
    <h1 className={styles.h1}>{children}</h1>
  );
}

H1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default H1;