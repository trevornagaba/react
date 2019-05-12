import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import DriverLocation from './Map';

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
        <DriverLocation centerAroundCurrentLocation google={this.props.google}>
            <Marker
                onMouseover={this.onMouseoverMarker}
                onClick={this.onMarkerClick}
                onMouseout={this.onMouseoutMarker}
                name={'marker'}
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
        </DriverLocation>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYXogTmMXbKU1OvVff0wo8wzAk83o7Fc0'
})(MapContainer);
