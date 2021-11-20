import React, { Component } from 'react'
import jQuery from 'jquery'
import smartWizard from 'smartwizard'
import axios from 'axios';
import { baseurl } from '../../Components/BaseUrl';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './AddProperty.css'
import MapBoxMap from './MapBoxMap'
import FileUploadComponent from './FileUploadComponent';
import VideoLinkComponent from './VideoLinkComponet';
import Map from "../../Map"
import i18next from 'i18next'
import Swal from 'sweetalert2'
import cookie from 'js-cookie'
import './cssfile.css'
import ClipLoader from "react-spinners/ClipLoader";

// import { injectStyle } from "react-toastify/dist/inject-style";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';


import "./styles.css";
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    InfoWindow,
    Marker
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import '../../Test.css'

// import MapboxAutocomplete from 'react-mapbox-autocomplete';


// import './App.css';
let map;
// mapboxgl.accessToken = 'pk.eyJ1IjoiZmluZHByb3BlcnRpZXMiLCJhIjoiY2tsbzVlN3VwMGFoOTJva2FqeWEwMTgwcyJ9.0tAYLLNh2G0wNmTKt350aQ';
let lang = localStorage.getItem("lang") || "en";

const API_KEY = "AIzaSyAZM9oQLX8iBClpzrJyc8qV-kDeHMAytko";

