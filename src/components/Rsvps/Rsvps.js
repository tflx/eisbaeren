import React, {Component, PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as date from 'utils/date';
import styles from './Rsvps.css';
import Collapse from 'react-collapse';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import arrow from '../../images/arrow-down.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import Divider from 'components/Divider';

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
      const d = date.parseDate(user.updated_at);
      return (<li key={index}>{user.name} - <span>({d.convertedDate} - {d.time})</span></li>);
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

    const buttonStyle = {
      boxShadow: '0'
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