import React, { Component } from 'react';
import holdsport from '../../utils/holdsport';
import SingleActivity from './SingleActivity';
import H1 from 'components/H1';
import styles from './ActivityList.css';
import Loader from 'components/Loader';

export default class ActivityList extends Component {

  state = {
    activities: null,
    fetching: false
  }

  componentDidMount() {
    this.getActivities();
  }


  getActivities() {
    this.setState({fetching: true});
    holdsport.get('activities')
    .then(response => {
      this.setState({activities: response, fetching: false});
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
              <li className={styles.singleActivity} key={index}>
                <SingleActivity activity={activity} />
              </li>
            )) : null}
          </ul>
          :
          <Loader centered />
        }
      </div>
    );
  }
}
