import React, {Component, PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import styles from './Rsvps.css';
import DateString from 'components/DateString';

export default class Rsvps extends Component {
  static propTypes = {
    activityUsers: PropTypes.array
  };

  state = {
    isOpened: false
  }


  toggleAccordion = () => {
    this.setState({isOpened: !this.state.isOpened});
  }

  renderList(list) {
    const users = [];
    users.push(list.map((user, index) => {
      return (<li key={index}>{user.name} - <DateString date={user.updated_at} /></li>);
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
        case 0: noRsvp.push(user);
          break;
        default:
          break;
      }
    }

    const tabStyle = {
      backgroundColor: 'lightgrey',
      color: 'black',
      fontSize: '12px'
    };

    return (
      <div>
        {/* <RaisedButton style={buttonStyle} fullWidth onClick={this.toggleAccordion} label="Spiller status" labelPosition="before" icon={<SvgIcon className={this.state.isOpened ? styles.accordionToggleUp : styles.accordionToggle} svg={arrow} />} /> */}
        <div>
          <Tabs>
            <Tab style={tabStyle} label={`Tilmeldt (${attends.length})`}>
              {attends.length ? <ul className={styles.list}> {this.renderList(attends)} </ul> : null}
            </Tab>

            <Tab style={tabStyle} label={`Afmeldt (${noAttend.length})`}>
              {noAttend.length ? <ul className={styles.list}> {this.renderList(noAttend)} </ul> : null}
            </Tab>

            <Tab style={tabStyle} label={`Mangler (${noRsvp.length})`}>
              {noRsvp.length ? <ul className={styles.list}> {this.renderList(noRsvp)} </ul> : null}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}