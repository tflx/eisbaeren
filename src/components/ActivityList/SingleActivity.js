import React, {Component, PropTypes} from 'react';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import soccer from '../../images/soccer.svg';
import star from '../../images/star-circle.svg';
// import active from '../../images/check-circle.svg';
// import inactive from '../../images/close-circle.svg';
// import marker from '../../images/map-marker.svg';
// import calendar from '../../images/calendar-clock.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import * as dateUtil from '../../utils/date';
import styles from './Activities.css';
// import Button from 'components/Button';
import Loader from 'components/Loader';

export default class SingleActivity extends Component {
  static propTypes = {
    activity: PropTypes.object
  }
  state = {
    activity: null,
    fetching: false
  };

  getKickOff = () => {
    const {activity} = this.props;
    const start = new Date(activity.starttime);
    const kickoff = new Date(start.getTime() + 45 * 60000);
    return kickoff;
  };


  getStatusIcon() {
    // const {activity} = this.props;
    const node = <span className={styles.infoIcon} />;
    // switch (activity.status) {
    //   case 1: node = <SvgIcon svg={active} className={styles.statusActive} />;
    //     break;
    //   case 2: node = <SvgIcon svg={inactive} className={styles.statusInactive} />;
    //     break;
    //   default: node = <span className={styles.infoIcon} />;
    // }
    return node;
    // return node;
  }

  pad = (int) => (int < 10 ? `0${int}` : int);

  changeStatus = (event) => {
    console.log(event);
    this.setState({fetching: true});
  }

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
    const iconStyle = {
      width: '16px',
      height: '16px',
    };
    const buttonStyle = {
      flex: '0 1 auto',
      boxShadow: 'none',
      border: '1px solid lightgrey',
      marginLeft: '-1px',
    };
    const iconStyleBig = Object.assign(iconStyle, {width: '22px', height: '22px'});
    const eventIcon = activity.event_type_id === 1 ? soccer : star;


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
            <div className={styles.info}>
              <SvgIcon svg={eventIcon} style={iconStyleBig} className={styles.infoIcon} />
              <span className={styles.infoText}>{activity.name}</span>
            </div>
            <div className={styles.subInfo}>
              <span style={iconStyle} className={styles.infoIcon} />
              <span className={styles.infoText}>{`${convertedDate} ${time}`}</span>
            </div>
            <div className={styles.subInfo}>
              <span style={iconStyle} className={styles.infoIcon} />
              <span className={styles.infoText}>{activity.place}</span>
            </div>
            <div className={styles.info}>
              {this.state.fetching ? <Loader size={0.3} className={styles.infoIcon} style={loaderStyle} /> : this.getStatusIcon()}
              <span>
                <RaisedButton style={buttonStyle} label={activity.status === 1 ? 'Tilmeldt' : 'Tilmeld'} disabled={activity.status === 1 || this.state.fetching} onClick={this.changeStatus} />
                <RaisedButton style={buttonStyle} label={activity.status === 2 ? 'Afmeldt' : 'Afmeld'} disabled={activity.status === 2 || this.state.fetching} onClick={this.changeStatus} />
              </span>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}