import React, { Component } from 'react'
import jQuery from 'jquery'
import axios from 'axios';
import { baseurl, baseurlImg } from '../../../../Components/BaseUrl';

// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './AddProperty.css'
//import  Map  from "../../Map"
import i18next from 'i18next'
import Swal from 'sweetalert2'
import cookie from 'js-cookie'
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    InfoWindow,
    Marker
  } from "react-google-maps";
  import Autocomplete from "react-google-autocomplete";
  import Geocode from "react-geocode";
//import '../Test.css'

// import MapboxAutocomplete from 'react-mapbox-autocomplete';


// import './App.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoiZmluZHByb3BlcnRpZXMiLCJhIjoiY2tsbzVlN3VwMGFoOTJva2FqeWEwMTgwcyJ9.0tAYLLNh2G0wNmTKt350aQ';
let lang =localStorage.getItem("lang") || "en";

let map;
const API_KEY = "AIzaSyAZM9oQLX8iBClpzrJyc8qV-kDeHMAytko";

const role= cookie.get("role");
class AdminEditList extends Component {
    
        constructor(props) {
        super(props);
        this.state = {
                property:{},
                medias:[],
                categories: [],
                healthandfitness: [],
                amenitiesfeatures: [],
                miscellaneous: [],
                securityandtechnology: [],
                propertytypes: [],
                agents: [],
                agent:{},
                propertyType_en: "",
                propertyType_ar: "",

              //  categoryId: "0",
                propertytype_id:"0",
                selectedAgent:0,
               // propertyTypeDisabld: "disabled",
                rentOrSale: "",
                // lng: 54.9,
                // lat: 24.35,
                // zoom: 5,
                bathroomfeature: "row d-none",
                furnishstatusfields: "mb-3 d-none",
                rentfileds: "row d-none",
                occupancyfiled: "row d-none",
                readyoffPlanfield: "row d-none",
                landfeatures: "row d-none",
                location_name_en:"",
                location_name_ar:"",
                address:"",
                address_ar:"",
                // details
                country:"",
                country_ar:"",
                emirate:"",
                emirate_ar:"",
                area:"",
                area_ar:"",
                streetorbuild:"",
                streetorbuild_ar:"",
                //
                firnished:0,
                checked:false,
                // Amenties
                gym:false,
                swimmingpool:false,
                medical:false,
                sauna_steem:false,
                disability_access:false,
                built_in_wardobes:false,
                barbaque_area:false,
                cafeteria:false,
                kitchen:false,
                central_ac:false,
                garden:false,
                furnished:false,
                disposal:false,
                kidsplay:false,
                parking:false,
                balcony:false,
                atm_acxeess:false,
                water_view:false,
                landmark_view:false,
                day_care:false,
                security_guard:false,
                cctv:false,
                internet:false,
                satelite_cable_tv:false,
                // property details
                title_en:"",
                title_ar:"",
                description_en:"",
                description_ar:"",
                square_area:0,
                price:0,
                bedroom:0,
                bathroom:0,
                rent_frequency:0,
                completion_status:0,
                ownership_status:0,
                min_contract_period:0,
                vacating_period:0,
                maintainance_fee:0,
                paid_by:0,
                permit_number:0,
                videoRows:[],
                allfiles:[],
                video_source:"",
                video_title:"",
                video_link:"",
                purpose:1,
                image:"",
                featuredimage:null,
                imageShow:null,
                agentLoading:false,
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

            }
            this.mapContainer = React.createRef();
            this.handleChange = this.handleChange.bind(this);
            this.handleFeaturedImage = this.handleFeaturedImage.bind(this);
            
        }

        onMarkerDragEnd = event => {
          // console.log("event", event);
          // return;
          
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
               console.log("full data",alldata)
               console.log("your street after",mydata[0])
              // let myarea = alldata.split('-',2,1);
               console.log("your area after",mydata[1])
               //let myemirate = alldata.split('-',3,1);
               console.log("your emi after",mydata[2])
              // let mycountry = alldata.split('-',4,1);
               console.log("your cou after",mydata[3])

               // full data
               if(this.isArabic(alldata)){
                  this.translate_fulldata(alldata,"ar","en")
              }
              else {
                  this.translate_fulldata(alldata,"en","ar")
              }
              // country

              if(this.isArabic(mydata[3])){
                  this.translate_country(mydata[3],"ar","en")
              }
              else {
                  this.translate_country(mydata[3],"en","ar")
              }

                 // emirate

                 if(this.isArabic(mydata[2])){
                  this.translate_emirate(mydata[2],"ar","en")
              }
              else {
                  this.translate_emirate(mydata[2],"en","ar")
              }

                 // area

                 if(this.isArabic(mydata[1])){
                  this.translate_area(mydata[1],"ar","en")
              }
              else {
                  this.translate_area(mydata[1],"en","ar")
              }

                 // build or street

                 if(this.isArabic(mydata[0])){
                  this.translate_buildorstreet(mydata[0],"ar","en")
              }
              else {
                  this.translate_buildorstreet(mydata[0],"en","ar")
              }
              
       
               const address = response.results[0].formatted_address;

              // console.log("full")
                 //addressArray = response.results[0].address_components,
                // city = this.getCity(addressArray),
                // area = this.getArea(addressArray),
                // state = this.getState(addressArray);
               
                 this.translate(address)
                 //this.translate(mydata[3])
                 
               this.setState({
                 //: alldata,
                 //address_ar: address ? address : "",
                 //streetorbuild:  mydata[0],
                 area:  mydata[1],
                 emirate:  mydata[2],
                 //country:mydata[3],
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
              this.mapfunction()
             },
             error => {
               console.error(error);
             }
             
           );
         
         };

