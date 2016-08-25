/* global google */
import React, {Component, PropTypes} from 'react';
import scriptLoader from 'utils/script-loader';
import config from '../../../mock-api/config.json';
import fetchJsonp from 'fetch-jsonp';
import Skycons from 'react-skycons';

export default class Forecast extends Component {
  static propTypes = {
    date: PropTypes.string
  }

  state = {
    apiReady: false,
    forecastIcon: ''
  };

  componentDidMount() {
    const apiKey = config.google.apikey;
    scriptLoader.load(`https://maps.googleapis.com/maps/api/js${apiKey ? `?key=${apiKey}` : ''}`)
      .then(() => this.apiReady());
  }


  getForecast(lat, lng) {
    console.log(lat, lng);
    const time = new Date(this.props.date).getTime() / 1000;

    fetchJsonp(`${config.forecast_io.url}${config.forecast_io.apikey}/${lat},${lng},${time}`)
    .then((response) =>
      response.json().then((json) => {
        console.log(json);
        this.setState({forecastIcon: json.daily.data[0].icon});
      }
      )
    );
  }

  geocodeAddress() {
    const geocoder = new google.maps.Geocoder();
    const address = 'Valby Idrætspark 7';

    geocoder.geocode({address}, (results, status) => {
      let lat = 0;
      let lng = 0;

      if (status === 'OK') {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        this.getForecast(lat, lng);
      } else {
        console.log('!Erro');
      }
    });
  }


  apiReady() {
    this.setState({
      apiReady: true
    });

    this.geocodeAddress();
  }

  render() {
    return (
      <div>
        {this.state.forecastIcon ?
          <Skycons icon={this.state.forecastIcon.toUpperCase().replace(/-/g, '_')} autoplay />
          : null
        }
      </div>
    );
  }
}