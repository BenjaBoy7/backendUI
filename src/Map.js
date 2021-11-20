import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import Translator from "./Translator";
Geocode.setApiKey("AIzaSyCq6FzlBsSuT-S2zaRh2Rd-i4205DCu57s");
Geocode.enableDebug();
class Map extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      address: "",
      city: "",
      area: "",
      state: "",
      streetorbuild:  "",
          area: "",
          emirates:  "",
          country:"",

      address_ar:"",
      street:"",
      value:"",
      lat: 25.1972018,
      lng: 55.2721877,
      mapPosition: {
        lat: 25.1972018,
        lng: 55.2721877
      },
      markerPosition: {
        lat: 25.1972018,
        lng: 55.2721877
      }
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {

  
    // Geocode.fromLatLng(
    //   this.state.mapPosition.lat,
    //   this.state.mapPosition.lng
    // ).then(
    //   response => {
        
    //     const address = response.results[0].formatted_address,

    //       addressArray = response.results[0].address_components,
    //       city = this.getCity(addressArray),
    //       area = this.getArea(addressArray),
    //       state = this.getState(addressArray);

    //     console.log("city", city, area, state);
    //     this.translate(address)
    //     this.setState({
    //       address: address ? address : "",
    //       area: area ? area : "",
    //       city: city ? city : "",
    //       state: state ? state : ""
    //     });
        

    //    // this.handleChangeValue()
    //     //this.handleChangeArabicValue();
        
    //    // this.setState({address_ar:})
      
    
    //   },
    //   error => {
    //     console.error(error);
    //   }
    


    // );
  
    
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.state.markerPosition.lat !== this.state.lat ||
  //     this.state.address !== nextState.address ||
  //     this.state.city !== nextState.city ||
  //     this.state.area !== nextState.area ||
  //     this.state.state !== nextState.state
  //   ) {
  //     return true;
  //   } else if (this.state.lat === nextProps.center.lat) {
  //     return false;
  //   }
  // }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = addressArray => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = addressArray => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = addressArray => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   * @param event
   */
   handleChangeValue =(e) =>{
    
    // this.setState({
    //   address: this.state.address,

    // });
    console.log("english",this.state.address)
   
    //this.props.onInputChageEnglish(this.state.address);
    
   }

   handleChangeArabicValue =(e) =>{
    console.log("arabic",this.state.address_ar)
    
    // this.setState({
    //   address_ar: this.state.address_ar,

    // });
    //this.props.onInputChageArabic(this.state.address_ar);
    
   }




  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = event => {};
  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = place => {
    console.log("fetch data",place.name)
    let alldata = place.formatted_address

   let mydata = alldata.split('-');

    this.translate(alldata)
  
    const address = place.formatted_address,
      // addressArray = place.address_components,
      // city = this.getCity(addressArray),
      // area = this.getArea(addressArray),
      // state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      //address_ar: address ? address : "",
      streetorbuild:  place.name,
      area:  mydata[1],
      emirates:  mydata[2],
      country:mydata[3],
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
      lat: latValue,
        lng: lngValue

    });
  };
  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = event => {
   // console.log("event", event);
   
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng(),
      addressArray = [];
    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        console.log("map response",response)
        console.log("my lat",response.results[0].geometry.location.lat)
        console.log("my lng",response.results[0].geometry.location.lng)
          let alldata = response.results[0].formatted_address

    
        let mydata = alldata.split('-');

        console.log("your street after",mydata[0])
       // let myarea = alldata.split('-',2,1);
        console.log("your area after",mydata[1])
        //let myemirate = alldata.split('-',3,1);
        console.log("your emi after",mydata[2])
       // let mycountry = alldata.split('-',4,1);
        console.log("your cou after",mydata[3])

        const address = response.results[0].formatted_address;
          //addressArray = response.results[0].address_components,
         // city = this.getCity(addressArray),
         // area = this.getArea(addressArray),
         // state = this.getState(addressArray);
        
          this.translate(address)
          //this.translate(mydata[3])
          
        this.setState({
          address: address ? address : "",
          //address_ar: address ? address : "",
          streetorbuild:  mydata[0],
          area:  mydata[1],
          emirates:  mydata[2],
          country:mydata[3],
          markerPosition: {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
          },
          mapPosition: {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
          },
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng
          
          //street:substrings
        });
       
        //console.log("translate now", this.translate(address))
       // this.handleChangeValue()
       // this.handleChangeArabicValue();
      },
      error => {
        console.error(error);
      }
    );
  };

  // onChageLang = value => {
  //   this.setState({
  //     address_ar: value
  //   });
  //   console.log("I am Parent component. I got", value, "from my child.");
  // };

  translate= async (source)=> {
    const sourceLanguage = "en";
    const targetLanguage = "ar";
  
    const url =
      "https://translate.googleapis.com/translate_a/single?key=AIzaSyCq6FzlBsSuT-S2zaRh2Rd-i4205DCu57s&client=gtx&sl=" +
      sourceLanguage +
      "&tl=" +
      targetLanguage +
      "&dt=t&q=" +
      encodeURI(source);
  
    const result = await fetch(url);
    const json =  await result.json();
  
    try {
      this.props.onInputChageArabic(json[0][0][0]);
       this.props.onInputChageEnglish(this.state.address);
       this.props.onInputChageBuildName(this.state.streetorbuild);
       this.props.onhandleLat(this.state.lat);
       this.props.onhandleLng(this.state.lng);
    } catch (error) {
      return error.message;
    }
    
  }


  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={15}
           options = {
             { country: "us" }
         
          }
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng
          }}
        >
          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "100px",
            }}
            onPlaceSelected={this.onPlaceSelected}
            options={{
              types: ["(regions)"],
              componentRestrictions: { country: "ae" },
              fields: ["address_components", "geometry", "icon", "name","formatted_address"],
              strictBounds: false,
              types: ["establishment"],
              
            }}
          />
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng
            }}
          />
          <Marker />
          {/* InfoWindow on top of marker */}
          {/* <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow> */}
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