         onPlaceSelected = (place) => {

   console.log("place",place)
          const arraylength = place.address_components.length;
          const alldata = place.address_components;
          const latValue = place.geometry.location.lat();
          const lngValue = place.geometry.location.lng();

          this.setState({
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
             
          })

          this.mapfunction()



          if(arraylength >= 10){
            console.log("length is 7 or greater ")
   

              // full data
              if(this.isArabic(place.formatted_address)){
                  this.translate_fulldata(place.formatted_address,"ar","en")
              }
              else {
                  this.translate_fulldata(place.formatted_address,"en","ar")
              }
              // country

              if(this.isArabic(alldata[9].long_name)){
                  this.translate_country(alldata[9].long_name,"ar","en")
              }
              else {
                  this.translate_country(alldata[9].long_name,"en","ar")
              }

                 // emirate

                 if(this.isArabic(alldata[8].long_name)){
                  this.translate_emirate(alldata[8].long_name,"ar","en")
              }
              else {
                  this.translate_emirate(alldata[8].long_name,"en","ar")
              }

                 // area

                 if(this.isArabic(alldata[3].long_name)){
                  this.translate_area(alldata[3].long_name,"ar","en")
              }
              else {
                  this.translate_area(alldata[3].long_name,"en","ar")
              }

                 // build or street

                 if(this.isArabic(alldata[2])){
                  this.translate_buildorstreet(alldata[2].long_name +" - "+place.name,"ar","en")
              }
              else {
                  this.translate_buildorstreet(alldata[2].long_name +" - "+place.name,"en","ar")
              }
             
        

          }
       else

          if(arraylength == 9){
      

              // full data
              if(this.isArabic(place.formatted_address)){
                  this.translate_fulldata(place.formatted_address,"ar","en")
              }
              else {
                  this.translate_fulldata(place.formatted_address,"en","ar")
              }
              // country

              if(this.isArabic(alldata[8].long_name)){
                  this.translate_country(alldata[8].long_name,"ar","en")
              }
              else {
                  this.translate_country(alldata[8].long_name,"en","ar")
              }

                 // emirate

                 if(this.isArabic(alldata[7].long_name)){
                  this.translate_emirate(alldata[7].long_name,"ar","en")
              }
              else {
                  this.translate_emirate(alldata[7].long_name,"en","ar")
              }

                 // area

                 if(this.isArabic(alldata[3].long_name)){
                  this.translate_area(alldata[3].long_name,"ar","en")
              }
              else {
                  this.translate_area(alldata[3].long_name,"en","ar")
              }

                 // build or street

                 if(this.isArabic(alldata[2])){
                  this.translate_buildorstreet(alldata[2].long_name +" - "+place.name,"ar","en")
              }
              else {
                  this.translate_buildorstreet(alldata[2].long_name +" - "+place.name,"en","ar")
              }
          
        

          }
else

          if(arraylength == 8){
          

              // full data
              if(this.isArabic(place.formatted_address)){
                  this.translate_fulldata(place.formatted_address,"ar","en")
              }
              else {
                  this.translate_fulldata(place.formatted_address,"en","ar")
              }
              // country

              if(this.isArabic(alldata[7].long_name)){
                  this.translate_country(alldata[7].long_name,"ar","en")
              }
              else {
                  this.translate_country(alldata[7].long_name,"en","ar")
              }

                 // emirate

                 if(this.isArabic(alldata[6].long_name)){
                  this.translate_emirate(alldata[6].long_name,"ar","en")
              }
              else {
                  this.translate_emirate(alldata[6].long_name,"en","ar")
              }

                 // area

                 if(this.isArabic(alldata[3].long_name)){
                  this.translate_area(alldata[3].long_name,"ar","en")
              }
              else {
                  this.translate_area(alldata[3].long_name,"en","ar")
              }

                 // build or street

                 if(this.isArabic(alldata[2])){
                  this.translate_buildorstreet(alldata[2].long_name +" - "+place.name,"ar","en")
              }
              else {
                  this.translate_buildorstreet(alldata[2].long_name +" - "+place.name,"en","ar")
              }
              
        

          }
else
          
          if(arraylength == 7){
           

              // full data
              if(this.isArabic(place.formatted_address)){
                  this.translate_fulldata(place.formatted_address,"ar","en")
              }
              else {
                  this.translate_fulldata(place.formatted_address,"en","ar")
              }
              // country

              if(this.isArabic(alldata[6].long_name)){
                  this.translate_country(alldata[6].long_name,"ar","en")
              }
              else {
                  this.translate_country(alldata[6].long_name,"en","ar")
              }

                 // emirate

                 if(this.isArabic(alldata[5].long_name)){
                  this.translate_emirate(alldata[5].long_name,"ar","en")
              }
              else {
                  this.translate_emirate(alldata[5].long_name,"en","ar")
              }

                 // area

                 if(this.isArabic(alldata[2].long_name)){
                  this.translate_area(alldata[2].long_name,"ar","en")
              }
              else {
                  this.translate_area(alldata[2].long_name,"en","ar")
              }

                 // build or street

                 if(this.isArabic(alldata[1])){
                  this.translate_buildorstreet(alldata[1].long_name +" - "+place.name,"ar","en")
              }
              else {
                  this.translate_buildorstreet(alldata[1].long_name +" - "+place.name,"en","ar")
              }
             
        

          }
else
          if(arraylength == 6){
    

              // full data
              if(this.isArabic(place.formatted_address)){
                  this.translate_fulldata(place.formatted_address,"ar","en")
              }
              else {
                  this.translate_fulldata(place.formatted_address,"en","ar")
              }
              // country

              if(this.isArabic(alldata[5].long_name)){
                  this.translate_country(alldata[5].long_name,"ar","en")
              }
              else {
                  this.translate_country(alldata[5].long_name,"en","ar")
              }

                 // emirate

                 if(this.isArabic(alldata[4].long_name)){
                  this.translate_emirate(alldata[4].long_name,"ar","en")
              }
              else {
                  this.translate_emirate(alldata[4].long_name,"en","ar")
              }

                 // area

                 if(this.isArabic(alldata[2].long_name)){
                  this.translate_area(alldata[2].long_name,"ar","en")
              }
              else {
                  this.translate_area(alldata[2].long_name,"en","ar")
              }

                 // build or street

                 if(this.isArabic(alldata[0])){
                  this.translate_buildorstreet(place.name,"ar","en")
              }
              else {
                  this.translate_buildorstreet(place.name,"en","ar")
              }
            

          }
          else

          if(arraylength == 5){
    

              // full data
              if(this.isArabic(place.formatted_address)){
                  this.translate_fulldata(place.formatted_address,"ar","en")
              }
              else {
                  this.translate_fulldata(place.formatted_address,"en","ar")
              }
              // country

              if(this.isArabic(alldata[4].long_name)){
                  this.translate_country(alldata[4].long_name,"ar","en")
              }
              else {
                  this.translate_country(alldata[4].long_name,"en","ar")
              }

                 // emirate

                 if(this.isArabic(alldata[3].long_name)){
                  this.translate_emirate(alldata[3].long_name,"ar","en")
              }
              else {
                  this.translate_emirate(alldata[3].long_name,"en","ar")
              }

                 // area

                 if(this.isArabic(alldata[1].long_name)){
                  this.translate_area(alldata[1].long_name,"ar","en")
              }
              else {
                  this.translate_area(alldata[1].long_name,"en","ar")
              }

                 // build or street

                 if(this.isArabic(alldata[0])){
                  this.translate_buildorstreet(alldata[0].long_name +" - "+place.name,"ar","en")
              }
              else {
                  this.translate_buildorstreet(alldata[0].long_name +" - "+place.name,"en","ar")
              }
              
        

          } else 

          if(arraylength == 4){
      
              if(this.isArabic(place.formatted_address)){
                  this.translate_fulldata(place.formatted_address,"ar","en")
              }
              else {
                  this.translate_fulldata(place.formatted_address,"en","ar")
              }
              // country

              if(this.isArabic(alldata[3].long_name)){
                  this.translate_country(alldata[3].long_name,"ar","en")
              }
              else {
                  this.translate_country(alldata[3].long_name,"en","ar")
              }

                 // emirate

                 if(this.isArabic(alldata[2].long_name)){
                  this.translate_emirate(alldata[2].long_name,"ar","en")
              }
              else {
                  this.translate_emirate(alldata[2].long_name,"en","ar")
              }

                 // area

                 if(this.isArabic(alldata[1].long_name)){
                  this.translate_area(alldata[1].long_name,"ar","en")
              }
              else {
                  this.translate_area(alldata[1].long_name,"en","ar")
              }

                 // build or street

                 if(this.isArabic(place.name)){
                  this.translate_buildorstreet(place.name,"ar","en")
              }
              else {
                  this.translate_buildorstreet(place.name,"en","ar")
              }

      

          }
else
          if(arraylength == 3){
      
            if(this.isArabic(place.formatted_address)){
                this.translate_fulldata(place.formatted_address,"ar","en")
            }
            else {
                this.translate_fulldata(place.formatted_address,"en","ar")
            }
            // country

            if(this.isArabic(alldata[2].long_name)){
                this.translate_country(alldata[2].long_name,"ar","en")
            }
            else {
                this.translate_country(alldata[2].long_name,"en","ar")
            }

               // emirate

               if(this.isArabic(alldata[1].long_name)){
                this.translate_emirate(alldata[1].long_name,"ar","en")
            }
            else {
                this.translate_emirate(alldata[1].long_name,"en","ar")
            }

               // area

               if(this.isArabic(alldata[0].long_name)){
                this.translate_area(alldata[0].long_name,"ar","en")
            }
            else {
                this.translate_area(alldata[0].long_name,"en","ar")
            }

               // build or street

               if(this.isArabic(place.name)){
                this.translate_buildorstreet(place.name,"ar","en")
            }
            else {
                this.translate_buildorstreet(place.name,"en","ar")
            }

    

        }
        else
        if(arraylength <= 2){
      
          if(this.isArabic(place.formatted_address)){
              this.translate_fulldata(place.formatted_address,"ar","en")
          }
          else {
              this.translate_fulldata(place.formatted_address,"en","ar")
          }
          // country

          if(this.isArabic(alldata[1].long_name)){
              this.translate_country(alldata[1].long_name,"ar","en")
          }
          else {
              this.translate_country(alldata[1].long_name,"en","ar")
          }

             // emirate

             if(this.isArabic(alldata[0].long_name)){
              this.translate_emirate(alldata[0].long_name,"ar","en")
          }
          else {
              this.translate_emirate(alldata[0].long_name,"en","ar")
          }

             // area

             if(this.isArabic(alldata[0].long_name)){
              this.translate_area(alldata[0].long_name,"ar","en")
          }
          else {
              this.translate_area(alldata[0].long_name,"en","ar")
          }

             // build or street

             if(this.isArabic(place.name)){
              this.translate_buildorstreet(place.name,"ar","en")
          }
          else {
              this.translate_buildorstreet(place.name,"en","ar")
          }

  

      }


       
      
     
        };

          isArabic =(text) =>{
            var arabic = /[\u0600-\u06FF]/;
            var result = arabic.test(text);
            return result;
            }
        
            translate_fulldata= async (source,from,to)=> {


              let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
              url += '&q=' + encodeURI(source);
              url += `&source=${from}`;
              url += `&target=${to}`;
              
              fetch(url, { 
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                }
              })
              .then(res => res.json())
              .then((response) => {
                if(from == "en"){
                  this.setState({address:source,address_ar:response.data.translations[0]["translatedText"]})
                }else{
                  this.setState({address:response.data.translations[0]["translatedText"],address_ar:source})
                }
               
                console.log("response from google: ", response.data.translations[0]["translatedText"]);
              })
              .catch(error => {
                console.log("There was an error with the translation request: ", error);
              });
              
              
                      // const sourceLanguage = "en";
                      // const targetLanguage = "ar";
                    
                      // const url =
                      // `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}` +
                      //   from +
                      //   "&tl=" +
                      //   to +
                      //   "&dt=t&q=" +
                      //   encodeURI(source);
                  
                    
                    
                      // try {
                      //   const result = await fetch(url);
                      //   const json =  await result.json();
                      //   //return json[0][0][0];
                      //  console.log("your result is",json[0][0][0])
                      //  if(from =="en"){
                      //     this.setState({address:source})
                      //     this.setState({address_ar:json[0][0][0]})
                      //  }else{
                      //     this.setState({address:json[0][0][0]})
                      //     this.setState({address_ar:source})
                      //  }
                        
