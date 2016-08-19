import React, { Component } from 'react';
import {getHoldsportData} from '../../utils/holdsport';
import SingleActivity from './SingleActivity';
import H1 from 'components/H1';
import styles from './Activities.css';
import Loader from 'components/Loader/Loader';

export default class Activities extends Component {

  state = {
    activities: null,
    fetching: false
  }

  componentDidMount() {
    this.getActivities();
  }


  getActivities() {
    this.setState({fetching: true});
    getHoldsportData('activities')
    .then(response => {
      this.setState({activities: response});
      this.setState({fetching: false});
    });
  }

  render() {
    const {activities} = this.state;

    return (
      <div>
        <H1>Aktiviteter</H1>
        {activities ?
          <ul className={styles.list}>
            {activities ? activities.map((activity, index) => (
              <li className={styles.singleActivity} key={index}><SingleActivity activity={activity} /></li>
            )) : null}
          </ul>
          :
          <Loader centered />
        }
      </div>
    );
  }
}
