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
import location from '../../images/map-marker.svg';
import whistle from '../../images/whistle.svg';
import clock from '../../images/clock.svg';
import soccer from '../../images/soccer.svg';
import star from '../../images/star-circle.svg';
import * as dateUtil from 'utils/date';
import CalendarIcon from 'components/CalendarIcon';

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
    const showPlace = activity.place !== '';
    let currentAttendees = 0;
    activity.activities_users.map((user) =>
      (user.status_code === 1 ? currentAttendees++ : null)
    );
    const disabled = activity.max_attendees === currentAttendees;
    const date = dateUtil.parseDate(activity.starttime);

    const cardStyle = {
      paddingBottom: 0,
    };

    const loaderStyle = {
      width: '72px',
      height: '32px',
      left: '10px',
      top: '-7px'
    };

    const activityIcon = activity.event_type_id === 1 ? soccer : star;

    return (
      <Card containerStyle={cardStyle}>
        <CardText>
          <div>

            <div className={styles.wrap}>

              <CalendarIcon month={date.monthName} weekday={date.weekday} date={date.date} />

              <span className={styles.infoText}>
                <p>
                  <SvgIcon width="18px" svg={activityIcon} />
                  <span>{activity.name}</span>
                </p>
                {showPlace ?
                  <p>
                    <SvgIcon width="18px" svg={location} />
                    <span>{activity.place}</span>
                  </p>
                  : null
                }
                {showTime ?
                  <div>
                    <p>
                      <SvgIcon width="18px" svg={clock} />
                      <span>{date.time}</span>
                    </p>
                    <p>
                      <SvgIcon width="18px" svg={whistle} />
                      <span>{date.kickoff}</span>
                    </p>
                  </div>
                  : null
                }
              </span>

            </div>

            <div className={styles.actions}>
              <span className={styles.fetchingSpace}>
                {this.state.fetching ? <Loader size={0.3} style={loaderStyle} /> : null}
              </span>
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