                      // } catch (error) {
                      //   return error.message;
                      // }
                      
                    }
              
                    // translate country
                  translate_country= async (source,from,to)=> {
              
                    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
              url += '&q=' + encodeURI(source);
              url += `&source=${from}`;
              url += `&target=${to}`;
              
              fetch(url, { 
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                }
              })
              .then(res => res.json())
              .then((response) => {
                if(from == "en"){
                  this.setState({country:source,country_ar:response.data.translations[0]["translatedText"]})
                }else{
                  this.setState({country:response.data.translations[0]["translatedText"],country_ar:source})
                }
               
                console.log("response from google: ", response.data.translations[0]["translatedText"]);
              })
              .catch(error => {
                console.log("There was an error with the translation request: ", error);
              });
              
                      // const sourceLanguage = "en";
                      // const targetLanguage = "ar";
                    
                      // const url =
                      // `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}` +
                      //   from +
                      //   "&tl=" +
                      //   to +
                      //   "&dt=t&q=" +
                      //   encodeURI(source);
                    
                     
                    
                      // try {
                      //   const result = await fetch(url);
                      //   const json =  await result.json();
                      //   //return json[0][0][0];
                      //  console.log("your result is",json[0][0][0])
                      //  if(from =="en"){
                      //     this.setState({country:source})
                      //     this.setState({country_ar:json[0][0][0]})
                      //  }else{
                      //     this.setState({country:json[0][0][0]})
                      //     this.setState({country_ar:source})
                      //  }
                        
                      // } catch (error) {
                      //   return error.message;
                      // }
                      
                    }
              
                       // translate emirate
                  translate_emirate= async (source,from,to)=> {
              
              let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
              url += '&q=' + encodeURI(source);
              url += `&source=${from}`;
              url += `&target=${to}`;
              
              fetch(url, { 
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                }
              })
              .then(res => res.json())
              .then((response) => {
                if(from == "en"){
                  this.setState({emirate:source,emirate_ar:response.data.translations[0]["translatedText"]})
                }else{
                  this.setState({emirate:response.data.translations[0]["translatedText"],emirate_ar:source})
                }
               
                console.log("response from google: ", response.data.translations[0]["translatedText"]);
              })
              .catch(error => {
                console.log("There was an error with the translation request: ", error);
              });
                      // const sourceLanguage = "en";
                      // const targetLanguage = "ar";
                    
                      // const url =
                      // `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}` +
                      //   from +
                      //   "&tl=" +
                      //   to +
                      //   "&dt=t&q=" +
                      //   encodeURI(source);
                    
                    
                    
                      // try {
                      //   const result = await fetch(url);
                      //   const json =  await result.json();
                      //   //return json[0][0][0];
                      //  console.log("your result is",json[0][0][0])
                      //  if(from =="en"){
                      //     this.setState({emirate:source})
                      //     this.setState({emirate_ar:json[0][0][0]})
                      //  }else{
                      //     this.setState({emirate:json[0][0][0]})
                      //     this.setState({emirate_ar:source})
                      //  }
                        
                      // } catch (error) {
                      //   return error.message;
                      // }
                      
                    }
              
                       // translate area
                  translate_area= async (source,from,to)=> {
                    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
              url += '&q=' + encodeURI(source);
              url += `&source=${from}`;
              url += `&target=${to}`;
              
              fetch(url, { 
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                }
              })
              .then(res => res.json())
              .then((response) => {
                if(from == "en"){
                  this.setState({area:source,area_ar:response.data.translations[0]["translatedText"]})
                }else{
                  this.setState({area:response.data.translations[0]["translatedText"],area_ar:source})
                }
               
                console.log("response from google: ", response.data.translations[0]["translatedText"]);
              })
              .catch(error => {
                console.log("There was an error with the translation request: ", error);
              });
                      // const sourceLanguage = "en";
                      // const targetLanguage = "ar";
                    
                      // const url =
                      // `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}` +
                      //   from +
                      //   "&tl=" +
                      //   to +
                      //   "&dt=t&q=" +
                      //   encodeURI(source);
                    
                     
                    
                      // try {
                      //   const result = await fetch(url);
                      //   const json =  await result.json();
                      //   //return json[0][0][0];
                      //  console.log("your result is",json[0][0][0])
                      //  if(from =="en"){
                      //     this.setState({area:source})
                      //     this.setState({area_ar:json[0][0][0]})
                      //  }else{
                      //     this.setState({area:json[0][0][0]})
                      //     this.setState({area_ar:source})
                      //  }
                        
                      // } catch (error) {
                      //   return error.message;
                      // }
                      
                    }
              
                       // translate build or street
                  translate_buildorstreet= async (source,from,to)=> {
                    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
              url += '&q=' + encodeURI(source);
              url += `&source=${from}`;
              url += `&target=${to}`;
              
              fetch(url, { 
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                }
              })
              .then(res => res.json())
              .then((response) => {
                if(from == "en"){
                  this.setState({streetorbuild:source,streetorbuild_ar:response.data.translations[0]["translatedText"]})
                }else{
                  this.setState({streetorbuild:response.data.translations[0]["translatedText"],streetorbuild_ar:source})
                }
               
                console.log("response from google: ", response.data.translations[0]["translatedText"]);
              })
              .catch(error => {
                console.log("There was an error with the translation request: ", error);
              });
                      // const sourceLanguage = "en";
                      // const targetLanguage = "ar";
                    
                      // const url =
                      // `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}` +
                      //   from +
                      //   "&tl=" +
                      //   to +
                      //   "&dt=t&q=" +
                      //   encodeURI(source);
                    
               
                    
                      // try {
                      //   const result = await fetch(url);
                      //   const json =  await result.json();
                      //   //return json[0][0][0];
                      //  console.log("your result is",json[0][0][0])
                      //  if(from =="en"){
                      //     this.setState({streetorbuild:source,streetorbuild_ar:json[0][0][0]})
                      //    // this.setState({streetorbuild_ar:json[0][0][0]})
                      //  }else{
                      //     this.setState({streetorbuild_ar:source,streetorbuild:json[0][0][0]})
                      //     //this.setState({streetorbuild_ar:source})
                      //  }
                        
                      // } catch (error) {
                      //   return error.message;
                      // }
                      
                    }
              
                 
         
      
        mapfunction =()=>{
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
        }
      
      
componentDidMount() {

   
 
      
  
   

//alert(this.isArabic(string));

        this.fetchData();
        
    
        jQuery(document).ready(function() {
          // click on next button
       
          jQuery('.form-wizard-next-btn').click(function() {
            
              var parentFieldset = jQuery(this).parents('.wizard-fieldset');
              var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
              var next = jQuery(this);
              var nextWizardStep = true;
              
              parentFieldset.find('.wizard-required').each(function(){
                  var thisValue = jQuery(this).val();

                  var category_id = jQuery("#category_id").val();
                  var type_id = jQuery("#type_id").val();
                  var purpose = jQuery("#purpose").val();
                  var agent_id = jQuery("#agent_id").val();
                

                  if( category_id < 1) {
                   
                      jQuery(this).siblings(".wizard-category-error").slideDown();
                      nextWizardStep = false;
                    

                  }else{
                     
                          jQuery(this).siblings(".wizard-category-error").slideUp();
                       }



                       if( type_id < 1) {
                         
                          jQuery(this).siblings(".wizard-type-error").slideDown();
                          nextWizardStep = false;
                      }else{
                       
                              jQuery(this).siblings(".wizard-type-error").slideUp();
                           }

                           if( purpose < 1) {
                              jQuery(this).siblings(".wizard-purpose-error").slideDown();
                              nextWizardStep = false;
                          }else{
                                  jQuery(this).siblings(".wizard-purpose-error").slideUp();
                               }

                               if( agent_id < 1) {
                                  jQuery(this).siblings(".wizard-agent-error").slideDown();
                                  nextWizardStep = false;
                              }else{
                                      jQuery(this).siblings(".wizard-agent-error").slideUp();
                                   }

                  // if( type_id < 1) {
                  //     jQuery(this).siblings(".wizard-form-error").slideDown();
                  //     nextWizardStep = false;
                  // }else
                  // if( purpose < 1) {
                  //     jQuery(this).siblings(".wizard-form-error").slideDown();
                  //     nextWizardStep = false;
                  // }else
                  // if( agent_id < 1) {
                  //     jQuery(this).siblings(".wizard-form-error").slideDown();
                  //     nextWizardStep = false;
                  // }else
                  
      
                  if( thisValue == "") {
                      jQuery(this).siblings(".wizard-form-error").slideDown();
                      nextWizardStep = false;
                  }
                  else {
                      jQuery(this).siblings(".wizard-form-error").slideUp();
                  }
              });
              if( nextWizardStep) {
                  next.parents('.wizard-fieldset').removeClass("show","400");
                  currentActiveStep.removeClass('active').addClass('activated').next().addClass('active',"400");
                  next.parents('.wizard-fieldset').next('.wizard-fieldset').addClass("show","400");
                  jQuery(document).find('.wizard-fieldset').each(function(){
                      if(jQuery(this).hasClass('show')){
                          var formAtrr = jQuery(this).attr('data-tab-content');
                          jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function(){
                              if(jQuery(this).attr('data-attr') == formAtrr){
                                  jQuery(this).addClass('active');
                                  var innerWidth = jQuery(this).innerWidth();
                                  var position = jQuery(this).position();
                                  jQuery(document).find('.form-wizard-step-move').css({"left": position.left, "width": innerWidth});
                              }else{
                                  jQuery(this).removeClass('active');
                              }
                          });
                      }
                  });
              }
          });
          //click on previous button
          jQuery('.form-wizard-previous-btn').click(function() {
              var counter = parseInt(jQuery(".wizard-counter").text());;
              var prev =jQuery(this);
              var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
              prev.parents('.wizard-fieldset').removeClass("show","400");
              prev.parents('.wizard-fieldset').prev('.wizard-fieldset').addClass("show","400");
              currentActiveStep.removeClass('active').prev().removeClass('activated').addClass('active',"400");
              jQuery(document).find('.wizard-fieldset').each(function(){
                  if(jQuery(this).hasClass('show')){
                      var formAtrr = jQuery(this).attr('data-tab-content');
                      jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function(){
                          if(jQuery(this).attr('data-attr') == formAtrr){
                              jQuery(this).addClass('active');
                              var innerWidth = jQuery(this).innerWidth();
                              var position = jQuery(this).position();
                              jQuery(document).find('.form-wizard-step-move').css({"left": position.left, "width": innerWidth});
                          }else{
                              jQuery(this).removeClass('active');
                          }
                      });
                  }
              });
          });
          //click on form submit button
          jQuery(document).on("click",".form-wizard .form-wizard-submit" , function(){
              var parentFieldset = jQuery(this).parents('.wizard-fieldset');
              var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
              parentFieldset.find('.wizard-required').each(function() {
                  var thisValue = jQuery(this).val();

                  if( thisValue == "" ) {
                      jQuery(this).siblings(".wizard-form-error").slideDown();
                  }
                  else {
                      jQuery(this).siblings(".wizard-form-error").slideUp();
                  }
              });
          });
          // focus on input field check empty or not
          jQuery(".form-control").on('focus', function(){
              var tmpThis = jQuery(this).val();
              if(tmpThis == '' ) {
                  jQuery(this).parent().addClass("focus-input");
              }
              else if(tmpThis !='' ){
                  jQuery(this).parent().addClass("focus-input");
              }
          }).on('blur', function(){
              var tmpThis = jQuery(this).val();
              if(tmpThis == '' ) {
                  jQuery(this).parent().removeClass("focus-input");
                  jQuery(this).siblings('.wizard-form-error').slideDown("3000");
              }
              else if(tmpThis !='' ){
                  jQuery(this).parent().addClass("focus-input");
                  jQuery(this).siblings('.wizard-form-error').slideUp("3000");
              }
          });
          jQuery("#title_en").keypress(function(event){
            var ew = event.which;
            if(ew == 32)
                return true;
            if(48 <= ew && ew <= 57)
                return true;
            if(65 <= ew && ew <= 90)
                return true;
            if(97 <= ew && ew <= 122)
                return true;
            return false;
        });

        jQuery("#description_en").keypress(function(event){
            var ew = event.which;
            if(ew == 32)
                return true;
            if(48 <= ew && ew <= 57)
                return true;
            if(65 <= ew && ew <= 90)
                return true;
            if(97 <= ew && ew <= 122)
                return true;
            return false;
        });
      });
    
}
_suggestionSelect(result, lat, lng, text) {
    console.log(result, lat, lng, text)
  }