// if (typeof window !== "undefined") {
//     injectStyle();
//   }
class AgentProperty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            healthandfitness: [],
            amenitiesfeatures: [],
            miscellaneous: [],
            securityandtechnology: [],
            propertytypes: [],
            agents: [],
            agent: {},
            propertyType_en: "",
            propertyType_ar: "",
            categoryId: "0",
            propertytype_id: "0",
            // selectedAgent:0,
            propertyTypeDisabld: "disabled",
            rentOrSale: "",

            bathroomfeature: "row d-none",
            furnishstatusfields: "mb-3 d-none",
            rentfileds: "row d-none",
            occupancyfiled: "row d-none",
            readyoffPlanfield: "row d-none",
            landfeatures: "row d-none",
            location_name_en: "",
            location_name_ar: "",
            address: "",
            address_ar: "",
            // details
            country: "",
            country_ar: "",
            emirate: "",
            emirate_ar: "",
            area: "",
            area_ar: "",
            streetorbuild: "",
            streetorbuild_ar: "",
            //
            firnished: 0,
            checked: false,
            // Amenties
            gym: false,
            swimmingpool: false,
            medical: false,
            sauna_steem: false,
            disability_access: false,
            built_in_wardobes: false,
            barbaque_area: false,
            cafeteria: false,
            kitchen: false,
            central_ac: false,
            garden: false,
            furnished: false,
            disposal: false,
            kidsplay: false,
            parking: false,
            balcony: false,
            atm_acxeess: false,
            water_view: false,
            landmark_view: false,
            day_care: false,
            security_guard: false,
            cctv: false,
            internet: false,
            satelite_cable_tv: false,
            // property details
            title_en: "",
            title_ar: "",
            description_en: "",
            description_ar: "",
            square_area: 0,
            price: 0,
            bedroom: 0,
            bathroom: 0,
            rent_frequency: 0,
            completion_status:0,
            ownership_status:0,
            min_contract_period: 0,
            vacating_period: 0,
            maintainance_fee: 0,
            paid_by: 0,
            permit_number: 0,
            videoRows: [],
            allfiles: [],
            video_source: 0,
            video_title: "",
            video_link: "",
            purpose: 1,
            image: "",
            featuredimage: null,
            imageShow: null,
            agentLoading: false,
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

            selectplace:"",
            availablepackage:0

        }
        this.mapContainer = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleFeaturedImage = this.handleFeaturedImage.bind(this);

    }

    //  notify = (e) =>{
    //    e.preventDefault()
    //    //alert("yes")
    //    //if(this.state.permit_number)
    //    console.log("notify")
    //     toast.dark("Hey 👋, hhh how hh!");

    //   }

    onMarkerDragEnd = event => {
        // console.log("event", event);
        // return;

        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng(),
            addressArray = [];
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                console.log("respon", response.results[0].address_components)

                const arraylength = response.results[0].address_components.length
                const myarray = response.results[0].address_components
                console.log("myarray", myarray)
                //return

                console.log("my lat", response.results[0].geometry.location.lat)
                console.log("my lng", response.results[0].geometry.location.lng)
                let alldata = response.results[0].formatted_address


                //  let mydata = alldata.split('-');
                //  console.log("full data",alldata)
                //  console.log("your street after",mydata[0])
                // // let myarea = alldata.split('-',2,1);
                //  console.log("your area after",mydata[1])
                //  //let myemirate = alldata.split('-',3,1);
                //  console.log("your emi after",mydata[2])
                // // let mycountry = alldata.split('-',4,1);
                //  console.log("your cou after",mydata[3])



                // full data

                if (arraylength == 6) {


                    // full data
                    if (this.isArabic(myarray[5].long_name)) {
                        this.translate_fulldata(myarray[5].long_name, "ar", "en")
                    }
                    else {
                        this.translate_fulldata(myarray[5].long_name, "en", "ar")
                    }
                    // country

                    if (this.isArabic(myarray[5].long_name)) {
                        this.translate_country(myarray[5].long_name, "ar", "en")
                    }
                    else {
                        this.translate_country(myarray[5].long_name, "en", "ar")
                    }

                    // emirate

                    if (this.isArabic(myarray[4].long_name)) {
                        this.translate_emirate(myarray[4].long_name, "ar", "en")
                    }
                    else {
                        this.translate_emirate(myarray[4].long_name, "en", "ar")
                    }

                    // area

                    if (this.isArabic(myarray[2].long_name)) {
                        this.translate_area(myarray[2].long_name, "ar", "en")
                    }
                    else {
                        this.translate_area(myarray[2].long_name, "en", "ar")
                    }

                    // build or street

                    if (this.isArabic(myarray[1].long_name)) {
                        this.translate_buildorstreet(myarray[1].long_name, "ar", "en")
                    }
                    else {
                        this.translate_buildorstreet(myarray[1].long_name, "en", "ar")
                    }


                }
                else

                    if (arraylength == 5) {


                        // full data
                        if (this.isArabic(myarray[4].long_name)) {
                            this.translate_fulldata(myarray[4].long_name, "ar", "en")
                        }
                        else {
                            this.translate_fulldata(myarray[4].long_name, "en", "ar")
                        }
                        // country

                        if (this.isArabic(myarray[4].long_name)) {
                            this.translate_country(myarray[4].long_name, "ar", "en")
                        }
                        else {
                            this.translate_country(myarray[4].long_name, "en", "ar")
                        }

                        // emirate

                        if (this.isArabic(myarray[3].long_name)) {
                            this.translate_emirate(myarray[3].long_name, "ar", "en")
                        }
                        else {
                            this.translate_emirate(myarray[3].long_name, "en", "ar")
                        }

                        // area

                        if (this.isArabic(myarray[2].long_name)) {
                            this.translate_area(myarray[2].long_name, "ar", "en")
                        }
                        else {
                            this.translate_area(myarray[2].long_name, "en", "ar")
                        }

                        // build or street

                        if (this.isArabic(myarray[1].long_name)) {
                            this.translate_buildorstreet(myarray[1].long_name, "ar", "en")
                        }
                        else {
                            this.translate_buildorstreet(myarray[1].long_name, "en", "ar")
                        }


                    } else

                        if (arraylength == 4) {

                            if (this.isArabic(myarray[3].long_name)) {
                                this.translate_fulldata(myarray[3].long_name, "ar", "en")
                            }
                            else {
                                this.translate_fulldata(myarray[3].long_name, "en", "ar")
                            }
                            // country

                            if (this.isArabic(myarray[3].long_name)) {
                                this.translate_country(myarray[3].long_name, "ar", "en")
                            }
                            else {
                                this.translate_country(myarray[3].long_name, "en", "ar")
                            }

                            // emirate

                            if (this.isArabic(myarray[2].long_name)) {
                                this.translate_emirate(myarray[2].long_name, "ar", "en")
                            }
                            else {
                                this.translate_emirate(myarray[2].long_name, "en", "ar")
                            }

                            // area

                            if (this.isArabic(myarray[1].long_name)) {
                                this.translate_area(myarray[1].long_name, "ar", "en")
                            }
                            else {
                                this.translate_area(myarray[1].long_name, "en", "ar")
                            }

                            // build or street

                            if (this.isArabic(myarray[0].long_name)) {
                                this.translate_buildorstreet(myarray[0].long_name, "ar", "en")
                            }
                            else {
                                this.translate_buildorstreet(myarray[0].long_name, "en", "ar")
                            }


                        }
                        else
                            if (arraylength == 3) {

                                if (this.isArabic(myarray[2].long_name)) {
                                    this.translate_fulldata(myarray[2].long_name, "ar", "en")
                                }
                                else {
                                    this.translate_fulldata(myarray[2].long_name, "en", "ar")
                                }
                                // country

                                if (this.isArabic(myarray[2].long_name)) {
                                    this.translate_country(myarray[2].long_name, "ar", "en")
                                }
                                else {
                                    this.translate_country(myarray[2].long_name, "en", "ar")
                                }

                                // emirate

                                if (this.isArabic(myarray[1].long_name)) {
                                    this.translate_emirate(myarray[1].long_name, "ar", "en")
                                }
                                else {
                                    this.translate_emirate(myarray[1].long_name, "en", "ar")
                                }

                                // area

                                if (this.isArabic(myarray[0].long_name)) {
                                    this.translate_area(myarray[0].long_name, "ar", "en")
                                }
                                else {
                                    this.translate_area(myarray[0].long_name, "en", "ar")
                                }

                                // build or street

                                if (this.isArabic(myarray[0].long_name)) {
                                    this.translate_buildorstreet(myarray[0].long_name, "ar", "en")
                                }
                                else {
                                    this.translate_buildorstreet(myarray[0].long_name, "en", "ar")
                                }


                            }
                            else
                                if (arraylength <= 2) {

                                    if (this.isArabic(myarray[1].long_name)) {
                                        this.translate_fulldata(myarray[1].long_name, "ar", "en")
                                    }
                                    else {
                                        this.translate_fulldata(myarray[1].long_name, "en", "ar")
                                    }
                                    // country

                                    if (this.isArabic(myarray[1].long_name)) {
                                        this.translate_country(myarray[1].long_name, "ar", "en")
                                    }
                                    else {
                                        this.translate_country(myarray[1].long_name, "en", "ar")
                                    }

                                    // emirate

                                    if (this.isArabic(myarray[0].long_name)) {
                                        this.translate_emirate(myarray[0].long_name, "ar", "en")
                                    }
                                    else {
                                        this.translate_emirate(myarray[0].long_name, "en", "ar")
                                    }

                                    // area

                                    if (this.isArabic(myarray[0].long_name)) {
                                        this.translate_area(myarray[0].long_name, "ar", "en")
                                    }
                                    else {
                                        this.translate_area(myarray[0].long_name, "en", "ar")
                                    }

                                    // build or street

                                    if (this.isArabic(myarray[0].long_name)) {
                                        this.translate_buildorstreet(myarray[0].long_name, "ar", "en")
                                    }
                                    else {
                                        this.translate_buildorstreet(myarray[0].long_name, "en", "ar")
                                    }


                                }

                //const address = response.results[0].formatted_address;

                // console.log("full")
                //addressArray = response.results[0].address_components,
                // city = this.getCity(addressArray),
                // area = this.getArea(addressArray),
                // state = this.getState(addressArray);

                // this.translate(address)
                //this.translate(mydata[3])

                this.setState({
                    //: alldata,
                    //address_ar: address ? address : "",
                    //streetorbuild:  mydata[0],
                    //    area:  mydata[1],
                    //    emirate:  mydata[2],
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

        this.setState({selectplace:place.address_components})

        //console.log("place",place)
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



        if (arraylength >= 10) {
            //console.log("length is 7 or greater ")


            // full data
            if (this.isArabic(place.formatted_address)) {
                this.translate_fulldata(place.formatted_address, "ar", "en")
            }
            else {
                this.translate_fulldata(place.formatted_address, "en", "ar")
            }
            // country

            if (this.isArabic(alldata[9].long_name)) {
                this.translate_country(alldata[9].long_name, "ar", "en")
            }
            else {
                this.translate_country(alldata[9].long_name, "en", "ar")
            }

            // emirate

            if (this.isArabic(alldata[8].long_name)) {
                this.translate_emirate(alldata[8].long_name, "ar", "en")
            }
            else {
                this.translate_emirate(alldata[8].long_name, "en", "ar")
            }

            // area

            if (this.isArabic(alldata[3].long_name)) {
                this.translate_area(alldata[3].long_name, "ar", "en")
            }
            else {
                this.translate_area(alldata[3].long_name, "en", "ar")
            }

            // build or street

            if (this.isArabic(alldata[2])) {
                this.translate_buildorstreet(alldata[2].long_name + " - " + place.name, "ar", "en")
            }
            else {
                this.translate_buildorstreet(alldata[2].long_name + " - " + place.name, "en", "ar")
            }



        }
        else

            if (arraylength == 9) {


                // full data
                if (this.isArabic(place.formatted_address)) {
                    this.translate_fulldata(place.formatted_address, "ar", "en")
                }
                else {
                    this.translate_fulldata(place.formatted_address, "en", "ar")
                }
                // country

                if (this.isArabic(alldata[8].long_name)) {
                    this.translate_country(alldata[8].long_name, "ar", "en")
                }
                else {
                    this.translate_country(alldata[8].long_name, "en", "ar")
                }

                // emirate

                if (this.isArabic(alldata[7].long_name)) {
                    this.translate_emirate(alldata[7].long_name, "ar", "en")
                }
                else {
                    this.translate_emirate(alldata[7].long_name, "en", "ar")
                }

                // area

                if (this.isArabic(alldata[3].long_name)) {
                    this.translate_area(alldata[3].long_name, "ar", "en")
                }
                else {
                    this.translate_area(alldata[3].long_name, "en", "ar")
                }

                // build or street

                if (this.isArabic(alldata[2])) {
                    this.translate_buildorstreet(alldata[2].long_name + " - " + place.name, "ar", "en")
                }
                else {
                    this.translate_buildorstreet(alldata[2].long_name + " - " + place.name, "en", "ar")
                }



            }
            else

                if (arraylength == 8) {


                    // full data
                    if (this.isArabic(place.formatted_address)) {
                        this.translate_fulldata(place.formatted_address, "ar", "en")
                    }
                    else {
                        this.translate_fulldata(place.formatted_address, "en", "ar")
                    }
                    // country

                    if (this.isArabic(alldata[7].long_name)) {
                        this.translate_country(alldata[7].long_name, "ar", "en")
                    }
                    else {
                        this.translate_country(alldata[7].long_name, "en", "ar")
                    }

                    // emirate

                    if (this.isArabic(alldata[6].long_name)) {
                        this.translate_emirate(alldata[6].long_name, "ar", "en")
                    }
                    else {
                        this.translate_emirate(alldata[6].long_name, "en", "ar")
                    }

                    // area

                    if (this.isArabic(alldata[3].long_name)) {
                        this.translate_area(alldata[3].long_name, "ar", "en")
                    }
                    else {
                        this.translate_area(alldata[3].long_name, "en", "ar")
                    }

                    // build or street

                    if (this.isArabic(alldata[2])) {
                        this.translate_buildorstreet(alldata[2].long_name + " - " + place.name, "ar", "en")
                    }
                    else {
                        this.translate_buildorstreet(alldata[2].long_name + " - " + place.name, "en", "ar")
                    }



                }
                else

                    if (arraylength == 7) {


                        // full data
                        if (this.isArabic(place.formatted_address)) {
                            this.translate_fulldata(place.formatted_address, "ar", "en")
                        }
                        else {
                            this.translate_fulldata(place.formatted_address, "en", "ar")
                        }
                        // country

                        if (this.isArabic(alldata[6].long_name)) {
                            this.translate_country(alldata[6].long_name, "ar", "en")
                        }
                        else {
                            this.translate_country(alldata[6].long_name, "en", "ar")
                        }

                        // emirate

                        if (this.isArabic(alldata[5].long_name)) {
                            this.translate_emirate(alldata[5].long_name, "ar", "en")
                        }
                        else {
                            this.translate_emirate(alldata[5].long_name, "en", "ar")
                        }

                        // area

                        if (this.isArabic(alldata[2].long_name)) {
                            this.translate_area(alldata[2].long_name, "ar", "en")
                        }
                        else {
                            this.translate_area(alldata[2].long_name, "en", "ar")
                        }

                        // build or street

                        if (this.isArabic(alldata[1])) {
                            this.translate_buildorstreet(alldata[1].long_name + " - " + place.name, "ar", "en")
                        }
                        else {
                            this.translate_buildorstreet(alldata[1].long_name + " - " + place.name, "en", "ar")
                        }



                    }
                    else
                        if (arraylength == 6) {


                            // full data
                            if (this.isArabic(place.formatted_address)) {
                                this.translate_fulldata(place.formatted_address, "ar", "en")
                            }
                            else {
                                this.translate_fulldata(place.formatted_address, "en", "ar")
                            }
                            // country

                            if (this.isArabic(alldata[5].long_name)) {
                                this.translate_country(alldata[5].long_name, "ar", "en")
                            }
                            else {
                                this.translate_country(alldata[5].long_name, "en", "ar")
                            }

                            // emirate

                            if (this.isArabic(alldata[4].long_name)) {
                                this.translate_emirate(alldata[4].long_name, "ar", "en")
                            }
                            else {
                                this.translate_emirate(alldata[4].long_name, "en", "ar")
                            }

                            // area

                            if (this.isArabic(alldata[2].long_name)) {
                                this.translate_area(alldata[2].long_name, "ar", "en")
                            }
                            else {
                                this.translate_area(alldata[2].long_name, "en", "ar")
                            }

                            // build or street

                            if (this.isArabic(alldata[0])) {
                                this.translate_buildorstreet(place.name, "ar", "en")
                            }
                            else {
                                this.translate_buildorstreet(place.name, "en", "ar")
                            }


                        }
                        else

                            if (arraylength == 5) {


                                // full data
                                if (this.isArabic(place.formatted_address)) {
                                    this.translate_fulldata(place.formatted_address, "ar", "en")
                                }
                                else {
                                    this.translate_fulldata(place.formatted_address, "en", "ar")
                                }
                                // country

                                if (this.isArabic(alldata[4].long_name)) {
                                    this.translate_country(alldata[4].long_name, "ar", "en")
                                }
                                else {
                                    this.translate_country(alldata[4].long_name, "en", "ar")
                                }

                                // emirate

                                if (this.isArabic(alldata[3].long_name)) {
                                    this.translate_emirate(alldata[3].long_name, "ar", "en")
                                }
                                else {
                                    this.translate_emirate(alldata[3].long_name, "en", "ar")
                                }

                                // area

                                if (this.isArabic(alldata[1].long_name)) {
                                    this.translate_area(alldata[1].long_name, "ar", "en")
                                }
                                else {
                                    this.translate_area(alldata[1].long_name, "en", "ar")
                                }

                                // build or street

                                if (this.isArabic(alldata[0])) {
                                    this.translate_buildorstreet(alldata[0].long_name + " - " + place.name, "ar", "en")
                                }
                                else {
                                    this.translate_buildorstreet(alldata[0].long_name + " - " + place.name, "en", "ar")
                                }



                            } else

                                if (arraylength == 4) {

                                    if (this.isArabic(place.formatted_address)) {
                                        this.translate_fulldata(place.formatted_address, "ar", "en")
                                    }
                                    else {
                                        this.translate_fulldata(place.formatted_address, "en", "ar")
                                    }
                                    // country

                                    if (this.isArabic(alldata[3].long_name)) {
                                        this.translate_country(alldata[3].long_name, "ar", "en")
                                    }
                                    else {
                                        this.translate_country(alldata[3].long_name, "en", "ar")
                                    }

                                    // emirate

                                    if (this.isArabic(alldata[2].long_name)) {
                                        this.translate_emirate(alldata[2].long_name, "ar", "en")
                                    }
                                    else {
                                        this.translate_emirate(alldata[2].long_name, "en", "ar")
                                    }

                                    // area

                                    if (this.isArabic(alldata[1].long_name)) {
                                        this.translate_area(alldata[1].long_name, "ar", "en")
                                    }
                                    else {
                                        this.translate_area(alldata[1].long_name, "en", "ar")
                                    }

                                    // build or street

                                    if (this.isArabic(place.name)) {
                                        this.translate_buildorstreet(place.name, "ar", "en")
                                    }
                                    else {
                                        this.translate_buildorstreet(place.name, "en", "ar")
                                    }



                                }
                                else
                                    if (arraylength == 3) {

                                        if (this.isArabic(place.formatted_address)) {
                                            this.translate_fulldata(place.formatted_address, "ar", "en")
                                        }
                                        else {
                                            this.translate_fulldata(place.formatted_address, "en", "ar")
                                        }
                                        // country

                                        if (this.isArabic(alldata[2].long_name)) {
                                            this.translate_country(alldata[2].long_name, "ar", "en")
                                        }
                                        else {
                                            this.translate_country(alldata[2].long_name, "en", "ar")
                                        }

                                        // emirate

                                        if (this.isArabic(alldata[1].long_name)) {
                                            this.translate_emirate(alldata[1].long_name, "ar", "en")
                                        }
                                        else {
                                            this.translate_emirate(alldata[1].long_name, "en", "ar")
                                        }

                                        // area

                                        if (this.isArabic(alldata[0].long_name)) {
                                            this.translate_area(alldata[0].long_name, "ar", "en")
                                        }
                                        else {
                                            this.translate_area(alldata[0].long_name, "en", "ar")
                                        }

                                        // build or street

                                        if (this.isArabic(place.name)) {
                                            this.translate_buildorstreet(place.name, "ar", "en")
                                        }
                                        else {
                                            this.translate_buildorstreet(place.name, "en", "ar")
                                        }



                                    }
                                    else
                                        if (arraylength <= 2) {

                                            if (this.isArabic(place.formatted_address)) {
                                                this.translate_fulldata(place.formatted_address, "ar", "en")
                                            }
                                            else {
                                                this.translate_fulldata(place.formatted_address, "en", "ar")
                                            }
                                            // country

                                            if (this.isArabic(alldata[1].long_name)) {
                                                this.translate_country(alldata[1].long_name, "ar", "en")
                                            }
                                            else {
                                                this.translate_country(alldata[1].long_name, "en", "ar")
                                            }

                                            // emirate

                                            if (this.isArabic(alldata[0].long_name)) {
                                                this.translate_emirate(alldata[0].long_name, "ar", "en")
                                            }
                                            else {
                                                this.translate_emirate(alldata[0].long_name, "en", "ar")
                                            }

                                            // area

                                            if (this.isArabic(alldata[0].long_name)) {
                                                this.translate_area(alldata[0].long_name, "ar", "en")
                                            }
                                            else {
                                                this.translate_area(alldata[0].long_name, "en", "ar")
                                            }

                                            // build or street

                                            if (this.isArabic(place.name)) {
                                                this.translate_buildorstreet(place.name, "ar", "en")
                                            }
                                            else {
                                                this.translate_buildorstreet(place.name, "en", "ar")
                                            }



                                        }





    };


    mapfunction = () => {
        const AsyncMap = withScriptjs(
            withGoogleMap(props => (
                <GoogleMap
                    google={this.props.google}
                    defaultZoom={15}
                    options={
                        { country: "ae" }

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
                            fields: ["address_components", "geometry", "icon", "name", "formatted_address"],
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
                    {/* <Marker /> */}
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

        Geocode.fromLatLng(this.state.mapPosition.lat,
            this.state.mapPosition.lng).then(
                response => {
                    let alldata = response.results[0].formatted_address




                    //       let mydata = alldata.split('-');



                    //      // return;

                    //       // full data
                    //       if(this.isArabic(alldata)){
                    //          this.translate_fulldata(alldata,"ar","en")
                    //      }
                    //      else {
                    //          this.translate_fulldata(alldata,"en","ar")
                    //      }
                    //      // country

                    //      //return ;

                    //      if(this.isArabic(mydata[3])){
                    //          this.translate_country(mydata[3],"ar","en")
                    //      }
                    //      else {
                    //          this.translate_country(mydata[3],"en","ar")
                    //      }

                    //         // emirate

                    //         if(this.isArabic(mydata[2])){
                    //          this.translate_emirate(mydata[2],"ar","en")
                    //      }
                    //      else {
                    //          this.translate_emirate(mydata[2],"en","ar")
                    //      }

                    //         // area

                    //         if(this.isArabic(mydata[1])){
                    //          this.translate_area(mydata[1],"ar","en")
                    //      }
                    //      else {
                    //          this.translate_area(mydata[1],"en","ar")
                    //      }

                    //         // build or street

                    //         if(this.isArabic(mydata[0])){
                    //          this.translate_buildorstreet(mydata[0],"ar","en")
                    //      }
                    //      else {
                    //          this.translate_buildorstreet(mydata[0],"en","ar")
                    //      }

                    //const address = response.results[0].formatted_address;

                    // console.log("full")
                    //addressArray = response.results[0].address_components,
                    // city = this.getCity(addressArray),
                    // area = this.getArea(addressArray),
                    // state = this.getState(addressArray);


                    //this.translate(mydata[3])

                    this.setState({
                        //: alldata,
                        //address_ar: address ? address : "",
                        // streetorbuild:  mydata[0],
                        // area:  mydata[1],
                        // emirate:  mydata[2],
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


        //alert(this.isArabic(string));

        this.fetchData();
        this.mapfunction()

        jQuery(document).ready(function () {
            // click on next button

            jQuery('.form-wizard-next-btn').click(function () {

                var parentFieldset = jQuery(this).parents('.wizard-fieldset');
                var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
                var next = jQuery(this);
                var nextWizardStep = true;


                var addressid = jQuery("#addressid").val();
                var address_arid = jQuery("#address_ar").val();
                var countryid = jQuery("#countryid").val();
                var country_arid = jQuery("#country_arid").val();
                var emirateid = jQuery("#emirateid").val();
                var emirate_arid = jQuery("#emirate_arid").val();
                var areaid = jQuery("#areaid").val();
                var area_arid = jQuery("#area_arid").val();
                var streetorbuildid = jQuery("#streetorbuildid").val();
                var streetorbuild_arid = jQuery("#streetorbuild_arid").val();

                if (addressid == "" || address_arid == "" || countryid == "" || country_arid == "" || emirateid == "" || emirate_arid == "" || areaid == "" || area_arid == "" || streetorbuildid == "" || streetorbuild_arid == "") {
                    // alert("yes")

                    lang == "en" ? toast.error("choose address in map and fill other fields") : toast.error("الرجاء تحديد مكان العقار علي الخريطة وادخال الحقول المطلوبة الاخرى")
                    nextWizardStep = false;

                }

                parentFieldset.find('.wizard-required').each(function () {
                    var thisValue = jQuery(this).val();

                    var category_id = jQuery("#category_id").val();
                    var type_id = jQuery("#type_id").val();
                    var purpose = jQuery("#purpose").val();
                    var agent_id = jQuery("#agent_id").val();

                    

                    var title_en = jQuery("#title_en").val();
                    var description_en = jQuery("#description_en").val();
                    var area = jQuery("#area").val();
                    var price = jQuery("#price").val();

                    var bathroom = jQuery("#bathroom").val();
                    var bedroom = jQuery("#bedroom").val();
                    var rentfrequency = jQuery("#rentfrequency").val();

                    var mincontract = jQuery("#mincontract").val();
                    var vacatingperiod = jQuery("#vacatingperiod").val();
                    var mantianancefee = jQuery("#mantianancefee").val();
                    var paidby = jQuery("#paidby").val();
                    var permitnumber = jQuery("#permitnumber").val();
                    // location


                    if (permitnumber =="") {
                        jQuery("#permitnumber").css("border","2px solid red")


                        // jQuery(this).siblings(".wizard-category-error").slideDown();
                        nextWizardStep = false;
                        


                    } else {
                        jQuery("#permitnumber").css("border","2px solid #eee")

                        // jQuery(this).siblings(".wizard-category-error").slideUp();
                    }


                    if (category_id < 1) {
                        jQuery("#category_id").css("border","2px solid red")


                        // jQuery(this).siblings(".wizard-category-error").slideDown();
                        nextWizardStep = false;
                        


                    } else {
                        jQuery("#category_id").css("border","2px solid #eee")

                        // jQuery(this).siblings(".wizard-category-error").slideUp();
                    }



                    if (type_id < 1) {

                        // jQuery(this).siblings(".wizard-type-error").slideDown();
                        jQuery("#type_id").css("border","2px solid red")
                        // alert("not selected")
                        nextWizardStep = false;
                     } 
                      else {

                        // alert("selected")

                         // jQuery(this).siblings(".wizard-type-error").slideUp();
                        jQuery("#type_id").css("border","2px solid #eee")

                     } 

                    if (purpose < 1) {
                        // jQuery(this).siblings(".wizard-purpose-error").slideDown();
                        nextWizardStep = false;
                        jQuery("#purpose").css("border","2px solid red")

                    } else {
                        // jQuery(this).siblings(".wizard-purpose-error").slideUp();
                        jQuery("#purpose").css("border","2px solid #eee")

                    }

                    if (agent_id < 1) {
                        jQuery("#agent_id").css("border","2px solid red")
                        nextWizardStep = false;
                    } else {
                        // jQuery(this).siblings(".wizard-agent-error").slideUp();
                        jQuery("#agent_id").css("border","2px solid #eee")

                    }


                    if (purpose == 1) {

                        if (rentfrequency < 1) {
                            jQuery("#rentfrequency").css("border","2px solid red")
                            nextWizardStep = false;
                        } else {
                            jQuery("#rentfrequency").css("border","2px solid #eee")
                        }

                        if (mincontract =="") {
                            jQuery("#mincontract").css("border","2px solid red")
                            nextWizardStep = false;
                        } else {
                            jQuery("#mincontract").css("border","2px solid #eee")
                        }

                        if (vacatingperiod =="") {
                            jQuery("#vacatingperiod").css("border","2px solid red")
                            nextWizardStep = false;
                        } else {
                            jQuery("#vacatingperiod").css("border","2px solid #eee")
                        }

                        if (mantianancefee =="") {
                            jQuery("#mantianancefee").css("border","2px solid red")
                            nextWizardStep = false;
                        } else {
                            jQuery("#mantianancefee").css("border","2px solid #eee")
                        }

                        if (paidby < 1) {
                            jQuery("#paidby").css("border","2px solid red")
                            nextWizardStep = false;
                        } else {
                            jQuery("#paidby").css("border","2px solid #eee")
                        }


                    } else {
                        jQuery("#rentfrequency").css("border","2px solid #eee")
                    }

                    if (title_en =="") {
                        jQuery("#title_en").css("border","2px solid red")
                        nextWizardStep = false;
                    } else {
                        jQuery("#title_en").css("border","2px solid #eee")

                    }

                    if (description_en =="") {
                        jQuery("#description_en").css("border","2px solid red")
                        nextWizardStep = false;
                    } else {
                        jQuery("#description_en").css("border","2px solid #eee")

                    }

                    if (area =="") {
                        jQuery("#area").css("border","2px solid red")
                        nextWizardStep = false;
                    } else {
                        jQuery("#area").css("border","2px solid #eee")

                    }

                    if (price =="") {
                        jQuery("#price").css("border","2px solid red")
                        nextWizardStep = false;
                    } else {
                        jQuery("#price").css("border","2px solid #eee")

                    }


                    if (thisValue == "") {
                        jQuery(this).siblings(".wizard-form-error").slideDown();
                        nextWizardStep = false;
                    }
                    else {
                        jQuery(this).siblings(".wizard-form-error").slideUp();
                    }
                });
                if (nextWizardStep) {
                    next.parents('.wizard-fieldset').removeClass("show", "400");
                    currentActiveStep.removeClass('active').addClass('activated').next().addClass('active', "400");
                    next.parents('.wizard-fieldset').next('.wizard-fieldset').addClass("show", "400");
                    jQuery(document).find('.wizard-fieldset').each(function () {
                        if (jQuery(this).hasClass('show')) {
                            var formAtrr = jQuery(this).attr('data-tab-content');
                            jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function () {
                                if (jQuery(this).attr('data-attr') == formAtrr) {
                                    jQuery(this).addClass('active');
                                    var innerWidth = jQuery(this).innerWidth();
                                    var position = jQuery(this).position();
                                    jQuery(document).find('.form-wizard-step-move').css({ "left": position.left, "width": innerWidth });
                                } else {
                                    jQuery(this).removeClass('active');
                                }
                            });
                        }
                    });
                }
            });
            //click on previous button
            jQuery('.form-wizard-previous-btn').click(function () {
                var counter = parseInt(jQuery(".wizard-counter").text());;
                var prev = jQuery(this);
                var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
                prev.parents('.wizard-fieldset').removeClass("show", "400");
                prev.parents('.wizard-fieldset').prev('.wizard-fieldset').addClass("show", "400");
                currentActiveStep.removeClass('active').prev().removeClass('activated').addClass('active', "400");
                jQuery(document).find('.wizard-fieldset').each(function () {
                    if (jQuery(this).hasClass('show')) {
                        var formAtrr = jQuery(this).attr('data-tab-content');
                        jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function () {
                            if (jQuery(this).attr('data-attr') == formAtrr) {
                                jQuery(this).addClass('active');
                                var innerWidth = jQuery(this).innerWidth();
                                var position = jQuery(this).position();
                                jQuery(document).find('.form-wizard-step-move').css({ "left": position.left, "width": innerWidth });
                            } else {
                                jQuery(this).removeClass('active');
                            }
                        });
                    }
                });
            });
            //click on form submit button
            jQuery(document).on("click", ".form-wizard .form-wizard-submit", function () {
                var parentFieldset = jQuery(this).parents('.wizard-fieldset');
                var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
                parentFieldset.find('.wizard-required').each(function () {
                    var thisValue = jQuery(this).val();

                    if (thisValue == "") {
                        jQuery(this).siblings(".wizard-form-error").slideDown();
                    }
                    else {
                        jQuery(this).siblings(".wizard-form-error").slideUp();
                    }
                });
            });
            // focus on input field check empty or not
            jQuery(".form-control").on('focus', function () {
                var tmpThis = jQuery(this).val();
                if (tmpThis == '') {
                    jQuery(this).parent().addClass("focus-input");
                }
                else if (tmpThis != '') {
                    jQuery(this).parent().addClass("focus-input");
                }
            }).on('blur', function () {
                var tmpThis = jQuery(this).val();
                if (tmpThis == '') {
                    jQuery(this).parent().removeClass("focus-input");
                    jQuery(this).siblings('.wizard-form-error').slideDown("3000");
                }
                else if (tmpThis != '') {
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


        var geojson = {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-77.032, 38.913]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'Washington, D.C.'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }
            }]
        };
        const bounds = [
            [51.54379, 22.686900], // Southwest coordinates
            [56.375864, 26.344573] // Northeast coordinates
        ];
        const { lng, lat, zoom } = this.state;
        // const map = new mapboxgl.Map({
        //     container: this.mapContainer.current,
        //     style: 'mapbox://styles/mapbox/streets-v11',
        //     //center: [lng, lat],
        //     zoom: zoom,
        //     maxBounds: bounds // Set the map's geographical boundaries.
        // });
    }
    _suggestionSelect(result, lat, lng, text) {
        console.log(result, lat, lng, text)
    }
    rentOnChange_Handle = (e) => {
        e.preventDefault()
        e.target.value == 1 ? this.setState({ rentfileds: "row" }) : this.setState({ rentfileds: "d-none" })
        this.setState({ purpose: e.target.value })
    }
    propertyType_enHandle = (e) => {
        // if(e.target.value == 23){
        //      "mb-3 d-block"
        // this.setState({  furnishstatusfields: response.data.categories.f  })
        // }else {
        const token = cookie.get("token")

        this.setState({ propertytype_id: e.target.value })
        // }
        let id = e.target.value;
        axios.get(baseurl + "/api/propertytypes/" + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    occupancyfiled: response.data.occupancy == 1 ? "mb-3 d-block" : "mb-3 d-none",
                    furnishstatusfields: response.data.furnishedornot == 1 ? "mb-3 d-block" : "mb-3 d-none",
                    //   rentfileds:response.data.rentornot== 1? "row" : "d-none",
                    readyoffPlanfield:response.data.readyoffplan== 1? "mb-3 d-block" : "d-none",

                    bathroomfeature: response.data.bedandbath == 1 ? "row d-block" : "d-none",
                    // categoryId:response.data.category_id, 
                    categoryNameEn: response.data.name_en,
                    categoryNameAr: response.data.name_ar,
                })
                //this.setState({categories:response.data.categories})
            })
            .catch(err => console.log("error"))



    }
    category_enHandle = (e) => {
        e.preventDefault();
        const token = cookie.get("token")

        this.setState({ categoryId: e.target.value })
        this.setState({ propertyTypeDisabld: "" })
        console.log(e.target.value);
        if (e.target.value == 23) {
            this.setState({ furnishedStatus: "mb-3 d-block" })
        }
        axios.get(baseurl + "/api/propertytypeByCatId/" + e.target.value, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                //    console.log(response.data)
                this.setState({ isLoading: false, propertytypes: response.data.propertytypes })
            })
            .catch(err => console.log("error"))
    }

    // handleChecked= (e) =>{
    //    // e.preventDefault();
    //     //console.log(e.target.checked)
    //     this.setState({firnished:!this.state.firnished})
    //  }

    handleOnFurnished = (e) => {
        this.setState({ firnished: 1 })
    }

    handleOnUnFurnished = (e) => {
        this.setState({ firnished: 0 })
    }
    // Amenties

    handleHealthAndFitness = (health, e) => {

        let index = this.state.healthandfitness.indexOf(health);
        //console.log(index);

        var i;
        for (i = 0; i < this.state.healthandfitness.length; i++) {
            if (i == index) {
                //console.log("before",this.state.healthandfitness[i].checked)
                this.state.healthandfitness[i].checkedcheckbox = !this.state.healthandfitness[i].checkedcheckbox
                //console.log("after",this.state.healthandfitness[i].checked)
                this.setState({})

            }
        }

    }

    handleFeatures = (feature, e) => {

        let index = this.state.amenitiesfeatures.indexOf(feature);
        //console.log(index);

        var i;
        for (i = 0; i < this.state.amenitiesfeatures.length; i++) {
            if (i == index) {
                this.state.amenitiesfeatures[i].checkedcheckbox = !this.state.amenitiesfeatures[i].checkedcheckbox
                this.setState({})

            }
        }

    }
    handleMiscellaneous = (miscell, e) => {

        let index = this.state.miscellaneous.indexOf(miscell);
        //console.log(index);

        var i;
        for (i = 0; i < this.state.miscellaneous.length; i++) {
            if (i == index) {
                this.state.miscellaneous[i].checkedcheckbox = !this.state.miscellaneous[i].checkedcheckbox
                this.setState({})

            }
        }

    }

    handleSecurityandTechnology = (secandtech, e) => {

        let index = this.state.securityandtechnology.indexOf(secandtech);
        //console.log(index);

        var i;
        for (i = 0; i < this.state.securityandtechnology.length; i++) {
            if (i == index) {
                this.state.securityandtechnology[i].checkedcheckbox = !this.state.securityandtechnology[i].checkedcheckbox
                this.setState({})

            }
        }

    }
    handleGym = (e) => {
        // e.preventDefault();
        //console.log(e.target.checked)
        this.setState({ gym: !this.state.gym })
    }
    handleSwimmingbool = (e) => {
        // e.preventDefault();
        //console.log(e.target.checked)
        this.setState({ swimmingpool: !this.state.swimmingpool })
    }
    handleMedical = (e) => {
        //e.preventDefault();
        //console.log(e.target.checked)
        this.setState({ medical: !this.state.medical })
    }
    handleSaunasteem = (e) => {
        // e.preventDefault();
        //console.log(e.target.checked)
        this.setState({ sauna_steem: !this.state.sauna_steem })
    }
    handleDisabilityaccess = (e) => {
        //e.preventDefault();
        //console.log(e.target.checked)
        this.setState({ disability_access: !this.state.disability_access })
    }
    handleBuiltinwardobes = (e) => {
        //console.log(e.target.checked)
        this.setState({ built_in_wardobes: !this.state.built_in_wardobes })
    }
    handleBarbaquearea = (e) => {
        //console.log(e.target.checked)
        this.setState({ barbaque_area: !this.state.barbaque_area })
    }
    handleCafeteria = (e) => {
        //console.log(e.target.checked)
        this.setState({ cafeteria: !this.state.cafeteria })
    }

    handleKitchen = (e) => {
        //console.log(e.target.checked)
        this.setState({ kitchen: !this.state.kitchen })
    }
    handleCentralac = (e) => {
        //console.log(e.target.checked)
        this.setState({ central_ac: !this.state.central_ac })
    }

    handleGarden = (e) => {
        //console.log(e.target.checked)
        this.setState({ garden: !this.state.garden })
    }
    handleFurnished = (e) => {
        //console.log(e.target.checked)
        this.setState({ furnished: !this.state.furnished })
    }
    handleDisposal = (e) => {
        //console.log(e.target.checked)
        this.setState({ disposal: !this.state.disposal })
    }
    handleKidsplay = (e) => {
        //console.log(e.target.checked)
        this.setState({ kidsplay: !this.state.kidsplay })
    }
    handleParking = (e) => {
        //console.log(e.target.checked)
        this.setState({ parking: !this.state.parking })
    }
    handleBalcony = (e) => {
        //console.log(e.target.checked)
        this.setState({ balcony: !this.state.balcony })
    }

    handleAtmacxeess = (e) => {
        //console.log(e.target.checked)
        this.setState({ atm_acxeess: !this.state.atm_acxeess })
    }
    handleWaterview = (e) => {
        //console.log(e.target.checked)
        this.setState({ water_view: !this.state.water_view })
    }
    handleLandmarkview = (e) => {
        //console.log(e.target.checked)
        this.setState({ landmark_view: !this.state.landmark_view })
    }
    handleDaycare = (e) => {
        //console.log(e.target.checked)
        this.setState({ day_care: !this.state.day_care })
    }

    handleSecurityguard = (e) => {
        //console.log(e.target.checked)
        this.setState({ security_guard: !this.state.security_guard })
    }
    handleCctv = (e) => {
        //console.log(e.target.checked)
        this.setState({ cctv: !this.state.cctv })
    }
    handleInternet = (e) => {
        //console.log(e.target.checked)
        this.setState({ internet: !this.state.internet })
    }
    handleSatelitecabletv = (e) => {
        //console.log(e.target.checked)
        this.setState({ satelite_cable_tv: !this.state.satelite_cable_tv })
    }

    // propery details
    handleTitleEn = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({ title_en: e.target.value })
    }
    handleTitleAr = (e) => {
        this.setState({ title_ar: e.target.value })
    }
    handleDescriptionEn = (e) => {
        this.setState({ description_en: e.target.value })
    }
    handleDescriptionAr = (e) => {
        this.setState({ description_ar: e.target.value })
    }
    handleSquarearea = (e) => {
        this.setState({ square_area: e.target.value })
    }
    handlePrice = (e) => {

        this.setState({ price: e.target.value })
    }
    handleBedroom = (e) => {
        this.setState({ bedroom: e.target.value })
    }
    handleBathroom = (e) => {
        this.setState({ bathroom: e.target.value })
    }
    handleRentFrequency = (e) => {
        this.setState({ rent_frequency: e.target.value })
    }

    handleMinimumcontractperiod = (e) => {
        this.setState({ min_contract_period: e.target.value })
    }
    handleVactingPeriod = (e) => {
        this.setState({ vacating_period: e.target.value })
    }
    handleMaintainaceFee = (e) => {
        this.setState({ maintainance_fee: e.target.value })
    }
    handlePaidby = (e) => {
        this.setState({ paid_by: e.target.value })
    }
    handlePermitNumber = (e) => {
        this.setState({ permit_number: e.target.value })
    }
    handleVideo_source = (e) => {
        e.preventDefault()
        this.setState({ video_source: e.target.value })
    }
    handleVideo_link = (e) => {
        e.preventDefault()
        this.setState({ video_link: e.target.value })
    }
    handleVideo_title = (e) => {
        e.preventDefault()
        this.setState({ video_title: e.target.value })
    }


    fetchData = () => {
        //handle select on Change
        const token = cookie.get("token")
        this.setState({ isLoading: true })
        //let categoryId = e.target.value;
        axios.get(baseurl + "/api/categories",
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

        )
            .then(response => {
                this.setState({ isLoading: false, categories: response.data.categories })
                console.log(response.data.categories)
                // $(document).ready(function () {
                //     setTimeout(function () {
                //         $('#myTable').DataTable();
                //     }, 1000);
                // });
            })
            .catch(err => console.log("error"))

        axios.get(baseurl + "/api/agents", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.setState({ isLoading: false, agents: response.data.agents })
                // $(document).ready(function () {
                //     setTimeout(function () {
                //         $('#myTable').DataTable();
                //     }, 1000);
                // });
            })
            .catch(err => console.log("error"))

        // amenities
        axios.get(baseurl + "/api/features", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {

                var healthandfitnessdata = response.data.healthandfitness
                var loopData = []
                var i;
                for (i = 0; i < healthandfitnessdata.length; i++) {
                    healthandfitnessdata[i].checkedcheckbox = false

                }

                var miscellaneousdata = response.data.miscellaneous
                //var loopData = []
                var j;
                for (j = 0; j < miscellaneousdata.length; j++) {
                    miscellaneousdata[j].checkedcheckbox = false

                }

                var securityandtechnologydata = response.data.securityandtechnology
                //var loopData = []
                var k;
                for (k = 0; k < securityandtechnologydata.length; k++) {
                    securityandtechnologydata[k].checkedcheckbox = false

                }

                var amenitiesfeaturesdata = response.data.features
                //var loopData = []
                var l;
                for (l = 0; l < amenitiesfeaturesdata.length; l++) {
                    amenitiesfeaturesdata[l].checkedcheckbox = false

                }




                this.setState({
                    healthandfitness: healthandfitnessdata,
                    amenitiesfeatures: amenitiesfeaturesdata, miscellaneous: miscellaneousdata,
                    securityandtechnology: securityandtechnologydata
                })

            })
            .catch(err => console.log("error"))

            axios.get(baseurl+"/api/propertytypes",{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
              .then(response =>{
                  this.setState({propertytypes:response.data.propertytypes})
                  console.log("daddadaa",response.data)
              this.setState({
                  occupancyfiled:response.data.occupancy == 1? "mb-3 d-block" : "mb-3 d-none",
                  furnishstatusfields:response.data.furnishedornot == 1? "mb-3 d-block" : "mb-3 d-none",
                  landfields:response.data.landornot == 1? "mb-3 d-block" : "mb-3 d-none",
                  comandresfields:response.data.comandresornot == 1? "mb-3 d-block" : "mb-3 d-none",
                  readyoffPlanfield:response.data.readyoffplan== 1? "mb-3 d-block" : "d-none",
                  landfeatures : response.data.readyoffplan == 1? "row d-block" : "d-none",
                  bathroomfeature: response.data.bedandbath == 1? "row d-block" : "d-none",
               
                  categoryNameEn: response.data.name_en, 
                  categoryNameAr: response.data.name_ar,
                  })
            })
            .catch(err =>console.log("error"))

            // available package
            axios.get(baseurl + "/api/agentavailablepackage", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                   // console.log("available",response.data)
                    this.setState({availablepackage:response.data.remainpackage })
              
                })
                .catch(err => console.log("error"))
    }

    saveData = (e) => {
        e.preventDefault();
        const token = cookie.get("token")
        if (!this.state.availablepackage || this.state.availablepackage < 1){
            lang=="en"?  toast.error("No qouta available. you have"+this.state.availablepackage) : toast.error("لاتوجد كوتة متوفر . فقط متوفر "+this.state.availablepackage)
              return
          }

        const data = {
             // category_id: this.state.categoryId,
             propertytypes_id: this.state.propertytype_id,
            address: this.state.address, address_ar: this.state.address_ar,
            country: this.state.country, country_ar: this.state.country_ar,
            emirate: this.state.emirate, emirate_ar: this.state.emirate_ar,
            area: this.state.area, area_ar: this.state.area_ar, lat: this.state.lat, lng: this.state.lng,
            streetorbuild: this.state.streetorbuild, streetorbuild_ar: this.state.streetorbuild_ar,
            firnished: this.state.firnished, purpose: this.state.purpose,
            //Amenties
            gym: this.state.gym == true ? 1 : 0, swimmingpool: this.state.swimmingpool == true ? 1 : 0, medical: this.state.medical == true ? 1 : 0,
            sauna_steem: this.state.sauna_steem == true ? 1 : 0, disability_access: this.state.disability_access == true ? 1 : 0,
            built_in_wardobes: this.state.built_in_wardobes == true ? 1 : 0, barbaque_area: this.state.barbaque_area == true ? 1 : 0,
            cafeteria: this.state.cafeteria == true ? 1 : 0, kitchen: this.state.kitchen == true ? 1 : 0,
            central_ac: this.state.central_ac == true ? 1 : 0, garden: this.state.garden == true ? 1 : 0,
            furnished: this.state.furnished == true ? 1 : 0, disposal: this.state.disposal == true ? 1 : 0,
            kidsplay: this.state.kidsplay == true ? 1 : 0, parking: this.state.parking == true ? 1 : 0, balcony: this.state.balcony == true ? 1 : 0,
            atm_acxeess: this.state.atm_acxeess == true ? 1 : 0, water_view: this.state.water_view == true ? 1 : 0,
            landmark_view: this.state.landmark_view == true ? 1 : 0, day_care: this.state.day_care == true ? 1 : 0,
            security_guard: this.state.security_guard == true ? 1 : 0, cctv: this.state.cctv == true ? 1 : 0,
            internet: this.state.internet == true ? 1 : 0, satelite_cable_tv: this.state.satelite_cable_tv == true ? 1 : 0,
            // property details
            title_en: this.state.title_en, title_ar: this.state.title_ar,
            description_en: this.state.description_en, description_ar: this.state.description_ar,
            square_area: this.state.square_area, price: this.state.price,
            bedroom: this.state.bedroom, bathroom: this.state.bathroom,
            rent_frequency: this.state.rent_frequency, min_contract_period: this.state.min_contract_period,
            completion_status:this.state.completion_status,ownership_status:this.state.ownership_status,
            vacating_period: this.state.vacating_period, maintainance_fee: this.state.maintainance_fee,
            paid_by: this.state.paid_by, permit_number: this.state.permit_number,
            video_source: this.state.video_source, video_link: this.state.video_link, video_title: this.state.video_title,
            healthandfitness: this.state.healthandfitness,
            amenitiesfeatures: this.state.amenitiesfeatures,
            miscellaneous: this.state.miscellaneous, featuredimage: this.state.featuredimage,
            securityandtechnology: this.state.securityandtechnology, referencenumber: this.state.referencenumber,


        }

this.setState({isLoading:true})
        //return
        axios.post(baseurl + "/api/agentproperties", data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data > 0) {

                    const formData = new FormData()
                    formData.append("property_id", response.data);
                    for (let i = 0; i < this.state.image.length; i++) {
                        formData.append("images[]", this.state.image[i]);

                    }
                    axios.post(baseurl + "/api/agentpropertiesuploads", formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            this.setState({isLoading:false})
                            Swal.fire({
                                title: "Done!",
                                text: "Successfully added.",
                                icon: "success",
                                timer: 2000,
                                button: false
                            })
                            this.props.history.push("/agentmanagelistings")
                        })
                        .catch(e => console.log("error from "))
                }


            })
            .catch(e => console.log("error"))




    }

    // onInputChageEnglish = address => {
    //     let mydata = address.split('-');
    //     this.translate_address(address,"ar","en")
    //     this.setState({
    //         country: mydata[3],
    //         emirate: mydata[2],
    //         area: mydata[1],
    //         streetorbuild: mydata[0]

    //     });

    // };

    //   onInputChageArabic = address_ar => {
    //       let mydata = address_ar.split('-');
    //       this.setState({
    //           address_ar: address_ar,
    //           country_ar: mydata[3],
    //           emirate_ar: mydata[2],
    //           area_ar: mydata[1],
    //           streetorbuild_ar: mydata[0]

    //       });
    //   };

    //   onInputChageBuildName = buildname => {
    //   //  let mydata = address.split('-');
    //     this.setState({
    //         streetorbuild: buildname,


    //     });
    //     console.log("build name commeing",this.isArabic(buildname))
    //     if(this.isArabic(buildname)){
    //         this.translate(buildname,"ar","en")
    //     }
    //     else {
    //         this.translate(buildname,"en","ar")
    //     }

    // };

    // onhandleLat = latvalue =>{
    //     this.setState({
    //         lat: latvalue,


    //     });
    // }

    // onhandleLng = lngvalue =>{
    //     this.setState({
    //         lng: lngvalue,


    //     });
    // }




    isArabic = (text) => {
        var arabic = /[\u0600-\u06FF]/;
        var result = arabic.test(text);
        return result;
    }

    // translate full data
    translate_fulldata = async (source, from, to) => {


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
                if (from == "en") {
                    this.setState({ address: source, address_ar: response.data.translations[0]["translatedText"] })
                } else {
                    this.setState({ address: response.data.translations[0]["translatedText"], address_ar: source })
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
    translate_country = async (source, from, to) => {

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
                if (from == "en") {
                    this.setState({ country: source, country_ar: response.data.translations[0]["translatedText"] })
                } else {
                    this.setState({ country: response.data.translations[0]["translatedText"], country_ar: source })
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
    translate_emirate = async (source, from, to) => {

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
                if (from == "en") {
                    this.setState({ emirate: source, emirate_ar: response.data.translations[0]["translatedText"] })
                } else {
                    this.setState({ emirate: response.data.translations[0]["translatedText"], emirate_ar: source })
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
    translate_area = async (source, from, to) => {
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
                if (from == "en") {
                    this.setState({ area: source, area_ar: response.data.translations[0]["translatedText"] })
                } else {
                    this.setState({ area: response.data.translations[0]["translatedText"], area_ar: source })
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
    translate_buildorstreet = async (source, from, to) => {
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
                if (from == "en") {
                    this.setState({ streetorbuild: source, streetorbuild_ar: response.data.translations[0]["translatedText"] })
                } else {
                    this.setState({ streetorbuild: response.data.translations[0]["translatedText"], streetorbuild_ar: source })
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



    // translate= async (source,from,to)=> {
    //     const sourceLanguage = "en";
    //     const targetLanguage = "ar";

    //     const url =
    //     `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}` +
    //       from +
    //       "&tl=" +
    //       to +
    //       "&dt=t&q=" +
    //       encodeURI(source);



    //     try {
    //       const result = await fetch(url);
    //       const json =  await result.json();
    //       //return json[0][0][0];
    //      console.log("your result is",json[0][0][0])
    //      if(from =="en"){
    //         this.setState({streetorbuild:source})
    //         this.setState({streetorbuild_ar:json[0][0][0]})
    //      }else{
    //         this.setState({streetorbuild:json[0][0][0]})
    //         this.setState({streetorbuild_ar:source})
    //      }

    //     } catch (error) {
    //       return error.message;
    //     }

    //   }


    // translate_address= async (source,from,to)=> {
    //     const sourceLanguage = "en";
    //     const targetLanguage = "ar";

    //     const url =
    //     `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}` +
    //       from +
    //       "&tl=" +
    //       to +
    //       "&dt=t&q=" +
    //       encodeURI(source);



    //     try {
    //       //return json[0][0][0];
    //       const result = await fetch(url);
    //       const json =  await result.json();

    //         this.setState({address:json[0][0][0]})


    //     } catch (error) {
    //       return error.message;
    //     }

    //   }

    handleFeaturedImage = (e) => {

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);


        //console.log(e.target.files[0])
        this.setState({ imageShow: URL.createObjectURL(e.target.files[0]) })

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
            e.target.files[i].rating = 0
            e.target.files[i].title = this.state.title_en
            imagesArray.push(e.target.files[i]);

        }


        this.setState({
            image: imagesArray,
        });


    }

    //   handleAgent =(e)=>{
    //       e.preventDefault();
    //       const token =cookie.get("token")

    //       this.setState({selectedAgent:e.target.value,agentLoading:true})
    //       axios.get(baseurl+"/api/showagent/"+ e.target.value,{
    //         headers: {
    //           'Authorization': `Bearer ${token}`,
    //           'Accept':'application/json',
    //           'Content-Type':'application/json'
    //         }})
    //       .then(response => {
    //       this.setState({  agent: response.data,agentLoading:false})
    //       // $(document).ready(function () {
    //       //     setTimeout(function () {
    //       //         $('#myTable').DataTable();
    //       //     }, 1000);
    //       // });
    //       })
    //       .catch(err =>console.log("error"))
    //   }



    handleRating = (rating, e) => {
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
            } else {
                mydata[i].rating = 0
            }
        }
        this.setState({ image: mydata })
    }

    handleTitle = (title, e) => {
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
        this.setState({ image: mydata })
    }
    removeFile = (myfile, e) => {
        e.preventDefault();
        console.log(myfile)

        let index = this.state.image.indexOf(myfile)
        //console.log("my file index",index)

        var mydata = this.state.image
        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
            console.log("i", i)
            if (i == index) {
                mydata.splice(index, 1);
            }
        }
        this.setState({ image: mydata })
        // for (i = 0; i < mydata.length; i++) {
        //     console.log("i", i)
        //     if (i == index) {
        //         mydata[i].basicbutton = !mydata[i].featuredbutton == true ? false : true

        //         mydata[i].featuredbutton = !mydata[i].featuredbutton
        //         mydata[i].premiumbutton = false
        //     }
        // }
    }
    handleCompletionStatus = (e) =>{
        e.preventDefault();

          this.setState({completion_status:e.target.value})
      }

      handleOwnerStatus = (e) =>{
        e.preventDefault();

        this.setState({ownership_status:e.target.value})
      }

      buttonRender =() => {
        if(this.state.isLoading){
            return <ClipLoader color={"blue"} loading={true}  size={30} />
        }
        return (
            <a href="javascript:;" className="form-wizard-submit rounded" onClick={this.saveData}>{lang == "en" ? "Submit" : "حفظ"}</a>

        )
        
    }

    render() {
        const role = cookie.get("role");

        return (
            <div className="container-fluid">
                <Toaster />
                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">{lang == "en" ? "Add Property" : "اضافة عقار"}</h4>
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
                                                    <h5>{lang == "en" ? "Property Information" : "معلومات العقار"} </h5>
                                                    {/* <div className="form-group">
                                                        <select onChange={this.category_enHandle} className="form-select wizard-required" style={{ height: '2.75rem' }} aria-label="form-select" id="category_id">
                                                            <option selected value="0">{i18next.t("category")}</option>
                                                            {this.state.categories.map((cate) => (
                                                                <option value={cate.id}>{lang == "en" ? cate.name_en : cate.name_ar}</option>
                                                            )
                                                            )}
                                                        </select>
                                                        {/* <div className="wizard-category-error" /> 
                                                    </div> */}

                                                    <div className="form-group">

                                                        <select onChange={this.propertyType_enHandle} className="form-select wizard-required" style={{ height: '2.75rem' }} aria-label="form-select"  id="type_id">
                                                            <option selected value="0">{i18next.t("propertytype")}</option>
                                                            {this.state.propertytypes.map((ppty) => (
                                                                <option value={ppty.id}>{lang == "en" ? ppty.typeName_en : ppty.typeName_ar}</option>
                                                            )
                                                            )}
                                                        </select>
                                                        {/* <div className="wizard-type-error" /> */}
                                                    </div>
                                                    <div className="form-group">
                                                        <select onChange={this.rentOnChange_Handle} className="form-select wizard-required " style={{ height: '2.75rem' }} aria-label="form-select" id="purpose" >
                                                            <option selected value="0" >{i18next.t("purpose")}</option>
                                                            <option value="1">{lang == "en" ? "For Rent" : "للايجار"}</option>
                                                            <option value='2'>{lang == "en" ? "For Sale" : "للبيع"}</option>
                                                        </select>
                                                        {/* <div className="wizard-purpose-error" /> */}
                                                    </div>

                                                    <div className={this.state.furnishstatusfields}>

                                                        <div className="form-group">

                                                            <div className="wizard-form-radio">
                                                                <input name="radio-name" id="radio1" type="radio" checked={this.state.firnished == 1 ? true : false} onClick={this.handleOnFurnished} />
                                                                <label htmlFor="radio1">{i18next.t("furnished")}</label>
                                                            </div>
                                                            &nbsp;
                                                            &nbsp;
                                                            <div className="wizard-form-radio">
                                                                <input name="radio-name" id="radio2" type="radio" checked={this.state.firnished == 0 ? true : false} onClick={this.handleOnUnFurnished} />
                                                                <label htmlFor="radio2">{i18next.t("unfurnished")}</label>
                                                            </div>
                                                        </div>


                                                    </div>

                                                    <h4>{lang == "en" ? "Location and Address" : "العنوان علي الخريطة"}</h4>
                                                    {/* full address */}
                                                    <div className="row" style={{ display: 'none' }}>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Full address </label>
                                                                <input type="text" value={this.state.address} name="arabicTitle" className="form-control" id="addressid" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Full address arabic</label>
                                                                <input type="text" value={this.state.address_ar} name="arabicTitle" className="form-control" id="address_arid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* country */}
                                                    <div className="row" style={{ display: 'none' }}>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Country</label>
                                                                <input type="text" value={this.state.country} name="arabicTitle" className="form-control" id="countryid" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Country arabic</label>
                                                                <input type="text" value={this.state.country_ar} name="arabicTitle" className="form-control" id="country_arid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* emirate */}
                                                    <div className="row" style={{ display: 'none' }}>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Emirate</label>
                                                                <input type="text" value={this.state.emirate} name="arabicTitle" className="form-control" id="emirateid" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Emirate arabic</label>
                                                                <input type="text" value={this.state.emirate_ar} name="arabicTitle" className="form-control" id="emirate_arid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* area */}
                                                    <div className="row" style={{ display: 'none' }}>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Area</label>
                                                                <input type="text" value={this.state.area} name="arabicTitle" className="form-control" id="areaid" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>AREA arabic</label>
                                                                <input type="text" value={this.state.area_ar} name="arabicTitle" className="form-control" id="area_arid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* street or building */}
                                                    <div className="row" style={{ display: 'none' }}>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Street/Bulding name</label>
                                                                <input type="text" value={this.state.streetorbuild} name="arabicTitle" className="form-control" id="streetorbuildid" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Street/Bulding name arabic</label>
                                                                <input type="text" value={this.state.streetorbuild_ar} name="arabicTitle" className="form-control" id="streetorbuild_arid" />
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
                                                           {/* {this.state.selectplace} */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="text" className="form-control wizard-required" id="title_en" placeholder={i18next.t("title_en")} onChange={this.handleTitleEn} />
                                                        {/* <div className="wizard-form-error" /> */}
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="text" className="form-control" id="title_ar" placeholder={i18next.t("title_ar")} onChange={this.handleTitleAr} />

                                                    </div>


                                                    <div className="form-group">
                                                        <textarea type="text" className="form-control wizard-required" id="description_en" placeholder={i18next.t("description_en")} rows={5} onChange={this.handleDescriptionEn} />
                                                        {/* <div className="wizard-form-error" /> */}
                                                    </div>

                                                    <div className="form-group">
                                                        <textarea type="text" className="form-control" id="description_ar" placeholder={i18next.t("description_ar")} rows={5} onChange={this.handleDescriptionAr} />

                                                    </div>

                                                    <div className="form-group">
                                                        <input type="number" className="form-control wizard-required" id="area" placeholder={i18next.t("area")} onChange={this.handleSquarearea} />
                                                        {/* <div className="wizard-form-error" /> */}
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="number" className="form-control wizard-required" id="price" placeholder={i18next.t("price")} onChange={this.handlePrice} />
                                                        {/* <div className="wizard-form-error" /> */}
                                                    </div>

                                                    <div className={this.state.bathroomfeature}>
                                                        <div className="form-group">
                                                            <select className="form-select form-select-lg mb-3" style={{ fontSize: 'unset', height: '2.75rem' }} aria-label="form-select-lg example" onChange={this.handleBathroom} id="bathroom">
                                                                <option value="0">{lang == "en" ? "Bath Room" : "عدد الحمامات"}</option>
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
                                                            <select className="form-select form-select-lg mb-3" style={{ fontSize: 'unset', height: '2.75rem' }} aria-label="form-select-lg example" onChange={this.handleBedroom} id="bedroom">
                                                                <option value="-1">{lang == "en" ? "Bed Room" : " عدد الغرف"}</option>
                                                                <option value="0">{lang == "en" ? "Studio" : "استوديو"}</option>
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
                                            <option value="0">{lang == "en" ? "Completion Status " : " حالة إكمال "}</option>
                                            <option value="1">{lang == "en" ? "Ready" : "  جاهز "}</option>
                                            <option value="2">{lang == "en" ? "Off Plan" : "  خارج الخطة "}</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select form-select-lg" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleOwnerStatus}>
                                            <option value="0">{lang == "en" ? "OwnerShip Status " : "  حالة الملكية  "}</option>
                                            <option value="1">{lang == "en" ? "Freshhold " : "   عقد جديد "}</option>
                                            <option value="2">{lang == "en" ? "Leasehold " : "   مسؤول المستأجرة "}</option>
                                            </select>
                                        </div>
                                    </div>
                                                    <div className={this.state.rentfileds}>
                                                        <h4>{lang == "en" ? "Rent Details" : "تفاصيل الايجار"}</h4>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <select className="form-select  wizard-required" style={{ fontSize: 'unset', height: '2.75rem' }} aria-label="form-select-lg example" onChange={this.handleRentFrequency} id="rentfrequency">
                                                                    <option selected value="0">{i18next.t("rentfrequency")}</option>
                                                                    <option value="1">{lang == "en" ? "Yearly" : "سنوي"}</option>
                                                                    <option value="2">{lang == "en" ? "Monthly" : "شهري"}</option>
                                                                    <option value="3">{lang == "en" ? "Weekly" : "اسبوعي"}</option>
                                                                    <option value="4">{lang == "en" ? "Daily" : "يومي"}</option>
                                                                </select>
                                                                {/* <div className="wizard-rentfrequency-error" /> */}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 mb-2">
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control" placeholder={i18next.t("mincontract")} onChange={this.handleMinimumcontractperiod} id="mincontract" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 mb-2">
                                                            <div className="mb-3">
                                                            <select className="form-select form-select-lg" style={{ fontSize: 'unset', height: '2.75rem' }} aria-label="form-select-lg example" onChange={this.handlePaidby} id="paidby" >
                                                                    <option selected value="0">{i18next.t("paidby")}</option>
                                                                    <option value="1">{lang == "en" ? "LandLord" : "المالك"}</option>
                                                                    <option value="2">{lang == "en" ? "Tenant" : "مستأجر"}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 mb-2">
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control" placeholder={i18next.t("mantianancefee")} onChange={this.handleMaintainaceFee} id="mantianancefee" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 mb-2">
                                                            <div className="mb-2">
                                                            <select className="form-select form-select-lg" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleVactingPeriod} id="vacatingperiod" >
                                                <option  value="0">{i18next.t("vacatingperiod")} </option>
                                                <option value="1">{lang == "en" ? "Day" : "يوم"}</option>
                                                <option value="2">{lang == "en" ? "Week" : "اسبوع"}</option>
                                                <option value="3">{lang == "en" ? "Month" : "شهر"}</option>
                                                <option value="4">{lang == "en" ? "Year" : "سنة"}</option>
                                                
                                                
                                              
                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="number" name="permitNumber" className="form-control" placeholder={i18next.t("permitnumber")} onChange={this.handlePermitNumber} id="permitnumber" />
                                                        {/* <div className="wizard-form-error" /> */}
                                                    </div>
                                                    <div className="form-group clearfix">
                                                        <div className="row">
                                                            <div className="col-md-10"></div>
                                                            <div className="col-md-2">
                                                                <a href="javascript:;" className="form-wizard-next-btn float-right rounded" > {lang == "en" ? "Next" : "التالي"}  </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="wizard-fieldset">
                                                    <h5>{lang == "en" ? "Uploads" : "تحميل ملفات"}</h5>
                                                    <div id="uploads" className="tab-pane" role="tabpanel">
                                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                            <li className="nav-item" role="presentation">
                                                                <a className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-image" role="tab" aria-controls="pills-home" aria-selected="true">Image</a>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <a className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-video" role="tab" aria-controls="pills-profile" aria-selected="false">Video</a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content" id="pills-tabContent">
                                                            <div className="tab-pane fade show active" id="pills-image" role="tabpanel" aria-labelledby="pills-home-tab">
                                                                <div style={{ marginBottom: '20px' }}>
                                                                    <label>{lang == "en" ? "Featured Image" : "صورة العقار"}</label>
                                                                    <input type="file" name="featured_image" onChange={this.handleFeaturedImage} />
                                                                    {this.state.featuredimage != null ? <img src={this.state.imageShow} alt='tt' height="70px" width="90px" /> : null}
                                                                </div>
                                                                <label>{lang == "en"}Gallery Images</label>
                                                                <input type="file" id="file" multiple name="file" onChange={this.handleChange} />
                                                                <table className="table">
                                                                    <thead>
                                                                        {this.state.image.length > 0 ?
                                                                            <tr>
                                                                                <th scope="col">Image preview</th>
                                                                                <th scope="col">Image Description</th>
                                                                                <th scope="col">Primary Image</th>
                                                                                <th scope="col">Delete Image</th>
                                                                            </tr> : null
                                                                        }
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.image.length > 0 ? (
                                                                            this.state.image.map((file, index) => (
                                                                                <tr key={index}>

                                                                                    <td>
                                                                                        <img src={URL.createObjectURL(file)} alt='tt' height="70px" width="90px" />
                                                                                    </td>
                                                                                    <td>  <input type="text" defaultValue={file.title} onChange={this.handleTitle.bind(this, file)} /></td>
                                                                                    <td>      {
                                                                                        file.rating == 1 ?
                                                                                            <img src="./images/rating/1.png" alt='tt' height="20px" width="20px" /> :
                                                                                            <a href="#" onClick={this.handleRating.bind(this, file)}>
                                                                                                <img src="./images/rating/0.png" alt='tt' height="20px" width="20px" />
                                                                                            </a>
                                                                                    }</td>
                                                                                    <td><a href="#" className="btn btn-sm btn-danger" onClick={this.removeFile.bind(this, file)}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                                                        </svg>
                                                                                    </a></td>
                                                                                </tr>

                                                                            ))) : (
                                                                            <h6 className="text-danger text-center">no image found</h6>
                                                                        )}

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="tab-pane fade" id="pills-video" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                                <table className="table" id="myTable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Video Source</th>
                                                                            <th>Link</th>
                                                                            <th>Title</th>

                                                                        </tr>
                                                                    </thead>

                                                                    <tbody>


                                                                        <tr  >
                                                                            <td>
                                                                                <select className="form-select" aria-label="Default select example" onChange={this.handleVideo_source}>
                                                                                    <option selected value="0">Video Source</option>
                                                                                    <option value="1">Youtube</option>
                                                                                    <option value="2">Vimeo</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <input aria-invalid="false" name="video_link" type="url" className="form-control" placeholder="Video Link" onChange={this.handleVideo_link} />
                                                                            </td>
                                                                            <td>

                                                                                <input aria-invalid="false" name="video_title" type="url" className="form-control" placeholder="Video Title" onChange={this.handleVideo_title} />
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
                                                                <a href="javascript:;" className="form-wizard-previous-btn float-left rounded">{lang == "en" ? "Previous" : "السابق"} </a>
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
                                                                        <h2 className="amenties-header">Health and Fitness</h2>
                                                                        {this.state.healthandfitness.length > 0 ? (
                                                                            this.state.healthandfitness.map((health) => (
                                                                                <div className="col">
                                                                                    <div className="quiz_card_area">
                                                                                        <input className="quiz_checkbox" type="checkbox" checked={health.checkedcheckbox} onClick={this.handleHealthAndFitness.bind(this, health)} />
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

                                                                        ) : ""}




                                                                    </div>
                                                                    <div className="row">
                                                                        <h2 className="amenties-header">Features</h2>

                                                                        {this.state.amenitiesfeatures.length > 0 ? (
                                                                            this.state.amenitiesfeatures.map((feature) => (
                                                                                <div className="col">
                                                                                    <div className="quiz_card_area">
                                                                                        <input className="quiz_checkbox" type="checkbox" checked={feature.checkedcheckbox} onClick={this.handleFeatures.bind(this, feature)} />
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
                                                                            ))) : ""}
                                                                    </div>
                                                                    <div className="row">
                                                                        <h2 className="amenties-header">Miscellaneous</h2>
                                                                        {this.state.miscellaneous.length > 0 ? (
                                                                            this.state.miscellaneous.map((miscell) => (
                                                                                <div className="col">
                                                                                    <div className="quiz_card_area">
                                                                                        <input className="quiz_checkbox" type="checkbox" checked={miscell.checkedcheckbox} onClick={this.handleMiscellaneous.bind(this, miscell)} />
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
                                                                            ))) : ""}

                                                                    </div>
                                                                    <div className="row">
                                                                        <h2 className="amenties-header">Security and Technology</h2>
                                                                        {this.state.securityandtechnology.length > 0 ? (
                                                                            this.state.securityandtechnology.map((secandtech) => (
                                                                                <div className="col">
                                                                                    <div className="quiz_card_area">
                                                                                        <input className="quiz_checkbox" type="checkbox" checked={secandtech.checkedcheckbox} onClick={this.handleSecurityandTechnology.bind(this, secandtech)} />
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
                                                                            ))) : ""}
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



      {this.buttonRender()}    
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
export default AgentProperty