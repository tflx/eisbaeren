import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import * as dateUtil from '../../utils/date';

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


  render() {
    const {activity} = this.props;
    const start = new Date(activity.starttime);
    const date = {
      weekday: dateUtil.getDay(start.getDay()),
      day: start.getDate(),
      month: start.getMonth() + 1,
      meet: `${start.getHours()}:${start.getMinutes()}`,
      kickoff: `${this.getKickOff().getHours()}:${this.getKickOff().getMinutes()}`
    };

    this.getKickOff();

    const convertedDate = `${date.weekday} ${date.day}/${date.month} ${date.meet} (${date.kickoff})`;


    return (
      <Card>
        <CardHeader title={activity.name} subtitle={convertedDate} />
      </Card>
    );
  }
}