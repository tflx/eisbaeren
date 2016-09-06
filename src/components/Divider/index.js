import React, {PropTypes} from 'react';
import styles from './Divider.css';

function Divider({...props}) {
  const style = {
    margin: `${props.margin} 0`
  };

  return (
    <hr className={styles.divider} style={style} />
  );
}

Divider.propTypes = {
  margin: PropTypes.string
};

export default Divider;