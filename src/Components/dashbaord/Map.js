import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker
} from "react-google-maps";
import axios from 'axios'
import cookie from 'js-cookie'
import { baseurl } from '../BaseUrl'
class Map extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      locations:[],
        isOpen:false,
        lat: 25.1972018,
        lng: 55.2721877,
        mapPosition: {
          lat: 25.1972018,
          lng: 55.2721877
        },
        markerPosition: {
          lat: 25.1972018,
          lng: 55.2721877
        },
        places: [
        {
           name: "Sydney",
           title: "Sydney",
           position: {lat: -33.847927,lng: 150.6517938}
        },
        {
           name: "Melbourne",
           title: "Melbourne",
           position: {lat: -37.9722342,lng: 144.7729561}
        },
        {
           name: "Perth",
           title: "Perth",
           position: {lat: -31.9546904,lng: 115.8350292}
        }
      ]
    };
}
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
this.fetchData()
    
  }

  fetchData = () =>{
    const token = cookie.get("token")
    axios.post(baseurl+"/api/dashboard",{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }})
  .then(response =>{
    //console.log("by month",response.data)
  this.setState({locations:response.data.locations})    
  })
  }

  /**
   * Get the address and set the address input value to the one selected
   *




  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */


  // onChageLang = value => {
  //   this.setState({
  //     address_ar: value
  //   });
  //   console.log("I am Parent component. I got", value, "from my child.");
  // };


  handleShow = (loc,e)=>{
      console.log(loc)
      this.setState({isOpen:true,lat: loc.lat,lng: loc.lng})
  }

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
        defaultZoom={4}
        defaultCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
       >

         {this.state.locations.map(loc => (
          <Marker
            key={`marker-${loc.id}`}
            title={loc.title_en}
            name={loc.title_en}
            position={{
              lat:loc.lat,
              lng:loc.lng
            
            }}
            onClick={this.handleShow.bind(this,loc)}
            
          >
              {this.state.isOpen &&      <InfoWindow
            key={`infowindow-${loc.id}`}
            visible={true}>
            <div>{loc.title_en}</div>
          </InfoWindow>}
     
          </Marker>
        ))}

    </GoogleMap>
      ))
    );
    let map;
    if (this.state.lat !== undefined) {
      map = (
        <div>
         {/* my field here */}
          <AsyncMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCq6FzlBsSuT-S2zaRh2Rd-i4205DCu57s&region=AE&language=en&libraries=places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: "500px" }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: "300px" }} />;
    }
    return map;
  }
}
export default Map;
