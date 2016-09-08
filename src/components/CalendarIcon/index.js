import React, {PropTypes} from 'react';
import styles from './CalendarIcon.css';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import calIcon from '../../images/calendar-icon.svg';

function CalendarIcon({...props}) {
  const {month, date, weekday} = props;
  return (
    <span className={styles.calendar}>
      <SvgIcon className={styles.calendarIcon} svg={calIcon} />
      <div className={styles.dateText}>
        <p className={styles.month}>{month}</p>
        <p className={styles.date}>{date}</p>
        <p className={styles.day}>{weekday}</p>
      </div>
    </span>
  );
}

CalendarIcon.propTypes = {
  month: PropTypes.string,
  date: PropTypes.number,
  weekday: PropTypes.string,
};

export default CalendarIcon;