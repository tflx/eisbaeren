import React, {PropTypes} from 'react';
import * as dateUtil from 'utils/date';
import styles from './Date.css';
import classnames from 'classnames';

function DateString({...props}) {
  const {day, date, time, kickoff, parenthesis} = props;
  const d = dateUtil.parseDate(date);
  let string = '';
  if (day) string += `${d.weekday} `;
  string += d.convertedDate;
  if (time) string += ` - ${d.time}`;
  if (time && kickoff) string += ` (${d.kickoff})`;

  const style = {
    fontSize: props.size ? props.size : '12px'
  };
  return (
    <span className={classnames(styles.date, props.className)} style={style}>
      {parenthesis ? '(' : null}{string}{parenthesis ? ')' : null}
    </span>
  );
}

DateString.propTypes = {
  date: PropTypes.string.isRequired,
  size: PropTypes.string,
  day: PropTypes.bool,
  time: PropTypes.bool,
  kickoff: PropTypes.bool,
  parenthesis: PropTypes.bool,
  className: PropTypes.string,
};

DateString.defaultProps = {
  day: true,
  time: true,
  kickoff: false,
  parenthesis: true,
};

export default DateString;