rentOnChange_Handle =(e)=> {
    e.preventDefault()
    e.target.value == 1 ? this.setState({ rentfileds: "row"}) : this.setState({ rentfileds: "d-none"})
    this.setState({purpose:e.target.value})
}
propertyType_enHandle =(e)=> {
   
            const token = cookie.get("token")

        this.setState({ propertytype_id: e.target.value }) 
        
        let id = e.target.value;
        axios.get(baseurl+"/api/propertytypes/"+id,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
            console.log(response.data)
          this.setState({
              occupancyfiled:response.data.occupancy == 1? "mb-3 d-block" : "mb-3 d-none",
              furnishstatusfields:response.data.furnishedornot == 1? "mb-3 d-block" : "mb-3 d-none",
              readyoffPlanfield:response.data.readyoffplan== 1? "mb-3 d-block" : "d-none",
              readyoffPlanfield:response.data.readyoffplan== 1? "mb-3 d-block" : "d-none",
              landfeatures : response.data.readyoffplan == 1? "row d-block" : "d-none",
              bathroomfeature: response.data.bedandbath == 1? "row d-block" : "d-none",
              categoryNameEn: response.data.name_en, 
              categoryNameAr: response.data.name_ar,
              })
        })
        .catch(err =>console.log("error"))



}
// category_enHandle = (e) => {
//         e.preventDefault();
//         const token = cookie.get("token")

//         this.setState({ categoryId: e.target.value })
//         this.setState({ propertyTypeDisabld: "" })
      
//         if(e.target.value == 23){
//         this.setState({ furnishedStatus: "mb-3 d-block" })
//         }
//         axios.get(baseurl + "/api/propertytypeByCatId/" + e.target.value,{
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Accept':'application/json',
//               'Content-Type':'application/json'
//             }})
//         .then(response => {
//         //    console.log(response.data)
//           this.setState({ isLoading: false, propertytypes: response.data.propertytypes })
//         })
//         .catch(err =>console.log("error"))
// }

// handleChecked= (e) =>{
//     this.setState({firnished:!this.state.firnished})
//  }
 // Amenties

 handleHealthAndFitness = (health,e) =>{

    let index= this.state.healthandfitness.indexOf(health);
    console.log("health feature",health);
  
    var i;
    for(i=0;i< this.state.healthandfitness.length;i++){
        if(i == index){
            this.state.healthandfitness[i].status = !this.state.healthandfitness[i].status ==true?1:0
            this.setState({})
            
        }
    }

 }

 handleFeatures = (feature,e) =>{

    let index= this.state.amenitiesfeatures.indexOf(feature);
    console.log(feature);
  
    var i;
    for(i=0;i< this.state.amenitiesfeatures.length;i++){
        if(i == index){
            this.state.amenitiesfeatures[i].status = !this.state.amenitiesfeatures[i].status ==true?1:0
            this.setState({})
            
        }
    }

 }
 handleMiscellaneous = (miscell,e) =>{

    let index= this.state.miscellaneous.indexOf(miscell);
  
    var i;
    for(i=0;i< this.state.miscellaneous.length;i++){
        if(i == index){
            this.state.miscellaneous[i].status = !this.state.miscellaneous[i].status ==true?1:0
            this.setState({})
            
        }
    }

 }

 handleSecurityandTechnology = (secandtech,e) =>{

    let index= this.state.securityandtechnology.indexOf(secandtech);
  
    var i;
    for(i=0;i< this.state.securityandtechnology.length;i++){
        if(i == index){
            this.state.securityandtechnology[i].status = !this.state.securityandtechnology[i].status ==true?1:0
            this.setState({})
            
        }
    }

 }
 handleGym= (e) =>{
    this.setState({gym:!this.state.gym})
 }
 handleSwimmingbool= (e) =>{
    this.setState({swimmingpool:!this.state.swimmingpool})
 }
 handleMedical= (e) =>{
    this.setState({medical:!this.state.medical})
 }
 handleSaunasteem= (e) =>{
    this.setState({sauna_steem:!this.state.sauna_steem})
 }
 handleDisabilityaccess= (e) =>{
    this.setState({disability_access:!this.state.disability_access})
 }
 handleBuiltinwardobes= (e) =>{
    this.setState({built_in_wardobes:!this.state.built_in_wardobes})
 }
 handleBarbaquearea= (e) =>{
    this.setState({barbaque_area:!this.state.barbaque_area})
 }
 handleCafeteria= (e) =>{
    this.setState({cafeteria:!this.state.cafeteria})
 }
 
 handleKitchen= (e) =>{
    this.setState({kitchen:!this.state.kitchen})
 }
  handleCentralac= (e) =>{
    //console.log(e.target.checked)
    this.setState({central_ac:!this.state.central_ac})
 }
 
  handleGarden= (e) =>{
    //console.log(e.target.checked)
    this.setState({garden:!this.state.garden})
 }
 handleFurnished= (e) =>{
    //console.log(e.target.checked)
    this.setState({furnished:!this.state.furnished})
 }
 handleDisposal= (e) =>{
    //console.log(e.target.checked)
    this.setState({disposal:!this.state.disposal})
 }
 handleKidsplay= (e) =>{
    //console.log(e.target.checked)
    this.setState({kidsplay:!this.state.kidsplay})
 }
 handleParking= (e) =>{
    //console.log(e.target.checked)
    this.setState({parking:!this.state.parking})
 }
 handleBalcony= (e) =>{
    //console.log(e.target.checked)
    this.setState({balcony:!this.state.balcony})
 }

 handleAtmacxeess= (e) =>{
    //console.log(e.target.checked)
    this.setState({atm_acxeess:!this.state.atm_acxeess})
 }
 handleWaterview= (e) =>{
    //console.log(e.target.checked)
    this.setState({water_view:!this.state.water_view})
 }
 handleLandmarkview= (e) =>{
    //console.log(e.target.checked)
    this.setState({landmark_view:!this.state.landmark_view})
 }
 handleDaycare= (e) =>{
    //console.log(e.target.checked)
    this.setState({day_care:!this.state.day_care})
 }

 handleSecurityguard= (e) =>{
    //console.log(e.target.checked)
    this.setState({security_guard:!this.state.security_guard})
 }
 handleCctv= (e) =>{
    //console.log(e.target.checked)
    this.setState({cctv:!this.state.cctv})
 }
 handleInternet= (e) =>{
    //console.log(e.target.checked)
    this.setState({internet:!this.state.internet})
 }
 handleSatelitecabletv= (e) =>{
    //console.log(e.target.checked)
    this.setState({satelite_cable_tv:!this.state.satelite_cable_tv})
 }

 // propery details
 handleTitleEn= (e) =>{
     e.preventDefault() 
     console.log(e.target.value)
    this.setState({title_en:e.target.value})
 }
 handleTitleAr= (e) =>{
    this.setState({title_ar:e.target.value})
 }
 handleDescriptionEn= (e) =>{
    this.setState({description_en:e.target.value})
 }
 handleDescriptionAr= (e) =>{
    this.setState({description_ar:e.target.value})
 }
 handleSquarearea= (e) =>{
    this.setState({square_area:e.target.value})
 }
 handlePrice= (e) =>{
    
    this.setState({price:e.target.value})
 }
 handleBedroom= (e) =>{
    this.setState({bedroom:e.target.value})
 }
 handleBathroom= (e) =>{
    this.setState({bathroom:e.target.value})
 }
 handleRentFrequency= (e) =>{
    this.setState({rent_frequency:e.target.value})
 }

 handleMinimumcontractperiod= (e) =>{
    this.setState({min_contract_period:e.target.value})
 }
 handleVactingPeriod= (e) =>{
    this.setState({vacating_period:e.target.value})
 }
 handleMaintainaceFee= (e) =>{
    this.setState({maintainance_fee:e.target.value})
 }
 handlePaidby= (e) =>{
    this.setState({paid_by:e.target.value})
 }
 handlePermitNumber= (e) =>{
    this.setState({permit_number:e.target.value})
 }
 handleVideo_source= (e) =>{
     e.preventDefault()
    this.setState({video_source:e.target.value})
 }
 handleVideo_link= (e) =>{
    e.preventDefault()
    this.setState({video_link:e.target.value})
 }
 handleVideo_title= (e) =>{
    e.preventDefault()
    this.setState({video_title:e.target.value})
 }


fetchData = () => {
        //handle select on Change
        const token = cookie.get("token")
        this.setState({ isLoading: true }) 

        let id = this.props.match.params.id;
        axios.get(baseurl+"/api/properties/"+id,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response => {
            
        this.setState({ isLoading: false,
        medias:response.data.medias, property: response.data.property,firnished:response.data.property.furnishing,
        address:response.data.property.address,address_ar:response.data.property.address_ar,
        title_en:response.data.property.title_en,title_ar:response.data.property.title_ar,
        description_en:response.data.property.details_en,description_ar:response.data.property.details_ar,
        country:response.data.property.country_en,country_ar:response.data.property.country_ar,
        emirate:response.data.property.emirate_en,emirate_ar:response.data.property.emirate_ar,
        area:response.data.property.area_en, area_ar:response.data.property.area_ar,
        streetorbuild:response.data.property.streetorbuild_en, streetorbuild_ar:response.data.property.streetorbuild_ar,
        rent_frequency:response.data.property.rent_frequency,  paid_by:response.data.property.paid_by,
        completion_status:response.data.property.completion_status,  ownership_status:response.data.property.ownership_status,
        square_area:response.data.property.area,
        price:response.data.property.price,
        bedroom:response.data.property.beds,
        bathroom:response.data.property.baths,
        purpose:response.data.property.purpose,
        //categoryId:response.data.property.category_id,
        propertytype_id:response.data.property.propertytypes_id,rentfileds: response.data.property.purpose ==1?"row":"row d-none",
        healthandfitness:response.data.healthandfitness,amenitiesfeatures:response.data.features,miscellaneous:response.data.miscellaneous,
        securityandtechnology:response.data.securityandtechnology,
        video_source:response.data.property.video_source,video_title:response.data.property.video_title,video_link:response.data.property.video_link,
        lat: response.data.property.lat,
        lng: response.data.property.lng,
        mapPosition: {
            lat: response.data.property.lat,
            lng: response.data.property.lng,
        },
        markerPosition: {
            lat: response.data.property.lat,
            lng: response.data.property.lng,
        }
    })
  this.mapfunction()
        })
        .catch(err =>console.log("error"))

        axios.get(baseurl+"/api/propertytypes",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
            this.setState({propertytypes:response.data.propertytypes})
         //   console.log("daddadaa",response.data)
        this.setState({
            occupancyfiled:response.data.occupancy == 1? "mb-3 d-block" : "mb-3 d-none",
            furnishstatusfields:response.data.furnishedornot == 1? "mb-3 d-block" : "mb-3 d-none",
            //landfields:response.data.landornot == 1? "mb-3 d-block" : "mb-3 d-none",
            //comandresfields:response.data.comandresornot == 1? "mb-3 d-block" : "mb-3 d-none",
            readyoffPlanfield:response.data.readyoffplan== 1? "mb-3 d-block" : "d-none",
            landfeatures : response.data.readyoffplan == 1? "row d-block" : "d-none",
            readyoffPlanfield:response.data.readyoffplan== 1? "mb-3 d-block" : "d-none",
            bathroomfeature: response.data.bedandbath == 1? "row d-block" : "d-none",
         
            categoryNameEn: response.data.name_en, 
            categoryNameAr: response.data.name_ar,
            })
      })
      .catch(err =>console.log("error"))


        axios.get(baseurl+"/api/agents",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response => {
        this.setState({ isLoading: false, agents: response.data.agents})
     
        })
        .catch(err =>console.log("error"))     
}

