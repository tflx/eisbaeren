/* global google */
import React, {Component, PropTypes} from 'react';
import config from '../../../mock-api/config.json';
// import scriptLoader from 'utils/script-loader';

export default class StaticMap extends Component {
  static propTypes = {
    address: PropTypes.string
  }
  state = {
    map: null,
    directions: null
  };

  componentDidMount() {
    // const apiKey = config.google.apikey;
    // scriptLoader.load(`https://maps.googleapis.com/maps/api/js${apiKey ? `?key=${apiKey}` : ''}`)
    //   .then(() => this.geocodeAddress());
    // this.renderMap();
  }

  /*
  geocodeAddress() {
    const geocoder = new google.maps.Geocoder();
    const address = this.props.address;

    geocoder.geocode({address}, (results, status) => {
      let lat = 0;
      let lng = 0;

      if (status === 'OK') {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        this.renderMap(lat, lng);
      } else {
        console.log('!Erro');
      }
    });
  }*/

  renderMap() {
    // const addr = `${lat},${lng}`;
  }

  render() {
    const parsedAddress = this.props.address.toLowerCase().replace(/ /g, '+');
    let addr = '';
    switch (parsedAddress) {
      case 'kløvermarken':
        addr = 'Kløvermarkens+idrætsanlæg';
        break;

      case 'valby+idrætspark+7':
        addr = 'Valby+Idrætspark,Julius+Andersens+Vej,Copenhagen,Denmark';
        break;

      default:
        addr = parsedAddress;
    }

    const scale = window.devicePixelRatio;
    const width = window.innerWidth - 40;
    const height = 150;
    // const map = `https://maps.googleapis.com/maps/api/staticmap?center=`Brooklyn+Bridge,New+York,NY`&zoom=13&size=600x300&maptype=roadmap`;
    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${addr}&zoom=14&size=${width}x${height}&scale=${scale}&maptype=roadmap&key=${config.google.staticApi}`;
    const directions = `comgooglemaps://?daddr=${addr}&directionsmode=driving`;
    // this.setState({map, directions});

    return (
      <div>
        {map ? <a href={directions}><img width={width} height={height} alt="map" src={map} /></a> : null}
      </div>
    );
  }
}