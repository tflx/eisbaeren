import React, {PropTypes} from 'react';
import styles from './CalendarIcon.css';

function CalendarIcon({...props}) {
  const {month, date, weekday} = props;
  return (
    <span className={styles.calendar}>
      <span className={styles.calendarIcon}>
        <div className={styles.iconTop} />
      </span>
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