saveData = (e) =>{
        e.preventDefault();
        const token =cookie.get("token")
        let id = this.props.match.params.id;
        const data = {
        //category_id:this.state.categoryId,
        propertytypes_id:this.state.propertytype_id,
        address:this.state.address, address_ar:this.state.address_ar,
        country:this.state.country, country_ar:this.state.country_ar,
        emirate:this.state.emirate, emirate_ar:this.state.emirate_ar,
        area:this.state.area, area_ar:this.state.area_ar,lat:this.state.lat,lng:this.state.lng,
        streetorbuild:this.state.streetorbuild, streetorbuild_ar:this.state.streetorbuild_ar,
        firnished:this.state.firnished,purpose:this.state.purpose,
        //Amenties
        gym:this.state.gym == true?1:0, swimmingpool:this.state.swimmingpool== true?1:0, medical:this.state.medical == true?1:0,
        sauna_steem:this.state.sauna_steem == true?1:0, disability_access:this.state.disability_access == true?1:0,
        built_in_wardobes:this.state.built_in_wardobes == true?1:0, barbaque_area:this.state.barbaque_area == true?1:0,
        cafeteria:this.state.cafeteria == true?1:0, kitchen:this.state.kitchen == true?1:0,
        central_ac:this.state.central_ac == true?1:0, garden:this.state.garden == true?1:0,
        furnished:this.state.furnished == true?1:0, disposal:this.state.disposal == true?1:0,
        kidsplay:this.state.kidsplay == true?1:0, parking:this.state.parking == true?1:0,balcony:this.state.balcony == true?1:0,
        atm_acxeess:this.state.atm_acxeess == true?1:0, water_view:this.state.water_view == true?1:0,
        landmark_view:this.state.landmark_view == true?1:0, day_care:this.state.day_care == true?1:0,
        security_guard:this.state.security_guard == true?1:0, cctv:this.state.cctv == true?1:0,
        internet:this.state.internet == true?1:0, satelite_cable_tv:this.state.satelite_cable_tv == true?1:0,
        // property details
        title_en:this.state.title_en, title_ar:this.state.title_ar,
        description_en:this.state.description_en, description_ar:this.state.description_ar,
        square_area:this.state.square_area, price:this.state.price,
        bedroom:this.state.bedroom, bathroom:this.state.bathroom,
        rent_frequency:this.state.rent_frequency, min_contract_period:this.state.min_contract_period,
        completion_status:this.state.completion_status,ownership_status:this.state.ownership_status,
        vacating_period:this.state.vacating_period, maintainance_fee:this.state.maintainance_fee,
        paid_by:this.state.paid_by, permit_number:this.state.permit_number,
        video_source:this.state.video_source,video_link:this.state.video_link,video_title:this.state.video_title,
        healthandfitness:this.state.healthandfitness,
        amenitiesfeatures:this.state.amenitiesfeatures,
        miscellaneous:this.state.miscellaneous,featuredimage:this.state.featuredimage,
        securityandtechnology:this.state.securityandtechnology,referencenumber:this.state.referencenumber,
    }
    axios.put(baseurl+"/api/adminproperties/"+id, data  ,  {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
    })
    .then(response =>{
        if(response.data > 0){
            const formData = new FormData()
            formData.append("property_id", response.data);
             for (let i = 0; i < this.state.image.length; i++) {
                formData.append("images[]", this.state.image[i]);
               
              }
                axios.post(baseurl+"/api/propertiesuploads", formData,{
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Accept':'application/json',
                      'Content-Type':'application/json'
                    }})
               .then(response =>{
        Swal.fire({
            title: "Done!",
            text: "Successfully updated.",
            icon: "success",
            timer: 2000,
            button: false
          })
            this.props.history.push("/adminlisting")
    })
    .catch(e => console.log("error from "))
        }

        
    })
    .catch(e => console.log("error"))


    
   
}

onInputChageEnglish = address => {
    let mydata = address.split('-');
    this.translate_address(address,"ar","en")
    this.setState({
        country: mydata[3],
        emirate: mydata[2],
        area: mydata[1],
        streetorbuild: mydata[0]

    });

};

  onInputChageArabic = address_ar => {
      let mydata = address_ar.split('-');
      this.setState({
          address_ar: address_ar,
          country_ar: mydata[3],
          emirate_ar: mydata[2],
          area_ar: mydata[1],
          streetorbuild_ar: mydata[0]

      });
  };

  onInputChageBuildName = buildname => {
  //  let mydata = address.split('-');
    this.setState({
        streetorbuild: buildname,
      

    });
    console.log("build name commeing",this.isArabic(buildname))
    if(this.isArabic(buildname)){
        this.translate(buildname,"ar","en")
    }
    else {
        this.translate(buildname,"en","ar")
    }

};

onhandleLat = latvalue =>{
    this.setState({
        lat: latvalue,
      

    });
}

onhandleLng = lngvalue =>{
    this.setState({
        lng: lngvalue,
      

    });
}




isArabic =(text) =>{
    var arabic = /[\u0600-\u06FF]/;
    var result = arabic.test(text);
    return result;
    }

   

    translate= async (source,from,to)=> {
        const sourceLanguage = "en";
        const targetLanguage = "ar";
      
        const url =
          "https://translate.googleapis.com/translate_a/single?key=AIzaSyBROO3Md6_fZD5_fd1u8VTlRxd4VdJnAWU&client=gtx&sl=" +
          from +
          "&tl=" +
          to +
          "&dt=t&q=" +
          encodeURI(source);
      
        const result = await fetch(url);
        const json =  await result.json();
      
        try {
          //return json[0][0][0];
         console.log("your result is",json[0][0][0])
         if(from =="en"){
            this.setState({streetorbuild:source})
            this.setState({streetorbuild_ar:json[0][0][0]})
         }else{
            this.setState({streetorbuild:json[0][0][0]})
            this.setState({streetorbuild_ar:source})
         }
          
        } catch (error) {
          return error.message;
        }
        
      }

      
    translate_address= async (source,from,to)=> {
        const sourceLanguage = "en";
        const targetLanguage = "ar";
      
        const url =
          "https://translate.googleapis.com/translate_a/single?key=AIzaSyBROO3Md6_fZD5_fd1u8VTlRxd4VdJnAWU&client=gtx&sl=" +
          from +
          "&tl=" +
          to +
          "&dt=t&q=" +
          encodeURI(source);
      
        const result = await fetch(url);
        const json =  await result.json();
      
        try {
          //return json[0][0][0];
      
            this.setState({address:json[0][0][0]})
       
          
        } catch (error) {
          return error.message;
        }
        
      }

      handleFeaturedImage =(e) =>{

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);


        //console.log(e.target.files[0])
        this.setState({imageShow:URL.createObjectURL(e.target.files[0])})
        
        // this.setState({
        //     featuredimage: e.target.files[0],
        //   });

      }

      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            featuredimage: e.target.result
          })
        };
        reader.readAsDataURL(file);
      }




      handleChange = (e) => {

        const imagesArray = [];
        let isValid = "";
    
        for (let i = 0; i < e.target.files.length; i++) {   
          e.target.files[i].rating=0   
          e.target.files[i].title= this.state.title_en 
          imagesArray.push(e.target.files[i]);
         
        }

        
        this.setState({
          image: imagesArray,
        });

        
      }



  

      handleRating = (rating,e) =>{
          e.preventDefault()
        let index = this.state.image.indexOf(rating)
        console.log(index)
        var mydata = this.state.image

        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
           // console.log("i", i)
            if (i == index) {
                mydata[i].rating = 1
            }else{
                mydata[i].rating = 0 
            }
        }
        this.setState({image:mydata})
      }

      handleTitle = (title,e) =>{
        e.preventDefault()
      let index = this.state.image.indexOf(title)
      var mydata = this.state.image

      var loopData = []
      var i;
      for (i = 0; i < mydata.length; i++) {
         // console.log("i", i)
          if (i == index) {
              mydata[i].title = e.target.value
          }
      }
      this.setState({image:mydata})
    }
      removeFile =(myfile,e) =>{
        e.preventDefault();
        console.log("ok comming",myfile)
        let index = this.state.image.indexOf(myfile)

        if(!myfile || myfile < 0)
        {
            return;
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    var mydata = this.state.image
                    var loopData = []
                    var i;
                    for (i = 0; i < mydata.length; i++) {
                        console.log("i", i)
                        if (i == index) {
                            mydata.splice(index, 1);
                        }
                    }
                    this.setState({image:mydata})
                 
                }
              })
        }

        //console.log("my file index",index)
      
    
        // for (i = 0; i < mydata.length; i++) {
        //     console.log("i", i)
        //     if (i == index) {
        //         mydata[i].basicbutton = !mydata[i].featuredbutton == true ? false : true

        //         mydata[i].featuredbutton = !mydata[i].featuredbutton
        //         mydata[i].premiumbutton = false
        //     }
        // }
      }

      removeFileFromserver =(media,e) =>{
          e.preventDefault();
          let index = this.state.medias.indexOf(media)

          const token = cookie.get("token")
         
          if(!media.id || media.id <1)
          {
              return;
          } else {
              Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                      axios.delete(baseurl+"/api/deletemedia/"+media.id,{
                          headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                          }})
                      .then(response =>{

                          var mydata = this.state.medias
                          var loopData = []
                          var i;
                          for (i = 0; i < mydata.length; i++) {
                              if (i == index) {
                                  mydata.splice(index, 1);
                              }
                          }
                          this.setState({medias:mydata})

                    //       Swal.fire(
                    //           'Deleted!',
                    //           'Your file has been deleted.',
                    //           'success'
                    //         )
                    //    this.fetchData();
                       //this.setState({categories:response.data.categories})
                      })
                      .catch(err => console.log(err))
                  }
                })
          }
      }

      handleOnFurnished = (e) =>{
        this.setState({firnished:1}) 
     }
    
     handleOnUnFurnished = (e) =>{
        this.setState({firnished:0}) 
     }

     handleCompletionStatus = (e) =>{
      e.preventDefault();

        this.setState({completion_status:e.target.value})
    }

    handleOwnerStatus = (e) =>{
      e.preventDefault();

      this.setState({ownership_status:e.target.value})
    }

