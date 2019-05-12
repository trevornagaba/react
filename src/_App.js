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

    getDrivers = () => {
         // // Uncomment after sorting our cors and err certificate is invalid
            // // Also update the call with the map.html for Kampala map
            // // Returns all available drivers
            // axios.get('https://68.183.98.140/api/display_drivers')
            //     .then(function (response) {
            //         // handle success
            //         let driver_list = []
            //         driver_list = response.data['drivers']
            //         for (var n = 0; n < driver_list.length; n++) {
            //             this.renderAmbulance(driver_list[n])
            //         }
            //     })
            //     .catch(function (error) {
            //         // handle error
            //         console.log(error);
            //     })
            //     .then(function () {
            //         // always executed
            //     });

        let driver_list = [
                {"id": 3, "ambulance_owner": "KCCA", "ambulance_tier": "basic", "licence_plate": "UAZ 356D", "status": "ontrip",
                "location": "0.299372, 32.568841", "phone_number": "0783425174"},
                {"id": 5, "ambulance_owner": "KCCA", "ambulance_tier": "advanced", "licence_plate": "UG 5342T", "status": "ontrip",
                "location": "0.3743234,32.6332207", "phone_number": "0782081501"},
                {"id": 4, "ambulance_owner": "KCCA", "ambulance_tier": "basic", "licence_plate": "UAD 654R", "status": "available",
                "location": "0.3202003,32.5777486", "phone_number": "0779177955"},
                {"id": 7, "ambulance_owner": "KCCA", "ambulance_tier": "basic", "licence_plate": "UAS 674E", "status": "available",
                "location": "0.2811616,32.6137769", "phone_number": "0776534231"}
        ]
        for (var n = 0; n < driver_list.length; n++) {
            this.renderAmbulance(driver_list[n])
            console.log("successful 3")
        }
    }

    renderAmbulance(driver) {
        let location = driver['location'].split(",")
        let phone_number = driver['phone_number']
        console.log("successful 4")
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
                >
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                        console.log("successful 5")
                    </InfoWindow>
                </Marker>
            </div>
        )
    }

    componentDidMount() {
        this.getDrivers()
        console.log("successful 2")
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{
                    lat: 0.135502,
                    lng: 32.721040
                }}
            >
                // <div>
                //     {this.getDrivers()}
                // </div>
                console.log("successful 1")
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDYXogTmMXbKU1OvVff0wo8wzAk83o7Fc0'
})(MapContainer);
