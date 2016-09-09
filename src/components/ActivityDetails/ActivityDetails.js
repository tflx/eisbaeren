import React, {Component, PropTypes} from 'react';
import holdsport from 'utils/holdsport';
import Loader from 'components/Loader';
import H1 from 'components/H1';
import styles from './ActivityDetails.css';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import location from '../../images/map-marker.svg';
import calendar from '../../images/calendar-clock.svg';
import Status from 'components/Status/Status';
// import Forecast from 'components/Forecast/Forecast';
import Comment from 'components/Comment/Comment';
import Rsvps from 'components/Rsvps/Rsvps';
import GameCard from 'components/GameCard/GameCard';
import GameMail from 'components/GameMail/GameMail';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
// import StaticMap from 'components/StaticMap/StaticMap';
import DateString from 'components/DateString';
import logo from 'static/logo.svg';

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

  getActivity = () => {
    const {eventId} = this.props;
    this.setState({fetching: true});
    holdsport.get(`activities/${eventId}`).then((response) => {
      this.setState({activity: response, status: response.status, fetching: false});
    });
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

    if (!activity || this.state.fetching) {
      return (<Loader centered />);
    }

    const showTime = activity.event_type_id === 1;

    const headerStyle = {
      paddingBottom: '0px'
    };

    return (
      <div>
        <H1 className={styles.headline}>{activity.name}</H1>
        <div>
          {this.state.activity ?
            <div>

              <Card className={styles.card}>
                <div className={styles.header}>
                  <SvgIcon svg={logo} width="70px" />
                </div>
                <CardHeader style={headerStyle} title="Info" actAsExpander showExpandableButton />
                <CardText>
                  <div className={styles.info}>
                    <SvgIcon svg={location} />
                    <span>{activity.place}</span>
                  </div>

                  <div className={styles.info}>
                    <SvgIcon svg={calendar} />
                    <span><DateString size="14px" time={showTime} kickoff date={activity.starttime} parenthesis={false} /></span>
                  </div>

                </CardText>
                <CardText expandable>
                  <p className={styles.activityComment}>{activity.comment}</p>
                </CardText>
                <CardText className={styles.actions} >
                  <GameCard attending={this.getAttendingPlayers()} starttime={activity.starttime} comment={activity.comment} />
                  <GameMail attending={this.getAttendingPlayers()} starttime={activity.starttime} name={activity.name} place={activity.place} />
                </CardText>
              </Card>

              <Card className={styles.card} >
                <CardText>
                  <Status reloadActivity={this.getActivity} status={this.state.status} disabled={this.state.fetching} className={styles.status} onClick={this.changeStatus} />
                </CardText>
                <Divider />
                <CardHeader title="Tilmeldingsstatus" actAsExpander showExpandableButton />
                <CardText expandable>
                  <Rsvps activityUsers={activity.activities_users} date={activity.starttime} />
                </CardText>
              </Card>

              <Card className={styles.card} initiallyExpanded >
                <CardHeader title="Kommentarer" actAsExpander showExpandableButton />
                <CardText expandable>
                  <Comment reloadActivity={this.getActivity} activity={activity} />
                </CardText>
              </Card>

            </div>
            : null
          }
        </div>
      </div>
    );
  }
}