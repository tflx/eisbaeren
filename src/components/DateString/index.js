import React, {PropTypes} from 'react';
import * as date from 'utils/date';
import styles from './Date.css';

function DateString({...props}) {
  const d = date.parseDate(props.date);
  const style = {
    fontSize: props.size ? props.size : '12px'
  };
  return (
    <span className={styles.date} style={style}>({d.convertedDate} - {d.time})</span>
  );
}

DateString.propTypes = {
  date: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default DateString;