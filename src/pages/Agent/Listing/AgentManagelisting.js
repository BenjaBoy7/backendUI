import React, { Component } from 'react';
import axios from 'axios'
import i18next from 'i18next'
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import * as $ from 'jquery'
import cookie from 'js-cookie'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import {Link} from 'react-router-dom'

import { baseurl } from '../../../Components/BaseUrl';

const lang =localStorage.getItem("lang") || "en";

class AgentManagelisting extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            managelistings:[],
            // basic_available:0,
            // featured_available:0,
            // premium_available:0,
            active_count:0,
            in_active_count:0,
            rent_count:0,
            buy_count:0,
            draft_count:0,
            all_count:0,

            // buttons
             active_button:true,
             in_active_button:false,
             rent_button:false,
             buy_button:false,
             all_button:false,
             draft_button:false,
            //  buy_count:0,
            //  buy_count:0,
            selected_button:1,

            isLoading:false,
            propertytypes:[],
            locations:[],
            filterLocation:[],

            selectedLocations:[],
            purpose:0,
            category_id:0,
            beds:-1,
            select_purpose:0
        }
    }
    componentDidMount() {
    setTimeout(() => {
    this.fetchData();

  }, 500);




    }
    fetchData = () => {
        const token = cookie.get("token")
        this.setState({ isLoading: true })
        axios.get(baseurl + "/api/agentmanagelisting",{
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
              this.setState({managelistings: data,
                basic_available:response.data.basic_available,
                featured_available:response.data.featured_available,
                premium_available:response.data.premium_available,
                active_count:response.data.active_count,in_active_count:response.data.in_active_count,rent_count:response.data.rent_count,buy_count:response.data.buy_count,
                draft_count:response.data.draft_count,all_count:response.data.all_count,isLoading:false})
              if (this.state.managelistings.length == 0) {
                console.log("length = 0")
            } else {

                $(document).ready(function () {

                    $('#myTable').DataTable();

                });
                this.setState({ isLoading: false })
            }
            })
            .catch(err =>console.log("error"))

            axios.get(baseurl+"/api/allpropertytypes",{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
            .then(response =>{
                console.log(response.data)
              this.setState({
                propertytypes:response.data.propertytypes
                
                  })
            })
            .catch()
            axios.get(baseurl+"/api/agentfilterLocation",{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
              .then(response =>{
                console.log(response.data)
                this.setState({filterLocation:lang=="en"? response.data.locations_en:response.data.locations_ar})
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


    handleActive = (e)=>{
        this.setState({selected_button:1,active_button:true,in_active_button:false,buy_button:false,rent_button:false,draft_button:false,all_button:false})
        const data = {selected_button:1,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }

    handleInActive = (e)=>{
        this.setState({selected_button:2,active_button:false,in_active_button:true,buy_button:false,rent_button:false,draft_button:false,all_button:false})
        const data = {selected_button:2,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }
    handleDraft = (e)=>{
        this.setState({selected_button:3,active_button:false,in_active_button:false,buy_button:false,rent_button:false,draft_button:true,all_button:false})
        const data = {selected_button:3,selectedLocations:this.state.selectedLocations,purpose:this.state.purpose,select_purpose:this.state.select_purpose,category_id:this.state.category_id,beds:this.state.beds}
        this.fetchDataBy(data)
    }
    handleAll = (e)=>{
        this.setState({selected_button:4,active_button:false,in_active_button:false,buy_button:false,rent_button:false,draft_button:false,all_button:true})
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
      
        axios.post(baseurl + "/api/agentfiltermanagelisting", data,{
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
                this.setState({managelistings: data,isLoading:false})
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
        }
        console.log("data is",data)
        axios.post(baseurl + "/api/agentfiltermanagelisting", data,{
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
                this.setState({managelistings: data,isLoading:false})
            })
            .catch(e=> this.setState({isLoading:false}))
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

    handleBedroom = (e) =>
    {
        e.preventDefault();
        this.setState({beds:e.target.value}) 
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mb-4">
                    
                    <div className="card">
                    <div className="col-md-12">
                                <div className="card-header">
                                    <h4 className="card-title">quik filter</h4>
                                </div>
                                <div className="card-body">
                <div className="mb-5">
                    <button onClick={this.handleActive} type="button" className={this.state.active_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.active_button?'#33be8b':'#fff',backgroundColor:this.state.active_button?"":"lightgrey"}}> ACTIVE <span className={this.state.active_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.active_button?"green":"#fff",color:this.state.active_button?"#fff":"#000"}}>{this.state.active_count}</span></button>
                    <button onClick={this.handleInActive} type="button" className={this.state.in_active_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.in_active_button?'#33be8b':'#fff',backgroundColor:this.state.in_active_button?"":"lightgrey"}}>INACTIVE <span className={this.state.in_active_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.in_active_button?"green":"#fff",color:this.state.in_active_button?"#fff":"#000"}}>{this.state.in_active_count}</span></button>
                    <button onClick={this.handleDraft} type="button" className={this.state.draft_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.draft_button?'#33be8b':'#fff',backgroundColor:this.state.draft_button?"":"lightgrey"}}>DRAFT <span className={this.state.draft_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.draft_button?"green":"#fff",color:this.state.draft_button?"#fff":"#000"}}>{this.state.draft_count}</span></button>
                    <button onClick={this.handleAll} type="button" className={this.state.all_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.all_button?'#33be8b':'#fff',backgroundColor:this.state.all_button?"":"lightgrey"}}>ALL <span className={this.state.all_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.all_button?"green":"#fff",color:this.state.all_button?"#fff":"#000"}}>{this.state.all_count}</span></button>
                    <button onClick={this.handleSale} type="button" className={this.state.buy_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.buy_button?'#33be8b':'#fff',backgroundColor:this.state.buy_button?"":"lightgrey"}}>SALE <span className={this.state.buy_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.buy_button?"green":"#fff",color:this.state.buy_button?"#fff":"#000"}}>{this.state.buy_count}</span></button>
                    <button onClick={this.handleRent} type="button" className={this.state.rent_button?"btn btn-outline-success btn-sm":"btn btn-outline-default btn-sm"} style={{color:this.state.rent_button?'#33be8b':'#fff',backgroundColor:this.state.rent_button?"":"lightgrey"}}>Rent <span className={this.state.rent_button?"badge bg-success":"badge bg-default"} style={{backgroundColor:this.state.rent_button?"green":"#fff",color:this.state.rent_button?"#fff":"#000"}}>{this.state.rent_count}</span></button>
                  
                    </div>
                   
                    <div className="row mt-10">
                        <div className="col-md-3">
                            <label>Location</label>
                            <Autocomplete
                      multiple
                      options={this.state.filterLocation}
                      onChange={(event, newValue) => {
                        this.setState({ selectedLocations: newValue });
                       // this.fetchLocationsbylocation(newValue)
                        //  const agentData= {selectedLanguage: this.selectedLanguage, selectedNationality: this.state.selectedNationality, selectedLocation: newValue, selectedArea: this.state.selectedArea}
                       // this.fetchLocations(newValue)
                        //console.log("selected Loca", this.state.locationValue)
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
                        <div className="col-md-3">
                        <label>Purpose</label>
                         <select  onChange={this.handlePurpose} className="form-select select2-container--default" style={{ height: '2.75rem' }} aria-label="form-select" required>
                                                <option selected value="0" >Any</option>
                                                <option value="1">For Rent</option>
                                                <option value='2'>For Sale</option>
                                            </select>
                        </div>
                        <div className="col-md-3">
                        <label>Category</label>
                        <select  onChange={this.handleCategory} className="form-select select2-container--default" style={{ height: '2.75rem' }} aria-label="form-select" required>
                                                <option selected value="0" >Any</option>
                                                {this.state.propertytypes.map((propertytype) =>(
                                                <option value={propertytype.id}>{lang=="en"?propertytype.typeName_en:propertytype.typeName_ar}</option>
                                                ))}
                                               
                                            
                                            </select>
                        </div>
                        <div className="col-md-3">
                        <label>Beds</label>
                        <select className="form-select form-select-lg mb-3" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleBedroom}>
                                            <option selected value="-1">Any</option>
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
                                            <option value="11">1</option>
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
                    
                    

                    <div className="row mt-2 mb-3">
                        <div className="col-md-11"></div>
                        <div className="col-md-1">
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.handleSearch}>Search</button>
                        </div>
                    </div>

                   <hr />

                   <table className="table table-striped mt-5">
                                            <thead>
                                                <tr>
                                                    <th>{i18next.t("type")} </th>
                                                    <th>{i18next.t("purpose")}</th>
                                                    <th>{i18next.t("location")}</th>
                                                    <th>{i18next.t("price")}</th>
                                                    <th>{i18next.t("beds")}</th>
                                                    <th>{i18next.t("listedby")}</th>
                                                    <th>{i18next.t("status")}</th>
                                                    <th>{i18next.t("actions")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            { !this.state.isLoading?
                                            <>
                                            {this.state.managelistings.length > 0? <>
                                                {this.state.managelistings.map((managelisting) => (
                                                    <tr>
                                                        <td>{lang == "en" ? managelisting.typeName_en : managelisting.typeName_ar}</td>
                                                        <td>{managelisting.purpose ==1?<>{i18next.t("forrent")}</>:<>{i18next.t("forbuy")}</>}</td>
                                                        <td>{lang == "en" ? managelisting.emirate_en : managelisting.emirate_ar}</td>
                                                        <td>{managelisting.price}</td>
                                                        <td>{managelisting.beds >0? managelisting.beds:null}</td>
                                                      
                                                        <td>{lang == "en" ?  managelisting.agent_en : managelisting.agent_ar}</td>
                                                        <td>
                                                    {managelisting.status_id ==1? (<span className="badge light badge-danger">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}
                                                    {managelisting.status_id ==2? (<span className="badge light badge-warning">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}
                                                    {managelisting.status_id ==3? (<span className="badge light  badge-secondary">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}                                                                                                        
                                                    {managelisting.status_id ==4? (<span className="badge light  badge-success">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}                                                                                                        
                                                    {managelisting.status_id ==5? (<span className="badge light  badge-danger">{lang == "en" ? managelisting.status_en : managelisting.status_ar}</span>):null}                                                                                                        
                                                    </td>
                                             
                                                        <td>
                                                            <div className="ms-auto">
                                                                <Link to={"showagentProperty/"+managelisting.id} className="btn btn-success btn-sm m-2" title="Refresh Property">
                                                                <img src="./refresh.png" style={{height:'20px',width:'20px'}} />
                                                                    </Link>

                                                                <Link to={"editagentProperty/"+managelisting.id} className="btn btn-primary btn-sm m-2"><i className="fa fa-edit"></i></Link>
                                                                <a href={"http://10.39.1.181:3000/single-property/"+managelisting.id} className="btn btn-warning btn-sm m-2" target="_blank"><i className="fa fa-eye"></i></a>
                                                                <a className="btn btn-danger btn-sm m-2" onClick={this.handelDelete.bind(this, managelisting.id)}><i className="fa fa-trash" ></i></a>                                                    
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

export default AgentManagelisting;