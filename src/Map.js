import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};

export class DriverLocation extends React.Component {
  constructor(props) {
    super(props);
    // const lat = this.props.initialCenter.lat
    // const lng = this.props.initialCenter.lng
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      driverLocation: {
        lat: lat,
        lng: lng
      }
    };
  }


  // The <Map /> api includes subcomponents intended on being used as children of the Map component. 
  // Any child can be used within the Map component and will receive the three props (as children):
  // map - the Google instance of the map
  // google - a reference to the window.google object
  // mapCenter - the google.maps.LatLng() object referring to the center of the map instance


  // Takes prevProps and prevState as arguements
  // Is invoked immediately after updating occurs
  componentDidUpdate(prevProps, prevState) {
    // If the reference to the window.google object has changed
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    // If driver location has changed
    if (prevState.driverLocation !== this.state.driverLocation) {
      this.recenterMap();
    }
  }

   recenterMap() {
    // The <Map /> api includes subcomponents intended on being used as children of the Map component. 
    // Any child can be used within the Map component and will receive the three props (as children):
    // map - the Google instance of the map
    // google - a reference to the window.google object
    // mapCenter - the google.maps.LatLng() object referring to the center of the map instance

    const map = this.map;
    const current = this.state.driverLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            driverLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }

  loadMap() {
    // Check if google is available
    if (this.props && this.props.google) {
      // If it is, we'll be using the map key on the object, so let's extract it here:
      const { google } = this.props;
      const maps = google.maps;


      // The loadMap() function is only called after the component has been rendered (i.e. there is a DOM component on the page), 
      // so we'll need to grab a reference to the DOM component where we want the map to be placed. 
      // In our render method, we have a <div> component with a ref='map'. 
      // We can grab a reference to this component using the ReactDOM library:
      // this.ref. map refers to the div element with a ref = "map"
      const mapRef = this.refs.map;

      // reference to the actual DOM element with the ref
      const node = ReactDOM.findDOMNode(mapRef);

      // Same as zoom = this.props.zoom
      // Will be the default zoom in this case
      let { zoom } = this.props;
      const { lat, lng } = this.state.driverLocation;
      // Sent from the google maps API
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );

      // maps.Map() is constructor that instantiates the map as per the actual google maps documentation
      // which says;  
      // map = new google.maps.Map(document.getElementById('map'), {
      //   center: {lat: -34.397, lng: 150.644},
      //   zoom: 8
      // });
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    // Destructuring object assignment
    // a shorthand way to get the object properties' value from an object(such as this.props in here).
    // So when you want to extract a property named 'var1' and 'var2' from the 'this.props', by writing the instruction:
    // const { var1, var2 } = this.props;
    // Same as const children = this.props.children
    // Curly braces { } Tells JSX to handle content as javacript instead of a string and therefore use the variable
    // Curly braces after the equals sign are an object declaration and in the comment below they (inner ones) are used to refernce an object

    // The children here are the centerAroundCurrentLocation and google={this.props.google} passed from App.js
    const { children } = this.props;

    // Without the above declaration, we could write the function as if (!{{ this.props.children }})
    if (!children) return;

    // The map() method creates a new array with the results of calling a provided function on every element in the calling array
    return React.Children.map(children, c => {
      if (!c) return;

      // Clone and return a new React element using element as the starting point.
      // The resulting element will have the original element’s props with the new props merged in shallowly.
      // New children will replace existing children. key and ref from the original element will be preserved.

      // Replace with createElement so as to have multiple locations and not overwrite
      return React.cloneElement(c, {
        // 
        map: this.map,
        // From the props passed from App.js
        google: this.props.google,
        // From the original state in constructor
        mapCenter: this.state.driverLocation
      });
    });
  }

  render() {
    // Make a new copy of the mapStyles object
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }

}
export default DriverLocation;

// Define prop types, best practice for resusability
DriverLocation.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object
}

DriverLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
      lat: 0.135502,
      lng: 32.721040
  },
  centerAroundCurrentLocation: false,
  visible: true
};
