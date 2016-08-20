import React, {PropTypes} from 'react';
import styles from './H1.css';
import classNames from 'classnames';

function H1({children, ...props}) {
  return (
    <h1 className={classNames(styles.h1, props.className)}>{children}</h1>
  );
}

H1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default H1;