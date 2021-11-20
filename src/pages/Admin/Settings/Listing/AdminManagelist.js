import React, { Component } from 'react';
import axios from 'axios'
import i18next from 'i18next'
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "bootstrap/dist/js/bootstrap.min.js";
import * as $ from 'jquery'
import cookie from 'js-cookie'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import toast, { Toaster } from 'react-hot-toast';
import {Link} from 'react-router-dom'

import { baseurl } from '../../../../Components/BaseUrl';

const lang =localStorage.getItem("lang") || "en";

class AdminManagelist extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            managelistings:[],
            status:[],
            agencies:[],
            basic_available:0,
            featured_available:0,
            premium_available:0,
            active_count:0,
            in_active_count:0,
            rent_count:0,
            buy_count:0,
            draft_count:0,
            all_count:0,
            active_button:false,
            in_active_button:false,
            rent_button:false,
            buy_button:false,
            all_button:true,
            draft_button:false,
            selected_button:1,
            isLoading:false,
            propertytypes:[],
            locations:[],
            filterLocation:[],
            selectedLocations:[],
            purpose:0,
            category_id:0,
            agency_id:0,
            beds:-1,
            select_purpose:0,
            selectbtn:0,
            selectbtnstr:""
        }
    }
    componentDidMount() {

        var loadScript = function(src) {
            var tag = document.createElement('script');
            tag.async = false;
            tag.src = src;
            document.getElementsByTagName('body')[0].appendChild(tag);
            }
         // loadScript('./vendor/global/global.min.js')
        //     loadScript('./vendor/chart.js/Chart.bundle.min.js')
        //    loadScript('./vendor/apexchart/apexchart.js')
        //     loadScript('./vendor/peity/jquery.peity.min.js')
        //     loadScript('./js/dashboard/dashboard-1.js')
        //     loadScript('./vendor/dotted-map/js/contrib/jquery.smallipop-0.3.0.min.js')
        //    loadScript('./vendor/dotted-map/js/contrib/suntimes.js')
        //   loadScript('./vendor/dotted-map/js/contrib/color-0.4.1.js')
        //   loadScript('./vendor/dotted-map/js/world.js')
        //   loadScript('./vendor/dotted-map/js/smallimap.js')
      
           // loadScript('./js/dashboard/dotted-map-init.js')
        //    loadScript('./js/custom.min.js')
        //      loadScript('./js/deznav-init.js')
            //  loadScript('https://code.jquery.com/jquery-3.1.1.slim.min.js')
            //  loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js')

        setTimeout(() => {
            this.fetchData();
        }, 500);
    }
    fetchData = () => {
        const token = cookie.get("token")
        this.setState({ isLoading: true })
        axios.get(baseurl + "/api/adminmanagelisting",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
              var data = response.data.managelistings
              var i ;
              for(i=0; i < data.length; i++){
                   if(data[i].package_type==1){ data[i].basicbutton = true}else{ data[i].basicbutton = false} 
                   if(data[i].package_type==2){ data[i].featuredbutton = true}else{ data[i].featuredbutton = false}
                   if(data[i].package_type==3){ data[i].premiumbutton = true}else{ data[i].premiumbutton = false}        
              }
              this.setState({managelistings: data,status:response.data.status,
                // basic_available:response.data.basic_available,
                // featured_available:response.data.featured_available,
                // premium_available:response.data.premium_available,
                active_count:response.data.active_count,in_active_count:response.data.in_active_count,rent_count:response.data.rent_count,buy_count:response.data.buy_count,
                draft_count:response.data.draft_count,all_count:response.data.all_count})
              if (this.state.managelistings.length == 0) {
                console.log("length = 0")
            } else {
                $(document).ready(function () {

                    $('#myTable').DataTable();

                });
                this.setState({ isLoading: false })
            }
            })
            .catch(e =>console.log("error"))
            axios.get(baseurl+"/api/allpropertytypes",{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
            .then(response =>{
              this.setState({
                propertytypes:response.data.propertytypes
                
                  })
             //this.setState({categories:response.data.categories})
            })
            .catch()
            axios.get(baseurl+"/api/filterLocation",{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
              .then(response =>{
                this.setState({filterLocation:lang=="en"? response.data.locations_en:response.data.locations_ar})
              })
      
              .catch(e=>console.log('error'))

              // agencies
              axios.get(baseurl+"/api/agencies",{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
              .then(response =>{
                this.setState({agencies: response.data.agencies})
              })
      
              .catch(e=>console.log('error'))

     


    }
    handelDelete = (managelisting, e) => {
        e.preventDefault();
        const token = cookie.get("token")
        if (!managelisting || managelisting < 1) {
            return
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
                    axios.delete(baseurl + "/api/properties/" + managelisting,{
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Accept':'application/json',
                          'Content-Type':'application/json'
                        }})
                        .then(response => {
                          //  console.log("after delete",response.data)
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            this.fetchData();
                        })
                        .catch(err => console.log(err))
                }
            })
        }
    }

    handelBasic = (managelisting, e) => { 
        e.preventDefault();
        const token = cookie.get("token")
        let index = this.state.managelistings.indexOf(managelisting)
        var mydata = this.state.managelistings
        var i;
        for (i = 0; i < mydata.length; i++) {
            if (i == index) {
                mydata[i].basicbutton = true 

                mydata[i].featuredbutton = false
                mydata[i].premiumbutton = false
            }
        }

        this.setState({ managelistings: mydata })
     
        if (this.state.managelistings.length == 0) {
            console.log("length = 0")
        } else {

            $(document).ready(function () {

                $('#myTable').DataTable();

            });
            this.setState({ isLoading: false })
        }
        const data = {
            id: managelisting.id,
            basic: this.state.managelistings[index].basicbutton == true ? 1 : 0,
            featured: 0,
            premium: 0
        }

        axios.post(baseurl + "/api/changepackage", data ,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }
        })
            .then(response => {
                this.setState({
                    basic_available:response.data.basic_available,
                    featured_available:response.data.featured_available,
                    premium_available:response.data.premium_available})

            })
            .catch(e =>console.log("error"))
    }
    handelFeature = (managelisting, e) => {

        e.preventDefault();
        if(this.state.featured_available < 1){
            toast.error("Package not available")
            return
        }

        
        let index = this.state.managelistings.indexOf(managelisting)
        const token = cookie.get("token")
        var mydata = this.state.managelistings
        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
            if (i == index) {



                mydata[i].basicbutton = !mydata[i].featuredbutton == true ? false : true
                mydata[i].featuredbutton = !mydata[i].featuredbutton
                mydata[i].premiumbutton = false



                
            }
        }

        this.setState({ managelistings: mydata })
        if (this.state.managelistings.length == 0) {
            console.log("length = 0")
        } else {

            $(document).ready(function () {

                $('#myTable').DataTable();

            });
            this.setState({ isLoading: false })
        }
        const data = {
            id: managelisting.id,
            basic: this.state.managelistings[index].featuredbutton == true ? 0 : 1,
            featured: this.state.managelistings[index].featuredbutton == true ? 1 : 0,
            premium: 0

        }

        axios.post(baseurl + "/api/changepackage", data,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                this.setState({
                    basic_available:response.data.basic_available,
                    featured_available:response.data.featured_available,
                    premium_available:response.data.premium_available})


            })
            .catch(e =>console.log("error"))


    }
    handelPremium = (managelisting, e) => {
        e.preventDefault();
        if(this.state.premium_available < 1){
            toast.error("Package not available")
            return
        }
     
        let index = this.state.managelistings.indexOf(managelisting)
        const token = cookie.get("token")
        var mydata = this.state.managelistings
        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
            
            if (i == index) {
                mydata[i].basicbutton = !mydata[i].premiumbutton == true ? false : true

                mydata[i].featuredbutton = false
                mydata[i].premiumbutton = !mydata[i].premiumbutton
            }
        }

        this.setState({ managelistings: mydata })
        if (this.state.managelistings.length == 0) {
            console.log("length = 0")
        } else {

            $(document).ready(function () {

                $('#myTable').DataTable();

            });
            this.setState({ isLoading: false })
        }
        const data = {
            id: managelisting.id,
            basic: this.state.managelistings[index].premiumbutton == true ? 0 : 1,
            featured: 0,
            premium: this.state.managelistings[index].premiumbutton == true ? 1 : 0,
        }

        axios.post(baseurl + "/api/changepackage", data,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                this.setState({
                    basic_available:response.data.basic_available,
                    featured_available:response.data.featured_available,
                    premium_available:response.data.premium_available})
            })
            .catch(e =>console.log("error"))

    }
    handleAll = (e)=>{
        this.setState({selected_button:1,active_button:false,in_active_button:false,buy_button:false,rent_button:false,draft_button:false,all_button:true})
        const data = {selected_button:1,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }

    handleActive = (e)=>{
        this.setState({selected_button:2,active_button:true,in_active_button:false,buy_button:false,rent_button:false,draft_button:false,all_button:false})
        const data = {selected_button:2,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }

    handleInActive = (e)=>{
        this.setState({selected_button:3,active_button:false,in_active_button:true,buy_button:false,rent_button:false,draft_button:false,all_button:false})
        const data = {selected_button:3,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }
    handleDraft = (e)=>{
        this.setState({selected_button:4,active_button:false,in_active_button:false,buy_button:false,rent_button:false,draft_button:true,all_button:false})
        const data = {selected_button:4,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }
  
    handleRent = (e)=>{
        this.setState({selected_button:5,active_button:false,in_active_button:false,buy_button:false,rent_button:true,draft_button:false,all_button:false})
        const data = {selected_button:5,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }
    handleSale = (e)=>{
        this.setState({selected_button:6,active_button:false,in_active_button:false,buy_button:true,rent_button:false,draft_button:false,all_button:false})
        const data = {selected_button:6,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }

    fetchDataBy =(data) =>{
        const token = cookie.get("token")
        this.setState({isLoading:true})
      
        axios.post(baseurl + "/api/filtermanagelisting", data,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                var data = response.data.managelistings
                var i ;
                for(i=0; i < data.length; i++){
                     if(data[i].package_type==1){ data[i].basicbutton = true}else{ data[i].basicbutton = false}
                    
                     if(data[i].package_type==2){ data[i].featuredbutton = true}else{ data[i].featuredbutton = false}
                     if(data[i].package_type==3){ data[i].premiumbutton = true}else{ data[i].premiumbutton = false}
                    
                }
                this.setState({status:response.data.status,managelistings: data,isLoading:false})
            })
            .catch(e=> this.setState({isLoading:false}))
    }

    handleSearch = (e) => {

        
        const token = cookie.get("token")

        this.setState({isLoading:true})
        const data = {
            selected_button:this.state.selected_button,
            selectedLocations:this.state.selectedLocations,
            purpose:this.state.purpose,category_id:this.state.category_id,
            beds:this.state.beds,select_purpose:this.state.select_purpose,
            agency_id:this.state.agency_id
        }

        console.log("data is",data)
        axios.post(baseurl + "/api/adminfiltermanagelisting", data,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                console.log("response",response.data)
                var data = response.data.managelistings
                var i ;
                for(i=0; i < data.length; i++){
                     if(data[i].package_type==1){ data[i].basicbutton = true}else{ data[i].basicbutton = false}
                    
                     if(data[i].package_type==2){ data[i].featuredbutton = true}else{ data[i].featuredbutton = false}
                     if(data[i].package_type==3){ data[i].premiumbutton = true}else{ data[i].premiumbutton = false}
                    
                }
                this.setState({managelistings: data,isLoading:false})
            })
            .catch(e =>console.log("error"))
    }

    handlePurpose = (e)=>{
        e.preventDefault();
        this.setState({select_purpose:e.target.value})
    }

    handleCategory = (e) =>
    {
        e.preventDefault();
        this.setState({category_id:e.target.value}) 
    }

    handleAgency =(e) =>{
        e.preventDefault();
        this.setState({agency_id:e.target.value}) 
    }

    handleBedroom = (e) =>
    {
        e.preventDefault();
        this.setState({beds:e.target.value}) 
    }

    handleStatus = (st,managelisting,e) =>{
        let index = this.state.managelistings.indexOf(managelisting)
       const data = {property_id:managelisting.id,status_id:st.id}

       const token = cookie.get("token")
       axios.post(baseurl + "/api/updatePropertyStatus", data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }})
        .then(response => {
            if(response.data.success){

                var mydata = this.state.managelistings
                var i;
                for (i = 0; i < mydata.length; i++) {
                    if (i == index) {
                        mydata[i].status_id = st.id 
                        mydata[i].status_en = st.status_en 
                        mydata[i].status_ar = st.status_ar 
                    }
                }
        
                this.setState({ managelistings: mydata })

            }

         
          
            //this.setState({managelistings: data,isLoading:false})
        })
        .catch(e =>console.log("error"))


        //console.log("data before ",data)
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                <Toaster />
                    <div className="row mb-4">
                    
                    <div className="card">
                    <div className="col-md-12">
                                <div className="card-header">
                                    <h4 className="card-title">quik filter</h4>
                                </div>
                                <div className="card-body">
                <div className="mb-5">
                    <button onClick={this.handleAll} type="button" className={this.state.all_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.all_button?'#33be8b':'#fff',backgroundColor:this.state.all_button?"":"lightgrey"}}>{i18next.t("all")} <span className={this.state.all_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.all_button?"green":"#fff",color:this.state.all_button?"#fff":"#000"}}>{this.state.all_count}</span></button>
                    <button onClick={this.handleActive} type="button" className={this.state.active_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.active_button?'#33be8b':'#fff',backgroundColor:this.state.active_button?"":"lightgrey"}}> {i18next.t("active")} <span className={this.state.active_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.active_button?"green":"#fff",color:this.state.active_button?"#fff":"#000"}}>{this.state.active_count}</span></button>
                    <button onClick={this.handleInActive} type="button" className={this.state.in_active_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.in_active_button?'#33be8b':'#fff',backgroundColor:this.state.in_active_button?"":"lightgrey"}}>{i18next.t("inactive")} <span className={this.state.in_active_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.in_active_button?"green":"#fff",color:this.state.in_active_button?"#fff":"#000"}}>{this.state.in_active_count}</span></button>
                    <button onClick={this.handleDraft} type="button" className={this.state.draft_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.draft_button?'#33be8b':'#fff',backgroundColor:this.state.draft_button?"":"lightgrey"}}>{i18next.t("draft")} <span className={this.state.draft_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.draft_button?"green":"#fff",color:this.state.draft_button?"#fff":"#000"}}>{this.state.draft_count}</span></button>
                    <button onClick={this.handleSale} type="button" className={this.state.buy_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.buy_button?'#33be8b':'#fff',backgroundColor:this.state.buy_button?"":"lightgrey"}}>{i18next.t("sale")} <span className={this.state.buy_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.buy_button?"green":"#fff",color:this.state.buy_button?"#fff":"#000"}}>{this.state.buy_count}</span></button>
                    <button onClick={this.handleRent} type="button" className={this.state.rent_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.rent_button?'#33be8b':'#fff',backgroundColor:this.state.rent_button?"":"lightgrey"}}>{i18next.t("rent")} <span className={this.state.rent_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.rent_button?"green":"#fff",color:this.state.rent_button?"#fff":"#000"}}>{this.state.rent_count}</span></button>
                  
                    </div>
                   
                    <div className="row mt-10">
                        <div className="col-md-2">
                            <label>Location</label>
                            <Autocomplete
                      multiple
                      options={this.state.filterLocation}
                      onChange={(event, newValue) => {
                        this.setState({ selectedLocations: newValue });
                      }}
                      getOptionLabel={(option) => option.location}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label=""
                          placeholder=""
                        />
                      )}
                    />

                        </div>
                        <div className="col-md-2">
                        <label>Purpose</label>
                         <select  onChange={this.handlePurpose} className="form-select select2-container--default" style={{ height: '2.75rem' }} aria-label="form-select" required>
                                                <option  value="0" >Any</option>
                                                <option value="1">For Rent</option>
                                                <option value='2'>For Sale</option>
                                            </select>
                        </div>
                        <div className="col-md-3">
                        <label>Category</label>
                        <select  onChange={this.handleCategory} className="form-select select2-container--default" style={{ height: '2.75rem' }} aria-label="form-select" required>
                                                <option  value="0" >Any</option>
                                                {this.state.propertytypes.map((propertytype) =>(
                                                <option key={propertytype.id} value={propertytype.id}>{lang=="en"?propertytype.typeName_en:propertytype.typeName_ar}</option>
                                                ))}
                                               
                                            
                                            </select>
                        </div>
                        <div className="col-md-3">
                        <label>Beds</label>
                        <select className="form-select form-select-lg mb-3" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleBedroom}>
                                            <option value="-1">Any</option>
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

                        <div className="col-md-2">
                        <label>{lang=="en"?"Agency":"الشركة"}</label>
                        <select  onChange={this.handleAgency} className="form-select select2-container--default" style={{ height: '2.75rem' }} aria-label="form-select" required>
                                                <option  value="0" >Any</option>
                                                {this.state.agencies.map((agency) =>(
                                                <option key={agency.id} value={agency.id}>{lang=="en"?agency.name_en:agency.name_ar}</option>
                                                ))}
                             </select>
                        </div>
                    </div>
                    <div className="row mt-2 mb-3">
                        <div className="col-md-11"></div>
                        <div className="col-md-1">
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.handleSearch}>Search</button>
                        </div>
                    </div>

                   <hr />

                   <table className="table table-striped mt-5 responive">
                                            <thead>
                                                <tr>
                                                    <th className="7">{i18next.t("agencyname")}</th>
                                                    <th className="d-lg-none ">{i18next.t("type")} </th>
                                                    <th className="d-lg-none ">{i18next.t("purpose")}</th>
                                                    <th className="d-lg-none ">{i18next.t("location")}</th>
                                                    <th className="d-lg-none ">{i18next.t("price")}</th>
                                                    <th className="d-lg-none ">{i18next.t("beds")}</th>
                                                    <th className="d-lg-none ">{i18next.t("listedby")}</th>
                                                    <th className="d-lg-none ">{i18next.t("status")}</th>
                                                    <th className="d-lg-none ">{i18next.t("actions")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            { !this.state.isLoading?
                                            <>
                                            {this.state.managelistings.length > 0? <>
                                                {this.state.managelistings.map((managelisting) => (
                                                    <tr key={managelisting.id}>
                                                        <td>{lang == "en" ? managelisting.name_en : managelisting.nametypeName_ar}</td>
                                                      
                                                        <td>{lang == "en" ? managelisting.typeName_en : managelisting.typeName_ar}</td>
                                                        <td>{managelisting.purpose ==1?<>{i18next.t("forrent")}</>:<>{i18next.t("forbuy")}</>}</td>
                                                        <td>{lang == "en" ? managelisting.emirate_en : managelisting.emirate_ar}</td>
                                                        <td>{managelisting.price}</td>
                                                        <td>{managelisting.beds >0? managelisting.beds:null}</td>                                                      
                                                        <td>{lang == "en" ?  managelisting.agent_en : managelisting.agent_ar}</td>
                                                        <td>
                                                      
                                                    <div className="dropdown">
                                                    <a className="dropdown-toggle" href="#"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {managelisting.status_id ==1? (<span className="badge light badge-danger">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}
                                                    {managelisting.status_id ==2? (<span className="badge light badge-warning">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}
                                                    {managelisting.status_id ==3? (<span className="badge light  badge-secondary">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}                                                                                                        
                                                    {managelisting.status_id ==4? (<span className="badge light  badge-success">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}                                                                                                        
                                                    {managelisting.status_id ==5? (<span className="badge light  badge-danger">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}                                                                                                        

                                                    </a>

                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        {this.state.status.length > 0 && this.state.status.map((st) =>(
                                                            
                                                           <li key={st.id} onClick={this.handleStatus.bind(this,st,managelisting)}><a className="dropdown-item" >{st.status_en}</a></li> 
                                                          
                                                        ))}
                                                        {/* <li><a class="dropdown-item" href="#">Action</a></li>
                                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                                        <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                                    </ul>
                                                    </div>
                                                            </td>
                                               
                                                        <td>
                                                            <div className="ms-auto">
                                                           
                                                                <Link to={"admineditlist/"+managelisting.id} className="btn btn-primary btn-sm m-2"><i className="bi bi-pencil-square"></i></Link>
                                                                <a href={"https://findproperties.ae/single-property/"+managelisting.id} className="btn btn-warning btn-sm m-2" target="_blank"><i className="fa fa-eye"></i></a>
                                                                <a className="btn btn-danger btn-sm m-2" onClick={this.handelDelete.bind(this, managelisting.id)}><i className="bi bi-trash"></i></a>                                                    

                                                                </div>
                                                        </td>

                                                    </tr>
                                                )

                                                )}
                                            </>:
                                            <tr >
                                            <td colSpan="9" style={{ backgroundColor: '#fff',textAlign: 'center'}}>No data </td>
                                          </tr>
                                            }
                                           </>:
                                            <tr style={{justifyContent:'center',alignItems:'center',alignContent:'center'}} >
                                                <td colSpan="9" style={{ backgroundColor: '#fff',textAlign: 'center'}}>
                                                <div className="lds-ripple"><div></div><div></div></div>
                                                </td>
                                            </tr>}
                                            </tbody>

                                        </table>
                    </div>
                    </div>
                    </div> 
                    </div>
               
      
                    
                  
    
                </div>

            </div>
        );
    }
}

export default AdminManagelist;