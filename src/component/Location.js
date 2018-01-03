/*global google*/
import React, { Component } from 'react';

class Location extends Component {
    componentDidMount() {
      this.initMap()
    }
    componentWillReceiveProps(nextProps) {
      const lat = nextProps.location.lat;
      const lng = nextProps.location.lng;
      (nextProps.location !== this.props.location) && this.initMap(lat, lng);
    }
    initMap = (lat,lng) => {
        let latVal = lat ? lat : this.props.location.lat;
        let lngVal = lng ? lng : this.props.location.lng;
        let id = this.props.id;
        const element = document.getElementById(`mp-${id}`);
        const position = new google.maps.LatLng(latVal, lngVal);
        const options = {
            zoom: 6,
            center: position,
            zoomControl: false,
            fullscreenControl: false,
            draggable: false
        };
        const map = new google.maps.Map(element, options);
        
        const marker = new google.maps.Marker({
          position,
      });
      marker.setMap(map);
    }

    render() {
        const { id } = this.props;
        return <div className="mapBox" id={`mp-${id}`}></div>
    }
}
  
  export default Location;
