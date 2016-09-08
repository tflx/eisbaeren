import React, {Component, PropTypes} from 'react';
import {push} from 'utils/holdsport';
import {browserHistory} from 'react-router';
import {Card, CardText} from 'material-ui/Card';
import IconButton from 'components/IconButton';
import arrow from '../../images/arrow-right.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import styles from './SingleActivity.css';
import Loader from 'components/Loader';
import Status from 'components/Status/Status';
import DateString from 'components/DateString';
import calIcon from '../../images/calendar-icon.svg';
import * as dateUtil from 'utils/date';

export default class SingleActivity extends Component {
  static propTypes = {
    activity: PropTypes.object
  }

  state = {
    fetching: false,
    status: null
  };

  componentWillMount() {
    const {status} = this.props.activity;
    this.setState({status});
  }

  getStatusIcon() {
    const node = <span className={styles.infoIcon} />;
    return node;
  }

  changeStatus = (newStatus) => {
    this.setState({fetching: true});
    const data = {
      activities_user: {
        joined_status: newStatus,
        picked: 1
      }
    };

    const {action_method, action_path} = this.state.activity;
    push(action_path, data, action_method)
      .then((response) =>
        this.setState({status: response.status_code, fetching: false})
      );
  }

  showDetails = () => {
    const {activity} = this.props;
    browserHistory.push(`/aktiviteter/id/${activity.id}`);
  }

  render() {
    const {activity} = this.props;
    const showTime = activity.event_type_id === 1;
    let currentAttendees = 0;
    activity.activities_users.map((user) =>
      (user.status_code === 1 ? currentAttendees++ : null)
    );
    const disabled = activity.max_attendees === currentAttendees;

    const date = dateUtil.parseDate(activity.starttime);
    console.log(date);

    const cardStyle = {
      paddingBottom: 0,
    };

    const loaderStyle = {
      width: '32px',
      height: '32px',
      left: '-16px',
      top: '-7px'
    };

    return (
      <Card containerStyle={cardStyle}>
        <CardText>
          <div>

            <div>
              <div className={styles.info}>
                <span>
                  <SvgIcon className={styles.calendar} svg={calIcon} />
                  <div className={styles.dateText}>
                    <p className={styles.month}>{date.monthName}</p>
                    <p className={styles.date}>{date.date}</p>
                    <p className={styles.day}>{date.weekday}</p>
                  </div>
                </span>
                <span className={styles.infoText}>{activity.name}</span>
              </div>
              <div className={styles.subInfo}>

              </div>
              <div className={styles.subInfo}>
                <span className={styles.infoText}>{activity.place}</span>
              </div>
            </div>

            <div className={styles.actions}>
              {this.state.fetching ? <Loader size={0.3} className={styles.infoIcon} style={loaderStyle} /> : this.getStatusIcon()}
              <Status status={this.state.status} disabled={disabled || this.state.fetching} className={styles.status} onClick={this.changeStatus} />
              <span className={styles.details}>
                <IconButton onClick={this.showDetails} icon={<SvgIcon width="24px" svg={arrow} />} />
              </span>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}