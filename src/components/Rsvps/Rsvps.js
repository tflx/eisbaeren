import React, {Component, PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import styles from './Rsvps.css';
import DateString from 'components/DateString';
import config from '../../../mock-api/config.json';

export default class Rsvps extends Component {
  static propTypes = {
    activityUsers: PropTypes.array,
    date: PropTypes.string,
  };

  state = {
    isOpened: false
  }

  getRsvpOK = (rsvp) => {
    const startDate = new Date(this.props.date);
    const rsvpDate = new Date(startDate.setDate(startDate.getDate() - 7));
    const rsvpLimit = new Date(rsvpDate.setHours(23, 59, 59));
    return (rsvpLimit - new Date(rsvp)) >= 0;
  }

  toggleAccordion = () => {
    this.setState({isOpened: !this.state.isOpened});
  }


  renderList(list, showDate = true) {
    const users = [];

    users.push(list.map((user, index) => {
      const dateString = showDate ? <span><DateString date={user.updated_at} time={false} day={false} /></span> : null;
      const rsvpOK = this.getRsvpOK(user.updated_at);

      return (
        <li key={index} className={rsvpOK ? styles.listItem : styles.listItemRed}>
          <span>{user.name}</span>
          {dateString}
        </li>);
    }));
    return users;
  }


  render() {
    const {activityUsers} = this.props;
    const attends = [];
    const noAttend = [];
    const noRsvp = [];

    for (const user of activityUsers) {
      switch (user.status_code) {
        case 1: attends.push(user);
          break;
        case 2: noAttend.push(user);
          break;
        case 5: noRsvp.push(user);
          break;
        default:
          break;
      }
    }

    attends.sort((a, b) => a.updated_at > b.updated_at);
    noAttend.sort((a, b) => a.updated_at > b.updated_at);

    const tabStyle = {
      backgroundColor: config.colors.lightgrey,
      color: 'black',
      fontSize: '12px'
    };

    const inkBarStyle = {
      backgroundColor: config.colors.primary
    };

    return (
      <div>
        <div>
          <Tabs inkBarStyle={inkBarStyle}>
            <Tab style={tabStyle} label={`Tilmeldt (${attends.length})`}>
              {attends.length ? <ul className={styles.list}> {this.renderList(attends)} </ul> : null}
            </Tab>

            <Tab style={tabStyle} label={`Afmeldt (${noAttend.length})`}>
              {noAttend.length ? <ul className={styles.list}> {this.renderList(noAttend)} </ul> : null}
            </Tab>

            <Tab style={tabStyle} label={`Mangler (${noRsvp.length})`}>
              {noRsvp.length ? <ul className={styles.list}> {this.renderList(noRsvp, false)} </ul> : null}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}