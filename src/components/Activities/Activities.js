import React, { Component } from 'react';
import {getHoldsportData} from '../../utils/holdsport';

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
      console.log(response);
      this.setState({activities: response});
      this.setState({fetching: false});
    });
  }

  renderActivities(teams) {
    console.log(teams[0]);
  }

  render() {
    return (< div / >);
  }
}
