import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import * as dateUtil from '../../utils/date';
import styles from './Activities.css';

export default class SingleActivity extends Component {
  static propTypes = {
    activity: PropTypes.object
  }
  state = {
    activity: null
  };

  getKickOff = () => {
    const {activity} = this.props;
    const start = new Date(activity.starttime);
    const kickoff = new Date(start.getTime() + 45 * 60000);
    return kickoff;
  };

  pad = (int) => (int < 10 ? `0${int}` : int);

  render() {
    const {activity} = this.props;
    const start = new Date(activity.starttime);
    const kickoff = this.getKickOff();
    const date = {
      weekday: dateUtil.getDay(start.getDay()),
      day: start.getDate(),
      month: start.getMonth() + 1,
      meet: `${this.pad(start.getHours())}:${this.pad(start.getMinutes())}`,
      kickoff: `${this.pad(kickoff.getHours())}:${this.pad(kickoff.getMinutes())}`
    };
    const showTime = activity.event_type_id === 1;
    const convertedDate = `${date.weekday} ${date.day}/${date.month}`;
    const time = showTime ? `- ${date.meet} (${date.kickoff})` : '';
    const headerStyle = {
      paddingRight: 0
    };

    return (
      <Card>
        <CardHeader title={activity.name} subtitle={`${convertedDate} ${time}`} textStyle={headerStyle}>
          <p className={styles.location}>{activity.place}</p>
        </CardHeader>
        <CardActions>
          <FlatButton label="Tilmeld" disabled={activity.status === 1} labelPosition="after" icon={<ActionThumbUp />} />
          <FlatButton label="Afmeld" disabled={activity.status === 2} icon={<ActionThumbDown />} />
        </CardActions>
      </Card>
    );
  }
}