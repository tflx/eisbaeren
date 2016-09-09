import React, {PropTypes} from 'react';
import styles from './IconAndText.css';

function IconAndText({...props}) {
  const style = {
    color: props.color,
    fontSize: props.size,
  };

  return (
    <span style={style} className={styles.wrapper}>
      <span className={styles.icon}>{props.icon}</span>
      <span className={props.ellipsis ? styles.ellipsis : null}>{props.text}</span>
    </span>
  );
}

IconAndText.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  ellipsis: PropTypes.bool,
};

export default IconAndText;