render() {

   // console.log("my files array ",this.state.allfiles)
    //console.log("my categories array",this.state.categories)

     // return map;
    
   
return (
  <div className="container-fluid">
  <div className="row">
          <div className="card">
              <div className="card-header">
                   <h4 className="card-title">{lang == "en" ? "Edit Property " : "تعديل عقار"}</h4>

              </div>
              <div className="card-body">
              <section className="wizard-section">
<div className="row ">

<div className="">
<div className="form-wizard">
  <form action method="post" role="form">
    <div className="form-wizard-header">
      
      <ul className="list-unstyled form-wizard-steps clearfix">
        <li className="active"><span>1</span></li>
        <li><span>2</span></li>
        <li><span>3</span></li>
       
      </ul>
    </div>
    <fieldset className="wizard-fieldset show">
    <h5>{lang == "en" ? "Property Information" : "معلومات العقار"}</h5>
      {/* <div className="form-group">
      <select onChange={this.category_enHandle} class="form-select wizard-required" style={{ height: '2.75rem' }} aria-label="form-select"  id="category_id">
      <option value={this.state.property.category_id}>{lang=="en"?this.state.property.category_name_en:this.state.property.category_name_ar}</option>
                                      {this.state.categories.map((cate) => (
                                          <option value={cate.id}>{cate.name_en}</option>
                                      )
                                      )}
                                      </select>
        <div className="wizard-category-error" />
      </div> */}

            <div className="form-group">
              <label> {i18next.t("propertytype")}</label>
            <select onChange={this.propertyType_enHandle} class="form-select wizard-required" style={{ height: '2.75rem' }} aria-label="form-select" id="type_id">
            <option value={this.state.property.propertytype_id}>{lang=="en"?this.state.property.typeName_en:this.state.property.typeName_ar}</option>
                                      {this.state.propertytypes.map((ppty) => (
                                        <>
                                        {ppty.id != this.state.property.propertytype_id ?<option value={ppty.id}>{ppty.typeName_en}</option>:null }
                                        </>
                                       )
                                      )}
                                      </select>
            <div className="wizard-type-error" />
           </div>
           <div className="form-group">
      <select onChange={this.rentOnChange_Handle} class="form-select wizard-required" style={{ height: '2.75rem' }} aria-label="form-select" id="purpose" >
      {this.state.property.purpose ==1? 
                                                <>
                                                <option value="1">{lang== "en"?"For Rent":"للايجار"}</option>
                                                <option value='2'>{lang== "en"?"For Sale":"للبيع"}</option>
                                                </>
                                                :
                                                <>
                                                <option value='2'>{lang== "en"?"For Sale":"للبيع"}</option>
                                                <option value="1">{lang== "en"?"For Rent":"للايجار"}</option>
                                                </>
                                                }
                                      </select>
        <div className="wizard-purpose-error" />
      </div>

           <div class={this.state.furnishstatusfields}>

           <div className="form-group">
        
        <div className="wizard-form-radio">
          <input name="radio-name" id="radio1" type="radio"  checked={this.state.firnished ==1?true:false} onClick={this.handleOnFurnished} />
          <label htmlFor="radio1">{i18next.t("furnished")}</label>
        </div>
        &nbsp;
        &nbsp;
        <div className="wizard-form-radio">
          <input name="radio-name" id="radio2" type="radio" checked={this.state.firnished ==0?true:false} onClick={this.handleOnUnFurnished}/>
          <label htmlFor="radio2">{i18next.t("unfurnished")}</label>
        </div>
      </div>
      </div>
                                  <h4>{lang == "en" ? "Location and Address" : "العنوان علي الخريطة"}</h4>
                                      {/* full address */}
                                      <div className="row" style={{display:'none'}}>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Full address </label>
                                      <input type="text" value={this.state.address} name="arabicTitle" className="form-control"   />
                                       </div>
                                          </div>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Full address arabic</label>
                                      <input type="text" value={this.state.address_ar} name="arabicTitle" className="form-control"   />
                                       </div>
                                              </div>
                                      </div>
                                      {/* country */}
                                      <div className="row" style={{display:'none'}}>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Country</label>
                                      <input type="text" value={this.state.country} name="arabicTitle" className="form-control"   />
                                       </div>
                                          </div>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Country arabic</label>
                                      <input type="text" value={this.state.country_ar} name="arabicTitle" className="form-control"   />
                                       </div>
                                              </div>
                                      </div>
                                      {/* emirate */}
                                      <div className="row" style={{display:'none'}}>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Emirate</label>
                                      <input type="text" value={this.state.emirate} name="arabicTitle" className="form-control"   />
                                       </div>
                                          </div>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Emirate arabic</label>
                                      <input type="text" value={this.state.emirate_ar} name="arabicTitle" className="form-control"   />
                                       </div>
                                              </div>
                                      </div>
                                      {/* area */}
                                      <div className="row" style={{display:'none'}}>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Area</label>
                                      <input type="text" value={this.state.area} name="arabicTitle" className="form-control"   />
                                       </div>
                                          </div>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>AREA arabic</label>
                                      <input type="text" value={this.state.area_ar} name="arabicTitle" className="form-control"   />
                                       </div>
                                              </div>
                                      </div>
                                      {/* street or building */}
                                      <div className="row" style={{display:'none'}}>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Street/Bulding name</label>
                                      <input type="text" value={this.state.streetorbuild} name="arabicTitle" className="form-control"   />
                                       </div>
                                          </div>
                                          <div className="col-md-6">
                                          <div className="mb-3">
                                      <label>Street/Bulding name arabic</label>
                                      <input type="text" value={this.state.streetorbuild_ar} name="arabicTitle" className="form-control"   />
                                       </div>
                                              </div>
                                      </div>
                                      {/* <div id="geocoder" class="geocoder"></div> */}
                                      {/* <MapBoxMap /> */}
                                      <div className="row mb-10">
                                          <div className="col-md-12">
                                          <div className="mb-5">
                                          {map}
                                          {/* <Map onInputChageEnglish={this.onInputChageEnglish}  onInputChageArabic={this.onInputChageArabic} onInputChageBuildName={this.onInputChageBuildName} onhandleLat={this.onhandleLat} onhandleLng={this.onhandleLng} /> */}
                                      </div>
                                          </div>
                                      </div>

                                      <div className="form-group">
        <input type="text" defaultValue={this.state.property.title_en} className="form-control wizard-required" id="title_en" placeholder={i18next.t("title_en")} onChange={this.handleTitleEn}  />
      </div>

      <div className="form-group">
      <input type="text" defaultValue={this.state.property.title_ar} className="form-control" id="title_ar" placeholder={i18next.t("title_ar")} onChange={this.handleTitleAr}  />
       
      </div>


      <div className="form-group">
      <textarea type="text" defaultValue={this.state.property.details_en} className="form-control wizard-required" id="description_en" placeholder={i18next.t("description_en")} rows={5}  onChange={this.handleDescriptionEn}  />
        <div className="wizard-form-error" />
      </div>

      <div className="form-group">
      <textarea type="text" defaultValue={this.state.property.details_ar} className="form-control " id="description_ar" placeholder={i18next.t("description_ar")} rows={5} onChange={this.handleDescriptionAr}   />
        
      </div>

      <div className="form-group">
      <input type="number" defaultValue={this.state.property.area} className="form-control wizard-required" id="area" placeholder={i18next.t("area")} onChange={this.handleSquarearea}   />
      <div className="wizard-form-error" />
      </div>

      <div className="form-group">
      <input type="number" defaultValue={this.state.property.price} className="form-control wizard-required" id="price" placeholder={i18next.t("price")} onChange={this.handlePrice}   />
      <div className="wizard-form-error" />
      </div>

      <div className={this.state.bathroomfeature}>
                                  <div className="form-group">
                                      <select className="form-select form-select-lg mb-3" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleBathroom}>
                                      <option value={this.state.property.baths}>{this.state.property.baths}</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
                                      <option value="11">11</option>
                                      <option value="12">12</option>
                                      <option value="13">13</option>
                                      <option value="14">14</option>
                                      <option value="15">15</option>
                                      <option value="16">16</option>
                                      <option value="17">17</option>
                                      <option value="18">18</option>
                                      <option value="19">19</option>
                                      <option value="20">20</option>
                                      <option value="20+">20+</option>
                                      </select>
                                  </div>
                                  <div className="form-group">
                                      <select className="form-select form-select-lg mb-3" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleBedroom}>
                                      <option value={this.state.property.beds}>{this.state.property.beds}</option>
                                      <option value="0">Studio</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
                                      <option value="11">11</option>
                                      <option value="12">12</option>
                                      <option value="13">13</option>
                                      <option value="14">14</option>
                                      <option value="15">15</option>
                                      <option value="16">16</option>
                                      <option value="17">17</option>
                                      <option value="18">18</option>
                                      <option value="19">19</option>
                                      <option value="20">20</option>
                                      <option value="20+">20+</option>
                                      </select>
                                  </div>
                              </div>
                              <div className={this.state.landfeatures}>
                                        <div className="mb-3">
                                            <select className="form-select form-select-lg mb-3" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleCompletionStatus}>
                                            {this.state.property.completion_status ==1?<>
                                              <option value="1">{lang == "en" ? "Ready" : "  جاهز "}</option>
                                            <option value="2">{lang == "en" ? "Off Plan" : "  خارج الخطة "}</option>
                                            </>:null
                                            }
                                            {this.state.property.completion_status==2?<>
                                            <option value="2">{lang == "en" ? "Off Plan" : "  خارج الخطة "}</option>
                                            <option value="1">{lang == "en" ? "Ready" : "  جاهز "}</option>
                                            </>:null}
                                            {this.state.property.completion_status == 0?<>
                                              <option value="0">{lang == "en" ? "Completion Status " : " حالة إكمال "}</option>
                                            <option value="1">{lang == "en" ? "Ready" : "  جاهز "}</option>
                                            <option value="2">{lang == "en" ? "Off Plan" : "  خارج الخطة "}</option></>:null}
            
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select form-select-lg" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleOwnerStatus}>
                                            {this.state.property.ownership_status==1?<>
                                              <option value="1">{lang == "en" ? "Freshhold " : "   عقد جديد "}</option>
                                            <option value="2">{lang == "en" ? "Leasehold " : "   مسؤول المستأجرة "}</option></>:null}
                                            {this.state.property.ownership_status==2?<>
                                              <option value="2">{lang == "en" ? "Leasehold " : "   مسؤول المستأجرة "}</option>
                                             <option value="1">{lang == "en" ? "Freshhold " : "   عقد جديد "}</option>
                                            </>:null}

                                            {this.state.property.ownership_status==0?<>
                                              <option value="0">{lang == "en" ? "OwnerShip Status " : "  حالة الملكية  "}</option>
                                              <option value="1">{lang == "en" ? "Freshhold " : "   عقد جديد "}</option>
                                              <option value="2">{lang == "en" ? "Leasehold " : "   مسؤول المستأجرة "}</option></>:null}

                                          
                                            </select>
                                        </div>
                                    </div>
                              <div className={this.state.rentfileds}>
                                  <h4>{lang == "en" ? "Rent Details" : "تفاصيل الإيجار"}</h4>
                                    <div className="col-lg-6 mb-2">
                                      <div className="mb-2">
                                          <select className="form-select form-select-lg" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleRentFrequency}>
                                          {this.state.property.rent_frequency ==1?
                                             <>
                                                <option value="1">{lang == "en" ? "Yearly" : "سنوي"}</option>
                                                <option value="2">{lang == "en" ? "Monthly" : "شهري"}</option>
                                                <option value="3">{lang == "en" ? "Weekly" : "اسبوعي"}</option>
                                                <option value="4">{lang == "en" ? "Daily" : "يومي"}</option>
                                             </>
                                             :null
                                             }
                                             {this.state.property.rent_frequency ==2?
                                                   <>
                                                    <option value="2">{lang == "en" ? "Monthly" : "شهري"}</option>
                                                    <option value="1">{lang == "en" ? "Yearly" : "سنوي"}</option>                                                   
                                                    <option value="3">{lang == "en" ? "Weekly" : "اسبوعي"}</option>
                                                    <option value="4">{lang == "en" ? "Daily" : "يومي"}</option>
                                                 </>
                                                 :null
                                             }
                                             {this.state.property.rent_frequency ==3?
                                                   <>
                                                    <option value="3">{lang == "en" ? "Weekly" : "اسبوعي"}</option>
                                                    <option value="1">{lang == "en" ? "Yearly" : "سنوي"}</option>
                                                    <option value="2">{lang == "en" ? "Monthly" : "شهري"}</option>                                                  
                                                    <option value="4">{lang == "en" ? "Daily" : "يومي"}</option>
                                                 </>
                                                 :null
                                             }
                                             {this.state.property.rent_frequency ==4?
                                               <>
                                               <option value="4">{lang == "en" ? "Daily" : "يومي"}</option>
                                               <option value="1">{lang == "en" ? "Yearly" : "سنوي"}</option>
                                                <option value="2">{lang == "en" ? "Monthly" : "شهري"}</option>
                                                <option value="3">{lang == "en" ? "Weekly" : "اسبوعي"}</option>
                                                
                                             </>
                                             :null
                                             }
                                             {this.state.property.rent_frequency ==0?<>
                                                <option  value="0">{i18next.t("rentfrequency")} </option>
                                                <option value="1">{lang == "en" ? "Yearly" : "سنوي"}</option>
                                                <option value="2">{lang == "en" ? "Monthly" : "شهري"}</option>
                                                <option value="3">{lang == "en" ? "Weekly" : "اسبوعي"}</option>
                                                <option value="4">{lang == "en" ? "Daily" : "يومي"}</option></>:null}
                                            
                                          </select>
                                      </div>
                                  </div>
                                  <div className="col-lg-6 mb-2">
                                      <div className="mb-3">
                                          <input type="text" defaultValue={this.state.property.min_contract_period} className="form-control" placeholder={i18next.t("mincontract")} onChange={this.handleMinimumcontractperiod} id="mincontract" />
                                      </div>
                                  </div>
                                  <div className="col-lg-6 mb-2">
                                      <div className="mb-2">
                                          <select className="form-select form-select-lg" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handlePaidby} id="paidby">
                                          {this.state.property.paid_by == 1?<>
                                                <option value="1">{lang == "en" ? "LandLord" : "المالك"}</option>
                                                <option value="2">{lang == "en" ? "Tenant" : "مستأجر"}</option>
                                          </>:null
                                     
                                          }
                                          {this.state.property.paid_by==2?     <>
                                                <option value="2">{lang == "en" ? "Tenant" : "مستأجر"}</option>
                                                <option value="1">{lang == "en" ? "LandLord" : "المالك"}</option>
                                                
                                                </>:null}
                                                {this.state.property.paid_by==0?<>
                                                  <option  value="0">{i18next.t("paidby")}</option>
                                                <option value="1">{lang == "en" ? "LandLord" : "المالك"}</option>
                                                <option value="2">{lang == "en" ? "Tenant" : "مستأجر"}</option></>:null}
                                          </select>
                                      </div>
                                  </div>
                           
                                  <div className="col-lg-6 mb-2">
                                      <div className="mb-3">
                                          <input type="text" defaultValue={this.state.property.maintainance_fee} className="form-control" placeholder={i18next.t("mantianancefee")} onChange={this.handleMaintainaceFee} id="mantianancefee" />
                                      </div>
                                  </div>
                                  <div className="col-lg-6 mb-2">
                                      <div className="mb-3">
                                                <select className="form-select form-select-lg" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleVactingPeriod} id="vacatingperiod" >
                                                {this.state.property.vacating_period == 1?
                                                <>
                                                <option value="1">{lang == "en" ? "Year" : "سنة"}</option>
                                                <option value="2">{lang == "en" ? "Month" : "شهر"}</option>
                                                <option value="3">{lang == "en" ? "Week" : "اسبوع"}</option>
                                                <option value="4">{lang == "en" ? "Day" : "يوم"}</option>
                                                </>:null}
                                                {this.state.property.vacating_period == 2?
                                                <>
                                                <option value="2">{lang == "en" ? "Month" : "شهر"}</option>
                                                <option value="1">{lang == "en" ? "Year" : "سنة"}</option>
                                                <option value="3">{lang == "en" ? "Week" : "اسبوع"}</option>
                                                <option value="4">{lang == "en" ? "Day" : "يوم"}</option>
                                                </>:null}
                                                {this.state.property.vacating_period == 3?
                                                <>
                                                <option value="3">{lang == "en" ? "Week" : "اسبوع"}</option>
                                                 <option value="1">{lang == "en" ? "Year" : "سنة"}</option>
                                                <option value="2">{lang == "en" ? "Month" : "شهر"}</option>
                                                <option value="4">{lang == "en" ? "Day" : "يوم"}</option>
                                                </>:null}
                                                {this.state.property.vacating_period == 4?
                                                <>
                                                <option value="4">{lang == "en" ? "Day" : "يوم"}</option>
                                                <option value="1">{lang == "en" ? "Year" : "سنة"}</option>
                                                <option value="2">{lang == "en" ? "Month" : "شهر"}</option>
                                                <option value="3">{lang == "en" ? "Week" : "اسبوع"}</option>
                                        
                                                </>:null}
                                                {this.state.property.vacating_period == 0?<>
                                                <option value="0">{i18next.t("vacatingperiod")} </option>
                                                <option value="1">{lang == "en" ? "Year" : "سنة"}</option>
                                                <option value="2">{lang == "en" ? "Month" : "شهر"}</option>
                                                <option value="3">{lang == "en" ? "Week" : "اسبوع"}</option>
                                                <option value="4">{lang == "en" ? "Day" : "يوم"}</option>
                                                </>:null}
                                                
                                                </select>
                                    </div>
                                  </div>        
                                  </div>

                              <div className="form-group">
                              <input type="number" defaultValue={this.state.property.permitnumber} name="permitNumber" className="form-control" placeholder="Permit Number" onChange={this.handlePermitNumber} />
                         </div>  

 
        <div className="form-group clearfix">
          <div className="row">
              <div className="col-md-10"></div>
              <div className="col-md-2">
              <a href="javascript:;" className="form-wizard-next-btn float-right rounded" >{lang == "en" ? "Next" : "التالي"}</a>
              </div>
          </div>
        
      </div>
    </fieldset>	
    <fieldset className="wizard-fieldset">
      <h5>{lang == "en" ? "Uploads" : "مرفقات"}</h5>
      <div id="uploads" className="tab-pane" role="tabpanel">
                              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                  
                                  <li class="nav-item" role="presentation">
                                      <a class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-image"  role="tab" aria-controls="pills-home" aria-selected="true">{lang == "en" ? "Image" : "الصور"}</a>
                                  </li>
                                  <li class="nav-item" role="presentation">
                                      <a class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-video" role="tab" aria-controls="pills-profile" aria-selected="false">{lang == "en" ? "Video" : "الفيديو"}</a>
                                  </li>
                              </ul>
                              <div class="tab-content" id="pills-tabContent">
                                  <div class="tab-pane fade show active" id="pills-image" role="tabpanel" aria-labelledby="pills-home-tab">

                                      <div style={{marginBottom:'20px'}}>
                                          <label>{lang == "en" ? "Featured Image" : "الصورة الاساسية"}</label>
                                          <input type="file" name="featured_image" onChange={this.handleFeaturedImage} />
                                          <img src={baseurlImg+"/public/uploads/properties/"+this.state.property.image} alt='tt' height="70px" width="90px" />
                                          {this.state.featuredimage!=null? <img src={this.state.imageShow}  alt='tt' height="70px" width="90px" />:null}
                                      </div>

                                  <label>{lang=="en"?"Gallery Images":"معرض الصور"} </label>
                                  <input type="file" id="file" multiple name="file" onChange={this.handleChange} />
                                  <table class="table">
                                {/* <thead>
                                  {this.state.image.length>0?
                                        <tr>
                                        <th scope="col">Image preview</th>
                                        <th scope="col">Image Description</th>
                                        <th scope="col">Primary Image</th>
                                        <th scope="col">Delete Image</th>
                                        </tr>:null
                                  }
                                        </thead> */}
                                  <tbody>
                                  {this.state.medias.map((media) =>(
                                                <tr key={media.id}>
                                               <td>
                                             <img src={baseurlImg+"/public/uploads/properties/"+media.image} alt='tt' height="70px" width="90px" />
                                             </td>
                                        

                                             <td><a href="#" className="btn btn-sm btn-danger" onClick={this.removeFileFromserver.bind(this,media)}>
                                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                               </a></td>

                                             </tr>
  
                                            ))}
                                        {this.state.image.length > 0 ? (
                                        this.state.image.map((file, index) =>(
                                                <tr key={index}>
                                               
                                                <td>
                                                    <img src={URL.createObjectURL(file)} alt='tt' height="70px" width="90px" />
                                                    </td>
                                                {/* <td>  <input type="text" defaultValue={file.title} onChange={this.handleTitle.bind(this, file)} /></td> */}
                                            
                                           <td><a href="#" className="btn btn-sm btn-danger" onClick={this.removeFile.bind(this, file)}>
                                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                               </a></td>
                                              </tr>
                               
                                        ))):(
                                            <h6 className="text-danger text-center"></h6>
                                        )}

                                    </tbody>

                                   
                                 </table>
                                  </div>
                                  <div class="tab-pane fade" id="pills-video" role="tabpanel" aria-labelledby="pills-profile-tab">
                                     {/* <VideoLinkComponent handleVideo={this.handleVideo} /> */}

                                     {/* video */}
                                  <table class="table" id="myTable">
                                      <thead>
                                          <tr>
                                              <th>
                                              <option value="0"> {lang == "en" ? "Video Source" : "مصدر الفيديو"}</option>
                                              </th>
                                              <th>
                                              <option value="1"> {lang == "en" ? "Link" : "الرابط"}</option>  
                                              </th>
                                              <th>
                                              <option value="2"> {lang == "en" ? "Title " : "العنوان"}</option> 
                                              </th>                                   
                                          </tr>
                                      </thead>
                                      <tbody>
                                              <tr  >
                                                  <td>
                                                      <select className="form-select" aria-label="Default select example" onChange={this.handleVideo_source}>
                                                        {this.state.video_source == 0 ?<>  
                                                          <option value="0"> {lang == "en" ? "Video Source" : "مصدر الفيديو"}</option>
                                                          <option value="1"> {lang == "en" ? "Youtube" : "يتيوب"}</option>
                                                          <option value="2"> {lang == "en" ? "Vimeo " : "فيمو"}</option></>:null}

                                                          {this.state.video_source == 1 ?<>
                                                          <option value="1"> {lang == "en" ? "Youtube" : "يتيوب"}</option>
                                                          <option value="2"> {lang == "en" ? "Vimeo " : "فيمو"}</option>
                                                          </>:null}
                                                          {this.state.video_source == 2 ?<> 
                                                            <option value="2"> {lang == "en" ? "Vimeo " : "فيمو"}</option>
                                                            <option value="1"> {lang == "en" ? "Youtube" : "يتيوب"}</option>
                                                         </>:null}
                                                        
                                                      </select>
                                                  </td>
                                                  <td>
                                                      <input aria-invalid="false" name="video_link" type="url" class="form-control" placeholder="Video Link" onChange={this.handleVideo_link} defaultValue={this.state.video_link} />
                                                  </td>
                                                  <td>

                                                      <input aria-invalid="false" name="video_title" type="url" class="form-control" placeholder="Video Title" onChange={this.handleVideo_title} defaultValue={this.state.video_title} />
                                                  </td>
                                            
                                              </tr>
                                       
                                      </tbody>
                                  </table>
                                     {/* end video */}

                                  </div>
                              </div>
                          </div>

      <div className="form-group clearfix">
          <div className="row">
              <div className="col-md-3">
              <a href="javascript:;" className="form-wizard-previous-btn float-left rounded">{lang == "en" ? "Previous" : "السابق"}</a>
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-3">
              <a href="javascript:;" className="form-wizard-next-btn float-right rounded">{lang == "en" ? "Next" : "التالي"}</a>
              </div>
        </div>
      </div>
    </fieldset>	
    <fieldset className="wizard-fieldset">
      <h5>{lang == "en" ? "Amenities" : "مميزات"}</h5>
  
      <div id="amenties" className="tab-pane" role="tabpanel">
                                <div className="row d-flex justify-content-center">
                                    <div className="col col-sm-5">
                                    <div className="quiz_content_area">
                                    <h1 className="quiz_title">{lang == "en" ? "Amenities" : "مميزات"}</h1>
                                    <div className="row">
                                        <h2 className="amenties-header">{lang == "en" ? "Health and Fitness" : "الصحة و اللياقة"}</h2>
                                        {this.state.healthandfitness.length > 0?(
                                            this.state.healthandfitness.map((health) =>(
                                                <div className="col">
                                                <div className="quiz_card_area">
                                                <input className="quiz_checkbox" type="checkbox" checked={health.status==1?true:false} onClick={this.handleHealthAndFitness.bind(this, health)}  />
                                                <div className="single_quiz_card">
                                                    <div className="quiz_card_content">
                                                        <div className="quiz_card_icon">
                                                          <i className={`fa fa-${health.icon_code}`}></i>                                               
                                                           </div>
                                                            <div className="quiz_card_title">
                                                            <h3><i className="fa fa-check" aria-hidden="true" />{health.feature_en}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            ))

                                        ):""}
                            
                                    </div>
                                    <div className="row">
                                    <h2 className="amenties-header">{lang == "en" ? "Features" : "سمات"}</h2>

                                    {this.state.amenitiesfeatures.length > 0?(
                                            this.state.amenitiesfeatures.map((feature) =>(
                                        <div className="col">
                                            <div className="quiz_card_area">
                                            <input className="quiz_checkbox" type="checkbox" checked={feature.status==1?true:false} onClick={this.handleFeatures.bind(this, feature)}/>
                                            <div className="single_quiz_card">
                                                <div className="quiz_card_content">
                                                    <div className="quiz_card_icon">
                                                    <i className={`fa fa-${feature.icon_code}`}></i>
                                                        </div>
                                                        <div className="quiz_card_title">
                                                        <h3><i className="fa fa-check" aria-hidden="true" />{feature.feature_en}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                             ))):""}
                                    </div>
                                    <div className="row">
                                        <h2 className="amenties-header">{lang == "en" ? "Miscellaneous" : " متنوع"}</h2>
                                        {this.state.miscellaneous.length > 0?(
                                            this.state.miscellaneous.map((miscell) =>(
                                        <div className="col">
                                            <div className="quiz_card_area">
                                            <input className="quiz_checkbox" type="checkbox" checked={miscell.status==1?true:false} onClick={this.handleMiscellaneous.bind(this, miscell)}/>
                                            <div className="single_quiz_card">
                                                <div className="quiz_card_content">
                                                    <div className="quiz_card_icon">
                                                    <i className={`fa fa-${miscell.icon_code}`}></i>
                                                        </div>
                                                        <div className="quiz_card_title">
                                                        <h3><i className="fa fa-check" aria-hidden="true" />{miscell.feature_en}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                             ))):""}

                                    </div>
                                    <div className="row">
                                    <h2 className="amenties-header">{lang == "en" ? "Security and Technology" : " الأمن والتكنولوجيا"}</h2>
                                                 {this.state.securityandtechnology.length > 0?(
                                            this.state.securityandtechnology.map((secandtech) =>(
                                        <div className="col">
                                            <div className="quiz_card_area">
                                            <input className="quiz_checkbox" type="checkbox" checked={secandtech.status==1?true:false} onClick={this.handleSecurityandTechnology.bind(this, secandtech)}/>
                                            <div className="single_quiz_card">
                                                <div className="quiz_card_content">
                                                    <div className="quiz_card_icon">
                                                    <i className={`fa fa-${secandtech.icon_code}`}></i>
                                                        </div>
                                                        <div className="quiz_card_title">
                                                        <h3><i className="fa fa-check" aria-hidden="true" />{secandtech.feature_en}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                             ))):""}
                                    </div>
             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                              <div className="form-group clearfix ">
                                  <div className="row">
                                      <div className="col-md-3">
                                      <a href="javascript:;" className="form-wizard-previous-btn rounded">{lang == "en" ? "Previous" : "السابق"}</a>
                                      </div>
                                      <div className="col-md-6"></div>
                                      <div className="col-md-3">

                        
                    <a href="javascript:;" className="form-wizard-submit rounded" onClick={this.saveData}>{lang == "en" ? "Submit" : "حفظ"}</a>
                                      </div>
      

        </div>
      </div>
    </fieldset>	
   
  </form>
</div>
</div>
</div>
</section>

                  </div>
              </div>
          </div>
  </div>   
)
}
}
export default AdminEditList