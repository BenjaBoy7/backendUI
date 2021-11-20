import React, { Component } from 'react'
import './map.css'
 class NewMap extends Component {

    constructor(props){
        super(props)
        this.state={
        lat: 51.507307, lng: -0.08114 
        }
    }

    componentDidMount(){
        var loadScript = function (src) {
            var tag = document.createElement("script");
            tag.async = false;
            tag.src = src;
            document.getElementsByTagName("body")[0].appendChild(tag);
          };
          loadScript(
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&libraries=localContext&v=beta&channel=2"
          );
          setTimeout(() => {
            this.initMap();
          }, 5000);
    }

    renderMap = () => {
        window.initMap = this.initMap;
      };
    initMap = () => {
        //let map;
        const google = window.google;
        const myCoordinates = { lat: this.state.lat, lng: this.state.lng};
        const lcMapView = new google.maps.localContext.LocalContextMapView({
          element: document.querySelector("#map-container"),
          placeTypePreferences: this.state.propertyTypeRefs,
          maxPlaceCount: 5,
        });
        const map = lcMapView.map;
        map.setOptions({
          center: myCoordinates,
          zoom: 14,
        });
        new google.maps.Marker({
          position: myCoordinates,
          map,
        });
    }
    render() {
        return (
            <div>
               <div id="map-container"></div> 
            </div>
        )
    }
}

export default NewMap
