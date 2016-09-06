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
import {Card, CardText, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import StaticMap from 'components/StaticMap/StaticMap';

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
    const promise = holdsport.get(`activities/${eventId}`).then((response) => {
      this.setState({activity: response, status: response.status, fetching: false});
    });

    console.log(promise);
  }

  getAttendingPlayers() {
    return this.state.activity.activities_users.filter((user) =>
      user.status_code === 1
    );
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
        <H1>{activity.name}</H1>
        <div>
          {this.state.activity ?
            <div>

              <Card className={styles.card}>
                <StaticMap address={activity.place} />
                <CardText>
                  <div className={styles.info}>
                    <SvgIcon svg={location} />
                    <span>{activity.place}</span>
                  </div>

                  <div className={styles.info}>
                    <SvgIcon svg={calendar} />
                    <span>{convertedDate} {time}</span>
                  </div>
                </CardText>
              </Card>

              <Card className={styles.card}>
                <CardText>
                  <Status status={this.state.status} disabled={this.state.fetching} className={styles.status} onClick={this.changeStatus} />
                </CardText>
                <Divider />
                <CardHeader title="Spiller status" actAsExpander showExpandableButton />
                <CardText expandable>
                  <Rsvps activityUsers={activity.activities_users} />
                </CardText>
              </Card>

              <Card className={styles.card}>
                <CardHeader title="Kommentarer" />
                <CardText>
                  <Comment activity={activity} />
                </CardText>
              </Card>


              <div className={styles.actions}>
                <span>
                  <GameCard attending={this.getAttendingPlayers()} starttime={activity.starttime} comment={activity.comment} />
                </span>

                <span>
                  <RaisedButton label="Kampindkaldelse" />
                </span>
              </div>


            </div>
            : null
          }
        </div>
      </div>
    );
  }
}