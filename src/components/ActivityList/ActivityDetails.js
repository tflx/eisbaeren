import React, {Component, PropTypes} from 'react';
import holdsport from 'utils/holdsport';
import * as dateUtil from '../../utils/date';
import Loader from 'components/Loader';
import H1 from 'components/H1';
import styles from './ActivityDetails.css';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import location from '../../images/map-marker.svg';
import calendar from '../../images/calendar-clock.svg';
import Status from 'components/Status/Status';
import Forecast from 'components/Forecast/Forecast';
import Comment from 'components/Comment/Comment';
import Rsvps from 'components/Rsvps/Rsvps';
import GameCard from 'components/GameCard/GameCard';
import {getAllEmails} from '../../utils/utils';

export default class ActivityDetails extends Component {
  static propTypes = {
    eventId: PropTypes.string
  }

  state = {
    activity: null,
    status: null,
    fetching: false
  };

  componentDidMount() {
    this.getActivity();
  }

  getActivity() {
    const {eventId} = this.props;
    this.setState({fetching: true});
    holdsport.get(`activities/${eventId}`).then((response) => {
      this.setState({activity: response, status: response.status, fetching: false});
    });
  }

  getAttendingPlayers() {
    let players = [];
    players = this.state.activity.activities_users.filter((user) =>
      user.status_code === 1
    );
    return players;
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
    holdsport.push(action_path, data, action_method)
      .then((response) =>
        this.setState({status: response.status_code, fetching: false})
      );
  }

  render() {
    const activity = this.state.activity;

    if (!activity) {
      return (<Loader centered />);
    }

    const showTime = activity.event_type_id === 1;
    const {time, convertedDate} = dateUtil.parseDate(activity.starttime, showTime);


    return (
      <div>
        {this.state.activity ?
          <div>
            <H1>{activity.name}</H1>

            <div className={styles.forecast}>
              <Forecast date={activity.starttime} />
            </div>

            <Status status={this.state.status} disabled={this.state.fetching} className={styles.status} onClick={this.changeStatus} />

            <div className={styles.wrapper}>
              <div className={styles.info}>
                <SvgIcon svg={location} />
                <span>{activity.place}</span>
              </div>

              <div className={styles.info}>
                <SvgIcon svg={calendar} />
                <span>{convertedDate} {time}</span>
              </div>
            </div>

            <div>
              <Comment activity={activity} />
            </div>

            <div>
              <Rsvps activityUsers={activity.activities_users} />
            </div>

            <div>
              <GameCard attending={this.getAttendingPlayers()} starttime={activity.starttime} comment={activity.comment} />
            </div>

            <div>
              {/* <a href={`mailto:${getAllEmails(this.state.activity.activities_users)}`}>Kampindkaldelse</a> */}
              <a href="#">Kampindkaldelse</a>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
}