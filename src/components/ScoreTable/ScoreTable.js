import React, { Component } from 'react';

export default class Score extends Component {

  state = {

  };

  componentDidMount() {
    // getScore();
  }

  getScore() {
    console.log('Score');

    const options = {
      method: 'GET',
      // hostname: 'https://api.holdsport.dk/v1/teams/2683/',
      hostname: 'https://tms.dai-sport.dk/appservice/GetPosition/301/xml',
      port: 443,
      headers: { Authorization: 'Basic YXBwc2VydmljZTohc1N0bXM0VSEh' }
    };
    fetch(options.hostname, options).then((response) => console.log(response));
  }

  render() {
    return (<div>Score</div>);
  }
}
