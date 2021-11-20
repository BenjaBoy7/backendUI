import React, { Component } from 'react'
import $ from "jquery";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import axios from 'axios';
import { baseurl, baseurlImg } from '../../Components/BaseUrl';
import { Loader } from '@googlemaps/js-api-loader';
import ReactDOMServer from 'react-dom/server';
import {Link} from 'react-dom';
const google = window.google;
    // The location of Uluru
    const loader = new Loader({
      apiKey: "AIzaSyCq6FzlBsSuT-S2zaRh2Rd-i4205DCu57s",
      // libraries: ["places"]
    });
    const UAE_BOUND = {
      north: 26.314170,
      south: 22.65743,
      west: 51.525700,
      east: 56.398182,
    };
    const mapOptions = {
      center: { lat: 23.024, lng: 53.887 },
      zoom: 7,
      restriction: {
        latLngBounds: UAE_BOUND,
        strictBounds: false,
      }
    };
export class MapCluster extends Component {
  constructor(props){
    super(props);
    this.state ={
      propertiesCluster: [],
      isLoading: false,
    }
  }
   initMap =() =>{
      //  this.setState({ isLoading: true })
      // Create an array of alphabetical characters used to label the markers.
      // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // // Add some markers to the map.
      
      // const markers = propertieCluster.map((location, i) => {
      //     const locPos= {lat: location.lat, lng: location.lng}
      //   return new google.maps.Marker({
      //      position: locPos,
      //     // label: labels[i % labels.length],
      //   });
      // });
    
      // // Add a marker clusterer to manage the markers.
      // new MarkerClusterer({ markers, map });
      axios.get(baseurl+"propertymap").then((response)=>{
  
        loader.load()
        .then((google) => {
          var infoWin = new google.maps.InfoWindow();
          const map= new google.maps.Map(document.getElementById("map"), mapOptions);
          var infoWin = new google.maps.InfoWindow();
          const markers = response.data.map((location, i) => {
 
            var marker = new google.maps.Marker({
              position: location
            });
            // const propertyWindow= {}
            google.maps.event.addListener(marker, 'click', function(evt) {
              const InfoWindowContent = (
                <div className="row">
                  <div class="property-listing list_view">
                    <div class="listing-img-wrapper">
                      <div class="_exlio_125">{location.purpose}</div>
                      <div class="list-img-slide">
                        <a href="single-property-1.html"><img src={baseurlImg+"/uploads/properties/"+location.image} class="img-fluid mx-auto" alt="" /></a>
                      </div>
                    </div>                  
                    <div class="list_view_flex">                  
                      <div class="listing-detail-wrapper mt-1">
                        <div class="listing-short-detail-wrap">
                          <div class="_card_list_flex mb-2">
                            <div class="_card_flex_01">
                              <span class="_list_blickes types">{location.typeName_en}</span>
                            </div>
                            <div class="_card_flex_last">
                              <h6 class="listing-card-info-price mb-0">{location.price}</h6>
                            </div>
                          </div>
                          <div class="_card_list_flex">
                            <div class="_card_flex_01">
                              <h4 class="listing-name verified"><Link to={"/single-property/"+location.id} class="prt-link-detail">{location.title_en}</Link></h4>
                            </div>
                          </div>
                        </div>
                      </div>                
                      <div class="price-features-wrapper">
                        <div class="list-fx-features">
                          <div class="listing-card-info-icon">
                            <div class="inc-fleat-icon"><img src="assets/img/bed.svg" width="13" alt="" /></div>3 Beds
                          </div>
                          <div class="listing-card-info-icon">
                            <div class="inc-fleat-icon"><img src="assets/img/bathtub.svg" width="13" alt="" /></div>1 Bath
                          </div>
                          <div class="listing-card-info-icon">
                            <div class="inc-fleat-icon"><img src="assets/img/move.svg" width="13" alt="" /></div>800 sqft
                          </div>
                        </div>
                      </div> 
                      <div class="listing-detail-footer">
                        <div class="footer-first">
                        </div>
                        <div class="footer-flex">
                          <a href="property-detail.html" class="prt-view">View Detail</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
              const content = ReactDOMServer.renderToString(InfoWindowContent);
              infoWin.setContent(content);
              infoWin.open(map, marker);
            })
            return marker;
          });
          // console.log(markers)
          // Add a marker clusterer to manage the markers.
          new MarkerClusterer({ markers, map });
        })
        .catch(e => {
          // do something
        });
       })  
  }
// renderMap =()=>{
//   window.map= this.initMap
// }
  propertyRequest = ()=> {
    axios.get(baseurl+"propertymap").then((response)=>{
       this.setState({
           propertiesCluster: response.data
       })  
       this.propertyRequest();
    })
  }
  componentDidMount() {
    this.initMap()
    $( document ).ready(function() {
      });
// 
  }
  // componentWillUnmount(){
  //   $( document ).ready(function() {
  //   axios.get(baseurl+"propertymap").then((response)=>{
  //     loader.load()
  //     .then((google) => {
  //       const map= new google.maps.Map(document.getElementById("map"), mapOptions);
  //       const markers = response.data.map((location, i) => {
  //       const locPos= {lat: location.lat, lng: location.lng}
  //         return new google.maps.Marker({
  //            position: locPos,
  //           //  label: labels[i % labels.length],
  //         });
  //       });
      
  //       // Add a marker clusterer to manage the markers.
  //       new MarkerClusterer({ markers, map });
  //     })
  //     .catch(e => {
  //       // do something
  //     });
  //    })  
  //   });
  //   }
  render() {
    return (
      <>
      <div style={{height: '800px'}} id="map">
      </div>
                  
        </>    
    )
  }
}
export default MapCluster