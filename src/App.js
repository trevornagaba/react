import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
    width: '100%',
    height: '100%',
    // display: 'flex',
    // alignItems: 'right'
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

    getDrivers() {
        // Returns all available drivers
        axios.get('https://68.183.98.140/api/display_drivers')
            .then(function (response) {
                // handle success
                let driver_list = []
                driver_list = response.data['drivers']
                for (var n = 0; n < driver_list.length; n++) {
                    this.renderAmbulance(driver_list[n])
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    renderAmbulance(driver) {
        let location = driver['location'].split(",")
        let phone_number = driver['phone_number']
        return (
            <div>
                <Marker
                    onMouseover={this.onMouseoverMarker}
                    onClick={this.onMarkerClick}
                    onMouseout={this.onMouseoutMarker}
                    name={phone_number}
                    // icon={{
                    //   url: './public/static/icon.svg'
                    // }}
                    position={{ lat: location[0], lng: location[1] }}
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
            </div>
        )
    }

    componentDidMount() {

    }


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{
                    lat: 0.135502,
                    lng: 32.721040
                }}
            >
                <div>
                    {this.getDrivers()}
                </div>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDYXogTmMXbKU1OvVff0wo8wzAk83o7Fc0'
})(MapContainer);
