import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '75%',
  height: '90%',
  align: 'right',
  position: 'relative'
};

export class MapContainer extends Component {
  state = {
    markerClicked: false,
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      markerClicked: true
    })
  };

  onMouseoverMarker = (props, marker, e) => {
    if (!this.state.showingInfoWindow) {
      this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
      })
    }
  };

  onMouseoutMarker = props => {
    if (!this.state.markerClicked) {
      if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
      }
    }
  }
  
  onClose = props => {
    if (this.state.showingInfoWindow) {
        this.setState({
        markerClicked: false,
        showingInfoWindow: false,
        activeMarker: null
        });
    }
  };


  render() {
    return (
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 0.135502,
            lng: 32.721040
          }}
        >
          <Marker
              onMouseover={this.onMouseoverMarker}
              onClick={this.onMarkerClick}
              onMouseout={this.onMouseoutMarker}
              name={'My marker'}
              // icon={{
              //   url: './public/static/icon.svg'
              // }}
          />
          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
          >
              <div>
              <h4>{this.state.selectedPlace.name}</h4>
              </div>
          </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYXogTmMXbKU1OvVff0wo8wzAk83o7Fc0'
})(MapContainer);