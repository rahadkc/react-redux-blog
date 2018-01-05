/*global google*/
import React, { Component } from 'react';
// import { connect } from 'react-redux'; 
// import uuid from 'uuid/v4';
// import axios from "axios";
class Map extends Component {
    state = {
        lat: '',
        lng: '',
    }
    componentDidMount() {
        this.initMap();
    }
    
    initMap = () => {
        let lat = this.props.location ? this.props.location.lat : 53.558572;
        let lng = this.props.location ? this.props.location.lng : 9.9278215;
        const element = document.getElementById("mapBox");
        const position = new google.maps.LatLng(lat, lng);
        const options = {
            zoom: 6,
            center: position,
            zoomControl: true,
            // gestureHandling: 'none',
            fullscreenControl: false,
            draggable: true
        };
        const map = new google.maps.Map(element, options);
        const marker = new google.maps.Marker({
            position,
            map
        });
        google.maps.event.addListener(map, 'click', (e) =>{
            map.panTo(e.latLng);
            marker.setPosition(e.latLng);
            let center = map.getCenter();
            this.setState({
                lat: center.lat(),
                lng: center.lng()
            })
        })
    }

    openModal = () => {
        this.props.openModal();
    }
    onEnter = () => {
        const location = {
            lat: this.state.lat,
            lng: this.state.lng
        }
        this.props.locate(location);
        this.props.openModal();
    }
    componentWillUnmount() {
        
        this.setState({
            lat:'',
            lng:''
        })
    }
    
    render() {
        // const { location, id} = this.props;
     
        return ( 
            <div className="mapModal">
                <div className="modalContent">
                    <div><button className="btn btn-danger" onClick={this.openModal}>close</button></div>
                    {/* {<div>
                        <input className="form-control" type="text" ref="location"/>
                    </div>} */}
                    <div className="mapBox" id="mapBox" ref="map">

                    </div>
                    <div id="latLng">Lat:{this.state.lat} <br/> Lng:{this.state.lng}</div>
                    <div>
                        <button className="btn btn-success" onClick={this.onEnter}>Send</button>
                    </div>
                </div>
            </div>
        )
     
  }
}

export default Map;
