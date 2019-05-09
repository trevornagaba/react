import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '75%',
  height: '90%'
};

export class MapContainer extends Component {
  render() {
    return (
        <div>
            <div><h1>Hello World</h1></div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 0.135502,
            lng: 32.721040
          }}
        />
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYXogTmMXbKU1OvVff0wo8wzAk83o7Fc0'
})(MapContainer);